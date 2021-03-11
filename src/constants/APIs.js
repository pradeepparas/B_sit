const url='http://13.235.102.214:8000';
export const LoginAPI = `${url}/users/login`;

// Station Management APIs
export const AddStationAPI = `${url}/stations`;
export const GetContractorsAPI = `${url}/contractors`;
export const GetStationAPI = `${url}/stations`;
export const DeleteStationAPI = `${url}/stations`;
// http://13.235.102.214:8000/stations

// Users Management APIs
export const GetUserAPI = `${url}/users`;
export const AddUserAPI = `${url}/users/add`;
export const GetRoleAPI = `${url}/roles`;
export const BlockUserAPI = `${url}/users`;

// Vendors
export const GetVendorAPI = `${url}/services/vendor_report`;
export const VendorBlockAPI = `${url}/services/change_status`;

// Profile Setting
export const ChangePasswordAPI = `${url}/users/change_password`;

// DashBoard
export const DashBoardAPI = `${url}/reports/count`;

// Profile Setting APIs
export const UpdateProfileAPI = `${url}/users/profile_update`;

// SFMIS Service Management
export const AddServiceCategories = `${url}/servicecategories`;
export const SFMISAPI = `${url}/services`;
