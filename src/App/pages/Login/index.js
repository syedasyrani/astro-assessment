import React, { useState, useEffect, useContext } from 'react'
import LoginView from './LoginView'

import { AuthContext } from '../../stores/Auth/AuthContext'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isAuthenticated, login, authenticate } = useContext(AuthContext)

  const handleLogin = async () => {
    alert('login')
    // const response = await FloristService.login({ email, password })

    const response = {
      status: 200,
      token: 'randomtoken',
    }

    if (response.status === 200) {
      login(response.data.token)
      authenticate()
    }
  }

  const onSubmit = async () => {
    await handleLogin()
  }

  useEffect(() => {
    isAuthenticated && history.push('/channels')
  }, [history, isAuthenticated])

  return (
    <LoginView
      {...{
        email,
        setEmail,
        password,
        setPassword,
        onSubmit,
      }}
    />
  )
}

export default Login
