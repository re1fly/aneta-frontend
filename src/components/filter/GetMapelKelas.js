import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../api/Url";
import {ClassByAcademic} from "./ClassByAcademic";
import {MapelByAcademic} from "./MapelByAcademic";

export const GetMapelKelas = (props) => {
    const academic = localStorage.getItem("academic_year");
    const [dataClass, setDataClass] = useState([]);
    const [dataMapel, setDataMapel] = useState([]);

    const _getDataKelas = () => {
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_get_where",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_class",
                                "pagination": false,
                                "total_result": 2,
                                "order_coloumn": "x_academic_class.class",
                                "order_by": "asc",
                                "data": [
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    },
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "tbl_coloumn": [
                                    "*"
                                ]
                            }
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                const dataKelas = JSON.parse(response.data.variables[2].value);
                setDataClass(dataKelas);
            })
    }
    const _getDataMapel = () => {
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_subjects",
                                "select": [
                                    "x_academic_subjects.id as id_subject",
                                    "x_academic_subject_master.nama_mata"
                                ],
                                "paginate": 1000,
                                "join": [
                                    {
                                        "tbl_join": "x_academic_subject_master",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_subjects",
                                        "foregenkey": "academic_subjects_master_id"
                                    }
                                ],

                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_subject_master",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    },
                                    {
                                        "tbl_coloumn": "x_academic_subject_master",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }

                                ],
                                "order_coloumn": "x_academic_subject_master.nama_mata",
                                "order_by": "asc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                const dataMapelApi = JSON.parse(response.data.variables[3].value);
                const getMapel = dataMapelApi.data.data

                setDataMapel(getMapel);
            })
    }

    useEffect(() => {
        _getDataKelas()
        _getDataMapel()
    }, []);

    return (
        <>
            <form onSubmit={props.valueFilter}
                  method="POST">
                <div className="row">
                    <div className="col-lg-4 mb-3">
                        <ClassByAcademic
                            selectKelas={dataClass.map((data) => (
                                <option value={data.id}>{data.class}</option>
                            ))}
                        />
                    </div>
                    <div className="col-lg-4 mb-3">
                        <MapelByAcademic selectMapel={dataMapel.map((data) => (
                            <option value={data.id_subject}>{data.nama_mata}</option>
                        ))}/>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <button
                            className="bg-primary border-0 text-center text-white font-xsss mt-2 fw-600 p-2 w-25 rounded-lg"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

