import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PathPertemuanJadwalGuru} from '../../../redux/Action';
import axios from 'axios';
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
    Select, Spin,
} from "antd";
import Link from "react-router-dom/es/Link";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MenuOutlined,
    EyeOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import {global_join_sub_where_get, role_guru_get_pertemuan, url_by_institute} from '../../../api/reference';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {Modal} from "react-bootstrap";

function GuruListPertemuanTugas() {
    const [grid, setGrid] = useState(false);
    const [getTugas, setGetTugas] = useState([])
    const [getSiswa, setGetSiswa] = useState([])
    const [loading, setLoading] = useState(true);

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const academicYear = localStorage.getItem('academic_year')
    const userId = localStorage.getItem('user_id')

    const params = useParams()
    const idTugas = params?.id

    const dispatch = useDispatch();
    const pathJadwalGuru = useSelector((state) => state.dataPathJadwalGuru);
    const kelas = pathJadwalGuru.kelas
    const subKelas = pathJadwalGuru.subKelas
    const mapel = pathJadwalGuru.mapel
    const tugas = pathJadwalGuru.materi

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showDataStudent = (record) => {
        setGetSiswa([])
        setLoading(true)
        handleShow()
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_subjects_schedule_contents_meeting_status",
                            "select": [
                                "x_academic_subjects_schedule_contents_meeting_status.status",
                                "users.name"
                            ],
                            "paginate": 100,

                            "join": [
                                {
                                    "tbl_join": "x_academic_students",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting_status",
                                    "foregenkey": "student_id"
                                }, {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "user_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_students",
                                    "tbl_field": "deleted_at",
                                    "tbl_value": "",
                                    "operator": "="
                                }, {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents_meeting_status",
                                    "tbl_field": "meeting_id",
                                    "tbl_value": record.id,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "users.name",
                            "order_by": "asc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": "1"
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            const data = dataRes?.data?.data
            setGetSiswa(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": role_guru_get_pertemuan,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_content": idTugas
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
            const dataTugas = dataRes?.data
            setGetTugas(dataTugas)
            const pagination = dataRes?.data?.links;
            setBtnPagination(pagination)
        })
    }, [userId, paramsPage])

    let history = useHistory();
    const handleRouter = (id, pertemuan) => {
        dispatch(PathPertemuanJadwalGuru(pertemuan))
        history.push(`/guru-tugas-${id}`)
    }

    const data = getTugas.map((data, index) => {
        return {
            no: index + 1,
            id: data.id,
            namaPertemuan: data.meeting_name,
            startDate: data.date_start,
            endDate: data.date_end,
            progress: data.persentase
            // tanggal: data.date,
            // jam: `${data.time_start} - ${data.time_end}`,
        }
    })

    const dataSiswa = getSiswa.map((data, index) => {
        return {
            no: index + 1,
            namaSiswa: data.name,
            statusSiswa: data.status
        }
    })

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            align: 'center',
        },
        {
            title: 'Nama Pertemuan',
            dataIndex: 'namaPertemuan',
            align: 'center',
        },
        {
            title: "Tanggal Mulai",
            dataIndex: "startDate",
            align: "center",
        },
        {
            title: "Tanggal Selesai",
            dataIndex: "endDate",
            align: "center",
        },
        {
            title: "Progress",
            dataIndex: "progress",
            align: "center",
            render: (text, record, progress, index) => (
                <>
                    <Space size="middle" style={{cursor: "pointer"}}>
                        <Progress
                            percent={record.progress} success={{
                            percent: {progress},
                        }}
                            onClick={() => showDataStudent(record)}
                        />
                    </Space>
                </>
            )
        },
        {
            title: 'Aksi',
            key: 'action',
            responsive: ['sm'],
            render: (text, record) => (
                <Space size="middle" className='cursor-pointer'>
                    <EyeOutlined onClick={() => handleRouter(record.id, record.namaPertemuan)}
                                 style={{color: "black"}}/>
                </Space>
            ),
        },
    ];
    const columnsSiswa = [
        {
            title: 'No',
            dataIndex: 'no',
            align: 'center',
        },
        {
            title: 'Nama',
            dataIndex: 'namaSiswa',
            align: 'center',
        },
        {
            title: "Status",
            dataIndex: "statusSiswa",
            align: "center",
            render: (statusSiswa, record) => {
                let color = statusSiswa == 0 ? "red" : statusSiswa == 1 ? "blue" : "green";
                return (
                    <Tag style={{borderRadius: "15px"}} color={color} key={statusSiswa}>
                        {statusSiswa == 0 ? "Belum Dikerjakan" : statusSiswa == 1 ? "Sedang Dikerjakan" : "Telah Dikerjakan"}
                    </Tag>
                );
            }
        },
    ]

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

        const _onSearch = value => console.log(value);

    const ViewMateri = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title={`Jadwal Pelajaran / Kelas ${kelas} / ${subKelas} / ${mapel} / Tugas / ${tugas}`}
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

                <Table className=""
                       columns={columns}
                       dataSource={data}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900"/>
                <div className='text-center mt-4'>
                    {btnPagination?.map((dataBtn) => {
                        const labelBtn = dataBtn.label;
                        const label = labelBtn
                            .replace(/(&laquo\;)/g, "")
                            .replace(/(&raquo\;)/g, "");
                        let linkUrl = dataBtn.url;

                        if (linkUrl != null) {
                            linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                        }

                        return (
                            <Button
                                className="btn btn-primary mr-2 font-xssss fw-600"
                                disabled={linkUrl == null ? true : false}
                                onClick={() => {
                                    setParamsPage(linkUrl);
                                }}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </div>
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
                    <Modal show={show} onHide={handleClose} size="lg"
                           aria-labelledby="contained-modal-title-vcenter"
                           centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h3>List Siswa</h3>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Spin tip="Loading..." spinning={loading}>
                            <Table className=""
                                   columns={columnsSiswa}
                                   dataSource={dataSiswa}
                                   onChange={onChangeTable}
                                   pagination={false}
                                   scroll={{ y: 500 }}
                                   rowClassName="bg-greylight text-grey-900"/>
                            </Spin>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <ViewMateri/>
                </div>
            </div>
        </Fragment>
    );
}

export default GuruListPertemuanTugas;