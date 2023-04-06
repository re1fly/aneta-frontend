import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { PathMateriJadwalGuru } from "../../../redux/Action";
import {
    Card,
    PageHeader
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
} from "@ant-design/icons";

import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import { global_join_sub_where_get, url_by_institute } from "../../../api/reference";

export default function GuruJadwalPelajaranMapelMateri() {
    const [grid, setGrid] = useState(false)
    const [getMateri, setGetMateri] = useState([]);

    const academicYear = localStorage.getItem('academic_year')
    const userId = localStorage.getItem('user_id')


    const params = useParams()
    const paramsId = params?.id?.split('-');
    const idSubClass = paramsId[0]
    const idMapel = paramsId[1]

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
                            "tbl_induk": "x_academic_subjects_schedule_contents",
                            "select": [
                                "x_academic_subjects_schedule_contents.id",
                                "x_academic_subjects_schedule_contents.tittle"
                            ],
                            "paginate": 1000,
                            "join": [
                                {
                                    "tbl_join": "r_subjects_content_type",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents",
                                    "foregenkey": "subjects_content_type_id"
                                },
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "subjects_content_type_id",
                                    "tbl_value": "1",
                                    "operator": "="
                                }, {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "created_by",
                                    "tbl_value": userId,
                                    "operator": "="
                                },
                                {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "class_id",
                                    "tbl_value": idSubClass,
                                    "operator": "="
                                },
                                {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "subjects_master_id",
                                    "tbl_value": idMapel,
                                    "operator": "="
                                },
                                {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "status",
                                    "tbl_value": "publish",
                                    "operator": "="
                                },
                                {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                    "tbl_field": "deleted_at",
                                    "tbl_value": "",
                                    "operator": "=",
                                },
                            ],
                            "order_coloumn": "x_academic_subjects_schedule_contents.updated_at",
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
            setGetMateri(mapel);
            console.log('ini materi: ', mapel)
        })
    }, [academicYear])

    const channelList = getMateri?.map((data, index) => {
        return {
            id: data.id,
            namaMateri: data.tittle,
        }
    })

    let history = useHistory();
    const handleSubClass = (id, materi) => {
        console.log(id);
        dispatch(PathMateriJadwalGuru(materi))
        history.push(`/guru-jadwal-pelajaran-materi-pertemuan-${id}`, {
            materi
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
                            title={`Jadwal Pelajaran / Kelas ${kelas} / ${subKelas} / ${mapel} / Materi`}
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