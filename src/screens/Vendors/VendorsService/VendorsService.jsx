import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';
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
import { Link, useHistory } from "react-router-dom";

// Images
import downArrow from '../../StationManagement/downArrow.png';
import delete_logo from '../../StationManagement/delete.svg';
import edit from '../../StationManagement/edit.png';
import flag from '../../StationManagement/flag.svg';
import vendor_image from './vendor_image.png';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';

// components
// import { getStationData } from "../../../redux/actions/stationActions";
import styles from './VendorsService.module.css';
// import * as actions from "../../../redux/actions/vendorActions";
// import { setIsLoading } from '../../../redux/actions/stationActions';
// import * as API from '../../../constants/APIs';
// import styled from 'styled-components';

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

const GreenCheckbox = withStyles({
  root: {
    color: '#213d77',
    '&$checked': {
      color: '#213d77',
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
  link1: {
    marginTop: 25,
		// width: '100%',
		borderRadius: 16,
    float: 'right',
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    }
	},

  form_control_checkbox: {
    height: 20
  },
  textField: {
    ["@media (min-width: 280px) and (max-width: 1192px)"]: {
      width: '100%'
    }
  },
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    ["@media (min-width: 180px) and (max-width: 1010px)"]: {
      overflow: 'auto'
    },
  },
  textField1:{
    ["@media (min-width: 280px) and (max-width: 1192px)"]: {
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
    // color: '#213D77',
    // borderRadius: 8
  },
	div1: {
		marginRight: 10,
		["@media (min-width: 681px) and (max-width: 1192px)"]:{
			width: 500,
			marginRight: 0,
		},
		["@media (min-width: 280px) and (max-width:680px)"]:{
			width: '91%',
			marginRight: 0,
		}
	},
  button1: {
		width: 100,
    ["@media (min-width: 280px) and (max-width: 1192px)"]: {
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
    }
  },
  button2: {
    ["@media (max-width: 400px)"]: {
      marginRight: 0,
      marginBottom: 10
    },
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
  },
  container1: {
		["@media (min-width: 280px) and (max-width: 1192px)"]: {
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

function createData(vendor_name, service, display_name, operational_hours, service_number, items_offered, status) {
  return { vendor_name, service, display_name, operational_hours, service_number, items_offered, status };
}

const rows = [
  createData("John Doe", "Medicines", "Medico Chemist", "10 AM - 10 PM",7789568542, 10, 1),
  createData("Jack", "Wheel Chair", "Wheel Chair", "10 AM - 10 PM",7789568542, 10, 0),
  createData("John Doe", "Wheel Chair", "Wheel Chair", "10 AM - 10 PM",7789568542, 20, 1),
  createData("Jack", "Medicines", "Medico Chemist", "10 AM - 10 PM",7789568542, 20, 1),
  createData("John Doe", "Wheel Chair", "Wheel Chair", "10 AM - 10 PM",7789568542, 10, 0),
];

export function VendorsService(props) {
  const [pageNo, setPageNo] = useState();
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  })
  const [dropDownDetails, setDropDownDetails] = useState([]);
	const [vendorDropDown, setVendorDropDown] = useState([]);
	const [categoryDropDown, setCategoryDropDown] = useState([])
  // const [rows, setRows] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [arrayDetails, setArrayDetails] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false
  });
	const [search, setSearch] = useState({
		name: "",
    vendor_id: "",
    service_name: "",
    station_id: "",
    start_date: "",
    end_date: "",
  });
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [age, setAge] = useState('');

	const openModal = () => {
    setShowModal(prev => !prev);
  };

// Handle Vendor Active and In-active function
	const handleVendorStatus = (e, vendor) => {
	// 	// set delete modal false
	// 	console.log(vendor)
	// 	debugger
	// 	// return
	// 	let data = {
  //     "status": !vendor.status,
  //     "id": vendor._id
  //   }
  //   props.setIsLoading(true)

  //   axios({
  //     url: API.VendorBlockAPI,
  //     method: "PUT",
  //     headers: {
  //       //    'Accept-Language': 'hi',
  //       "accept": "application/json",
  //       'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //     },
  //     data: data
  //   }).then((response) => {
  //     if(response.data.success){
  //       debugger
  //       // toast.success(response.data.message)
        setModal({
          deleteModal: false,
          deletedModal: true
        })
  //       props.getVendorDataByParams(pageNo, props.limit, search)
  //     } else {
  //       debugger
  //       toast.error(response.data.message)
  //     }
  //   }).catch(err => {
  //     toast.error(err.response.data.message)
  //     debugger
  //     props.setIsLoading(false)
  //   })

	}

	// Drop-Down Details for category and Vendor Details
	// useEffect(() => {
	// 	if(props.categoryData){
	// 		setCategoryDropDown(props.categoryData)
	// 	}
	// 	if(props.vendorDetails){
	// 		setVendorDropDown(props.vendorDetails)
	// 	}
	// }, [props.categoryData, props.vendorDetails])

	// Drop-Down Details for Delivery Station
  // useEffect(() => {
  //   // setRoleList(props.role)
	// 	if(props.stationDetails){
  //     setDropDownDetails(props.stationDetails)
  //     // debugger
  //   }

  //   if(props.vendorDocs){
  //     // console.log("",props.vendorDocs)
  //     setRows(props.vendorDocs)
  //     debugger
  //   }
  // }, [props.vendorDocs, props.stationDetails, props.vendorDetails])

  // Getting Vendors List
  // useEffect(() => {
	// 	props.getStationData()
  //   // props.getRole();
  //   // props.getUserData();
  //   props.getVendorDataByParams(1, 10);
  //   // debugger
  // }, [])

  // Get Vendors Data List


  // Search Field Value
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, i)=>{
  	setModal(true);
    setArrayDetails(rows[i]);

    if(data == 'delete'){
      setModal({
        deleteModal: true
      })
    } else {

      setModal({
        details: true
      })
    }
  	// setState({...state, packageName:data.packageName, id: data._id, })
    }
    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false
      })
    }

    //  used for pagination
    const handleChangePage = (event, page) => {
      setPageNo(page)
      // props.getUserDataByParams(page, props.limit)
	  }

    // Used for Pagination
    const setPage = () => {
      let total = Math.ceil(rows.length / 10)
      return (
        <Pagination
          onChange={handleChangePage}
          count={total}
          shape="rounded"
          classes={{ ul: classes.ul1 }}
          size='small'/>
    )
  }

		// Changing Date fields
		const handleDateChange = (data, type) => {
		 console.log(data)
		 // debugger
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

	 // Search filter function
	 const filterVendors = () => {
		 console.log(search)
		 debugger
		 props.getVendorDataByParams(1, 10, search)
	 }

	// Handle Inputs for Seaching
	const handleInputs = (event) => {
		setSearch({
			...search,
			[event.target.name]: [event.target.value]
		})
		if(event.target.name == "station_id"){
			props.getVendorDetails(event.target.value)
		}
	}

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Vendor Services</div>
      </div>
      <Link to="/vendors-service/add">
        <Button onClick={() => console.log('Vendor service')} className={classes.link1} variant="contained">
          + Add Vendor Service
        </Button>
        </Link>
      <div className={styles.table}>
      <div className={styles.filterContent}>
        <div className={styles.searchBarDiv}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            // label="Search"
            className={classes.textField1}
						name='name'
            value={search.name}
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
				 <div className={styles.selectDiv1}>
					 <select className={styles.select1} name="station_id" /*value={search.station_id}*/ onChange={handleInputs}>
						 <option selected disabled>Vendor Name</option>
             <option value={"1"}>All</option>
             <option value={"2"}>ABC</option>
             <option value={"3"}>John Doe</option>
						 {/*dropDownDetails.length > 0 && dropDownDetails.map(data =>
							 <option key={data._id} value={data._id}>{data.station_name}</option>
             )*/}
				 </select>
				 </div>

				 <div className={styles.selectDiv1}>
           <select className={styles.select1} name="service_name" /*value={search.service_name}*/ onChange={handleInputs}>
             <option selected disabled>Services Category</option>
             <option value={"1"}>ALL</option>
             <option value={"2"}>Medicines</option>
             <option value={"3"}>Food and Beverage</option>
             <option value={"4"}>Porter</option>
						 {/*categoryDropDown.length > 0 && categoryDropDown.map(data =>
							 <option key={data._id} value={data._id}>{data.category_name}</option>
             )*/}
         </select>
         </div>

        {/* <div className={styles.dateDiv}> */}
        {/*<div className={classes.container1}>
        <label style={{width: 70}} className={styles.dateLabel}>From Date</label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
            placeholder="From Date"
    				// defaultValue={new Date()}
						name="start_date"
            value={search.start_date}
            onChange={(e) => handleDateChange(e, 'start')}
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
    		</div>*/}

        {/*<div className={classes.container1}>
          <label style={{width: 45}} className={styles.dateLabel}>To Date</label>
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
    		</div>*/}
        </div>
        <div className={classes.div1}>
          {/*Search Button*/}
          <Button onClick={filterVendors} className={classes.button1} variant="contained">
            Search
          </Button>
        </div>

        {/* </div> */}
      </div>

      <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{backgroundColor: '#213d77'}}>
          <TableRow>
            <TableCell style={{color: "white"}} >S.No.</TableCell>
            <TableCell style={{color: "white"}} align="center">Vendor Name</TableCell>
            <TableCell style={{color: "white"}} align="center">Service Category</TableCell>
            <TableCell style={{color: "white"}} align="center">Display Name</TableCell>
            <TableCell style={{color: "white"}} align="center">Operational Hours</TableCell>
            <TableCell style={{color: "white"}} align="center">Service Booking Phone Number</TableCell>
            <TableCell style={{color: "white"}} align="center">Items Offered</TableCell>
						<TableCell style={{color: "white"}} align="center">Status</TableCell>
            {/* <TableCell align="center">Status</TableCell> */}
            <TableCell style={{color: "white"}} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow className={classes.table} key={row.vendor_name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{/*row.userName*/row.vendor_name}</TableCell>
              <TableCell align="center">{/*row.userNumber*/row.service}</TableCell>
              <TableCell align="center">{/*row.userEmail*/row.display_name}</TableCell>
              <TableCell align="center">{/*row.service*/row.operational_hours}</TableCell>
              <TableCell align="center">{/*row.stationName*/row.service_number}</TableCell>
              <TableCell align="center">{/*row.hours*/row.items_offered}</TableCell>
							<TableCell style={{color: row.status? 'green': 'red'}} align="center">{/*row.service*/row.status?"active": "In-active"}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>
                  <a><div onClick={(e) => toggleModal(e, 'delete', index)}>Change Status</div></a>
                  <Link to={`vendors-service/${1}`}><a><div onClick={(e) => toggleModal(e, 'details', index)}>Edit Details</div></a></Link>
                  <Link to={`vendors-service/item-details/${1}`}><a><div>Item Details</div></a></Link>
                  <a><div onClick={(e) => toggleModal(e, 'delete', index)}>Delete Service</div></a>
                </div>
                </div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Vendor Service Modal */}
			{<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted Vendor Service</strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.deleteFooter}>
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

			{/*Delete Vendor Service*/}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20, color: "#213d77"}}>Are you sure you want to delete {arrayDetails.vendor_name} Vendor Service?</strong>  </p>

					</ModalBody>
					<ModalFooter className={styles.deleteFooter}>
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
							onClick={(e) => { handleVendorStatus(e , arrayDetails) }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>}

				{/* Modal for view Details */}
        <Modal className={styles.modalContainer} contentClassName={styles.customClass}
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
            <Link to={`vendors-service/${1}`}><button className={styles.modalButton}/*style={{display: 'contents'}}*/ onClick={(e) => console.log(e)}>
				        <img className={styles.modalImage} src={edit} />
				        <small style={{display: 'flex', alignItems: 'center'}}>Edit Details</small>
				        </button>
            </Link>
            </div>
						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>
      
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <div className={styles.image_box}>
              <img src={vendor_image} />
              </div>
            </div>

            <div className={styles.modal_left_box} style={{display: 'flex', flexDirection: 'column'}}>
						<div className={styles.box1}>
            <div style={{fontSize: 14, marginLeft: 12, color: 'black'}} className={styles.title}>Station Admin Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Vendor Name</span><span style={{marginLeft: 100,marginRight: 25}}> - </span>{/*arrayDetails.userName*/arrayDetails.vendor_name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Display Name</span><span style={{marginLeft: 98,marginRight: 25}}> - </span>{/*arrayDetails.userNumber*/arrayDetails.display_name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Service Type</span><span style={{marginLeft: 105,marginRight: 25}}> - </span>{/*arrayDetails.userEmail*/arrayDetails.service_name}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Service Category</span><span style={{marginLeft: 77,marginRight: 25}}> - </span>Food and Beverages
								</div>
                <div className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Service Booking Number</span><span style={{marginLeft: 26,marginRight: 25}}> - </span>{arrayDetails.service_number}
								</div>
                <div className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Chargeable</span><span style={{marginLeft: 111,marginRight: 25}}> - </span>{arrayDetails.status? "Yes": "No"}
								</div>
								</div>
						</div>

						<div className={styles.box1}>
            <div style={{fontSize: 14, marginLeft: 12,  color: 'black'}} className={styles.title}>Station Admin Details</div>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Operational Hours</span><span style={{marginLeft: 78,marginRight: 25}}> - </span>{/*arrayDetails.service*/arrayDetails.operational_hours}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Delivery Preparation Duration</span><span style={{marginLeft: 4,marginRight: 25}}> - </span>40 mins
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Maximum Use Duration</span><span style={{marginLeft: 44,marginRight: 25}}> - </span>45 mins
							</div>
              <FormControlLabel
                  className={classes.form_control_checkbox}
                  control={<GreenCheckbox checked={true} 
                  /*onChange={handleChange}*/ 
                  name="checkedG" />}
                  label={<span className={styles.label_span}>Is Active</span>}
              />
              <FormControlLabel
                  className={classes.form_control_checkbox}
                  control={<GreenCheckbox checked={true} 
                  /*onChange={handleChange}*/ 
                  name="checkedG" />}
                  label={<span className={styles.label_span}>Auto Approve Items</span>}
              />
              <FormControlLabel
                  className={classes.form_control_checkbox}
                  control={<GreenCheckbox checked={true} 
                  /*onChange={handleChange}*/ 
                  name="checkedG" />}
                  label={<span className={styles.label_span}>Service applicable for cancellation</span>}
              />
              
              </div>
							</div>
            </div>

					</div>
					</Modal>


      {rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      {rows.length > 0 && setPage()}
      </div>
      </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
	// debugger
	return {
	//   vendorDocs: state.Vendors.docs,
    // total: state.Vendors.total,
    // limit: state.Vendors.limit,
    // vendorDetails: state.Vendors.vendorDetails,
	// 	categoryData: state.Vendors.categoryData,
	// 	stationDetails: state.Stations.stationDetails,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	// 	getStationData: () => {
    //   dispatch(getStationData())
    // },
    // getVendorDataByParams: (pageNo, size, params) => {
    //   dispatch(actions.getVendorDataByParams(pageNo, size, params))
    // },
	// 	getVendorDetails: (id) =>
	// 		dispatch(actions.getVendorDetails(id)),
	// 	setIsLoading: (loading) =>
	//     dispatch(setIsLoading(loading))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(VendorsService);
