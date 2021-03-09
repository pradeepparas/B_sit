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
import { Link, useHistory, useRouteMatch } from "react-router-dom";

// Images
import downArrow from '../StationManagement/downArrow.png';
import delete_logo from '../StationManagement/delete.svg';
import edit from '../StationManagement/edit.png';
import flag from '../StationManagement/flag.svg';
import printer from './printer.png';
// import vendor_image from '../vendor_image.png';
import view from './view.svg';
// import food_image from './food_image.jpg';

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
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
// import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// components
// import { getStationData } from "../../../redux/actions/stationActions";
import styles from './RevenueReport.module.css';
// import * as actions from "../../../redux/actions/vendorActions";
// import { setIsLoading } from '../../../redux/actions/stationActions';
// import * as API from '../../../constants/APIs';

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
// 680px
  form_control_checkbox: {
    height: 20
  },
  textField: {
    ["@media (min-width: 280px) and (max-width: 1114px)"]: {
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
    ["@media (min-width: 280px) and (max-width: 1114px)"]: {
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
		["@media (min-width: 671px) and (max-width: 1114px)"]:{
			width: 500,
			marginRight: 0,
		},
		["@media (min-width: 280px) and (max-width:670px)"]:{
			width: '91%',
			marginRight: 0,
		}
	},
  button1: {
		width: 100,
    ["@media (min-width: 280px) and (max-width: 1114px)"]: {
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
  back_button: {
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
		["@media (min-width: 280px) and (max-width: 1114px)"]: {
      width: '100%',
			display: 'flex',
			flexDirection: 'column',
      marginBottom: 5
    },
		display: "flex",
		// flexWrap: "wrap",
    width: 195,
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

function createData(vendor_name, service_name, service_group, amount, date) {
  return { vendor_name, service_name, service_group, amount, date };
}

const rows = [
  createData("John Doe", "Medicines", "SFMIS", "1100","01/03/2021"),
  createData("Jack", "Food and Beverages", "Vendor", "2000","01/03/2021"),
  createData("John Doe", "Food and Beverages", "Vendor", "3000","15/02/2021"),
  createData("Jack", "Food and Beverages", "SFMIS", "1000","10/03/2021"),
  createData("John Doe", "Medicines", "SFMIS", "3000","01/03/2021"),
];

export function RevenueReport(props) {
  const url = useRouteMatch()
  const path = url.path.split('/')[1]
  const history= useHistory();
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
  //       setModal({
  //         deleteModal: false,
  //         deletedModal: true
  //       })
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
		const handleDateChange = (date, type) => {
		 console.log(date)
		 // debugger
		 if(type == 'start') {
			 setSearch({
				 ...search,
				 start_date: moment(date).format("DD-MM-YYYY")
			 })
		 } else {
			 setSearch({
				 ...search,
				 end_date: moment(date).format("DD-MM-YYYY")
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
        <div className={styles.title}>{path === 'revenue-report-vendor' ? "Revenue By Vendors" :"Revenue By Services"}</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/revenue-graph')} className={classes.back_button} variant="contained">
          Back
        </Button>
      </div>
      
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
                <option value={"2"}>Approved</option>
                <option value={"3"}>Disapproved</option>
                <option value={"3"}>New</option>
				{/*dropDownDetails.length > 0 && dropDownDetails.map(data =>
				<option key={data._id} value={data._id}>{data.station_name}</option>
                )*/}
			</select>
		</div>

        <div className={styles.selectDiv1}>
			<select className={styles.select1} name="station_id" /*value={search.station_id}*/ onChange={handleInputs}>
				<option selected disabled>Services Name</option>
                <option value={"1"}>All</option>
                <option value={"2"}>Approved</option>
                <option value={"3"}>Disapproved</option>
                <option value={"3"}>New</option>
				{/*dropDownDetails.length > 0 && dropDownDetails.map(data =>
				<option key={data._id} value={data._id}>{data.station_name}</option>
                )*/}
			</select>
		</div>

        {/* <div className={styles.dateDiv}> */}
        {/* Date fields */}
        <div className={classes.container1}>
        <label style={{width: 70}} className={styles.dateLabel}>From Date</label>
                <DatePicker
                    autoComplete="off"
                    name="start_date"
                    value={search.start_date}
                    onChange={(e) => handleDateChange(e, 'start')}
                    maxDate={search.end_date?new Date(search.end_date): ''}
                    className={styles.input_s}
                    peekNextMonth showMonthDropdown showYearDropdown
                    dropdownMode="select"
                //   value={state.contract_start_date?moment(state.contract_start_date).format("DD-MM-YYYY"): ''}
                   placeholderText='dd/mm/yyyy' />
    		</div>

        <div className={classes.container1}>
          <label style={{width: 45}} className={styles.dateLabel}>To Date</label>
    			{/*<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
    				// defaultValue={new Date()}
						
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
    			/>*/}
                <DatePicker
                  autoComplete="off"
                  name="end_date"
                  value={search.end_date}
                  minDate={search.start_date? new Date(search.start_date) : ''}
                  className={styles.input_s}
                  peekNextMonth showMonthDropdown showYearDropdown
                  dropdownMode="select"
                  onChange={(e) => handleDateChange(e, 'end')}
                  placeholderText='dd/mm/yyyy' />
    		</div>
        </div>
        <div className={classes.div1}>
          {/*Search Button*/}
          <Button onClick={filterVendors} className={classes.button1} variant="contained">
            Search
          </Button>
        </div>

        {/* </div> */}
      </div>

      {/* Two Tables are Used according to path condition */}
      {path === 'revenue-report-vendor' ? 
      <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{backgroundColor: '#213d77'}}>
          <TableRow>
            <TableCell style={{color: "white"}} >S.No.</TableCell>
            <TableCell style={{color: "white"}} align="center">Vendor Name</TableCell>
            <TableCell style={{color: "white"}} align="center">Service Name</TableCell>
            <TableCell style={{color: "white"}} align="center">Service Group</TableCell>
            <TableCell style={{color: "white"}} align="center">Date</TableCell>
            <TableCell style={{color: "white"}} align="center">Amount</TableCell>
            <TableCell style={{color: "white"}} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow className={classes.table} key={row.vendor_name}>
              <TableCell component="th" scope="row">
                0{index+1}.
              </TableCell>
              <TableCell align="center">{/*row.userEmail*/row.vendor_name}</TableCell>
              <TableCell align="center">{row.service_name}</TableCell>
              <TableCell align="center">{/*row.userNumber*/row.service_group}</TableCell>
              <TableCell align="center">{/*row.service*/row.date}</TableCell>
              <TableCell align="center">{/*row.stationName*/row.amount}</TableCell>
              <TableCell align="center"><Link to={`revenue-report-vendor/${1}`} ><div onClick={(e) => console.log('clicked')}><img src={view} style={{width: 17}} /></div></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> :
      <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{backgroundColor: '#213d77'}}>
          <TableRow>
            <TableCell style={{color: "white"}} >S.No.</TableCell>
            <TableCell style={{color: "white"}} align="center">Service Name</TableCell>
            <TableCell style={{color: "white"}} align="center">Service Group</TableCell>
            <TableCell style={{color: "white"}} align="center">Vendor Name</TableCell>
            <TableCell style={{color: "white"}} align="center">Date</TableCell>
            <TableCell style={{color: "white"}} align="center">Amount</TableCell>
            {/* <TableCell align="center">Status</TableCell> */}
            <TableCell style={{color: "white"}} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow className={classes.table} key={row.vendor_name}>
              <TableCell component="th" scope="row">
                0{index+1}.
              </TableCell>
              <TableCell align="center">{row.service_name}</TableCell>
              <TableCell align="center">{/*row.userNumber*/row.service_group}</TableCell>
              <TableCell align="center">{/*row.userEmail*/row.vendor_name}</TableCell>
              <TableCell align="center">{/*row.service*/row.date}</TableCell>
              <TableCell align="center">{/*row.stationName*/row.amount}</TableCell>
              <TableCell align="center"><div onClick={(e) => toggleModal(e, 'details', index)}><img src={view} style={{width: 17}} /></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}

    {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Modal */}
			{<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Changed Vendor Status</strong>  </p>
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

			{/*Delete User*/}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete {arrayDetails.vendor_name} Vendor Service?</strong>  </p>

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

                 <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 15}}>
							 <button className={styles.modalButton} /*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
								 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={printer} />
								 <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
							 </button>
				 </div> 

		    <div className={styles.modalOuterDiv} style={{display: 'flex', paddingBottom: 20}}>
            <div className={styles.modal_left_box}>
                        <div className={styles.box1}>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Service Group</span><span style={{marginLeft: 70,marginRight: 25}}> - </span><span>{/*arrayDetails.userName*/arrayDetails.service_group}</span>
								</div>
								<div className={styles.modalDiv} style={{display: 'flex', display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Service Name</span><span style={{marginLeft: 72,marginRight: 25}}> - </span><span>{/*arrayDetails.userNumber*/arrayDetails.service_name}</span>
								</div>
								<div  className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Vendor Name</span><span style={{marginLeft: 73,marginRight: 25}}> - </span><span>{/*arrayDetails.userEmail*/arrayDetails.vendor_name}</span>
								</div><div  className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Date</span><span style={{marginLeft: 129,marginRight: 25}}> - </span><span>{arrayDetails.date}</span>
								</div>
                                <div className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Status</span><span style={{marginLeft: 119,marginRight: 25}}> - </span><span>Completed</span>
								</div>
                        </div>
                        </div>
                        
                        <div className={styles.box1}>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv+ " " + styles.modal_total_amount} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Total Order Amount</span><span style={{marginLeft: 53,marginRight: 25}}> - </span><span>{/*arrayDetails.userName*/arrayDetails.amount}</span>
								</div>
								<div className={styles.modalDiv + " " + styles.add_modal_margin} style={{display: 'flex', display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Vendor Amount</span><span style={{marginLeft: 77,marginRight: 25}}> - </span><span>{/*arrayDetails.userNumber*/arrayDetails.amount/4}</span>
								</div>
								<div  className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Commission Earned</span><span style={{marginLeft: 51,marginRight: 25}}> - </span><span>{/*arrayDetails.userEmail*/arrayDetails.amount/5}</span>
								</div>
                                
                                {/* Empty Divs */}
                                <div className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}></span><span style={{marginLeft: 52,marginRight: 25}}></span><span></span>
								</div>
                                <div className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}></span><span style={{marginLeft: 52,marginRight: 25}}></span><span></span>
								</div>

                        </div>
						</div>
                    </div>
                    </div>
				</Modal>

            <div className={styles.bottom_revenue}>
              <div className={styles.total_revenue}>Total Revenue </div>
              <div className={styles.total_revenue_value}>246K</div>
            </div>
      {/*rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      {rows.length > 0 && setPage()}
      </div>
      </div>*/}
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(RevenueReport);
// 1192