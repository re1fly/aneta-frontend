import React, { Fragment, useState, useEffect } from 'react';
import Adminfooter from "../../../components/Adminfooter";
import {
    Card,
    Col,
    PageHeader,
    Row,
    Space,
    Table,
} from "antd";
import Link from "react-router-dom/es/Link";
import {
    AppstoreOutlined,
    MenuOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url_by_institute } from '../../../api/reference';

function SiswaPenilaian() {
    const [grid, setGrid] = useState(false);
    const [isViewPenilaian, setIsViewPenilaian] = useState(true);
    const [selectedUser, setSelectedUser] = useState([])
    const [getnilai, setGetNilai] = useState([]);
    console.log(getnilai);

    const userId = localStorage.getItem('user_id');

    const params = useParams()
    const idMateri = params.id

    useEffect(() => {
        axios.post(url_by_institute, {
            "processDefinitionId": "rolesiswagetnilaisiswa:1:1f1d2009-5033-11ed-8f22-927b5be84510",
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_user": userId,
                        "id_materi": idMateri
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
            console.log(dataRes);
            setGetNilai(dataRes?.data);
        })

    }, [idMateri, userId])

    const columns = [
        {
            title: 'Nama Materi',
            dataIndex: 'namaMateri',
            align: 'center',
        },
        {
            title: 'Nama Siswa',
            dataIndex: 'namaSiswa',
            align: 'center',
        },
        {
            title: 'Nilai',
            dataIndex: 'nilai',
            align: 'center',
        },
        {
            title: 'Aksi',
            key: 'action',
            responsive: ['sm'],
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Link to="/guru-data-materi-detail">
                        <EyeOutlined onClick={() => dataSiswa(record)} style={{ color: "black" }} />
                    </Link>
                </Space>
            ),
        },
    ];

    const data = [
        {
            namaMateri: getnilai.tittle,
            namaSiswa: getnilai.nama,
            nilai: getnilai.score,
        },
    ];

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const _onSearch = value => console.log(value);

    const dataSiswa = (record) => {
        setSelectedUser(record)
        setIsViewPenilaian(false)
    }

    const DetailPenilaian = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewPenilaian(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        View Penilaian
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <form id="mataPelajaran_form"
                                        method="POST">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Materi
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
                                                        placeholder={selectedUser.namaMateri}
                                                        disabled
                                                    >
                                                    </input>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Siswa
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
                                                        placeholder={selectedUser.namaSiswa}
                                                        disabled
                                                    >
                                                    </input>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nilai
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
                                                        placeholder={selectedUser.nilai}
                                                        disabled
                                                    >
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ViewPenilaian = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Nilai"
                        />
                    </div>
                </div>
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <Row>
                        <Col span={12}>
                        </Col>
                        <Col span={12}>
                            <div className="float-right">
                                <Search className="mr-5" placeholder="Cari kata kunci" allowClear
                                    onSearch={_onSearch} style={{ width: 250, lineHeight: '20px' }} />
                                {grid == false ?
                                    <a>
                                        <AppstoreOutlined style={{ fontSize: '30px' }}
                                            onClick={() => setGrid(true)} />
                                    </a> :
                                    <a>
                                        <MenuOutlined style={{ fontSize: '30px' }}
                                            onClick={() => setGrid(false)} />
                                    </a>}
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Table className=""
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900" />
                <Adminfooter />
            </div>
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {isViewPenilaian ? <ViewPenilaian /> : <DetailPenilaian />}
                </div>
            </div>
        </Fragment>
    );
}

export default SiswaPenilaian;