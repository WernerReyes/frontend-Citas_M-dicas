/*--------------------------------------------------------------
     # Note: All the scripts are imported here and exported
--------------------------------------------------------------*/

// Template main JS file
export const mainScript = () => {
    const script = document.createElement('script');
    script.src = '/assets/js/main.js';
    return script;
};

