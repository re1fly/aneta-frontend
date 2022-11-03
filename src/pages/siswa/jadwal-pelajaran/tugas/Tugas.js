import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Adminfooter from "../../../../components/Adminfooter";
import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";

import axios from "axios";
import { role_siswa_get_materi, url_by_institute } from "../../../../api/reference";

function SiswaJadwalTugas() {
    const [getTugas, setGetTugas] = useState([]);

    const user = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id');
    const institute = localStorage.getItem('institute')
    const academicId = localStorage.getItem('academic_id')


    useEffect(() => {
        axios.post(url_by_institute, {
            "processDefinitionId": role_siswa_get_materi,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_academic": academicId,
                        "id_user": userId,
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
            console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setGetTugas(dataRes?.data);
        })


    }, [academicId, userId]);

    const data = getTugas?.map((data, index) => {
        return {
            idMapel: data.id_matpel,
            // code_pelajaran: 'MTK',
            mata_pelajaran: data.nama_matpel,
            kelas: data.kelas,
            semester: data.semester,
            nama_guru: data.guru,
            tugas: data.tugas,
        }
    })

    let history = useHistory();
    const handleRouter = (id) => {
        history.push(`/siswa-data-tugas-${id}`)
    }

    return (
        <Fragment>
            <div id="main-wrapper">
                <Navheader />
                <div className='main-content'>
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row mb-3">
                            <div className="col-lg-12">
                                {/* <div className="d-flex alignt-items-center justify-content-between mb-4">
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
                                <div className=''>
                                    <div className="row">
                                        {data?.map((value, index) => (
                                            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                                <div className="card mb-4 d-block w-100 shadow-md rounded-lg p-xxl-5 p-4 border-0 text-center"
                                                    onClick={() => handleRouter(value.idMapel)}>
                                                    <span
                                                        className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                                        Online
                                                    </span>
                                                    <div className='d-flex justify-content-between'>
                                                        <h4 className='media strong mt-4'>{value.code_pelajaran}</h4>
                                                    </div>
                                                    <h4 className="media fw-700 font-lg mt-1 mb-1">{value.mata_pelajaran}</h4>
                                                    <h2 className="media fw-700 font-xsss mt-1 mb-3"> kelas {value.kelas} | Semester {value.semester}</h2>
                                                    <h2 className="media fw-700 font-xs mt-1 mb-4">{value.nama_guru}</h2>
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
                                                                {value.tugas} Tugas
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
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}

export default SiswaJadwalTugas;