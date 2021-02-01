import React from 'react'
import LayoutView from './LayoutView'

const Layout = ({ title, children }) => {
  return <LayoutView title={title}>{children}</LayoutView>
}

export default Layout
