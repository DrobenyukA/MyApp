import React, {Component} from "react";

import hocService from "../services/hoc.service";

const ItemsHOC = (WrappedComponent, propName = "venues") => {
    class WithItems extends Component {
        render(){
            return this.props[propName].length > 1 ? <WrappedComponent {...this.props} /> : null;
        }
    }
    WithItems.displayName = `ItemsHOC(${hocService.getDisplayName(WrappedComponent)})`;
    return WithItems;
};

export default ItemsHOC;