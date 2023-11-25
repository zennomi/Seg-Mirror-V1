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
  }, [bc, windowId, index, imageId,])

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
    <div className="App w-[100vw] h-[100vh] bg-gray-50 dark:bg-gray-800">
      <div className='container mx-auto pt-2 text-center'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white uppercase">Gương chiếu sếch</h1>
        <a
          target='_blank'
          href="https://github.com/zennomi/Seg-Mirror"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
            />
          </svg>
          Github
        </a>
        <div className='flex flex-col gap-y-2'>
          <label for="images" className="block text-sm font-medium text-gray-900 dark:text-white">Chọn ảnh</label>
          <select
            id="images"
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={handleOpenNewWindow}>{
              index === 0 ? "Cho 1 em nữ sinh cao trung ra đây" :
                index === 1 ? "Mở gương thần" : "Đóng gương thần"
            }</button>
        </div>
      </div>
      {index !== 0
        &&
        <Draggable
          position={position}
          onDrag={(event, data) => {
            updateNewPosition({ x: data.x, y: data.y });
          }}
        >
          <img className='max-w-none' src={index === 2 ? image2Url : image1Url} draggable="false" />
        </Draggable>
      }
    </div>
  );
}

export default App;
