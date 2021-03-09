import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from "axios";
import {Link, useHistory, useParams }  from  'react-router-dom';
import moment from 'moment';
// docs
import * as API from '../../../constants/APIs';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	Form,
	FormGroup,
} from "reactstrap";

// components
import styles from './AddServices.module.css';
import flag from '../AddServicesManagement/flag.svg';
import * as actions from '../../../redux/actions/stationActions';
// import Loading from '../../../components/Loading/Loading';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Checkbox,
  Button
  } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { idea } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { toast } from 'react-toastify';

const GreenCheckbox = withStyles({
  root: {
    color: '#B22222',
    '&$checked': {
      color: '#B22222',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase);


const useStyles = makeStyles((theme) => ({
  root: {
    "& MuiButton-contained:hover": {
      backgroundColor: '#EFEFEF',
      
    },
  },
  ul1: {
    "& .Mui-selected:hover": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#b22222'
    },
    "& .Mui-selected": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#b22222'
    }
  },
  label: {
		color: "red",
		["@media (max-width:320px)"]: {},
	},
  textField1:{
    outline: 'none',
    width: 190,
    height: 41,
    borderRadius: 30,
    '&:focus': {
      borderColor: '#6c757d'
    },
    '&:after': {
      borderColor: '#6c757d'
    },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#6c757d',
    // },
  },
  page1: {
    marginTop: 40,
    // color: '#b22222',
    // borderRadius: 8
  },
  button1: {
    borderRadius: 16,
    color: '#213D77',
    // backgroundColor: '#b22222',
    textTransform: 'capitalize',
    '&:hover': {
    //   backgroundColor: '#b22222',
    //   color: '#FFF'
    }
  },
  button2: {
		marginRight: 45,
    width: 100,
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#272d3b',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#272d3b',
      color: '#FFF'
    },
		["@media (max-width:368px)"]: {
			marginRight: 0,
			width: '100%',
			marginBottom: 5
		},
  },
	saveButton1: {
		width: 100,
		marginRight: 20,
		borderRadius: 16,
		color: 'white',
		backgroundColor: '#b22222',
		textTransform: 'capitalize',
		'&:hover': {
			backgroundColor: '#b22222',
			color: '#FFF'
		},
		["@media (max-width:368px)"]: {
			marginRight: 0,
			width: '100%',
			// marginBottom: 5
		},
	},
  container1: {
		display: "flex",
		flexWrap: "wrap",
    width: 170,
	},
	date1: {
    "& .MuiOutlinedInput-adornedEnd":{
      'filter' : 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 170,
	},
}));

export function AddServices(props) {
  // const history = useHistory();
  const [serviceType, setServicesType] = useState([])
  const token = localStorage.getItem('token')
	const [add_details, setAddDetails] = useState([]);
	const { station_id } = useParams();
  const [isAdd, setIsAdd] = useState(false);
  const [modal, setModal] = useState(false);
  // const [contract_start_date, setcontract_start_date] = useState('');
  // const [exp_end_date, setexp_end_date] = useState('');
  const classes = useStyles();
  const history= useHistory();
  const [managedByList, setManagedByList] = useState([])
  const [state, setState] = useState({
      station_name:"",
      station_code:"",
      station_type:"",
      managed_by:"",
      no_of_platform:"",
      station__gps_ltd:"",
      station__gps_lng:"",
      contract_giver:"",
      contract_winner:"",
      contract_start_date:"",
      exp_end_date:"",
      contract_tenure:"",
      is_assign_as_admin: false,
  // });
  // const [details, setDetails] = useState({
      contact_name: "",
      contact_mobile: "",
      contact_email: "",
      name: "",
      mobile: "",
      email: "",
      adminPassword: ""
  })

  // GET Contractors List
  useEffect(() => {
    if(token == null){
      history.push('/');
    } else {
    props.GetContractors()
    props.getStationData()
    }
  }, [])

  useEffect(() => {
    setServicesType(props.servicesType)
    setManagedByList(props.contractorsList)
  }, [props.contractorsList, props.stationType])

	// if(id == 'add') {
	// 	setIsAdd(true)
	// } else {
	// 	setIsAdd(false)
	// }

  const [pchecked, setPChecked] = useState(false);
  const [achecked, setAchecked] = useState(false);
  const [errors , setErros]= useState({})
  // const [password, setPassword] = useState('');

	// useEffect(() => {
	// 	console.log(props.details)
	// }, [props.details])

  useEffect(()=>{
		autofillDetails()
	},[pchecked])

  const autofillDetails = () => {
    if(pchecked == true){
      debugger
      setState({
        ...state,
        name: state.contact_name,
        mobile: state.contact_mobile,
        email: state.contact_email
      })
    } else {
      setState({
        ...state,
        name: "",
        mobile: "",
        email: ""
      })
    }
  }
  // details

  // close modal
  const toggleModalClose =()=>{
    setModal(false)
    props.setIsSubmitted(false);
    history.push('/services-management');
  }

  // Handle Submit Station
  const handleSubmit = async(e) => {
    debugger
      e.preventDefault();
      if (!validateForm()) {
          return
      }
      if(station_id == 'add'){
        let merged = state
        merged.is_assign_as_admin = pchecked;
			  // setAddDetails(merged)
        merged.station_code = merged.station_code.toUpperCase();
		    let response = await props.add_station(merged)
        console.log(response)
        // debugger
      } else {
        console.log(state)
        debugger
        props.EditStationDetails(state)
      }

      // setModal(true);
			// if(station_id == 'add'){
			// 	setIsAdd(true);
			// } else {
			// 	setIsAdd(false);
			// }
      // props.addPackage(state)
  }

  useEffect(() => {
    debugger
    if(props.isSubmitted){
      setModal(true);
      if(station_id == 'add'){
        setIsAdd(true);
      } else {
        setIsAdd(false);
      } 
    } else {
         
    }
  }, [props.isSubmitted])

  // validate form
  const validateForm =()=>{
    // All regex for validation
       if(!state.contact_email){
         state.contact_email = '';
       }
       if(!state.adminPassword) {
        state.adminPassword = ''
       }

       if(!state.mobile){
        state.mobile = ''
       }
       var emailValid = state.email?state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/): state.email='';
       var contact_email = state.contact_email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
       var mobileValid = state.mobile.toString().match(/^[0]?[6789]\d{9}$/);
       var usernameRegex = state.station_name.toString().match(/^[a-zA-Z ]+$/);
       var code = state.station_code.match(/^[a-zA-Z]+$/);
       
       var isValid= true;
       if(state.station_name.trim()==''|| !usernameRegex){
           errors.station_name="station name is required or invalid name";
           isValid =false;
       }
      else if(state.station_code.toString().trim()==''|| !code){
          errors.station_code="station code is required or invalid code";
          isValid =false;
      }
      else  if(state.station_type=='0'|| state.station_type==''){
          errors.station_type="station type is required";
          isValid =false;
      }
      else if(state.managed_by =='0' || state.managed_by ==''){
        errors.managed_by="managed by is required";
        isValid =false;
      }
      else if(state.station__gps_ltd.toString().trim()=='' || isNaN(state.station__gps_ltd)){
        errors.station__gps_ltd="Latitude is required or invalid value";
        isValid =false;
      }

      else if(state.station__gps_lng.toString().trim()=='' || isNaN(state.station__gps_lng)){
          errors.station__gps_lng="Longitude is required or invalid value";
          isValid =false;
      }
      else if(state.no_of_platform.toString().trim()=='' || isNaN(state.no_of_platform) || !state.no_of_platform.toString().match(/^(0[1-9]|[1-9]\d*)$/g)){
          errors.no_of_platform="number of platforms is required or invalid number";
          isValid =false;
      }

      else if(state.station__gps_ltd.toString().trim()=='' || isNaN(state.station__gps_ltd)){
          errors.station__gps_ltd="Latitude is required or invalid value";
          isValid =false;
      }

      else if(state.station__gps_lng.toString().trim()=='' || isNaN(state.station__gps_lng)){
          errors.station__gps_lng="Longitude is required or invalid value";
          isValid =false;
      }

      else if(state.contract_giver.trim()=='' || !state.contract_giver.toString().match(/^[a-zA-Z ]+$/)){
          errors.contract_giver="contract giver field is empty or accept only alphabets";
          isValid =false;
      }
      else if(state.contract_winner.trim()==''|| !state.contract_winner.toString().match(/^[a-zA-Z ]+$/)){
          errors.contract_winner="contract winner field is empty";
          isValid =false;
      }
      // contract_start_date:"", exp_end_date:"",
      else if(state.contract_start_date ==''){
        errors.contract_start_date="start date is required";
        isValid =false;
      }
      else if(state.exp_end_date ==''){
        errors.exp_end_date="date is required";
        isValid =false;
      }
      else if(state.contract_tenure.trim()=='' || !state.contract_tenure.toString().match(/^[a-zA-Z0-9. ]+$/)){
          errors.contract_tenure="contract tenure is required or invalid field";
          isValid =false;
      }

      else if(state.contact_name.trim()=='' || !state.contact_name.toString().match(/^[a-zA-Z ]+$/)){
          errors.contact_name="person name is required or invalid field";
          isValid =false;
      }
      else if(state.contact_mobile.trim()=='' || !state.contact_mobile.toString().match(/^[0]?[6789]\d{9}$/)){
          errors.contact_mobile="phone number is required or invalid number";
          isValid =false;
      }
      else if(state.contact_email.trim()!=='' && !contact_email){
          errors.contact_email="invalid email address";
          isValid =false;
      }
      else if(state.name.trim()=='' || !state.name.toString().match(/^[a-zA-Z ]+$/)){
          errors.name="admin name is required or invalid field";
          isValid =false;
      }
      else if(state.mobile.trim()=='' || !mobileValid){
          errors.mobile="mobile is required or invalid mobile";
          isValid =false;
      }
      else if(state.email.trim()!=='' && !emailValid){
          errors.email="invalid email address";
          isValid =false;
      }
      else if((station_id == 'add') && (state.adminPassword.trim()=='' || 
      !(state.adminPassword.length >= 3 && state.adminPassword.length <= 10))){
        errors.adminPassword="password is in between 3 to 10 characters"  
        isValid =false;
      }
      setErros({...errors, errors:errors})
      return isValid
   }

  const handlecheckedChange = (event) => {
    console.log(event.target.checked);
    console.log(event.target.value);
    // debugger
    if(event.target.name === 'person'){
      setPChecked(event.target.checked)
    } else {
      setAchecked(event.target.checked)
    }

    // setChecked(event.target.checked);
  };

  useEffect(() => {
    if(state.exp_end_date && state.contract_start_date){
      let start = moment(state.contract_start_date);
      let end = moment(state.exp_end_date);

      let years = end.diff(start , 'years');
      let months;
      months = end.diff(start , 'months') - years*12;
      // let days = end.diff(start , 'days') - ;

      console.log(months, years)
      // debugger
      
      let tenure = '';

      if( years > 0){
        tenure = years + " " + "Years"
        if( months > 0){
          tenure += " " + months + " " + "Months"
        }
      } else {
        tenure = months + " " + "Months"
      }

      console.log(tenure)
      // debugger
      setState({
        ...state,
        contract_tenure: tenure
      })
    }
  }, [state.exp_end_date, state.contract_start_date])

  useEffect(() => {
    if(token == null){
      history.push()
    } else {
    if(props.isEdit || station_id != 'add'){
      props.setIsLoading(true)
      axios({
        url: `${API.GetStationAPI}/${station_id}`,
        headers: { 
          //    'Accept-Language': 'hi', 
          "accept": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
           },
      }).then(response => {
        if(response.data.success){
          debugger
          // setState(response.data.staion)
            let data = response.data.staion;
            data.exp_end_date = moment(data.exp_end_date)
            data.contract_start_date = moment(data.contract_start_date)
            if(response.data.staion.station_admin){
              data.name=response.data.staion.station_admin.name;
              data.mobile = response.data.staion.station_admin.mobile;
              data.email =response.data.staion.station_admin.email;
              data.station_admin_id = response.data.staion.station_admin._id;
            }
            
            data.managed_by = data.managed_by?response.data.staion.managed_by._id: "";
            if(data.is_assign_as_admin){
              data.mobile = response.data.staion.contact_mobile
              data.email = response.data.staion.contact_email
              data.name = response.data.staion.contact_name
              setPChecked(data.is_assign_as_admin)
            }
            // data.is_assign_as_admin
            delete data["station_admin"];
            setState(data)

        } else {
          setState([]);
        }
        // props.setIsLoading(false)
      }).catch(err => {
        toast.error(err.response.data.message)
        props.setIsLoading(false)
      })
      setState(props.stationData)
      props.setIsLoading(false)
      debugger
      // setDetails(props.stationData)
      }
    }
  }, [])

  const passwordGenerate = () => {
    var randomstring = Math.random().toString(36).slice(-8);
    setState({
        ...state,
        adminPassword: randomstring
      })
    console.log(randomstring)
    debugger
  }

  const handleInputs = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    // debugger
    setState({
      ...state,
      [event.target.name]: event.target.value
    })

    debugger
    if(event.target.name == 'managed_by'){
      debugger
      let value = managedByList.find(x => x._id == event.target.value)
      // state.contract_winner = value.name
      setState({
        ...state,
        [event.target.name]: event.target.value,
        contract_winner: value.name
      })
    }
    // debugger
    setErros({errors, [event.target.name]:""})
  }

  // const handleDetails = (event) => {
  //   setDetails({
  //     ...details,
  //     [event.target.name]: event.target.value
  //   })
  //   // debugger
  //   setErros({errors, [event.target.name]:""})
  // }

  const handleChange = (date, type) => {
      debugger
        if(type=='start'){
          setState({
            ...state,
            contract_start_date:moment(date)
            // contract_start_date: date
          })
        } else {
          setState({
            ...state,
            exp_end_date:moment(date)
            // exp_end_date: date
          })
					//props.match.params.
        }
   };

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{ station_id == 'add' ? "Add Station": "Add SFMIS Services"}</div>
        <Button startIcon={<ArrowBackIosIcon color="#213D77" />} onClick={() => history.push('/station-management')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
        <div className={styles.box}>
        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Details</div>
            <div className={styles.grid}>
              <div className={styles.textfield}>
              <label style={{color: '#272D3B'}}>Display Name</label>
                <input autocomplete="off" name="station_name" value={state.station_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.station_name}</div>
              </div>
              {/* <div className={styles.textfield}>
                <label style={{color: 'black'}}>Station Code</label>
                <input style={{textTransform:'uppercase'}} autocomplete="off" name="station_code" value={state.station_code} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.station_code}</div>
              </div> */}
              <div className={styles.textfield}>
                <label style={{color: '#272D3B'}}>Service Type</label>
                <select className={styles.select1} name="service_type" value={state.service_type} onChange={handleInputs}>
                  {/* RURAL, URBAN, SEMI RURAL */}
                  <option value={'0'} >Service Type</option>
                  {/* {stationType.length > 0 ? stationType.map(data =>
                  <option key={data._id} value={data.station_type}>{data.station_type}</option>
                  ) : null} */}
              </select>
              <div className={styles.error_message}>{errors.station_type}</div>
              </div>

              <div className={styles.textfield}>
              <label style={{color: '#272D3B'}}>Service Category</label>
              <select className={styles.select1} name="service_category" value={state.managed_by} onChange={handleInputs}>
                {/* <option value={'0'} >Service Category</option> */}
                {managedByList.length > 0 ? managedByList.map(data =>
                  <option key={data._id} value={data._id}>{data.name}</option>
                  ) : null}
            </select>
            <div className={styles.error_message}>{errors.managed_by}</div>
            </div>

              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Station GPS Latitude</label>
                <input autocomplete="off" name="station__gps_ltd" value={state.station__gps_ltd} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.station__gps_ltd}</div>
              </div>

              <div>
              <Button style={{ backgroundColor: '#FFFFFF', color: '#213D77', borderRadius: '16px' }} className={classes.button3} variant="contained">
          + Add Service Category
          </Button></div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Station GPS Longitude</label>
                <input autocomplete="off" className={styles.inputfield} type="text" name="station__gps_lng" value={state.station__gps_lng} onChange={handleInputs}/>
                <div className={styles.error_message}>{errors.station__gps_lng}</div>
              </div>

            <div className={styles.textfield}>
              <label style={{color: 'black'}}>No. of Platforms </label>
              <input autocomplete="off" name="no_of_platform" value={state.no_of_platform} onChange={handleInputs} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.no_of_platform}</div>
            </div>

            </div>
        </div>

        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contract Details</div>
            <div className={styles.grid1}>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Giver</label>
                <input autocomplete="off" name="contract_giver" value={state.contract_giver} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.contract_giver}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Winner</label>
                <input disabled={true} autocomplete="off" name="contract_winner" value={state.contract_winner} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.contract_winner}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Start Date</label>
                <DatePicker
                  minDate={new Date()}
                  maxDate={state.exp_end_date?new Date(state.exp_end_date): ''}
                  className={styles.input_s}
                  peekNextMonth showMonthDropdown showYearDropdown
                  dropdownMode="select"
                  selected={new Date()}
                  value={state.contract_start_date?moment(state.contract_start_date).format("DD-MM-YYYY"): ''}
                  onChange={(e) => handleChange(e,'start')} placeholderText='' />
                <div className={styles.error_message}>{errors.contract_start_date}</div>
              </div>

              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Expected End Date</label>
                <DatePicker
                  minDate={state.contract_start_date?new Date(state.contract_start_date): new Date()}
                  // maxDate={}
                  className={styles.input_s}
                  peekNextMonth showMonthDropdown showYearDropdown
                  dropdownMode="select"
                  selected={new Date()}
                  value={state.exp_end_date?moment(state.exp_end_date).format("DD-MM-YYYY"): ''}
                  onChange={(e) => handleChange(e,'end')} placeholderText='' />
                  <div className={styles.error_message}>{errors.exp_end_date}</div>
              </div>
              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Contract Tenure</label>
                <input disabled={true} autocomplete="off" name="contract_tenure" value={state.contract_tenure} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.contract_tenure}</div>
              </div>
            </div>
        </div>

        {/* <div className={styles.detailsBox} style={{display: 'flex',justifyContent: 'space-between'}}>
          <div className={styles.box2}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contact Person Details</div>
          <div>
            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Name</label>
              <input autocomplete="off" name="contact_name" value={state.contact_name} onChange={handleInputs} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.contact_name}</div>
            </div>
            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Phone Number</label>
              <input autocomplete="off" name="contact_mobile" value={state.contact_mobile} onChange={handleInputs} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.contact_mobile}</div>
            </div>
            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Email</label>
              <input autocomplete="off" name="contact_email" value={state.contact_email} onChange={handleInputs} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.contact_email}</div>
            </div>
            <div className={styles.textfield}>
            <FormControlLabel
              className={classes.label}
              control={
                <GreenCheckbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  className={styles.checkBox}
                  checked={pchecked}
                  onChange={handlecheckedChange}
                  name="person"
                />
              }
              label={
                <span
                  className={styles.checkBoxLabel}
                  style={{ color: "#272D3B"}}
                >
                    Assign as Station Admin{}
                </span>
              }
            />
            </div>
          </div>
          </div> */}

          {/* <div className={styles.box2}>
        <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Admin</div>
        <div>
          <div className={styles.textfield}>
            <label style={{color: 'black'}}>Name</label>
            <input autocomplete="off" disabled={pchecked?true:false} name="name" value={state.name} onChange={handleInputs} className={styles.inputfield} type="text" />
            <div className={styles.error_message}>{errors.name}</div>
          </div>
          <div className={styles.textfield}>
            <label style={{color: 'black'}}>Phone</label>
            <input autocomplete="off" disabled={pchecked?true:false} name="mobile" value={state.mobile} onChange={handleInputs} className={styles.inputfield} type="text" />
            <div className={styles.error_message}>{errors.mobile}</div>
          </div>
          <div className={styles.textfield}>
            <label style={{color: 'black'}}>Email</label>
            <input autocomplete="off" disabled={pchecked?true:false} name="email" value={state.email} onChange={handleInputs} className={styles.inputfield} type="text" />
            <div className={styles.error_message}>{errors.email}</div>
          </div>
          {(station_id == 'add') && <div className={styles.textfield}>
            <label style={{color: 'black'}}>Password</label>
            <div className={styles.passwordDiv} style={{display: 'flex'}}>
            <input autocomplete="off" name="adminPassword" value={state.adminPassword} onChange={handleInputs} className={styles.inputfield} type="text" />
            <button style={{display: 'contents'}} onClick={passwordGenerate}>
            <img style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}}  />
            <small style={{display: 'flex', alignItems: 'center',color: 'black'}}>Autogenerate</small>
            </button></div>
            <div className={styles.error_message}>{errors.adminPassword}</div>
          </div>}

          <div className={styles.textfield}>
          <FormControlLabel
            className={classes.label}
            control={
              <GreenCheckbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                className={styles.checkBox}
                checked={achecked}
                onChange={handlecheckedChange}
                name="admin"
              />
            }
            label={
              <span
                className={styles.checkBoxLabel}
                style={{ color: "#272D3B"}}
              >
                  Share credentials via email{}
              </span>
            }
          />
          </div>
        </div>
          </div> */}
        {/* </div> */}
      </div>
      <div className={styles.saveButton}>
      <Button style={{}} onClick={() => history.push('/station-management')}  className={classes.button2} variant="contained">
        Cancel
      </Button>
      <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
        {station_id == 'add' ? "Save" : "Update"}
      </Button>
      </div>

      {}
			<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>{isAdd ? "Successfully Added Station": "Successfully Updated"} </strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.footer}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button1}
							onClick={toggleModalClose}
						>
						OK
						</Button>
					</ModalFooter>
				</Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
	return {
		details: state.Stations.details,
    isEdit: state.Stations.isEdit,
    stationData: state.Stations.stationData,
    contractorsList: state.Stations.contractorsList,
    isSubmitted: state.Stations.isSubmitted,
    isLoading: state.Stations.isLoading,
    stationType: state.Stations.stationType
	
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
    setIsSubmitted: flag => {
      dispatch(actions.setIsSubmitted(flag))
    },
    EditStationDetails: data => {
      dispatch(actions.EditStationDetails(data))
    },
		add_station: (details) =>
			dispatch(actions.stationActions(details)),
    GetContractors: () => {
      dispatch(actions.GetContractors())
    },
    getStationData: () => {
      dispatch(actions.getStationData())
    },
    setIsLoading: (value) =>
      dispatch(actions.setIsLoading(value)),
	
	};
};

export default compose(connect(mapStateToProps,  mapDispatchToProps))(AddServices);
