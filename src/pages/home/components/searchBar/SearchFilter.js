
import React,{useState,useEffect} from 'react'
import './SearchFilter.scss'
import {Modal,Form,Row,Col, Select,DatePicker,Input,TimePicker,Button,Card,Table,Tabs,TabPane} from "antd";
import moment from 'moment';
import homeBackground from '../../../../assets/images/HomeBackground.jpg'
import { MdGppGood } from "react-icons/md"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { getAirportName } from '../../../../Api/LandingPage';


const myStyle={
  backgroundImage: `url(${homeBackground})`,
  height:'auto',
  marginTop:'10px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const { Option } = Select;



const SearchFilter = () => {

  const [activeTabKey, setActiveTabKey] = useState('oneWay');
  const [adultSeat, setAdultSeat] = useState(1);
  const [childSeat, setChildSeat] = useState(0);
  const [infantSeat, setInfantSeat] = useState(0);
  const [airportName, SetAirportName] = useState([]);
  const [isOneWayEnable, setIsOneWayEnable] = useState(true);
  const [isRoundtripEnable, setIsRoundtripEnable] = useState(false)

  const navigate = useNavigate();


  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  //  Making api call
  const getAirportData = async()=>{
      try {
       const res = await getAirportName()
        SetAirportName(res);
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    getAirportData()
  }, [])

  function disabledDate(current) {
    // Disable all dates before today's date
    return current && current < moment().startOf('day');
  }
  const onSearchFlight = (value)=>{
    
    if(activeTabKey=="oneWay"){
      navigate(`/searchResult?tripType=${activeTabKey}&airport_from=${value.from}&airport_to=${value.to}&departureDate=${value.departureDate.format("YYYY-MM-DD")}
      &adult=${adultSeat}&child=${childSeat}&infant=${infantSeat}`);
    }else{
      navigate(`/searchResult?tripType=${activeTabKey}&airport_from=${value.from}&airport_to=${value.to}&departureDate=${value.departureDate.format("YYYY-MM-DD")}
            &returnDate=${value.returnDate.format("YYYY-MM-DD")}&adult=${adultSeat}&child=${childSeat}&infant=${infantSeat}`);
    }
    
   
  }
  const tabList = [
    {
      key: 'oneWay',
      tab: (
        <div className='tab-list' >ONE WAY</div>
        ),
    },
    {
      key: 'roundTrip',
      tab:(
        <div className='tab-list'>ROUND TRIP</div>
        ), 
    },
  ];

  // const contentList = {
  //   tab1: <p>content1</p>,
  //   tab2: <p>content2</p>,
  // };
    const columns = [
       
        {
          title: 'From',
          dataIndex: 'destinationFrom',
          key: 'destinationFrom',
        },
        {
          title: 'To',
          dataIndex: 'destinationTo',
          key: 'destinationTo',
          },
      
        {
          title: 'Departure',
          dataIndex:'departure',
          key: 'departure',
          render: (text) => text?.substring(0,5)
        },
      
        {
          title: 'Return',
          dataIndex:'return',
          key: 'return',
          render: (text) => text?.substring(0,5)
        },
        {
          title: 'Travellers',
          dataIndex:'travellers',
          key: 'travellers',
         
        },   
      ];

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

  return (
    <>
         <Row style={myStyle}>
          <Col xs={{span:24}} md={{span:24}}>
          <Row style={{marginBottom:"2.5rem"}}>
           <Col className='search-header' xs={{span:24}} md={{span:24}}>
            <Card style={{background:"rgba(0,0,0,0.8)"}}
             bordered ={false}
             className='search-form'
             tabList={tabList}
             activeTabKey={activeTabKey}
             onTabChange={onTabChange}
             title = {"Book Your Flights"}
          >
           
            { <Form 
              name="basic"
              layout="inline"
              onFinish={onSearchFlight}
              initialValues={{
                remember: true,
              }}
        
            >
             
          <Row style={{display:"contents", marginRight:"7rem"}}>
             
              <Col span={11}>
                <div style={{color:"white"}}>FROM</div>
              <Form.Item
                style={{width:"80%",marginBottom:"10px"}}
                name="from"
                rules={[
                  {
                    required: true,
                    message: "Please select destination From",
                  },
                ]}
              >
                 
                <Select className='.no-outline' showSearch placeholder={<span><MdFlightTakeoff /> {" "}Destination From</span>}>
                  {airportName && airportName.map((airport)=>(
                      <Option  value={airport.code}>{airport.code}{" "} - {" "}{airport.name} </Option>
                  ))}
                   
                </Select>
              </Form.Item>
             
            </Col>
 
                <Col span={2}>
                  <RiArrowLeftRightLine className='exchangeSector' size='.7x'/>
                </Col>
              

              <Col span={11}>
                <div style={{color:"white"}}>TO</div>
                
              <Form.Item
                style={{width:"78%"}}
                name="to"
                rules={[
                  {
                    required: true,
                    message: "Please select destination To",
                  },
                ]}
              >
                <Select className='inline' showSearch placeholder={<span><MdFlightLand />{" "}Destination TO</span>}>
                {airportName.map((airport)=>(
                      <Option  value={airport.code}> {airport.code}{" "} - {" "}{airport.name} </Option>
                  ))}
                  
                </Select>
              </Form.Item>
              </Col>
            </Row>  
            
              <Row style={{display:"contents"}} >
                <Col span={12}>
                <div style={{color:"white" }}>DEPARTURE</div>
                <Form.Item
                className='departue-input'
                style={{width:"100%",fontSize:"15px",fontWeight:"600"}}
                name="departureDate"
                rules={[
                  {
                    required: true,
                    message: "Please select Departure Date",
                  },
                ]}
              >
                 <DatePicker disabledDate={disabledDate} value={moment().format('YYYY-MM-DD')} format={'DD-MM-YYYY'} style={{width:"76%",height:"38px"}}  id="departureDate" />     
                </Form.Item>
                </Col>

                {activeTabKey!=="oneWay"? <Col span={12}>
                <div style={{color:"white"}}>RETURN</div>
                <Form.Item
                className='return-input'
                style={{width:"100%"}}
                name="returnDate"
                rules={[
                  {
                    required: true,
                    message: "Please select Return Date",
                  },
                ]}
              >
                 <DatePicker disabledDate={disabledDate} value={moment().add(1,'days').format('YYYY-MM-DD')} format={'DD-MM-YYYY'} style={{width:"76%", height:"38px"}} className="input_data inline" placeholder="Return Time"
                  id="returnDate" 
                  />     
                </Form.Item>
                </Col>:<Col span={12}></Col> }
            </Row>

            <Row style={{display:"contents"}}>
               
                <Col span={8}>
                <div style={{color:"white"}}>ADULTS 12 + Yrs</div>
                <Form.Item
                style={{width:"100%"}}
                name="travellers"
                
              >
                <div style={{display:"flex"}} className='search-pane'>
                  <div className='minus' onClick={decAdultSeat}>-</div>
                  <div className='count'>{adultSeat}</div>
                  <div className='plus' onClick={incAdultSeat}>+</div> 
                 </div>  
                </Form.Item>
                </Col>
            
                <Col span={8}>
                <div style={{color:"white"}}>CHILDREN 2 - 12 Yrs</div>
                <Form.Item
                style={{width:"100%"}}
                name="travellers"
                
              >
                 <div style={{display:"flex"}} className='search-pane'>
                  <div className='minus' onClick={decChildSeat}>-</div>
                  <div className='count'>{childSeat}</div>
                  <div className='plus' onClick={incChildSeat}>+</div> 
                 </div> 
                </Form.Item>
                </Col>

                <Col span={8}>
                <div style={{color:"white"}}>INFANTS 0 - 2 Yrs</div>
                <Form.Item
                style={{width:"100%"}}
                name="travellers"
                
              >
                 <div style={{display:"flex"}} className='search-pane'>
                  <div className='minus'onClick={decInfantSeat}>-</div>
                  <div className='count'>{infantSeat}</div>
                  <div className='plus' onClick={incInfantSeat}>+</div> 
                 </div>     
                </Form.Item>
                </Col>
           </Row>
             
          
            <Row >
              <Col className='search-btn-col' span={24}>
                <Button className='search-btn' htmlType="submit" type="primary">
                       SEARCH
                  </Button>
                 
             </Col>
            </Row>
          
            </Form>}
        </Card>
        </Col>
      </Row>

        <Row className='banner-container'>

           <Col className='banner-items' span={6}>
              <div style={{fontSize:"40px"}}><MdGppGood/> </div>
             <div>24 X 7 <br/> EXCITING DEALS</div>
           </Col>

           <Col  className='banner-items' span={6}>
           <div style={{fontSize:"40px"}}><MdGppGood/> </div>
             <div>LOWEST FARES <br/> GUARANTEED</div>
           </Col>

           <Col className='banner-items' span={6}>
              <div style={{fontSize:"40px"}}><MdGppGood/> </div>
              <div>BOOK IN  <br/> JUST 3 STEPS</div>
           </Col>

            <Col className='banner-items' span={6}>
              <div style={{fontSize:"40px"}}><MdGppGood/> </div>
              <div>BEST CUSTOMER <br/> SUPPORT ALWAYS</div>
           </Col>
        </Row>


        </Col>
    </Row>

    </>
    
  )
}

export default SearchFilter