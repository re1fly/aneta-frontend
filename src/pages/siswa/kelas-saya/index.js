import React, { Fragment, useEffect } from 'react';
import Adminfooter from '../../../components/Adminfooter';
import axios from "axios";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

function KelasSiswa() {
    const user = localStorage.getItem('user_name');

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-4">
                                <div
                                    className="card w-100 bg-lightblue p-lg-3 mb-4 border-0 rounded-lg d-block float-left"
                                    style={{ minHeight: '25vh' }}
                                >
                                    <h2 className="text-center font-weight-bold">Kelas Saya Saat Ini</h2>
                                    <h1 className="text-center display4-size font-weight-bold mb-1">2 / B</h1>
                                    <h4 className="text-center font-xss">Semester : II</h4>
                                    <h3 className="text-center font-xss mb-0">Tahun Akademik : 2022</h3>
                                </div>
                            </div>
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
                                                <p className='col-lg-7 strong mb-0'>: 8122-222-33838-8282</p>
                                            </div>
                                            <div className='row'>
                                                <p className='col-lg-5 strong mb-0'>Nama Lengkap </p>
                                                <p className='col-lg-7 strong mb-0'>: {user}</p>
                                            </div>
                                            <div className='row'>
                                                <p className='col-lg-5 strong mb-0'>Tanggal Lahir </p>
                                                <p className='col-lg-7 strong mb-0'>: 20 Desember 2014</p>
                                            </div>
                                            <div className='row'>
                                                <p className='col-lg-5 strong mb-0'>Wali Kelas </p>
                                                <p className='col-lg-7 strong mb-0'>: Sucipto Suroso S.Pd</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
