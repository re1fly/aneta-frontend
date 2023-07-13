import React, {Fragment, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Adminfooter from "../../../../components/Adminfooter";
import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";

import axios from "axios";
import {role_siswa_get_daftar_materi, url_by_institute} from "../../../../api/reference";
import {PageHeader, Spin} from 'antd';

function SiswaDataTugas() {
    const [getTugas, setGetTugas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countRender, setCountRender] = useState(0)
    const [dataSuccess, setDataSuccess] = useState(false)

    const userId = localStorage.getItem('user_id');
    const institute = localStorage.getItem('institute');
    const academicId = localStorage.getItem('academic_id');

    const params = useParams();
    const path = params.id.split("-");
    const idMapel = path[0];
    const mapel = path[1];

    const _getPertemuanTugas = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": role_siswa_get_daftar_materi,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_academic": academicId,
                            "id_user": userId,
                            "id_matpel": idMapel,
                            "type": 2
                        }
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setGetTugas(dataRes?.data);
            const responseCode = dataRes.code;
            if (responseCode == 200) {
                setLoading(false)
                setDataSuccess(true)
            } else {
                setDataSuccess(false)
                setCountRender(countRender + 1)
            }
        })
    }

    const _loadingData = () => {
        if (dataSuccess == false) {
            _getPertemuanTugas()
        }
    }

    if (countRender > 1 && countRender < 4) {
        setInterval(_loadingData, 5000)
    }

    useEffect(() => {
        _getPertemuanTugas()
    }, [userId, academicId, idMapel]);

    const data = getTugas?.map((data, index) => {
        return {
            id: data.id,
            namaTugas: data.nama,
            pertemuan: data.jumlah_pertemuan,
        }
    })

    let history = useHistory();
    const handleRouter = (id, mapel, tugas) => {
        history.push(`/siswa-pertemuan-tugas-${id}-${mapel}-${tugas}`)
    }

    return (
        <Fragment>
            <div id="main-wrapper">
                <Navheader/>
                <div className='main-content'>
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row mb-3">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title={`Jadwal Pelajaran / Tugas / ${mapel}`}
                                />
                                {/* calendar navigation
                                <div className="d-flex alignt-items-center justify-content-between mb-4">
                                    <div className="strong">
                                        <h5 className='font-xsss pt-1 mb-0'>{currentDate} WIB</h5>
                                    </div>
                                    <div className="d-flex align-items-center  pl-4 gap-1 pr-8">
                                        <h5 className='mb-0 mt-1'>
                                            <i className="feather-calendar mr-2"></i>
                                        </h5>
                                        <Button className="mr-1 px-1" style={{ height: '25px' }}>
                                            <i className='feather-chevron-left'></i>
                                        </Button>
                                        <Button className=" shadow-md px-1" style={{ height: '25px' }}>
                                            <i className='feather-chevron-right'></i>
                                        </Button>
                                    </div>
                                </div> */}
                                <div className='mt-4'>
                                    <Spin tip="Loading..." spinning={loading} className='mt-5'>
                                        <div className="row">
                                            {data?.map((value, index) => (
                                                <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                                    {/* <Link to='/siswa-pertemuan-tugas'> */}
                                                    <div
                                                        className="card mb-4 d-block w-100 shadow-md rounded-lg p-xxl-5 p-4 border-0 text-center"
                                                        onClick={() => handleRouter(value.id, mapel, value.namaTugas)}
                                                        style={{minHeight: '180px'}}>
                                                        <h4 className="media fw-700 font-lg mt-1 mb-3">{value.namaTugas}</h4>
                                                        <div className="clearfix "></div>
                                                        <div className='media'>
                                                            {value.tag1 ? (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                                                {value.tag1}
                                                            </span>
                                                            ) : (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                                                {value.pertemuan} Pertemuan
                                                            </span>
                                                            )}
                                                            <div className='ml-2'></div>
                                                            {/* {value.tag2 ? (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                                                    {value.tag2}
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                                                    Tugas Kosong
                                                                </span>
                                                            )} */}
                                                            {value.tag3 ? (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-6">
                                                                {value.tag3}
                                                            </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* </Link> */}
                                                </div>
                                            ))}
                                        </div>
                                    </Spin>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}

export default SiswaDataTugas;