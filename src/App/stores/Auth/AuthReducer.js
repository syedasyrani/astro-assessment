const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        token: payload,
      }

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      }

    case 'FETCH_USER':
      return {
        ...state,
        user: payload,
      }

    case 'AUTHENTICATE':
      return {
        ...state,
        isAuthenticated: true,
      }

    default:
      return state
  }
}

export default AuthReducer
