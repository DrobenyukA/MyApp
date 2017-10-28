
const OPTIONS = {
    client_id:"415184451289-1nek46fjgir455s2jek05aklnmff521d.apps.googleusercontent.com",
    fetch_basic_profile: true,
    scope: "profile"
};



function appendScript(changeState) {
    let container = document.createElement('script');
    container.id = "google-platform";
    container.src = 'https://apis.google.com/js/platform.js';
    document.body.appendChild(container);
    container.onload = () => authenticateUser(changeState);
}

function authenticateUser(changeState){
    window.gapi.load('auth2', () => {
        changeState();
        if (!gapi.auth2.getAuthInstance()) {
            gapi.auth2.init(OPTIONS);
        }
    });
}

function login(responseHandler){
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
        auth2.signIn().then(googleUser => responseHandler(googleUser));
    }
}

function logout(responseHandler){
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
        auth2.signOut().then(res => responseHandler(res))
    }
}

const GoogleService = {
    init: appendScript,
    login,
    logout
};

export default GoogleService;