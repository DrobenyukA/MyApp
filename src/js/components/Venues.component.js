import React from "react";
import VenuesService from "../services/venues.service";
import ItemsHOC from "../hocs/items.hoc";

const Venues = props => {

    return (
        <table>
            <thead>
            <tr>
                <td>Name</td>
                <td>City</td>
                <td>Street Address</td>
                <td>Latitude</td>
                <td>Longitude</td>
            </tr>
            </thead>
            <tbody>
            {
                props.venues.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{VenuesService.getCity(item.location)}</td>
                            <td>{VenuesService.getAddress(item.location)}</td>
                            <td>{item.location.lat}</td>
                            <td>{item.location.lng}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
};

export default ItemsHOC(Venues);