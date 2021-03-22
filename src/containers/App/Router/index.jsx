import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
// import Landing from '../../Landing/index';
// import NotFound404 from '../../DefaultPage/404/index';
// import LockScreen from '../../Account/LockScreen/index';
// import LogIn from '../../Account/LogIn/index';
// import LogInPhoto from '../../Account/LogInPhoto/index';
// import Register from '../../Account/Register/index';
// import RegisterPhoto from '../../Account/RegisterPhoto/index';
// import ResetPassword from '../../Account/ResetPassword/index';
// import ResetPasswordPhoto from '../../Account/ResetPasswordPhoto';
// import WrappedRoutes from './WrappedRoutes';

// Bhupendra Sir
import LoginBlue from "../../../screens/LoginStation/LoginBlue.jsx";
import ForgetPassword from "../../../screens/ForgetPassword/ForgetPassword.jsx";
import OTPAdmin from '../../../screens/OTPAdmin/OTPAdmin.jsx';
import ResetPasswordAdmin from "../../../screens/ResetPasswordAdmin/Reset_passwordAdmin.jsx";
import ServicesManagement from "../../../screens/ServiceManagement/ServicesManagement.jsx";
import AddServiceCategory from "../../../screens/ServiceManagement/AddServiceCategory/AddServiceCategory"
import AddServiceItem from "../../../screens/ServiceManagement/AddServiceItem/AddServicesItem";

// Chandan Sir
import Dashboard from '../../../screens/Dashboard/Dashboard';
import UserManagement from '../../../screens/UserAdminManagement/UserAdminManagement';
import AddUser from '../../../screens/UserAdminManagement/AddUser1/AddUser1';
import AddRole from "../../../screens/UserAdminManagement/AdminAddRole/AdminAddRole";
import ManageRole from "../../../screens/UserAdminManagement/ManageRole/ManageRole";
import VendorManagement from "../../../screens/VendorManagement/VendorManagement";
import AddVendor from "../../../screens/VendorManagement/AddVendor/AddVendor";

// Screens
import FeedBackAndSuggestions from "../../../screens/FeedBack/Feedback";
import VendorsService from "../../../screens/Vendors/VendorsService/VendorsService"
// import Dashboard from "../../../screens/Dashboard/Dashboard";
import RevenueReport from "../../../screens/RevenueReport/RevenueReport";
import ViewVendor from '../../../screens/RevenueReport/ViewVendor';
import ItemDetails from '../../../screens/Vendors/VendorsService/ItemDetails/ItemDetails';
import AddVendorService from "../../../screens/Vendors/VendorsService/AddVendorService/AddVendorService";
import AddService from "../../../screens/ServiceManagement/AddService/AddService";
import ProfileSettings from "../../../screens/ProfileSettings/ProfileSettings";
import RevenueGraph from "../../../screens/RevenueReport/RevenueGraph";

// components
import Drawer from "../../../components/Drawer/Drawer";

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        {/*<Route exact={true} path="/" component={Log_in} />*/}
        {/* Bhupendra */}
        <Route exact={true} path="/" component={LoginBlue} />
        <Route exact={true} path="/OTPAdmin" component={ForgetPassword} />
        <Route exact={true} path="/otp" component={OTPAdmin} />
        <Route exact={true} path="/reset-password" component={ResetPasswordAdmin} />
        <Route exact={true} path="/SFMIS-services" render={(props) => <Drawer page={<ServicesManagement />} />}/>
        <Route path="/SFMIS-services/:service_id/add-service-category" exact={true} render={(props) => <Drawer page={<AddServiceCategory />} />}/>
        <Route path="/SFMIS-services/add-service-item/:service_id" exact={true} render={(props) => <Drawer page={<AddServiceItem />} />}/>

        {/* Chandan Sir */}
        <Route path="/user-management" exact={true} render={(props) => <Drawer page={<UserManagement />} />}/>
        <Route path="/user-management/:user_id" exact={true} render={(props) => <Drawer page={<AddUser />} />}/>
        <Route path="/user-management/:user_id/:role_id" exact={true} render={(props) => <Drawer page={<AddRole />} />}/>
        <Route path="/user-management/:user_id/:role_id/manage-role" exact={true} render={(props) => <Drawer page={<ManageRole />} />}/>
        <Route path="/vendor-management" exact={true} render={(props) => <Drawer page={<VendorManagement />} />}/>
        <Route path="/vendor-management/:vendor_id" exact={true} render={(props) => <Drawer page={<AddVendor />} />}/>

        {/* My Code */}
        <Route path="/dashboard" render={(props) => <Drawer page={<Dashboard />} />}/>
        <Route path="/revenue-report" exact={true} render={props => <Drawer page={<RevenueReport />} />} />
        <Route path="/revenue-report-vendor" exact={true} render={props => <Drawer page={<RevenueReport />} />} />
        <Route path="/revenue-report-vendor/:vendor_id" exact={true} render={props => <Drawer page={<ViewVendor />} />} />
        {<Route path="/profile" render={props => <Drawer page={<ProfileSettings />} />} />}
        <Route path="/vendors-service" exact={true} render={props => <Drawer page={<VendorsService />} />} />
        <Route path="/vendors-service/:vendor_id" exact={true} render={props => <Drawer page={<AddVendorService />} />} />
        <Route path="/SFMIS-services/:service_id" exact={true} render={props => <Drawer page={<AddService />} />} />
        <Route path="/vendors-service/item-details/:item_id" exact={true} render={props => <Drawer page={<ItemDetails />} />} />
        <Route path="/revenue-graph" exact={true} render={props => <Drawer page={<RevenueGraph />} />} />
        <Route path="/feedback-and-suggestions" exact={true} render={props => <Drawer page={<FeedBackAndSuggestions />} />} />
        {// <Route exact path="/" component={Landing} />
        // <Route path="/404" component={NotFound404} />
        // <Route path="/lock_screen" component={LockScreen} />
        // <Route path="/log_in" component={LogIn} />
        // <Route path="/log_in_photo" component={LogInPhoto} />
        // <Route path="/register" component={Register} />
        // <Route path="/register_photo" component={RegisterPhoto} />
        // <Route path="/reset_password" component={ResetPassword} />
        // <Route path="/reset_password_photo" component={ResetPasswordPhoto} />
      // <Route path="/" component={WrappedRoutes} />
    }
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
