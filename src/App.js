import { useEffect, useMemo, useState } from 'react';
import Draggable from 'react-draggable';

function App() {
  const image1Url = 'https://c3.kemono.su/data/7e/11/7e110eb9f59b3ddbf78059a05e91324931407d1f22d873e625abc2f795d12ac5.jpg?f=b80a8f6c-a5f4-4f3c-8d50-8fb76a10de49.jpg'
  const image2Url = 'https://c6.kemono.su/data/1c/ec/1cece150ea168816b68bdbed130738c8d7de3fa81d6ca4a5ee7bc70f20fc57c7.jpg?f=eeacf854-8260-4c59-8ad6-ba11f75ef4d9.jpg'
  const windowId = useMemo(() => Math.random(), [])
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const [index, setIndex] = useState(0)

  const newTabBC = useMemo(() => new BroadcastChannel('biya'), []);

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
    newTabBC.postMessage({ type: 'update_position', value: { x, y, windowX: window.screenX, windowY: window.screenY } })
    setPosition({ x, y })
  }

  useEffect(() => {
    newTabBC.onmessage = (event) => {
      switch (event.data.type) {
        case 'new_tab':
          if (event.data.value !== windowId) {
            if (index === 0) {
              newTabBC.postMessage({ type: 'index_1', value: event.data.value, })
            } else if (index === 1) {
              newTabBC.postMessage({ type: 'index_2', value: event.data.value, })
              updateNewPosition(position)
            } else {
              newTabBC.postMessage({ type: 'index_1', value: event.data.value, })
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
        default:
          break;
      }
    };

    newTabBC.postMessage({ type: 'new_tab', value: windowId });

    return () => newTabBC.onmessage = null
  }, [newTabBC, windowId, index])

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
        <button onClick={handleOpenNewWindow}>{
          index === 0 ? "Cho 1 em xinh tươi ra đây" :
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
