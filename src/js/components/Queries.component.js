import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Queries = (props) => {
    if (props.queries.length > 0) {
        return (
            <table>
                <thead>
                <tr>
                    <td>&nbsp;</td>
                    <td>Parameter</td>
                    <td>Latitude</td>
                    <td>Longitude</td>
                    <td>Radius</td>
                    <td>Date</td>
                </tr>
                </thead>
                <tbody>
                {props.queries.map(item => {
                    return (
                        <tr key={item.time}>
                            <td>
                                <button onClick={()=>props.deleteQuery(item.time)}>Delete</button>
                            </td>
                            <td>{item.query}</td>
                            <td>{item.lat}</td>
                            <td>{item.lng}</td>
                            <td>{item.radius}</td>
                            <td>{moment(item.time).format("MMM D H:mm")}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
    return null;
};

Queries.PropTypes = {
    queries: PropTypes.array,
    deleteQuery: PropTypes.func.isRequired
};

export default Queries;