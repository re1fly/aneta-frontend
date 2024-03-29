import React from "react";

export const FilterAllClass = (props) => {
    return (
        <>
            <select
                name={props.nameInput}
                className="form-control"
                onChange={props.getClass}
                id={props.id}
                key={props.id}
                defaultValue={props.classNow}
                value={props.selectedClass}
            >
                <option value="" selected disabled hidden>
                    Filter Kelas
                </option>
                <option value="">All</option>
                {props.selectClass}
            </select>
        </>
    );
};
