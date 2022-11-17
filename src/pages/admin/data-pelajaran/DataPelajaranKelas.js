import { useEffect, useState } from "react";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment } from "react";
import {
    PageHeader,
    Card,
    Table,
    Button,
    Space,
    Menu,
    Dropdown,
    message, notification, Tag,
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
    EyeOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import Filter from "../../../components/Filter";
import { FormAdminDataPelKelas } from "../../../components/form/AdminDataPelKelas";
import axios from "axios";
import { FilterAcademic } from "../../../components/FilterAcademic";
import { FilterAllClass } from "../../../components/FilterKelas";
import { searchGlobal } from "../../../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { dateNow } from "../../../components/misc/date";
import Swal from "sweetalert2";
import {
    get_data_mata_pelajaran, get_data_pelajaran_by_tingkat, get_where_no_join,
    global_data_join_where,
    global_join_sub_where_get, global_update, insert_data_pelajaran_kelas,
    url_by_institute
} from "../../../api/reference";

function DataPelajaranKelas() {
    const [grid, setGrid] = useState(false);
    const [isViewDataPelajaranKelas, setIsViewDataPelajaranKelas] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [dataPelajaran, setDataPelajaran] = useState([])
    const [dataKelas, setDataKelas] = useState([])
    const [dataMapel, setDataMapel] = useState([])
    const [dataTahunAkademik, setDataTahunAkademik] = useState([])
    const [paramsPage, setParamsPage] = useState("1");
    const [btnPagination, setBtnPagination] = useState([]);
    const institute = localStorage.getItem("institute");
    const defaultAcademic = localStorage.getItem('academic_year');
    const [academic, setAcademic] = useState(defaultAcademic);
    const [year, setYear] = useState(localStorage.getItem('year'));
    const semester = localStorage.getItem('semester')
    const [academicYears, setAcademicYears] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [tingkatKelas, setTingkatKelas] = useState([]);
    const [selectedTingkatKelas, setSelectedTingkatKelas] = useState(null);
    const [subClass, setSubClass] = useState([]);

    const dispatch = useDispatch();
    const searchRedux = useSelector((state) => state.search);
    const DataSearch = searchRedux.DataSearch;

    const _getDataPelajaran = () => {
        const allClass = selectedClass === "" ? "!=" : "=";
        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_where_get,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_subjects",
                        "select": [
                            "x_academic_subjects.id as id_subjects",
                            "x_academic_subjects.aktiv",
                            "x_academic_subject_master.id as id_subjects_master",
                            "x_academic_subject_master.nama_mata",
                            "x_academic_subject_master.code",
                            "r_class_type.class_type as tingkat_kelas",
                            "x_academic_class.sub_class",
                            "x_academic_class.id as id_class",
                            "x_academic_year.academic_year",
                            "x_academic_year.id as id_academic",
                            "x_academic_year.semester"
                        ],
                        "paginate": 10,
                        "join": [
                            {
                                "tbl_join": "x_academic_year",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects",
                                "foregenkey": "academic_year_id"
                            },
                            {
                                "tbl_join": "x_academic_class",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects",
                                "foregenkey": "course_grade_id"
                            },
                            {
                                "tbl_join": "x_academic_subject_master",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects",
                                "foregenkey": "academic_subjects_master_id"
                            },
                            {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subject_master",
                                "foregenkey": "tingkat"
                            }
                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_academic_subjects",
                                "tbl_field": "academic_year_id",
                                "tbl_value": academic,
                                "operator": "="
                            },
                            {
                                "tbl_coloumn": "x_academic_subjects",
                                "tbl_field": "deleted_at",
                                "tbl_value": "",
                                "operator": "="
                            },
                            {
                                "tbl_coloumn": "x_academic_subjects",
                                "tbl_field": "course_grade_id",
                                "tbl_value": selectedClass,
                                "operator": allClass
                            }
                        ],
                        "order_coloumn": "x_academic_subjects.updated_at",
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
            const resData = JSON.parse(response.data.variables[3].value)
            const dataPel = resData.data.data
            const pagination = resData.data.links;
            setDataPelajaran(dataPel)
            setBtnPagination(pagination);

        })
    }

    const _getAcademicYears = () => {
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
                            "m_institutes.id", "x_academic_year.semester"
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
            const academics = JSON.parse(response.data.variables[3].value);
            setAcademicYears(academics.data.data);
        })
    }

    const _selectKelas = () => {
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
                                "tbl_induk": "x_academic_class",
                                "select": [
                                    "x_academic_class.id",
                                    "r_class_type.class_type as class",
                                    "x_academic_class.sub_class"
                                ],
                                "paginate": false,
                                "join": [
                                    {
                                        "tbl_join": "r_class_type",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_class",
                                        "foregenkey": "class"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    }, {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_academic_class.id",
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

                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            ).then(function (response) {
                const resData = JSON.parse(response.data.variables[3].value)
                const dataKelas = resData.data;

                setDataKelas(dataKelas)

            })
    }

    const _selectMapel = () => {
        axios.post(url_by_institute, {
            processDefinitionId: get_data_pelajaran_by_tingkat,
            returnVariables: true,
            variables: [
                {
                    name: "get_data",
                    type: "json",
                    value: {
                        id_academic: defaultAcademic,
                        paginate: false,
                        tingkat: selectedTingkatKelas,
                    },
                },
            ],
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            console.log(response);
            const resData = JSON.parse(response.data.variables[2].value)
            const dataMapel = resData.data;
            console.log(resData)
            setDataMapel(dataMapel)

        })
    }

    const _selectTahunAkademik = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": get_where_no_join,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_get_where",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_year",
                        "pagination": false,
                        "total_result": 100000,
                        "order_coloumn": "x_academic_year.academic_year",
                        "order_by": "desc",
                        "data": [
                            {
                                "kondisi": "where",
                                "tbl_coloumn": "institute_id",
                                "tbl_value": institute,
                                "operator": "="
                            }
                        ],
                        "tbl_coloumn": [
                            "x_academic_year.id as id_academic_year",
                            "x_academic_year.academic_year",
                            "x_academic_year.semester"
                        ]
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
            const dataThAkademik = JSON.parse(response.data.variables[3].value)
            setDataTahunAkademik(dataThAkademik)

        })
    }

    const _selectTingkatKelas = () => {
        axios.post(url_by_institute, {
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
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const resTingkatKelas = JSON.parse(response.data.variables[2].value);
            setTingkatKelas(resTingkatKelas)
        })
    }

    const _getSubClass = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_where_get,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_class",
                        "select": ["x_academic_class.id as id_kelas",
                            "x_academic_class.sub_class"
                        ],
                        "paginate": false,
                        "join": [
                            {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_class",
                                "foregenkey": "class"
                            }
                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_academic_class",
                                "tbl_field": "deleted_at",
                                "tbl_value": "",
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_class",
                                "tbl_field": "academic_year_id",
                                "tbl_value": academic,
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_class",
                                "tbl_field": "class",
                                "tbl_value": selectedTingkatKelas,
                                "operator": "="
                            }
                        ],
                        "order_coloumn": "x_academic_class.id",
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
            const resData = JSON.parse(response.data?.variables[3]?.value);
            setSubClass(resData.data)
        })
    }

    useEffect(() => {
        _getAcademicYears()
    }, []);

    useEffect(() => {
        _getDataPelajaran()
        _selectKelas()
        _selectTingkatKelas()
    }, [paramsPage, academic, selectedClass, isViewDataPelajaranKelas])

    useEffect(() => {
        _selectMapel()
        _selectTahunAkademik()
    }, [!isViewDataPelajaranKelas, selectedTingkatKelas])

    useEffect(() => {
        if (DataSearch != "") {
            setDataPelajaran(DataSearch?.data?.data);
            setBtnPagination(DataSearch?.data?.links);
        }
    }, [DataSearch]);

    useEffect(() => {
        _getSubClass()
    }, [selectedTingkatKelas]);


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
        const processDef = "globaljoinsubwhereget:2:ffda1ab3-2cc0-11ed-aacc-9a44706f3589";
        const variableSearch = {
            "name": "global_join_where_sub",
            "type": "json",
            "value": {
                "tbl_induk": "x_academic_subjects",
                "paginate": 1000,
                "select": [
                    "x_academic_subjects.id as id_subjects",
                    "x_academic_subjects.aktiv",
                    "x_academic_subject_master.id as id_subjects_master",
                    "x_academic_subject_master.nama_mata",
                    "x_academic_subject_master.code",
                    "x_academic_class.class",
                    "x_academic_class.id as id_class",
                    "x_academic_year.academic_year",
                    "x_academic_year.id as id_academic",
                    "x_academic_year.semester",
                    "x_academic_class.sub_class",
                    "r_class_type.class_type as tingkat_kelas"
                ],
                "join": [
                    {
                        "tbl_join": "x_academic_year",
                        "refkey": "id",
                        "tbl_join2": "x_academic_subjects",
                        "foregenkey": "academic_year_id"
                    },
                    {
                        "tbl_join": "x_academic_class",
                        "refkey": "id",
                        "tbl_join2": "x_academic_subjects",
                        "foregenkey": "course_grade_id"
                    },
                    {
                        "tbl_join": "x_academic_subject_master",
                        "refkey": "id",
                        "tbl_join2": "x_academic_subjects",
                        "foregenkey": "academic_subjects_master_id"
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
                        "kolom": "x_academic_year.institute_id",
                        "value": institute
                    },
                    {
                        "keterangan": "deleted_at",
                        "kolom": "x_academic_subjects.deleted_at"
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
                        "tbl_coloumn": "x_academic_subject_master",
                        "tbl_field": "code",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    },
                    {
                        "tbl_coloumn": "x_academic_class",
                        "tbl_field": "class",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    },
                    {
                        "tbl_coloumn": "x_academic_year",
                        "tbl_field": "academic_year",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    }
                ],
                "order_coloumn": "x_academic_subject_master.nama_mata",
                "order_by": "asc"
            }
        }

        dispatch(searchGlobal(value, paramsPage, processDef, variableSearch))
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log("search:", val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    const data =
        dataPelajaran.map((data, index) => {
            return {
                no: index + 1,
                id: data.id_subjects,
                idMataPelajaran: data.id_subjects_master,
                mataPelajaran: data.nama_mata,
                kode: data.code,
                idKelas: data.id_class,
                kelas: data.tingkat_kelas,
                subKelas: data.sub_class,
                idTahunAkademik: data.id_academic,
                tahunAkademik: data.academic_year,
                semester: data.semester,
                status: data.aktiv
            }
        })

    const TabelDataPelajaranKelas = () => {
        const columns = [
            {
                title: "No",
                dataIndex: "no",
            },
            {
                title: "Tingkat Kelas",
                dataIndex: "kelas",
                align: "center",
            },
            {
                title: "Sub Kelas",
                dataIndex: "subKelas",
                align: "center",
            },
            {
                title: "Kode",
                dataIndex: "kode",
                align: "center",
            },
            {
                title: "Mata Pelajaran",
                dataIndex: "mataPelajaran",
            },
            {
                title: "Tahun Akademik",
                dataIndex: "tahunAkademik",
                align: "center",
            },
            {
                title: "Semester",
                dataIndex: "semester",
                align: "center",
            },
            {
                title: "Status",
                dataIndex: "status",
                align: "center",
                render: (status) => (
                    <>
                        <Tag style={{ borderRadius: "15px" }} color={status ? "green" : "red"} key={status}>
                            {status ? "Aktif" : "Nonaktif"}
                        </Tag>
                    </>
                ),
            },
            {
                title: "Aksi",
                dataIndex: "aksi",
                align: "center",
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailPelKelas(record)} />
                        <EditOutlined style={{ color: "blue" }} onClick={() => viewEditPelKelas(record)} />
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteData(record)} />
                    </Space>
                ),
            },
        ];

        return (
            <>
                <Table
                    className=""
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }}
                />
                <div className="text-center mt-4">
                    {btnPagination.map((dataBtn, index) => {
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
                                key={`interval_${index}`}
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

    const CardDataPelajaranKelas = () => {
        const channelList = dataPelajaran.map((data, index) => {
            return {
                imageUrl: "user.png",
                title: data.nama_mata,
                tag3: data.code,
                kelas: data.tingkat_kelas,
                tahunAkademik: data.academic_year,
                semester: data.semester,
                status: data.aktiv
            }
        })

        return (
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            {value.status == true ?
                                <span
                                    className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                    Aktif
                                </span>
                                :
                                <span
                                    className="badge badge-danger rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                    Nonaktif
                                </span>
                            }
                            <Dropdown
                                className="position-absolute right-0 mr-4 top-0 mt-3"
                                overlay={_Account}
                            >
                                <EllipsisOutlined />
                            </Dropdown>
                            <a
                                href=""
                                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4"
                            >
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a>
                            <h4 className="fw-700 font-xs mt-3 text-capitalize">{value.title}</h4>
                            <div className="clearfix"></div>
                            {value.tag1 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1 mt-2">
                                    {value.tag1}
                                </span>
                            ) : (
                                ""
                            )}
                            {value.tag2 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                    {value.tag2}
                                </span>
                            ) : (
                                ""
                            )}
                            {value.tag3 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-1">
                                    {value.tag3}
                                </span>
                            ) : (
                                ""
                            )}
                            <div className="clearfix"></div>
                            <div className="mt-4 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">
                                            : {value.kelas}
                                        </p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tahun Akademik</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">
                                            : {value.tahunAkademik}
                                        </p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Semester</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">
                                            : {value.semester}
                                        </p>
                                    </div>
                                </div>

                                {/* <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tanggal Proses</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: 12 Juni 2022, 16.00</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const ViewDataKkm = () => {
        return (
            <div className="container px-3 py-4 ">
                <PageHeader
                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                    onBack={() => window.history.back()}
                    title="Data Pelajaran Kelas"
                />
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button
                                className="mr-4"
                                type="primary"
                                shape="round"
                                size="middle"
                                onClick={viewCreatePelKelas}
                            >
                                Tambah Data
                            </Button>
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
                            <Search
                                className="mr-3"
                                placeholder="Cari kata kunci"
                                allowClear
                                onSearch={_onSearch}
                                style={{ width: "80%" }}
                            />
                            {grid == false ? (
                                <a>
                                    <AppstoreOutlined
                                        style={{ fontSize: "2em", lineHeight: 1 }}
                                        onClick={() => setGrid(true)}
                                    />
                                </a>
                            ) : (
                                <a>
                                    <MenuOutlined
                                        style={{ fontSize: "2em", lineHeight: 1 }}
                                        onClick={() => setGrid(false)}
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                </Card>
                <div className="px-3 row d-flex align-items-center">
                    <div className="w-25 mr-4">
                        <label className="mont-font fw-600 font-xssss">
                            Tahun Akademik / Semester
                        </label>
                        <FilterAcademic
                            getYear={(e) => {
                                const { options, selectedIndex } = e.target;
                                setAcademic(e.target.value)
                                setYear(options[selectedIndex].text)
                                const selectedYear = (options[selectedIndex].text)
                                notification.info({
                                    message: "Tahun Akademik",
                                    description: 'Memilih Data Akademik tahun ' + selectedYear,
                                    placement: 'top'
                                })
                            }}
                            selectYear={academicYears.map((data) => {
                                return (
                                    <>
                                        <option value={data.id_academic}>
                                            {data.academic_year} Semester {data.semester}
                                        </option>
                                    </>
                                )
                            }
                            )}
                            academicNow={academic}
                            id="filter_academic_datpelkelas"
                        />
                    </div>
                    <div className="w-25">
                        <label className="mont-font fw-600 font-xssss">
                            Kelas / Sub Kelas
                        </label>
                        <FilterAllClass
                            nameInput="select_kelas_datpel"
                            id="filter_data_pel_kelas"
                            classNow=""
                            selectedClass={selectedClass}
                            getClass={(e) => {
                                const { options, selectedIndex } = e.target;
                                setSelectedClass(e.target.value)
                                const namaKelas = (options[selectedIndex].text)
                                notification.info({
                                    message: "Tahun Akademik",
                                    description: 'Memilih Data Kelas ' + namaKelas,
                                    placement: 'top'
                                })
                            }}
                            selectClass={dataKelas.map((data) => {
                                return (
                                    <>
                                        <option value={data.id}>
                                            {data.class} / {data.sub_class}
                                        </option>
                                    </>
                                )
                            }
                            )}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    {grid ? <CardDataPelajaranKelas /> : <TabelDataPelajaranKelas />}
                </div>
            </div>
        );
    };

    const viewCreatePelKelas = () => {
        setIsViewCreate(true)
        setIsViewDataPelajaranKelas(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditPelKelas = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewDataPelajaranKelas(false)
        setIsViewDetail(false)
    }

    const viewDetailPelKelas = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewDataPelajaranKelas(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const createData = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
        axios.post(url_by_institute, {
            "processDefinitionId": insert_data_pelajaran_kelas,
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "matpel": data.mata_pelajaran,
                        "id_academic": data.thn_akademik,
                        "id_tingkat": data.tingkat_kelas,
                        "id_kelas": data.sub_kelas,
                        "status": data.status

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
            const resData = JSON.parse(response.data?.variables[2]?.value);
            const resCode = resData.code
            if (resCode == 200) {
                setIsViewCreate(false)
                setIsViewDataPelajaranKelas(true)
                notification.success({
                    message: "Sukses",
                    description: 'Data Pelajaran Kelas berhasil ditambahkan',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Data Pelajaran Kelas Gagal ditambahkan',
                    placement: 'top'
                })
            }

        })
    }
    const editData = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
        console.log(selectedUser.id)
        axios.post(url_by_institute, {
            "processDefinitionId": global_update,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_updatedata",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_subjectsModel",
                        "id": selectedUser.id,
                        "tbl_coloumn": {
                            "aktiv": data.status,
                            "is_edit": true
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
            _getDataPelajaran()
            setIsViewEdit(false)
            setIsViewDataPelajaranKelas(true)
            notification.success({
                message: "Sukses",
                description: 'Data pelajaran kelas berhasil di update',
                placement: 'top'
            })
        })
    }
    const deleteData = (record) => {
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
                    "processDefinitionId": global_update,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_updatedata",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_subjectsModel",
                                "id": record.id,
                                "tbl_coloumn": {
                                    "deleted_at": dateNow
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
                    _getDataPelajaran()
                }).catch(error => {
                    alert(error)
                });
            }
        })
    }

    const FormCreate = () => {
        return (
            <FormAdminDataPelKelas
                isViewTable={() => setIsViewDataPelajaranKelas(true)}
                title="Tambah"
                idKelas=""
                namaKelas="Pilih Kelas"
                selectKelas={tingkatKelas.map((data) => (
                    <option value={data.id}>{data.class_type}</option>
                ))}
                selectedTingkatKelas={selectedTingkatKelas}
                idMapel=""
                namaMapel="Pilih Mata Pelajaran"
                selectMapel={dataMapel.map((data) => (
                    <option value={data.nama_mata}>{data.nama_mata}</option>
                ))
                }
                selectSubKelas={subClass == [] ? null : subClass.map((data) => (
                    <option value={data.id_kelas}>{data.sub_class}</option>
                ))}
                allSubClass={subClass.length != 0 ? <option value="all">Semua Sub Kelas</option> : null}
                namaSubKelas="Pilih Sub Kelas"
                idSubKelas=""
                // thAkademik="Pilih Tahun Akademik"
                // selectThAkademik={dataTahunAkademik.map((data) => (
                //     <option value={data.id_academic_year}>{data.academic_year} / Semester {data.semester}</option>
                // ))}
                idThAkademik={defaultAcademic}
                selectThAkademik={`${year} - ${semester}`}
                status="Pilih Status"
                onChangeTingkatKelas={(e) => setSelectedTingkatKelas(e.target.value)}
                valStatus=""
                isDisabled={false}
                submit={createData}
                isDisableForm={false}
            />
        );
    };

    const FormEdit = () => {
        return (
            <FormAdminDataPelKelas
                isViewTable={() => setIsViewDataPelajaranKelas(true)}
                title="Edit"
                idKelas={selectedUser.idKelas}
                namaKelas={`${selectedUser.kelas}`}
                selectKelas={tingkatKelas.map((data) => (
                    <option value={data.id}>{data.class_type}</option>
                ))}
                idMapel={selectedUser.idMataPelajaran}
                namaMapel={selectedUser.mataPelajaran}
                selectMapel={dataMapel.map((data) => (
                    <option value={data.nama_mata}>{data.nama_mata}</option>
                ))}
                // idThAkademik={selectedUser.idTahunAkademik}
                // thAkademik={selectedUser.tahunAkademik}
                // semester={selectedUser.semester}
                // selectThAkademik={dataTahunAkademik.map((data) => (
                //     <option value={data.id_academic_year}>{data.academic_year} / Semester {data.semester}</option>
                // ))}
                idThAkademik={academic}
                selectThAkademik={`${year} / ${semester}`}
                isDisabled={false}
                status={selectedUser.status == true ? "Aktif" : "Nonaktif"}
                valStatus={selectedUser.status}
                idSubKelas={selectedUser.subKelas}
                namaSubKelas={selectedUser.subKelas}
                submit={editData}
                isDisableForm={true}
            />
        );
    };
    const FormDetail = () => {
        return (
            <FormAdminDataPelKelas
                isViewTable={() => setIsViewDataPelajaranKelas(true)}
                title="View"
                idKelas={selectedUser.idKelas}
                namaKelas={`${selectedUser.kelas} / ${selectedUser.subKelas}`}
                idMapel={selectedUser.idMataPelajaran}
                namaMapel={selectedUser.mataPelajaran}
                idSubKelas={selectedUser.subKelas}
                namaSubKelas={selectedUser.subKelas}
                // idThAkademik={selectedUser.idTahunAkademik}
                // thAkademik={selectedUser.tahunAkademik}
                isDisableForm={true}
                idThAkademik={academic}
                selectThAkademik={`${year} / ${semester}`}
                status={selectedUser.status == true ? "Aktif" : "Nonaktif"}
                valStatus={selectedUser.status}
                isDisabled={true}
            />
        );
    };


    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {
                        isViewDataPelajaranKelas ?
                            <ViewDataKkm /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    isViewDetail ?
                                        <FormDetail /> :
                                        <ViewDataKkm />
                    }
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}

export default DataPelajaranKelas;
