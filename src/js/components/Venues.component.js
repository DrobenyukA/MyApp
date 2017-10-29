import React, {Component} from "react";
import PropTypes from "prop-types";
import {isEmpty} from "lodash";

import LoaderHOC from "../hocs/Loading.hoc";
import Alert from "./Alert.component";
import VenuesTable from "./VenuesTable.component";

class Venues extends Component {
    constructor(props){
        super(props)
    }

    getAlert(){
        const {query} = this.props;
        return (
            <div className="col-12 col-sm-8 offset-sm-2">
                <Alert bgClass="info">
                    There are no venues on current location according this query:
                    <strong>{query}</strong>
                </Alert>
            </div>
        )
    }

    render() {
        const {query, venues} = this.props;

        return (
            <div className="container">
                <div className="row">
                    {(query && isEmpty(venues)) ? this.getAlert() : <VenuesTable venues={venues}/> }
                </div>
            </div>
            )

    }
}


Venues.PropTypes = {
    query: PropTypes.string,
    venues: PropTypes.arrayOf(PropTypes.object)
};

export default LoaderHOC(Venues, "loading");