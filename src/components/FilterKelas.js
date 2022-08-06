import React from "react";

export const FilterAllClass = (props) => {
    return (
        <>
            <select
                name="select_kelas"
                className="form-control"
                onChange={props.getClass}
                id={props.id}
                key={props.id}
                defaultValue={props.classNow}
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
