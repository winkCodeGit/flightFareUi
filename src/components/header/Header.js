import React from 'react'
import './Header.scss'
import MenuItem from 'antd/es/menu/MenuItem'
import MenuItems from './MenuItems'

const Header = () => {
  return (
    <nav className="header-div">
    
     <MenuItems /> 
  </nav>
  )
}

export default Header