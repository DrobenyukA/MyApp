import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import ItemsHOC from "../hocs/Items.hoc";

const Queries = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead className="text-center">
                        <tr>
                            <td>&nbsp;</td>
                            <th>Parameter</th>
                            <th className="hidden-xs">Latitude</th>
                            <th className="hidden-xs">Longitude</th>
                            <th className="hidden-xs">Radius</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.queries.map(item =>
                            (
                                <tr key={item.time}>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>props.deleteQuery(item.time)}>
                                            Delete
                                        </button>
                                    </td>
                                    <td>{item.query}</td>
                                    <td className="hidden-xs">{item.lat}</td>
                                    <td className="hidden-xs">{item.lng}</td>
                                    <td className="hidden-xs">{item.radius}</td>
                                    <td>{moment(item.time).format("MMM D H:mm")}</td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

Queries.PropTypes = {
    queries: PropTypes.array,
    deleteQuery: PropTypes.func.isRequired
};

export default ItemsHOC(Queries, "queries");