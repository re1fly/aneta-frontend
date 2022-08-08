import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Adminfooter from "../../components/Adminfooter";
import { Dropdown, Menu, message, Button } from "antd";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";

import { InboxOutlined } from "@ant-design/icons";

import axios from "axios";
import { BASE_URL } from "../../api/Url";
import { dateNow } from "../../components/misc/date";

function BerandaSiswa() {
    const user = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id');
    const institute = localStorage.getItem('institute')
    const academicId = localStorage.getItem('academic_id')

    const [getJadwalPelajaran, setGetJadwalPelajaran] = useState([]);
    // console.log(getJadwalPelajaran);

    const GetRealTimeDate = () => {
        const [dt, setDt] = useState(new Date().toLocaleString());
        const dater = new Date();
        const minute = dater.getMinutes().toString();
        const hour = dater.getHours().toString();
        const seconds = dater.getSeconds().toString();

        useEffect(() => {
            let secTimer = setInterval(() => {
                setDt(new Date().toLocaleString());
            }, 1000);

            return () => clearInterval(secTimer);
        }, []);

        var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        var months = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];

        return {
            daysName: days[dater.getDay()],
            month: months[dater.getMonth()],
            date: dater.getDate(),
            year: dater.getFullYear(),
            hours: hour?.length === 1 ? `0${hour}` : hour,
            minutes: minute?.length === 1 ? `0${minute}` : minute, seconds, dt,
            monthNumber: dater.getMonth(),
        };
    };

    const { daysName, date, month, year, hours, minutes } = GetRealTimeDate();
    const currentDate = `${daysName}, ${date} ${month} ${year} | ${hours} : ${minutes}`;
    const today = daysName.toLocaleLowerCase();
    const [todayData, setTodayData] = useState([]);

    const checkTodayData = () => {
        getJadwalPelajaran.map((item) => {
            if(item?.hari === today){
                setTodayData(item?.data)
            }
        })
    }
    
    // console.log('DATA detail ==', JSON.stringify(todayData, null, 2));

    useEffect(() => {
        axios.post(BASE_URL, {
            "processDefinitionId": "e81e093e-028d-11ed-ac5e-66fc627bf211",
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "user_id": userId,
                        "academic_id": academicId
                    }
                }
            ]
        },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            // console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            console.log(dataRes.data);
            setGetJadwalPelajaran(dataRes?.data);
        })

        axios.post(BASE_URL, {
            "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
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
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            const data = dataRes[0]
            console.log(data);
            if ( academicId == null ) {
                localStorage.setItem('academic_id', data.id)
            }
        })
    }, [userId]);

    useEffect(() => {
        checkTodayData()
    }, [getJadwalPelajaran])

    const channelList = [
        {
            code: 'TM01',
            time: '07.00 - 08.30',
            title: 'TEMATIK 1',
            name: 'Ibu Sri Wahyuni S.pd',
            tag1: 'Materi',
            tag2: 'Tugas Harian',
            tag3: '',
        },
        {
            code: 'TM02',
            time: '08.30 - 10.00',
            title: 'TEMATIK 2',
            name: 'Ibu Wasilatul M S.pd',
            tag1: 'Materi',
            tag2: 'Quiz',
            tag3: '',
        },
        {
            code: 'TM03',
            time: '10.30 - 12.00',
            title: 'Tematik 3',
            name: 'Bapak Soekamti S.pd',
            tag1: 'Matrei',
            tag2: 'Praktek',
            tag3: '',
        },
        {
            code: 'TM04',
            time: '12.30 - 14.00',
            title: 'TEMATIK 4',
            name: 'Bapak Johnny Deep S.pd',
            tag1: 'Materi',
            tag2: 'Tugas Harian',
            tag3: '',
        },
    ];

    const _onSelectMenu = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    return (
        <Fragment>
            <div id="main-wrapper">
                <Navheader />
                <div className='main-content'>
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row mb-3">
                            <div className="col-lg-12">
                                <div className="card w-100 bg-lightblue p-lg-5 p-4 mb-5 border-0 rounded-lg d-block float-left">
                                    <h2 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
                                        Hi, {user}
                                        <span className="font-xssss fw-600 text-grey-600 d-block mb-2 ml-1">
                                            Selamat datang di Aneta, Semoga Harimu Menyenangkan.
                                        </span>
                                    </h2>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card w-100 bg-lightblue p-4 mb-4 border-0 rounded-lg d-block float-left">
                                            <h2 className="text-center pb-5 font-weight-bold">Pengumuman</h2>
                                        </div>
                                    </div>
                                </div>
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
                                </div>
                                <div className=''>
                                    <div className="row">
                                        {todayData?.length === 0 ? ""
                                        // <InboxOutlined className='text-center' style={{fontSize: "80px"}}/>
                                        : 
                                        todayData?.map((value, index) => (
                                            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                                <Link to='/siswa-kelas-materi'>
                                                    <div className="card mb-4 d-block w-100 shadow-md rounded-lg p-xxl-5 p-4 border-0 text-center">
                                                        <span
                                                            className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                                            Online
                                                        </span>
                                                        <div className='d-flex justify-content-between'>
                                                            <h4 className='media strong mt-4'>{value.code_pelajaran}</h4>
                                                            <h4 className='media strong mt-4'>{value.jam_mulai}</h4>
                                                        </div>
                                                        <h4 className="media fw-700 font-lg mt-1 mb-1">{value.mata_pelarajan}</h4>
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
                                                                    Materi kosong
                                                                </span>
                                                            )}
                                                            <div className='ml-2'></div>
                                                            {value.tag2 ? (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                                                    {value.tag2}
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                                                    Tugas Kosong
                                                                </span>
                                                            )}
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
                                                </Link>
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

export default BerandaSiswa;