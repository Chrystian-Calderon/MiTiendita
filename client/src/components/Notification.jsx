import { useState, useEffect } from 'react'
import { MdError } from "react-icons/md"
import { FaCheckCircle } from "react-icons/fa"

const Notification = ({ type, message, duration = 3000 }) => {
  const [animatingOut, setAnimatingOut] = useState(false);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (!message) return

    setVisible(true)
    setAnimatingOut(false)

    const timeout = setTimeout(() => {
      setAnimatingOut(true);
      setTimeout(() => {
        setVisible(false);
      }, 300);
    }, duration);
    
    return () => clearTimeout(timeout);
    
  }, [message, duration])
  
  if (!visible || !message) return null;

  return (
    <div className={`notification ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} 
    transition-all duration-300 ease-in-out transform ${animatingOut ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
      <div className='flex items-center gap-2 p-4'>
        {type === 'error' ? <MdError /> : <FaCheckCircle />}
        <p>{message}</p>
      </div>
      <span className="block h-[2px] w-full bg-white rounded animate-shrink" style={{ '--duration': `${duration}ms` }}></span>
    </div>
  )
}

export default Notification;