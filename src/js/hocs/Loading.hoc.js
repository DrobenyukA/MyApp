import React, {Component} from "react";
import hocService from "../services/hoc.service";
import LoadingIcon from "../components/Loading.component";

import "../../styles/components/loading.scss";

const LoadingHOC = (WrappedComponent, propName="loading") => {
    class WithLoadingIcon extends Component {

        render() {
            return this.props[propName] ? <LoadingIcon/> : <WrappedComponent {...this.props} />;
        }
    }
    WithLoadingIcon.displayName = `ItemsHOC(${hocService.getDisplayName(WrappedComponent)})`;
    return WithLoadingIcon;
};

export default LoadingHOC;

