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
import { Link, useHistory, useParams } from "react-router-dom";

// Images
import downArrow from '../../../StationManagement/downArrow.png';
import delete_logo from '../../../StationManagement/delete.svg';
import edit from '../../../StationManagement/edit.png';
import flag from '../../../StationManagement/flag.svg';
import vendor_image from '../vendor_image.png';
import view from './view.svg';
import food_image from './food_image.jpg';

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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// components
// import { getStationData } from "../../../redux/actions/stationActions";
import styles from './ItemDetails.module.css';
import * as actions from "../../../../redux/actions/SFMISActions";
// import * as actions from "../../../redux/actions/vendorActions";
import { setIsLoading } from '../../../../redux/actions/stationActions';
import * as API from '../../../../constants/APIs';
// import styled from 'styled-components';

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
    ["@media (min-width: 280px) and (max-width: 600px)"]: {
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
    ["@media (min-width: 280px) and (max-width: 600px)"]: {
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
		["@media (min-width: 681px) and (max-width: 600px)"]:{
			width: 500,
			marginRight: 0,
		},
		["@media (min-width: 280px) and (max-width:600px)"]:{
			width: '91%',
			marginRight: 0,
		}
	},
  button1: {
		width: 100,
    ["@media (min-width: 280px) and (max-width: 600px)"]: {
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
		["@media (min-width: 280px) and (max-width: 600px)"]: {
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

// function createData(vendor_name, item_name, description, price, delivery_charges, status) {
//   return { vendor_name, item_name, description, price, delivery_charges, status };
// }

// const rows = [
//   createData("John Doe", "Combiflame", "Demo Description", "110","0.0", "Approved"),
//   createData("Jack", "Crocin", "Demo Description", "200","0.0", "Disapproved"),
//   createData("John Doe", "Vicks", "Demo Description", "300","0.0", "New"),
//   createData("Jack", "Vicks", "Demo Description", "100","0.0", "New"),
//   createData("John Doe", "Combiflame", "Demo Description", "300","0.0", "Approved"),
// ];

export function ItemDetails(props) {
  const { item_id } = useParams();
  const history= useHistory();
  const [pageNo, setPageNo] = useState();
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  });
  const [check, setCheck] = useState(false)
  const [dropDownDetails, setDropDownDetails] = useState([]);
	const [vendorDropDown, setVendorDropDown] = useState([]);
	const [categoryDropDown, setCategoryDropDown] = useState([])
  const [rows, setRows] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [arrayDetails, setArrayDetails] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false
  });
	const [search, setSearch] = useState({
		name: "",
    status: "",
    type: "2"
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

  // Calling Items Details APIs By Params
  useEffect(() => {
    props.getItemsByParams(1, 10, item_id, search)
  }, [])

  // Get Items Details from Redux
  useEffect(() => {
    debugger
    if(props.itemsDocs){
      setRows(props.itemsDocs)
    }
  }, [props.itemsDocs])


  // Handle Checkbox
  const handleCheckbox = async(e) => {
    let data = {
      item_id: arrayDetails._id,
      item_status: e.target.checked? "APPROVED": "DISAPPROVED"
    }
    let value = e.target.checked? true: false;
    debugger
    let a = await props.setIsLoading(true);
    
    axios({
      url: `${API.ItemsAPI}/approve_reject`,
      method: "PUT",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      data: data
    }).then(response => {
      if(response.data.success){
        toast.success(response.data.message);
        setCheck(value);
        props.getItemsByParams(1, 10, item_id, search)
        props.setIsLoading(false)
      }
    }).catch(err => {
      console.log(err.response)
      debugger
      
      toast.error(err.response.data.message);
      props.setIsLoading(false)
    })
    
  }

  // Search Field Value
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal = async(e,data, row)=>{
    debugger
    if(data === 'details'){
      let a = await props.setIsLoading(true);
      axios({
        url: `${API.ItemsAPI}/${row._id}`,
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'), 
        }
      }).then(response => {
        if(response.data.success){
          debugger
          setModal(true);
          setCheck(response.data.items[0].item_status === "APPROVED"? true: false)
          setArrayDetails(response.data.items[0]);
          props.setIsLoading(false)
          if(data == 'delete'){
            setModal({
              deleteModal: true
            })
          } else {

            setModal({
              details: true
            })
    }
        }
      }).catch(err => {
        setArrayDetails([]);
        props.setIsLoading(false);
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

    //  used for pagination
    const handleChangePage = (event, page) => {
      setPageNo(page)
      // Items Id gives the particular Item details for Given Id
      props.getItemsByParams(page, props.limit, item_id, search)
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

	 // Search filter function
	 const filterItems = () => {
		 console.log(search)
		 debugger
		 props.getItemsByParams(pageNo, props.limit, item_id, search)
	 }

	// Handle Inputs for Seaching
	const handleInputs = (event) => {
    debugger
		setSearch({
			...search,
			[event.target.name]: event.target.value
		})
	}

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Item Details</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/vendors-service')} className={classes.back_button} variant="contained">
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
			<select className={styles.select1} name="status" /*value={search.station_id}*/ onChange={handleInputs}>
				<option selected disabled>Status</option>
        {/* NEW', 'APPROVED', 'DISAPPROVED */}
                <option value={"APPROVED"}>Approved</option>
                <option value={"DISAPPROVED"}>Disapproved</option>
                <option value={"NEW"}>New</option>
				{/*dropDownDetails.length > 0 && dropDownDetails.map(data =>
				<option key={data._id} value={data._id}>{data.station_name}</option>
                )*/}
			</select>
		</div>

        </div>
        <div className={classes.div1}>
          {/*Search Button*/}
          <Button onClick={filterItems} className={classes.button1} variant="contained">
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
            <TableCell style={{color: "white"}} align="center">Image</TableCell>
            <TableCell style={{color: "white"}} align="center">Item Name</TableCell>
            <TableCell style={{color: "white"}} align="center">Description</TableCell>
            <TableCell style={{color: "white"}} align="center">Price</TableCell>
            <TableCell style={{color: "white"}} align="center">Delivery Charges</TableCell>
						<TableCell style={{color: "white"}} align="center">Status</TableCell>
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
              <TableCell align="center"><img style={{width: 35}} src={food_image} /></TableCell>
              <TableCell align="center">{/*row.userNumber*/row.name}</TableCell>
              <TableCell align="center">{/*row.userEmail*/row.description}</TableCell>
              <TableCell align="center">{/*row.service*/row.price}</TableCell>
              <TableCell align="center">{/*row.stationName*/row.delivery_charge}</TableCell>
							<TableCell style={{color: row.item_status == 'APPROVED'? '#5ac67e': row.item_status == 'NEW'? '#213d77': '#cf7474'}} align="center">{/*row.service*/row.item_status}</TableCell>
              <TableCell align="center"><div onClick={(e) => toggleModal(e, 'details', row)}><img src={view} style={{width: 17}} /></div></TableCell>
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
              onClick={(e) => { console.log("data")/*handleVendorStatus(e , arrayDetails)*/ }}
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

		    <div className={styles.modalOuterDiv} style={{display: 'flex', paddingBottom: 20}}>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className={styles.image_box}>
                <img src={food_image} />
                </div>
                </div>

            <div className={styles.modal_left_box} style={{display: 'flex', flexDirection: 'column'}}>
						<div className={styles.box1}>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Item Name</span><span style={{marginLeft: 70,marginRight: 25}}> - </span><span>{/*arrayDetails.userName*/arrayDetails.name}</span>
								</div>
								<div className={styles.modalDiv} style={{display: 'flex', display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Description</span><span style={{marginLeft: 67,marginRight: 25}}> - </span><span>{/*arrayDetails.userNumber*/arrayDetails.description}</span>
								</div>
								<div  className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Price</span><span style={{marginLeft: 108,marginRight: 25}}> - </span><span>₹ {/*arrayDetails.userEmail*/arrayDetails.price}</span>
								</div><div  className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Delivery Charges</span><span style={{marginLeft: 32,marginRight: 25}}> - </span><span>₹ {arrayDetails.delivery_charge}</span>
								</div>
                                <div className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Display Name</span><span style={{marginLeft: 52,marginRight: 25}}> - </span><span>{arrayDetails.service?arrayDetails.service.service_name: "-"}</span>
								</div>
                                <div className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row'}}>
								<span className={styles.textModal}>Vendor Name</span><span style={{marginLeft: 52,marginRight: 25}}> - </span><span>{arrayDetails.vendor?arrayDetails.vendor.vendor_name: "-"}</span>
								</div>

                                <div className={styles.modalDiv} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <span style={{marginRight: 20}} className={styles.textModal} >Approve</span><label className={styles.switch}>
                                <input type="checkbox" onChange={handleCheckbox} checked={check} />
                                <span className={styles.slider + " " + styles.round}></span>
                                </label>
                                </div>

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
    itemsDocs: state.SFMIS.itemsDocs,
    limit: state.SFMIS.itemsLimit
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
    getItemsByParams: (page, limit, service_id, params) =>
      dispatch(actions.getItemsByParams(page, limit, service_id, params)),
	// 	getStationData: () => {
    //   dispatch(getStationData())
    // },
    // getVendorDataByParams: (pageNo, size, params) => {
    //   dispatch(actions.getVendorDataByParams(pageNo, size, params))
    // },
	// 	getVendorDetails: (id) =>
	// 		dispatch(actions.getVendorDetails(id)),
		setIsLoading: (loading) =>
	    dispatch(setIsLoading(loading))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ItemDetails);