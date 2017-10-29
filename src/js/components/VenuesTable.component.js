import React from "react";
import PropTypes from "prop-types";

import VenuesService from "../services/venues.service";
import ItemHOC from "../hocs/Items.hoc";

const VenuesTable = (props) => {
    return (
        <div className="col-12">
            <table className="table">
                <thead className="text-center">
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Street Address</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.venues.map(item =>
                        (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{VenuesService.getCity(item.location)}</td>
                                <td>{VenuesService.getAddress(item.location)}</td>
                                <td>{item.location.lat}</td>
                                <td>{item.location.lng}</td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    )
};

VenuesTable.PropsTypes = {
  venues: PropTypes.arrayOf(PropTypes.object)
};

export default ItemHOC(VenuesTable, "venues");