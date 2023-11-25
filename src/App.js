import { useEffect, useMemo, useState } from 'react';
import Draggable from 'react-draggable';
import images from './images';

function App() {
  const windowId = useMemo(() => Math.random(), [])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [imageId, setImageId] = useState(0)
  const image1Url = images[imageId].censor
  const image2Url = images[imageId].uncensor
  const [index, setIndex] = useState(0)

  const bc = useMemo(() => new BroadcastChannel('biya'), []);

  const handleOpenNewWindow = () => {
    if (index !== 2) {
      window.open(window.location.href, '_blank',
        index === 0 ?
          `location=yes,height=${window.innerHeight},width=${window.innerWidth},scrollbars=no,status=yes`
          :
          `location=yes,height=${window.innerHeight / 4},width=${window.innerWidth / 4},scrollbars=no,status=yes`
      )
    } else {
      window.close()
    }
  }

  const updateNewPosition = ({ x, y }) => {
    bc.postMessage({ type: 'update_position', value: { x, y, windowX: window.screenX, windowY: window.screenY } })
    setPosition({ x, y })
  }

  useEffect(() => {
    bc.onmessage = (event) => {
      switch (event.data.type) {
        case 'new_tab':
          if (event.data.value !== windowId) {
            if (index === 1) {
              bc.postMessage({ type: 'index_2', value: event.data.value, })
              updateNewPosition(position)
              bc.postMessage({ type: 'image_id', value: imageId })
            } else {
              bc.postMessage({ type: 'index_1', value: event.data.value, })
            }
          }
          break;
        case 'index_1':
          if (event.data.value === windowId) {
            setIndex(1)
          }
          break;
        case 'index_2':
          if (event.data.value === windowId) {
            setIndex(2)
          }
          break;
        case 'update_position':
          const { x, y, windowX, windowY } = event.data.value
          const absoluteX = windowX + x
          const absoluteY = windowY + y
          setPosition({ x: absoluteX - window.screenX, y: absoluteY - window.screenY })
          break;
        case 'image_id':
          setImageId(event.data.value)
          break;
        default:
          break;
      }
    };

    bc.postMessage({ type: 'new_tab', value: windowId });

    return () => bc.onmessage = null
  }, [bc, windowId, index, imageId])

  useEffect(() => {
    var oldX = window.screenX,
      oldY = window.screenY;

    const interval = setInterval(function () {
      if (oldX !== window.screenX || oldY !== window.screenY) {
        updateNewPosition({ x: position.x - window.screenX + oldX, y: position.y - window.screenY + oldY })
      } else {
        console.log('not moved!');
      }
      oldX = window.screenX;
      oldY = window.screenY;
    }, 1);

    return () => clearInterval(interval)
  }, [position])

  return (
    <div className="App">
      <div>
        <select
          value={imageId}
          onChange={(event) => {
            setImageId(event.target.value)
            bc.postMessage({ type: 'image_id', value: event.target.value })
          }}
        >
          {
            images.map((image, index) => <option value={index}>{image.title}</option>)
          }
        </select>
        <button onClick={handleOpenNewWindow}>{
          index === 0 ? "Cho 1 em nữ sinh cao trung ra đây" :
            index === 1 ? "Mở gương thần" : "Đóng gương thần"
        }</button>
      </div>
      {index !== 0
        &&
        <Draggable
          position={position}
          onDrag={(event, data) => {
            updateNewPosition({ x: data.x, y: data.y });
          }}
        >
          <img src={index === 2 ? image2Url : image1Url} draggable="false" />
        </Draggable>
      }
    </div>
  );
}

export default App;
