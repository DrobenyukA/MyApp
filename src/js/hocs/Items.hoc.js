import React, {Component} from "react";
import {isEmpty} from "lodash";

import hocService from "../services/hoc.service";

const ItemsHOC = (WrappedComponent, propName = "queries") => {
    class WithItems extends Component {

        render(){
            return isEmpty(this.props[propName]) ? null : <WrappedComponent {...this.props} />;
        }
    }
    WithItems.displayName = `ItemsHOC(${hocService.getDisplayName(WrappedComponent)})`;
    return WithItems;
};

export default ItemsHOC;