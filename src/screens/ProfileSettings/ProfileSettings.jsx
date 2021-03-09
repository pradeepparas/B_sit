import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import {Link, useHistory}  from  'react-router-dom';
import moment from 'moment';

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
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';

// Material UI
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// components
import styles from './ProfileSettings.module.css';
import { setIsLoading } from '../../redux/actions/stationActions';
import * as API from '../../constants/APIs';
import * as actions from '../../redux/actions/auth';
import { setIsSubmitted } from "../../redux/actions/stationActions";

// import logo from './logo.png';
import flag from '../StationManagement/flag.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Checkbox,
  Button
  } from '@material-ui/core';
// import InputBase from '@material-ui/core/InputBase';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
		'& label.Mui-focused': {
			// fontSize: '14px',
			fontFamily: 'Montserrat',
			fontWeight: 'normal',
      color: '#272D3B',
    },
    '& .MuiInput-underline:after': {
			// fontFamily: 'Montserrat',
      borderBottomColor: '#272D3B',
    },
  },
	textfield1: {
		"& .MuiInputBase-root": {
			fontSize: 15,
			fontWeight: 'bold',
			fontFamily: 'Montserrat',
		},
		'& label.Mui-focused': {
      color: '#272D3B',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#272D3B',
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
  button1: {
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
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
		["@media (max-width:428px)"]: {
			marginRight: 0,
			width: '100%',
			marginBottom: 5
		},
	},
  button2: {
		["@media (max-width:428px)"]: {
			marginRight: 0,
			width: '100%',
			// marginBottom: 5
		},
		marginRight: 45,
    width: 100,
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#272d3b',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#272d3b',
      color: '#FFF'
    }
  },
  container1: {
		display: "flex",
		flexWrap: "wrap",
    width: 170,
	},
	date1: {
	},
}));

export function ProfileSettings(props) {

// All States
  const [isAdd, setIsAdd] = useState(true);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const classes = useStyles();
  const history= useHistory();
  const [tab, setTab] = useState({
    infoTab: true,
    passwordTab: false
  });

	// Updating Details
  const [state, setState] = useState({
      firstName:"",
      lastName:"",
      emailAddress:"",
      phoneNumber:"",
			currentPassword: "",
			newPassword: "",
			confirmPassword: ""
  });

// Show or Hide password
	const [values, setValues] = useState({
		showCurrentPassword: false,
		showNewPassword: false,
		showConfirmPassword: false
	});
  const [errors , setErros]= useState({})
  const [username, setUsername] = useState("");
  const [username_ErMsg, setusername_ErMsg] = useState("");

//  All Functions
  const handleUsernameChange = (event) => {
		  setUsername(event.target.value);
		  setusername_ErMsg('');
	   };
  // const [password, setPassword] = useState(''); setDetails

  // close modal
  const toggleModalClose =()=>{
    props.setIsSubmitted(false)
    setModal(false)
    history.push("/dashboard")
  }

// Password Fields changing
  const handleChange =(e)=>{
     setState({...state,[e.target.name]:e.target.value.trim()})
		 setErros({errors, [e.target.name]:""})
	}

  // Getting User Details by Id
  useEffect(() => {
    props.setIsLoading(true);

        let user_id = localStorage.getItem('userId');
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
							const fullName = response.data.user.name.split(' ')
							const lastName = fullName.pop()
							const firstName = fullName.join(' ')

              setState({
                ...state,
                firstName: firstName,
                lastName: lastName,
                emailAddress: response.data.user.email?response.data.user.email:'',
                phoneNumber: response.data.user.mobile,
                _id: response.data.user._id,
                userName: response.data.user.name,
              })
          } else {
            setState([]);
          }
        }).catch(err => {
          toast.error(err.response.data.message)
          props.setIsLoading(false)
        })
        props.setIsLoading(false)
  }, [])

  // Handle Submit Station
  const handleSubmit = (e) => {

      e.preventDefault();
      if (!validateForm()) {
          return
      }

			if(tab.infoTab){
				props.changeProfileOrPassword(state, 1)
			} else {
				props.changeProfileOrPassword(state, 2)
			}

  }

  const cancelUpdate = (e) => {
    // history.push('/dashboard')
    history.push("/dashboard")
  }

  // Open Modal for successfully Changed Details
  useEffect(() => {
    if(props.isSubmitted){
      setModal(true);
      setIsAdd(true);
    }
  }, [props.isSubmitted])

  // validate form
  const validateForm =()=>{
    // All regex for validation
       var emailValid = state.emailAddress.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
       var mobileValid = state.phoneNumber.toString().match(/^[0]?[6789]\d{9}$/);
       var usernameRegex = state.firstName.toString().match(/^[a-zA-Z ]+$/);

       var isValid= true;
			 if(tab.infoTab){
				 if(state.firstName.trim()==''|| !usernameRegex){
	           errors.firstName="first name is required or invalid name";
	           isValid =false;
	       }
	      else if(state.lastName.toString().trim()==''|| !state.lastName.toString().match(/^[a-zA-Z]+$/)){
	          errors.lastName="last name is required or invalid last name";
	          isValid =false;
	      }
				else if(state.emailAddress.toString().trim()=='' || !emailValid){
	          errors.emailAddress="Emal address is required or invalid email";
	          isValid =false;
	      }
	    	else  if(state.phoneNumber.trim()==''|| !mobileValid){
	          errors.phoneNumber="phone number is required or invalid number";
	          isValid =false;
	      }
			} else {
				if(state.currentPassword.trim() == "") {
					errors.currentPassword="please enter current password"
					isValid=false;
				} else if(state.newPassword == "") {
					errors.newPassword="password is required"
					isValid = false;
				} else if(state.confirmPassword == ""){
					errors.confirmPassword ="password is required";
					isValid = false;
				} else if(state.confirmPassword !== state.newPassword) {
					errors.confirmPassword="new password and confirm password does not match"
					isValid=false;
				}
			}
      setErros({...errors, errors:errors})
      return isValid
   }

// Updating Details
  const handleInputs = (event) => {
		console.log(event.target.name)
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    setErros({errors, [event.target.name]:""})
  }

	// Password visibility on off
	const handleClickShowPassword = (type) => {
		console.log(type)
		if(type == "current"){
			setValues({
				...values,
				showCurrentPassword: !values.showCurrentPassword });
		} else if(type == "new") {
				setValues({
					...values,
					showNewPassword: !values.showNewPassword });
		} else {
				setValues({
					...values,
					showConfirmPassword: !values.showConfirmPassword });
		}
		debugger

	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

  const tabChange = (event, type) => {
    if(type == 'info') {
      setTab({
        infoTab: true,
        passwordTab: false
      })
    } else {
      setTab({
        infoTab: false,
        passwordTab: true
      })
    }
  }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>Profile Settings</div>
      </div>

      <div style={{display: 'flex', margin: "35px 0px 20px 0px", paddingLeft: 21}}>
      <div>
        <button
          className={tab.infoTab? styles.tabButtons_active : styles.tabButtons}
          /*style={{ color: 'black', outline: 'none', border: 'none',}}*/
          onClick={(e) => tabChange(e, 'info')}>Account Info</button>
        <div style={{display: 'flex', justifyContent: 'center'}}>{tab.infoTab ? <div className={styles.arrow}></div>: null}</div>
      </div>
      <div>
        <button
          className={tab.passwordTab ? styles.tabButtons_active : styles.tabButtons}
          /*style={{color: 'black', outline: 'none', border: 'none'}}*/
          onClick={(e) => tabChange(e, 'password')}>Change Password</button>
        <div style={{display: 'flex', justifyContent: 'center'}}>{tab.passwordTab ? <div className={styles.arrow}></div>: null}</div>
      </div>
      </div>

        <div className={styles.box}>
        <div className={styles.box1}>

          {/* Information Tab */}
            {tab.infoTab && <div className={styles.grid}>

              <div className={styles.textfield}>
              <TextField
                required
								className={classes.textfield1}
                id="standard-basic"
                label={
                  <span
                  >
                  First Name
                    {/*t('login.username' )*/}
                  </span>
                }
								name="firstName"
								autoComplete="off"
                fullWidth={true}
                value={state.firstName}
                onChange={handleInputs}
								error={errors.firstName}
								helperText={errors.firstName}
              />
                <div className={styles.error_message}>{errors.userNumber}</div>
              </div>

							<div className={styles.textfield}>
              <TextField
                required
								name="lastName"
                className={classes.textfield1}
                id="standard-basic"
                label={
                  <span>
                  Last Name
                    {/*t('login.username' )*/}
                  </span>
                }
								autoComplete="off"
                fullWidth={true}
                value={state.lastName}
                onChange={handleInputs}
								error={errors.lastName}
								helperText={errors.lastName}
              />
	            </div>

            <div className={styles.textfield}>
            <TextField
              required
							className={classes.textfield1}
              id="standard-basic"
              label={
                <span>
                Email Address
                  {/*t('login.username' )*/}
                </span>
              }
							autoComplete="off"
							name="emailAddress"
              fullWidth={true}
              value={state.emailAddress}
              onChange={handleInputs}
							error={errors.emailAddress}
							helperText={errors.emailAddress}
            />
            </div>

						{/*This div is active when all text fields are aligned vertically*/}
						<div className={styles.textbox_hide}>
							<ErrorOutlineIcon
								style={{
									color: 'black',
									display: 'flex',
									height: 'inherit',
									alignItems: 'center'
								}} />
							<div className={styles.alertmessage}>
								This email will be used for receiving Master
								admin notifications Personal email not recommended
							</div>
						</div>

						<div className={styles.textfield}>
            <TextField
              required
							className={classes.textfield1}
              id="standard-basic"
              label={
                <span>
                Phone Number
                  {/*t('login.username' )*/}
                </span>
              }
							autoComplete="off"
							name="phoneNumber"
              fullWidth={true}
              value={state.phoneNumber}
              onChange={handleInputs}
							error={errors.phoneNumber}
							helperText={errors.phoneNumber}
            />
						<div className={styles.error_message}>{errors.role}</div>
						</div>

						{/*This div is Hide when text fields are aligned vertically*/}
						<div className={styles.textbox_show}>
							<ErrorOutlineIcon
								style={{
									color: 'black',
									display: 'flex',
									height: 'inherit',
									alignItems: 'center'
								}} />
							<div className={styles.alertmessage}>
								This email will be used for receiving Master
								admin notifications Personal email not recommended
							</div>
						</div>

						<div className={styles.textbox}>
							<ErrorOutlineIcon
								style={{
									color: 'black',
									display: 'flex',
									height: 'inherit',
									alignItems: 'center'
								}} />
							<div className={styles.alertmessage}>
								This number will be used for receiving Master
								admin notifications Personal number not recommended
							</div>
						</div>

						{/*Dummy Div*/}
						<div></div>

            {/* Save and cancel Button */}
						<div className={styles.saveButton}>
			      <Button style={{}} onClick={() => history.push('/station-management')}  className={classes.button2} variant="contained">
			        Cancel
			      </Button>
			      <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
			        Save
			      </Button>
			      </div>
            </div>}

            {/* Password Tab */}
            {tab.passwordTab && <div className={styles.passwordGrid}>

              <div className={styles.passwordTextfield}>
              <TextField
								className={classes.textfield1}
                required
                id="standard-basic"
                label={
                  <span
                    className={
                      styles.usernamePassowrdLabel
                    }
                  >
                      Current Password{/*t('login.password' )*/}
                  </span>
                }
                type={
                  values.showCurrentPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                fullWidth={true}
								onChange={handleChange}
								name='currentPassword'
								value={state.currentPassword}
								error={errors.currentPassword}
								helperText={errors.currentPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
												// name="showPassword"
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('current')}
                        onMouseDown={
                          handleMouseDownPassword
                        }
                        edge="end"
                      >
                        {values.showCurrentPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
                <div className={styles.error_message}>{errors.userNumber}</div>
              </div>

							<div className={styles.passwordTextfield}>
              <TextField
                required
								className={classes.textfield1}
                id="standard-basic"
                label={
                  <span
                    className={
                      styles.usernamePassowrdLabel
                    }
                  >
                      New Password{/*t('login.password' )*/}
                  </span>
                }
                type={
                  values.showNewPassword
                    ? "text"
                    : "password"
                }
								name='newPassword'
								value={state.newPassword}
                autoComplete="current-password"
                fullWidth={true}
								onChange={handleChange}
								error={errors.newPassword}
								helperText={errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("new")}
                        onMouseDown={
                          handleMouseDownPassword
                        }
                        edge="end"
                      >
                        {values.showNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
                <div className={styles.error_message}>{errors.userEmail}</div>
	            </div>

            <div className={styles.passwordTextfield}>
            <TextField
              required
							className={classes.textfield1}
              id="standard-basic"
              label={
                <span
                  className={
                    styles.usernamePassowrdLabel
                  }
                >
                    Confirm Password{/*t('login.password' )*/}
                </span>
              }
              type={
                values.showConfirmPassword
                  ? "text"
                  : "password"
              }
              name='confirmPassword'
              value={state.confirmPassword}
              autoComplete="current-password"
              fullWidth={true}
              onChange={handleChange}
							error={errors.confirmPassword}
							helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("confirm")
                      }
                      onMouseDown={
                        handleMouseDownPassword
                      }
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={styles.error_message}>{errors.stationName}</div>
            </div>

						{/*Dummy Div*/}
						<div></div>

            {/* Save and cancel Button */}
						<div className={styles.saveButton}>
			      <Button style={{}} onClick={cancelUpdate}  className={classes.button2} variant="contained">
			        Cancel
			      </Button>
			      <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
			        Save
			      </Button>
			      </div>
            </div>}
        </div>

      </div>

      {/* After Delete Modal */}
			<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>{tab.infoTab ? "Details Changed Successfully": "Password Changed Successfully"} </strong>  </p>
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

const mapStateToProps = state => {
  return {
    isSubmitted: state.Stations.isSubmitted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoading: (flag) =>
      dispatch(setIsLoading(flag)),
    changeProfileOrPassword: (details, type) =>
      dispatch(actions.changeProfileOrPassword(details, type)),
    setIsSubmitted: flag => {
      dispatch(setIsSubmitted(flag))
    },
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ProfileSettings);
