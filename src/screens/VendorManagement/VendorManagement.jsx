import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
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
import flag from '../VendorManagement/flag.svg';
import printing from '../VendorManagement/printing.svg'


// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
import Radio from "@material-ui/core/Radio";
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

// components
import styles from './VendorManagement.module.css';
// import styled from 'styled-components';
import * as actions from "../../redux/actions/vendorActions";
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
	deletebutton1: {
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
    width: 205,
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
  button3: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',

    },
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF',


    },
    width: 135,
    marginBottom: -80,

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
    border:'1px solid #213D77',
    color: '#213D77',
    backgroundColor: '#FFFFFF',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#213D77'
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
	const [changeStatus, setChangeStatus] = useState(false)
	const [rows, setRows] = useState([]);
  const [pageNo, setPageNo] = useState();
	const [showModal, setShowModal] = useState(false);
	const [arrayDetails, setArrayDetails] = useState([]);
  const [role, setRoleList] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false,
		changeModel: false
  });
  const classes = useStyles();
  const [search, setSearch] = useState({
    vendor_name: "",
    name: "",
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

  // Getting Vendors By Parameters
    useEffect(() => {
			props.getVendorManagement()
      props.getVendorManagementByParams(1, 10, search)
      debugger
    }, [])

		useEffect(() => {
			if(props.vendorData){
				setDropDownDetails(props.vendorData)
			}
      debugger
		}, [props.vendorData])

		// Change Service Category Status
		const handleChangeChargeable = (event, type) => {
			if (type == 'Yes') {
				setChangeStatus(true)
			} else {
				setChangeStatus(false)
			}
		};

		useEffect(() => {
			console.log("Vendor", props.vendorDocs)
			if(props.vendorDocs){
				setRows(props.vendorDocs)
				debugger
			}
		}, [props.vendorDocs])

   // Changing Date fields
		const handleDateChange = (date, type) => {
      console.log(date)
      // debugger
      if(type == 'start') {
        setSearch({
          ...search,
          start_date: moment(date).format("MM-DD-YYYY")
        })
      } else {
        setSearch({
          ...search,
          end_date: moment(date).format("MM-DD-YYYY")
        })
      }
    }

  const handleChangePage = (event, page) => {
    setPageNo(page)
    props.getVendorManagementByParams(page, props.limit, search)
	}

  // Used for Pagination
  const setPage = () => {
		let total = Math.ceil(props.total / props.limit)
		return (

        <Pagination
          onChange={handleChangePage}
    			count={total}
          shape="rounded"
          classes={{ ul: classes.ul1 }}
          size='small'/>
		)

	}

  // Search field Change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, row)=>{
  	// setModal(true);
    console.log(row)
    debugger
		setChangeStatus(row.status);
    setArrayDetails(row);

		if (data == 'delete') {
      setModal({
        deleteModal: true
      })
    } if(data == 'details'){
      setModal({
        details: true
      })
    }

    if(data == 'status'){
      setModal({
        changeModel: true
      })
    }
    }
    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false
      })
    }

		// Handle Delete and Change Status function or Calling APIs for Changing Status
		const handleDeleteAndChangeStatus = async(e, data, type) => {
			// set delete modal false
			console.log(data)
			debugger
			let a = await props.setIsLoading(true);

			let config = {
				url: type == 'delete'? `${API.VendorAPI}/${data.vendor_id}`: `${API.VendorAPI}/change_status/${data.vendor_id}`,
				method: type == 'delete'? "DELETE": 'PUT',
				headers: {
					// 'Accept-Language': 'hi',
					"accept": "application/json",
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				}
			}

			if(type == 'status'){
				let value = {
						"block_status": changeStatus,
						"user_id": data.vendor_id
				}
				config.data = value
			}

			console.log(config)
			debugger

			axios(config).then((response) => {
				if(response.data.success){
					debugger
					// toast.success(response.data.message)
					if(type == 'delete'){
						setModal({
							deleteModal: false,
							deletedModal: true
						})
					} else {
						toast.success(response.data.message)
						setModal({
							...modal,
							changeModel: false
						})
					}

					props.setIsLoading(false)
					props.getVendorManagementByParams(pageNo, props.limit, search)
				} else {
					debugger
					toast.error(response.data.message)
				}
			}).catch(err => {
				toast.error(err.response.data.message)
				props.setIsLoading(false)
			})

		}

		const editUser=(e, i,  data)=>{
			console.log('edit')
		}


    const searchUsers = () => {
      console.log(search)
      debugger
      props.getVendorManagementByParams(1, 10, search)
    }

    const handleInputs = (event) => {
      setSearch({
        ...search,
        [event.target.name]: event.target.value
      })
    }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}> Vendors</div>
        <Link to={`/vendor-management/add`}>
        <Button className={classes.button3}  variant="contained">
          +Add vendors
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
					<select className={styles.select1} name="vendor_name" /*value={search.station_id}*/ onChange={handleInputs}>
						<option selected disabled>Vendor Name</option>
						{dropDownDetails.length > 0 && dropDownDetails.map(data =>
							<option key={data._id} value={data.name}>{data.name}</option>
						 )}
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
                   placeholderText='mm/dd/yyyy' />
    		</div>

        <div className={classes.container1}>
          <label style={{width: 45}} className={styles.dateLabel}>To Date</label>
                <DatePicker
                  autoComplete="off"
                  name="end_date"
                  value={search.end_date}
                  minDate={search.start_date? new Date(search.start_date) : ''}
                  className={styles.input_s}
                  peekNextMonth showMonthDropdown showYearDropdown
                  dropdownMode="select"
                  onChange={(e) => handleDateChange(e, 'end')}
                  placeholderText='mm/dd/yyyy' />
    		</div>
        
        
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
            <TableCell style={{color:'#FFFFFF'}} align="center">Vendor Name</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Phone Number</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Email</TableCell>
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

              {/* <TableCell align="center">{row.station_id?row.station_id.station_name: '-'}</TableCell> */}
              <TableCell align="center">{moment(row.createdAt).format("DD-MM-YYYY")}</TableCell>
              <TableCell style={{color: row.status? 'green':'red'}} align="center">{row.status?"active": "In-active"}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', row)}>View Details</div></a>
                  <a><div onClick={(e) => toggleModal(e, 'status', row)}>Change Status</div></a>
                  <Link to={`/vendor-management/${row._id}`}><div onClick={(e) =>editUser(e, index, row)}>Edit Details</div></Link>
                  <a><div onClick={(e) => toggleModal(e, 'delete', row)}>Delete vendor</div></a>
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
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted Vendor</strong>  </p>
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

			{/*Delete Vendor*/}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete {arrayDetails.userName} Vendor?</strong>  </p>

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
							onClick={(e) => { handleDeleteAndChangeStatus(e, arrayDetails, 'delete') }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>}

          {/* Modal for view Details */}
				{<Modal className={styles.modalContainer3} contentClassName={styles.customClass}
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
         {('Vendor', 'update') &&<Link to={`vendor-management/${arrayDetails._id}`}><button onClick={(e) =>editUser(e, arrayDetails._id, arrayDetails)} className={styles.modalButton}>
				 <img className={styles.modalImage} style={{width: 21,height: 21, marginTop:-36}} src={edit} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Edit Details</small>
				 </button></Link>}
         <button className={styles.modalButton} /*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
				 <img className={styles.modalImage} style={{width: 25,height: 30, marginTop: -36}} src={printing} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
				 </button>
				 </div>
         <div className={styles.modalOuterDiv} style={{display: 'flex'}}>
         <div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>View Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Vendor Name</span><span style={{marginLeft: 70,marginRight: 25}}> - </span>{arrayDetails.name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Mobile Number</span><span style={{marginLeft: 59,marginRight: 25}}> - </span>{arrayDetails.mobile}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Email</span><span style={{marginLeft: 122,marginRight:25}}> - </span>{arrayDetails.email}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Warehouse Address</span><span style={{marginLeft: 33,marginRight: 25}}>  - </span>{arrayDetails.warehouse_address}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Delivery Station</span><span style={{marginLeft: 59,marginRight: 25}}> - </span>{arrayDetails.delivery_station}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Is Active</span><span style={{marginLeft: 106,marginRight: 25}}> - </span>{arrayDetails.status?"active": "In-active"}
								</div>
								</div>
						</div>
            <div className={styles.box2} style={{}}    >
						<div style={{fontSize: 14, marginLeft: 12, }} className={styles.title}>Commission Details</div>
							<div className={styles.modalBox} style={{height:'90%'}}   /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Minimum Commission(₹)</span><span style={{marginLeft: 40,marginRight: 25}}> - </span>{arrayDetails.mini_commission}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Commission in Percent(%)</span><span style={{marginLeft: 37,marginRight: 25}}> - </span>{arrayDetails.percentage_commission}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Maximum Commission(₹)</span><span style={{marginLeft: 39,marginRight: 25}}> - </span>{arrayDetails.max_commission}
							</div>
            
              <div>
							</div>
							<div></div>
              <div></div>
              <div></div>

					
							</div>
							</div>
						</div>
            <div className={styles.modalOuterDiv1}>
            <div className={styles.box3}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Bank Address</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Account Holder Name</span><span style={{marginLeft: 38,marginRight: 25}}> - </span>{arrayDetails.holder_name}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Account Number</span><span style={{marginLeft: 71,marginRight: 25}}> - </span>{arrayDetails.account_number}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>IFSC Code</span><span style={{marginLeft: 116,marginRight: 25}}> - </span>{arrayDetails.ifsc_code}
								</div>
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Bank Name</span><span style={{marginLeft: 106,marginRight: 25}}> - </span>{arrayDetails.bank_name}
								</div>
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Branch Address</span><span style={{marginLeft: 80,marginRight: 25}}> - </span>{arrayDetails.branch_address}
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
						{<Modal className={styles.Container2} contentClassName={styles.changeStatusClass}
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
		         <div className={styles.modalBody}>
		                <label style={{
		                    color: '#213D77',
		                    fontWeight:"bold",
		                    marginBottom: 20,
		                    fontSize: 17,
		                    display: 'flex',
		                    justifyContent: 'center'
		                  }}>
		                    Change Status</label>
		                  <div style={{display: 'flex', justifyContent: 'space-evenly'  }}>
		                  <div>
		                  <GreenRadio
		                    checked={changeStatus}
		                    onChange={(e) => handleChangeChargeable(e,"Yes")}
		                    // value="c"
		                    name="radio-button-demo"
		                    inputProps={{ 'aria-label': 'C' }}
		                  />
		                  <label className={classes.radio_label} style={{color: '#10AC44', fontWeight: '700'}}>Active</label>
		                  </div>

		                <div>
		                <RedRadio
		                    checked={!changeStatus}
		                    onChange={(e) => handleChangeChargeable(e, "No")}
		                    // value="c"
		                    name="radio-button-demo"
		                    inputProps={{ 'aria-label': 'C' }}
		                  />
		                  <label style={{color: '#b22222', fontWeight: '700', margin: 0}}>Inactive</label>
		                  </div>
		                </div>
		              </div>
								<ModalFooter className={styles.footer1}>
									<Button
			              style={{width: 100}}
										variant="contained"
			              color="black"
			              className={classes.deletebutton1}
										onClick={(e) => handleDeleteAndChangeStatus(e, arrayDetails, 'status')}
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
	// debugger
	return {
		vendorDocs: state.Vendors.vendorDocs,
    total: state.Vendors.vendorTotal,
    limit: state.Vendors.vendorLimit,
		vendorData: state.Vendors.vendorData
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    setIsLoading: (value) =>
      dispatch(setIsLoading(value)),

    getVendorManagementByParams: (pageNo, size, params) =>
			dispatch(actions.getVendorManagementByParams(pageNo, size, params)),

		getVendorManagement: () =>
			dispatch(actions.getVendorManagement()),
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(UserManagement);
// deletebutton1