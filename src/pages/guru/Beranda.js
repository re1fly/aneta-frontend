import React, { Fragment, useEffect } from 'react';
import Adminfooter from '../../components/Adminfooter';
import axios from "axios";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";

import {get_where_no_join, url_by_institute} from "../../api/reference";

const iconlList = [{
    name: '7', count: 'Kelas', status: 'warning', icon: 'feather-hard-drive',
}, {
    name: '14', count: 'Pelajaran', status: 'success', icon: 'feather-box',
}, {
    name: '84', count: 'Siswa', status: 'info', icon: 'feather-award',
}];



function BerandaGuru() {
    const user = localStorage.getItem('user_name');
    const institute = localStorage.getItem('institute')
    const academicId = localStorage.getItem('academic_year')

    useEffect(() => {
        axios.post(url_by_institute, {
            "processDefinitionId": get_where_no_join,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_get_where",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_year",
                        "pagination": false,
                        "total_result": 2,
                        "order_coloumn": "x_academic_year.id",
                        "order_by": "desc",
                        "data": [
                            {
                                "kondisi": "where",
                                "tbl_coloumn": "institute_id",
                                "tbl_value": institute,
                                "operator": "="
                            },
                            {
                                "kondisi": "where",
                                "tbl_coloumn": "is_active",
                                "tbl_value": "T",
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
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            const data = dataRes[0]
            if (academicId == null) {
                localStorage.setItem('academic_year', data.id)
            }
        })
    }, [institute]);

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div
                                    className="card w-100 bg-lightblue p-lg-5 p-4 mb-5 border-0 rounded-lg d-block float-left">
                                    <h2 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
                                        Hi, {user}
                                        <span className="font-xssss fw-600 text-grey-600 d-block mb-2 ml-1">
                                            Selamat datang di Aneta, Semoga Harimu Menyenangkan.
                                        </span>
                                    </h2>
                                    <img
                                        src="data:image/jpeg;base64,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"
                                        alt="banner"
                                        className="w250 right-15 top-0 position-absolute d-none d-xl-block"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 d-flex mb-4">
                                <h2 className="text-grey-900 ml-1 font-md fw-700">Statistik Sekolah</h2>
                                <select
                                    className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                                    aria-label="Default select example"
                                >
                                    <option>Sort by latest</option>
                                    <option defaultValue="1">Sort by popularity</option>
                                    <option defaultValue="2">
                                        Sort by price : low to high
                                    </option>
                                    <option defaultValue="3">
                                        Sort by price : high to low
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            {iconlList.map((value, index) => (<div key={index} className="col-lg-4">
                                <div
                                    className={`card mb-4 border-0 pt-4 pb-4 text-center alert-${value.status} align-items-center rounded-10`}
                                >
                                    <i
                                        className={`psor text-white btn-round-md font-xs ${value.icon} bg-${value.status}`}
                                    ></i>
                                    <h3 className="fw-700 font-xl text-grey-900 mt-2 ls-3 mb-0">
                                        {value.name}
                                    </h3>
                                    <span className="font-xssss ls-0 text-grey-900 fw-700 mt-0">{value.count}</span>
                                </div>
                            </div>))}
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div
                                    className="card w-100 bg-lightblue p-lg-5 p-4 mb-4 border-0 rounded-lg d-block float-left"
                                    style={{ minHeight: '25vh' }}
                                >
                                    <h2 className="text-center font-weight-bold">Pengumuman</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div
                                    className="card w-100 bg-lightblue p-lg-5 p-4 mb-5 border-0 rounded-lg d-block float-left"
                                    style={{ minHeight: '25vh' }}
                                >
                                    <h2 className="text-center font-weight-bold">Materi Terakhir</h2>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="card w-100 bg-lightblue p-lg-5 p-4 mb-5 border-0 rounded-lg d-block float-left"
                                    style={{ minHeight: '25vh' }}
                                >
                                    <h2 className="text-center font-weight-bold">Tugas Terakhir</h2>
                                </div>
                            </div>
                        </div>
                        <Adminfooter />
                    </div>
                </div>
            </div>
        </Fragment>);
}

export default BerandaGuru;
