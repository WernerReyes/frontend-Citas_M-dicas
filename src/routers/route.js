import URLS_APP from "../urls-app";
import {
    homePage,
    aboutPage,
    contactPage,
    registerPage,
    loginPage,
    homeDashboardUserPage,
    appointmentHistoryDashboardUserPage,
    seachDoctorDashboardUserPage,
    profileDashboardUserPage,
    editProfileDashboardUserPage,
    accessDeniedPage,
    homeDashboardMedicalPage,
    appointmentHistoryDashboardMedicalPage,
    profileDashboardMedicalPage,
    editProfileDashboardMedicalPage,
    homeDashboardAdministratorPage,
    managePatientsDashboardAdministratorPage,
    manageDoctorsDashboardAdministratorPage,
    manageSpecialtiesDashboardAdministratorPage,
    manageSchedulesDashboardAdministratorPage,
    manageAppointmentsDashboardAdministratorPage,
    profileDashboardAdministratorPage,
    editProfileDashboardAdministratorPage,
} from "../pages";


const handleRouteChange = (container) => {
    const path = window.location.pathname;
    switch (path) {
        /*--------------------------------------------------------------
        # Public Routes
        --------------------------------------------------------------*/
        case URLS_APP.HOME:
            homePage(container);
            break;

        case URLS_APP.ABOUT:
            aboutPage(container);
            break;

        case URLS_APP.CONTACT:
            contactPage(container);
            break;

        case URLS_APP.REGISTER:
            registerPage(container);
            break;

        case URLS_APP.LOGIN_USER:
            loginPage(container, 'user');
            break;

        case URLS_APP.LOGIN_CLINIC:
            loginPage(container, 'clinic');
            break;

        /*--------------------------------------------------------------
        # Private Routes
        --------------------------------------------------------------*/

        //<-- Dashboard User -->
        case URLS_APP.HOME_DASHBOARD_USER:
            homeDashboardUserPage(container);
            break;

        case URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_USER:
            appointmentHistoryDashboardUserPage(container);
            break;

        case URLS_APP.SEACH_DOCTOR_DASHBOARD_USER:
            seachDoctorDashboardUserPage(container);
            break;

        case URLS_APP.PROFILE_DASHBOARD_USER:
            profileDashboardUserPage(container);
            break;

        case URLS_APP.EDIT_PROFILE_DASHBOARD_USER:
            editProfileDashboardUserPage(container);
            break;

        //<-- Dashboard Medical -->
        case URLS_APP.HOME_DASHBOARD_MEDICAL:
            homeDashboardMedicalPage(container);
            break;
        
        case URLS_APP.APPOINTMENT_HISTORY_DASHBOARD_MEDICAL:
            appointmentHistoryDashboardMedicalPage(container);
            break;

        case URLS_APP.PROFILE_DASHBOARD_MEDICAL:
            profileDashboardMedicalPage(container);
            break;

        case URLS_APP.EDIT_PROFILE_DASHBOARD_MEDICAL:
            editProfileDashboardMedicalPage(container);
            break;

        //<-- Dashboard Administrator -->
        case URLS_APP.HOME_DASHBOARD_ADMINISTRATOR:
            homeDashboardAdministratorPage(container);
            break;

        case URLS_APP.MANAGE_PATIENTS_DASHBOARD_ADMINISTRATOR:
            managePatientsDashboardAdministratorPage(container);
            break;

        case URLS_APP.MANAGE_DOCTORS_DASHBOARD_ADMINISTRATOR:
            manageDoctorsDashboardAdministratorPage(container);
            break;

        case URLS_APP.MANAGE_SPECIALTIES_DASHBOARD_ADMINISTRATOR:
            manageSpecialtiesDashboardAdministratorPage(container);
            break;

        case URLS_APP.MANAGE_SCHEDULES_DASHBOARD_ADMINISTRATOR:
            manageSchedulesDashboardAdministratorPage(container);
            break;

        case URLS_APP.MANAGE_APPOINTMENTS_DASHBOARD_ADMINISTRATOR:
            manageAppointmentsDashboardAdministratorPage(container);
            break;

        case URLS_APP.PROFILE_DASHBOARD_ADMINISTRATOR:
            profileDashboardAdministratorPage(container);
            break;

        case URLS_APP.EDIT_PROFILE_DASHBOARD_ADMINISTRATOR:
            editProfileDashboardAdministratorPage(container);
            break;

        


        /*--------------------------------------------------------------
        # Public Routes Warning Pages
        --------------------------------------------------------------*/
        case URLS_APP.ACCESS_DENIED:
            accessDeniedPage(container);
            break;
        
        
        default:
            homePage(container); // Default to home
            break;
    }
}

export default handleRouteChange;