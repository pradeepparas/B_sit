import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from '../../constants/APIs';
// radio_label
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

// Images
import downArrow from '../StationManagement/downArrow.png';
import background1 from './images/background1.png';
import delete_logo from '../StationManagement/delete.svg';
import edit from '../StationManagement/edit.png';
import flag from '../StationManagement/flag.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from "@material-ui/core/Radio";
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

import {
  FormControlLabel,
  Checkbox,

  Icon
  } from '@material-ui/core';

// components
import styles from './ServicesManagement.module.css';
import * as actions from "../../redux/actions/SFMISActions";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { blue } from '@material-ui/core/colors';
import { setIsLoading } from "../../redux/actions/stationActions";
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
    // backgroundColor: theme.palette.background.paper,
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
    color: '#213D77',
    '&$checked': {
      color: '#213D77',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
      backgroundColor: '##213D77',


    },
    "& MuiTableCell-head": {
      color: 'white'
    }
  },
  ul1: {
    "& .Mui-selected:hover": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213d77'
    },
    "& .Mui-selected": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213d77'
    }
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
  textField1: {
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
    // color: '#b22222',
    // borderRadius: 8
  },
  div1: {
    marginRight: 10,
    ["@media (min-width: 681px) and (max-width: 1192px)"]: {
      width: 500,
      marginRight: 0,
    },
    ["@media (min-width: 280px) and (max-width:680px)"]: {
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
      backgroundColor: '#213d77',
      color: '#FFF'
    }
  },
  button2: {
    width: 120,
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
    "& .MuiOutlinedInput-adornedEnd": {
      'filter': 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
    '&:hover': {
      outline: 'none',
      //   borderColor: 'red'
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

function createData(userName, userNumber, userEmail, service, stationName, hours, date) {
  return { userName, userNumber, userEmail, service, stationName, hours, date };
}

const rows = [
  createData("Medicines", "Medico Chemist", "10 AM - 10 PM", "9875461234", "10", "Active", "Action"),
  createData("WheelChair", "WheelChair", "10 AM - 10 PM", "9875461234", "10", "Active", "Action"),
  createData("WheelChair", "WheelChair", "10 AM - 10 PM", "9875461234", "10", "Active", "Action"),
  createData("WheelChaire", "WheelChair", "10 AM - 10 PM", "9875461234", "10", "InActive", "Action"),
  createData("WheelChair", "WheelChair", "10 AM - 10 PM", "9875461234", "10", "InActive", "Action"),
];

export function ServicesManagement(props) {
  const [serviceCategory, setServiceCategory] = useState([])
  const [changeStatus, setChangeStatus] = useState(false)
  const [pageNo, setPageNo] = useState();

  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [arrayDetails, setArrayDetails] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
    deletedModal: false,
    changeModel: false
  });
  const classes = useStyles();
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


  // Handle Delete and Change Status function or Calling APIs for Changing Status
  const handleDeleteAndChangeStatus = async(e, data, type) => {
    // set delete modal false
    console.log(data)
    debugger
    let a = await props.setIsLoading(true);

    let config = {
      url: type == 'delete'? `${API.SFMISAPI}/${data._id}`: `${API.SFMISAPI}/change_status`,
      method: type == 'delete'? "DELETE": 'PUT',
      headers: {
        // 'Accept-Language': 'hi',
        "accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }

    if(type == 'status'){
      let value = {
          "status": changeStatus,
          "id": data._id
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
        props.getSFMISServicesByParams(pageNo, props.limit)
      } else {
        debugger
        toast.error(response.data.message)
      }
    }).catch(err => {
      toast.error(err.response.data.message)
      props.setIsLoading(false)
    })

  }

  useEffect(() => {
    props.getCategoryServices()
    props.getSFMISServicesByParams(1, 10)
  }, [])

  useEffect(() => {

    if (props.docs) {
      // console.log("",props.vendorDocs)
      setRows(props.docs)
      debugger
    }
  }, [props.docs])

  // Getting Vendors List
  useEffect(() => {
    // debugger
  }, [])

// Service Category for drop down
  useEffect(() => {
    debugger
    if(props.serviceCategory){
      setServiceCategory(props.serviceCategory)
    }
  }, [props.serviceCategory])


  // Search Field Value
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal = (e, data, row) => {
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
    // setState({...state, packageName:data.packageName, id: data._id, })
  }
  // close modal
  const toggleModalClose = () => {
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

  // Change Service Category Status
  const handleChangeChargeable = (event, type) => {
    if (type == 'Yes') {
      setChangeStatus(true)
    } else {
      setChangeStatus(false)
    }
  };

  // Used for Pagination
  const setPage = () => {
    let total = Math.ceil(rows.length / 10)
    return (
      <Pagination
        onChange={handleChangePage}
        count={total}
        shape="rounded"
        classes={{ ul: classes.ul1 }}
        size='small' />
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>SFMIS Services</div>
        <Link to={`SFMIS-services/add`}>
        <Button style={{ backgroundColor: '#213D77', color: '#FFFFFF', borderRadius: '16px' }} className={classes.button3} variant="contained">
          + Add SFMIS Services
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
                value={values.weight}
                onChange={handleChange('weight')}
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


            <div className={styles.selectDiv1}>
              <select className={styles.select1} name="slct" id="slct">
                <option selected disabled>Service Category</option>
                {serviceCategory.length > 0 ? serviceCategory.map(data =>
                <option key={data._id} value={data._id}>{data.category_name}</option>
                ) : null}
              </select>
            </div>

            <Button className={classes.button1} variant="contained">
              Search
          </Button>
          </div>


        </div>

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: '#213D77' }}>
              <TableRow>
                {/* <div className={classes.btn}/> */}
                <TableCell style={{ color: '#FFFFFF' }}>S.No.</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Service Category</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">display Name</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Operational Hours</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Service Booking Phone Number</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Items Offered</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Status</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Action</TableCell>
                {/* <TableCell align="center">Status</TableCell> */}
                {/* <TableCell align="center">Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow className={classes.table} key={row.display_name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.service_category?row.service_category.category_name: '-'}</TableCell>
                  <TableCell align="center">{row.display_name}</TableCell>
                  <TableCell align="center">{row.from_time} - {row.end_time}</TableCell>
                  <TableCell align="center">{row.service_booking_mobile}</TableCell>
                  <TableCell align="center">{row.items}</TableCell>
                  {/* <TableCell align="center">{row.hours}</TableCell> */}
                  <TableCell style={{color: row.status? 'green': 'red'}} align="center">{row.status? "active": "In-active"}</TableCell>
                  <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                        <a><div onClick={(e) => toggleModal(e, 'details', row)}>View Details</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'status', row)}>Change Status</div></a>
                        <Link to={`/SFMIS-services/${row._id}`}><a><div onClick={(e) => toggleModal(e, 'details', row)}>Edit Details</div></a></Link>
                        <Link to={`/SFMIS-services/add-service-item/${row._id}`}><div onClick={(e) => toggleModal(e, 'details', row)}>Manage Item</div></Link>
                        <a><div onClick={(e) => toggleModal(e, 'delete', row)}>Delete Details</div></a>

                      </div>
                    </div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center' }}>No Data Found</div>}
      </div>

      {/* After Delete Modal */}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
        <ModalBody modalClassName={styles.modalContainer}>
          <img style={{ width: 60 }} src={flag} />
          <p style={{ marginTop: 20 }}><strong style={{ fontSize: 20 }}>Successfully Deleted Services</strong>  </p>
        </ModalBody>
        <ModalFooter className={styles.deleteFooter}>
          <Button
            style={{ width: 100 }}
            variant="contained"
            color="black"
            className={classes.button1}
            onClick={toggleModalClose}
          >
            OK
						</Button>
        </ModalFooter>
      </Modal>}

      {/*Delete SFMIS Service*/}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
        <ModalBody modalClassName={styles.modalContainer}>
          <img style={{ width: 60 }} src={delete_logo} />
          <p style={{ marginTop: 20 }}><strong style={{ fontSize: 20 }}>Are you sure you want to delete {arrayDetails.display_name} SFMIS Service?</strong>  </p>

        </ModalBody>
        <ModalFooter className={styles.deleteFooter}>
          <Button
            style={{ width: 100 }}
            variant="contained"
            color="black"
            className={classes.button2}
            onClick={toggleModalClose}
          >
            NO
						</Button>
          <Button
            style={{ width: 100 }}
            variant="contained"
            className={classes.button1}
            onClick={(e) => { handleDeleteAndChangeStatus(e, arrayDetails, 'delete') }}
          >
            YES
						</Button>
        </ModalFooter>
      </Modal>}


      <Modal className={styles.modalContainer} contentClassName={styles.customClass}
        isOpen={modal.details} toggle={toggleModalClose} centered={true}>
        <CancelIcon
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            color: "rgb(33 61 119)",
            borderRadius: 55,
            position: "absolute",
            top: "-14",
            right: "-16",
            cursor: "pointer",
          }}
          onClick={toggleModalClose}
        />
        <div>
          <Row>
            <Col md="6" className={styles.left}>
              <img src={background1} style={{ padding: '184px', float: 'none', width: '119%' }} />




            </Col>
            <Col md="6" className={styles.right}>

              <div className={styles.liti}>Display Details</div>
              <div className={styles.modalOuterDiv} style={{ display: 'flex' }}>

                <div className={styles.box1}>
                  <div className={styles.modalBox} >
                    <div className={styles.modalDiv} className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                      <span className={styles.textModal}>Display Name</span><span style={{ marginLeft: 103, marginRight: 25 }}> - </span>{arrayDetails.display_name}
                    </div>
                    <div className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                      <span className={styles.textModal}>Service Type</span><span style={{ marginLeft: 111, marginRight: 25 }}> - </span>{arrayDetails.service_type}
                    </div>
                    <div className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                      <span className={styles.textModal}>Service Category</span><span style={{ marginLeft: 83, marginRight: 25 }}> - </span>{arrayDetails.service_category?arrayDetails.service_category.category_name: '-'}


                    </div>
                    <div className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                      <span className={styles.textModal}>Service Booking Number</span><span style={{ marginLeft: 33, marginRight: 25 }}> - </span>{arrayDetails.service_booking_mobile}
                    </div>
                    <div className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                      <span className={styles.textModal}>Chargeable</span><span style={{ marginLeft: 117, marginRight: 25 }}> - </span>Yes{ }
                    </div>

                    <div className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                      <span className={styles.textModal}></span><span style={{ marginLeft: 90, marginRight: 25 }}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.liti}>Operational Duration</div>
              <div className={styles.box1}>
                <div className={styles.modalBox} >
                  <div className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                    <span className={styles.textModal}>Operational Hours</span><span style={{ marginLeft: 82, marginRight: 25 }}> - </span>{arrayDetails.from_time} - {arrayDetails.end_time}
							</div><div className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                    <span className={styles.textModal}>Delivery Preparation<br /> Duration</span><span style={{ marginLeft: 143, marginRight: 25 }}> - </span>{arrayDetails.preparation_duration}
							</div><div className={styles.modalDiv} style={{ flexDirection: 'row' }}>

                    <span className={styles.textModal}>Maximum Use Duration</span><span style={{ marginLeft: 51, marginRight: 25 }}> - </span>{arrayDetails.max_use_duration}
							</div>
              <div className={styles.textfield}>
            <FormControlLabel
              className={classes.label}
              control={<GreenCheckbox checked={true}  name="checkedG" />}
              label={
                <span
                  className={styles.checkBoxLabel}
                  style={{ color:"#213D77"}}
                >
                    Is Active
                </span>
              }
            />
            </div>
            <div className={styles.textfield}>
            <FormControlLabel
              className={classes.label}
              control={<GreenCheckbox checked={true}  name="checkedG" />}
              label={
                <span
                  className={styles.checkBoxLabel}
                  style={{ color:"#213D77"}}
                >
                    Service applicable for cancellation
                </span>
              }
            />
            </div>

                  <div className={styles.modalDiv} className={styles.modalDiv} style={{ flexDirection: 'row' }}>
                    <span className={styles.textModal}></span><span style={{ marginLeft: 80, marginRight: 25 }}> </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

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


      {rows.length > 0 && <div className={styles.pageDiv}>
        <div style={{ marginTop: 40 }}>
          {rows.length > 0 && setPage()}
        </div>
      </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  // debugger
  return {
    docs: state.SFMIS.sfmisDocs,
    serviceCategory: state.SFMIS.serviceCategory,
    total: state.SFMIS.sfmisTotal,
    limit: state.SFMIS.sfmisLimit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSFMISServicesByParams: (pageNo, size, params) => {
      dispatch(actions.getSFMISServicesByParams(pageNo, size, params))
    },
    getCategoryServices: () => {
      dispatch(actions.getCategoryServices())
    },
    setIsLoading: (value) =>
	    dispatch(setIsLoading(value))
    // getVendorDataByParams: (pageNo, size, params) => {
    //   dispatch(actions.getVendorDataByParams(pageNo, size, params))
    // },

  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ServicesManagement);
