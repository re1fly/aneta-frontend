import React, { Fragment } from 'react';
import { PageHeader } from 'antd';
import { FilePdfOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';


export default function MateriSiswa() {
  return (
    <Fragment>
        <div id="main-wrapper">
            <Navheader/>
            <div className='main-content'>
                <Appheader/>
                <div className="container px-3 py-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="flex-wrap">
                                <PageHeader
                                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="TM01 - Tematik 1 - Materi"
                                />
                                <Link
                                    to="/siswa-kelas-materi"
                                    className="w-50 bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                >
                                    Materi
                                </Link>
                                <Link
                                    to="/siswa-kelas-tugas"
                                    className="card w-50 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                >
                                    Tugas Harian
                                </Link>
                                <h4 className="mt-5 strong text-lg">1.1 Kerajaan Kelinci dan Pak Tani</h4>
                                <img src="https://clickitregistry.com/wp-content/uploads/2020/12/pile-of-books.jpg"
                                    className="w300 rounded-lg mt-2"/>
                                <h5 className=" mt-4">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                    <br/>
                                    <br/>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                </h5>
                                <h5 className="strong text-md mt-4">Bahan Ajar</h5>
                                <div className="d-flex mt-2 mb-5">
                                    <div className="h5 text-center cursor-pointer">
                                        <i style={{border: 'none'}}>
                                            <FilePdfOutlined style={{ fontSize: '40px'}}/>
                                        </i>
                                        <p className="font-xssss">file 4.pdf</p>
                                    </div>
                                    <div className="h5 text-center ml-2 cursor-pointer">
                                        <i style={{border: 'none'}}>
                                            <FilePdfOutlined style={{ fontSize: '40px'}}/>
                                        </i>
                                        <p className="font-xssss">file 4.pdf</p>
                                    </div>
                                    <div className="h5 text-center ml-2 cursor-pointer">
                                        <i style={{border: 'none'}}>
                                            <FilePdfOutlined style={{ fontSize: '40px'}}/>
                                        </i>
                                        <p className="font-xssss">file 4.pdf</p>
                                    </div>
                                    <div className="h5 text-center ml-2 cursor-pointer">
                                        <i className="text-center" style={{border: 'none'}}>
                                            <FilePdfOutlined style={{ fontSize: '40px'}}/>
                                        </i>
                                        <p className="font-xssss">file 4.pdf</p>
                                    </div>
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