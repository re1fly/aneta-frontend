import React, { Fragment, useState, useEffect } from 'react';
import Adminfooter from "../../../components/Adminfooter";
import {
    Card,
    Col, Collapse, Divider,
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
import {role_guru_get_nilai_siswa_feedback, url_by_institute} from '../../../api/reference';

function SiswaPenilaian() {
    const [grid, setGrid] = useState(false);
    const [isViewPenilaian, setIsViewPenilaian] = useState(true);
    const [selectedUser, setSelectedUser] = useState([]);
    const [getnilai, setGetNilai] = useState([]);
    const [reviewSiswa, setReviewSiswa] = useState([]);
    const academicId = localStorage.getItem('academic_id')

    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('email')

    const params = useParams();
    const path = params.id.split("-");
    const idMateri = path[0];
    const mapel = path[1];
    const tugas = path[2];
    const { Panel } = Collapse;

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
                        "id_materi": idMateri,
                        "id_academic": academicId
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
            console.log('klik setelah mapel',response)
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setGetNilai(dataRes?.data);
        })

    }, [idMateri, userId])


    const columns = [
        {
            title: 'Nama Tugas',
            dataIndex: 'namaTugas',
            align: 'center',
        },
        {
            title: 'Nilai',
            dataIndex: 'nilai',
            align: 'center',
        },
        {
            title: 'Feedback Guru',
            dataIndex: 'feedback',
            align: 'center',
        },
        {
            title: 'Aksi',
            key: 'action',
            responsive: ['sm'],
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <EyeOutlined onClick={() => dataSiswa(record)} style={{ color: "black" }} />
                </Space>
            ),
        },
    ];

    const data = getnilai.map((dataNilai) => {
        return {
            namaTugas: dataNilai.tittle,
            namaSiswa: dataNilai.nama,
            nilai: dataNilai.score,
            feedback: dataNilai.feedback,
            idContent: dataNilai.file_path
        }
    })

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const _onSearch = value => console.log(value);

    const dataSiswa = (record) => {
        setSelectedUser(record)
        setIsViewPenilaian(false)
        axios.post(url_by_institute, {
            "processDefinitionId": role_guru_get_nilai_siswa_feedback,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_content": record.idContent,
                        "email": userEmail
                    }
                }
            ]
        }).then(response => {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setReviewSiswa(dataRes.data)
        })
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
                                                        placeholder={selectedUser.namaTugas}
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
                                    <label className="mont-font fw-600 font-xss mb-3">
                                        Review Penilaian
                                    </label>
                                    {
                                        reviewSiswa.map((data, index) => {
                                            const time = data.time
                                            const bits = time.split(/\D/);
                                            const dateString = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
                                            const dataJawabanSiswa = data.jawaban
                                            const dataJawabanBenar = data.jawaban_benar

                                            const jawabanBenar = dataJawabanBenar == null ? dataJawabanBenar : dataJawabanBenar.join(', ');
                                            const jawabanSiswa = dataJawabanSiswa == null ? dataJawabanSiswa : dataJawabanSiswa.join(', ');
                                            return (
                                                <>
                                                    {/*<Card title={index+1+'. ' + data.pertanyaan} bordered={false} style={{ width: 300 }}>*/}
                                                    {/*    <p>{data.jawaban}</p>*/}
                                                    {/*</Card>*/}
                                                    <h4>{index + 1 + '. ' + data.pertanyaan}</h4>
                                                    <Collapse bordered={false} defaultActiveKey={['1', '3', '4']}>
                                                        <Panel header="Jawaban Siswa" key="1">
                                                            {jawabanBenar}
                                                        </Panel>
                                                        <Panel header="Jawaban Benar" key="2">
                                                            {jawabanSiswa}
                                                        </Panel>
                                                        <Panel header="Nilai Siswa" key="3">
                                                            <input
                                                                type="hidden"
                                                                name="id_review"
                                                                className="form-control mb-1 w-25"
                                                                defaultValue={data.id}
                                                            />
                                                            <input
                                                                type="number"
                                                                name="nilai_review"
                                                                className="form-control mb-1 w-25"
                                                                defaultValue={data.nilai}
                                                                disabled
                                                            />
                                                        </Panel>
                                                        <Panel header="Feedback" key="4">
                                         <textarea
                                             className="form-control mb-0 p-3 lh-16"
                                             rows="5"
                                             placeholder=""
                                             name="feedback_review"
                                             defaultValue={data.feedback}
                                             disabled
                                         ></textarea>
                                                        </Panel>
                                                    </Collapse>
                                                    {/*<Badge key={index} color={'orange'} text={new Date(time).toUTCString()} />*/}
                                                    <span className='float-right p-2 font-xssss text-ornage'>{new Date(time).toUTCString()}</span>

                                                    <Divider/>
                                                </>
                                            )
                                        })
                                    }
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
                            title={`Data Nilai / ${mapel} / ${tugas}`}
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