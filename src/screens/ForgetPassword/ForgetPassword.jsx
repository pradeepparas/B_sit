import React, { useState } from "react";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import background1 from "../Login/images/background1.png";
// import left_image1 from "../Login/images/backgroundimg.png";
 

import header from "../LoginStation/images/logo.png";
import next_header from "../Login/images/next_header1.png"
import button1 from "../Login/images/button1.png";
import styles from "./ForgetPassword.module.css";
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
    paddingTop: 20,
    height: 220,
    '& label.Mui-focused': {
			// fontSize: '14px',
			// fontFamily: 'Montserrat',
			// fontWeight: 'normal',
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

const Forgot_password = (props) => {

	const history = useHistory();

	const classes = useStyles();
	const [checked, setChecked] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [username_ErMsg, setusername_ErMsg] = useState("");
	const [password_ErMsg, setpassword_ErMsg] = useState("");
	const [displaytext, setdisplaytext] = useState("hideBlock");

	const [isLoading, setIsLoading] = useState(false);
	const [collapseLng, setLngCollapse] = useState(false);

  const handleUsernameChange = (event) => {
		setUsername(event.target.value);
		setusername_ErMsg('');
	};

  const handleChange = (event) => {
    if(!event.target.checked){
     
    }
    setChecked(event.target.checked);
  };

  const handlePasswordChange = (event) => {

		setPassword(event.target.value);
		setpassword_ErMsg('');
	};
	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		console.log(values.password);
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

  const handleSubmit = (event) => {
		var number = username.match(/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/);
    // console.log('clicked')

		event.preventDefault();
		if(username.trim()=='' || !number){
		setusername_ErMsg("number/email is required or invalid email")
		setdisplaytext('showBlock')
	    return
		}

		history.push('/otp')
		;
	};

  return(
    <div>
	<div className={styles.image}>
		<div className={styles.right}>
          <div className={styles.box}>
            <div className={styles.header}>
              <img src={header} className={styles.passenger}/>
              <div className={styles.next_header}>
                
                <h2 style={{color: '#213D77'}} className={styles.master_header}>OTP VERIFICATION</h2>
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
								className={classes.textfield1}
                
                id="standard-basic"
                label={
                  <span
              
                  >
                  Mobile / Email Address
               
                  </span>
                }
                fullWidth={true}
                value={username}
                onChange={handleUsernameChange}
								error={username_ErMsg}
								helperText={username_ErMsg}
              />
							<div className={styles.wrap}>
  							<button onSubmit={handleSubmit} className={styles.button4}>VEREIY</button>
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
        <Col md="6" className={styles.right}>
          <div className={styles.box}>
            <div className={styles.header}>
              <img src={header} className={styles.passenger}/>
              <div className={styles.next_header}>
                <img src={next_header}  />
                <h2 style={{color: '#B22222'}} className={styles.master_header}>FORGOT PASSWORD</h2>
              </div>
              <p className={styles.para}>
              Please enter the e-mail address or mobile number
              used while creating your account</p>
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
								className={classes.textfield1}
                
                id="standard-basic"
                label={
                  <span
              
                  >
                  Mobile / Email Address
               
                  </span>
                }
                fullWidth={true}
                value={username}
                onChange={handleUsernameChange}
								error={username_ErMsg}
								helperText={username_ErMsg}
              />
							<div className={styles.wrap}>
  							<button onSubmit={handleSubmit} className={styles.button1}>GET OTP</button>
							</div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
      </Container> */}
	  </div>
    </div>
  );
}

export default Forgot_password;
