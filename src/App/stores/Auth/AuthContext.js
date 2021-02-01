import React, { createContext, useReducer, useEffect } from 'react'
import LocalStorageHelper from '../../helpers/localStorage'
import AuthReducer from './AuthReducer'

const localStorageService = LocalStorageHelper.getData()

const initialState = {
  isAuthenticated: true,
  token: null,
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState, () => {
    const storedToken = JSON.parse(localStorageService.getToken())

    const isAuthenticated = storedToken !== null

    return isAuthenticated
      ? {
          isAuthenticated,
          token: storedToken,
        }
      : initialState
  })

  const { isAuthenticated, token } = state

  useEffect(() => {
    token
      ? localStorageService.setToken(token)
      : localStorageService.clearToken()
  }, [token])

  useEffect(() => {
    !isAuthenticated && localStorageService.clearData()
  }, [isAuthenticated])

  // ACTIONS
  const login = (token) => {
    dispatch({
      type: 'LOGIN',
      payload: token,
    })
  }

  const authenticate = () => {
    dispatch({
      type: 'AUTHENTICATE',
    })
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
