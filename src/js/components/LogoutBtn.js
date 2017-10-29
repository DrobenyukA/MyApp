import React from "react";
import PropTypes from "prop-types";
import GoogleService from "../services/google.service";

const LogoutBtn = (props) => {
    return (
        <button className="btn btn-danger" onClick={()=> GoogleService.logout(props.logoutAction) }>
            Logout
        </button>
    )
};

LogoutBtn.PropTypes = {
    logoutAction: PropTypes.func.isRequired
};

export default LogoutBtn;