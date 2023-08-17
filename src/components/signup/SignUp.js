import React from 'react'
import './SignUp.scss'
import {Modal,Form,Row,Col, Select,DatePicker,Input,TimePicker,Button,Card,Table,Tabs,TabPane} from "antd";

const SignUp = () => {


  return (
     <>
     <Modal style={{zIndex:2}} className="signupModal" title="Sign Up" width={500}  visible={isVisible} footer={null} onCancel={handleCancel}>
          
          <Row style={{padding:"10px"}}>
              <Col  span={24}>
      
              <Form
              
              name="basic"
              layout="inline"
              initialValues={{
                remember: true,
              }}
              onFinish={onSignUp}
            >
             

              <Form.Item
                style={{width:"46%",marginBottom:"10px"}}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input prefix={<UserAddOutlined className="site-form-item-icon" />} id="name" placeholder="Your Name" />
              </Form.Item>
               
              <Form.Item
                style={{width:"46%",marginBottom:"10px"}}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input
                 prefix={<MailOutlined className="site-form-item-icon" />} 
                 suffix={
                  <Tooltip title="Email should not be same for both agent and supplier">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                id="email"
                 placeholder="Email" />
              </Form.Item>

              <Form.Item
                style={{width:"46%",marginBottom:"10px"}}
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter mobile no",
                  },
                ]}
              >
                <Input id="mobile" placeholder="Mobile No" />
              </Form.Item>

               

              <Form.Item
                style={{width:"46%",marginBottom:"10px"}}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter password",
                  },
                ]}
              >
                <Input.Password prefix={<KeyOutlined className="site-form-item-icon" />} id="password" placeholder="New Password" />
              </Form.Item>
                
              

              <Form.Item
                style={{width:"46%",marginBottom:"10px"}}
                name="password2"
                rules={[
                  {
                    required: true,
                    message: "Please confirm password",
                  },
                ]}
              >
                <Input.Password prefix={<KeyOutlined className="site-form-item-icon" />} id="password2" placeholder="Confirm Password" />
              </Form.Item>
                
            
              

              <Form.Item style={{marginTop:"3%",marginLeft:"11%"}} {...tailLayout}>
                <Button type="primary" htmlType="submit" id="login-btn" >
                  Sign Up
                </Button>
              </Form.Item>
              
            </Form>
      
              </Col>
            </Row>
        
          </Modal>
     </>
  )
}

export default SignUp