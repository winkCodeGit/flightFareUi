import React, { useState } from 'react'
import { useRecoilState } from "recoil";
import {Modal,Form,Row,Col, Select,DatePicker,Input,TimePicker,Button,Card,Table,Tabs,TabPane,Tooltip} from "antd";
import { loginApplied } from '../../recoil/atom/dashboardAtom';

import './Login.scss'
import { InfoCircleOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';

const Login = () => {

  const [count,setCount] = useState(0)
  const[loginEnable,setLoginEnable] = useRecoilState(loginApplied)
  const [isSignup, setIsSignup] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const onLogin = ()=>{
    console.log("")
  }

  const handleCancel = ()=>{
    setLoginEnable(false)
    setCount(count+1)
    
  }
  const onSignUpEnable = ()=>{
    setIsSignup(true);
    setIsSignIn(false);
    setIsForgotPassword(false);
  }
  const onSignInEnable = ()=>{
    setIsSignIn(true);
    setIsSignup(false);
    setIsForgotPassword(false);
  }
  const onForgotPasswordEnable = ()=>{
    setIsForgotPassword(true);
    setIsSignup(false);
    setIsSignIn(false);
   
  }

  return (
    <>
    
    <Modal style={{zIndex:2}} key={count} className="loginModal" title={isSignIn?"BHARAT FARES CUSTOMER LOGIN:":isSignup?"BHARAT FARES CUSTOMER SIGN UP:":"BHARAT FARES PASSWORD RESET:"}
     width={450}  open={loginEnable} footer={null} onCancel={handleCancel}>
  
    {isSignIn &&
         <Row style={{padding:"10px"}}>
             <Col span={24}  className='login-form'>
             
             <Form
             name="basic"
             layout="inline"
             initialValues={{
               remember: true,
             }}
             onFinish={onLogin}
           >
            

          <Row>
            <Col span={24}>
              <div className='input-title'>Registered Mobile No</div>
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="mobile"
               rules={[
                 {
                   required: true,
                   message: "Please enter mobile no",
                 },
               ]}
             >
               <Input id="mobile" placeholder="Enter Your Registered Mobile No" />
             </Form.Item>
             </Col>
          </Row>
              
          <Row>
            <Col span={24}>
            <div className='input-title'>Password</div>
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="password"
               rules={[
                 {
                   required: true,
                   message: "Please enter password",
                 },
               ]}
             >
               <Input.Password  id="password"  placeholder="Enter Your Password" />
             </Form.Item>
             </Col>
          </Row>
            
          <Row>
            <Col span={24} className='button-container'>
            
               <Form.Item>
                <Button className='login-btn' type="primary">
                       SIGN-IN
                  </Button>
                 <span>
                 <Button type='link' className='button-link' onClick={onForgotPasswordEnable}>Forgot Password</Button> 
                    </span>
                  </Form.Item>
            </Col>
          </Row>

           </Form>
        
        <Row style={{marginTop:"10px",marginBottom:"-20px"}}>
           <Col span={24}>
                <div>
                <span className='footer-text'>Not A Member? </span><Button type='link' className='button-link' onClick={onSignUpEnable}>Sign Up</Button>
                </div>
              </Col>
             </Row>

             </Col>
           </Row> 
}
       
       {isSignup &&
           <Row style={{padding:"10px"}}>
             <Col span={24} className='login-form'>
             
             <Form
             
             name="basic"
             layout="inline"
             initialValues={{
               remember: true,
             }}
             onFinish={onLogin}
           >
            
            <Row>
            <Col span={24}>
              <div className='input-title'>Enter Your Full Name</div>
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="name"
               rules={[
                 {
                   required: true,
                   message: "Please enter your name",
                 },
               ]}
             >
               <Input
               id="name"
                placeholder="Enter Your First Name" />
             </Form.Item>

             </Col>
          </Row>
            
          <Row>
            <Col span={24}>
              <div className='input-title'>Mobile Number</div>
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="mobile"
               rules={[
                 {
                   required: true,
                   message: "Please enter mobile no",
                 },
               ]}
             >
               <Input id="mobile" placeholder="Enter Your Mobile Number" />
             </Form.Item>
             </Col>
          </Row>
               
          <Row>
            <Col span={24}>
              <div className='input-title'>Email-id</div>   
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="email"
               rules={[
                 {
                   required: true,
                   message: "Please enter email-id",
                 },
               ]}
             >
              <Input id="email" placeholder="Enter Your Email-id" />
             </Form.Item>
             </Col>
          </Row>
             
          <Row>
            <Col span={24}>
              <div className='input-title'>New Password</div> 
              <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="password"
               rules={[
                 {
                   required: true,
                   message: "Please enter password",
                 },
               ]}
             >
               <Input.Password id="password" className='inputPassword' placeholder="Enter Your Password" />
             </Form.Item>
             </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className='input-title'>Confirm Password</div> 
              <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="password2"
               rules={[
                 {
                   required: true,
                   message: "Please enter your confirm password",
                 },
               ]}
             >
               <Input.Password id="password2" className='inputPassword' placeholder="Enter Your Confirm Password" />
             </Form.Item>
             </Col>
          </Row>
             
          <Row>
            <Col span={24} className='button-container'>
            
               <Form.Item>
                <Button className='login-btn' type="primary">
                       SUBMIT
                  </Button>
                  </Form.Item>
            </Col>
          </Row>
                {/* {...tailLayout} */}
           
           </Form>
           <div>
              <span className='footer-text'>Already A Member?</span> <Button type='link' className='button-link' onClick={onSignInEnable}>Login</Button>
            </div>
             </Col>
           </Row>
      }
          
          {isForgotPassword &&
           <Row style={{padding:"10px"}}>
             <Col span={24} className='login-form'>
             
             <Form
             
             name="basic"
             layout="inline"
             initialValues={{
               remember: true,
             }}
             onFinish={onLogin}
           >
              <Row>
            <Col span={24}>
              <div className='input-title'>Registered Email-id</div>
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="email"
               rules={[
                 {
                   required: true,
                   message: "Please enter email",
                 },
               ]}
             >
               <Input
               id="email"
                placeholder="Type Your Registered Email-id" />
             </Form.Item>

             <div>
             <Button className='login-btn' type="primary">
                       GET-OTP
                  </Button>
             </div>
             </Col>
          </Row>
            
          <Row>
            <Col span={24}>
              <div className='input-title'>One Time Password</div>
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="otp"
               rules={[
                 {
                   required: true,
                   message: "Please enter otp",
                 },
               ]}
             >
               <Input id="otp" placeholder="Enter Your Otp" />
             </Form.Item>
             </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className='input-title'>New Password</div>
             <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="newPassword"
               rules={[
                 {
                   required: true,
                   message: "Please enter new password",
                 },
               ]}
             >
               <Input.Password id="newPassword" className='inputPassword' placeholder="Enter Your New Password" />
             </Form.Item>
             </Col>
          </Row>
             
          <Row>
            <Col span={24}>
              <div className='input-title'>Confirm Password</div>
              <Form.Item
               style={{width:"85%",marginBottom:"10px"}}
               name="ConfirmPassword"
               rules={[
                 {
                   required: true,
                   message: "Please confirm your password",
                 },
               ]}
             >
               <Input.Password  id="confirmPassword" className='inputPassword' placeholder="Enter Your Confirm Password" />
             </Form.Item>
             </Col>
          </Row>
           
          <Row>
            <Col span={24} className='button-container'>
            
               <Form.Item>
                <Button className='login-btn' type="primary">
                       SUBMIT
                  </Button>
                  </Form.Item>
            </Col>
          </Row>
                {/* {...tailLayout} */}
          
           </Form>
           <div>
              <span className='footer-text'> Wnat To Try Again</span> <Button type='link' className='button-link' onClick={onSignInEnable}>Login</Button>
            </div>
             </Col>
           </Row>
      }
           
         </Modal> 
         
       
    </>
  )
}

export default Login