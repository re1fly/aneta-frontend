import React, { Fragment, useEffect, useState } from 'react';
import Adminfooter from '../../../components/Adminfooter';
import axios from "axios";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import {global_join_sub_first, url_by_institute} from "../../../api/reference";

function KelasSiswa() {
    const [profileSiswa, setProfileSiswa] = useState([]);
    const [getKelasSiswa, setGetKelas] = useState([]);
    console.log(getKelasSiswa);

    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');
    const institute = localStorage.getItem('institute');

    useEffect(() => {
        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_first,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub_first",
                    "type": "json",
                    "value": {
                        "tbl_induk": "users",
                        "select": [
                            "users.name",
                            "users.id as id_user",
                            "m_user_profile.id as id_m_user_profile",
                            "m_user_profile.nisn",
                            "m_user_profile.place_of_birth",
                            "m_user_profile.date_of_birth",
                            "m_user_profile.mobile_phone",
                            "m_user_profile.address",
                            "m_user_profile.district_id",
                            "m_user_profile.city_id",
                            "m_user_profile.state_id",
                            "r_city.city",
                            "r_state.state",
                            "r_district.district",
                            "r_sub_district.sub_district"
                        ],

                        "join": [

                            {
                                "tbl_join": "m_user_profile",
                                "refkey": "user_id",
                                "tbl_join2": "users",
                                "foregenkey": "id"
                            }, {
                                "tbl_join": "r_district",
                                "refkey": "id",
                                "tbl_join2": "m_user_profile",
                                "foregenkey": "district_id"

                            }, {
                                "tbl_join": "r_state",
                                "refkey": "id",
                                "tbl_join2": "m_user_profile",
                                "foregenkey": "state_id"
                            }, {
                                "tbl_join": "r_sub_district",
                                "refkey": "id",
                                "tbl_join2": "m_user_profile",
                                "foregenkey": "sub_discrict_id"
                            }, {
                                "tbl_join": "r_city",
                                "refkey": "id",
                                "tbl_join2": "m_user_profile",
                                "foregenkey": "city_id"
                            }
                        ],
                        "where": [
                            {
                                "tbl_coloumn": "users",
                                "tbl_field": "id",
                                "tbl_value": userId,
                                "operator": "="
                            }
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
            console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setProfileSiswa([dataRes?.data]);
        })

        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_first,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub_first",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_students",
                        "select": ["m_user_profile.nisn", "users.name", "x_academic_class.class", "x_academic_year.semester", "x_academic_year.academic_year", "x_academic_class.sub_class", "r_class_type.class_type"],
                        "join": [
                            {
                                "tbl_join": "users",
                                "refkey": "id",
                                "tbl_join2": "x_academic_students",
                                "foregenkey": "user_id"
                            },
                            {
                                "tbl_join": "m_user_profile",
                                "refkey": "user_id",
                                "tbl_join2": "users",
                                "foregenkey": "id"

                            }, {
                                "tbl_join": "x_academic_class",
                                "refkey": "id",
                                "tbl_join2": "x_academic_students",
                                "foregenkey": "class_id"
                            }, {
                                "tbl_join": "m_institutes",
                                "refkey": "id",
                                "tbl_join2": "users",
                                "foregenkey": "institute_id"
                            }, {
                                "tbl_join": "x_academic_year",
                                "refkey": "institute_id",
                                "tbl_join2": "m_institutes",
                                "foregenkey": "id"
                            }, {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_class",
                                "foregenkey": "class"
                            }
                        ],

                        "where": [
                            {
                                "tbl_coloumn": "x_academic_year",
                                "tbl_field": "is_active",
                                "tbl_value": "T",
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_students",
                                "tbl_field": "user_id",
                                "tbl_value": userId,
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_class",
                                "tbl_field": "deleted_at",
                                "tbl_value": "",
                                "operator": "="
                            }
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
            console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setGetKelas([dataRes?.data])
        })
    }, [userId])

    const kelasSiswa = getKelasSiswa.map((siswa, index) => {
        // const kelas = getKelasSiswa[0].class
        // const kelasStr = JSON.stringify(kelas)
        // const tingkatKelas = kelasStr.charAt(7)

        return {
            kelas: siswa.class_type,
            subKelas: siswa.sub_class,
            semester: siswa.semester,
            tahunAkademik: siswa.academic_year,
        }
    })

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row">
                            {kelasSiswa.map((value, index) => (
                                // console.log(value.class);
                                <div className="col-lg-4">
                                    <div
                                        className="card w-100 bg-lightblue p-lg-3 mb-4 border-0 rounded-lg d-block float-left"
                                        style={{ minHeight: '25vh' }}
                                    >
                                        <h2 className="text-center font-weight-bold">Kelas Saya Saat Ini</h2>
                                        <h1 className="text-center display4-size font-weight-bold mb-1"> {value.kelas} / {value.subKelas}</h1>
                                        <h4 className="text-center font-xss">Semester : {value.semester}</h4>
                                        <h3 className="text-center font-xss mb-0">Tahun Akademik : {value.tahunAkademik}</h3>
                                    </div>
                                </div>
                            ))}

                            {profileSiswa.map((value, index) => (
                                <div className="col-lg-8">
                                    <div
                                        className="card w-100 bg-lightblue p-lg-3 p-4 mb-4 border-0 rounded-lg d-block float-left"
                                        style={{ minHeight: '25vh' }}
                                    >
                                        <h2 className="text-center font-weight-bold mb-2">Data Pribadi</h2>
                                        <div className='row'>
                                            <img
                                                src={`assets/images/user.png`}
                                                alt="icon"
                                                className="p-1 ml-3 w125"
                                            />
                                            <div className='col-8'>
                                                <div className='row'>
                                                    <p className='col-lg-5 strong mb-0 mt-1'>NISN </p>
                                                    <p className='col-lg-7 strong mb-0'>: {value.nisn}</p>
                                                </div>
                                                <div className='row'>
                                                    <p className='col-lg-5 strong mb-0'>Nama Lengkap </p>
                                                    <p className='col-lg-7 strong mb-0'>: {value.name}</p>
                                                </div>
                                                <div className='row'>
                                                    <p className='col-lg-5 strong mb-0'>Tanggal Lahir </p>
                                                    <p className='col-lg-7 strong mb-0'>: {value.date_of_birth}</p>
                                                </div>
                                                <div className='row'>
                                                    <p className='col-lg-5 strong mb-0'>Wali Kelas </p>
                                                    <p className='col-lg-7 strong mb-0'>: Sujoko {value.waliKelas}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div
                                    className="card w-100 bg-lightblue p-lg-5 p-4 mb-5 border-0 rounded-lg d-block float-left"
                                    style={{ minHeight: '25vh' }}
                                >
                                    <h2 className="text-center font-weight-bold"></h2>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="card w-100 bg-lightblue p-lg-5 p-4 mb-5 border-0 rounded-lg d-block float-left"
                                    style={{ minHeight: '25vh' }}
                                >
                                    <h2 className="text-center font-weight-bold"></h2>
                                </div>
                            </div>
                        </div>
                        <Adminfooter />
                    </div>
                </div>
            </div>
        </Fragment>);
}

export default KelasSiswa;
