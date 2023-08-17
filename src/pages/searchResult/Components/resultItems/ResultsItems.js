import React, {useState, useEffect } from 'react'
import { Card, Row, Col,Collapse,Image, Button, Select,Checkbox  } from 'antd'
import './ResultsItems.scss'
import qs from 'query-string';
import airAsia from '../../../../assets/small/airasia.jpg'
import indigo from '../../../../assets/small/indigo.jpg'
import vistara from '../../../../assets/small/vistara.jpg'
import spicejet from '../../../../assets/small/spicejet.jpg'
import airIndia from '../../../../assets/small/airIndia.jpg'
import starAir from '../../../../assets/small/starAir.jpg'
import allianceAir from '../../../../assets/small/allianceAir.jpg'
import akasaAir from '../../../../assets/small/akasaAir.jpg'

import { CaretDownOutlined,LineOutlined,DownOutlined } from '@ant-design/icons'
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md'
import { IoIosAirplane } from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import { getSerachData} from '../../../../Api/LandingPage';
import moment from 'moment';
import OnwardJourney from './OnwardJourney';

const { Panel } = Collapse;

const airlineIcon = {
    "IndiGo":indigo,
    "AirAsia India":airAsia,
    "Vistara":vistara,
    "SpiceJet":spicejet,
    "AirIndia":airIndia,
    "Star Air":starAir,
    "Alliance Air":allianceAir,
    "Akasa Air":akasaAir
    
}


const ResultsItems = () => {

    const Option = Select.Option;
    const navigate = useNavigate();
    const [returnDay, setReturnDay] = useState('')
    const [resultData, setResultData]= useState([]);
    const [trip, setTrip] = useState('');
    

    const getAirlinesDetails = async()=>{
        try{
            //  params = urls paser;
            let parsed = qs.parse(location.search);
            parsed.departureDate=parsed?.departureDate?.trim();
            parsed.airport_from=parsed?.airport_from?.trim();
            parsed.airport_to=parsed?.airport_to?.trim();
            parsed.returnDate=parsed?.returnDate?.trim();
            // debugger
             const res = await getSerachData(parsed);
            // console.log(res)
            setResultData(res);
            console.log(resultData)
        }catch(error){
            console.log(error);
        }  
    }

    
      useEffect(() => {
        getAirlinesDetails()
       
      }, [])

   


       
  return (
        <>
        <Row style={{padding:"10px",height:"auto"}}>
        <Col span={24}>

        <Row className='flight-filters'>
            <Col style={{marginLeft:"43px"}} span={12}>
                <div style={{fontSize:"24px",fontWeight:"600"}}><span><MdFlightTakeoff/> </span> Departing Flight</div>
                {resultData["onwardJourney"] && resultData["onwardJourney"].length > 0 &&  <div style={{fontSize:"22px",fontWeight:"600",marginTop:"10px",marginBottom:"17px"}}>
               <span>{`${resultData.onwardJourney[0].departureFrom} to ${resultData.onwardJourney[0].arrival} `}</span>
               <span>{moment(resultData["onwardJourney"][0].departureDate).format('Do MMMM, YYYY')}</span>
                  </div>}
            </Col>
            <Col span={2} style={{marginRight:"10px"}}>
                <Select placeholder="Time"
                 mode="multiple"
                 style={{ width: '100%' }}
                 optionRender={(node) => (
                <Checkbox checked={node.selected}>{node.label}</Checkbox>
                    )}
                >
                <Option value="00-06">00-06hrs</Option>
                <Option value="06-12">06-12hrs</Option>
                <Option value="12-18">12-18hrs</Option>
                <Option value="18-00">18-00hrs</Option>
                </Select>  
            </Col>

            <Col span={2} style={{marginRight:"10px"}}>
            <Select
                placeholder="Stops"
                mode="multiple"
                style={{ width: '100%'}}
                optionRender={(node) => (
                <Checkbox checked={node.selected}>{node.label}</Checkbox>
                )}
            >
                <Option value="all">All</Option>
                <Option value="non-stop">Non-Stop</Option>
                
            </Select>
            </Col>

            <Col span={2} style={{marginRight:"10px"}}>
                        <Select placeholder="Price">
                        </Select>
                </Col>

            <Col span={3}>
                <Select 
                placeholder="Airlines"
                mode="multiple"
                style={{ width: '120px' }}
                optionRender={(node) => (
                <Checkbox checked={node.selected}>{node.label}</Checkbox>
                )}
            >
                <Option value="all-airlines">All Airlines</Option>
                <Option value="indigo">Indigo</Option>
                <Option value="airAsia">Air Asia</Option>
                <Option value="spicejet">Spicejet</Option>
                <Option value="airIndia">Air India</Option>
                </Select>
            </Col>
        </Row>
{resultData["onwardJourney"] && resultData["onwardJourney"].length > 0 && resultData["onwardJourney"].map((item,indx)=>{
    var totalDuration = 0;
    return(
        <>  
        <OnwardJourney resultData={resultData} indx ={indx} item ={item}/>
        </>
    )
})}

{true && <Row>
        <Col style={{marginLeft:"43px"}} span={24}>
        <div style={{fontSize:"24px",fontWeight:"600"}}><span><MdFlightLand/> </span> Return Flight</div>
        {resultData["returnJourney"] && resultData["returnJourney"].length > 0 &&  <div style={{fontSize:"22px",fontWeight:"600",marginTop:"10px",marginBottom:"17px"}}>
               <span>{`${resultData.returnJourney[0].departureFrom} to ${resultData.returnJourney[0].arrival} `}</span>
               <span>{moment(resultData["returnJourney"][0].departureDate).format('Do MMMM, YYYY')}</span>
                  </div>}
            {resultData["returnJourney"] && resultData["returnJourney"].length > 0 && resultData["returnJourney"].map((item,indx)=>{
    return(
        <>  
        
        <div className='result-card'>
        <Card>
            <Row style={{paddingLeft:"80px"}}>
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

            <Card className='flight-details-body'>
                <Row style={{paddingLeft:"80px"}}>
                    <Col span={4} style={{display:"flex"}}>
                        <div>{<Image src={airlineIcon[item.airlines]} preview={false}/>}</div>
                        <div style={{marginLeft:"7px"}}>
                            <div style={{fontSize:"20px",fontWeight:"750",marginTop:"12px"}}>{item.airlines}</div>
                          <div style={{fontSize:"14px",fontWeight:"600",color:"grey"}}>{item.flightNo}</div>
                        </div>
                        </Col>

                        <Col span={4}>
                       <div style={{fontSize:"25px",fontWeight:"800"}}>{item.departureTime}</div>
                       <div style={{fontSize:"16px",fontWeight:"700",color:"grey"}}>{item.departureFrom}</div>
                       <div style={{fontSize:"16px",fontWeight:"700",color:"grey"}}>{moment(item.departureDate).format('Do MMMM, YYYY')}</div>
                        </Col>
                    <Col span={5}>
                        <div style={{fontSize:"17px",fontWeight:"900",marginLeft:"46px",marginTop:"10px",color:"grey"}}>
                             {`${Math.floor((item.duration)/60)} HRS ${(item.duration)%60} MINS`}</div>
                        <div><hr style={{marginLeft:"39px",width:"9rem",color:"#a1c1c1"}}/> </div>
                         <div style={{marginLeft:"4rem",fontSize:"18px",fontWeight:"700",color:"grey"}}>Non-Stop</div>
                    </Col>
                    <Col span={4}>
                      <div style={{fontSize:"25px",fontWeight:"800",marginLeft:"51px"}}>{item.arrivalTime}</div>
                      <div style={{fontSize:"18px",fontWeight:"700",marginLeft:"51px",color:"grey"}}>{item.arrival}</div>
                        <div style={{fontSize:"16px",fontWeight:"700",color:"grey",marginLeft:"51px"}}>{moment(item.arrivalDate).format('Do MMMM, YYYY')}</div>
                        
                        </Col>

                        <Col span={4}>
                        <div style={{fontSize:"27px",fontWeight:"800",marginLeft:"3rem"}}>
                            {item.flightFares && item.flightFares.length > 0 && item.flightFares[0].fareAmount.totalFare}</div>
                        
                         <div style={{fontSize:"14px",fontWeight:"700",marginLeft:"3rem",color:"red"}}>{item.seats} Seats left</div>
                        </Col>
                        <Col span={3}>
                           <div> <Button className='book-btn' type='primary' >View Prices <span ><DownOutlined style={{width:"10px",marginLeft:"5px"}}/></span></Button></div>
                           <div style={{marginTop:"10px",marginLeft:"-10px",color:"#e03c3c"}}><span> <IoIosAirplane /></span> <span style={{fontSize:"16px",fontWeight:"600",cursor:"pointer"}}>Flight Details</span></div>
                        </Col>                   
                        
                </Row>

                <Row  className='flight-details-collapse'>
                    <Col span={24}>
                    <Collapse expandIconPosition="right">
                    <Panel key={indx} showHeader={false}>

                    <Row style={{paddingLeft:"80px", background:"rgb(207 207 207 / 36%)"}}>
                        <Col span={5}>
                            <div style={{fontSize:"18px",fontWeight:"600"}}>FARES</div> 
                        </Col>
                        <Col span={3}>
                            <div style={{fontSize:"18px",fontWeight:"600"}}>CABIN BAG</div> 
                        </Col>
                        <Col span={2}>
                            <div style={{fontSize:"18px",fontWeight:"600"}}>CHECK-IN</div> 
                        </Col>
                        <Col span={3}>
                            <div style={{fontSize:"18px",fontWeight:"600"}}>CANCELLATION</div> 
                        </Col>
                        <Col span={3}>
                            <div style={{fontSize:"18px",fontWeight:"600"}}>DATE CHANGE</div> 
                        </Col>
                        <Col span={2}>
                            <div style={{fontSize:"18px",fontWeight:"600"}}>SEAT</div> 
                        </Col>
                        <Col span={2}>
                            <div style={{fontSize:"18px",fontWeight:"600"}}>MEAL</div> 
                        </Col>
                            </Row>

                 { item["flightFares"] && item["flightFares"].length>0 && item["flightFares"]?.map((elem,indx)=>{
                    return(
                        <>
                      
        
                    <Row style={{paddingLeft:"80px",marginTop:"20px"}}>
                            <Col span={5}>
                            <div>
                                <div style={{fontSize:"18px",fontWeight:"700"}}>{elem.fareType}</div>
                                <div style={{fontSize:"15px",fontWeight:"600"}}>Fare offered by airline</div>
                            </div> 
                        </Col>
                        <Col span={3}>
                            <div style={{fontSize:"16px",fontWeight:"600"}}>{item['cabin_baggage']}</div> 
                        </Col>
                        <Col span={2}>
                            <div style={{fontSize:"16px",fontWeight:"600"}}>{item['checkin_baggage']}</div> 
                        </Col>
                        <Col span={3}>
                            <div style={{fontSize:"16px",fontWeight:"600"}}>Cancellation Fee <br />
                                Starting Rs3,500
                            </div> 
                        </Col>
                        <Col span={3}>
                            <div style={{fontSize:"16px",fontWeight:"600"}}>Date Change Fee <br/>
                                Starting Rs3,250
                                </div> 
                        </Col>
                        <Col span={2}>
                            <div style={{fontSize:"16px",fontWeight:"600"}}>Chargeable</div> 
                        </Col>
                        <Col span={2}>
                            <div style={{fontSize:"16px",fontWeight:"600"}}>{(elem.meal)?"Get Complimentary meals":"Chargeable"}</div> 
                        </Col>
                            <Col span={4}>
                            <div style={{fontSize:"22px",fontWeight:"600",marginBottom:"10px",marginLeft:"5rem"}}>{elem.fareAmount.totalFare}</div>
                            <div style={{marginLeft:"50px"}}> <Button className='book-btn' htmlType="submit" type="primary"
                                onClick={()=>handleBookTicket(item.refrence_id,'onwardJourney')}>BOOK NOW</Button> </div>
                            </Col>
        
                            </Row>
        
                             </>
                    )
                 })}
                  
                    </Panel>

                    </Collapse>
                    </Col>
                </Row>


            </Card>
                        
                        </div>
                        

                    </>
                )
            })}
                    </Col>
                </Row>
                }
            </Col>
        </Row>
           
        </>
  )
}

export default ResultsItems