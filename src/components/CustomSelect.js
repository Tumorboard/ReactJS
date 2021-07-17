import React, { useState } from "react";
function CustomSelect(props) {
    const [data] = useState(props.data);
    const [selectedData, updateSelectedData] = useState("");
    function handleChange(event) {
        // alert("in component: " + event.target.value);
       // updateSelectedData(event.target.value);
        if (props.onSelectChange) props.onSelectChange(props.id, event.target.value);
    }

    //const [id] = useState(props.id);

    let options = data.map(data => (
        <option value={data.value}>
            {data.name}
        </option>
    ));
    return (
        <div>
            <h5 className="field">{props.labelName}</h5>
            <select
                name={props.name}
                id={props.id}
                className="select"
                onChange={handleChange}
                value={props.value}>
                {options}
            </select>
        </div>
    );
}
export default CustomSelect;