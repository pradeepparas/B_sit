import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from "axios";
import { Link, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
// docs
import * as API from '../../../constants/APIs';
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

// components
import styles from './AddVendor.module.css';
// import logo from './logo.png';
// import flag from '../flag.svg';
import * as actions from '../../../redux/actions/vendorActions';
import { setIsLoading, setIsSubmitted } from "../../../redux/actions/stationActions";
// import Loading from '../../../components/Loading/Loading';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    FormControlLabel,
    Checkbox,
    Button
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { idea } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { toast } from 'react-toastify';

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
        ["@media (max-width:320px)"]: {},
    },
    textField1: {
        outline: 'none',
        width: 190,
        height: 41,
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
        color: '#213D77',
        backgroundColor: '#EFEFEF',
        textTransform: 'capitalize',
        border:'1px solid #213D77',
        '&:hover': {
            backgroundColor: '#EFEFEF',
            color: '#213D77'
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
    // height:30,
    borderRadius: 16,
    color: 'white',
    backgroundColor: 'transparent',
    color: '#213D77',
    border:'1px solid #213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',

    },
    ["@media (min-width: 180px) and (max-width: 670px)"]: {
        width: "100%",
        margin: 0
    },
  },
  saveButton1: {
    width: 90,
// height:30,
    marginRight: 105,
    marginLeft:25,
    borderRadius: 16,
color: 'white',
backgroundColor: '#213D77',
textTransform: 'capitalize',
["@media (min-width: 180px) and (max-width: 670px)"]: {
    width: "100%",
    margin: 0,
    marginBottom: 10
},
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
    container1: {
        display: "flex",
        flexWrap: "wrap",
        width: 170,
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

export function AddVendor(props) {
    // const history = useHistory();
    // const [isEdit, setIsEdit] = useState(false);
    const [stationType, setStationType] = useState([])
    const token = localStorage.getItem('token')
    const [add_details, setAddDetails] = useState([]);
    const {vendor_id } = useParams();
    const [isAdd, setIsAdd] = useState(false);
    const [modal, setModal] = useState(false);
    // const [contract_start_date, setcontract_start_date] = useState('');
    // const [exp_end_date, setexp_end_date] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const [managedByList, setManagedByList] = useState([])

    const [state, setState] = useState({
        account_holder_name: "",
        account_number: "",
        ifsc_code: "",
        bank_name:"",
        branch_address:"",
        minimum_commission:"",
        commission_in_percentage:"",
        maximum_commission:"",
        contract_tenure: "",
        status: false,
        vendor_name: "",
        mobile_number: "",
        email_address: "",
        warehouse_address:"",
    })

    const [errors, setErros] = useState({})


    // close modal
    const toggleModalClose = () => {
        setModal(false)
        props.setIsSubmitted(false);
        history.push('/vendor-management');
    }

    // Handle Submit Station
    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();
        if (!validateForm()) {
          debugger
            return
        }

        let isEdit = false;
				if(vendor_id !== 'add'){
					isEdit = true;
				}
        debugger
        props.manageVendorService(state, isEdit)

    }

    useEffect(() => {
        debugger
        if (props.isSubmitted) {
            setModal(true);
            if (vendor_id  == 'add') {
                setIsAdd(true);
            } else {
                setIsAdd(false);
            }
        }
    }, [props.isSubmitted])

    // validate form
    const validateForm = () => {
        debugger

        // All regex for validation
        var emailValid = state.email_address.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var mobilenumbervalid = state.mobile_number.toString().match(/^[0]?[6789]\d{9}$/);
        var usernameRegex = state.vendor_name.toString().match(/^[a-zA-Z ]+$/);

        // var code = state.station_code.match(/^[a-zA-Z]+$/);
        debugger
        var isValid = true;
        if (state.vendor_name == '' || !usernameRegex) {
            errors.vendor_name = "vendor name is required or invalid vendor name";
            isValid = false;
        }
        else if (state.mobile_number.trim() == '' || !state.mobile_number.toString().match(/^[0]?[6789]\d{9}$/)) {
            errors.mobile_number = "mobile is required or invalid mobile";
            isValid = false;
        }
        else if (state.email_address.trim() == '' || !emailValid) {
            errors.email_address = "invalid email address";
            isValid = false;
        }
        else if ( state.warehouse_address == '') {
            errors. warehouse_address = "warehouse address is required";
            isValid = false;
        }
        // else if (state.station_code.toString().trim() == '' || !code) {
        //     errors.station_code = "station code is required or invalid code";
        //     isValid = false;
        // }
        else if ( state.account_holder_name == '') {
            errors.account_holder_name= "account holder name is required";
            isValid = false;
        }
        else if (state.account_number == '0' || state.account_number == '') {
            errors. account_number= "account number is required";
            isValid = false;
        } else if (state.ifsc_code == '0' || state.ifsc_code == '') {
            errors. ifsc_code= "ifsc code is required";
            isValid = false;
        } else if (state.bank_name == '') {
            errors.bank_name= "bank name is required";
            isValid = false;
        }
        else if ( state.branch_address == '') {
            errors.branch_address= "branch address is required";
            isValid = false;
        }
        else if ( state.minimum_commission == '') {
            errors. minimum_commission = " minimum commission is required";
            isValid = false;
        }
        else if ( state.commission_in_percentage == '') {
            errors.commission_in_percentage = "commission in percentage is required";
            isValid = false;
        }
        else if ( state.maximum_commission == '') {
            errors.maximum_commission= "maximum commissionis required";
            isValid = false;
        }

        setErros({ ...errors, errors: errors })
        return isValid
    }

    useEffect(() => {
        debugger
        if (token == null) {
            history.push()
        } else {
            if (vendor_id != 'add') {
                props.setIsLoading(true)
                axios({
                    url: `${API.VendorAPI}/${vendor_id}`,
                    headers: {
                        //    'Accept-Language': 'hi',
                        "accept": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                }).then(response => {
                    if (response.data.success) {
                        debugger

                        const { vendor } = response.data;
                        // setState(response.data.staion)
                        let data = {
                          account_holder_name: vendor.holder_name,
                          account_number: vendor.account_number,
                          ifsc_code: vendor.ifsc_code,
                          bank_name: vendor.bank_name,
                          branch_address:vendor.branch_address,
                          minimum_commission: vendor.mini_commission,
                          commission_in_percentage: vendor.percentage_commission,
                          maximum_commission: vendor.max_commission,
                          status: vendor.status,
                          vendor_name: vendor.name,
                          mobile_number: vendor.mobile,
                          email_address: vendor.email,
                          warehouse_address: vendor.warehouse_address,
                          _id: vendor.vendor_id
                        }

                        setState(data)
                    } else {

                    }
                    props.setIsLoading(false)
                }).catch(err => {
                    toast.error(err.response.data.message)
                    props.setIsLoading(false)
                })

            }
        }
    }, [])


    const handleInputs = (event) => {
        debugger
        // console.log(event.target.name)
        // console.log(event.target.value)
        // debugger
        setState({
            ...state,
            [event.target.name]: event.target.value
        })

        debugger
        if (event.target.name == 'managed_by') {
            debugger
            let value = managedByList.find(x => x._id == event.target.value)
            // state.contract_winner = value.name
            setState({
                ...state,
                [event.target.name]: event.target.value,
                contract_winner: value.name
            })
        }
        // debugger
        setErros({ errors, [event.target.name]: "" })
    }

    // const handleDetails = (event) => {
    //   setDetails({
    //     ...details,
    //     [event.target.name]: event.target.value
    //   })
    //   // debugger
    //   setErros({errors, [event.target.name]:""})
    // }


    const handleStatus = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.checked
      })
      debugger
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.title1}>{vendor_id == 'add' ? "Add Vendor" :"Edit Vendor"}</div>
                <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/vendor-management')} className={classes.button1} variant="contained">
                    Back
        </Button>
            </div>
            <div className={styles.box}>
            <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={styles.box2}>
                    <div style={{ fontSize: 14, marginLeft: 12 }} className={styles.title}>Vendor Details</div>
                    <div className={styles.grid}>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>Vendor Name</label>
                            <input autocomplete="off" name="vendor_name" value={state.vendor_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.vendor_name}</div>
                        </div>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>mobile Number</label>
                            <input autocomplete="off" name="mobile_number" value={state.mobile_number} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.mobile_number}</div>
                        </div>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>Email Address</label>
                            <input autocomplete="off" name="email_address" value={state.email_address} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.email_address}</div>
                        </div>
                        {/* <div className={styles.textfield}>
                            <label style={{ color: 'black',width:'338%'}}>Warehouse Address</label>
                            <input autocomplete="off" name="station_name" value={state.station_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.station_name}</div>
                        </div> */}

                    </div>
                    <div className={styles.fullGrid}>
                    <div className={styles.textfield}>
                            <label style={{ color: 'black',width:'338%'}}>Warehouse Address</label>
                            <input autocomplete="off" name="warehouse_address" value={state.warehouse_address} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors. warehouse_address}</div>
                        </div>
                    </div>

                </div>
                </div>
                <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={styles.box2}>
                    <div style={{ fontSize: 14, marginLeft: 12 }} className={styles.title}>Bank Details</div>
                    <div className={styles.grid1}>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>Acccount Holder's Name</label>
                            <input autocomplete="off" name="account_holder_name" value={state.account_holder_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors. account_holder_name}</div>
                        </div>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>Account Number</label>
                            <input  autocomplete="off" name="account_number" value={state.account_number} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.account_number}</div>
                        </div>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>IFSC Code</label>
                            <input autocomplete="off" name="ifsc_code" value={state.ifsc_code} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.ifsc_code}</div>
                        </div>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>Bank Name</label>
                            <input autocomplete="off" name="bank_name" value={state.bank_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.bank_name}</div>
                        </div>
                        <div className={styles.textfield}>
                            <label style={{ color: 'black' }}>Branch Address</label>
                            <input autocomplete="off" name="branch_address" value={state.branch_address} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.branch_address}</div>
                        </div>
                    </div>
                </div>
                </div>


                <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.box2}>
                        <div style={{ fontSize: 14, marginLeft: 12 }} className={styles.title}>Commission Details</div>
                        <div>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Minimum Commission(₹))</label>
                                <input autocomplete="off" name="minimum_commission" value={state.minimum_commission} onChange={handleInputs} className={styles.inputfield1} type="text" />
                                <div className={styles.error_message}>{errors.minimum_commission}</div>
                            </div>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black',width:'210px' }}>Commission in percentage(%)</label>
                                <input autocomplete="off" name="commission_in_percentage" value={state.commission_in_percentage} onChange={handleInputs} className={styles.inputfield1} type="text" />
                                <div className={styles.error_message}>{errors.commission_in_percentage}</div>
                            </div>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Maximum Commision(₹))</label>
                                <input autocomplete="off" name="maximum_commission" value={state.maximum_commission} onChange={handleInputs} className={styles.inputfield1} type="text" />
                                <div className={styles.error_message}>{errors.maximum_commission}</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div style={{}} className={styles.checkbox}>
               <input style={{marginLeft:'41px'}} className={styles.checkbox100} id="ckb1" type="checkbox" name="status" checked={state.status} onChange={handleStatus}></input>
                    <label style={{color:"#213D77",marginLeft:'12px',fontSize:'medium'}} class="label-checkbox100" for="ckb1"><b>Is Active</b></label>

		     </div>
            <div className={styles.saveButton}>
                <Button style={{}} onClick={() => history.push('/vendor-management')} className={classes.button2} variant="contained">
                    Cancel
                </Button>
                <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
                    {vendor_id == 'add' ? "Save" : "Update"}
                </Button>
            </div>

            {/* Successfully Added and Updated Modal */}
            <Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
                <ModalBody modalClassName={styles.modalContainer}>
                    {/* <img style={{width: 60}} src={flag} /> */}
                    <p style={{ marginTop: 20 }}><strong style={{ fontSize: 20 }}>{isAdd ? "Successfully Added Vendor" : "Successfully Updated"} </strong>  </p>
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isSubmitted: state.Stations.isSubmitted,
        isLoading: state.Stations.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsSubmitted: flag => {
            dispatch(setIsSubmitted(flag))
        },
        manageVendorService: (data, isEdit) =>
            dispatch(actions.manageVendorService(data, isEdit)),

        setIsLoading: (value) =>
            dispatch(setIsLoading(value)),
        // onAuth: (username, password) =>
        // 	dispatch(actions.auth(username, password)),
        // 	updateSignup:()=>
        // 	  dispatch(actions.updateSingupFlag()),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddVendor);
