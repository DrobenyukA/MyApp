import React, {Component} from "react";
import {connect} from "react-redux";

import LoginBtn from "../components/LoginBtn";
import LogoutBtn from "../components/LogoutBtn";
import UserService from "../services/user.service";
import {loginAction, logoutAction} from "../actions/user.actions";

class MyApp extends Component {

    constructor(props) {
        super(props)
    }

    getButtons () {
        const {user, logout, login} = this.props;
        return user ?
            <LogoutBtn logoutAction={logout}/> :
            <LoginBtn responseHandler={(googleUser) => login(UserService.mapUserFields(googleUser))}/>
    }

    render() {
        return (
            <div>
                { this.getButtons() }
                MyApp container
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(loginAction(user)),
        logout: () => dispatch(logoutAction())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);