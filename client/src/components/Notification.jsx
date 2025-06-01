import { useState, useEffect } from 'react'

const Notification = ({ type, message, duration = 3000 }) => {
  const [animatingOut, setAnimatingOut] = useState(false);
  if (!message) return null;
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatingOut(true);
      setTimeout(() => {
        setVisible(false);
      }, 300);
    }, duration);

    return () => clearTimeout(timeout);

  }, [message])

  return (
    <div className={`notification ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} 
    transition-all duration-300 ease-in-out transform ${animatingOut ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
      <div>
        {type === 'error' && 'error'}
        <p>{message}</p>
      </div>
      <span className="block h-[2px] w-full bg-white rounded animate-shrink" style={{ '--duration': `${duration}ms` }}></span>
    </div>
  )
}

export default Notification;