/*******************************************************
 * UI work
 * Fahad siddiqui (fahad.siddiqui@mareana.com)
 * October, 2022
 * Version 1
 *******************************************************/
import React, { useState } from 'react';
import { Menu,Image,Row,Col} from 'antd';
import { Link } from "react-router-dom";
import {HomeFilled ,CustomerServiceFilled } from "@ant-design/icons"
import { FaHome } from "react-icons/fa"
import { RiSuitcase3Fill, RiCustomerService2Fill } from "react-icons/ri"
import { ImTicket } from "react-icons/im"
import { FaUserTie } from "react-icons/fa"
import { useRecoilState } from 'recoil';
import { loginApplied } from '../../recoil/atom/dashboardAtom';
import logo from '../../assets/images/BharatFaresLogo.jpeg'
import './MenuItems.scss';

const MENU = [

{
  title:"Home",
  key:"home",
  linkTo:'/',
  type:"link",
  iconImage: <FaHome className='menu-icon'/>
},

{
 title:"My Trip",
 key:"myTrip",
 linkTo:'/myTrip',
 type:"link",
 iconImage: <RiSuitcase3Fill className='menu-icon'/>
},
{
 title:"Check-In",
 key:"checkin",
 linkTo:'/checkin',
 type:"link",
 iconImage: <ImTicket className='menu-icon'/>
},
{
 title:"Support",
 key:"support",
 linkTo:'/support',
 type:"link",
 iconImage: <RiCustomerService2Fill  className='menu-icon'/>
}

]



const MenuItems = () => {

  var pathname = "home"

  if(location.pathname == '/myTrip'){
    pathname = 'myTrip'
  }
  if(location.pathname == '/checkin'){
    pathname = 'checkin'
  }
  if(location.pathname == '/support'){
    pathname = 'support'
  }

 const[isLogin,setIsLogin] = useRecoilState(loginApplied)
 const [selectedKey, SetSelectedKey]= useState(pathname)


  const { SubMenu } = Menu;
  const handleClick = (key)=>{
    // if(window.location.pathname == key){
    //   window.location.reload();
    // }
    SetSelectedKey(key)

  }

  // const handleSignUp = ()=>{
  //   console.log("sign up clicked")
  // }

  const handleLogin = ()=>{
    setIsLogin(true);
    console.log("Login clicked")
  }

  return (
    <>
     <Row>
      <Col className='header-container' xs={{span: 24}} md={{span:24}}>
      <div className='web-title'>
        <Image src={logo} preview={false}/>
      </div>
      
    <div className='navigation-container'>
    <Menu selectedKeys = {[selectedKey]} disabledOverflow={true} mode="horizontal">

        {MENU.map((item) =>
                <>
                <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    id={item.key}
                    //  style={{padding:"0px !important"}}
                  >
                    <Link id={"menu_"+item.key} className='navigation-list' onClick={()=>handleClick(item.key)} to={item.linkTo}>{item.iconImage}{item.title}</Link>
                    
                  </Menu.Item>
                    
                </>
              )}

         </Menu>
       </div>

      <div className='login-menu'>
      <span><FaUserTie /></span>
      <span style={{marginLeft:"7px"}} onClick={handleLogin}>Login / Sign Up</span>
      {/* <span>/</span> */}
      {/* <span> Sign Up</span> */}
      </div>
       </Col>
    </Row>
    </>  
  );
}

export default MenuItems;