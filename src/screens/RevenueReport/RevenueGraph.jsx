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
import Chart from 'chart.js';

// Images
import graph_arrow from './graph_arrow.svg';
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
    width: 85,
    height: 34,
    border: 'solid',
    borderWidth: '1.9px',
    boxShadow: 'none',
    borderRadius: 16,
    borderColor: '#10ac44',
    color: '#10ac44',
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
    '&:hover': {
      boxShadow: 'none',
      borderColor: '#10ac44',
      backgroundColor: 'transparent',
      color: '#10ac44'
    }
  },
  selected_button: {
    width: 85,
    height: 34,
    border: 'solid',
    borderWidth: '1.9px',
    boxShadow: 'none',
    borderRadius: 16,
    borderColor: '#10ac44',
    color: '#ffffff',
    backgroundColor: '#10ac44',
    textTransform: 'capitalize',
    '&:hover': {
      boxShadow: 'none',
      borderColor: '#10ac44',
      backgroundColor: '#10ac44',
      color: '#ffffff'
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

export function RevenueGraph(props) {
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

    // UseEffect for Charts Rendering
    useEffect(() => {
          var options = {
            // // animation is added
            // animation: {
            //   onComplete: function () {
            //     var chartInstance = this.chart;
            //     var ctx = chartInstance.ctx;
            //     console.log(chartInstance);
            //     var height = chartInstance.controller.boxes[0].bottom;
            //     ctx.textAlign = "center";
            //     Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
            //       var meta = chartInstance.controller.getDatasetMeta(i);
            //       Chart.helpers.each(meta.data.forEach(function (bar, index) {
            //         ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y) / 2) - 10);
            //       }),this)
            //     }),this);
            //   }
            // },
            // // animation is added
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    // stepSize: 100000,
                    gridLines: {
                        display:false
                    },
                    ticks: {
                      display: false,
                      beginAtZero: true
                  }
                }
                ],
                yAxes: [{
                    // stepSize: 100000,
                    categoryPercentage: 0.6,
                    barPercentage: 1.0,
                    gridLines: {
                        display:false
                    },
                    ticks: {
                      fontFamily: 'system-ui',
                      fontColor: "#909ebb",
                      fontSize: 12,
                      // stepSize: 1,
                      beginAtZero: true
                  }   
                }]
            }
        }
        var cth = document.getElementById('myChart3');
        var myChart3 = new Chart(cth, {
          type: 'horizontalBar',
          // categoryPercentage: '80%',
          data: {
          labels: ['John Doe', 'Chris', 'Jignesh', 'Roberto', 'Tom'],
              datasets: [{
                  label: 'Revenue',
                  data: [12, 19, 3, 5, 2],
                  backgroundColor: [
                      '#465bff',
                      '#465bff',
                      '#465bff',
                      '#465bff',
                      '#465bff',
                  ],
                  borderColor: [
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                  ],
                  borderWidth: 'none'
              }]
          },
          options: options
      })

        var ctl = document.getElementById('myChart2');
        var myChart2 = new Chart(ctl, {
          type: 'bar',
          data: {
          labels: ['Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16', 'Oct 17', 'Oct 18', 'Oct 19'],
              datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 10, 12, 10, 5, 3, 10, 22, 12],
                  backgroundColor: [
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                      '#fe3371',
                  ],
                  borderColor: [
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                      '#ffffff',
                  ],
                  borderWidth: 'none'
              }]
          },
          options: options
      })

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        '#64a501',
                        '#4165b9',
                        '#cb6383',
                        '#2cd889',
                        '#eb6601',
                    ],
                    borderColor: [
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                // scales: {
                //     yAxes: [{
                //         ticks: {
                //             beginAtZero: true
                //         }
                //     }]
                // }
            }
        })
    }, [])

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Revenue Report</div>
      </div>

      <div className={styles.graphGrid}>
        <div className={styles.graphTable}>
            <div className={styles.graph_title}>
                Total Revenue
            </div>
            <div className={styles.graph_value}>
                256K
            </div>
            <div className={styles.graph_buttons}>
                <Button onClick={() => console.log('clicked')} className={classes.back_button} variant="contained">
                    Today
                </Button>
                <Button onClick={() => console.log('clicked')} className={classes.selected_button} variant="contained">
                    7 Day
                </Button>
                <Button onClick={() => console.log('clicked')} className={classes.back_button} variant="contained">
                    30 Day
                </Button>
                <Button onClick={() => console.log('clicked')} className={classes.back_button} variant="contained">
                    All
                </Button>
            </div>
        </div>

		<div className={styles.graphTable}>
            <div className={styles.graph_title+" "+ styles.graph_title2}>
                Top Five Vendors
            <span className={styles.graph_span}>246K</span></div>
            <div style={{width: 'fit-content', marginTop: 20, marginLeft: 15}}>
            <canvas id="myChart3"></canvas>
            </div>
        </div>
		
        <div className={styles.detailsReport}>
            <div className={styles.graph_title}>
                Detailed Reports
            </div>
            <div onClick={(e) => history.push('revenue-report')} className={styles.graph_revenue}>
                By Services
                <img className={styles.graph_arrow} src={graph_arrow} />
            </div>
            <div className={styles.graph_revenue} onClick={(e) => history.push('revenue-report-vendor')}>
                By Vendors
                <img className={styles.graph_arrow} src={graph_arrow} />
            </div>
        </div>
      </div>
    
      <div className={styles.graphBottomGrid}>
      <div className={styles.graphBottomTable}>
      <div className={styles.graph_title+" "+ styles.graph_title2}>
                Top 5 Services
            <span className={styles.graph_span}>246K</span></div>
            <div className={styles.graph_bottom_value}>
                <canvas id="myChart"></canvas>
            </div>
            <div className={styles.graph_buttons}>
                <Button onClick={() => console.log('clicked')} className={classes.back_button} variant="contained">
                    Today
                </Button>
                <Button onClick={() => console.log('clicked')} className={classes.selected_button} variant="contained">
                    7 Day
                </Button>
                <Button onClick={() => console.log('clicked')} className={classes.back_button} variant="contained">
                    30 Day
                </Button>
                <Button onClick={() => console.log('clicked')} className={classes.back_button} variant="contained">
                    All
                </Button>
            </div>
        </div>

        <div className={styles.distributionDiv}>
        <div className={styles.graph_title}>
                Revenue Distribution
            </div>
            <div style={{width: '65%'}}>
            <canvas id="myChart2"></canvas>
            </div>
        </div>
      
      </div>
    
    
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(RevenueGraph);