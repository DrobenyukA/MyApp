import React from "react";
import GoogleService from "../services/google.service";

const LogoutBtn = (props) => {
    return (
        <button onClick={()=> GoogleService.logout(props.logoutAction) }>Logout</button>
    )
};

export default LogoutBtn;