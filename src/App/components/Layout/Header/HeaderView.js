import React from 'react'
import AstroLogo from '../../../../assets/images/Astro_Go_Beyond.svg'

const HeaderView = () => {
  return (
    <div className="bg-white shadow-lg">
      <div className="md:container md:mx-auto flex flex-row py-2 px-4 content-center items-center justify-between ">
        <img
          src={AstroLogo}
          alt="astro-logo"
          className=""
          style={{ height: 75, width: 75 }}
        />
        <div className="flex flex-row border rounded">
          <button className="border-r py-2 px-4 hover:bg-pink-500">A</button>
          <button className="border-r py-2 px-4 hover:bg-pink-500">B</button>
          <button className="py-2 px-4 hover:bg-pink-500">C</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderView
