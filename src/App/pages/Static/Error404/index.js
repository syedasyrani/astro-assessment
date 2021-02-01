import React from 'react'

const Error404 = ({ location }) => {
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  )
}

export default Error404
