import React, {Fragment, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import Adminfooter from "../../../components/Adminfooter";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Menu,
    message,
    notification,
    PageHeader,
    Progress,
    Row,
    Space,
    Table,
    Tag,
    Upload,
    Select,
    Input, Divider, Collapse, Badge
} from "antd";
import Link from "react-router-dom/es/Link";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MenuOutlined,
    EyeOutlined,
    VideoCameraOutlined,
    DownloadOutlined
} from "@ant-design/icons";
import axios from 'axios';
import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import {
    export_tugas,
    role_guru_download_tugas,
    role_guru_get_list_penilaian_siswa_v2, role_guru_get_nilai_siswa_feedback,
    url_by_institute
} from '../../../api/reference';
import {FormGuruNilaiTugas} from '../../../components/form/GuruNilaiTugas';

function GuruPenilaian() {
    const [grid, setGrid] = useState(false);
    const [getNilai, setGetNilai] = useState([]);
    const [isViewPenilaian, setIsViewPenilaian] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const [refreshState, setRefreshState] = useState(false);
    const [reviewSiswa, setReviewSiswa] = useState([])

    const academicYear = localStorage.getItem('academic_year')
    const instituteId = localStorage.getItem('institute')
    const userId = localStorage.getItem('user_id')

    const params = useParams()
    console.log('params',params)
    const paramsId = params?.id?.split('-');
    const idContent = paramsId[0]
    const uploadTugas = paramsId[1]
    console.log('uploadTugas',uploadTugas)

    const PathNilaiGuru = useSelector((state) => state.dataPathNilaiGuru)
    const kelas = PathNilaiGuru.kelas
    const subKelas = PathNilaiGuru.subKelas
    const mapel = PathNilaiGuru.mapel
    const tugas = PathNilaiGuru.tugas
    const pertemuan = PathNilaiGuru.pertemuan

    const {Option} = Select;
    const children = [];

    const _onSearch = value => console.log(value);
    const handleChange1 = (value) => {
        console.log(`selected ${value}`);
    };

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": role_guru_get_list_penilaian_siswa_v2,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_content": idContent
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
            const nilai = dataRes?.data
            setGetNilai(nilai);
        })
    }, [idContent, refreshState])

    // useEffect(() => {
    //     const onConfirmRefresh = function (event) {
    //         event.preventDefault();
    //         return event.returnValue = "Are you sure you want to leave the page?"; //alertrefresh
    //     }
    //
    //     window.addEventListener("beforeunload", onConfirmRefresh, {capture: true});
    // }, [isViewDetail]);


    const handleDownload = (record) => {
        console.log(record);
        axios.post(url_by_institute,
            {
                "processDefinitionId": role_guru_download_tugas,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_user": record.idSiswa,
                            "id_content": record.idContent,
                            "id_academic": academicYear,
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
            const resData = JSON.parse(response?.data?.variables[2]?.value)
            console.log(response);
            const dataFile = resData?.data?.decode
            const byteCharacters = atob(dataFile);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${record?.namaTugas} ${record?.namaSiswa}.${resData?.data?.extension}`); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }

    const _exportDataExcel = () => {
        console.log(idContent)
        axios.post(url_by_institute, {
            "processDefinitionId": export_tugas,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {

                        "id_content": idContent
                    }
                }
            ]
        }).then(response => {
            const resData = JSON.parse(response.data.variables[2].value)
            console.log(resData);
            const dataExcel = resData.data
            const byteCharacters = atob(dataExcel);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'DataNilai.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }

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
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
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

        const data = getNilai?.map((data, index) => {
            return {
                no: index + 1,
                idSiswa: data.id_user,
                idContent: data.id,
                namaTugas: data.nama_materi,
                namaSiswa: data.nama,
                nilai: data.nilai,
                keterangan: data.keterangan == true ? "Sudah Upload Tugas" : "Belum Upload Tugas",
                isUpload: data.is_upload == true ? true : false,
                id_wp: data.id_content_wp,
                email: data.email,
                feedback: data.feedback
            }
        })

        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                align: 'center',
            },
            {
                title: 'Nama Tugas',
                dataIndex: 'namaTugas',
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
            // {
            //     title: 'Keterangan',
            //     dataIndex: 'keterangan',
            //     align: 'center',
            // },
            {
                title: 'Aksi',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined onClick={() => viewDetailNilai(record)} style={{color: "black"}}/>
                        <EditOutlined onClick={() => viewEditNilai(record)} style={{color: "blue"}}/>
                        {record.keterangan == "Sudah Upload Tugas" ?
                            <>
                                <DownloadOutlined onClick={() => handleDownload(record)} style={{color: "red"}}/>
                            </>
                            : null}
                    </Space>
                ),
            },
        ];

        const columnsUpload = [
            {
                title: 'No',
                dataIndex: 'no',
                align: 'center',
            },
            {
                title: 'Nama Tugas',
                dataIndex: 'namaTugas',
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
                title: 'Keterangan',
                dataIndex: 'keterangan',
                align: 'center',
            },
            {
                title: 'Aksi',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined onClick={() => viewDetailNilai(record)} style={{color: "black"}}/>
                        <EditOutlined onClick={() => viewEditNilai(record)} style={{color: "blue"}}/>
                        {record.keterangan == "Sudah Upload Tugas" ?
                            <>
                                <DownloadOutlined onClick={() => handleDownload(record)} style={{color: "red"}}/>
                            </>
                            : null}
                    </Space>
                ),
            },
        ];

        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title={`Data Nilai / Kelas ${kelas} / ${subKelas} / ${mapel} / ${tugas} / ${pertemuan}`}
                        />
                    </div>
                </div>
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <Row>
                        <Col span={12}>
                            <Button className="mr-4" style={{backgroundColor: '#00a629', color: 'white'}}
                                    shape="round" size='middle'
                                    disabled={getNilai.length < 1 ? true : false}
                                    onClick={() => _exportDataExcel()}>
                                Download Nilai
                            </Button>
                            <Button className="mr-4" style={{backgroundColor: '#00a629', color: 'white'}}
                                    shape="round" size='middle'
                                    disabled={getNilai.length < 1 ? true : false}
                                    onClick={() => alert('tugas upload download')}>
                                Download Semua File upload
                            </Button>

                        </Col>
                        {/* <Col span={4}>
                            <div className="float-right">
                                <Search className="mr-5" placeholder="Cari kata kunci" allowClear
                                    onSearch={_onSearch} style={{ width: 250, lineHeight: '20px' }} />
                            </div>
                        </Col> */}
                    </Row>
                </Card>

                <div className="row">
                    <div className="col-lg-2 mb-2">
                        <div className="form-group">
                            <Select
                                className=""
                                name="tanggal"
                                mode="multiple"
                                allowClear
                                listHeight={250}
                                style={{width: '100%',}}
                                placeholder="Pilih Nama Siswa"
                                onChange={handleChange1}
                            >
                                {children}
                            </Select>
                        </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                        <div className="form-group">
                            <Input
                                className=""
                                aria-label="Default"
                                name="pilih_mataPelajaran"
                                placeholder='Input Nilai'
                            >
                            </Input>
                        </div>
                    </div>
                    <div className="col-lg-2 mb-2">
                        <Button className="" type="primary" shape="round"
                                onClick={() => {
                                }}>
                            Cari
                        </Button>
                    </div>
                </div>

                <Table className=""
                       columns={uploadTugas == "true" ? columnsUpload : columns}
                       dataSource={data}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900"/>
                <Adminfooter/>
            </div>
        )
    }

    const viewEditNilai = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewPenilaian(false)
        setIsViewDetail(false)
    }


    const _getReview = (record) => {
        console.log(record)
        axios.post(url_by_institute, {
            "processDefinitionId": role_guru_get_nilai_siswa_feedback,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_content": record.id_wp,
                        "email": record.email
                    }
                }
            ]
        }).then(response => {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setReviewSiswa(dataRes.data)
            console.log('datadetail: ', dataRes.data)
        })
    }
    const viewDetailNilai = (record) => {
        _getReview(record)
        setTimeout(() => {
            setSelectedUser(record)
            setIsViewPenilaian(false)
            setIsViewEdit(false)
            setIsViewDetail(true)
        }, 2000);

    }

    const FormEdit = () => {
        return (
            <FormGuruNilaiTugas
                setView={() => setIsViewPenilaian(true)}
                title="Edit Nilai Tugas"
                // submit={editTingkatKelas}
                isDisabled={false}
                isReview={true}
                disableName={true}
                isUpload={selectedUser.isUpload}
                idContent={selectedUser.idContent}
                idSiswa={selectedUser.idSiswa}
                nama={selectedUser.namaSiswa}
                nilai={selectedUser.nilai}
            />
        )
    }

    const { Panel } = Collapse;
    const FormDetail = () => {
        return (
            <FormGuruNilaiTugas
                setView={() => setIsViewPenilaian(true)}
                title="View Nilai Tugas"
                isDisabled={true}
                disableName={true}
                isReview={true}
                isUpload={selectedUser.isUpload}
                idContent={selectedUser.idContent}
                idSiswa={selectedUser.idSiswa}
                nama={selectedUser.namaSiswa}
                nilai={selectedUser.nilai}
                review={
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
                                            required
                                        />
                                        <input
                                            type="number"
                                            name="nilai_review"
                                            className="form-control mb-1 w-25"
                                            defaultValue={data.nilai}
                                            required
                                        />
                                    </Panel>
                                    <Panel header="Feedback" key="4">
                                         <textarea
                                             className="form-control mb-0 p-3 lh-16"
                                             rows="5"
                                             placeholder=""
                                             name="feedback_review"
                                             defaultValue={data.feedback}
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
                feedback={selectedUser.feedback}
                dataReview={reviewSiswa}
            />
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {
                        isViewPenilaian ?
                            <ViewPenilaian/> :
                            isViewEdit ?
                                <FormEdit/> :
                                isViewDetail ?
                                    <FormDetail/> :
                                    <ViewPenilaian/>
                    }
                    {/* {isViewPenilaian ? <ViewPenilaian /> : <DetailPenilaian />} */}
                </div>
            </div>
        </Fragment>
    );
}

export default GuruPenilaian;