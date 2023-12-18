// Desc: All pages public
export { default as homePage } from './public/home';
export { default as aboutPage } from './public/about';
export { default as contactPage } from './public/contact';
export { default as registerPage } from './public/register';
export { default as loginPage } from './public/login';

// Desc: All pages private

// <--- Dashboard user --->
export { default as homeDashboardUserPage } from './private/dashboard-user/home';
export { default as appointmentHistoryDashboardUserPage } from './private/dashboard-user/appointment-history';
export { default as seachDoctorDashboardUserPage } from './private/dashboard-user/seach-doctor';
export { default as profileDashboardUserPage } from './private/dashboard-user/profile';
export { default as editProfileDashboardUserPage } from './private/dashboard-user/edit-profile';

// <--- Dashboard medical --->
export { default as homeDashboardMedicalPage } from './private/dashboard-medical/home';
export { default as appointmentHistoryDashboardMedicalPage } from './private/dashboard-medical/appointment-history';
export { default as profileDashboardMedicalPage } from './private/dashboard-medical/profile';
export { default as editProfileDashboardMedicalPage } from './private/dashboard-medical/edit-profile';

// <--- Dashboard administrator --->
export { default as homeDashboardAdministratorPage } from './private/dashboard-administrator/home';
export { default as managePatientsDashboardAdministratorPage } from './private/dashboard-administrator/manage-patients';
export { default as manageDoctorsDashboardAdministratorPage } from './private/dashboard-administrator/manage-doctors';
export { default as manageSpecialtiesDashboardAdministratorPage } from './private/dashboard-administrator/manage-specialties';
export { default as manageSchedulesDashboardAdministratorPage } from './private/dashboard-administrator/manage-schedules';
export { default as manageAppointmentsDashboardAdministratorPage } from './private/dashboard-administrator/manage-appointments';
export { default as profileDashboardAdministratorPage } from './private/dashboard-administrator/profile';
export { default as editProfileDashboardAdministratorPage } from './private/dashboard-administrator/edit-profile';


// Desc: All pages warning
export { default as accessDeniedPage } from './Unauthorized/accessDenied';