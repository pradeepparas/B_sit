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

// components saveButton
import styles from './AddServicesItem.module.css';

// import logo from './logo.png';
import background1 from '../AddServiceItem/images/background1.png';
import image_icon from './images/image_icon.png';
import flag from '../AddServiceItem/images/flag.svg';
import downArrow from './images/downArrow.png';
import delete_logo from "../../StationManagement/delete.svg"
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
    position: "absolute",
    marginLeft: "-386px",


    ["@media (max-width:320px)"]: {},
  },
  textField1: {
    outline: 'none',
    width: 250,
    height: 40,
    borderRadius: 30,
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
    backgroundColor: 'transparent',
    color: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },

  saveButton1: {
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    height: 40,
    width: 100,
    //  marginTop:'-54',
    //   marginRight: '-22',
    // marginRight: 585,
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
    ["@media (max-width:428px)"]: {
      marginRight: 0,
      width: '100%',
      // marginBottom: 5
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
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
      marginBottom: 5
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

export function AddServicesItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [servicesType, setServicesType] = useState([])
  const [role, setRole] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    deletedModal: false,
  });

  const classes = useStyles();
  const history = useHistory();
  const { service_id } = useParams();
  const [pageNo, setPageNo] = useState();
  const [rows, setRows] = useState([]);

  const [state, setState] = useState({
    image_change: false,
    name: "",
    description: "",
    status: false,
    fileName: "",
    fileNameExt: "",
    price: "",
    delivery_charge: ""
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
    // setModal(true);
    setArrayDetails(row);
    if (data == 'delete') {
      setModal({
        deleteModal: true
      })
    }

  }
  // close modal
  const toggleModalClose = () => {
    setModal({
      deleteModal: false,
      deletedModal: false,
    })

  }


  const handleChangePage = (event, page) => {
    setPageNo(page)
    props.getItemsByParams(page, props.limit, search)
  }

  const handleSubmit = () => {
    debugger
    if (!validateForm()) {
      return
    }

    state.service_id = service_id;
    console.log(isEdit)
    debugger

    props.manageItems(state, isEdit)

    //props.getUserDataByParams(1, 10, search)
  }

  //  validate form
  const validateForm = () => {
    debugger
    var isValid = true
    if (state.name.toString().trim()==''|| !state.name.toString().match(/^[a-zA-Z ]+$/)) {
      errors.name = "Name is required or Invalid name";
      isValid = false;
    }
    else if (state.delivery_charge == '') {
      errors.delivery_charge = "Delivery Charges is required";
      isValid = false;
    }
    else if(state.description.trim() == ''){
      errors.description = "Description is required";
      isValid = false;
    }
    else if(state.fileName == ''){
        errors.image="image is required";
        isValid =false;
    }
    else if(state.price == ''){
      errors.price = "Price field is required";
      isValid = false;
    }
    setErros({ ...errors, errors })
    return isValid
  }

  useEffect(() => {
    setIsEdit(false)
    setState({
      image_change: false,
      name: "",
      delivery_charge: "",
      status: "",
      price: "",
      description: "",
      fileName: "",
      _id: ""
    })
  }, [props.itemsDocs])

  // useEffect
  useEffect(() => {
    props.getItemsByParams(1, 10, service_id)
  }, [])

  useEffect(() => {
    if(props.itemsDocs){
      setRows(props.itemsDocs)
    }
    console.log(props.itemsDocs)
    debugger
  }, [props.itemsDocs])


  const handleInputs = (event) => {
    if((event.target.name == 'price'|| event.target.name == 'delivery_charge') && isNaN(event.target.value)){
      return;
    }
    setState({
      ...state,
      [event.target.name]:  event.target.value
    })
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

// handle Status Value
  const handleCheckbox = (event, type) => {
    setState({
        ...state,
        [event.target.name]: event.target.checked
    })
  }

  // Upload Icon
  const uploadFile = (e, type)=>{
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
           if(e.target.files[0].size > (1048576*2)){
             e.target.value = "";
             isValid = false;
             toast.error(`file size should less than ${2}mb`)
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
					image_change: true,
          fileNameExt: fileNameExt,
          fileName: reader.result
          })
        }
      reader.readAsDataURL(e.target.files[0]);
      }
   }

   //  Edit Items details
   const editDetails = (event, data) => {

     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;

     setIsEdit(true);
     console.log(data)

     debugger
     setState({
       ...state,
       name: data.name,
       delivery_charge: data.delivery_charge,
       status: data.status,
       price: data.price,
       description: data.description,
       fileName: `http://13.235.102.214:8000/uploads/items/${data.item_icon}`,
       _id: data._id
   })

   }


   const handleDeleteItems = async(e, data) => {
     console.log(data)
     debugger

     let a = await props.setIsLoading(true);

     let config = {
       url: `${API.ItemsAPI}/${data._id}?service_id=${data.service_id._id}`,
       method: "DELETE",
       headers: {
         // 'Accept-Language': 'hi',
         "accept": "application/json",
         'Authorization': 'Bearer ' + localStorage.getItem('token'),
       }
     }

     console.log(config)
     debugger

     axios(config).then((response) => {
       if(response.data.success){
           setModal({
             deleteModal: false,
             deletedModal: true
           })

         props.setIsLoading(false)
         props.getItemsByParams(pageNo, props.limit, data.service_id._id)
       } else {
         debugger
         toast.error(response.data.message)
       }
     }).catch(err => {
       toast.error(err.response.data.message)
       props.setIsLoading(false)
     })

   }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{service_id == 'add' ? "Add User" : "Add Item"}</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/SFMIS-services')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
      <div className={styles.box}>
        <div className={styles.box1}>


            <div className={styles.grid}>

              <div className={styles.textfield}>
                <label className={styles.labelLeft}>Item Name</label>
                <input autocomplete="off" name="name" value={state.name} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.name}</div>
              </div>
              {/* <br /><br /> */}
              {/* <div className={styles.error_message}>{errors.roleName}</div> */}
              <div className={styles.textfield+" " +styles.p_t_0}>
              <label className={styles.labelRight}>Delivery Charges(if applicable)</label>
                <input autocomplete="off" name="delivery_charge" value={state.delivery_charge} onChange={handleInputs} className={styles.inputfield+" "+styles.m_r_9} type="text" />
                <div className={styles.massageRight}>{errors.delivery_charge}</div>
              </div>
              <div className={styles.textfield}>
                <label  className={styles.labelLeft}>Description</label>
                <input autocomplete="off" name="description" value={state.description} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.description}</div>
              </div>

              <div className={styles.textfield}>
              <label style={{color: '#535763'}}>Upload Service Icon</label>
              <div className={styles.image_upload}>
              <label className={state.fileName?classes.show_image_true: classes.show_image} for="file-input">
                  <img src={state.fileName? state.fileName: image_icon} />
              </label>
              </div>
              <input id="file-input" type="file" style={{display: 'none'}} onChange={uploadFile} className={styles.upload_image} accept="image/*" />
              <div className={styles.error_message}>{errors.image}</div>
            </div>


              <div className={styles.textfield}>
                <label  className={styles.labelLeft}>Price</label>
                <input autocomplete="off" name="price" value={state.price} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.price}</div>
              </div>


              <div className={styles.textfield}>


                <FormControlLabel
                  className={classes.label}
                  control={<GreenCheckbox
                     onChange={handleCheckbox}
                     checked={state.status}
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
              </div>

            </div>
            <div className={styles.saveButton}>
              <Button onClick={handleSubmit} className={classes.saveButton1} variant="contained">
                {isEdit ? "Update" : "Save"}
              </Button>
            </div>
        </div>
      </div>
      <div>
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
                      name={"name"}
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
                  <Button onClick={(e) => console.log('hello')} className={classes.button3} variant="contained">
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
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Image</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Item Name </TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Discription</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Price</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Delivery Charges</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Actions</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {rows.map((row, index) => (<TableRow className={classes.table} key={row._id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
              </TableCell>
                      <TableCell align="center"><img src={`http://13.235.102.214:8000/uploads/items/${row.item_icon}`} style={{ width: '38px' }} /></TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.delivery_charge}</TableCell>
                      <TableCell align="center">
                        <div className={styles.dropdown}>
                          <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                          <div className={styles.dropdown_content}>
                            <a><div onClick={(e) => editDetails(e, row)}>Edit Details</div></a>
                            <a><div onClick={(e) => toggleModal(e, 'delete', row)}>Delete Item</div></a>
                          </div>
                        </div></TableCell>
                    </TableRow>))}

                  </TableBody>
                </Table>
              </TableContainer>
              {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
            </div>
          </div>
        </div>
        {/* Modal for Add Update User */}
        <Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={false} toggle={toggleModalClose} centered={true}>
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
            <p style={{ marginTop: 20 }}><strong style={{ fontSize: 20 }}>Are you sure you want to delete {arrayDetails.name} SFMIS Service?</strong>  </p>

          </ModalBody>
          <ModalFooter className={styles.deleteFooter}>
            <Button
              style={{ width: 100 }}
              variant="contained"
              color="black"
              className={classes.button1}
              onClick={toggleModalClose}
            >
              NO
  						</Button>
            <Button
              style={{ width: 100 }}
              variant="contained"
              className={classes.saveButton1}
              onClick={(e) => { handleDeleteItems(e, arrayDetails) }}
            >
              YES
  						</Button>
          </ModalFooter>
        </Modal>}


        {rows.length == 0 && <div className={styles.pageDiv}>
          <div style={{ marginTop: 40 }}>
            {rows.length == 0 && setPage()}
          </div>
        </div>}
      </div>




    </div>
  );
}


const mapStateToProps = (state) => {

  return {
    itemsDocs: state.SFMIS.itemsDocs,
    limit: state.SFMIS.itemsLimit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    manageItems: (data, isEdit) =>
      dispatch(actions.manageItems(data, isEdit)),

    getItemsByParams: (page, limit, service_id) =>
      dispatch(actions.getItemsByParams(page, limit, service_id)),

    setIsLoading: (value) =>
      dispatch(setIsLoading(value)),
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddServicesItem);
