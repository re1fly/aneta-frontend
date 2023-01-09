import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { PathMapelNilaiGuru } from "../../../redux/Action";
import {
    Card,
    PageHeader
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
} from "@ant-design/icons";

import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import { role_guru_get_matpel, url_by_institute } from "../../../api/reference";

export default function GuruNilaiMapel() {
    const [grid, setGrid] = useState(false)
    const [getMapel, setGetMapel] = useState([]);

    const academicYear = localStorage.getItem('academic_year')
    const userId = localStorage.getItem('user_id')

    const params = useParams()
    const paramsId = params?.id?.split('-');
    const idTingkat = paramsId[1]
    const idSubClass = paramsId[0]

    const dispatch = useDispatch();
    const PathNilaiGuru = useSelector((state) => state.dataPathNilaiGuru)
    const kelas = PathNilaiGuru.kelas
    const subKelas = PathNilaiGuru.subKelas

    const _onSearch = value => console.log(value);

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": role_guru_get_matpel,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "update_jadwal_pelajaran",
                        "type": "json",
                        "value": {
                            "user_id": userId,
                            "id_tingkat": idTingkat,
                            "id_class": idSubClass
                        }
                    }
                ]
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            const mapel = dataRes?.data
            setGetMapel(mapel);
        })
    }, [academicYear])

    const channelList = getMapel?.map((data, index) => {
        return {
            idTingkat: data.tingkat,
            idMapel: data.id,
            mapel: data.nama_mata,
        }
    })

    let history = useHistory();
    const handleSubClass = (id, mapel) => {
        console.log(id);
        dispatch(PathMapelNilaiGuru(mapel))
        history.push(`/guru-nilai-tugas-${id}`)
    }

    const ViewPelajaran = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title={`Data Nilai / Kelas ${kelas} / ${subKelas}`}
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
                                                onClick={() => handleSubClass(value.idMapel, value.mapel)}
                                            >
                                                <h2 className="ml-auto mr-auto font-weight-bold mb-0">{value.mapel}</h2>
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