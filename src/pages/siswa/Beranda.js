import React, {Fragment, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import Adminfooter from "../../components/Adminfooter";
import {Dropdown, Menu, message, Button} from "antd";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";


function BerandaSiswa() {
    const user = localStorage.getItem('user_name');
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
            code: 'BREAK',
            time: '10.00 - 10.30',
            title: 'ISTIRAHAT',
            name: '',
            tag1: '',
            tag2: '',
            tag3: ' ',
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
            code: 'Break',
            time: '12.00 - 12.30',
            title: 'ISTIRAHAT',
            name: '',
            tag1: '',
            tag2: '',
            tag3: ' ',
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

    const _onSelectMenu = ({key}) => {
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
                <Navheader/>
                <div className='main-content'>
                    <Appheader/>
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
                                        <div className="card w-100 bg-lightblue p-lg-5 p-4 mb-4 border-0 rounded-lg d-block float-left"
                                             style={{minHeight: '25vh'}}>
                                            <h2 className="text-center font-weight-bold">Pengumuman</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex alignt-items-center justify-content-between mb-4">
                                    <div className="strong">
                                        <h5 className='font-xsss pt-1 mb-0'>Senin, 20 maret 2022 | 03:40 WIB</h5>
                                    </div>
                                    <div className="d-flex align-items-center  pl-4 gap-1 pr-8">
                                        <h5 className='mb-0 mt-1'>
                                            <i className="feather-calendar mr-2"></i>
                                        </h5>
                                        <Button className="mr-1 px-1" style={{height: '25px'}}>
                                            <i className='feather-chevron-left'></i>
                                        </Button>
                                        <Button className=" shadow-md px-1" style={{height: '25px'}}>
                                            <i className='feather-chevron-right'></i>
                                        </Button>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className="row">
                                        {channelList.map((value, index) => (
                                            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                                <Link to='/siswa-kelas-materi'>
                                                    <div className="card mb-4 d-block w-100 shadow-md rounded-lg p-xxl-5 p-4 border-0 text-center">
                                                        <span
                                                            className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                                            Online
                                                        </span>
                                                        <div className='d-flex justify-content-between'>
                                                            <h4 className='media strong mt-4'>{value.code}</h4>
                                                            <h4 className='media strong mt-4'>{value.time}</h4>
                                                        </div>
                                                        <h4 className="media fw-700 display1-size mt-1 mb-1">{value.title}</h4>
                                                        <h2 className="media fw-700 font-xs mt-1 mb-4">{value.name}</h2>
                                                        <div className="clearfix "></div>
                                                        <div className='media'>
                                                            {value.tag1 ? (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                                                    {value.tag1}
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {value.tag2 ? (
                                                                <span
                                                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                                                    {value.tag2}
                                                                </span>
                                                            ) : (
                                                                ''
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
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}

export default BerandaSiswa;