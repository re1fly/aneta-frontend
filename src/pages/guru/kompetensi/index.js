import React, { Fragment, useEffect, useState } from "react"
import axios from "axios";
import {
    Menu,
    Card,
    Row,
    Col,
    Button,
    Dropdown,
    message,
    Select,
    Tag,
    Space,
    notification,
    Table,
    Input,
    PageHeader
} from "antd";
import {
    DownOutlined,
    AppstoreOutlined,
    MenuOutlined,
    EditOutlined,
    DeleteOutlined,
    EllipsisOutlined, RollbackOutlined
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import { Link } from 'react-router-dom';

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import Filter from "../../../components/Filter";
import { FormKompetensi } from "../../../components/form/Adminkompetensi";
import Swal from "sweetalert2";
import {
    get_data_pelajaran_by_tingkat,
    get_kompetensi_dashboard, get_kompetensi_pertemuan_role_guru,
    get_where_no_join, global_delete_record, global_join_sub_where_get, insert_kompetensi,
    role_guru_get_matpel,
    url_by_institute
} from "../../../api/reference";

export default function KompetensiGuru() {
    const [grid, setGrid] = useState(false)
    const [isViewKompetensi, setIsViewKompetensi] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    // const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const institute = localStorage.getItem("institute");
    const academicYear = localStorage.getItem('academic_year')
    const userId = localStorage.getItem('user_id')

    const [getKompetensi, setGetKompetensi] = useState([]);
    const [getPelajaran, setGetPelajaran] = useState([]);
    const [getKelas, setGetKelas] = useState([]);
    const [getkompetensiInsert, setGetKompetensiInsert] = useState([]); // => Harus nya kompetensi (4)
    const [selectedClass, setSelectedClass] = useState(null)
    const [selectedMapel, setSelectedMapel] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedPertemuan, setSelectedPertemuan] = useState(null)
    const [dataMapel, setDataMapel] = useState(null);
    const [dataPertemuan, setDataPertemuan] = useState([]);
    const [dataKompetensi, setDataKompetensi] = useState([]);
    const [selectedKompetensi, setSelectedKompetensi] = useState(null)


    const _getDataKelas = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": get_where_no_join,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_get_where",
                            "type": "json",
                            "value": {
                                "tbl_name": "r_class_type",
                                "pagination": false,
                                "total_result": 2,
                                "order_coloumn": "r_class_type.id",
                                "order_by": "asc",
                                "data": [
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "institute_id",
                                        "tbl_value": institute,
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
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            )
            .then(function (response) {
                const data = JSON.parse(response.data.variables[2].value);
                setGetKelas(data);
            })
    }
    const _getDataMapel = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": role_guru_get_matpel,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "update_jadwal_pelajaran",
                            "type": "json",
                            "value": {
                                "user_id": userId,
                                // "id_class": selectedClass
                                "id_tingkat": selectedClass,
                                "academic_year_id": academicYear
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
                if (dataMapelApi.message == "success get data") {
                    setDataMapel(getMapel);
                } else {
                    setDataMapel(null)
                }
            })
    }
    const _getPertemuan = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": global_join_sub_where_get,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_subjects_schedule_contents_meeting",
                                "select": [
                                    "x_academic_subjects_schedule_contents_meeting.meeting_name",
                                    "x_academic_subjects_schedule_contents_meeting.id as id_meeting"
                                ],
                                "paginate": false,
                                "join": [
                                    {
                                        "tbl_join": "x_academic_subjects_schedule_contents",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                        "foregenkey": "contents_id"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_subjects_schedule_contents_meeting",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    },{
                                        "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    },{
                                        "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academicYear,
                                        "operator": "="
                                    },{
                                        "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                        "tbl_field": "class_type_id",
                                        "tbl_value": selectedClass, //id kelas
                                        "operator": "="
                                    },{
                                        "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                        "tbl_field": "subjects_master_id",
                                        "tbl_value": selectedMapel, // id matpel
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_academic_subjects_schedule_contents_meeting.meeting_name",
                                "order_by": "asc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
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
                const dataPertemuan = JSON.parse(response.data.variables[3].value);
                const getPertemuan = dataPertemuan?.data
                setDataPertemuan(getPertemuan)
            })
    }
    const _getDataKompetensi = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": global_join_sub_where_get,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_competence",
                                "select": [
                                    "x_competence_detail.id as id_kompetensi",
                                    "x_competence_detail.code",
                                    "x_competence_detail.competence_desc"
                                ],
                                "paginate": false,
                                "join": [
                                    {
                                        "tbl_join": "x_competence_detail",
                                        "refkey": "competence_id",
                                        "tbl_join2": "x_competence",
                                        "foregenkey": "id"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_competence",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academicYear,
                                        "operator": "="
                                    },{
                                        "tbl_coloumn": "x_competence",
                                        "tbl_field": "academic_courses_id",
                                        "tbl_value": selectedMapel,
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_competence_detail.code",
                                "order_by": "asc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
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
                const dataKompetensi = JSON.parse(response.data.variables[3].value);
                const getKompetensi = dataKompetensi?.data
                setDataKompetensi(getKompetensi)
            })
    }


    const _getKompetensi = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": get_kompetensi_dashboard,
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "id_academic": academicYear,
                        "id_tingkat": selectedClass,
                        "id_matpel": selectedMapel,
                        "pagination": 10
                    }
                },
                {
                    "name": "page",
                    "type": "string",
                    "value": "1"
                }
            ]
        }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[3]?.value)
            setGetKompetensi(dataRes?.data?.data)
        })
    }

    const _getKompetensiPertemuan = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": get_kompetensi_pertemuan_role_guru,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_tingkat": selectedClass,
                            "id_matpel": selectedMapel,
                            "id_pertemuan": selectedPertemuan,
                            "kategori": 1
                        }
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setGetKompetensi(dataRes?.data)
        })
    }

    const _getKompetensiKompetensi = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": get_kompetensi_pertemuan_role_guru,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_tingkat": selectedClass,
                            "id_matpel": selectedMapel,
                            "id_kompetensi": selectedKompetensi,
                            "kategori": 0
                        }
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setGetKompetensi(dataRes?.data)
        })
    }

    useEffect(() => {
        _getDataKelas()
    }, []);

    useEffect(() => {
        _getDataMapel()
    }, [selectedClass]);

    useEffect(() => {
        _getKompetensi()
    }, [selectedMapel, setIsViewKompetensi]);

    useEffect(() => {
        setSelectedMapel(null)
        if (selectedMapel == null) {
            setGetKompetensi([])
        }
    }, [selectedClass]);

    useEffect(() => {
        _getPertemuan()
        _getDataKompetensi()
    }, [selectedCategory]);

    useEffect(() => {
        _getKompetensiPertemuan()
    }, [selectedPertemuan]);

    useEffect(() => {
        _getKompetensiKompetensi()
    }, [selectedKompetensi]);

    useEffect(() => {
        setDataKompetensi([])
    }, [selectedCategory]);


    const { TextArea } = Input;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    const _onSelectMenu = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _onSearch = value => console.log(value);

    const { Option } = Select;


    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": get_where_no_join,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_get_where",
                        "type": "json",
                        "value": {
                            "tbl_name": "r_skill_compentence",
                            "pagination": false,
                            "total_result": 1,
                            "order_coloumn": "r_skill_compentence.id",
                            "order_by": "asc",
                            "data": [
                                {
                                    "kondisi": "where",
                                    "tbl_coloumn": "id",
                                    "tbl_value": "1",
                                    "operator": "="
                                }
                            ],
                            "tbl_coloumn": [
                                "*"
                            ]
                        }
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response.data.variables[2].value);
            setGetKompetensiInsert(dataRes);
        })

    }, [academicYear])

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const TabelKompetensi = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                defaultSortOrder: 'ascend',
                responsive: ['sm'],
                align: "center"
            },
            {
                title: 'Kompetensi',
                dataIndex: 'namaKompetensi',
                // align: "center"
            },
            {
                title: 'Tingkat Kelas',
                dataIndex: 'kelas',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Semester',
                dataIndex: 'semester',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Kode',
                dataIndex: 'kode',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Kompetensi Dasar',
                dataIndex: 'kompetensiDasar',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Status',
                dataIndex: 'status',
                responsive: ['sm'],
                render: status => (
                    <>
                        {status.map(status => {
                            let color = status == 'true' ? 'green' : 'red';
                            return (
                                <Tag style={{ borderRadius: '15px' }} color={color} key={status}>
                                    {status == 'true' ? 'Aktif' : 'Tidak Aktif'}
                                </Tag>

                            );
                        })}
                    </>
                ),
                filters: [
                    {
                        text: 'Aktif',
                        value: 'aktif',
                    },
                    {
                        text: 'Nonaktif',
                        value: 'nonAktif',
                    },
                ],
                onFilter: (value, record) => record.status.indexOf(value) === 0,
            },
            // {
            //     title: 'Aksi',
            //     key: 'action',
            //     responsive: ['sm'],
            //     render: (text, record) => (
            //         <Space size="middle">
            //             {/*<EditOutlined style={{color: "blue"}} onClick={() => viewEditKompetensi(record)}/>*/}
            //             <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteKompetensi(record)} />
            //         </Space>
            //     ),
            // },
        ];

        const columnsFilter = [
            {
                title: 'No',
                dataIndex: 'no',
                defaultSortOrder: 'ascend',
                responsive: ['sm'],
                align: "center"
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
                align: "center"
            },

        ];

        const channelList = getKompetensi?.map((data, index) => {
            return {
                no: index + 1,
                idKompetensi: data.id_detail_comp,
                namaKompetensi: data.competence_aspect,
                kelas: data.class,
                semester: `${data.academic_year} Semester ${data.semester}`,
                kode: data.code,
                kompetensiDasar: data.competence_desc,
                keterangan: data.competance_target,
                status: [JSON.stringify(data.status)],
            }
        })

        const channelListFilter = getKompetensi?.map((data, index) => {
            return {
                no: index + 1,
                keterangan: data.keterangan
            }
        })

        return (
            <Table className=""
                columns={selectedCategory == "0" || selectedCategory == "1" ? columnsFilter : columns}
                dataSource={selectedCategory == "0" || selectedCategory == "1" ? channelListFilter : channelList}
                onChange={onChangeTable}
                pagination={{ position: ['bottomCenter'] }}
                rowClassName="bg-greylight text-grey-900"
                scroll={{ x: 400 }} />
        );
    };

    const CardDataKompetensi = () => {

        const channelList = getKompetensi.map((kompetensi, index) => {
            return {
                // imageUrl: 'user.png',
                namaKompetensi: kompetensi.competence_aspect,
                tag1: kompetensi.class,
                tag2: kompetensi.semester,
                tag3: '',
                kode: kompetensi.kode,
                kompetensiDasar: kompetensi.basic_competence,
                keterangan: kompetensi.keterangan
            }
        })

        return (
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span
                                className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                Aktif
                            </span>
                            <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                overlay={_Account}>
                                <EllipsisOutlined />
                            </Dropdown>
                            {/* <a
                                href=""
                                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4"
                            >
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a> */}
                            <h4 className="fw-700 font-xs mt-5">{value.namaKompetensi}</h4>
                            <div className="clearfix"></div>
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
                                    Semester {value.tag2}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag3 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-1">
                                    {value.tag3}
                                </span>
                            ) : (
                                ''
                            )}
                            <div className="clearfix"></div>
                            <div className="mt-4 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Kode</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.kode}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Kompetensi Dasar</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.kompetensiDasar}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Keterangan</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.keterangan}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewKompetensi = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Kompetensi"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    {/*<Button className="mr-4" type="primary" shape="round" size='middle'*/}
                                    {/*    // onClick={() => setIsViewKompetensi(false)}*/}
                                    {/*    onClick={viewCreateKompetensi}>*/}
                                    {/*    Tambah Data*/}
                                    {/*</Button>*/}
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                        onSearch={_onSearch} style={{ width: '80%' }} />
                                    {grid == false ?
                                        <a>
                                            <AppstoreOutlined style={{ fontSize: '2em', lineHeight: 1 }}
                                                onClick={() => setGrid(true)} />
                                        </a> :
                                        <a>
                                            <MenuOutlined style={{ fontSize: '2em', lineHeight: 1 }}
                                                onClick={() => setGrid(false)} />
                                        </a>}
                                </div>
                            </div>
                        </Card>
                        <div className="py-2">
                            <div className="flex">
                                <div className="form-group w-full">
                                    <Card className="shadow-md my-6">
                                        <div className="row">
                                            {/*<select*/}
                                            {/*    id="mapel_by_kompetensi"*/}
                                            {/*    className="form-control"*/}
                                            {/*    onChange={(e) => _getKompetensi(e)}*/}
                                            {/*>*/}
                                            {/*    <option value="" selected disabled hidden>*/}
                                            {/*        Pilih Mata Pelajaran ....*/}
                                            {/*    </option>*/}
                                            {/*    {getPelajaran?.map((data) => {*/}
                                            {/*        return (*/}
                                            {/*            <option id={data.id_subject} value={data.id_subject} key={data.id_subject}>{data.nama_mata}</option>*/}
                                            {/*        )*/}
                                            {/*    })}*/}
                                            {/*</select>*/}
                                            <div className="col-lg-2 mb-3">
                                                <div className="form-group">
                                                    <select
                                                        className="form-control"
                                                        id="id_class_comp"
                                                        name="id_class_comp"
                                                        key="id_class_comp"
                                                        onChange={(e) => setSelectedClass(e.target.value)}
                                                        value={selectedClass}
                                                    >
                                                        <option value="" selected disabled>
                                                            Kelas
                                                        </option>
                                                        {getKelas?.map((data) => {
                                                            return (
                                                                <option value={data.id}>{data.class_type}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-3">
                                                <div className="form-group">
                                                    <select
                                                        className="form-control"
                                                        id="id_mapel_comp"
                                                        key="id_mapel_comp"
                                                        name="id_mapel_comp"
                                                        onChange={(e) => setSelectedMapel(e.target.value)}
                                                        value={selectedMapel}
                                                    >
                                                        <option value="" selected disabled>
                                                            Mata Pelajaran
                                                        </option>
                                                        {dataMapel == null ? null : dataMapel?.map((data) => (
                                                            <option value={data.id}>{data.nama_mata}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mb-3">
                                                <div className="form-group">
                                                    <select
                                                        className="form-control"
                                                        id="id_kategori"
                                                        key="id_kategori"
                                                        name="id_kategori"
                                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                                        value={selectedCategory}
                                                    >
                                                        <option value="" selected disabled>
                                                            Kategori
                                                        </option>
                                                        <option value="0">Kompetensi</option>
                                                        <option value="1">Pertemuan</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-3">
                                                <div className="form-group">
                                                    {
                                                        selectedCategory == "0" ?
                                                    <select
                                                        className="form-control"
                                                        id="id_dataKompetensi"
                                                        key="id_dataKompetensi"
                                                        name="id_dataKompetensi"
                                                        onChange={(e) => setSelectedKompetensi(e.target.value)}
                                                        value={selectedKompetensi}
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Kompetensi
                                                        </option>
                                                        {dataKompetensi == null ? null : dataKompetensi?.map((data) => (
                                                            <option value={data.id_kompetensi}>( {data.code} ) {data.competence_desc}</option>
                                                        ))}
                                                    </select> : selectedCategory == "1" ?
                                                            <select
                                                                className="form-control"
                                                                id="id_pertemuan"
                                                                key="id_pertemuan"
                                                                name="id_pertemuan"
                                                                onChange={(e) => setSelectedPertemuan(e.target.value)}
                                                                value={selectedPertemuan}
                                                            >
                                                                <option value="" selected disabled>
                                                                    Pilih Pertemuan
                                                                </option>
                                                                {dataPertemuan == null ? null : dataPertemuan?.map((data) => (
                                                                    <option value={data.id_meeting}>{data.meeting_name}</option>
                                                                ))}
                                                            </select> : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-lg-2 mb-3">
                                                <Button className="mt-2" type="primary" shape="round"
                                                    onClick={() => {
                                                        setSelectedClass(null)
                                                        setSelectedMapel(null)
                                                        setSelectedCategory("")
                                                    }}>
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        {grid ? <CardDataKompetensi /> : <TabelKompetensi />}
                    </div>
                </div>
            </div>
        );
    };

    const createKompetensi = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": insert_kompetensi,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": {
                                "data": [
                                    {
                                        "mata_pelajaran": data.mata_pelajaran,
                                        "kelas": data.kelas,
                                        "id_academic": data.semester_kompetensi,
                                        "kode": data.kode_kompetensi,
                                        "kompetensi": data.kompetensi,
                                        "kompetensi_dasar": data.ket_kd,
                                        "keterangan": data.ket
                                    }
                                ]
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
                const resData = JSON.parse(response.data.variables[2].value);

                if (resData.code == true) {
                    _getKompetensi()
                    setIsViewKompetensi(true)
                    notification.success({
                        message: "Sukses",
                        description: "Kompetensi berhasil ditambahkan.",
                        placement: "top",
                    });
                } else {
                    notification.error({
                        message: "Error",
                        description: "Kompetensi gagal ditambahkan.",
                        placement: "top",
                    });
                }
            })

    };

    const editKompetensi = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

    }

    const deleteKompetensi = (record) => {
        Swal.fire({
            title: 'Apakah anda yakin menghapus data?',
            text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url_by_institute, {
                    "processDefinitionId": global_delete_record,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_delete",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_competence_detail",
                                "id": record.idKompetensi
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
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data kompetensi ' + record.namaKompetensi,
                        'success'
                    )
                })
                window.location.reload()

            }
        })
    }


    const viewCreateKompetensi = () => {
        setIsViewCreate(true)
        setIsViewKompetensi(false)
        setIsViewEdit(false)
        // setIsViewDetail(false)
    }

    const viewEditKompetensi = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewKompetensi(false)
        // setIsViewDetail(false)
    }

    // const viewDetailKompetensi = (record) => {
    //     setSelectedUser(record)
    //     setIsViewCreate(false)
    //     setIsViewGuru(false)
    //     setIsViewEdit(false)
    //     setIsViewDetail(true)
    // }

    const FormCreate = () => {
        return (
            <FormKompetensi
                setView={() => setIsViewKompetensi(true)}
                title="Tambah Kompetensi"
                submit={createKompetensi}
                selectPelajaran={getPelajaran?.map((data) => (
                    <option value={data.id_master}>{data.nama_mata}</option>
                ))}
                selectKelas={getKelas?.map((data) => (
                    <option value={data.id_class}>{data.class}</option>
                ))}
                selectKompetensi={getkompetensiInsert?.map((data) => (
                    <option value={data.id}>{data.skill_compentence}</option>
                ))}

            />
        )
    }

    const FormEdit = () => {
        return (
            <FormKompetensi
                setView={() => setIsViewKompetensi(true)}
                title="Edit Kompetensi"
                submit={editKompetensi}
                selectPelajaran={getPelajaran?.map((data) => (
                    <option value={data.id_master}>{data.nama_mata}</option>
                ))}
                selectKelas={getKelas?.map((data) => (
                    <option value={data.id_class}>{data.class}</option>
                ))}
                selectKompetensi={getkompetensiInsert?.map((data) => (
                    <option value={data.id}>{data.skill_compentence}</option>
                ))}
            />
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {/* {isViewKompetensi ? <ViewKompetensi /> : <TambahKompetensi />} */}
                    {
                        isViewKompetensi ?
                            <ViewKompetensi /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    // isViewDetail ?
                                    // <FormDetail /> :
                                    <ViewKompetensi />
                    }
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
};