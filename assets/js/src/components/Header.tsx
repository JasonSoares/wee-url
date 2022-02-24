import React from 'react'

function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-indigo-900 to-indigo-700 p-6 fixed w-full z-10 top-0">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="text-2xl pl-2">
          🦊 &nbsp;
          <em>wee url</em>
        </span>
      </div>
    </nav>
  )
}

export default Header
