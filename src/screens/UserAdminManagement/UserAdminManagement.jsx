import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import * as API from '../../constants/APIs';
import { toast } from 'react-toastify';
import {
	Modal,
	// ModalHeader, 
	ModalBody,
	ModalFooter,
	// Input,
	// Label,
	// Form,
	// FormGroup,
} from "reactstrap";

// Images
import downArrow from '../StationManagement/downArrow.png';
import delete_logo from '../StationManagement/delete.svg';
import edit from '../StationManagement/edit.png';
import flag from '../StationManagement/flag.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';
import {Radio,} from '@material-ui/core';
  


// components
import styles from './UserAdminManagement.module.css';
// import styled from 'styled-components';
import * as actions from "../../redux/actions/userActions";
import { getStationData, setIsLoading } from "../../redux/actions/stationActions";


// import { Modal1 } from './Modal';
// import { GlobalStyle } from './globalStyles';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const Button1 = styled.button`
//   min-width: 100px;
//   padding: 16px 32px;
//   border-radius: 4px;
//   border: none;
//   background: #141414;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// `;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
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
    color: "#10AC44",
    '&$checked': {
      color: "#10AC44",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    "& MuiButton-contained:hover": {
      backgroundColor: '#b22222',
    },
  },
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    color:'white',
    ["@media (min-width: 180px) and (max-width: 910px)"]: {
      overflow: 'auto'
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
  textField: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%'
    }
  },
  textField1:{
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
      marginBottom: 5
    },
    outline: 'none',
    width: 150,
    height: 41,
    borderRadius: 30,
    '&:focus': {
      outline: 'none',
      borderColor: '#6c757d'
    },
    '&:hover': {
      outline: 'none',
      // borderColor: '#6c757d'
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
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
      marginBottom: 5
    },
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
    width: 114
  },
	div1: {
		marginRight: 10,
		["@media (min-width: 280px) and (max-width: 1040px)"]:{
			width: '91%',
			marginRight: 0,
		}
	},
  button2: {
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
		["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
			display: 'flex',
			flexDirection: 'column',
      marginBottom: 5
    },
		display: "flex",
		// flexWrap: "wrap",
    width: 192,
	},
	table: {
    "&:last-child td": {
      borderBottom: 0,
    },
    "&:last-child th": {
      borderBottom: 0,
    },
		overflowX: 'scroll',
	},
	date1: {
    // width: 131,
    height: 40,
    fontSize: 12,
    "& .MuiOutlinedInput-adornedEnd":{
      'filter' : 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
    '&:hover': {
      outline: 'none',
      borderColor: 'red'
    },
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 170,
	},
  input1: {
    '&:hover': {
      outline: 'none',
      // backgroundColor: 'red',
      borderColor: 'red'
    },
    height: 18,
    paddingLeft: 4,
    paddingRight: 1,
		color: "#4D4F5C",
		fontSize: "smaller",
	},
  focused1: {
    borderColor: 'white'
  }
}));

// function createData(userName, userNumber, userEmail, role, stationName, date) {
//   return { userName, userNumber, userEmail, role, stationName, date };
// }

// const rows = [
//   createData("Jack", 8854875896, "john@gmail.com", "Station Admin", "Habib Ganj", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "Station Master", "Bhopal", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "Station Admin", "Indore", "01/01/21"),
//   createData("Jack", 8854875896, "john@gmail.com", "Station Admin", "Indore", "01/01/21"),
//   createData("Mark", 8854875896, "john@gmail.com", "Station Master", "Indore", "01/01/21"),
// ];

export function UserManagement(props) {
	const [rows, setRows] = useState([]);
  const [pageNo, setPageNo] = useState();
	const [showModal, setShowModal] = useState(false);
	const [arrayDetails, setArrayDetails] = useState([]);
  const [role, setRoleList] = useState([]);
  const [errors , setErros]= useState({})
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false,
    changeModel:false
  });
  const classes = useStyles();
  const [search, setSearch] = useState({
    station_name: "",
    name: "",
    role: "",
    start_date: "",
    end_date: "",
  })
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [age, setAge] = React.useState('');

	const openModal = () => {
    setShowModal(prev => !prev);
  };
  const [state, setState] = useState({
    chargeable: false,
})

// Handle Delete function
	const handleDeleteSubmit = (e, userData) => {
		// set delete modal false
    console.log(userData)
    
    let data = {
      "block_status": userData.is_blocked,
      "user_id": userData._id
    }
    props.setIsLoading(true)

  
   

    axios({
      url: `${API.BlockUserAPI}/${userData._id}`,
      method: "DELETE",
      headers: {
        //    'Accept-Language': 'hi',
        "accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response) => {
      if(response.data.success){
        
        // toast.success(response.data.message)
        setModal({
          deleteModal: false,
          deletedModal: true
        })
        props.getUserDataByParams(pageNo, props.limit)
      } else {
        
        toast.error(response.data.message)
      }
    }).catch(err => {
      toast.error(err.response.data.message)
      props.setIsLoading(false)
    })
    props.setIsLoading(false)

    props.deleteUser(arrayDetails.id)
		setModal({
			deleteModal: false,
			deletedModal: true
		})
	}
  const handleChangeChargeable = (event, type) => {
    if (type == 'Yes') {
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
    props.statusUser(arrayDetails.id)
		setModal({
			changeModal: false,
			changedModal: true
		})
  };
  // Getting Users list By Parameters
    useEffect(() => {
      props.getRole();
      props.getUserData();
      props.getUserDataByParams(1, 10);
      // 
    }, [])

    useEffect(() => {
      setRoleList(props.role)
      if(props.userDetails){
        setDropDownDetails(props.userDetails)
        console.log(props.userDetails)
        // 
      }

      if(props.userDocs){
        console.log("",props.userDocs)
        setRows(props.userDocs)
        
      }
    }, [props.userDocs, props.userDetails])

   // Changing Date fields
   const handleDateChange = (data, type) => {
    console.log(data)
    // 
    if(type == 'start') {
      setSearch({
        ...search,
        start_date: data.target.value
      })
    } else {
      setSearch({
        ...search,
        end_date: data.target.value
      })
    }
  }

  const handleChangePage = (event, page) => {
    setPageNo(page)
    props.getUserDataByParams(page, props.limit, search)
	}

  // Used for Pagination
  const setPage = () => {
		let total = Math.ceil(40 /10)
		return (

        <Pagination
          onChange={handleChangePage}
    			count={total}
          shape="rounded"
          classes={{ ul: classes.ul1 }}
          size='small'/>
		)

	}
//   {rows.length == 0 && <div className={styles.pageDiv}>
//   <div style={{ marginTop: 40 }}>
//     {rows.length == 0 && setPage()}
//   </div>
// </div>}

  // Search field Change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, i)=>{
  	setModal(true);
    rows[i].id = i;
    setArrayDetails(rows[i]);
    if(data == 'details'){
      setModal({
        details: true
      })
    } else  if(data=='change'){

      setModal({
        changeModel: true
      })
    }
  	// setState({...state, packageName:data.packageName, id: data._id, })
    }
    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false,
        change:false
      })
    }
		const editUser=(e, i,  data)=>{
			data.id=i
			props.setUserData(data)
		}

    // function for adding user or Setting IsEdit False
    const addUser = () => {

      props.setIsEditFalse(false)
    }

    const searchUsers = () => {
      console.log(search)
      
      props.getUserDataByParams(1, 10, search)
    }

    const handleInputs = (event) => {
      setSearch({
        ...search,
        [event.target.name]: [event.target.value]
      })
    }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}> User Management</div>
        <Link to="/user-management/add">
        <Button className={classes.button1} onClick={addUser} variant="contained">
          +Add User
        </Button>
        </Link>
      </div>
      <div className={styles.table}>
      <div className={styles.filterContent}>
        <div className={styles.searchBarDiv}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            // label="Search"
            className={classes.textField1}
            id="outlined-adornment-weight"
            value={search.name}
            name="name"
            onChange={handleInputs}
            startAdornment={<SearchOutlinedIcon />}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              placeholder: 'Search',

              color: 'red',
              'aria-label': 'weight',
            }}
            // labelWidth={12}
          />
        </FormControl>

         {/*Select*/}
         {/* <div className={styles.selectDiv1}>
           <select className={styles.select1} name="station_name"  onChange={handleInputs}>
             <option selected disabled>Station Name</option>
             {dropDownDetails.length > 0 && dropDownDetails.map(data =>
               <option key={data._id} value={data._id}>{data.station_name}</option>
             )}
         </select>
         </div> */}

          <div className={styles.selectDiv1}>
            <select className={styles.select1} name="role" /*value={this.state.courseId}*/ onChange={handleInputs}>
              <option selected disabled>Role</option>
              {role.length > 0 && role.map(data =>
                  <option key={data._id} value={data._id}>{data.role.replace('_', '_',' ')}</option>
                  )}
          </select>
          </div>

        {/* <div className={styles.dateDiv}> */}
        <div className={classes.container1}>
        <label style={{width: 70,height:35}} className={styles.dateLabel}><b>From Date</b></label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
            placeholder="From Date"
            name="start_date"
            value={search.start_date}
            onChange={(e) => handleDateChange(e, 'start')}
    				// defaultValue={new Date()}
    				className={classes.date1}
            InputProps={{
              placeholder: "From Date",
              // endAdornment: null,
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    				// InputLabelProps={{
            //   placeholder: 'From Date',
    				// 	shrink: true,
    				// }}
    			/>
          {/*<DatePicker
            className={styles.input_s}
            peekNextMonth showMonthDropdown showYearDropdown
            dropdownMode="select"
            selected={new Date()}
            value={new Date()}
            onChange={(e) => handleChange(e,'end')} placeholderText='Start Date' />
            <img style={{width: 15, height: 15}} src={downArrow} />*/}
    		</div>

        <div className={classes.container1}>
          <label style={{width: 45,height:35}} className={styles.dateLabel}><b>To Date</b></label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
    				// defaultValue={new Date()}
            name="end_date"
            value={search.end_date}
            onChange={(e) => handleDateChange(e, 'end')}
    				className={classes.date1}
    				// InputLabelProps={{
            //   label: 'To Date',
    				// 	shrink: true,
            //   classes: { input: classes.input1 },
            //   focused: classes.focused1,
    				// }}
            InputProps={{
              placeholder: "From Date",
              // endAdornment: null,
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    			/>
    		</div>
        {/* </div> */}
      </div>
      <div className={classes.div1}>
          {/*Search Button*/}
          <Button onClick={searchUsers} className={classes.button1} variant="contained">
            Search
          </Button>
        </div>
    </div>

      <TableContainer
      className={classes.tableContainer}
      style={{

        }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{backgroundColor:'#213D77'}}>
          <TableRow >
            <TableCell style={{color:'#FFFFFF'}} >S.No.</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Name</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Phone Number</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Email</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Role</TableCell>
            {/* <TableCell style={{color:'#FFFFFF'}}align="center">Station Name</TableCell> */}
            <TableCell style={{color:'#FFFFFF'}} align="center">Registration Date</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Status</TableCell>
            <TableCell style={{color:'#FFFFFF'}}align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow className={classes.table} key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.mobile}</TableCell>
              <TableCell align="center">{row.email? row.email:'-'}</TableCell>
              <TableCell align="center">{row.role_id?row.role_id.role/*.replace('_', ' ')*/: '-'}</TableCell>
              {/* <TableCell align="center">{row.station_id?row.station_id.station_name: '-'}</TableCell> */}
              <TableCell align="center">{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
              <TableCell align="center">{row.is_blocked?"In-active": "Active"}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>
                  <Link to={`/edit-user/${row._id}`}><div onClick={(e) =>editUser(e, index, row)}>Edit Details</div></Link>
                  <a><div onClick={(e) => toggleModal(e, 'change', index)}>Change Status</div></a>
                </div>
                </div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
		{rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Modal */}
			{<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted User</strong>  </p>
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
				</Modal>}

			{/*Delete User*/}
      {/* {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete {arrayDetails.userName} User?</strong>  </p>

					</ModalBody>
					<ModalFooter className={styles.footer}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button2}
							onClick={toggleModalClose}
						>
						NO
						</Button>
						<Button
              style={{width: 100}}
							variant="contained"
							className={classes.button1}
							onClick={(e) => { handleDeleteSubmit(e, arrayDetails) }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>} */}

				{/* Modal for view Details */}
				{<Modal className={styles.modalContainer} contentClassName={styles.customClass}
				 isOpen={modal.details} toggle={toggleModalClose} centered={true}>
				 <CancelIcon
					 style={{
						 width: 40,
						 height: 40,
						 backgroundColor: 'white',
						 color: "#213D77",
						 borderRadius: 55,
						 position: "absolute",
						 top: "-14",
						 right: "-16",
						 cursor: "pointer",
					 }}
					 onClick={toggleModalClose}
				 />
				 <div style={{display: 'flex', justifyContent: 'flex-end'}}>
				 <Link to={`/edit-user/${arrayDetails._id}`}><button onClick={(e) =>editUser(e, arrayDetails._id, arrayDetails)} className={styles.modalButton}>
				 <img className={styles.modalImage} style={{width: 21,height: 21, marginTop: 10, marginLeft: 10, marginRight: 10}} src={edit} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Edit  Details</small>
				 </button></Link>
				 </div>
						<div style={{ marginTop: 15}}>

						<div className={styles.box1}>
							{/*<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Details</div>*/}
								<div className={styles.modalBox}>
								
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>User Name</span><span style={{marginLeft:90,marginRight: 25}}> - </span>{arrayDetails.name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>User Phone Number</span><span style={{marginLeft:32,marginRight: 25}}> - </span>{arrayDetails.mobile}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>User Email</span><span style={{marginLeft:94,marginRight: 25}}> - </span>{arrayDetails.email}
								</div>
                <div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Role</span><span style={{marginLeft:130,marginRight: 25}}> - </span>{arrayDetails.role_id?arrayDetails.role_id.role/*.role.replace('_', ' ')*/: '-'}
								</div>
                {/* <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Name</span><span style={{marginLeft: 75,marginRight: 25}}> - </span>{arrayDetails.station_id?arrayDetails.station_id.station_name: '-'}
								</div> */}
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Registration Date</span><span style={{marginLeft:50,marginRight: 25}}> - </span>{moment(arrayDetails.created_at).format("DD-MM-YYYY")}
								</div>
								</div>
						</div>
						</div>
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
					</Modal>}
          {/* Modal for change Status */}
				{<Modal className={styles.Container2} contentClassName={styles.customClasss}
				 isOpen={modal.changeModel} toggle={toggleModalClose} centered={true}>
            <CancelIcon
					 style={{
						 width: 40,
						 height: 40,
						 backgroundColor: 'white',
						 color: "#213D77",
						 borderRadius: 55,
						 position: "absolute",
						 top: "-14",
						 right: "-16",
						 cursor: "pointer",
					 }}
					 onClick={toggleModalClose}
				 />
         <div className={styles.textfield2}>
                <label style={{color: '#213D77', fontWeight:"700", marginRight:"-84",marginBottom:"45",width:'145px'}}>Change Status</label>
                  <div style={{display: 'flex', alignItems: 'center', marginLeft:'41'  }}>
                  <GreenRadio
                    checked={state.chargeable}
                    onChange={(e) => handleChangeChargeable(e,"Yes")}
                    // value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'C' }}
                  />
                  <label className={classes.radio_label} style={{color: '#10AC44', fontWeight: '700'}}>Active</label>

                <RedRadio
                    checked={!state.chargeable}
                    onChange={(e) => handleChangeChargeable(e, "No")}
                    // value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'C' }}
                  />
                  <label style={{color: '#b22222', fontWeight: '700', margin: 0}}>Inactive</label>
                </div>
                <div className={styles.error_message}>{errors.chargeable}</div>
              </div>
						<ModalFooter className={styles.footer1}>
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
					</Modal>}


      {rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      {rows.length > 0 && setPage()}
      </div>
      </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
	// 
	return {
		// user: state.Users.usersList,
    userDocs: state.Users.docs,
    userDetails: state.Users.userDetails,
    total: state.Users.total,
    limit: state.Users.limit,
    role: state.Users.role
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    getUserDataByParams: (pageNo, size, params) => {
      dispatch(actions.getUserDataByParams(pageNo, size, params))
    },
    setIsLoading: (value) =>
      dispatch(setIsLoading(value)),
    getRole: () => {
      dispatch(actions.getRole())
    },
    getUserData: () => {
      dispatch(getStationData())
    },
    setIsEditFalse: (value) =>
      dispatch(actions.setIsEditFalse(value)),
		// add_user: (user) =>
		// 	dispatch(actions.userActions(user))
	  setUserData	: (data) =>
			dispatch(actions.setUserData(data)),
    deleteUser: (id) =>
      dispatch(actions.deleteUser(id))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(UserManagement);
