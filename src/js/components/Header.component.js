import React from "react";
import PropTypes from "prop-types";

import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import UserService from "../services/user.service";

import "../../styles/components/user.scss";
const Header = props => {
    const {user, onLogout, onLogin} = props;
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm">
                        <h1 className="navbar-brand">My App</h1>
                    </div>
                    <div className="col-12 col-sm text-right">
                        { user ?
                            <div className="user-menu">
                                Hello {user.firstName}
                                <LogoutBtn logoutAction={onLogout}/>
                            </div> :
                            <LoginBtn responseHandler={(googleUser) => onLogin(UserService.mapUserFields(googleUser))}/>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
};

Header.PropTypes = {
    user: PropTypes.obj,
    onLogout: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired
};

export default Header;