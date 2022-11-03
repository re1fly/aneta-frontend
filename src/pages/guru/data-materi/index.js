import React, { Fragment, useState, useEffect } from 'react';
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
    Row,
    Space,
    Table,
} from "antd";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MenuOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import {
    url_by_institute,
    role_guru_create_materi,
    get_where_no_join,
    role_guru_get_matpel,
    global_join_sub_where_get
} from '../../../api/reference';

import axios from 'axios';
import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import { FormCreateMateri } from '../../../components/form/GuruCreateMateri';
import { pageLoad } from '../../../components/misc/loadPage';

function GuruDataMateri() {
    const [grid, setGrid] = useState(false);
    const [dataMateri, setDataMateri] = useState([])
    const [isViewMateri, setIsViewMateri] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const [getKelas, setGetKelas] = useState(null);
    const [dataMapel, setDataMapel] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    console.log(selectedClass);
    const [selectedMapel, setSelectedMapel] = useState(null);

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const userId = localStorage.getItem('user_id');
    const academic_year_id = localStorage.getItem('academic_year')
    const institute = localStorage.getItem('institute')

    const _getDataKelas = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": "rolegurugetsubclass:1:cf6435fc-4a0b-11ed-8f22-927b5be84510",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_sub_kelas_guru",
                            "type": "json",
                            "value": {
                                "user_id": userId
                            }
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            )
            .then(function (response) {
                const data = JSON.parse(response.data.variables[2].value);
                setGetKelas(data?.data);
            })
    }
    const _getDataMapel = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": "rolegurugetmatpel:1:0328ed1e-4a0c-11ed-8f22-927b5be84510",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "update_jadwal_pelajaran",
                            "type": "json",
                            "value": {
                                "user_id": userId,
                                "id_class": selectedClass
                            }
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            )
            .then(function (response) {
                const dataMapelApi = JSON.parse(response.data.variables[2].value);
                const getMapel = dataMapelApi?.data
                setDataMapel(getMapel);
            })
    }

    useEffect(() => {

        _getDataKelas()
        _getDataMapel()

        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_where_get,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_subjects_schedule_contents",
                        "select": [
                            "x_academic_subjects_schedule_contents.tittle",
                            "r_class_type.class_type",
                            "x_academic_subject_master.nama_mata",
                            "x_academic_year.academic_year",
                            "x_academic_subjects_schedule_contents.status"
                        ],
                        "paginate": 10,
                        "join": [
                            {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "class_type_id"
                            },

                            {
                                "tbl_join": "x_academic_subject_master",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "subjects_master_id"
                            },
                            {
                                "tbl_join": "x_academic_year",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "academic_year_id"
                            }


                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "subjects_content_type_id",
                                "tbl_value": "1",
                                "operator": "="
                            },
                            {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "deleted_at",
                                "tbl_value": "",
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "created_by",
                                "tbl_value": userId,
                                "operator": "="
                            }

                        ],
                        "order_coloumn": "x_academic_subjects_schedule_contents.updated_at",
                        "order_by": "desc"
                    }
                },
                {
                    "name": "page",
                    "type": "string",
                    "value": paramsPage
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
            setDataMateri(dataRes?.data?.data);
            const pagination = dataRes?.data?.links;
            setBtnPagination(pagination)
        })

    }, [userId, refreshState, paramsPage, selectedClass])

    useEffect(() => {
        axios.post(url_by_institute, {
            "processDefinitionId": "globaljoinsubwhereget:2:ffda1ab3-2cc0-11ed-aacc-9a44706f3589",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_subjects_schedule_contents",
                        "select": [
                            "x_academic_subjects_schedule_contents.tittle",
                            "r_class_type.class_type",
                            "x_academic_subject_master.nama_mata",
                            "x_academic_year.academic_year",
                            "x_academic_subjects_schedule_contents.status"
                        ],
                        "paginate": 10,
                        "join": [
                            {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "class_type_id"
                            },

                            {
                                "tbl_join": "x_academic_subject_master",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "subjects_master_id"
                            },
                            {
                                "tbl_join": "x_academic_year",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "academic_year_id"
                            }


                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "subjects_content_type_id",
                                "tbl_value": "1",
                                "operator": "="
                            },
                            {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "deleted_at",
                                "tbl_value": "",
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "created_by",
                                "tbl_value": userId,
                                "operator": "="
                            }

                        ],
                        "order_coloumn": "x_academic_subjects_schedule_contents.updated_at",
                        "order_by": "desc"
                    }
                },
                {
                    "name": "page",
                    "type": "string",
                    "value": paramsPage
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
            setDataMateri(dataRes?.data?.data);
            const pagination = dataRes?.data?.links;
            setBtnPagination(pagination)
        })

    }, [userId, refreshState, paramsPage])

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            defaultSortOrder: 'ascend',
            responsive: ['sm'],
        },
        {
            title: 'Nama Materi',
            dataIndex: 'namaMateri',
        },
        {
            title: 'Tingkat Kelas',
            dataIndex: 'tingkatKelas',
            align: 'center',
        },
        {
            title: 'TA / Semester',
            dataIndex: 'ta_semester',
            align: 'center',
        },
        {
            title: 'Mata Pelajaran',
            dataIndex: 'mataPelajaran',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
        },
        {
            title: 'Aksi',
            key: 'action',
            responsive: ['sm'],
            render: (text, record) => (
                <Space size="middle">
                    {/* <Link to="/guru-data-materi-detail">
                        <EyeOutlined style={{ color: "black" }} />
                    </Link> */}
                    <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailMateri(record)} />
                    <EditOutlined style={{ color: "blue" }} onClick={() => viewEditMateri(record)} />
                    <DeleteOutlined style={{ color: 'red' }} />
                </Space>
            ),
        },
    ];

    const data = dataMateri?.map((data, index) => {
        return {
            no: index + 1,
            namaMateri: data.tittle,
            tingkatKelas: data.class_type,
            ta_semester: data.academic_year,
            mataPelajaran: data.nama_mata,
            status: data.status,
        }
    })

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
                            onClick={() => window.history.back()}
                            title="Data Materi"
                        />
                    </div>
                </div>
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <Row>
                        <Col span={12}>
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={viewCreateMateri}>
                                Tambah Data
                            </Button>
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

                <div className="row">
                    <div className="col-lg-3 mb-3">
                        <div className="form-group">
                            <select
                                className="form-control"
                                aria-label="Default"
                                name="pilih_kelas"
                                onChange={(e) => setSelectedClass(e.target.value)}
                                value={selectedClass}
                            >
                                <option value="" selected disabled>
                                    Pilih Kelas
                                </option>
                                {getKelas?.map((data) => (
                                    <option value={data.id}>{data.class_type} - {data.sub_class}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-3 mb-3">
                        <div className="form-group">
                            <select
                                className="form-control"
                                aria-label="Default"
                                name="pilih_mataPelajaran"
                                onChange={(e) => setSelectedMapel(e.target.value)}
                                value={selectedMapel}
                            >
                                <option value="" selected disabled>
                                    Pilih Mata Pelajaran
                                </option>
                                {dataMapel == null ? null : dataMapel?.map((data) => (
                                    <option value={data.id}>{data.nama_mata}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <Table className=""
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900" />
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
                <Adminfooter />
            </div>
        )
    }

    const CreateMateri = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        // const dateNow = new Date().toLocaleString()
        console.log(data);
        const iFrame = data.embed_materi
        const id = iFrame?.split('id=')[1]
        const id_content_wp = id?.split('" width=')[0]
        console.log(id_content_wp);

        axios.post(url_by_institute, {
            "processDefinitionId": role_guru_create_materi,
            "returnVariables": true,
            "variables": [
                {
                    "name": "create_materi_matpel_guru",
                    "type": "json",
                    "value": {
                        "subjects_content_type_id": 1,
                        "user_id": userId,
                        "id_tingkat": data.tingkat_kelas,
                        "id_sub_kelas": data.sub_kelas,
                        "id_matpel": data.mata_pelajaran,
                        "nama_materi": data.nama_materi,
                        "embed_materi": data.embed_materi,
                        "id_content_wp": id_content_wp,
                        "keterangan": data.keterangan,
                        "id_kompetensi": data.kompetensi,
                        "status": "publish",
                        "academic_year_id": academic_year_id,
                        "duration_day": 0,
                        "duration_hourse": 0,
                        "duration_minute": 0,
                    },
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
            console.log("Insert :", response);
            const valueRes = response.data.variables[2].value;
            const valueResObj = JSON.parse(valueRes);
            // console.log(valueResObj);
            if (valueResObj.message == "success insert materi") {
                setIsViewCreate(false)
                setIsViewMateri(true)
                setRefreshState(true)
                pageLoad()
                notification.success({
                    message: 'Sukses',
                    description: 'Materi berhasil ditambahkan.',
                    placement: 'top'
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const viewCreateMateri = () => {
        setIsViewCreate(true)
        setIsViewMateri(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditMateri = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewMateri(false)
        setIsViewDetail(false)
    }

    const viewDetailMateri = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewMateri(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const FormCreate = () => {
        return (
            <FormCreateMateri
                form="Materi"
                setView={() => setIsViewMateri(true)}
                title="Tambah Data"
                submit={CreateMateri}
                isDisabled={false}
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormCreateMateri
                form="materi"
                setView={() => setIsViewMateri(true)}
                title="Edit Data"
                // submit={editGuru}
                isDisabled={false}
            />
        )
    }

    const FormDetail = () => {
        return (
            <FormCreateMateri
                form="materi"
                setView={() => setIsViewMateri(true)}
                title="View Data"
                // submit={createGuru}
                isDisabled={true}

            />
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {
                        isViewMateri ?
                            <ViewMateri /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    isViewDetail ?
                                        <FormDetail /> :
                                        <ViewMateri />
                    }
                    {/* {isViewMateri ? <ViewMateri /> : <TambahMateri />} */}
                </div>
            </div>
        </Fragment>
    );
}

export default GuruDataMateri;