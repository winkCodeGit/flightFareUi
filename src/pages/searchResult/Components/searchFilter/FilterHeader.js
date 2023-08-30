import React, {useState, useEffect,useRef  } from 'react'
import qs from 'query-string';
import {Modal,Form,Row,Col, Select,DatePicker,Input,TimePicker,Button,Popover,Card,Table,Tabs,TabPane} from "antd";
import moment from 'moment';
import { AiOutlineClose  } from "react-icons/ai";
import { CloseOutlined,MinusOutlined,PlusOutlined,RightOutlined } from '@ant-design/icons';
import './FilterHeader.scss'
import { getAirportName } from '../../../../Api/LandingPage';
const {Option} = Select;

const FilterHeader = () => {

    const [airportName, SetAirportName] = useState([]);
    const [passenenger, setPassenger] = useState(1);
    const [airportFrom, setAirportFrom] = useState('');
    const [airportTo, setAirportTo] = useState('');
    const [returnDay, setReturnDay] = useState('')
    const [departure, setDeparture] = useState('')
    const [tripType, setTripType] = useState(null)
    const [clickedCol, setClickedCol] = useState(null);
    const [open, setOpen] = useState(false);
    const [adultSeat, setAdultSeat] = useState(1);
    const [childSeat, setChildSeat] = useState(0);
    const [infantSeat, setInfantSeat] = useState(0);

    const elementRef = useRef(null);

    
    const hide = () => {
      setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };

    function tripHandleChange(value) {
     
       setTripType(value)
     }

    const getAirportData = async()=>{
      try {
        const res = await getAirportName()
        SetAirportName(res);
      } catch (error) {
        console.log(error)
      }
  }


    function fareHandleChange(value) {
        console.log(`selected ${value}`);
      }

    useEffect(() => {
       
         const parsed = qs.parse(location.search);
        setAirportFrom(parsed.airport_from);
        setAirportTo(parsed.airport_to);
        setTripType(parsed.tripType.trim());
        
        if(parsed.tripType=="oneWay"){
          setDeparture(parsed.departureDate.trim());
        }else{
          setDeparture(parsed.departureDate.trim());
          setReturnDay(parsed.returnDate.trim());
        }
        
        console.log(parsed);
        getAirportData()
        }, [])


       
       const onSearchModify = ()=>{
          console.log("modify")
       }

       const handleColClick = (index) => {
        if (clickedCol === index) {
          // Col is already clicked, reset clickedCol to null
          setClickedCol(null);
        } else {
          // Col is not clicked yet, set clickedCol to the clicked index
          setClickedCol(index);
        }
      };
    
      

      const decAdultSeat = ()=>{
        if(adultSeat!==1){
          setAdultSeat(adultSeat-1)
        }
        
      }
      const incAdultSeat = ()=>{
        setAdultSeat(adultSeat+1)
      }

      const decChildSeat = ()=>{
        if(childSeat!==0){
          setChildSeat(childSeat-1)
        }
      }
      const incChildSeat = ()=>{
          setChildSeat(childSeat+1)
      }

      const decInfantSeat = ()=>{
        if(infantSeat!==0){
          setInfantSeat(infantSeat-1)
        }
      }
      const incInfantSeat = ()=>{
          setInfantSeat(infantSeat+1)
      }
      
  const content = (
    <>
      <Button
        type="text"
        icon={<CloseOutlined />}
        style={{ float: 'right' ,marginTop:"-47px"}}
        onClick={hide}
      />
        
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"5px"}}>
      <div style={{fontSize:"18px",fontWeight:"600"}}>Adult(s) <span style={{color:"#a1c1c1",fontSize:"14px"}}>(12<RightOutlined style={{width:"12px"}}/> years)</span> </div>
      <div>
        <Button
          shape="circle"
          icon={<MinusOutlined />}
          onClick={decAdultSeat}
        />
          <span style={{ margin: '0 8px' }}>{adultSeat}</span>
         <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={incAdultSeat}
        />
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
      <div style={{fontSize:"18px",fontWeight:"600"}}>Children <span style={{color:"#a1c1c1",fontSize:"14px"}}>(2 to 12 years)</span></div>
      <div>

        <Button
          shape="circle"
          icon={<MinusOutlined />}
          onClick={decChildSeat}
        />
         <span style={{ margin: '0 8px' }}>{childSeat}</span>
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={incChildSeat}
        />
        
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
      <div style={{fontSize:"18px",fontWeight:"600"}}>Infant(s) <span style={{color:"#a1c1c1",fontSize:"14px"}}>(3 days to 2 years)</span></div>
      <div>
        <Button
          shape="circle"
          icon={<MinusOutlined />}
          onClick={decInfantSeat}
        />
         <span style={{ margin: '0 8px' }}>{infantSeat}</span>
           <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={incInfantSeat}
        />
        
      </div>
    </div>
      </>
  );

  return (
     <>
     
        <Row style={{marginTop:"7px"}}>
            <Col span={24}>

           <Card>
           <Form
             className='headerFilter'
             name="basic"
             layout="inline"
             onFinish={onSearchModify}
             initialValues={{
               remember: true,
             }}
            >
            <Row className='filter-container'>
            <Col className='border-active' style={{border:`1px solid ${clickedCol === 0 ? "blue" : "grey"}`,borderRadius:"5px",height:"64px"}}
             span={3} onClick={() => handleColClick(0)}>
            <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>Trip</div>
             <Form.Item
              style={{width:"100%",marginBottom:"10px"}}
              name="trip"
             >

           {tripType!=null && <Select defaultValue={tripType} theme="dark" style={{ width:"90%" }} onChange={tripHandleChange}>
            <Option value="oneWay">One Way</Option>
            <Option value="roundTrip">Round Trip</Option>
           </Select>}

           </Form.Item>
         </Col>
      
        <Col style={{border:`1px solid ${clickedCol === 1 ? "blue" : "grey"}`,borderRadius:"5px",height:"64px"}} span={3}
         onClick={() => handleColClick(1)}>
           <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>From</div>
              <Form.Item
                style={{width:"100%",marginBottom:"10px"}}
                name="from"
                rules={[
                  {
                    required: true,
                    message: "Please select destination From",
                  },
                ]}
              >
                 
               {airportFrom !='' && <Select className='.no-outline' defaultValue={airportFrom} showSearch placeholder={<span> {" "}Destination From</span>}>
                  {airportName && airportName.length>0 && airportName.map((airport)=>(
                      <Option value={airport.code}>{airport.name} ({airport.code}) </Option>
                  ))}
                 
                </Select>}
              </Form.Item>
              </Col>

              <Col style={{border:`1px solid ${clickedCol === 2 ? "blue" : "grey"}`,borderRadius:"5px",height:"64px"}}
               span={3} onClick={() => handleColClick(2)}>
                <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>TO</div>
                
              <Form.Item
                style={{width:"100%",marginBottom:"10px",fontSize:"17px",fontWeight:"600"}}
                name="to"
                rules={[
                  {
                    required: true,
                    message: "Please select destination To",
                  },
                ]}
              >
                {airportTo !='' && <Select className='inline'  defaultValue={airportTo}>
                {airportName.map((airport)=>(
                      <Option key={airport.code} value={airport.code}>{airport.name} ({airport.code}) </Option>
                  ))}
                  
                </Select>}
              </Form.Item>
              </Col>

              <Col style={{border:`1px solid ${clickedCol === 3 ? "blue" : "grey"}`,borderRadius:"5px",height:"64px"}}
               span={3} onClick={() => handleColClick(3)}>
                <div style={{fontSize:"15px",fontWeight:"600",paddingLeft:"10px"}}>Departure Date</div>
                <Form.Item
                className='departue-input'
                style={{width:"100%",fontSize:"15px",fontWeight:"600",marginBottom:"10px"}}
                name="departureDate"
                rules={[
                  {
                    required: true,
                    message: "Please select Departure Date",
                  },
                ]}
              >
                 {departure !='' && <DatePicker defaultValue={moment(departure,'DD-MM-YYYY')} format={'DD-MM-YYYY'} style={{width:"76%",height:"38px"}}  id="departureDate" />}
                </Form.Item>
                </Col>

                <Col style={{border:`1px solid ${clickedCol === 4 ? "blue" : "grey"}`,borderRadius:"5px",height:"64px"}}
                 span={3} onClick={() => handleColClick(4)}>
                <div style={{fontSize:"15px",fontWeight:"600",paddingLeft:"10px"}}>Return Date</div>
                <Form.Item
                className='return-input'
                style={{width:"100%",marginBottom:"10px"}}
                name="returnDate"
                rules={[
                  {
                    required: true,
                    message: "Please select Return Date",
                  },
                ]}
              >
                {returnDay!='' && <DatePicker defaultValue={moment(returnDay,'DD-MM-YYYY')} format={'DD-MM-YYYY'} style={{width:"76%", height:"38px"}} className="input_data inline" placeholder="Return Time"
                  id="returnDate" 
                  />}     
                </Form.Item>
                </Col>

                {/* <Popover
                content={
                <div><a onClick={hide}><AiOutlineClose /></a></div>
                
                }
                title="Select Passengers"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                > */}
                <Col style={{border:`1px solid ${clickedCol === 5 ? "blue" : "grey"}`,borderRadius:"5px",height:"64px",cursor:"pointer"}}
                 span={3} onClick={() => handleColClick(5)}>
                  <Popover
                    content={content}
                    title="Select Passengers:"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                  >
                <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>Passengers</div>
                <Form.Item
                style={{width:"100%",marginBottom:"10px"}}
                name="travellers"   
              > <div style={{marginLeft:"10px",fontWeight:"600"}}> {passenenger}</div>
            
                </Form.Item>
                </Popover>
                </Col>
                {/* </Popover> */}
                <Col span={3}>
                  <div>
                   <Button className='modify-btn' htmlType="submit" type="primary">
                       MODIFY
                  </Button>
                  </div>
                </Col>


             </Row> 
        </Form>
           </Card>
        </Col> 
     </Row>

    
     </>
  )
}

export default FilterHeader