import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Dropdown,
    Menu,
    message,
    notification,
    Space,
    Table,
    PageHeader,
} from "antd";
import {
    AppstoreOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    EditOutlined,
    MenuOutlined,
    EyeOutlined
} from "@ant-design/icons";
import Search from "antd/es/input/Search";

import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import axios from "axios";
import { searchGlobal } from "../../../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {

    global_delete_record,
    global_insert,
    global_join_sub_where_get,
    url_by_institute
} from "../../../api/reference";
import { FormAdminTingkatKelas } from '../../../components/form/AdminTingkatKelas';

export default function AdminTingkatKelas() {
    const [grid, setGrid] = useState(false);
    const [isViewKelas, setIsViewKelas] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);
    const [getTingkatKelas, setGetTingkatKelas] = useState([]);

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const institute = localStorage.getItem('institute');
    const defaultAcademic = localStorage.getItem('academic_year');
    const [academic, setAcademic] = useState(defaultAcademic);

    const dispatch = useDispatch();
    const searchRedux = useSelector(state => state.search);
    const DataSearch = searchRedux.DataSearch;

    const getListTingkatKelas = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "r_class_type",
                            "select": [
                                "r_class_type.*"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "m_institutes",
                                    "refkey": "id",
                                    "tbl_join2": "r_class_type",
                                    "foregenkey": "institute_id"
                                }

                            ],

                            "where": [
                                {
                                    "tbl_coloumn": "r_class_type",
                                    "tbl_field": "institute_id",
                                    "tbl_value": institute,
                                    "operator": "="
                                }

                            ],
                            "order_coloumn": "r_class_type.updated_at",
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
            const dataRes = JSON.parse(response.data.variables[3].value);
            setGetTingkatKelas(dataRes.data.data);
            setBtnPagination(dataRes.data.links);
        })
    }

    useEffect(() => {
        getListTingkatKelas();
    }, [institute, refreshState])

    useEffect(() => {
        if (DataSearch != '') {
            setGetTingkatKelas(DataSearch?.data?.data)
            setBtnPagination(DataSearch?.data?.links)
        }
    }, [DataSearch])

    const _onSelectMenu = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _onSearch = (value) => {
        const processDef = global_join_sub_where_get;
        const variableSearch = {
            "name": "global_join_where_sub",
            "type": "json",
            "value": {
                "tbl_induk": "x_academic_class",
                "select": ["x_academic_class.id as id_class",
                    "r_class_type.class_type as class",
                    "x_academic_class.sub_class",
                    "x_academic_class.class_location",
                    "x_academic_year.academic_year",
                    "x_academic_year.id as id_academic",
                    "users.name",
                    "x_academic_teachers.id as id_walikelas",
                    "users.institute_id"
                ],
                "paginate": 10,
                "join": [
                    {
                        "tbl_join": "x_academic_teachers",
                        "refkey": "id",
                        "tbl_join2": "x_academic_class",
                        "foregenkey": "calss_advisor_id"

                    }, {
                        "tbl_join": "users",
                        "refkey": "id",
                        "tbl_join2": "x_academic_teachers",
                        "foregenkey": "user_id"
                    }, {
                        "tbl_join": "x_academic_year",
                        "refkey": "id",
                        "tbl_join2": "x_academic_class",
                        "foregenkey": "academic_year_id"
                    },
                    {
                        "tbl_join": "r_class_type",
                        "refkey": "id",
                        "tbl_join2": "x_academic_class",
                        "foregenkey": "class"
                    }
                ],
                "kondisi": [
                    {
                        "keterangan": "where",
                        "kolom": "users.institute_id",
                        "value": institute
                    },
                    {
                        "keterangan": "where",
                        "kolom": "x_academic_class.academic_year_id",
                        "value": academic
                    },
                    {
                        "keterangan": "deleted_at",
                        "kolom": "x_academic_class.deleted_at"
                    }
                ],
                "where": [
                    {
                        "tbl_coloumn": "r_class_type",
                        "tbl_field": "class_type",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    }, {
                        "tbl_coloumn": "x_academic_class",
                        "tbl_field": "class_location",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    }, {
                        "tbl_coloumn": "users",
                        "tbl_field": "name",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    }, {
                        "tbl_coloumn": "x_academic_year",
                        "tbl_field": "academic_year",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    }
                ],
                "order_coloumn": "x_academic_class.class",
                "order_by": "asc"
            }
        }
        dispatch(searchGlobal(value, paramsPage, processDef, variableSearch))
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    };

    const TableKelas = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                align: "center",
            },
            {
                title: 'ID',
                dataIndex: 'id',
                align: "center",
            },
            {
                title: 'Tingkat Kelas',
                dataIndex: 'tingkatKelas',
                align: "center",
            },
            {
                title: 'Tingkat Sekolah',
                dataIndex: 'tingkatSekolah',
                align: "center",
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                align: "center",
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailKelas(record)} />
                        <EditOutlined style={{ color: "blue" }} onClick={() => viewEditKelas(record)} />
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteTingkatKelas(record)} />
                    </Space>
                ),
            },
        ];

        const DataTingkatKelas = getTingkatKelas.map((data, index) => {
            return {
                no: index + 1,
                id: data.id,
                tingkatSekolah: data.edu_level,
                tingkatKelas: data.class_type,
            }
        })

        return (
            <>
                <Table className="py-8"
                    columns={columns}
                    dataSource={DataTingkatKelas}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />
                <div className="text-center mt-4">
                    {btnPagination.map((dataBtn) => {
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
            </>
        );
    }

    const CardDataKelas = () => {
        const channelList = getTingkatKelas.map((data, index) => {
            return {
                // imageUrl: 'user.png',
                title: '',
                tag1: '',
                tag2: '',
                tingkatSekolah: data.edu_level,
                tingkatKelas: data.class_type,
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
                            {/* <a href="" className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4">
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a> */}
                            <h4 className="fw-700 font-xs mt-4">{value.title}</h4>
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
                                    {value.tag2}
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
                                        <p className="font-xssss float-left lh-1">Tingkat Sekolah</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.tingkatSekolah}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tingkat Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.tingkatKelas}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewTingkatKelas = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Tingkat Kelas"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                        onClick={viewCreateKelas}>
                                        Tambah Data
                                    </Button>
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
                        {grid ? <CardDataKelas /> : <TableKelas />}
                    </div>
                </div>
            </div>
        )
    }

    const createTingkatKelas = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

        axios.post(url_by_institute, {
            "processDefinitionId": global_insert,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_Insert",
                    "type": "json",
                    "value": {
                        "tbl_name": "r_class_typeModel",
                        "tbl_coloumn": {
                            "class_type": data.tingkat_kelas,
                            "edu_level": data.tingkat_sekolah,
                            "institute_id": institute
                        }
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
            const dataRes = response.data.variables[2].value
            const dataResObj = JSON.parse(dataRes)
            const status = dataResObj.status
            if (status == 'success') {
                setIsViewCreate(false)
                setIsViewKelas(true)
                setRefreshState(true);
                notification.success({
                    message: "Sukses",
                    description: 'Data tingkat kelas berhasil ditambahkan',
                    placement: 'top'
                })
                getListTingkatKelas();
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan data tingkat kelas, mohon kontak admin.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            console.log(error)
        });
    }

    const editTingkatKelas = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios.post(url_by_institute, {
            "processDefinitionId": "GlobalUpdateRecord:2:184b8903-2ccb-11ed-aacc-9a44706f3589",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_updatedata",
                    "type": "json",
                    "value": {
                        "tbl_name": "r_class_typeModel",
                        "id": selectedUser.id,
                        "tbl_coloumn": {
                            "class_type": data.tingkat_kelas,
                            "edu_level": data.tingkat_sekolah,
                            "institute_id": institute
                        }
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
            const resCode = JSON.parse(response.data.variables[2].value)
            const statusCode = resCode.status;
            if (statusCode == 'success') {
                setRefreshState(true)
                setIsViewEdit(false)
                setIsViewKelas(true)
                notification.success({
                    message: "Sukses",
                    description: 'Data tingkat kelas berhasil di update',
                    placement: 'top'
                })
                getListTingkatKelas();
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan update tingkat kelas, mohon kontak admin.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            alert(error)
        });
    }

    const deleteTingkatKelas = (record) => {
        Swal.fire({
            title: 'Apakah anda yakin menghapus data?',
            text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Hapus'
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
                                "tbl_name": "r_class_typeModel",
                                "id": record.id
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
                    setRefreshState(true);
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data tingkat kelas ' + record.tingkatKelas,
                        'success'
                    )
                    getListTingkatKelas();
                })
            }
        })

    }


    const viewCreateKelas = () => {
        setIsViewCreate(true)
        setIsViewKelas(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditKelas = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewKelas(false)
        setIsViewDetail(false)
    }

    const viewDetailKelas = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewKelas(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const FormCreate = () => {
        return (
            <FormAdminTingkatKelas
                setView={() => setIsViewKelas(true)}
                title="Tambah Tingkat Kelas"
                submit={createTingkatKelas}
                isDisabled={false}
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormAdminTingkatKelas
                setView={() => setIsViewKelas(true)}
                title="Edit Tingkat Kelas"
                submit={editTingkatKelas}
                isDisabled={false}
                id={selectedUser.id}
                tingkatSekolah={selectedUser.tingkatSekolah}
                tingkatKelas={selectedUser.tingkatKelas}
            />
        )
    }

    const FormDetail = () => {
        return (
            <FormAdminTingkatKelas
                setView={() => setIsViewKelas(true)}
                title="View Tingkat Kelas"
                isDisabled={true}
                id={selectedUser.id}
                tingkatSekolah={selectedUser.tingkatSekolah}
                tingkatKelas={selectedUser.tingkatKelas}
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
                        isViewKelas ?
                            <ViewTingkatKelas /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    isViewDetail ?
                                        <FormDetail /> :
                                        <ViewTingkatKelas />
                    }
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}
