import React, {useState, useEffect } from 'react'
import { Card, Row, Col,Collapse,Image, Button, Select, Space, Form, Input, Checkbox,Tag  } from 'antd'
import { MailOutlined, MobileOutlined, UserOutlined, CreditCardOutlined, BankOutlined, CheckOutlined } from '@ant-design/icons';

import { FaCheckCircle } from 'react-icons/fa';
import './BookingConfirm.scss'

const { Panel } = Collapse;

const BookingConfirms = () => {
  const [activeKey, setActiveKey] = useState(['1']);
  const [completedPanels, setCompletedPanels] = useState([]);

  const handlePanelChange = (key) => {
    setActiveKey(key);
  };

  const handleContinue = () => {
    const currentActiveKey = activeKey[0];
    const nextKey = (parseInt(currentActiveKey, 10) + 1).toString();
    setActiveKey([nextKey]);
    setCompletedPanels([...completedPanels, currentActiveKey]);
  };

  const isPanelCompleted = (key) => {
    return completedPanels.includes(key);
  };

  return (
    <>
    <Row>
        <Col span={16}>
                <Space className='bookTicket-container' style={{width:"100%",paddingLeft:"20px",minHeight:"390px",paddingBottom:"30px"}} direction="vertical">
                <Collapse activeKey={activeKey}
                onChange={handlePanelChange}
                accordion={true}
                expandIconPosition="right"
                >
                <Panel
                    header={
                    <span>
                        Panel 1 {isPanelCompleted('1') && <FaCheckCircle style={{ color: 'green' }} />}
                    </span>
                    }
                    key="1"
                >
                    <p>Content of panel 1</p>
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                <Panel
                    header={
                    <span>
                        Panel 2 {isPanelCompleted('2') && <FaCheckCircle style={{ color: 'green' }} />}
                    </span>
                    }
                    key="2"
                >
                    <p>Content of panel 2</p>
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                <Panel
                    header={
                    <span>
                        Panel 3 {isPanelCompleted('3') && <FaCheckCircle style={{ color: 'green' }} />}
                    </span>
                    }
                    key="3"
                >
                    <p>Content of panel 3</p>
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                <Panel
                    header={
                    <span>
                        Panel 4 {isPanelCompleted('4') && <FaCheckCircle style={{ color: 'green' }} />}
                    </span>
                    }
                    key="4"
                >
                    <p>Content of panel 4</p>
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                </Collapse>
                    </Space>
        </Col>
        
        <Col span={8}>Payment calculation

        </Col>
    </Row>
    
    </>
      );
};

export default BookingConfirms;
