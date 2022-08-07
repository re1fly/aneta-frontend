import axios from "axios";
import {BASE_URL} from "../api/Url";
import React, {useEffect, useState} from "react";
import {Select} from "antd";

export const FilterAcademic = (props) => {
    const academicNow = localStorage.getItem('year');
    const semesterNow = localStorage.getItem('semester');


    return(
        <>
            <select
                name="select_tahun_akademik"
                id={props.id}
                style={{ width: 200, height:35, borderColor: '#1890FF', fontSize: '14px'}}
                onChange={props.getYear}
            >
                <option value={academicNow} selected disabled hidden>
                    Filter Tahun Akademik
                </option>
                {props.selectYear}
            </select>

        </>
    )

}