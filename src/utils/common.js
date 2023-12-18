// Save infomation to localStorage
export const saveToken = (name, token) => {
    localStorage.setItem('token', token);
};

// Get information from localStorage
export const getToken = (name) => {
    return localStorage.getItem(name);
};

// Redirect to page
export const redirecToPage = (url) => {
    window.location.href = url;
};

// Clear content from container
export const clearContent = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

// Identify the url to redirect
export const includePathUser = () => {
    const path = window.location.pathname;
    return path.includes('/user');
};

// Identify the person who is logged in and add the link to the profile
export const profileLink = (urlUser, urlMedical) => {
    const path = window.location.pathname;
    return path.includes('/user') ? urlUser : urlMedical;
};

// Formate date to YYYY-MM-DD
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0 en JavaScript
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };



