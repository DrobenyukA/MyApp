import React from "react";
import PropTypes from "prop-types";

const Alert = (props) => {
    return (
        <div className={getClassName(props.bgClass)}>
            {props.children}
        </div>
    )
};

function getClassName(bgClass){
    return "alert alert-"+ bgClass;
}

Alert.PropTypes = {
    bgClass: PropTypes.string
};

Alert.defaultProps = {
    bgClass: "info"
};

export default Alert;