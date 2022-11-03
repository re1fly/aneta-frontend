import React, { Fragment, useState, useEffect } from "react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { searchGlobal } from "../../../redux/Action";
import {
    Menu,
    Card,
    Button,
    Dropdown,
    message,
    Tag,
    Space,
    notification,
    Table,
    PageHeader,
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
    EllipsisOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    EyeOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload"

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import Filter from "../../../components/Filter";
import { FormKkmPelajaran } from "../../../components/form/AdminKkmPelajaran";
import Swal from "sweetalert2";
import { dateNow } from "../../../components/misc/date";
import { pageLoad } from "../../../components/misc/loadPage";
import { FilterAcademic } from "../../../components/FilterAcademic";
import {
    get_data_mata_pelajaran, get_where_no_join,
    global_data_join_where,
    global_join_sub_where_get, global_update, insert_data_kkm_pelajaran,
    url_by_institute
} from "../../../api/reference";

export default function DataMataPelajaranAdmin() {
    const [grid, setGrid] = useState(false)
    const [isViewKkm, setIsViewKkm] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const institute = localStorage.getItem('institute');
    const academicYear = localStorage.getItem('academic_year')
    const semester = localStorage.getItem('semester')

    const [year, setYear] = useState(localStorage.getItem('year'));
    const [academic, setAcademic] = useState(academicYear);
    const [academicYears, setAcademicYears] = useState([]);

    const [getKkmPelajaran, setGetKkmPelajaran] = useState([])
    const [getPelajaran, setGetPelajaran] = useState([]);
    const [tingkatKelas, setTingkatKelas] = useState([]);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const dispatch = useDispatch();
    const searchRedux = useSelector(state => state.search);
    const DataSearch = searchRedux.DataSearch;

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
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

    useEffect(() => {
        if (DataSearch != '') {
            setGetPelajaran(DataSearch?.data?.data)
            setBtnPagination(DataSearch?.data?.links)
        }
    }, [DataSearch])

    const _onSearch = (value) => {
        if (value == "") {
            window.location.reload();
        } else {
            notification.info({
                message: "Search",
                description: "Mencari data : " + value,
                duration: 1,
                icon: <SearchOutlined />,
            });
            axios.post(url_by_institute,
                {
                    "processDefinitionId": global_join_sub_where_get,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_subject_master",
                                "paginate": 1000,
                                "select": [
                                    "x_academic_subject_master.*",
                                    "x_academic_year.academic_year as academic_year",
                                    "x_academic_year.semester as semester",
                                    "x_academic_subject_master.id as id_master",
                                    "r_class_type.*",
                                    "r_class_type.id as id_tingkat"
                                ],
                                "join": [
                                    {
                                        "tbl_join": "x_academic_year",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_subject_master",
                                        "foregenkey": "academic_year_id"
                                    },
                                    {
                                        "tbl_join": "r_class_type",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_subject_master",
                                        "foregenkey": "tingkat"
                                    }
                                ],
                                "kondisi": [
                                    {
                                        "keterangan": "where",
                                        "kolom": "x_academic_subject_master.academic_year_id",
                                        "value": academic
                                    },
                                    {
                                        "keterangan": "deleted_at",
                                        "kolom": "x_academic_subject_master.deleted_at"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_subject_master",
                                        "tbl_field": "nama_mata",
                                        "tbl_value": value,
                                        "operator": "ILIKE"
                                    },
                                    {
                                        "tbl_coloumn": "r_class_type",
                                        "tbl_field": "class_type",
                                        "tbl_value": value,
                                        "operator": "ILIKE"
                                    },
                                    {
                                        "tbl_coloumn": "x_academic_subject_master",
                                        "tbl_field": "kkm",
                                        "tbl_value": value,
                                        "operator": "ILIKE"
                                    }

                                ],
                                "order_coloumn": "x_academic_subject_master.updated_at",
                                "order_by": "desc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": paramsPage
                        }
                    ]
                }
            ).then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[3]?.value)
                setGetKkmPelajaran(dataRes?.data?.data)
                const pagination = dataRes?.data?.links
                setBtnPagination(pagination)
            })
        }
    }

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_data_join_where,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_subject_master",
                            "select": [
                                "x_academic_subject_master.*",
                                "x_academic_year.academic_year as academic_year",
                                "x_academic_year.semester as semester",
                                "x_academic_subject_master.id as id_master",
                                "r_class_type.*",
                                "r_class_type.id as id_tingkat"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_academic_year",
                                    "foregenkey": "academic_year_id",
                                    "refkey": "id"
                                },
                                {
                                    "tbl_join": "r_class_type",
                                    "foregenkey": "tingkat",
                                    "refkey": "id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_subject_master",
                                    "tbl_field": "academic_year_id",
                                    "tbl_value": academicYear,
                                    "operator": "="
                                },
                                {
                                    "tbl_coloumn": "x_academic_subject_master",
                                    "tbl_field": "kkm",
                                    "tbl_value": "",
                                    "operator": "!="
                                },
                                {
                                    "tbl_coloumn": "x_academic_subject_master",
                                    "tbl_field": "deleted_at",
                                    "tbl_value": "",
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_academic_subject_master.updated_at",
                            "order_by": "desc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": paramsPage
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[3]?.value)
            setGetKkmPelajaran(dataRes?.data?.data)
            const pagination = dataRes?.data?.links
            setBtnPagination(pagination)
        })

        axios.post(url_by_institute,
            {
                "processDefinitionId": get_data_mata_pelajaran,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_academic": academic,
                            "paginate": 1000
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": paramsPage
                    }
                ]
            }
        ).then(function (response) {
            const pelajaran = JSON.parse(response?.data?.variables[3]?.value)
            setGetPelajaran(pelajaran?.data?.data)
        })

        axios.post(url_by_institute, {
                "processDefinitionId": global_data_join_where,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_year",
                            "select": [
                                "x_academic_year.id as id_academic",
                                "x_academic_year.academic_year",
                                "m_institutes.id",
                                "x_academic_year.semester"
                            ],
                            "paginate": 1000,
                            "join": [
                                {
                                    "tbl_join": "m_institutes",
                                    "foregenkey": "institute_id",
                                    "refkey": "id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_year",
                                    "tbl_field": "institute_id",
                                    "tbl_value": institute,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_academic_year.academic_year",
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
            const academics = JSON.parse(response?.data?.variables[3]?.value);
            setAcademicYears(academics?.data?.data);
        })

        axios.post(url_by_institute,
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
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setTingkatKelas(dataRes)
        })
    }, [academic, paramsPage, isViewKkm, refreshState])

    const CardDataPelajaran = () => {
        const channelList = getKkmPelajaran.map((kkm, index) => {
            return {
                imageUrl: 'user.png',
                namaPelajaran: kkm.nama_mata,
                ta_semester: '_',
                tag2: '',
                tag3: '',
                tingkatKelas: kkm.tingkat,
                nilaiKkm: kkm.kkm,
            }
        })

        return (
            <>
                <div className="row">
                    {channelList.map((value, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                    {value.status == true ? 'Nonaktif' : 'Aktif'}
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
                                <h4 className="fw-700 font-xs mt-5">{value.namaPelajaran}</h4>
                                <div className="clearfix"></div>
                                {value.ta_semester ? (
                                    <span
                                        className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                        {value.ta_semester}
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
                                            <p className="font-xssss float-left lh-1">Tingkat Kelas</p>
                                        </div>
                                        <div className="">
                                            <p className="font-xssss float-left lh-1">: {value.tingkatKelas}</p>
                                        </div>
                                    </div>

                                    <div className="row ml-3">
                                        <div className="col-6">
                                            <p className="font-xssss float-left lh-1">Nilai KKM</p>
                                        </div>
                                        <div className="">
                                            <p className="font-xssss float-left lh-1">: {value.nilaiKkm}</p>
                                        </div>
                                    </div>

                                    <div className="row ml-3">
                                        <div className="col-6">
                                            <p className="font-xssss float-left lh-1"></p>
                                        </div>
                                        <div className="">
                                            <p className="font-xssss float-left lh-1"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center mt-4'>
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
                                    setParamsPage(linkUrl)
                                }}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </div>
            </>
        );
    };

    const TabelDataPelajaran = () => {

        const channelList = getKkmPelajaran.map((kkm, index) => {
            return {
                no: index + 1,
                idPelajaran: kkm.id_master,
                mataPelajaran: kkm.nama_mata,
                ta_semester: `${kkm.academic_year} / ${kkm.semester}`,
                idTingkatKelas: kkm.id_tingkat,
                tingkatKelas: kkm.class_type,
                nilaiKkm: kkm.kkm
            }
        })

        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                responsive: ['sm'],
            },
            {
                title: 'Mata Pelajaran',
                dataIndex: 'mataPelajaran',
            },
            {
                title: 'TA/Semester',
                dataIndex: 'ta_semester',
                align: "center"
            },
            {
                title: 'Tingkat Kelas',
                dataIndex: 'tingkatKelas',
                align: "center"
            },
            {
                title: 'Nilai KKM',
                dataIndex: 'nilaiKkm',
                align: "center"
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailKkm(record)} />
                        <EditOutlined style={{ color: "blue" }} onClick={() => viewEditKkm(record)} />
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteKkm(record)} />
                    </Space>
                ),
            },
        ];

        return (
            <>
                <Table className=""
                       columns={columns}
                       dataSource={channelList}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900"
                       scroll={{ x: 400 }} />
                <div className='text-center mt-4'>
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
    };

    const ViewKkm = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data KKM Mata Pelajaran"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                            onClick={viewCreateKkm}>
                                        Tambah Data
                                    </Button>
                                    {/* <Filter title1="Mata Pelajaran" title2="Kelas" /> */}
                                    <FilterAcademic getYear={(e) => setAcademic(e.target.value)}
                                                    selectYear={academicYears.map((data) => {
                                                            return (
                                                                <>
                                                                    <option value={data.id_academic}>
                                                                        {data.academic_year} Semester {data.semester}
                                                                    </option>
                                                                </>
                                                            )
                                                        }
                                                    )} />
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
                        {/* <div className="d-flex">
              <div className="mt-1">
                <h5 className="fw-600 mb-1">
                  Tahun Akademik
                </h5>
                <input
                type="text"
                className="form-control w-100"
                />
              </div>
              <div className="mt-1 ml-3">
                <h5 className="fw-600 mb-1">
                  Kelas
                </h5>
                <input
                type="text"
                className="form-control w-100 mb-3"
                />
              </div>
            </div> */}
                        {grid ? <CardDataPelajaran /> : <TabelDataPelajaran />}
                    </div>
                </div>
            </div>
        );
    };

    const createkkm = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)

        axios.post(url_by_institute, {
            "processDefinitionId": insert_data_kkm_pelajaran,
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "matpel": data.mata_pelajaran,
                        "academic_year_id": data.ta_semester,
                        "tingkat": data.tingkat_kelas,
                        "kkm": data.nilai_kkm
                    }
                }
            ]
        }, {
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
        }).then(function (response) {
            // console.log("insert :", response);
            const valueRes = response.data.variables[2].value
            const valueResObj = JSON.parse(valueRes)
            console.log(valueResObj);
            if (valueResObj.code == true) {
                setIsViewCreate(false)
                setIsViewKkm(true)
                notification.success({
                    message: 'Sukses',
                    description: 'KKM Pelajaran berhasil ditambahkan.',
                    placement: 'top'
                })
                // pageLoad()
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                })
            }
        })
    }

    const editKkm = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

        axios.post(url_by_institute, {
            "processDefinitionId": insert_data_kkm_pelajaran,
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "matpel": data.mata_pelajaran,
                        "academic_year_id": data.ta_semester,
                        "tingkat": data.tingkat_kelas,
                        "kkm": data.nilai_kkm
                    }
                }
            ]
        }, {
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
        }).then(function (response) {
            const valueRes = response.data.variables[2].value
            const valueResObj = JSON.parse(valueRes)
            if (valueResObj.code == true) {
                setIsViewCreate(false)
                setIsViewKkm(true)
                notification.success({
                    message: 'Sukses',
                    description: 'KKM Pelajaran berhasil di update.',
                    placement: 'top'
                })
                //   pageLoad()
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                })
            }
        })
    }

    const deleteKkm = (record) => {
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
                        "processDefinitionId": global_update,
                        "returnVariables": true,
                        "variables": [
                            {
                                "name": "global_updatedata",
                                "type": "json",
                                "value": {
                                    "tbl_name": "x_academic_subject_master",
                                    "id": record.idPelajaran,
                                    "tbl_coloumn": {
                                        "kkm": null
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
                    console.log(response);
                    setRefreshState(true);
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data pelajaran' + record.namaPelajaran,
                        'success'
                    )
                    // pageLoad()
                })
            }
        })
    }

    const viewCreateKkm = () => {
        setIsViewCreate(true)
        setIsViewKkm(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditKkm = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewKkm(false)
        setIsViewDetail(false)
    }

    const viewDetailKkm = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewKkm(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const FormCreate = () => {
        return (
            <FormKkmPelajaran
                setView={() => setIsViewKkm(true)}
                title="Tambah Data KKM Mata Pelajaran"
                submit={createkkm}
                isDisabled={false}
                selectPelajaran={getPelajaran.map((data) => (
                    <option value={data.id_master}>{data.nama_mata}</option>
                ))}
                selectTingkatKelas={tingkatKelas.map((data) => (
                    <option value={data.id}>{data.class_type}</option>
                ))}
                idTa_semester={academic}
                ta_semester={`${year} / ${semester}`}
                isDisableFormPelajaran={false}

            />
        )
    }

    const FormEdit = () => {
        return (
            <FormKkmPelajaran
                setView={() => setIsViewKkm(true)}
                title="Edit KKM Pelajaran"
                submit={editKkm}
                selectPelajaran={getPelajaran.map((data) => (
                    <option value={data.id_master}>{data.nama_mata}</option>
                ))}
                selectTingkatKelas={tingkatKelas.map((data) => (
                    <option value={data.id}>{data.class_type}</option>
                ))}
                mataPelajaran={selectedUser.mataPelajaran}
                idTa_semester={academic}
                ta_semester={selectedUser.ta_semester}
                idTingkatKelas={selectedUser.idTingkatKelas}
                tingkatKelas={selectedUser.tingkatKelas}
                nilaiKkm={selectedUser.nilaiKkm}
                isDisabled={false}
                isDisableFormPelajaran={true}
            />
        )
    }

    const FormDetail = () => {
        return (
            <FormKkmPelajaran
                setView={() => setIsViewKkm(true)}
                title="View KKM pelajaran"
                submit={createkkm}
                mataPelajaran={selectedUser.mataPelajaran}
                ta_semester={selectedUser.ta_semester}
                tingkatKelas={selectedUser.tingkatKelas}
                nilaiKkm={selectedUser.nilaiKkm}
                isDisabled={true}
                isDisableFormPelajaran={false}
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
                        isViewKkm ?
                            <ViewKkm /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    isViewDetail ?
                                        <FormDetail /> :
                                        <ViewKkm />
                    }
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
};