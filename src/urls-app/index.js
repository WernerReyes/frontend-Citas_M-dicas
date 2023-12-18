const URLS_APP = {
    // Public Routes
    HOME: '/public/home',
    ABOUT: '/public/about',
    CONTACT: '/public/contact',
    REGISTER: '/public/register',
    LOGIN_USER: '/public/login/user',
    LOGIN_CLINIC: '/public/login/clinic',

    // Private Routes
    
    //-- Dashboard User -- 
    HOME_DASHBOARD_USER: '/private/dashboard/user/home',
    APPOINTMENT_HISTORY_DASHBOARD_USER: '/private/dashboard/user/appointment-history',
    SEACH_DOCTOR_DASHBOARD_USER: '/private/dashboard/user/seach-doctor',
    PROFILE_DASHBOARD_USER: '/private/dashboard/user/profile',
    EDIT_PROFILE_DASHBOARD_USER: '/private/dashboard/user/profile/edit',
     
    //-- Dashboard Medical --
    HOME_DASHBOARD_MEDICAL: '/private/dashboard/medical/home',
    APPOINTMENT_HISTORY_DASHBOARD_MEDICAL: '/private/dashboard/medical/appointment-history',
    PROFILE_DASHBOARD_MEDICAL: '/private/dashboard/medical/profile',
    EDIT_PROFILE_DASHBOARD_MEDICAL: '/private/dashboard/medical/profile/edit',

    //-- Dashboard Administrator --
    HOME_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/home',
    MANAGE_PATIENTS_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/manage-patients',
    MANAGE_DOCTORS_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/manage-doctors',
    MANAGE_SPECIALTIES_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/manage-specialties',
    MANAGE_SCHEDULES_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/manage-schedules',
    MANAGE_APPOINTMENTS_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/manage-appointments',
    PROFILE_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/profile',
    EDIT_PROFILE_DASHBOARD_ADMINISTRATOR: '/private/dashboard/administrator/profile/edit',
    
    // Public Routes Warning Pages
    ACCESS_DENIED: '/public/access-denied',
}

export default URLS_APP;