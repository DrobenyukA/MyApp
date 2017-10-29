import React from "react";
import PropTypes from "prop-types";

import "../../styles/components/search.scss";

const Search = (props) => {
    return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <br/>
                        <p className="text-center">Please enter specific venues and press <code>Enter</code> key to start searching</p>
                        <div className="search">
                            <label htmlFor="search-control">Search:</label>
                            <input id="search-control" type="text" className="form-control" onKeyPress={(event)=>detectEvent(event, props.action)}/>
                        </div>
                    </div>
                </div>
            </div>

    )
};

function detectEvent(event, action){
    if(event.charCode === 13 && event.target.value){
        action(event.target.value);
    }
}

Search.PropTypes = {
    action: PropTypes.func.isRequired
};

export default Search;