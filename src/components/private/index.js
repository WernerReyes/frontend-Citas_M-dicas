/*--------------------------------------------------------------
# COMPONENTS - Private
--------------------------------------------------------------*/

// Desc: Export all layout components
export { default as headerPrivate } from './layout/header/header';
export { default as sidebarPrivate } from './layout/sidebar/sidebar';
export { default as footerPrivate } from './layout/footer/footer';

// Desc: Export all common components 
// <-- Profile -->
export { default as profileInformationSection } from './common/profile/profile-information-section/profile-information-section';
export { default as editProfileSection } from './common/profile/edit-profile-section/edit-profile-section';

// Desc: Export all dashboard user components
// <-- Home --> 
export { default as actionsSection } from './dashboard-user/home/actions-section/actions-section';
export { default as appointmentsSection } from './dashboard-user/home/appointmets-section/appointmets-section';
// <-- Appointment History -->
export { default as historySection } from './dashboard-user/appointment-history/history-section/history-section';
export { default as servicesSection } from './dashboard-user/appointment-history/services-section/services-section';
// <-- Search Doctor -->
export { default as searchDoctorSection } from './dashboard-user/seach-doctor/doctor-list-section/doctor-list-section';

// Desc: Export all dashboard medical components
// <-- Common -->
export { default as appointmentsSectionMedical } from './dashboard-medical/common/appointmets-section/appointmets-section';
// <-- Home -->
export { default as actionsSectionMedical } from './dashboard-medical/home/actions-section/actions-section';

// Desc: Export all dashboard administrator components
// <-- Sidebar -->
export { default as sidebarAdministator } from './dashboard-administrator/sidebar/sidebar';
// <-- Home -->
export { default as graphicSection } from './dashboard-administrator/home/graphic-section/graphic-section';
export { default as userListSection } from './dashboard-administrator/home/user-list-section/user-list-section';
// <-- Manage Patients -->
export { default as manageUserSection } from './dashboard-administrator/manage-patients/manage-section/manage-section';
// <-- Manage Doctors -->
export { default as manageDoctorSection } from './dashboard-administrator/manage-doctors/manage-section/manage-section';
// <-- Manage Specialties -->
export { default as manageSpecialtieSection } from './dashboard-administrator/manaje-specialties/manage-section/manage-section';
// <-- Manage Schedules -->
export { default as manageScheduleSection } from './dashboard-administrator/manage-schedules/manage-section/manage-section';
// <-- Manage Appointments -->
export { default as manageAppointmentsSection } from './dashboard-administrator/manage-appointments/manage-section/manage-section';