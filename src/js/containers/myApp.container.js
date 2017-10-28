import React, {Component} from "react";
import {connect} from "react-redux";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";

import LoginBtn from "../components/LoginBtn";
import LogoutBtn from "../components/LogoutBtn";
import UserService from "../services/user.service";
import MapService from "../services/map.service";
import {loginAction, logoutAction} from "../actions/user.actions";
import {updateMap} from "../actions/map.actions";
import {MAPBOX} from "../constants/config.constants";
import Search from "../components/SearchComponent";

const Map = ReactMapboxGl({
    accessToken: MAPBOX.TOKEN
});

//https://api.foursquare.com/v2/venues/explore?client_id=SY3ME45YAA3NV5JCWGK12ASUU2QNGXJKV5S0PC2E10XH4CNM&client_secret=BSET1UJ4P1024WTQRNV5Q2SKE2PTWQYN0AEVFIWHIJKCCW2R&v=20170801&ll=40.7243,-74.0018&query=coffee&limit1

class MyApp extends Component {

    constructor(props) {
        super(props)
    }

    getButtons () {
        const {user, logout, login} = this.props;
        return user ?
            <LogoutBtn logoutAction={logout}/> :
            <LoginBtn responseHandler={(googleUser) => login(UserService.mapUserFields(googleUser))}/>
    }

    fetchVenues(value){
        const query = value;
        console.log(value);
    }

    updateMap(map){
        const center = map.getCenter();
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
                <Search action={this.fetchVenues} />
                <Map
                    onMoveEnd={(map)=>this.updateMap(map)}
                    style={MAPBOX.TILES}
                    zoom={MAPBOX.ZOOM}
                    containerStyle={MAPBOX.STYLES}>
                    <ZoomControl position={MAPBOX.CONTROL_POSITION}/>
                </Map>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(loginAction(user)),
        logout: () => dispatch(logoutAction()),
        updateMap: (params) => dispatch(updateMap(params))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);