import React, {Fragment, useEffect, useState} from "react"
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
    EllipsisOutlined
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import {Link} from 'react-router-dom';

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import Filter from "../../../components/Filter";
import {BASE_URL} from "../../../api/Url";
import {FormKompetensi} from "../../../components/form/Adminkompetensi";
import Swal from "sweetalert2";

export default function KompetensiAdmin() {
    const [grid, setGrid] = useState(false)
    const [isViewKompetensi, setIsViewKompetensi] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    // const [isViewDetail, setIsViewDetail] = useState(false);
    const institute = localStorage.getItem("institute");
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const academicYear = localStorage.getItem('academic_year')
    const [getKompetensi, setGetKompetensi] = useState([]);
    const [getPelajaran, setGetPelajaran] = useState([]);
    const [getKelas, setGetKelas] = useState([]);
    const [getkompetensiInsert, setGetKompetensiInsert] = useState([]); // => Harus nya kompetensi (4)
    const [selectedMapel, setSelectedMapel] = useState(null)

    const _getMataPelajaran = () => {
        axios.post(BASE_URL,
            {
                "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_subject_master",
                            "select": [
                                "x_academic_subjects.id as id_subject",
                                "x_academic_subject_master.nama_mata"
                            ],
                            "paginate": 1000,
                            "join": [
                                {
                                    "tbl_join": "x_academic_year",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subject_master",
                                    "foregenkey": "academic_year_id"
                                }, {
                                    "tbl_join": "x_academic_subjects",
                                    "refkey": "academic_subjects_master_id",
                                    "tbl_join2": "x_academic_subject_master",
                                    "foregenkey": "id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_subjects",
                                    "tbl_field": "academic_year_id",
                                    "tbl_value": academicYear,
                                    "operator": "=",
                                    "kondisi": "where"
                                },
                                {
                                    "tbl_coloumn": "x_academic_subject_master",
                                    "tbl_field": "deleted_at",
                                    "tbl_value": "",
                                    "operator": "=",
                                    "kondisi": "where"
                                },
                                {
                                    "tbl_coloumn": "x_academic_subjects",
                                    "tbl_field": "course_grade_id",
                                    "tbl_value": "",
                                    "operator": "!=",
                                    "kondisi": "where"
                                }
                            ],
                            "order_coloumn": "x_academic_subject_master.nama_mata",
                            "order_by": "desc"
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
            const pelajaran = JSON.parse(response.data.variables[3].value)
            setGetPelajaran(pelajaran?.data?.data)
        })
    }

    const _getKompetensi = (e) => {
        axios.post(BASE_URL, {
                "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_competence",
                            "select" : ["competence_aspect",
                                "r_competence_aspect.id as id_aspect",
                                "x_competence.class",
                                "x_academic_year.academic_year",
                                "x_competence_detail.code",
                                "competence_desc",
                                "competance_target",
                                "nama_mata",
                                "x_academic_subjects.id as id_matpel",
                                "x_competence_detail.status",
                                "x_academic_year.semester"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_competence_detail",
                                    "refkey": "competence_id",
                                    "tbl_join2": "x_competence",
                                    "foregenkey": "id"
                                },
                                {
                                    "tbl_join": "r_competence_aspect",
                                    "refkey": "id",
                                    "tbl_join2": "x_competence_detail",
                                    "foregenkey": "competence_aspect_id"
                                },
                                {
                                    "tbl_join": "x_academic_year",
                                    "refkey": "id",
                                    "tbl_join2": "x_competence",
                                    "foregenkey": "academic_year_id"
                                },{
                                    "tbl_join": "x_academic_subjects",
                                    "refkey": "id",
                                    "tbl_join2": "x_competence",
                                    "foregenkey": "academic_courses_id"
                                },{
                                    "tbl_join": "x_academic_subject_master",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects",
                                    "foregenkey": "academic_subjects_master_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_competence",
                                    "tbl_field": "academic_courses_id",
                                    "tbl_value": e.target.value,
                                    "operator": "="
                                },{
                                    "tbl_coloumn": "x_competence",
                                    "tbl_field": "academic_year_id",
                                    "tbl_value": academicYear,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_competence_detail.competence_aspect_id",
                            "order_by": "asc"
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
            console.log(response)
            const dataRes = JSON.parse(response?.data?.variables[3]?.value)
            console.log(dataRes)
            setGetKompetensi(dataRes?.data?.data)
        })
    }

    useEffect(() => {
        _getMataPelajaran()
    }, []);



    let [count, setCount] = useState(1);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrement = () => {
        setCount((prevCount) => prevCount - 1);
    };

    const {TextArea} = Input;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    const _onSelectMenu = ({key}) => {
        message.info(`Click on item ${key}`);
    };

    const _filterMenu = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">1st filter</Menu.Item>
            <Menu.Item key="2">2nd filter</Menu.Item>
            <Menu.Item key="3">3rd filter</Menu.Item>
        </Menu>
    );

    const _sortMenu = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">1st sort</Menu.Item>
            <Menu.Item key="2">2nd sort</Menu.Item>
            <Menu.Item key="3">3rd sort</Menu.Item>
        </Menu>
    );

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _onSearch = value => console.log(value);

    const {Option} = Select;


    useEffect(() => {
        axios.post(BASE_URL,
            {
                "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
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
                title: 'Kelas',
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
                                <Tag style={{borderRadius: '15px'}} color={color} key={status}>
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
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EditOutlined style={{color: "blue"}} onClick={() => viewEditKompetensi(record)}/>
                        <DeleteOutlined style={{color: 'red'}} onClick={() => deleteKompetensi(record)}/>
                    </Space>
                ),
            },
        ];

        const channelList = getKompetensi?.map((data, index) => {
            console.log('channellist', data)
            return {
                no: index + 1,
                idKompetensi: data.id_aspect,
                namaKompetensi: data.competence_aspect,
                kelas: data.class,
                semester: `${data.academic_year} Semester ${data.semester}`,
                kode: data.code,
                kompetensiDasar: data.competence_desc,
                keterangan: data.competance_target,
                status: [JSON.stringify(data.status)],
            }
        })

        return (
            <Table className=""
                   columns={columns}
                   dataSource={channelList}
                   onChange={onChangeTable}
                   pagination={{position: ['bottomCenter']}}
                   rowClassName="bg-greylight text-grey-900"
                   scroll={{x: 400}}/>
        );
    };

    const CardDataKompetensi = () => {

        const channelList = getKompetensi.map((kompetensi, index) => {
            return {
                // imageUrl: 'user.png',
                namaKompetensi: kompetensi.skill_compentence,
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
                                <EllipsisOutlined/>
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
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                        // onClick={() => setIsViewKompetensi(false)}
                                            onClick={viewCreateKompetensi}>
                                        Tambah Data
                                    </Button>
                                    <Filter title1="Kompetensi" title2="Kelas"/>
                                    {/* <Dropdown overlay={_filterMenu}>
                                        <a className="ant-dropdown-link mr-4 font-bold"
                                        onClick={e => e.preventDefault()}>
                                        Filter by <DownOutlined/>
                                        </a>
                                    </Dropdown>
                                    <Dropdown overlay={_sortMenu}>
                                        <a className="ant-dropdown-link font-bold"
                                        onClick={e => e.preventDefault()}>
                                        Sort by <DownOutlined/>
                                        </a>
                                    </Dropdown> */}
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                            onSearch={_onSearch} style={{width: '80%'}}/>
                                    {grid == false ?
                                        <a>
                                            <AppstoreOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                              onClick={() => setGrid(true)}/>
                                        </a> :
                                        <a>
                                            <MenuOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                          onClick={() => setGrid(false)}/>
                                        </a>}
                                </div>
                            </div>
                        </Card>
                        <div className="py-2">
                            <div className="flex">
                                <div className="form-group w-full">
                                    <Card className="shadow-md my-6">
                                        <Row>
                                            <select
                                                id="mapel_by_kompetensi"
                                                className="form-control"
                                                onChange={(e) => _getKompetensi(e)}
                                            >
                                                <option value="" selected disabled hidden>
                                                    Pilih Mata Pelajaran ....
                                                </option>
                                                {getPelajaran?.map((data) => {
                                                    return (
                                                        <option id={data.id_subject} value={data.id_subject} key={data.id_subject}>{data.nama_mata}</option>
                                                    )
                                                })}
                                            </select>
                                        </Row>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        {grid ? <CardDataKompetensi/> : <TabelKompetensi/>}
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
        console.log(data);

        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "5177f66c-14ac-11ed-9ea6-c6ec5d98c2df",
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
                    },
                }
            )
            .then(function (response) {
                const resData = JSON.parse(response.data.variables[2].value);

                console.log(response)
                if(resData.code == true){
                    setIsViewKompetensi(true)
                    notification.success({
                        message: "Sukses",
                        description: "Kompetensi berhasil ditambahkan.",
                        placement: "top",
                    });
                }else {
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
        console.log(data)

        // axios.post(BASE_URL, {
        //     "processDefinitionId": "updatekompetensi:3:f8a44dd0-f1d8-11ec-a658-66fc627bf211",
        //     "returnVariables": true,
        //     "variables": [
        //         {
        //             "name": "validasi",
        //             "type": "json",
        //             "value": {
        //                 "data": {
        //                     "academic_year_id": "required",
        //                     "academic_courses_id": "required",
        //                     "expertise_area_id": "required",
        //                     "expertise_program_id": "required",
        //                     "skill_compentence_id": "required",
        //                     "class": "required",
        //                     "kode": "required",
        //                     "basic_competence": "required",
        //                     "keterangan": "required",
        //                     "semester": "required"
        //                 },
        //                 "academic_year_id": "8",
        //                 "academic_courses_id": "93",
        //                 "expertise_area_id": "1",
        //                 "expertise_program_id": "1",
        //                 "skill_compentence_id": "1",
        //                 "class": "11",
        //                 "kode": "brn",
        //                 "basic_competence": "berhitung1",
        //                 "keterangan": "tidak lulus",
        //                 "semester": "4"
        //             }
        //         },
        //         {
        //             "name": "x_competence",
        //             "type": "json",
        //             "value": {
        //                 "tbl_name": "x_competence",
        //                 "id": 93,
        //                 "tbl_coloumn": {
        //                     "course_name": "pilates",
        //                     "course_code": "pl",
        //                     "max_student": "10",
        //                     "course_grade_id": 11,
        //                     "academic_year_id": 1
        //                 }
        //             }
        //         }
        //     ]
        // }, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // }).then(function (response) {
        //     console.log(response)
        // })
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
                // axios.post(BASE_URL, {
                //     "processDefinitionId": "GlobalDeleteRecord:3:cc4aec62-d58d-11ec-a2ad-3a00788faff5",
                //     "returnVariables": true,
                //     "variables": [
                //         {
                //             "name": "global_delete",
                //             "type": "json",
                //             "value": {
                //                 "tbl_name": "x_competenceModel",
                //                 "id": record.idKompetensi
                //             }
                //         }
                //     ]
                // }, {
                //     headers: {
                //         "Content-Type": "application/json",
                //     }
                // }
                // ).then(function (response) {
                //     console.log(response);
                //     // getListGuru()
                //     // Swal.fire(
                //     //     'Data telah terhapus!',
                //     //     'Menghapus data kompetensi ' + record.namaKompetensi,
                //     //     'success'
                //     // )
                // })
                console.log('dihapus')
            }
        })
    }

    // const TambahKompetensi = () => {
    //
    //     const columns = [
    //         {
    //             title: 'No',
    //             dataIndex: 'no',
    //         },
    //         {
    //             title: 'Mata Pelajaran',
    //             dataIndex: 'mataPelajaran',
    //         },
    //         {
    //             title: 'Kelas',
    //             dataIndex: 'kelas',
    //         },
    //         {
    //             title: 'Semester',
    //             dataIndex: 'semester',
    //         },
    //         {
    //             title: 'Kode',
    //             dataIndex: 'kode',
    //         },
    //         {
    //             title: 'Kompetensi',
    //             dataIndex: 'kompetensi',
    //         },
    //         {
    //             title: 'Kompetensi Dasar',
    //             dataIndex: 'kompetensiDasar',
    //         },
    //         {
    //             title: 'Keterangan',
    //             dataIndex: 'keterangan',
    //         },
    //     ];
    //
    //     const data = [
    //         {
    //             no: '1',
    //             mataPelajaran:
    //                 <select
    //                     className="form-control w200"
    //                 >
    //                     <option value="" selected disabled hidden>
    //                         Pilih Mata Pelajaran
    //                     </option>
    //                     {getPelajaran?.map((data) => (
    //                         <option value={data.id_master}>{data.nama_mata}</option>
    //                     ))}
    //                 </select>,
    //             kelas:
    //                 <select
    //                     className="form-control w125"
    //                 >
    //                     <option value="" selected disabled hidden>
    //                         Pilih Kelas
    //                     </option>
    //                     {getKelas?.map((data) => (
    //                         <option value={data.id_class}>{data.class}</option>
    //                     ))}
    //                 </select>,
    //             semester:
    //                 <select
    //                     className="form-control w150"
    //                 >
    //                     <option value="" selected disabled hidden>
    //                         Pilih Semester
    //                     </option>
    //                     <option value="I">I</option>
    //                     <option value="II">II</option>
    //                 </select>,
    //             kode:
    //                 <input className="form-control w75" />,
    //             kompetensi:
    //                 <select
    //                     className="form-control w175"
    //                 >
    //                     <option value="" selected disabled hidden>
    //                         Pilih Kompetensi
    //                     </option>
    //                     <option value=""></option>
    //                 </select>,
    //             kompetensiDasar:
    //                 <textarea className="form-control w150" />,
    //             keterangan:
    //                 <textarea className="form-control w150" />,
    //         },
    //     ];
    //
    //     return (
    //         <div className="container px-3 py-4">
    //             <div className="row">
    //                 <div className="col-lg-12">
    //                     <div className="flex-wrap pr-4 pl-4">
    //                         <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg mb-4">
    //                             <i onClick={() => setIsViewKompetensi(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
    //                             <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
    //                                 Tambah Data Kompetensi
    //                             </h4>
    //                         </div>
    //                         <div className='d-flex mb-3 justify-content-end g-1s'>
    //                             <h5 className='pt-2'>Tambah Baris</h5>
    //                             <Button className='ml-2' onClick={decrement} shape="circle">-</Button>
    //                             <h4 className='mt-2 ml-2'>{count}</h4>
    //                             <Button className='ml-2' onClick={increment} shape="circle">+</Button>
    //                         </div>
    //                     </div>
    //                     <form id="teacher_form"
    //                         // onSubmit={createKompetensi}
    //                         method="POST">
    //                         <Table className="mx-4 py-8"
    //                             columns={columns}
    //                             dataSource={data}
    //                             onChange={onChangeTable}
    //                             pagination={false}
    //                             rowClassName="bg-greylight text-grey-900"
    //                             scroll={{ x: 400 }} />
    //                         <div className="row mx-2 py-8 mt-5">
    //                             <div className="col-lg-12">
    //
    //                                 <button
    //                                     className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
    //                                     type="submit"
    //                                 >
    //                                     Simpan
    //                                 </button>
    //                                 <button
    //                                     className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-none"
    //                                 >
    //                                     Batal
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </form>
    //                     {/* <div className="col-lg-12">
    //                         <div className="table ">
    //                             <thead>
    //                                 <td className="bg-current text-light text-center">
    //                                     <th className="col">No</th>
    //                                 </td>
    //                                 <td className="bg-current text-light text-center">
    //                                     <th className="">Nama Pelajaran</th>
    //                                 </td>
    //                             </thead>
    //                         </div>
    //                     </div> */}
    //
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

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
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {/* {isViewKompetensi ? <ViewKompetensi /> : <TambahKompetensi />} */}
                    {
                        isViewKompetensi ?
                            <ViewKompetensi/> :
                            isViewCreate ?
                                <FormCreate/> :
                                isViewEdit ?
                                    <FormEdit/> :
                                    // isViewDetail ?
                                    // <FormDetail /> :
                                    <ViewKompetensi/>
                    }
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
};