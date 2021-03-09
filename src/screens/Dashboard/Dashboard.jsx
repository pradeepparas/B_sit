import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import jwt_decode from "jwt-decode";
// import { compose } from 'redux'
// import { connect } from 'react-redux'
// import { withTranslation,useTranslation } from 'react-i18next';

// Material UI
import CallMadeSharpIcon from '@material-ui/icons/CallMadeSharp';

//  Import images
import train1 from '../../components/Drawer/images/train1.svg';
import servicestack from '../../components/Drawer/images/servicestack.svg';
// import metro_users from '../../components/Drawer/images/metro_users.svg';
import vendor_icon from '../../components/Drawer/images/vendor_icon.svg';
import rupee from '../../components/Drawer/images/rupee.svg';
import user_check from '../../components/Drawer/images/user_check.svg';
// import servicestack from '../../components/Drawer/images/servicestack.svg';
// import stock_inventory_arrow from '../../components/Drawer/images/stock_inventory_arrow.svg';
import total_users_arrow from '../../components/Drawer/images/total_users_arrow.svg';
import total_vendors_arrow from '../../components/Drawer/images/total_vendors_arrow.svg';
import total_revenue_arrow from '../../components/Drawer/images/total_revenue_arrow.svg';

import Card from "../../components/Card/Card";
// import * as acitons from '../../../store/actions/index'

export default function DashBoard(props) {
	const history = useHistory();
	// const [t, i18n] = useTranslation('common');
	// useEffect(()=>{
	// 	props.getDashboardCount()
	// },[])

	useEffect(() => {
		let token = localStorage.getItem('token')
		if(token == null){
			history.push('/')
		}
		console.log(jwt_decode(localStorage.getItem('token')).exp < Date.now() / 1000)
		debugger
	}, [])

	return (
// 		<>
// 			<div className={styles.title}>Dashboard</div>
// 			{/* <button onClick={() => i18n.changeLanguage('hi')}>Hindi</button> */}

// 			<div className={styles.grid}>
// 			{<Card title={'Total Stations'} number="20" icon={train1} link="/station-management" arrow={<CallMadeSharpIcon />} color="#2d62ed" />}
// 			{<Card title={'Total Users'} arrow={<CallMadeSharpIcon />} link="/users" number="20K" icon={servicestack} color="#7d00b5" />}
// 			{<Card title={'Total Vendors'} arrow={<CallMadeSharpIcon />} link="/vendors" number="146" icon={user_friends} color="#ff007c" />}
// 			{<Card title={'Total Services'} number="180" icon={user_check} color="#0a4491" />}
// 		  	{<Card title={'Total Revenue'} arrow={<CallMadeSharpIcon />} number="256K" link="/revenue" icon={rupee} color="#025e87" />}
// 		  	{<Card title={"Today's Revenue"} arrow={<CallMadeSharpIcon />} number="2500" icon={rupee} color="#02873d" />}
// 			</div>
// 		</>
// 	);
// }

// /edit by chandan
<>
<div className={styles.title}>Dashboard</div>
{/* <button onClick={() => i18n.changeLanguage('hi')}>Hindi</button> */}

<div className={styles.grid}>
{<Card title={'Service Handled'} number="20K"   icon={train1} link="/station-management"  color="#128BE8" />}
{<Card title={'In Process Services'} number="5K" icon={user_check} link="/station-management" color="#E800C1" />}
{<Card title={'Stock Inventory'} number="1.4K"  arrow={total_users_arrow} link="/dashboard"  icon={servicestack} color="#06A882" />}
{/* {<Card title={'Total Users'}  number="1.8K"  arrow={total_users_arrow} link="/vendors"  icon={ metro_users} color="#1373BB" />} */}
{<Card title={'Total Vendors'} number="500" arrow={total_vendors_arrow} icon={vendor_icon} link="/vendor-management" color="#6F46FF" />}
  {<Card title={'Total Revenue'} number="246K"  arrow={total_revenue_arrow}  link="/revenue-graph" icon={rupee} color="#037E93" />}
  {<Card title={"Today's Revenue"} number="2500"  icon={rupee} color="#F83F55" />}
</div>
</>
);
}


// const mapStateToProps =(state)=>{
//
// 	return{
//
// 		dashboadCount: state.Users.dashboardCount,
//
// 	}
//
// }
//
// const mapDispatchToProps =(dispatch)=>{
//
// 	return {
// 		getDashboardCount: (type) =>
// 			dispatch(acitons.getDashboardCount(type)),
//
// 	}
// }
// export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(Dashboard)
