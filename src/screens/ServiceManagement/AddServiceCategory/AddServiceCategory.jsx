import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import * as actions from "../../../redux/actions/SFMISActions";
import * as API from "../../../constants/APIs";
import axios from 'axios';
import { getStationData, setIsSubmitted, setIsLoading } from "../../../redux/actions/stationActions";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// components EditUserDetails
import styles from './AdminAddRole.module.css';

// import logo from './logo.png';
import delete_logo from '../../StationManagement/delete.svg';
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
// import InputBase from '@material-ui/core/InputBase';
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { toast } from 'react-toastify';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TextField from '@material-ui/core/TextField';
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
    display: "flex",
    marginRight: "60px",
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
  button2: {
    ["@media (max-width:428px)"]: {
      marginRight: 0,
      width: '100%',
      marginBottom: 5
    },
    marginRight: 30,
    width: 90,
    borderRadius: 16,
    color: 'white',
    backgroundColor: 'transparent',
    color: '#213D77',
    border: '1px solid #213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
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

export function AddServiceCategory(props) {
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [servicesType, setServicesType] = useState([])
  const [role, setRole] = useState([]);
  const [modal, setModal] = useState({
    changeModel: false,
    details: false,
    deletedModal: false,
    deleteModal: false
  });
  const classes = useStyles();
  const history = useHistory();
  const { user_id } = useParams();
  const [pageNo, setPageNo] = useState();
  const [rows, setRows] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false)
  // const [categoryList, setCategoryList] = useState([])

  const [state, setState] = useState({
    image_icon: "",
    category_name: "",
    category_icon: "",
    service_type: "",
    file_name: "",
    status: false
  });
  const [search, setSearch] = useState({

  })

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  })
  const [errors, setErros] = useState({})
  const [arrayDetails, setArrayDetails] = useState([]);


  const toggleModal = (e, data, row) => {

    setArrayDetails(row);

    // for status value
    setChangeStatus(row.status);
    debugger
    if (data == 'delete') {
      debugger
      setModal({
        deleteModal: true,
        deletedModal: false
      })
    } else {
      setModal({
        changeModel: true
      })
    }
  }

  // Change Service Category Status
  const handleChangeChargeable = (event, type) => {
    if (type == 'Yes') {
      setChangeStatus(true)
    } else {
      setChangeStatus(false)
    }
  };

  // close modal
  const toggleModalClose = () => {
    setModal({
      deleteModal: false,
      deletedModal: false,
      changeModel: false,
      details: false
    })
    // props.setIsSubmitted(false)
    // history.push('/Services-management')
  }

  const editUser = (e, i, data) => {
    data.id = i
    props.setUserData(data)
  }


  // for getting category service data
  useEffect(() => {
    props.getCategoryServicesByParams(1, 10)
  }, [])

  useEffect(() => {
    debugger
    if(props.categoryDocs){
      setRows(props.categoryDocs);
    }
  }, [props.categoryDocs])

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

    // Handle Submit User
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return
      }
        state.category_icon = state.image_icon ? state.image_icon: "";
        props.manageCategoryServices(state, isEdit);
    }

    useEffect(() => {
      setIsEdit(false)
      setState({
        image_icon: "",
        category_name: "",
        category_icon: "",
        service_type: "",
        file_name: "",
        status: false
      })
    }, [props.categoryDocs])

  //  validate form
   const validateForm =()=>{
     console.log(state)
     debugger
     var isValid=true
     if(state.category_name.trim()==''){
       errors.category_name="Service category Name is required";
       isValid=false;
     }
     else if(state.service_type.trim()=='' || state.service_type == '0'){
      errors.service_type="Service type is required";
      isValid=false;
     }
     else if(isEdit){
      if(state.category_icon.trim()==''){
        errors.image="Please upload category icon";
        isValid=false;
      }
     } else if(state.image_icon.trim()=='') {
        errors.image="Please upload category icon";
        isValid=false;
     }
     setErros({...errors, errors })
     return isValid
   }

  useEffect(() => {
    // props.setIsLoading(true)
    // axios({
    //   url: API.GetRoleAPI,
    //   headers: {
    //     "accept": "application/json",
    //     "Content-Type": "application/json",
    //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //   }
    // }).then((response) => {
    //   setRole(response.data.role)
    //   props.setIsLoading(false)
    // })

    // if (props.isEdit || user_id != 'add') {
    //   props.setIsLoading(true)
    //   axios({
    //     url: `${API.GetUserAPI}/${user_id}`,
    //     headers: {
    //       //    'Accept-Language': 'hi',
    //       "accept": "application/json",
    //       'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //     },
    //   }).then(response => {
    //     if (response.data.success) {
    //       console.log(response.data.user)

    //       // setState(data)
    //       setState({
    //         _id: response.data.user._id,
    //         userName: response.data.user.name,
    //         userNumber: response.data.user.mobile,
    //         userAddress: response.data.user.address,
    //         userPassword: response.data.user.password ? response.data.user.password : '',
    //         role: response.data.user.role_id,
    //         // stationName: response.data.user.station_id,
    //         userEmail: response.data.user.email ? response.data.user.email : '',
    //         // date: response.data.user,
    //       })
    //     } else {
    //       setState([]);
    //     }
    //   }).catch(err => {
    //     toast.error(err.response.data.message)
    //     props.setIsLoading(false)
    //   })
    //   props.setIsLoading(false)
    //   // setState(props.stationData)
    //   // setDetails(props.stationData)
    // }
  }, [])

  // Open Modal for Add User Successfully and Update User Successfully
  // useEffect(() => {

  //   if (props.isSubmitted) {
  //     setModal(true);
  //     if (user_id == 'add') {
  //       setIsAdd(true);
  //     } else {
  //       setIsAdd(false);
  //     }
  //   } else {

  //   }
  // }, [props.isSubmitted])

  // useEffect
  useEffect(() => {
    // props.getUserData()
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

    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    //
    setErros({ errors, [event.target.name]: "" })
  }

  const handleCheckbox = (event, type) => {
    console.log(event.target.name)
    setState({
        ...state,
        [event.target.name]: event.target.checked
    })
    debugger
  }

  // function for adding user or Setting IsEdit False
  const addRole = () => {
    // props.setIsEditFalse(false)
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

  // Handle Delete and Change Status function or Calling APIs for Changing Status
	const handleDeleteAndChangeStatus = async(e, categoryData, type) => {
		// set delete modal false
    console.log(categoryData)
    debugger
    let a = await props.setIsLoading(true);

    let config = {
      url: type == 'delete'? `${API.AddServiceCategories}/${categoryData._id}`: `${API.AddServiceCategories}/change_status`,
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
          "id": categoryData._id
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
        props.getCategoryServicesByParams(1, 10)
      } else {
        debugger
        toast.error(response.data.message)
      }
    }).catch(err => {
      toast.error(err.response.data.message)
      props.setIsLoading(false)
    })

	}

  const uploadFile = (e, type)=> {
    debugger
    if (e.target.files && e.target.files.length > 0 ) {
        var a = e.target.files[0].size;
        const fsize = Math.round((a / 1024));

        var validExtensions=['jpg','png','PNG','JPG','jpeg', 'JPEG'];
        var isValid = true;
        let file_name = e.target.files[0].name;
        let fileExt = file_name.substr(file_name.lastIndexOf('.') + 1);
         console.log(e.target.files[0])
         if(e.target.files[0]){
           if(e.target.files[0].size > (1048576*0.5)){
             e.target.value = "";
             isValid = false;
             toast.error(`file size should less than 500KB`)
             return;
           }
         }

        let n = validExtensions.includes(fileExt);

        if(!n) {
          toast.error(`please select image file`)
          return
        }

      if(isValid){
      debugger
        var fileName = e.target.files[0].name;
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
          debugger
        }
        let reader = new FileReader();
        reader.onloadend = (e) => {
          debugger
        setState({
          ...state,
          file_name: fileNameExt,
          image_icon: reader.result
          })
        }
      reader.readAsDataURL(e.target.files[0], fileNameExt);
      }
      setErros({ errors, image: "" })
   }

   const searchUsers = () => {
     console.log('searchUsers')
   }

  //  Edit Category services
  const editDetails = (event, data) => {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let name = `http://13.235.102.214:8000/uploads/category/${data.category_icon}`;

    setIsEdit(true);

    debugger
    setState({
      ...state,
      category_name: data.category_name,
      category_icon: `http://13.235.102.214:8000/uploads/category/${data.category_icon}`,
      service_type: data.service_type,
      file_name: name.substr(name.lastIndexOf('.') + 1),
      status: data.status,
      _id: data._id
  })

  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{isEdit ? "Edit Service Category" : "Add Service Category"}</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/SFMIS-services/add')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
      <div className={styles.box}>
        <div className={styles.box1}>


          <div className={styles.grid}>
            <div className={styles.textfield}>
              <label style={{ color: '#272D3B', width: '100%', marginBlock: 'auto' }}>Service Category Name</label>
              <input autocomplete="off" className={styles.inputfield} name="category_name" value={state.category_name} onChange={handleInputs} type="text" />
              <div className={styles.error_message}>{errors.category_name}</div>


            </div>
            {/* <div className={styles.error_message}>{errors.category_name}</div> */}

              <div className={styles.textfield}>
                <label style={{color: '#272D3B', width: '100%', marginBlock: 'auto'}}>Services Type</label>
                <select
                            className={styles.inputfield}
                      name="service_type" value={state.service_type} onChange={handleInputs}>
                  <option value="0">-Select Service Type-</option>
                  <option value="BOOK">Book</option>
                  <option value="ORDER">Order</option>
              </select>
              <div className={styles.error_message}>{errors.service_type}</div>
              </div>

            <div className={styles.textfield}>
            <label style={{color: ' soloid #535763'}}>Upload Service Icon</label>
              <div className={styles.image_upload}>
              <label className={state.image_icon? classes.show_image_true : (state.category_icon ? classes.show_image_true: classes.show_image)} for="file-input">
                  <img style={{ marginTop:'7px',height: state.image_icon||state.category_icon? 61: '', width: state.image_icon||state.category_icon? 92: '' }} src={state.image_icon? state.image_icon: (state.category_icon? state.category_icon: image_icon)} />
              </label>
              </div>
              <input id="file-input" type="file" style={{display: 'none'}} onChange={uploadFile} className={styles.upload_image} accept="image/*" />
              <div className={styles.error_message}>{errors.image}</div>

            </div>
            <div className={styles.textfield+ " "+ styles.activeAndButton}>

              <FormControlLabel
                className={classes.label}
                control={<GreenCheckbox checked={state.status}
                onChange={handleCheckbox}
                name="status" />}

                label={
                  <span
                    className={styles.checkBoxLabel}
                    style={{ color: "#213D77" }}
                  >
                    Is Active
                </span>
                }
              />
              <div className={styles.saveButton}>
              <Button onClick={handleSubmit} className={classes.saveButton1} variant="contained">
                {isEdit ? "Update" : "Save"}
              </Button>
              </div>
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
                  {rows.map((row, index) => (
            <TableRow className={classes.table} key={row._id}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center"><img src={`http://13.235.102.214:8000/uploads/category/${row.category_icon}`} style={{ width: 27}} /></TableCell>
              <TableCell align="center">{/*row.userNumber*/row.category_name}</TableCell>
							<TableCell style={{color: row.status? 'green': 'red'}} align="center">{row.status?"active": "In-active"}</TableCell>
              <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                        <a><div onClick={(e) => editDetails(e, row)}>Edit Details </div></a>
                        <a><div onClick={(e) => toggleModal(e, 'change', row)}>Change Status</div></a>
                        <a><div onClick={(e) => toggleModal(e, 'delete', row)}>Remove</div></a>
                      </div>
                    </div></TableCell>
            </TableRow>
          ))}

                </TableBody>
              </Table>
            </TableContainer>
            {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
          </div>
        </div>
      </div>

      {/* After Deleted Service Category */}
			{<Modal className={styles.modalCategoryContainer} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted Service Category</strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.deleteFooter}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.deletebutton1}
							onClick={toggleModalClose}
						>
						OK
						</Button>
					</ModalFooter>
				</Modal>}

      {/*Delete Category*/}
      {<Modal className={styles.modalCategoryContainer} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete {arrayDetails.category_name} Category?</strong>  </p>

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
							className={classes.deletebutton1}
							onClick={(e) => { handleDeleteAndChangeStatus(e, arrayDetails, 'delete') }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>}

      {/* Modal for Add Update User */}
      <Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.details} toggle={toggleModalClose} centered={true}>
        <ModalBody modalClassName={styles.modalContainer}>
          <img style={{ width: 60 }} src={flag} />
          <p style={{ marginTop: 20 }}><strong style={{ fontSize: 20 }}>{isEdit ? "Successfully Updated" : "Successfully Added User"} </strong>  </p>
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
    categoryDocs: state.SFMIS.docs,
    // isSubmitted: state.Stations.isSubmitted,
    // user: state.Users.userData,
    // isEdit: state.Users.isEdit,
    // userDetails: state.Stations.stationDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    manageCategoryServices: (category, edit) =>
      dispatch(actions.manageCategoryServices(category, edit)),
    getCategoryServicesByParams: (page, limit) =>
      dispatch(actions.getCategoryServicesByParams(page, limit)),
    // setIsSubmitted: flag => {
    //   dispatch(setIsSubmitted(flag))
    // },
    setIsLoading: (value) =>
      dispatch(setIsLoading(value)),
    // addUserDetails: (user) =>
    //   dispatch(actions.userActions(user)),
    // getUserData: () => {
    //   dispatch(getStationData())
    // },
    // EditUserDetails: (details) =>
    //   dispatch(actions.EditUserDetails(details))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddServiceCategory);
