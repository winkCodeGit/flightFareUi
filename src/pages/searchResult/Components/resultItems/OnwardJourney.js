import React, {useState, useEffect } from 'react'
import { Card, Row, Col,Collapse,Image, Button, Select,Checkbox,Tooltip  } from 'antd'
import './ResultsItems.scss'

import airAsia from '../../../../assets/small/airasia.jpg'
import indigo from '../../../../assets/small/indigo.jpg'
import vistara from '../../../../assets/small/vistara.jpg'
import spicejet from '../../../../assets/small/spicejet.jpg'
import airIndia from '../../../../assets/small/airIndia.jpg'
import starAir from '../../../../assets/small/starAir.jpg'
import allianceAir from '../../../../assets/small/allianceAir.jpg'
import akasaAir from '../../../../assets/small/akasaAir.jpg'
import aeroplane from '../../../../assets/small/aeroplane.jpg'
import { CaretDownOutlined,LineOutlined,DownOutlined } from '@ant-design/icons'
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md'
import { IoIosAirplane } from 'react-icons/io'
import { useNavigate } from "react-router-dom";

import moment from 'moment';
import { getFareRules } from '../../../../Api/LandingPage'

const { Panel } = Collapse;
const airlineIcon = {
    "IndiGo":indigo,
    "Air India Express":airAsia,
    "Vistara":vistara,
    "SpiceJet":spicejet,
    "AirIndia":airIndia,
    "Star Air":starAir,
    "Alliance Air":allianceAir,
    "Akasa Air":akasaAir
    
}
const OnwardJourney = (props) => {

    const navigate = useNavigate();

    // const [showViewPrice, setShowViewPrice] = useState(false);
    const [showFlightDetails, setShowFlightDetails] = useState(false);
    // const [cancellationFee, setCancellationFee] = useState("");
    // const [dateChangeFee, setDateChangeFee] = useState("");

    const text= <span>1 Bag per Passenger</span> 


    const handleBookTicket = (flight_key,triptype,price)=>{
        
        const airlinesData = props?.resultData[triptype]?.filter((item)=>{
            
            return item.flight_key === flight_key
        });
       localStorage.setItem('airlinesData',JSON.stringify(airlinesData));
   
        navigate(`/bookTicket?airlines=${airlinesData[0]?.flight_details[0]?.airlines}&flightNo=${airlinesData[0]?.flight_details[0]?.flightNo}&airprot_from=${airlinesData[0]?.flight_details[0]?.departureFrom}&departureDate=${airlinesData[0]?.flight_details[0]?.departureDate}
        &departureTime=${airlinesData[0]?.flight_details[0]?.departureTime}&airprot_to=${airlinesData[0]?.flight_details[0]?.arrival}&arrivalDate=${airlinesData[0]?.flight_details[0]?.arrivalDate}&arrivalTime=${airlinesData[0]?.flight_details[0]?.arrivalTime}
        &duration=${airlinesData[0]?.flight_details[0]?.duration}&price=${price}&cabin_baggage=${airlinesData[0]?.flight_details[0]?.cabin_baggage}&checkin_baggage=${airlinesData[0]?.flight_details[0]?.checkin_baggage}
        &seats=${airlinesData[0]?.seats}&seatType=${airlinesData[0]?.seatType}&fareRuleKey=${airlinesData[0]?.fare_rule_key}`);
    } 

   
  return (
    <>
<div className='result-card' key={props?.indx}>
<Card hoverable={true}>
    <Row style={{paddingLeft:"80px",background:"lightblue"}}>
        <Col span={4}>
            <div style={{fontSize:"20px",fontWeight:"600"}}>Airline</div> 
        </Col>
        <Col span={5}>
            <div style={{fontSize:"20px",fontWeight:"600"}}>Depart</div> 
        </Col>
        <Col span={5}>
            <div style={{fontSize:"20px",fontWeight:"600"}}>Duration</div> 
        </Col>
        <Col span={4}>
            <div style={{fontSize:"20px",fontWeight:"600"}}>Arrive</div> 
        </Col>
        <Col span={4}>
            <div style={{fontSize:"20px",fontWeight:"600"}}>Price</div> 
        </Col>
        
    </Row>
    </Card>

<Card className='flight-details-body' hoverable={true}>
<Row style={{paddingLeft:"80px"}} className='airlines-detail'>
    <Col span={4}>
        <div>{<Image src={airlineIcon[props?.item?.flight_details[0]?.airlines]} preview={false}/>}</div>
        {/* <div style={{marginLeft:"7px"}}> */}
            <div style={{fontSize:"20px",fontWeight:"750",marginLeft:"-6px"}}>{props?.item?.flight_details[0]?.airlines}</div>
            <div style={{fontSize:"14px",fontWeight:"600",color:"grey",marginLeft:"-2px",marginTop:"-8px"}}>{props?.item?.flight_details[0]?.flightNo}</div>
        {/* </div> */}
        </Col>
    <Col span={4}>
        <div style={{fontSize:"25px",fontWeight:"800"}}>{props?.item?.flight_details[0]?.departureTime}</div>
        <div style={{fontSize:"16px",fontWeight:"700",color:"grey"}}>{props?.item?.flight_details[0]?.departureFrom}</div>
        <div style={{fontSize:"16px",fontWeight:"700",color:"grey"}}>{moment(props?.item?.flight_details[0]?.departureDate).format('Do MMMM, YYYY')}</div>
        </Col>
    <Col span={5}>
        <div style={{fontSize:"17px",fontWeight:"900",marginLeft:"46px",marginTop:"10px",color:"grey"}}>
            {`${Math.floor((props?.item.total_duration)/60)} HRS ${(props?.item.total_duration)%60} MINS`}</div>
        <div><hr style={{marginLeft:"39px",width:"9rem",color:"#a1c1c1"}}/> </div>
            <div style={{marginLeft:"4rem",fontSize:"18px",fontWeight:"700",color:"grey"}}>
            {props?.item.total_stops >0? `${"Via"} ${props?.item?.flight_details.slice(0,-1).map((code,indx)=>code.arrivalCode)}` :"Non-stop"}</div>
    </Col>
    <Col span={4}>
        <div style={{fontSize:"25px",fontWeight:"800",marginLeft:"51px"}}>{props?.item?.flight_details[props?.item?.total_stops].arrivalTime}</div>
        <div style={{fontSize:"18px",fontWeight:"700",marginLeft:"51px",color:"grey"}}>{props?.item?.flight_details[props?.item?.total_stops].arrival}</div>
        <div style={{fontSize:"16px",fontWeight:"700",color:"grey",marginLeft:"51px"}}>{moment(props?.item?.flight_details[props?.item?.total_stops].arrivalDate).format('Do MMMM, YYYY')}</div>
        
        </Col>

        <Col span={4}>
        <div style={{fontSize:"27px",fontWeight:"800",marginLeft:"3rem"}}>
            {props?.item.flightFares && props?.item.flightFares.length > 0 && Math.round(props?.item.flightFares[0].fareAmount.totalFare)}</div>
        
            <div style={{fontSize:"14px",fontWeight:"700",marginLeft:"3rem",color:"red"}}>{props?.item.seats} Seats left</div>
        </Col>
        <Col span={3}>
            <div> <Button className='book-btn' type='primary' onClick={()=>{
                handleBookTicket(props?.item.flight_key,'onwardJourney',
                Math.round(props?.item.flightFares[0].fareAmount.totalFare))
                
                setShowFlightDetails(false)
                }}>BOOK NOW </Button></div>


            <div style={{marginTop:"10px",marginLeft:"-10px",color:"#e03c3c"}}><span> <IoIosAirplane />
            </span> <span style={{fontSize:"16px",fontWeight:"600",cursor:"pointer"}} onClick={()=>{
                
                setShowFlightDetails(!showFlightDetails )
              
                }}>Flight Details</span></div>
        </Col>
        
   </Row>

   

     {showFlightDetails && <Row className='Showflight-details'>
         <Col span={24}>

         <Row style={{paddingLeft:"80px",marginTop:"10px", background:"rgb(207 207 207 / 36%)"}}>
            <Col span={24}>
                <div style={{fontSize:"18px",fontWeight:"700",color:"grey",marginLeft:"31rem"}}>Flight Details</div>
            </Col>
        </Row>

             {props?.item['flight_details'] && props?.item['flight_details'].length>0 && props?.item['flight_details']?.map((elem,indx)=>{
              
            return(
            <>
                <Row key={indx} style={{paddingLeft:"80px", border:"1px solid #e6e6e6",borderBottom:"none"}}>
                <Col span={4}>
                <div>{<Image style={{width:"20%",marginTop:"10px"}} src={airlineIcon[elem.airlines]} preview={false}/>}</div>
                    <div style={{fontSize:"16px",fontWeight:"650",marginTop:"12px"}}>{elem.airlines}</div>
                    <div style={{fontSize:"14px",fontWeight:"600",color:"grey"}}>{elem.flightNo}</div>
                
                </Col>

                <Col span={4}>
                <div style={{fontSize:"16px",fontWeight:"600",marginTop:"10px"}}>{elem.departureTime}</div>
                <div style={{fontSize:"14px",color:"grey"}}>{elem.departureFrom}</div>
                <div style={{fontSize:"14px",color:"grey"}}>
                {moment(elem.departureDate).format('Do MMMM, YYYY')}</div>
                </Col>
                
            <Col span={6}>
                <div style={{fontSize:"15px",fontWeight:"600",marginLeft:"46px",color:"grey",marginTop:"41px"}}>
                    {`${Math.floor((elem.duration)/60)} HRS ${(elem.duration)%60} MINS`}</div>

             <div style={{marginTop:"31px"}}>
                 {elem.layover_time !== null ? (
                    <>
                     <div className='layover-time' style={{ fontSize: "18px", color: "grey",fontWeight:"750",marginLeft:"-50px" }}>
                        <div></div>
                        <div className='layover-text'>
                           Lay Over {`${Math.floor(elem.layover_time / 60)} HRS ${elem.layover_time % 60} MINS`}
                        </div>
                       <div></div>
                    </div>
                    </>
                    
                    
                ) : null}
                 </div>
                
            </Col>

            <Col span={4}>
                <div style={{fontSize:"16px",fontWeight:"600",marginTop:"10px",marginLeft:"3rem"}}>{elem.arrivalTime}</div>
                <div style={{fontSize:"14px",color:"grey",marginLeft:"3rem"}}>{elem.arrival}</div>
                <div style={{fontSize:"14px",color:"grey",marginLeft:"3rem"}}>
                {moment(elem.arrivalDate).format('Do MMMM, YYYY')}</div>
                </Col>

                </Row>

            </>
                    )
                })}

            </Col>
            </Row>}
     
       </Card>
            
            </div>
            
    </>
  )
}

export default OnwardJourney