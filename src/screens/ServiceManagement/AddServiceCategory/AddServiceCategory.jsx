import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useHistory, useParams } from 'react-router-dom';
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

// components saveButton APIs
import styles from './AdminAddRole.module.css';

// import logo from './logo.png';
import background1 from './background1.png';
import image_icon from './image_icon.png';
import flag from '../../StationManagement/flag.svg';
import downArrow from './downArrow.png';
// import AutoPassword from './images/auto-password.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  FormControlLabel,
  Checkbox,
  Button,
  Icon
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { toast } from 'react-toastify';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
// import SetPage from '@material-ui/lab/SetPage';
const GreenCheckbox = withStyles({
  root: {
    color: '#213D77',
    '&$checked': {
      color: '#213D77',
    },
  },
  checked: {},
})((props) => <Checkbox color="#213D77" {...props} />);


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
    margin: "auto",
    marginTop: "-11px",
    display: "flex",
    marginRight: "165px",
    ["@media (min-width: 540px) and (max-width: 720px)"]: {
      marginTop:'-28px',
      marginRight: '296px'
      
    },
  },
  textField1: {
    outline: 'none',
    width: 250,
    height: 40,
    borderRadius: 30,
    ["@media (min-width: 360px) and (max-width: 640px)"]: {
      width: '40%'
    },
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
  button1: {
    borderRadius: 16,
    border: '1px solid #213D77',
    backgroundColor: '#EFEFEF',
    color: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#EFEFEF',
      // ["@media (min-width: 280px) and (max-width: 899px)"]: {
      //   width: '80%',
      //   marginLeft: '32px',
      // },
    }
  },

  saveButton1: {
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    height: 40,
    width: 100,
    position: 'absolute',
    margin: 'inherit',
    marginLeft: '264px',

    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
    ["@media (min-width: 540px) and (max-width: 720px)"]: {
      marginLeft: '271px',
    },
  },
  title1: {
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
    height: 30,
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#FFFFFF',
    color: '#213D77',
    border: '1px solid #213D77',
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
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    color: 'white',
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
  table: {
    "&:last-child td": {
      borderBottom: 0,
    },
    "&:last-child th": {
      borderBottom: 0,
    },
    overflowX: 'scroll',
  },
  textField: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%'
    }
  },
  div1: {
    marginRight: 100,
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '91%',
      marginRight: 0,
    }
  },
  button3: {
    ["@media (min-width: 360px) and (max-width: 640px)"]: {
      width: '120px',
     marginLeft: '145px',
     marginTop: '-57px',
    },
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    height: 40,
    marginRight: 611,
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF',

    },
    width: 125
  },
  date1: {
    "& .MuiOutlinedInput-adornedEnd": {
      'filter': 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 170,
  },
}));

export function AddUser(props) {
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [servicesType, setServicesType] = useState([])
  const [role, setRole] = useState([]);
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { user_id } = useParams();
  const [pageNo, setPageNo] = useState();
  const [rows, setRows] = useState([]);
  const [state, setState] = useState({
    category_name: "",
    service_type: "",
    category_icon: "",
  });
  const [search, setSearch] = useState({
   
   
  })
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  })
  const [errors, setErros] = useState({})
  const [arrayDetails, setArrayDetails] = useState([]);


  const toggleModal = (e, data, i) => {
    // setModal(true);
    // rows[i].id = i;
    // setArrayDetails(rows[i]);
    // if (data == 'delete') {
    //   setModal({
    //     deleteModal: true
    //   })
    // } else {

    //   setModal({
    //     details: true
    //   })
    // }
    // setState({...state, packageName:data.packageName, id: data._id, })
  }
  // close modal
  const toggleModalClose = () => {
    setModal(false)
    props.setIsSubmitted(false)
    history.push('/Services-management')
  }
  const editUser = (e, i, data) => {
    data.id = i
    props.setUserData(data)
  }


  // 
  useEffect(() => {
    if (props.isEdit) {
      console.log(props.user)
      
      setState(props.user)
      // set value in startDate

      //funciton
    }
  }, [])
  // Changing Date fields
  const handleDateChange = (data, type) => {
    console.log(data)
    // 
    if (type == 'start') {
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

  const searchUsers = () => {
    debugger
    console.log(search)
    if(!validateForm()){
      return
    }
    else{
      // save logic
    }
    
    //props.getUserDataByParams(1, 10, search)
  }

  //  validate form
   const validateForm =()=>{
     debugger
     var isValid=true
     if(state.category_name.trim()==''){
       errors.category_name="Service category Name is required"; isValid=false;
     }
     else if(state.service_type.trim()==''){
      errors.service_type="Service type is required";isValid=false;
     }
     else if(state.category_icon.trim()==''){
      errors.service_type="Please upload category icon";isValid=false;
     }
     setErros({...errors, errors })
     return isValid
   }


  //  Getting dropdown details  
  useEffect(() => {
    if (props.userDetails) {
      setDropDownDetails(props.userDetails)
      console.log(props.userDetails)
      // 
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
    }).then((response) => {
      setRole(response.data.role)
      props.setIsLoading(false)
    })

    if (props.isEdit || user_id != 'add') {
      props.setIsLoading(true)
      axios({
        url: `${API.GetUserAPI}/${user_id}`,
        headers: {
          //    'Accept-Language': 'hi', 
          "accept": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      }).then(response => {
        if (response.data.success) {
          console.log(response.data.user)
          
          // setState(data)
          setState({
            _id: response.data.user._id,
            userName: response.data.user.name,
            userNumber: response.data.user.mobile,
            userAddress: response.data.user.address,
            userPassword: response.data.user.password ? response.data.user.password : '',
            role: response.data.user.role_id,
            // stationName: response.data.user.station_id,
            userEmail: response.data.user.email ? response.data.user.email : '',
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
    if (user_id === 'add') {
      
      state.date = moment(new Date()).format("DD-MM-YYYY")
      console.log(state)
      
      props.addUserDetails(state)
      // 
    } else {
      props.EditUserDetails(state)
    }
  }

  // Open Modal for Add User Successfully and Update User Successfully
  useEffect(() => {
    
    if (props.isSubmitted) {
      setModal(true);
      if (user_id == 'add') {
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
      adminPassword: randomstring
    })
    console.log(randomstring)
    
  }

 

  const handleInputs = (event) => {
    console.log(event.target.name, event.target.value)
    // 

    setState({
      ...state,
      [event.target.name]: (event.target.name == 'userPassword'
        || event.target.name == 'userNumber') ?
        event.target.value.trim() : event.target.value
    })
    // 
    setErros({ errors, [event.target.name]: "" })
  }
  // function for adding user or Setting IsEdit False
  const addRole = () => {
    props.setIsEditFalse(false)
  }

  // Password visibility on off
  const handleClickShowPassword = () => {
    console.log(values.password);
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
  


    event.preventDefault();
  };
  const setPage = () => {
    
    let total = Math.ceil(90 / 10)
    return (
      <Pagination
        onChange={handleChangePage}
        count={total}
        shape="rounded"
        classes={{ ul: classes.ul1 }}
        size='small' />
    )
  }
  const uploadFile = (e, type)=>{
    debugger
    if (e.target.files && e.target.files.length > 0 ) {
        var a = e.target.files[0].size;
        const fsize = Math.round((a / 1024));
        // this.setState({
        //   fsize: fsize
        // })

        // console.log(fsize);
        // console.log('fsize')
        var fileName = e.target.files[0].name;
        console.log(fileName)
        debugger
        var validExtensions=['jpg','png','PNG','JPG','jpeg'];
        
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
       var isValid = true;
       for(let img of e.target.files){
           debugger
        // if($.inArray(img.name.substr(img.name.lastIndexOf('.') + 1), validExtensions) == -1){
        //     e.target.value = "";
        //     isValid = false;
        //     toast.error("Invalid file type")
        //    }
        //  break;
         }
         if(e.target.files[0]){
           if(e.target.files[0].size > (1048576*2)){
             e.target.value = "";
             isValid = false;
             toast.error(`file size should less than ${2}mb`)
           }
         }
    if(isValid){
    debugger
      var fileName = e.target.files[0].name;
      var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
      let reader = new FileReader();
      debugger
       setState({
            ...state,
            image: (e.target.files[0]),
            image_name: true
          })
        debugger
        setErros({errors, image:""})
       }
        let reader = new FileReader();
        reader.onloadend = () => {
          debugger
        setState({
          ...state,
          fileName: reader.result
          })
        }
      reader.readAsDataURL(e.target.files[0]);
      }
   }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{user_id == 'add' ? "Add User" : "Add Service Category"}</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/SFMIS-services/add')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
      <div className={styles.box}>
        <div className={styles.box1}>


          <div className={styles.grid}>
            <div className={styles.textfield}>
              <label style={{ color: '#272D3B', width: '100%', marginBlock: 'auto' }}>Service Category Name</label>
              <input autocomplete="off" name="roleName" value={state.roleName} onChange={handleInputs} className={styles.inputfield} type="text" />
              <div className={styles.error_message}>{errors.category_name}</div>
              <br /><br /><br />

            </div><br /><br />
            <div className={styles.error_message}>{errors.roleName}</div>

            <div className={styles.textfield}>

              {/* <option selected disabled style={{ color: '#272D3B', width: '100%', marginBlock: 'auto' }}>Service Type</option>
              <input autocomplete="off" name="roleDescription" value={state.roleDescription} onChange={handleInputs} className={styles.inputfield} type="text" /> */}
              <div className={styles.textfield}>
                <label style={{color: 'black',width: 'inherit',padding:'inherit',marginLeft:'-79px'}}>Services Type</label>
                <select style={{width: '100%',height:'40px',paddingRight:'25px',backgroundColor:'#ffffff',marginRight:'-40px',borderRadius:'7px',border:'1px solid #272D3B'}} name="services_type" value={state.services_type} onChange={handleInputs}>
                <option value="1">Book</option>
                <option value="2">Order</option>
                  
                  {servicesType.length > 0 ? servicesType.map(data =>
                  <option key={data._id} value={data.services_type}>{data.services_type}</option>
                  ) : null}
              </select>
              <div className={styles.error_message}>{errors.services_type}</div>
              </div>


            </div><br /><br /><br />

            <div className={styles.textfield}>
            <label style={{color: ' soloid #535763'}}>Upload Service Icon</label>
              <div className={styles.image_upload}>
              <label className={state.fileName?classes.show_image_true: classes.show_image} for="file-input">
                  <img style={{ marginTop:'7px' }}src={state.fileName? state.fileName: image_icon} />
              </label>
              </div>
              <input id="file-input" type="file" style={{display: 'none'}} onChange={uploadFile} className={styles.upload_image} accept="image/*" />
              <div className={styles.error_message}>{errors.image}</div>
             
            </div><br /><br />
            <div className={styles.textfield}>


            {/* <div className={styles.textfield}>
              <label style={{color: '#535763'}}>Upload Service Icon</label>
              <div className={styles.image_upload}>
              <label className={state.fileName?classes.show_image_true: classes.show_image} for="file-input">
                  <img src={state.fileName? state.fileName: image_icon} />
              </label>
              </div>
              <input id="file-input" type="file" style={{display: 'none'}} onChange={uploadFile} className={styles.upload_image} accept="image/*" />
              <div className={styles.error_message}>{errors.image}</div>
            </div> */}

            
              <FormControlLabel
                className={classes.label}
                control={<GreenCheckbox checked={true} name="checkedG" />}
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
            <div className={styles.saveButton}>
            <Button onClick={searchUsers} className={classes.saveButton1} variant="contained">
            {user_id == 'add' ? "Save" : "Save"}
          </Button>
            </div>



          </div>

        </div>
      </div>
      <div className={styles.box2}>
        <div className={styles.box3}>
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
              </div>
              <div className={classes.div1}>
                {/*Search Button*/}
                <Button onClick={searchUsers} className={classes.button3} variant="contained">
                  Search
          </Button>
              </div>
            </div>

            <TableContainer
              className={classes.tableContainer}
              style={{

              }} component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: '#213D77' }}>
                  <TableRow >
                    <TableCell style={{ color: '#FFFFFF' }} >S.No.</TableCell>
                    <TableCell style={{ color: '#FFFFFF' }} align="center">Service Category Icon</TableCell>
                    <TableCell style={{ color: '#FFFFFF' }} align="center">Service Category Name</TableCell>
                    <TableCell style={{ color: '#FFFFFF' }} align="center">Status</TableCell>
                    <TableCell style={{ color: '#FFFFFF' }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow className={classes.table} >
                    <TableCell component="th" scope="row">
                      1
              </TableCell>
              <TableCell ><img src={background1} style={{ height: 'fit-Content', width: 'auto', display: 'block', margin: 'auto' }} /></TableCell>
                    <TableCell align="center">Food and Beverage</TableCell>
                    <TableCell style={{ color: '#10AC44' }} align="center">Active</TableCell>
                    <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Edit Details </div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Change Status</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Remove</div></a>                    
                      </div>
                    </div></TableCell>
                  </TableRow>
                  <TableRow className={classes.table} >
                    <TableCell component="th" scope="row">
                      2
              </TableCell>
              <TableCell ><img src={background1} style={{ height: 'fit-Content', width: 'auto', display: 'block', margin: 'auto' }} /></TableCell>
                    <TableCell align="center">Food and Beverage</TableCell>
                    <TableCell style={{ color: '#10AC44' }} align="center">Active</TableCell>
                    <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Edit Details</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Change Status</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Remove</div></a>

                      </div>
                    </div></TableCell>
                  </TableRow>
                  <TableRow className={classes.table} >
                    <TableCell component="th" scope="row">
                      3
              </TableCell>
              <TableCell ><img src={background1} style={{ height: 'fit-Content', width: 'auto', display: 'block', margin: 'auto' }} /></TableCell>
                    <TableCell align="center">Food and Beverage</TableCell>
                    <TableCell style={{ color: '#B22222' }} align="center">Inctive</TableCell>
                    <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Edit Details</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Change Status</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Remove</div></a>
                     </div>
                    </div></TableCell>
                  </TableRow>
                  <TableRow className={classes.table} >
                    <TableCell component="th" scope="row">
                      4
              </TableCell>
              <TableCell ><img src={background1} style={{ height: 'fit-Content', width: 'auto', display: 'block', margin: 'auto' }} /></TableCell>
                    <TableCell align="center">Food and Beverage</TableCell>
                    <TableCell style={{ color: '#10AC44' }} align="center">Active</TableCell>
                    <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Edit Details</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Change Status</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Remove</div></a>
                      </div>
                    </div></TableCell>
                  </TableRow>
                  <TableRow className={classes.table} >
                    <TableCell component="th" scope="row">
                      5
              </TableCell>
              <TableCell ><img src={background1} style={{ height: 'fit-Content', width: 'auto', display: 'block', margin: 'auto' }} /></TableCell>
                    <TableCell align="center">Food and Beverage</TableCell>
                    <TableCell style={{ color: '#B22222' }} align="center">Inactive</TableCell>
                    <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Edit Details</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Change Status</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'details',)}>Remove</div></a>
                      </div>
                    </div></TableCell>
                  </TableRow>                
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      {/* Modal for Add Update User */}
      <Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
        <ModalBody modalClassName={styles.modalContainer}>
          <img style={{ width: 60 }} src={flag} />
          <p style={{ marginTop: 20 }}><strong style={{ fontSize: 20 }}>{isAdd ? "Successfully Added User" : "Successfully Updated"} </strong>  </p>
        </ModalBody>
        <ModalFooter className={styles.footer}>
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
      </Modal>


      {rows.length == 0 && <div className={styles.pageDiv}>
        <div style={{ marginTop: 40 }}>
          {rows.length == 0 && setPage()}
        </div>
      </div>}




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
