import React from "react";

const Search = (props) => {
    return (
        <div>
            <input type="text" onKeyPress={(event)=>detectEvent(event, props.action)}/>
        </div>
    )
};

function detectEvent(event, action){
    if(event.charCode === 13){
        action(event.target.value);
    }
}

export default Search;