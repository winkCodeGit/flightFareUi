
import React,{useState} from 'react';
import { Row, Col, Button,Form, Input, Card,Table,Tabs,TabPane,Image, Divider } from 'antd';
import './MyTrip.scss';
import myTripbackground from'../../assets/images/myTripBackground.jpeg';
import { GiCheckMark } from "react-icons/gi";
import { MdFlightTakeoff, MdFlight } from "react-icons/md";
import { BsDot, BsShieldCheck } from "react-icons/bs";
import { IoIosPerson } from "react-icons/io";
import { TeamOutlined, CalendarOutlined, CloseCircleOutlined, CheckCircleOutlined, ArrowRightOutlined, CheckSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import airAsia from '../../assets/small/airasia.jpg'
import indigo from '../../assets/small/indigo.jpg'
import vistara from '../../assets/small/vistara.jpg'
import UpComingFlight from './component/UpComingFlight';

const airlineIcon = {
  "Indigo":indigo,
  "Air Asia":airAsia,
  "Vistara":vistara
}

const myTripBg={
  backgroundImage: `url(${myTripbackground})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '700px'
};

const MyTrip = () => {
  const [showUpcoming, setShowUpcoming] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('upcoming');
  const [showInfo, setShowInfo] = useState(true)
  const navigate = useNavigate();

  
  const manageBooking =(value)=>{
    if(showUpcoming){
      setShowUpcoming(false);
    }else{
      setShowUpcoming(true);
    }
}
  
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const upComingBooking = ()=>{

    return(
      <>
  
       {showUpcoming == false && <Row className='card-item-container'>
        <Col span={24}>
          <Row className='booking-item-container'>
            <Col className='booking-item-header' span={16}>
               <div><span>Mumbai - Kolkata</span><span style={{marginLeft:"10px",color:"green"}}>in 1 Day</span> </div>
               <div>One Way Flight <span>.Booking Id-MF27856458</span></div>
            </Col>

            <Col span={8}>
              <Button onClick={manageBooking}>VIEW & MANAGE BOOKING</Button>
            </Col>
          </Row>

          <Row className='booking-item-body'>
             <Col className='booking-body-details' span={8}>
              <div>From</div>
              <div>23 May 2023, 07.30AM</div>
              <div>BOM-Mumbai Terminal-T1</div>
              <div><GiCheckMark/> Is subjected to a cancellation penalty</div>
            
             </Col>
             <Col className='booking-body-details' span={5}>
             <div>To</div>
             <div>23 May 2023, 09.30AM</div>
             <div>KOL-Kolkata Terminal-T1</div>
             </Col>

             <Col style={{marginTop:"22px"}} className='booking-body-details' span={5}>
              <div><MdFlightTakeoff /> Indigo Qp87965</div>
              <div><TeamOutlined /> Yash Choudhury</div>
              
             </Col>
             <Col style={{marginTop:"22px"}} className='booking-body-details' span={6}>
               <div> <CloseCircleOutlined /> Cancel Booking</div>
               <div> <CalendarOutlined /> Change Travel Date</div>
             </Col>
          </Row>
        </Col>

       </Row>}

       {showUpcoming == false && <Row className='card-item-container'>
        <Col span={24}>
          <Row className='booking-item-container'>
            <Col className='booking-item-header' span={16}>
               <div><span>Mumbai - Kolkata</span><span style={{marginLeft:"10px",color:"green"}}>in 1 Day</span> </div>
               <div>One Way Flight <span>.Booking Id-MF27856458</span></div>
            </Col>

            <Col span={8}>
              <Button onClick={manageBooking}>VIEW & MANAGE BOOKING</Button>
            </Col>
          </Row>

          <Row className='booking-item-body'>
             <Col className='booking-body-details' span={8}>
              <div>From</div>
              <div>23 May 2023, 07.30AM</div>
              <div>BOM-Mumbai Terminal-T1</div>
              <div><GiCheckMark/> Is subjected to a cancellation penalty</div>
            
             </Col>
             <Col className='booking-body-details' span={5}>
             <div>To</div>
             <div>23 May 2023, 09.30AM</div>
             <div>KOL-Kolkata Terminal-T1</div>
             </Col>

             <Col style={{marginTop:"22px"}} className='booking-body-details' span={5}>
              <div><MdFlightTakeoff /> Indigo Qp87965</div>
              <div><TeamOutlined /> Yash Choudhury</div>
              
             </Col>
             <Col style={{marginTop:"22px"}} className='booking-body-details' span={6}>
               <div> <CloseCircleOutlined /> Cancel Booking</div>
               <div> <CalendarOutlined /> Change Travel Date</div>
             </Col>
          </Row>
        </Col>

       </Row>}
       
       
       {showUpcoming == true && <UpComingFlight manageBooking={manageBooking} />}
       
         </>
    )
     
  }
  const cancelledBooking = ()=>{
         
  }
  const completedBooking = ()=>{
         
  }
 

  const tabList = [
    {
      key: 'upcoming',
      label:'UPCOMING',
      children: upComingBooking()
    },
    {
      key: 'cancelled',
      label:'CANCELLED',
      children:"qqqq"
    },
    {
      key: 'completed',
      label:'COMPLETED',
      children:"xxxx"
    },
  ];
  return (
    <>
      <Row style={{position:"relative"}}>
    <Col style={myTripBg}  span={24}>
     
     <Card
       bordered ={false}
       className='booking-details'
       title = {"My Bookings"}
     >
      <Tabs defaultActiveKey="upcoming" items={tabList} onChange={onTabChange} />
      
     </Card>

    </Col> 

    {showUpcoming == false &&  <Row className='mytrip-info-container'>
           <h1 style={{marginLeft:"2.5rem",marginTop:"8px"}}>Fetch your trips to:</h1>
            <Col span={24}>

            <Row style={{alignItems:"center"}}>
            <Col className='info-items' span={5}>
            <div style={{fontSize:"24px"}}><GiCheckMark/> </div>
           <div> CHECK YOUR TRIP DETAILS</div>
           </Col>

         <Col  className='info-items' span={5}>
         <div style={{fontSize:"24px"}}><GiCheckMark/> </div>
           <div> CANCEL YOUR TRIP</div>
         </Col>

         <Col className='info-items' span={5}>
            <div style={{fontSize:"24px"}}><GiCheckMark/> </div>
            <div> AMEND YOUR FLIGHTS</div>
         </Col>
      

          <Col className='info-items' span={5}>
            <div style={{fontSize:"24px"}}><GiCheckMark/> </div>
            <div> PRINT E TICKET</div>
         </Col>

          <Col className='info-items' span={4}>
            <div style={{fontSize:"24px"}}><GiCheckMark/> </div>
            <div> AND MORE...</div>
         </Col>
           
           </Row>
          </Col> 
         </Row> }


     </Row>
     
    </>
  )
}

export default MyTrip