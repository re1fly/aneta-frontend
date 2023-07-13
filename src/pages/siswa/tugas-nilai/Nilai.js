import React, {Fragment, useState, useEffect} from 'react';
import Adminfooter from "../../../components/Adminfooter";
import {
    Card,
    Col, Collapse, Divider,
    PageHeader,
    Row,
    Space, Spin,
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
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {
    role_guru_get_nilai_siswa_feedback,
    role_siswa_get_nilai_siswa_2,
    url_by_institute
} from '../../../api/reference';
import {DataNotFound} from "../../../components/misc/DataNotFound";

function SiswaPenilaian() {
    const [grid, setGrid] = useState(false);
    const [isViewPenilaian, setIsViewPenilaian] = useState(true);
    const [selectedUser, setSelectedUser] = useState([]);
    const [getnilai, setGetNilai] = useState([]);
    const [reviewSiswa, setReviewSiswa] = useState([]);
    const academicId = localStorage.getItem('academic_id')

    const [loading, setLoading] = useState(true);
    const [countRender, setCountRender] = useState(0)
    const [dataSuccess, setDataSuccess] = useState(false)

    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('email')

    const params = useParams();
    const path = params.id.split("-");
    const idMateri = path[0];
    const mapel = path[1];
    const tugas = path[2];
    const {Panel} = Collapse;

    const _getNilai = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": role_siswa_get_nilai_siswa_2,
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
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            const responseCode = dataRes.code;
            setGetNilai(dataRes?.data);
            if (responseCode == 200) {
                setLoading(false)
                setDataSuccess(true)
            } else {
                setDataSuccess(true)
                setCountRender(countRender + 1)
            }
        })
    }

    const _loadingData = () => {
        if (dataSuccess == false) {
            _getNilai()
        }
    }

    if (countRender > 1 && countRender < 4) {
        setInterval(_loadingData, 5000)
    }

    useEffect(() => {
        _getNilai()
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
                    <EyeOutlined onClick={() => {
                        setLoading(true)
                        dataSiswa(record)
                    }} style={{color: "black"}}/>
                </Space>
            ),
        },
    ];

    const data = getnilai.map((dataNilai) => {
        console.log(dataNilai)
        return {
            namaTugas: dataNilai.tittle,
            namaSiswa: dataNilai.nama,
            nilai: dataNilai.score,
            feedback: dataNilai.feedback,
            idContent: dataNilai.file_path,
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
            const data = dataRes?.data;
            setReviewSiswa(data)

            if (data.length >= 1) {
                setLoading(false)
                setDataSuccess(true)
            } else {
                setDataSuccess(false)
                setLoading(false)
                setCountRender(countRender + 1)
            }
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
                                    <i onClick={() => setIsViewPenilaian(true)}
                                       className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
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
                                    <Spin tip="Loading..." spinning={loading} className='mt-5'>
                                        {
                                            reviewSiswa?.map((data, index) => {
                                                const time = data.time
                                                const bits = time.split(/\D/);
                                                const dateString = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
                                                const dataJawabanSiswa = data.jawaban
                                                const dataJawabanBenar = data.jawaban_benar

                                                const jawabanBenar = dataJawabanBenar == null ? dataJawabanBenar : dataJawabanBenar.join(', ');
                                                const jawabanSiswa = dataJawabanSiswa == null ? dataJawabanSiswa : dataJawabanSiswa.join(', ');
                                                if (data.image_file_path == null && data.audio_file_path == null && data.vidio_mime == "video/YouTube") {
                                                    var sampleUrl = data.vidio_file_path;
                                                    var ytId = sampleUrl.split("v=")[1].substring(0, 11)
                                                }
                                                console.log(selectedUser)
                                                return (
                                                    reviewSiswa.length >= 1 ?
                                                        <>
                                                            {/*<Card title={index+1+'. ' + data.pertanyaan} bordered={false} style={{ width: 300 }}>*/}
                                                            {/*    <p>{data.jawaban}</p>*/}
                                                            {/*</Card>*/}
                                                            {
                                                                data.audio_file_path == null && data.vidio_file_path == null && data.image_file_path == null ? null :
                                                                    data.audio_file_path == null && data.vidio_file_path == null ?
                                                                        <img
                                                                            src={`https://lms.aneta.id:8443/wp-content/uploads/h5p/content/${selectedUser.idContent}/${data.image_file_path}`}
                                                                            width={data.image_file_width}
                                                                            height={data.image_file_height}
                                                                            style={{maxWidth: 350, maxHeight: 350}}
                                                                            className='d-block ml-auto mr-auto'
                                                                        /> :
                                                                        data.image_file_path == null && data.audio_file_path == null && data.vidio_mime == "video/YouTube" ?
                                                                            <iframe
                                                                                src={`https://www.youtube.com/embed/${ytId}`}
                                                                                width="100%"
                                                                                style={{minHeight: '400px'}}
                                                                                allowFullScreen
                                                                                frameBorder={0}
                                                                            /> :
                                                                            data.image_file_path == null && data.audio_file_path == null && data.vidio_mime == "video/mp4" ?
                                                                                <iframe
                                                                                    src={`https://lms.aneta.id:8443/wp-content/uploads/h5p/content/${selectedUser.idContent}/${data.vidio_file_path}`}
                                                                                    width="100%"
                                                                                    style={{minHeight: '400px'}}
                                                                                    allowFullScreen
                                                                                    frameBorder={0}
                                                                                /> :
                                                                                data.vidio_file_path == null && data.image_file_path == null ?
                                                                                    <audio controls>
                                                                                        <source
                                                                                            src={`https://lms.aneta.id:8443/wp-content/uploads/h5p/content/${selectedUser.idContent}/${data.audio_file_path}`}
                                                                                            type="audio/mpeg"/>
                                                                                    </audio> : null
                                                            }
                                                            <h4 className="mt-3">{index + 1 + '. ' + data.pertanyaan}</h4>
                                                            <Collapse bordered={false}
                                                                      defaultActiveKey={['1', '3', '4']}>
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
                                                                <Panel header="Hasil Nilai Siswa (Perhitungan baru)"
                                                                       key="4">
                                                                    <input
                                                                        type="number"
                                                                        name="nilai_siswa_baru"
                                                                        className="form-control mb-1 w-25"
                                                                        defaultValue={data.nilai_akumulasi}
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
                                                            <span
                                                                className='float-right p-2 font-xssss text-ornage'>{new Date(time).toUTCString()}</span>

                                                            <Divider/>
                                                        </> : <p> - </p>
                                                )
                                            })
                                        }
                                    </Spin>
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
                                        onSearch={_onSearch} style={{width: 250, lineHeight: '20px'}}/>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Spin tip="Loading..." spinning={loading} className='mt-5'>
                    <Table className=""
                           columns={columns}
                           dataSource={data}
                           onChange={onChangeTable}
                           pagination={false}
                           rowClassName="bg-greylight text-grey-900"/>
                </Spin>
                <Adminfooter/>
            </div>
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {isViewPenilaian ? <ViewPenilaian/> : <DetailPenilaian/>}
                </div>
            </div>
        </Fragment>
    );
}

export default SiswaPenilaian;