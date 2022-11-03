import React, {Fragment, useState, useEffect} from "react"
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

import {Link, useHistory} from 'react-router-dom';
import axios from "axios";
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import {get_jadwal_pelajaran_awal, url_by_institute} from "../../../api/reference";

export default function JadwalPelajaranAdmin() {
    const [grid, setGrid] = useState(false)
    const [getKelas, setGetKelas] = useState([]);

    const academicYear = localStorage.getItem('academic_year')

    const _onSearch = value => console.log(value);

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": get_jadwal_pelajaran_awal,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_academic": academicYear
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
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            const kelas = dataRes?.data
            setGetKelas(kelas);
        })
    }, [academicYear])

    const channelList = getKelas.map((data, index) => {
        return {
            idClass: data.class,
            kelas: data.class_type,
        }
    })

    let history = useHistory();
    const handleSubClass = (id) => {
        console.log(id);
        history.push(`/admin-jadwal-pelajaran-sub-kelas-${id}`)
    }

    const ViewPelajaran = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Jadwal Pelajaran"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                            onSearch={_onSearch} style={{width: '80%'}}/>
                                    {grid == false ?
                                        <a>
                                            <AppstoreOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                              onClick={() => setGrid(true)}/>
                                        </a> :
                                        <a>
                                            <MenuOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                          onClick={() => setGrid(false)}/>
                                        </a>}
                                </div>
                            </div>
                        </Card>

                        <div className="px-1 py-2 ">
                            <div className="row">
                                {channelList.map((value, index) => {

                                    return (
                                        <div className="col-xl-3 col-lg-4 col-md-4">
                                            {/* <Link
                        onClick={() => {
                          dispatch({ type: 'SET_CLASS', value: value })
                        }
                        }
                        to={{ pathname: `/admin-jadwal-pelajaran-sub-kelas` }}
                      > */}
                                            <div
                                                className="card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 pt-3 text-center"
                                                onClick={() => handleSubClass(value.idClass)}>
                                                <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">Kelas {value.kelas}</h2>
                                            </div>
                                            {/* </Link> */}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <ViewPelajaran/>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}