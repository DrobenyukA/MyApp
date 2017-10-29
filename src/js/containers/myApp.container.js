import React, {Component} from "react";
import {connect} from "react-redux";
import ReactMapboxGl, { Marker, Layer, Feature, ZoomControl } from "react-mapbox-gl";

import LoginBtn from "../components/LoginBtn";
import LogoutBtn from "../components/LogoutBtn";
import UserService from "../services/user.service";
import MapService from "../services/map.service";
import VenuesService from "../services/venues.service";
import {loginAction, logoutAction} from "../actions/user.actions";
import {addQuery, deleteQuery} from "../actions/queries.actions";
import {updateMap} from "../actions/map.actions";
import {storeVenues} from "../actions/venues.actions";
import {MAPBOX} from "../constants/config.constants";
import Search from "../components/SearchComponent";
import Queries from "../components/Queries.component";
import Venues from "../components/Venues.component";

const Map = ReactMapboxGl({
    accessToken: MAPBOX.TOKEN
});

class MyApp extends Component {

    constructor(props) {
        super(props);
        this.fetchVenues = this.fetchVenues.bind(this)
    }

    getButtons () {
        const {user, logout, login} = this.props;
        return user ?
            <LogoutBtn logoutAction={logout}/> :
            <LoginBtn responseHandler={(googleUser) => login(UserService.mapUserFields(googleUser))}/>
    }

    async fetchVenues(value){
        const {map, storeQuery, storeVenues}= this.props;
        storeQuery({
            query: value,
            radius: map.radius.label,
            ...map.center,
            time: Date.now()
        });
        const venues = await VenuesService.getVenues(value, map);
        if (venues) storeVenues(venues);
    }

    getCurrentLocation(map){
        const center = map.getCenter();
        //TODO: find more stable solution to take border point
        const border = map.getBounds()._sw;
        const radius = MapService.getDistance(center, border);
        const params = { center, radius };
        this.props.updateMap(params)
    }

    render() {
        return (
            <div>
                { this.getButtons() }
                MyApp container
                <Queries queries={this.props.queries} deleteQuery={this.props.deleteQuery}/>
                <Search action={this.fetchVenues} />
                <Map
                    onMoveEnd={(map)=>this.getCurrentLocation(map)}
                    style={MAPBOX.TILES}
                    zoom={MAPBOX.ZOOM}
                    containerStyle={MAPBOX.STYLES}>
                    <ZoomControl position={MAPBOX.CONTROL_POSITION}/>
                    {
                        this.props.venues.map(item=>{
                            return(

                                <Marker
                                    key={item.id}
                                    coordinates={[item.location.lng, item.location.lat]}
                                    anchor="bottom">
                                    <button>H</button>
                                </Marker>

                            )
                        })
                    }
                </Map>
                <Venues venues={this.props.venues}/>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        map: store.map,
        queries: store.queries,
        venues: store.venues
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: user => dispatch(loginAction(user)),
        logout: () => dispatch(logoutAction()),
        updateMap: params => dispatch(updateMap(params)),
        storeQuery: query => dispatch(addQuery(query)),
        deleteQuery: time => dispatch(deleteQuery(time)),
        storeVenues: venues => dispatch(storeVenues(venues))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);