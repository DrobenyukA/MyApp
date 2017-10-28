import React from "react";
import PropTypes from "prop-types";

import GoogleService from "../services/google.service";

class LoginBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: true
        };
    }
    
    clickHandler () {
        const {responseHandler} = this.props;
        GoogleService.login(responseHandler)
    }

    render () {

        return (
            <button disabled={this.state.disabled} onClick={this.clickHandler.bind(this)}>
                Login with google
            </button>
        )
    }

    componentDidMount() {
        const googlePlatform = document.getElementById("google-platform");
        if (googlePlatform){
            this.setState({disabled: false });
        } else {
            GoogleService.init(()=>this.setState({disabled: false}))
        }
    }

};

LoginBtn.PropTypes = {
    responseHandler: PropTypes.func.isRequired
};

export default LoginBtn;