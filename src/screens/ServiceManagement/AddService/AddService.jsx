import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from "axios";
import {Link, useHistory, useParams }  from  'react-router-dom';
import moment from 'moment';
// docs
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

// components #213D77
import styles from './AddService.module.css';
import logo from '../../StationManagement/AddStation/logo.png';
import flag from '../../StationManagement/flag.svg';
import image_icon from './image_icon.png';
// import * as API from '../../../constants/APIs';
import * as actions from '../../../redux/actions/SFMISActions';
// import Loading from '../../../components/Loading/Loading';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Radio,
  FormControlLabel,
  Checkbox,
  Button
  } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { toast } from 'react-toastify';

const RedRadio = withStyles({
    root: {
      color: "#b22222",
      '&$checked': {
        color: "#b22222",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
    root: {
      color: "#213d77",
      '&$checked': {
        color: "#213d77",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const GreenCheckbox = withStyles({
  root: {
    color: '#213D77',
    '&$checked': {
      color: '#213D77',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    "& MuiButton-contained:hover": {
      backgroundColor: '#213D77',
    },
  },
  ul1: {
    "& .Mui-selected:hover": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213D77'
    },
    "& .Mui-selected": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213D77'
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
    // color: '#213D77',
    // borderRadius: 8
  },
  show_image: {
    padding: 12, 
    width: 61, 
    margin: 0
  },
  show_image_true: {
    padding: 0, 
    width: 92, 
    margin: 0
  },
  vendor_button: {
    width: 130,
    marginLeft: -10,
    marginTop: 7,
    height: 32
  },
  category_button: {
    width: 200,
    marginLeft: -10,
    marginTop: 7,
    height: 32,
    ["@media (min-width: 280px) and (max-width: 899px)"]: {
        marginLeft: 0
    },
    ["@media (max-width: 330px)"]: {
        width: '100%',
        height: 'inherit'
    }
  },
  button1: {
    border: 'solid',
    borderWidth: '1.9px',
    boxShadow: 'none',
    borderRadius: 16,
    borderColor: '#213d77',
    color: '#213d77',
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
    '&:hover': {
      borderColor: '#213d77',
      backgroundColor: 'transparent',
      color: '#213d77'
    }
  },
  button2: {
		marginRight: 45,
    width: 100,
    border: 'solid',
    borderWidth: '1.9px',
    boxShadow: 'none',
    borderRadius: 16,
    color: '#213d77',
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
    '&:hover': {
        borderColor: '#213d77',
        backgroundColor: 'transparent',
        color: '#213d77'
    },
		["@media (max-width:368px)"]: {
			marginRight: 0,
			width: '100%',
			marginBottom: 5
		},
  },
    radio_label: {
        margin: 0,
        marginRight: 60,
        ["@media (max-width: 320px)"]: {
            marginRight: "20%"
        }
    },
	saveButton1: {
		width: 100,
		marginRight: 20,
		borderRadius: 16,
		color: 'white',
		backgroundColor: '#213D77',
		textTransform: 'capitalize',
		'&:hover': {
			backgroundColor: '#213D77',
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

export function AddService(props) {
  // const history = useHistory();
  const [serviceCategory, setServiceCategory] = useState([])
  const token = localStorage.getItem('token')
	const [add_details, setAddDetails] = useState([]);
	const { service_id } = useParams();
  const [isAdd, setIsAdd] = useState(false);
  const [modal, setModal] = useState(false);
  // const [contract_start_date, setcontract_start_date] = useState('');
  // const [exp_end_date, setexp_end_date] = useState('');
  const classes = useStyles();
  const history= useHistory();
  const [managedByList, setManagedByList] = useState([])
  const [state, setState] = useState({
    from_time_value: "",
    to_time_value: "",
    fileName: "",
    fileNameExt: "",
    vendor_name: "",
    display_name: "",
    service_type: "",
    service_category: "",
    chargeable: false,
    mobile_number: "",
    image: {},
    from_time: "",
    to_time: "",
    preparation_duration: "",
    maximum_duration: "",
    is_active: false,
    approve_items: false,
    is_cancellation: false,
    is_happy_code: false,
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
  const [selectedValue, setSelectedValue] = useState(false);

  const handleChangeChargeable = (event, type) => {
      if(type == 'Yes'){
          setState({
              ...state,
              chargeable: true
          })
      } else {
          setState({
              ...state,
              chargeable: false
          })
      }
  };

  // GET Contractors List
  useEffect(() => {
    if(token == null){
      history.push('/');
    } else {
    // props.GetContractors()
    // props.getStationData()
    }
  }, [])

  useEffect(() => {
    props.getCategoryServices()
    // setServiceCategory(props.serviceCategory)
    // setManagedByList(props.contractorsList)
  }, [])

  useEffect(() => {
    debugger
    if(props.serviceCategory){
      setServiceCategory(props.serviceCategory)
    }
  }, [props.serviceCategory])

	// if(id == 'add') {
	// 	setIsAdd(true)
	// } else {
	// 	setIsAdd(false)
	// }

  const [pchecked, setPChecked] = useState(false);
  const [achecked, setAchecked] = useState(false);
  const [errors , setErros]= useState({})

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
    history.push('/vendors-service');
  }

  // Handle Submit Station
  const handleSubmit = async(e) => {
    debugger
      e.preventDefault();
      if (!validateForm()) {
          return
      }

      if(service_id == 'add'){
        props.manageSFMISServices(state);
        // debugger
      } else {
        // console.log(state)
        // debugger
        // props.EditStationDetails(state)
      }

      // setModal(true);
			// if(service_id == 'add'){
			// 	setIsAdd(true);
			// } else {
			// 	setIsAdd(false);
			// }
      // props.addPackage(state)
  }

  useEffect(() => {
    // if(props.isSubmitted){
    //   setModal(true);
    //   if(service_id == 'add'){
    //     setIsAdd(true);
    //   } else {
    //     setIsAdd(false);
    //   }
    // } else {

    // }
  }, [
    //   props.isSubmitted
    ])

  const handleCheckbox = (event, type) => {
    console.log(event.target.name)
    setState({
        ...state,
        [event.target.name]: event.target.checked
    })
    debugger
  }

   // validate form
   const validateForm =()=>{
       
       var mobileValid = state.mobile_number.toString().match(/^[0]?[6789]\d{9}$/);
       var isValid= true;
       console.log(state.image)
       console.log(state.image.name)
       debugger
       if(state.display_name.toString().trim()==''|| !state.display_name.toString().match(/^[a-zA-Z ]+$/)){
            errors.display_name="display name is required or invalid code";
            isValid =false;
        }
        
        // else if(state.service_type=='0'|| state.service_type==''){
        //     errors.service_type="service type is required";
        //     isValid =false;
        // }
        else if(state.service_category =='0' || state.service_category ==''){
            errors.service_category="service category is required";
            isValid =false;
        }
        // else if(state.chargeable ==''){
        //     errors.chargeable="chargeable is required";
        //     isValid =false;
        // }
        else if(state.mobile_number.toString().trim()=='' || !mobileValid){
            errors.mobile_number="mobile number is required or invalid number";
            isValid =false;
        }
        
        else if(state.fileName == ''){
            errors.image="image is required";
            isValid =false;
        }

      else if(state.from_time.toString().trim()==''){
          errors.from_time="time is required";
          isValid =false;
      }

      else if(state.to_time.toString().trim()==''){
          errors.to_time="to time is required";
          isValid =false;
      }

      else if(state.preparation_duration==''){
          errors.preparation_duration = "duration is required";
          isValid =false;
      }
      else if(state.maximum_duration.trim()==''){
          errors.maximum_duration = "maximum duration field is empty";
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
    // if(token == null){
    //   history.push()
    // } else {
    // if(props.isEdit || service_id != 'add'){
    //   props.setIsLoading(true)
    //   axios({
    //     url: `${API.GetStationAPI}/${service_id}`,
    //     headers: {
    //       //    'Accept-Language': 'hi',
    //       "accept": "application/json",
    //       'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //        },
    //   }).then(response => {
    //     if(response.data.success){
    //       debugger
    //       // setState(response.data.staion)
    //         let data = response.data.staion;
    //         data.exp_end_date = moment(data.exp_end_date)
    //         data.contract_start_date = moment(data.contract_start_date)
    //         if(response.data.staion.station_admin){
    //           data.name=response.data.staion.station_admin.name;
    //           data.mobile = response.data.staion.station_admin.mobile;
    //           data.email =response.data.staion.station_admin.email;
    //           data.station_admin_id = response.data.staion.station_admin._id;
    //         }

    //         data.managed_by = data.managed_by?response.data.staion.managed_by._id: "";
    //         if(data.is_assign_as_admin){
    //           data.mobile = response.data.staion.contact_mobile
    //           data.email = response.data.staion.contact_email
    //           data.name = response.data.staion.contact_name
    //           setPChecked(data.is_assign_as_admin)
    //         }
    //         // data.is_assign_as_admin
    //         delete data["station_admin"];
    //         setState(data)

    //     } else {
    //       setState([]);
    //     }
    //     // props.setIsLoading(false)
    //   }).catch(err => {
    //     toast.error(err.response.data.message)
    //     props.setIsLoading(false)
    //   })
    //   setState(props.stationData)
    //   props.setIsLoading(false)
    //   debugger
    //   // setDetails(props.stationData)
    //   }
    // }
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
    console.log(event.target.name)
    console.log(event.target.value)

    debugger
    setState({
      ...state,
      [event.target.name]: event.target.value
    })

    debugger
    if(event.target.name == 'from_time' || event.target.name == 'to_time'){
      var ts = event.target.value;
      var H = +ts.substr(0, 2);
      var h = (H % 12) || 12;
      h = (h < 10)?("0"+h):h;
      var ampm = H < 12 ? " AM" : " PM";
      ts = h + ts.substr(2, 3) + ampm;
      console.log(ts)

      let name = event.target.name == 'from_time'? 'from_time_value': 'to_time_value';
      debugger
      
      

      setState({
        ...state,
        [event.target.name]: event.target.value,
        [name]: ts
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

  const uploadFile = (e, type)=>{
    debugger
    if (e.target.files && e.target.files.length > 0 ) {
        var a = e.target.files[0].size;
        const fsize = Math.round((a / 1024));

        var validExtensions=['jpg','png','PNG','JPG','jpeg', 'JPEG'];
        var isValid = true;
        let file_name = e.target.files[0].name;
        let fileExt = file_name.substr(file_name.lastIndexOf('.') + 1);
         console.log(e.target.files[0])
         if(e.target.files[0]){
           if(e.target.files[0].size > (1048576*2)){
             e.target.value = "";
             isValid = false;
             toast.error(`file size should less than ${2}mb`)
             return;
           }
         }

        let n = validExtensions.includes(fileExt);

        if(!n) {
          toast.error(`please select image file`)
          return
        }

      if(isValid){
      debugger
        var fileName = e.target.files[0].name;
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
          debugger
        }
        let reader = new FileReader();
        reader.onloadend = (e) => {
          debugger
        setState({
          ...state,
          fileNameExt: fileNameExt,
          fileName: reader.result
          })
        }
      reader.readAsDataURL(e.target.files[0]);
      }
   }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{ service_id == 'add' ? "Add SFMIS Services": "Edit SFMIS Services"}</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/SFMIS-services')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
        <div className={styles.box}>
        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12, color: '#213d77'}} className={styles.title}>Service Details</div>
            <div className={styles.grid}>
            
            <div className={styles.textfield}>
                <label style={{color: '#535763'}}>Display Name</label>
                <input autocomplete="off" name="display_name" value={state.display_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.display_name}</div>
              </div>

              {/*<div className={styles.textfield}>
                <label style={{color: '#535763'}}>Service Type</label>
                <select className={styles.select1} name="service_type" value={state.service_type} onChange={handleInputs}>
                  <option value={'0'} >Service Type</option>
                  <option value={'BOOK'} >Book</option>
                  <option value={'ORDER'} >Order</option>
              </select>
              <div className={styles.error_message}>{errors.service_type}</div>
              </div>*/}

              <div className={styles.textfield}>
                <label style={{color: '#535763'}}>Service Category</label>
                <select className={styles.select1} name="service_category" value={state.service_category} onChange={handleInputs}>
                  <option value={'0'} >Service Category</option>
                  {serviceCategory.length > 0 ? serviceCategory.map(data =>
                  <option key={data._id} value={data._id}>{data.category_name}</option>
                  ) : null}
              </select>
              <div className={styles.error_message}>{errors.service_category}</div>
              </div>
              
              <div className={styles.textfield}>
              {/* Empty label */}
              <label>Add </label>
              <Button onClick={() => history.push('/add-service-category')} className={classes.button1 + " " + classes.category_button} variant="contained">
                + Add Service Category
              </Button>
              </div>

              {/* Empty Div */}
              <div></div>

              <div className={styles.textfield}>
                <label style={{color: '#535763'}}>Chargeable</label>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  <GreenRadio
                    checked={state.chargeable}
                    onChange={(e) => handleChangeChargeable(e, "Yes")}
                    // value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'C' }}
                  />
                  <label className={classes.radio_label} style={{color: '#213d77', fontWeight: '700'}}>Yes</label>

                <RedRadio
                    checked={!state.chargeable}
                    onChange={(e) => handleChangeChargeable(e, "No")}
                    // value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'C' }}
                  />
                  <label style={{color: '#b22222', fontWeight: '700', margin: 0}}>No</label>
                </div>
                <div className={styles.error_message}>{errors.chargeable}</div>
              </div>

              <div className={styles.textfield}>
                <label style={{color: '#535763'}}>Service Booking Mobile Number</label>
                <input autocomplete="off" className={styles.inputfield} type="text" name="mobile_number" value={state.mobile_number} onChange={handleInputs}/>
                <div className={styles.error_message}>{errors.mobile_number}</div>
              </div>

            <div className={styles.textfield}>
              <label style={{color: '#535763'}}>Upload Service Icon</label>
              <div className={styles.image_upload}>
              <label className={state.fileName?classes.show_image_true: classes.show_image} for="file-input">
                  <img src={state.fileName? state.fileName: image_icon} />
              </label>
              </div>
              <input id="file-input" type="file" style={{display: 'none'}} onChange={uploadFile} className={styles.upload_image} />
              <div className={styles.error_message}>{errors.image}</div>
            </div>

            </div>
        </div>

        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12, color: '#213d77'}} className={styles.title}>Operational Duration</div>
            <div className={styles.grid1}>
              
              <div className={styles.textfield}>
                <label style={{color: '#535763'}}>From</label>
                <input type='time' placeholder='' className={styles.timefield} name="from_time" value={state.from_time} onChange={handleInputs} />
                <div className={styles.error_message}>{errors.from_time}</div>
              </div>

              <div className={styles.textfield}>
                <label style={{color: '#535763'}}>To</label>
                <input type='time' placeholder='' className={styles.timefield} name="to_time" value={state.to_time} onChange={handleInputs} />
                <div className={styles.error_message}>{errors.to_time}</div>
              </div>

              {/* Dummy Divs */}
              <div></div>
              <div></div>

              <div className={styles.textfield}>
                <label style={{color: '#535763'}}>Delivery Preparation Duration</label>
                <input autocomplete="off" name="preparation_duration" value={state.preparation_duration} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.preparation_duration}</div>
              </div>

              <div className={styles.textfield}>
                <label style={{color: '#535763'}}>Maximum Use Duration (if applicable)</label>
                <input autocomplete="off" name="maximum_duration" value={state.maximum_duration} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.maximum_duration}</div>
              </div>
            </div>
        </div>

            <div className={styles.checkboxDiv}>
            <FormControlLabel
                className={classes.form_control_checkbox}
                control={<GreenCheckbox checked={state.is_active} 
                onChange={handleCheckbox} 
                name="is_active" />}
                label={<span className={styles.label_span}>Is Active</span>}
            />
            <FormControlLabel
                className={classes.form_control_checkbox}
                control={<GreenCheckbox checked={state.is_cancellation} 
                onChange={handleCheckbox} 
                name="is_cancellation" />}
                label={<span className={styles.label_span}>Service applicable for cancellation</span>}
                />
            <FormControlLabel
                className={classes.form_control_checkbox}
                control={<GreenCheckbox checked={state.is_happy_code} 
                onChange={handleCheckbox}
                name="is_happy_code" />}
                label={<span className={styles.label_span}>Service applicable for happy code</span>}
                />
            </div>

        </div>
          
      <div className={styles.saveButton}>
      <Button style={{}} onClick={() => history.push('/vendors-service')}  className={classes.button2} variant="contained">
        Cancel
      </Button>
      <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
        {service_id == 'add' ? "Save" : "Update"}
      </Button>
      </div>

      {/* Successfully Added and Updated Modal */}
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
	// 	details: state.Stations.details,
    // isEdit: state.Stations.isEdit,
    // stationData: state.Stations.stationData,
    // contractorsList: state.Stations.contractorsList,
    // isSubmitted: state.Stations.isSubmitted,
    // isLoading: state.Stations.isLoading,
    serviceCategory: state.SFMIS.serviceCategory
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
    getCategoryServices: () => {
      dispatch(actions.getCategoryServices())
    },
    manageSFMISServices: (data) => 
      dispatch(actions.manageSFMISServices(data))
    // setIsSubmitted: flag => {
    //   dispatch(actions.setIsSubmitted(flag))
    // },
    // EditStationDetails: data => {
    //   dispatch(actions.EditStationDetails(data))
    // },
    // getStationData: () => {
    //   dispatch(actions.getStationData())
    // },
    // setIsLoading: (value) =>
    //   dispatch(actions.setIsLoading(value)),
	};
};

export default compose(connect(mapStateToProps,  mapDispatchToProps))(AddService);