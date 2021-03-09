import React, { useState } from "react";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import background1 from "../Login/images/background1.png";
import left_image1 from "../Login/images/left_image1.png";
import header from "./images/logo.png";
import next_header from "../Login/images/next_header1.png"
import button1 from "../Login/images/button1.png";
import styles from "./Reset_passwordAdmin.module.css";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const GreenCheckbox = withStyles({
  root: {
    color: '#B22222',
    '&$checked': {
      color: '#B22222',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
	root: {
    height: 300,
    '& checked': {
      color: 'green',
    },
    '& label.Mui-focused': {
			
      color: '#272D3B',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#272D3B',
    },
		"& .MuiTextField-root": {
			margin: theme.spacing(2),
			width: "25em",
			display: "block",
			["@media (max-width:320px)"]: {
				width: "90%",
			},
			["@media (min-width:321px) and (max-width:500px)"]: {
				width: "19em",
			},
		},

		"& .MuiOutlinedInput-input": {
			padding:"16.5px 10px",
			["@media (max-width:500px)"]: {
				padding:"14px 10px 17px",
			},
		},

		"& .MuiFormLabel-root": {
			// fontSize:"1.1rem",
			["@media (max-width:500px)"]: {
				fontSize:"0.9rem",
			},
		},

		"& .MuiButton-root": {
			width:"90%",
			["@media (max-width:500px)"]: {
				width:"90%",
			},
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
	label: {
		color: "red",
		["@media (max-width:320px)"]: {},
	},
}));

const Reset_passwordAdmin = (props) => {


	const classes = useStyles();
	const [state, setState] = useState({
			newPassword: "",
			confirmPassword: ""
	});
	
	const [errors , setErros]= useState({})
	const [displaytext, setdisplaytext] = useState("hideBlock");
	const [isLoading, setIsLoading] = useState(false);
	const [collapseLng, setLngCollapse] = useState(false);
	  const handleChange =(e)=>{
	     setState({...state,[e.target.name]:e.target.value.trim()})
			 setErros({errors, [e.target.name]:""})
		}

	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

	const [values1, setValues1] = React.useState({
		password: "",
		showPassword1: false,
	});

	const handleClickShowPassword = (event) => {
		console.log(event);
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleClickShowPassword1 = (event) => {
		console.log(event);
		setValues1({ ...values1, showPassword1: !values1.showPassword1 });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleMouseDownPassword1 = (event) => {
		event.preventDefault();
	};

  const handleSubmit = (event) => {
    console.log('clicked')
		event.preventDefault();

		var isValid= true;
		if(state.newPassword == "") {
			errors.newPassword="password is required"
			isValid = false;
		} else if(state.confirmPassword == ""){
			errors.confirmPassword ="password is required";
			isValid = false;
		} else if(state.confirmPassword !== state.newPassword) {
			errors.confirmPassword="new password and confirm password does not match"
			isValid=false;
		}
		setErros({...errors, errors:errors})
		if(isValid){
			window.alert("Password Changed Successfully")
		} else {
			return
		}
		
	};

  return(
    <div>
        <div className={styles.left}>
        <div className={styles.right}>
          <div className={styles.box}>
            <div className={styles.header}>
              <img src={header} className={styles.passenger}/>
              <div className={styles.next_header}>
               
                <h2 style={{color: '#213D77'}} className={styles.master_header}>RESET PASSWORD</h2>
              </div>
              <form
								className={classes.root}
								noValidate
								autoComplete="off"
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
								onSubmit={handleSubmit}
							>
              <TextField
                required
                id="standard-basic"
                label={
                  <span
                    className={
                      styles.usernamePassowrdLabel
                    }
                  >
                      New Password
                  </span>
                }
                type={
                  values1.showPassword1
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                fullWidth={true}
								className={classes.textfield1}
								error={errors.newPassword}
								helperText={errors.newPassword}
								onChange={handleChange}
								name='newPassword'
								value={state.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={
                          handleClickShowPassword1
                        }
                        onMouseDown={
                          handleMouseDownPassword1
                        }
                        edge="end"
                      >
                        {values1.showPassword1 ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                id="standard-basic"
                label={
                  <span
                    className={
                      styles.usernamePassowrdLabel
                    }
                  >
                      Confirm New Password
                  </span>
                }
                type={
                  values.showPassword
                    ? "text"
                    : "password"
                }
								name='confirmPassword'
								value={state.confirmPassword}
                autoComplete="current-password"
								className={classes.textfield1}
                fullWidth={true}
								error={errors.confirmPassword}
								helperText={errors.confirmPassword}
								onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={
                          handleClickShowPassword
                        }
                        onMouseDown={
                          handleMouseDownPassword
                        }
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
							<div className={styles.wrap}>
                           <button onSubmit={handleSubmit} className={styles.button5}>RESET MY PASSWORD</button>
							</div>
              </form>
            </div>
          </div>
          </div>
      {/* <Container fluid={true}>
      <Row>
        <Col md="6" className={styles.left}>
          <div className={styles.image1}>
            <img src={background1} className={styles.background}/>
            <div style={{height: "100%",display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
            <img src={left_image1} style={{zIndex: 1}} className={styles.image} />
            </div>
          </div>
        </Col>
        className={styles.right}>
          <div className={styles.box}>
            <div className={styles.header}>
              <img src={header} className={styles.passenger}/>
              <div className={styles.next_header}>
                <img src={next_header}  />
                <h2 style={{color: '#B22222'}} className={styles.master_header}>RESET PASSWORD</h2>
              </div>
              <form
								className={classes.root}
								noValidate
								autoComplete="off"
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
								onSubmit={handleSubmit}
							>
              <TextField
                required
                id="standard-basic"
                label={
                  <span
                    className={
                      styles.usernamePassowrdLabel
                    }
                  >
                      New Password
                  </span>
                }
                type={
                  values1.showPassword1
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                fullWidth={true}
								className={classes.textfield1}
								error={errors.newPassword}
								helperText={errors.newPassword}
								onChange={handleChange}
								name='newPassword'
								value={state.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={
                          handleClickShowPassword1
                        }
                        onMouseDown={
                          handleMouseDownPassword1
                        }
                        edge="end"
                      >
                        {values1.showPassword1 ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                id="standard-basic"
                label={
                  <span
                    className={
                      styles.usernamePassowrdLabel
                    }
                  >
                      Confirm New Password
                  </span>
                }
                type={
                  values.showPassword
                    ? "text"
                    : "password"
                }
								name='confirmPassword'
								value={state.confirmPassword}
                autoComplete="current-password"
								className={classes.textfield1}
                fullWidth={true}
								error={errors.confirmPassword}
								helperText={errors.confirmPassword}
								onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={
                          handleClickShowPassword
                        }
                        onMouseDown={
                          handleMouseDownPassword
                        }
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
							<div className={styles.wrap}>
  							<button onSubmit={handleSubmit} className={styles.button1}>RESET MY PASSWORD</button>
							</div>
              </form>
            </div>
          </div>
        
      </Row>
      </Container> */}
      </div>
    </div>
  );
}

export default Reset_passwordAdmin;
