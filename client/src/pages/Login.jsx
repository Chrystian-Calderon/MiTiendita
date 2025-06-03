import { useState } from "react"
import { useNavigate } from "react-router"
import Notification from "../components/Notification"
import { validateUserLogin, validatePasswordLogin } from "../utils/validateLogin"
import { login } from "../services/authService"
import { FiLogIn } from "react-icons/fi"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"

const Login = () => {
  const [values, setValues] = useState({ name: '', password: ''})
  const [error, setError] = useState({ name: '', password: ''})
  const [msgNotification, setMsgNotification] = useState('')
  const navigate = useNavigate()

  function validateForm({ name, value }) {
    if (value) {
      if (name === 'name') {
        if (!validateUserLogin({ user: value })) {
          setError(prev => ({ ...prev, [name]: 'El nombre solo puede contener letras' }));
        } else {
          setError(prev => ({ ...prev, [name]: '' }));
        }
      }

      if (name === 'password') {
        if (!validatePasswordLogin({ password: value })) {
          setError(prev => ({ ...prev, [name]: 'No se permiten caracteres especiales' }));
        } else {
          setError(prev => ({ ...prev, [name]: '' }));
        }
      }
    } else {
      setError(prev => ({ ...prev, [name]: 'Este campo es obligatorio' }));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }
  
  const handleBlur = (e) => {
    const { name, value } = e.target

    validateForm({ name, value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value

    validateForm({ name: 'name', value: name })
    validateForm({ name: 'password', value: password })
    try {
      if (error.name === '' && error.password === '' && name && password) {
        const response = await login({username: name, password})
        if (!response.error) {
          localStorage.setItem('auth', JSON.stringify({ username: name, logged: true }));
          navigate('/dashboard')
        } else {
          const message = response.error
          setMsgNotification(message)
          setTimeout(() => {
            setMsgNotification('')
          }, 3000)
        }
      }
    } catch (e) {
      setMsgNotification('Error al iniciar sesión')
      setTimeout(() => {
        setMsgNotification('')
      }, 3000)
    }
  }

  return (
    <main className="bg-secundary-v1 w-full h-dvh flex items-center justify-center">
      <div className="bg-white rounded p-5 max-w-sm w-full">
        <div className="h-12 w-12 rounded-full bg-primary text-white p-3 mx-auto mb-4">
          <FiLogIn className="h-full w-full" />
        </div>
        <h1 className="text-center text-2xl font-bold">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3 login font-nunito">
          <div className="login-input">
            <input type="text" name="name" id="name" placeholder=" " value={values.name} onChange={handleChange} onBlur={handleBlur} />
            <label htmlFor="name">Nombre</label>
            <div></div>
            {error.name && <span>{error.name}</span>}
          </div>
          <div className="login-input">
            <input type="password" name="password" id="password" placeholder=" " value={values.password} onChange={handleChange} onBlur={handleBlur} />
            <label htmlFor="password">Contraseña</label>
            <div></div>
            {error.password && <span>{error.password}</span>}
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-secundary p-3 text-white rounded font-nunito hover:bg-secundary-v1 transition cursor-pointer">Iniciar sesión</button>
          </div>
        </form>
      </div>
      {msgNotification && <Notification type={'error'} message={msgNotification} />}
    </main>
  )
}

export default Login