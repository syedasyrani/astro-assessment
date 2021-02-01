import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../stores/Auth/AuthContext'

const Logout = () => {
  const history = useHistory()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    logout()
    history.push('/')
  })

  return null
}

export default Logout
