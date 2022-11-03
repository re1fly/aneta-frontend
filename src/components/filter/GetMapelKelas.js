import React, {useEffect, useState} from "react";
import axios from "axios";
import {ClassByAcademic} from "./ClassByAcademic";
import {MapelByAcademic} from "./MapelByAcademic";
import {global_join_sub_where_get, url_by_institute} from "../../api/reference";

export const GetMapelKelas = (props) => {
    const academic = localStorage.getItem("academic_year");
    const [dataClass, setDataClass] = useState([]);
    const [dataMapel, setDataMapel] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null)

    const _getDataKelas = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": global_join_sub_where_get,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_class",
                                "select" : [
                                    "x_academic_class.id",
                                    "r_class_type.class_type as class",
                                    "x_academic_class.sub_class"
                                ],
                                "paginate": false,
                                "join": [
                                    {
                                        "tbl_join": "r_class_type",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_class",
                                        "foregenkey": "class"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    },{
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_academic_class.id",
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
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                },
                }
            )
            .then(function (response) {
                const dataKelas = JSON.parse(response.data.variables[3].value);
                setDataClass(dataKelas.data);
            })
    }
    const _getDataMapel = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": global_join_sub_where_get,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_subject_master",
                                "select" : [
                                    "x_academic_subjects.academic_subjects_master_id as id_subject",
                                    "x_academic_subject_master.nama_mata"
                                ],
                                "paginate": 1000,
                                "join": [
                                    {
                                        "tbl_join": "x_academic_year",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_subject_master",
                                        "foregenkey": "academic_year_id"
                                    },{
                                        "tbl_join": "x_academic_subjects",
                                        "refkey": "academic_subjects_master_id",
                                        "tbl_join2": "x_academic_subject_master",
                                        "foregenkey": "id"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_subjects",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },{
                                        "tbl_coloumn": "x_academic_subjects",
                                        "tbl_field": "course_grade_id",
                                        "tbl_value": selectedClass,
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },{
                                        "tbl_coloumn": "x_academic_subject_master",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },{
                                        "tbl_coloumn": "x_academic_subjects",
                                        "tbl_field": "course_grade_id",
                                        "tbl_value": "",
                                        "operator": "!=",
                                        "kondisi" : "where"
                                    }
                                ],
                                "order_coloumn": "x_academic_subject_master.nama_mata",
                                "order_by": "desc"
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
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
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
    }, []);

    useEffect(() => {
        _getDataMapel()
    }, [selectedClass]);

    return (
        <>
            <form onSubmit={props.valueFilter}
                  method="POST">
                <div className="row">
                    <div className="col-lg-4 mb-3">
                        <ClassByAcademic
                            onChangeKelas={(e) => setSelectedClass(e.target.value)}
                            selectKelas={dataClass.map((data) => (
                                <option value={data.id}>{data.class} / {data.sub_class}</option>
                            ))}
                        />
                    </div>
                    <div className="col-lg-4 mb-3">
                        <MapelByAcademic selectMapel={dataMapel == null ? null : dataMapel.map((data) => (
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

