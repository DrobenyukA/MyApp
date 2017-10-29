import React, {Component} from "react";
import {connect} from "react-redux";
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";
import {last, isEmpty} from "lodash";

import MapService from "../services/map.service";
import VenuesService from "../services/venues.service";

import {loginAction, logoutAction} from "../actions/user.actions";
import {addQuery, deleteQuery} from "../actions/queries.actions";
import {updateMap} from "../actions/map.actions";
import {storeVenues} from "../actions/venues.actions";

import {MAPBOX} from "../constants/config.constants";

import Header from "../components/Header.component";
import Markers from "../components/Markers.component";
import Search from "../components/Search.component";
import Queries from "../components/Queries.component";
import Venues from "../components/Venues.component";

import "../../styles/app.scss";
import "../../styles/components/map.scss";

const Map = ReactMapboxGl({
    accessToken: MAPBOX.TOKEN
});

class MyApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: false
        }
    }

    fetchVenues = async (value) => {
        const {map, storeQuery, storeVenues}= this.props;
        this.setState({search: true});
        storeQuery({
            query: value,
            radius: map.radius.label,
            ...map.center,
            time: Date.now()
        });
        const venues = await VenuesService.getVenues(value, map);
        if (venues) {
            storeVenues(venues);
            this.setState({search: false});
        }
    };

    getCurrentLocation = (map) => {
        const {updateMap} = this.props;
        const center = map.getCenter();
        //TODO: find more sophisticated solution to take border point
        const border = map.getBounds()._sw;
        const radius = MapService.getDistance(center, border);
        const params = { center, radius };
        updateMap(params)
    };

    getLatestQuery(){
        const {queries} = this.props;
        if (isEmpty(queries)) return null;
        return last(queries).query;
    }

    render() {
        const {user, login, logout, queries, deleteQuery, venues} = this.props;
        const {search} = this.state;
        return (
            <div className={myapp}>

                <Header user={user} onLogin={login} onLogout={logout}/>

                <Search action={this.fetchVenues} />

                <Queries queries={queries} deleteQuery={deleteQuery}/>

                <Map
                    onMoveEnd={this.getCurrentLocation}
                    style={MAPBOX.TILES}
                    zoom={MAPBOX.ZOOM}>
                    <ZoomControl position={MAPBOX.CONTROL_POSITION}/>
                    <Markers venues={venues}/>
                </Map>

                <Venues venues={venues} loading={search} query={this.getLatestQuery()}/>

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