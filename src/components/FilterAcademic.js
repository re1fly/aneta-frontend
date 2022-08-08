import React, {useEffect, useState} from "react";

export const FilterAcademic = (props) => {
    const academic = localStorage.getItem('year');
    // const semesterNow = localStorage.getItem('semester');

    return(
        <>
            <select
                name="select_tahun_akademik"
                id={props.id}
                key={props.id}
                className="form-control"
                style={{width: '250px'}}
                onChange={props.getYear}
                value={props.academicNow}
            >
                <option value={academic} selected disabled hidden>
                    Filter Tahun Akademik
                </option>
                {props.selectYear}
            </select>

        </>
    )

}