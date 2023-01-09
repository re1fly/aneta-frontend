import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { PathMateriJadwalGuru } from "../../../redux/Action";
import {
    Menu,
    Card,
    Button,
    Dropdown,
    message,
    PageHeader
} from "antd";
import {
    DownOutlined,
    AppstoreOutlined,
    MenuOutlined,
} from "@ant-design/icons";

import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import { global_join_sub_where_get, url_by_institute } from "../../../api/reference";

export default function GuruJadwalPelajaranMapelTugas() {
    const [grid, setGrid] = useState(false)
    const [getTugas, setGetTugas] = useState([]);

    const academicYear = localStorage.getItem('academic_year')
    const userId = localStorage.getItem('user_id')

    const params = useParams()
    const idMapel = params?.id

    const dispatch = useDispatch();
    const pathJadwalGuru = useSelector((state) => state.dataPathJadwalGuru);
    const kelas = pathJadwalGuru.kelas
    const subKelas = pathJadwalGuru.subKelas
    const mapel = pathJadwalGuru.mapel

    const _onSearch = value => console.log(value);

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_subjects_schedule_contents_meeting",
                            "select": [
                                "x_academic_subjects_schedule_contents.id",
                                "x_academic_subjects_schedule_contents.tittle",
                                "x_academic_subjects_schedule_date.date",
                                "x_academic_subjects_schedule_time.time_start",
                                "x_academic_subjects_schedule_time.time_end"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_academic_subjects_schedule_date",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "schedule_date_id"
                                },
                                {
                                    "tbl_join": "x_academic_subjects_schedule_time",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "schedule_time_id"
                                }, {
                                    "tbl_join": "x_academic_subjects_schedule_contents",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "contents_id"

                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "subjects_content_type_id",
                                    "tbl_value": "2",
                                    "operator": "="
                                }, {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "created_by",
                                    "tbl_value": userId,
                                    "operator": "="
                                }, {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "subjects_master_id",
                                    "tbl_value": idMapel,
                                    "operator": "="
                                }, {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "status",
                                    "tbl_value": "publish",
                                    "operator": "="
                                }

                            ],
                            "order_coloumn": "x_academic_subjects_schedule_contents_meeting.updated_at",
                            "order_by": "desc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": "1"
                    }
                ]
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            const mapel = dataRes?.data?.data
            setGetTugas(mapel);
        })
    }, [academicYear])

    const channelList = getTugas?.map((data, index) => {
        return {
            id: data.id,
            namaMateri: data.tittle,
        }
    })

    let history = useHistory();
    const handleSubClass = (id, tugas) => {
        console.log(id);
        dispatch(PathMateriJadwalGuru(tugas))
        history.push(`/guru-jadwal-pelajaran-tugas-pertemuan-${id}`, {
            tugas
        })
    }

    const ViewPelajaran = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title={`Jadwal Pelajaran / Kelas ${kelas} / ${subKelas} / ${mapel} / Tugas`}
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                        onSearch={_onSearch} style={{ width: '80%' }} />
                                </div>
                            </div>
                        </Card>

                        <div className="px-1 py-2 ">
                            <div className="row">
                                {channelList?.map((value, index) => {

                                    return (

                                        <div className="col-xl-3 col-lg-4 col-md-4">
                                            <div
                                                className="d-flex align-items-center justify-content-center card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 text-center"
                                                onClick={() => handleSubClass(value.id, value.namaMateri)}
                                            >
                                                <h2 className="ml-auto mr-auto font-weight-bold mb-0">{value.namaMateri}</h2>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <ViewPelajaran />
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}