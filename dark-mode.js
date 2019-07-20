// Dark Mode settings

var darkMode = document.getElementById('dark-mode');
var darkModeChecked;

// Global Constants Elements

const body = document.querySelector('body');
const header = document.querySelector('header');

// React to click and Find toggle status
darkMode.addEventListener('click', function(e) {
    // Get Current status
    if(e.target.attributes['checked']) {
        darkModeChecked = false;
        e.target.removeAttribute('checked')
        console.log('Dark Mode ' + darkModeChecked);
    } else {
        e.target.setAttribute('checked', 'checked');
        darkModeChecked = true;
        console.log('Dark Mode ' + darkModeChecked);
    }
    if(darkModeChecked) {
        darkModeActivated();
    } else {
        darkModeDisabled();
    }
})

function darkModeActivated() {
    // Enable Dark Mode by customizing CSS
        
    // Changing body element backgroundColor
    body.style.backgroundColor = '#333333';

    // Removing header color
    header.classList.remove('bg-success');
}

function darkModeDisabled() {
    // Disable Dark Mode by customizing CSS
        
    // Changing body element backgroundColor
    body.style.backgroundColor = '#fff';

    // Removing header color
    header.classList.add('bg-success');
}
