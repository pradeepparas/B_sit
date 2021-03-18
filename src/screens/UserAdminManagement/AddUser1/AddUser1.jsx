import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import {Link, useHistory, useParams }  from  'react-router-dom';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import * as actions from "../../../redux/actions/userActions";
import * as API from "../../../constants/APIs";
import axios from 'axios';
import { getStationData, setIsSubmitted, setIsLoading } from "../../../redux/actions/stationActions";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";

// components saveButton
import styles from './AddUser1.module.css';

// import logo from './logo.png';
import flag from '../../StationManagement/flag.svg';
import AutoPassword from './images/auto-password.svg';

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
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { toast } from 'react-toastify';

const GreenCheckbox = withStyles({
  root: {
    color: '#213D77',
    '&$checked': {
      color: '#213D77',
    },
  },
  checked: {},
})((props) => <Checkbox color="#213D77" {...props} />);

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
      backgroundColor: '#b22222',
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
  // button1: {
  //   borderRadius: 16,
  //   border:'1px solid #213D77',
  //   backgroundColor: '#EFEFEF',
  //   color: '#213D77',
  //   textTransform: 'capitalize',
  //   '&:hover': {
  //     backgroundColor: '#EFEFEF',
  //   }
  // },
  button1: {
    ["@media (max-width:428px)"]: {
      marginRight: 0,
      width: '100%',
      marginBottom: 5
    },
    borderRadius: 16,
    color: '#213D77',
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
    border:'1px solid #213D77',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#213D77'
    },
    width: 114
  },
  button3:{
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',  
    },
    ["@media (max-width:368px)"]: {
      width: '90%',
      marginRight:6,
    }

  },
  // label:{
  //   display: 'inline-block !important',
  //   // textAlign:'left',
  //   font:'normal normal normal 18px/22px Montserrat',
  //   letterspacing:'0px',
  //   color:'#272D3B',
  //   opacity: '1',
  //   margin: 'auto',
  // },
  
  

	saveButton1: {
		width: 90,
    height:30,
		marginRight: -780,
		borderRadius: 16,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
		["@media (max-width:428px)"]: {
			marginRight: 0,
			width: '100%',
			// marginBottom: 5
		},
	},
  title1:{
    fontsize: 18,
    marginleft: 37,
    margintop: 10,

  },
  button2: {
		["@media (max-width:428px)"]: {
			marginRight: 0,
			width: '100%',
			marginBottom: 5
		},
		marginRight: 30,
    width: 90,
    height:30,
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#FFFFFF',
    color: '#213D77',
    border:'1px solid #213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#FFFFFF',
     
    }
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

export function AddUser(props) {
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [role, setRole] = useState([]);
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const history= useHistory();
	const { user_id } = useParams();
  const [state, setState]=useState({
      userName:"",
      userNumber:"",
      role:"",
      stationName:"",
      userEmail:"",
			date: "",
      address:"",
      password:"",
      // userPassword:"",
      userAddress:''
      // IDEA:
			// isEdit:false, isAdd:false,
  });
	const [values, setValues] = useState({
		password: "",
		showPassword: false,
	})
  const [errors , setErros]= useState({})
  const [checked , setChecked]= useState(true)

  // close modal
  const toggleModalClose =()=>{
    setModal(false)
    props.setIsSubmitted(false)
    history.push('/user-management')
  }

    // 
		useEffect(()=>{
		if(props.isEdit){
			console.log(props.user)
			debugger
			setState(props.user)
			// set value in startDate

			//funciton
		}
		},[])

    //  Getting dropdown details  
    useEffect(() => {
      if(props.userDetails){
        setDropDownDetails(props.userDetails)
        console.log(props.userDetails)
        // debugger
      }
    }, [props.userDetails])

    useEffect(() => {
      props.setIsLoading(true)
      axios({
        url: API.GetRoleAPI,
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }).then((response)=> {
        setRole(response.data.role)
        props.setIsLoading(false)
      })

      if(props.isEdit || user_id != 'add'){
        props.setIsLoading(true)
        axios({
          url: `${API.GetUserAPI}/${user_id}`,
          headers: { 
            //    'Accept-Language': 'hi', 
            "accept": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
             },
        }).then(response => {
          if(response.data.success){
            console.log(response.data.user)
            debugger  
              // setState(data)
              setState({
                _id: response.data.user._id,
                userName: response.data.user.name,
                userNumber: response.data.user.mobile,
                userAddress: response.data.user.address,
                userPassword: response.data.user.password?response.data.user.password:'',
                role: response.data.user.role_id,
                // stationName: response.data.user.station_id,
                userEmail: response.data.user.email?response.data.user.email:'',
                // date: response.data.user,
              })
          } else {
            setState([]);
          }
        }).catch(err => {
          toast.error(err.response.data.message)
          props.setIsLoading(false)
        })
        props.setIsLoading(false)
        // setState(props.stationData)
        // setDetails(props.stationData)
      }
    }, [])


  // Handle Submit User
  const handleSubmit = (e) => {

      e.preventDefault();
      if (!validateForm()) {
          return
      }
      
      // Add and Update User
      if(user_id === 'add') {
        debugger
        state.date = moment(new Date()).format("DD-MM-YYYY")
        console.log(state)
        debugger
		    props.addUserDetails(state)
        // debugger
      } else {
        props.EditUserDetails(state)
      }
  }

  // Open Modal for Add User Successfully and Update User Successfully
  useEffect(() => {
    debugger
    if(props.isSubmitted){
      setModal(true);
      if(user_id == 'add'){
        setIsAdd(true);
      } else {
        setIsAdd(false);
      } 
    } else {
         
    }
  }, [props.isSubmitted])

	// useEffect
	useEffect(() => {
		props.getUserData()	
	}, [])

  const passwordGenerate = () => {
    var randomstring = Math.random().toString(36).slice(-8);
    setState({
        ...state,
        password: randomstring
      })
    console.log(randomstring)
    debugger
  }

  // validate form
  const validateForm =()=>{
debugger
    // All regex for validation
       var emailValid = state.userEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
       var mobileValid = state.userNumber.toString().match(/^[0]?[6789]\d{9}$/);
       var usernameRegex = state.userName.toString().match(/^[a-zA-Z0-9]+$/);
      //  var userAddressRegex = state.userAddress.toString().match(/^[a-zA-Z0-9]+$/);

       var isValid= true;
       if(state.userName.trim()==''){
           errors.userName="Name is required";
           isValid =false;
       }
      else if(state.userNumber.toString().trim()==''|| !mobileValid){
          errors.userNumber="phone number is required or invalid number";
          isValid =false;
      }
			else if(state.userEmail.toString().trim()=='' ||  !emailValid){
          errors.userEmail="invalid email or enter email ";
          isValid =false;
      }
      else if(state.userAddress.toString().trim()==''){
        errors.userAddress="Address is required ";
        isValid =false;
    }
   
      else if(state.role.trim()=='' || state.role == '0'){
          errors.role="role field is required";
          isValid =false;
      }
      else if ((user_id == 'add') && (state.password.toString().trim()==''|| 
                !(state.password.length >= 3 && state.password.length <= 10))){
          errors.password="password is in between 3 to 10 characters";
          isValid =false;
      }
    
      setErros({...errors, errors:errors})
      return isValid
   }
   

  const handleInputs = (event) => {
		console.log(event.target.name, event.target.value)
		// debugger
      
    setState({
      ...state,
      [event.target.name]: (event.target.name == 'Password' 
                          || event.target.name == 'userNumber')?  
                          event.target.value.trim() : event.target.value
    })
    // debugger
    setErros({errors, [event.target.name]:""})
  }
   // function for adding user or Setting IsEdit False
   const addRole = () => {
    //props.setIsEditFalse(false)
  }

	// Password visibility on off
	const handleClickShowPassword = () => {
		console.log(values.password);
		setValues({ ...values, showPassword: !values.showPassword });
	}; 
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
  //autogenerate password 
  // const handleClickAutoGeneratePassword =()=>{
  //   console.log(value.password);
  //   setValues({ ...values, AutoGeneratePassword : !values.AutoGeneratePassword  });
	// };
  // const handleMouseDownPassword = (event) => {
	// 	event.preventDefault();
	// };

  // handle checkbox
  const handleCheckBox =()=>{
    setChecked(!checked)
  }
  
  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{user_id === 'add' ? "Add User" : "Edit User" }</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/user-management')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
      <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between', paddingTop:20}}>
                <div className={styles.box3}>
          <div style={{ fontSize: 14, marginLeft: 12 }} className={styles.title}>User Details
          <Link to={`/user-management/${user_id}/add-role`} >
              <Button style={{ float: 'right', marginTop: '-5px',marginRight:'15px'}} className={classes.button3} onClick={addRole} variant="contained">
                +Add Role
        </Button>
            </Link>
          </div>
          <div className={styles.box}>
            <div className={styles.grid}>
              <div className={styles.textfield}>
              <label className={styles.label} style={{color: 'black'}}>Name</label>
                <input autocomplete="off" name="userName" value={state.userName} onChange={handleInputs} className={styles.inputfield} type="text" />
                <br/><br/>
                
              </div><br/><br/>
              <div className={styles.error_message}>{errors.userName}</div>
              
              <div className={styles.textfield}>
                <label className={styles.label} style={{color:'black'}}>Phone Number</label>
                <input autocomplete="off" name="userNumber" value={state.userNumber} onChange={handleInputs} className={styles.inputfield} type="text" />
                <br/><br/>
              </div><br/>
              <div className={styles.error_message}>{errors.userNumber}</div>


							<div className={styles.textfield}>
	              <label className={styles.label} style={{color: 'black'}}>Email</label>
	              <input autocomplete="off" name="userEmail" value={state.userEmail} onChange={handleInputs} className={styles.inputfield} type="text" />
	              
	            </div><br/>
              <div className={styles.error_message}>{errors.userEmail}</div>
              <div     className={styles.textfield}>
	              <label className={styles.label} style={{color:'black'}}>Address</label>
	              <input style={{height:"100px"}}  autocomplete="off" name="userAddress" value={state.userAddress} onChange={handleInputs} className={styles.inputfield} type="text" />
	            
	            </div><br/>
              <div className={styles.error_message}>{errors.userAddress}</div>

            {/* <div className={styles.textfield}>
              <label style={{color: 'black'}}>Station Name</label>
              <select className={styles.select1} name="stationName" value={state.stationName} onChange={handleInputs}>
                <option value={'0'}>Station Name</option>
                {dropDownDetails.length > 0 && dropDownDetails.map(data => 
                  <option key={data._id} value={data._id}>{data.station_name}</option>
                )}
            </select>
            <div className={styles.error_message}>{errors.stationName}</div>
            </div> */}

						<div className={styles.textfield}>
							<label className={styles.label} style={{color:'#272D3B'}}>Role</label>
							<select className={styles.select1} name="role" value={state.role} className={styles.inputfield}  onChange={handleInputs}>
								<option style={{color: '#272D3B'}}  value={'0'}>Select Role</option>
								{role.length > 0 && role.map(data => 
                  <option key={data._id} value={data._id}>{data.role.replace('_', ' ')}</option>
                  )}
						</select>
						</div><br/>
            <div className={styles.error_message}>{errors.role}</div>
             {user_id=='add'&&<div className={styles.textfield2}>
              <label className={styles.label} style={{color:'black'}}>Password</label>
              <input style={{position: 'relative'}} autocomplete="off" name="password" value={state.password} onChange={handleInputs} className={styles.inputfield1} type={values.showPassword? "text" : "text"} />
              <button style={{display: 'contents'}} onClick={passwordGenerate}>
            <img style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={AutoPassword} />
            <small style={{display: 'flex', alignItems: 'center',color: 'black'}}>Autogenerate</small>
            </button>
            </div>}
            {user_id=='add'&&<div style={{marginTop: -31}} className={styles.error_message}>{errors.userPassword}</div>}
            <div style={{paddingTop:user_id?"40px":"0px"}} className={styles.bex}>
              <FormControlLabel
                className={classes.label}
                control={<GreenCheckbox checked={checked} onChange={handleCheckBox}  name="checkedG" />}
                label={
                  <span
                    className={styles.checkBoxLabel}
                    style={{ color: "#213D77" }}
                  >
                    Is Active
                </span>
                }
              />
            </div>             					   
            </div>             
            <div className ={styles.saveButton}>
              <button onClick={() => history.push('/user-management')}  type="button" className={styles.btnPrimary1} variant="contained">Cancel</button>
              <button onClick={handleSubmit} bsstyle="primary" type="submit" className={styles.btnPrimary} variant="contained">
              {user_id ? "Save" : "Update"}
                </button>
              </div>
            {/* <div className={styles.saveButton}>
			      <Button style={{}} onClick={() => history.push('/user-list')}  className={classes.button2} variant="contained">
			        Cancel
			      </Button>
			      <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
			        {user_id ? "Update" : "Save"}
			      </Button>
            </div>		  */}
            </div>
        </div>
      </div>
      

      {/* Modal for Add Update User */}
			<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>{isAdd ? "Successfully Added User": "Successfully Updated"} </strong>  </p>
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
    isSubmitted: state.Stations.isSubmitted,
		user: state.Users.userData,
		isEdit: state.Users.isEdit,
    userDetails: state.Stations.stationDetails,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    setIsSubmitted: flag => {
      dispatch(setIsSubmitted(flag))
    },
    setIsLoading: (value) =>
      dispatch(setIsLoading(value)),
		addUserDetails: (user) =>
			dispatch(actions.userActions(user)),
    getUserData: () => {
      dispatch(getStationData())
    },
    EditUserDetails: (details) => 
      dispatch(actions.EditUserDetails(details))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddUser);
