import React from 'react'

import Header from './Header'
// import Sidebar from './Sidebar'
import Footer from './Footer'

const LayoutView = ({ children }) => {
  return (
    <div id="layoutRoot" className="flex flex-row min-h-screen">
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-row mb-8">{children}</div>
        <Footer />
      </div>
      {/* <Sidebar /> */}
    </div>
  )
}

export default LayoutView
