import React from "react";
import PropTypes from "prop-types";
import {Marker} from "react-mapbox-gl";
import ItemsHOC from "../hocs/Items.hoc";

const Markers = props => {

  return props.venues.map(item=>{
      return(
          <Marker
              key={item.id}
              coordinates={[item.location.lng, item.location.lat]}
              anchor="bottom">
              <div className="map-marker" title={item.name}></div>
          </Marker>
      )
  })

};

Markers.PropTypes ={
    venues: PropTypes.array
};

export default ItemsHOC(Markers, "venues");



