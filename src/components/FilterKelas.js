import React from "react";

export const FilterAllClass = (props) => {
    return (
        <select
            name="select_kelas"
            id={props.id}
            style={{width: 200, height: 35, borderColor: '#1890FF', fontSize: '14px'}}
            onChange={props.getClass}
        >
            <option value="" selected disabled hidden>
               Filter Kelas
            </option>
            <option value="">
                All
            </option>
            {props.selectClass}
        </select>
    )

}