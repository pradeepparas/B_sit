import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Chart from 'chart.js';

// Images
import star from './star.svg';
import fill_star from './fill_star.svg';
import close_arrow from './close_arrow.svg'

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';

// components
import * as actions from "../../redux/actions/feedbackActions";
import styles from './Feedback.module.css';
import { getFeedbackDataByParams } from '../../redux/actions/feedbackActions';
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
    width: 216,
    justifyContent: 'space-around'
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
  },

}));

export function FeedBackAndSuggestions(props) {
  const [openComment, setOpenComment] = useState({
    open: false,
    index: ''
  });
  const [rows, setRows] = useState([])
  const url = useRouteMatch()
  const path = url.path.split('/')[1]
  const history= useHistory();
  const [pageNo, setPageNo] = useState();
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  })
  
  const [arr_star, setArr_Star] = useState([1, 1, 1, 0, 0])

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

  // Getting Feedback details
  useEffect(() => {
    if(props.docs){
      setRows(props.docs)
    }
    debugger
  }, [props.docs])


  useEffect(() => {
    props.getFeedbackDataByParams(1, 10)
  }, [])
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

  const openFullRead = (e, index, type) => {
    
    if(type == 'text'){
      setOpenComment({
      ...openComment,
      [index]: true
      })
    } else {
      setOpenComment({
        ...openComment,
        [index]: false
      })
    }
    
    
  }

  const handleStar = (e, index) => {
    // console.log(index)
    // debugger
    // let arr = [0, 0, 0, 0, 0];
    // for(let i = 0; i<=(index); i++){
    //   arr[i] = 1;
    //   if(i == index){
    //     console.log(arr)
    //   }
    // }
    // setArr_Star(arr)
  }
 
  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Feedback And Suggestions</div>
      </div>

      {/* Date Div */}
      <div className={styles.date_containers}>
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


      {rows.map((row, index) => (<div className={styles.box1}>
        <div className={styles.box_title}>
            <span className={styles.span_title}>Your order from {row.user?row.user.name: '-'} on {moment(row.order.createdAt).format("Do MMMM YYYY")}</span>
            {/*<span className={styles.rating_star}>
              {arr_star.map((data, index) => 
                  <span id={index} onClick={(e) => handleStar(e, index)}><img className={styles.image_css} src={ data? star : fill_star} /></span>
                  ) 
              }
            </span>*/}
        </div>
        <div className={styles.comments}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <ol style={{listStyle: 'none'}}>
        <div style={{float: 'right'}} className={styles.rating_star}>
              {arr_star.map((data, index) => 
                  <span id={index} onClick={(e) => handleStar(e, index)}><img className={styles.image_css} src={ row.user_feedback.rating > index? star : fill_star} /></span>
                  ) 
              }
            </div>
          <li className={styles.li_style}><div className={styles.li_div}>User feedback </div>{row.user_feedback.feedback}</li>
          <div style={{float: 'right'}} className={styles.rating_star}>
              {arr_star.map((data, index) => 
                  <span id={index} onClick={(e) => handleStar(e, index)}><img className={styles.image_css} src={ row.service_feedback.rating > index? star : fill_star} /></span>
                  ) 
              }
            </div>
          <li className={styles.li_style}><div className={styles.li_div}>Service </div>{row.service_feedback.feedback}</li>
          <div style={{float: 'right'}} className={styles.rating_star}>
              {arr_star.map((data, index) => 
                  <span id={index} onClick={(e) => handleStar(e, index)}><img className={styles.image_css} src={ row.delivery_boy_feedback.rating> index? star : fill_star} /></span>
                  ) 
              }
            </div>
          <li className={styles.li_style}><div className={styles.li_div}>Delivery Boy </div>{row.delivery_boy_feedback.feedback}</li>
        </ol>
        
        </div>
        </div>
        {openComment[index] && <div className={styles.details}>
              <div className={styles.single_row_div}>
                <span className={styles.single_row1_div}>Customer Name</span>
                <span className={styles.single_row2_div}>{row.user.name}</span>
              </div>
              <div className={styles.single_row_div}>
                <span className={styles.single_row1_div}>Delivery Station</span>
                <span className={styles.single_row2_div}>{row.station.station_name}</span>
              </div>
              <div className={styles.single_row_div}>
                <span className={styles.single_row1_div}>Delivery Time</span>
                <span className={styles.single_row2_div}>{moment(row.order.delivery_date).format("MMMM Do YYYY, h:mm:ss a")}</span>
              </div>
              <div className={styles.single_row_div}>
                <span className={styles.single_row1_div}>Train Name/ No.</span>
                <span className={styles.single_row2_div}>{row.trainname_or_number?row.trainname_or_number: '-'}</span>
              </div>
              <div className={styles.single_row_div}>
                <span className={styles.single_row1_div}>Order ID</span>
                <span className={styles.single_row2_div}>{row.order.order_number}</span>
              </div>
              <div className={styles.single_row_div}>
                <span className={styles.single_row1_div}>Items</span>
                <span className={styles.single_row2_div}>{row.details.items.map(data => (` ${data.name},`))}</span>
              </div>
              <div className={styles.single_row_div}>
                <span className={styles.single_row1_div}>Amount</span>
                <span className={styles.single_row2_div}>{row.order.total_amount}</span>
              </div>
        </div>}
        <div className={styles.read_button}>
            <img onClick={(e) => openFullRead(e, index, 'image')} style={{display: openComment[index]? '': 'none'}} className={styles.close_image} src={close_arrow} />
            <span onClick={(e) => {
              if(!openComment[index]){
                openFullRead(e, index, 'text')
              }
              }} style={{opacity: openComment[index]? '0.5': '1'}}>Read full comment</span></div>
      </div>))}
    </div>
  );
}

const mapStateToProps = (state) => {
	// debugger
	return {
    
    docs: state.Feedback.docs,
    total: state.Feedback.total,
    limit: state.Feedback.limit, 
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	
    getFeedbackDataByParams: (pageNo, size, params) => {
        dispatch(actions.getFeedbackDataByParams(pageNo, size, params))
    },
	// 	setIsLoading: (loading) =>
	//     dispatch(setIsLoading(loading))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(FeedBackAndSuggestions);