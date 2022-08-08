import React, {Fragment, useEffect, useState} from 'react';
import {
    Button,
    Card,
    Dropdown,
    Menu,
    message,
    notification,
    Space,
    Table,
    PageHeader
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
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";

import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Filter from '../../../components/Filter';
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import {getProcessId, searchGlobal} from "../../../redux/Action";
import {useDispatch, useSelector} from "react-redux";
import {FormAdminKelas} from "../../../components/form/AdminKelas";
import Swal from "sweetalert2";
import {FilterAcademic} from "../../../components/FilterAcademic";

export default function DataKelasAdmin() {
    const [grid, setGrid] = useState(false);
    const [isViewKelas, setIsViewKelas] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const [getKelas, setGetKelas] = useState([]);
    const defaultAcademic = localStorage.getItem('academic_year');

    const [btnPagination, setBtnPagination] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [waliKelas, setWalikelas] = useState([]);
    const institute = localStorage.getItem('institute');
    const [academic, setAcademic] = useState(defaultAcademic);
    const [year, setYear] = useState(localStorage.getItem('year'));
    const [paramsPage, setParamsPage] = useState("1");

    const dispatch = useDispatch();
    const searchRedux = useSelector(state => state.search);
    const DataSearch = searchRedux.DataSearch;

    const getProcess = useSelector(state => state.processId);
    let ProcessId = getProcess.DataProcess;

    let getKeyGlobalJoin;

    useEffect(() => {
        dispatch(getProcessId(["globaljoinsubwhereget", "insertclass", "getdatajoinwhere", "globaljoinsubfirst", "GlobalUpdateRecord"]))
    }, [])

    useEffect(() => {
        if (ProcessId.length != 0) {
            setRefreshState(false)

            getKeyGlobalJoin = ProcessId.find(item => item.key === "globaljoinsubwhereget");
            getKeyGlobalJoin = getKeyGlobalJoin.proses_def_id

            axios.post(BASE_URL,
                {
                    "processDefinitionId": getKeyGlobalJoin,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_class",
                                "select": ["x_academic_class.id as id_class",
                                    "x_academic_class.class",
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
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "users",
                                        "tbl_field": "institute_id",
                                        "tbl_value": institute,
                                        "operator": "="
                                    },
                                    {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "=",
                                        "kondisi": "where"
                                    },
                                    {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "=",
                                        "kondisi": "where"
                                    }
                                ],
                                "order_coloumn": "x_academic_class.updated_at",
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
                    }
                }
            ).then(function (response) {
                const dataRes = JSON.parse(response.data.variables[3].value);
                setGetKelas(dataRes.data.data);
                setBtnPagination(dataRes.data.links);
            })

            axios.post(BASE_URL, {
                    "processDefinitionId": ProcessId[0].proses_def_id,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_teachers",
                                "select": ["x_academic_teachers.id as id_user",
                                    "users.name"],
                                "paginate": 1000,
                                "join": [
                                    {
                                        "tbl_join": "users",
                                        "foregenkey": "user_id",
                                        "refkey": "id"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "users",
                                        "tbl_field": "user_role_id",
                                        "tbl_value": "2",
                                        "operator": "=",
                                        "kondisi": "where"
                                    },
                                    {
                                        "tbl_coloumn": "users",
                                        "tbl_field": "institute_id",
                                        "tbl_value": institute,
                                        "operator": "=",
                                        "kondisi": "where"
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
                    }
                }
            ).then(function (response) {
                const dataRes = JSON.parse(response.data.variables[3].value);
                setWalikelas(dataRes.data.data);
            })

            axios.post(BASE_URL, {
                    "processDefinitionId": ProcessId[0].proses_def_id,
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
                    }
                }
            ).then(function (response) {
                const academics = JSON.parse(response.data.variables[3].value);
                setAcademicYears(academics.data.data);
            })
        }

    }, [paramsPage, ProcessId, isViewKelas, refreshState, academic])


    useEffect(() => {
        if (DataSearch != '') {
            setGetKelas(DataSearch?.data?.data)
            setBtnPagination(DataSearch?.data?.links)
        }
    }, [DataSearch])


    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

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

    const _onSearch = (value) => {
        const processDef = ProcessId[3].proses_def_id;
        const variableSearch = {
            "name": "global_join_where_sub",
            "type": "json",
            "value": {
                "tbl_induk": "x_academic_class",
                "select": ["x_academic_class.id as id_class",
                    "x_academic_class.class",
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
                        "tbl_coloumn": "x_academic_class",
                        "tbl_field": "class",
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
            },
            {
                title: 'Nama Kelas',
                dataIndex: 'namaKelas',
                filters: [],
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                onFilter: (value, record) => record.namaKelas.indexOf(value) === 0,
                // sorter: (a, b) => a.namaKelas.length - b.namaKelas.length,
                // sortDirections: ['ascend'],
            },
            {
                title: 'Sub Kelas',
                dataIndex: 'subKelas',
                // defaultSortOrder: 'ascend',
                // sorter: (a, b) => a.subKelas - b.subKelas,
            },
            {
                title: 'Lokasi Kelas',
                dataIndex: 'lokasiKelas',
                // defaultSortOrder: 'ascend',
            },
            {
                title: 'Tahun Akademik',
                dataIndex: 'tahunAkademik',
                // defaultSortOrder: 'ascend',
            },
            {
                title: 'Wali Kelas',
                dataIndex: 'waliKelas',
                // defaultSortOrder: 'ascend',
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined style={{color: "black"}} onClick={() => viewDetailKelas(record)}/>
                        <EditOutlined style={{color: "blue"}} onClick={() => viewEditKelas(record)}/>
                        <DeleteOutlined style={{color: 'red'}} onClick={() => deleteKelas(record)}/>
                        {/*<div className="ribbon"><span>Last Created</span></div>*/}
                    </Space>
                ),
            },
        ];

        const allDataKelas = getKelas.map((data, index) => {
            return {
                no: index + 1,
                id: data.id_class,
                namaKelas: data.class,
                subKelas: data.sub_class,
                lokasiKelas: data.class_location,
                tahunAkademik: data.academic_year,
                idTahunAkademik: data.id_academic,
                waliKelas: data.name,
                idWaliKelas: data.id_walikelas
            }
        })

        return (
            <>
                <Table className="py-8"
                       columns={columns}
                       dataSource={allDataKelas}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900"
                       scroll={{x: 400}}/>
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
        const channelList = getKelas.map((data, index) => {
            return {
                imageUrl: 'user.png',
                title: data.class,
                tag1: data.sub_class,
                tag2: '',
                lokasiKelas: data.class_location,
                tahunAkademik: data.academic_year,
                waliKelas: data.name
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
                            <a href="" className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4">
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a>
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
                                        <p className="font-xssss float-left lh-1">Lokasi Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.lokasiKelas}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tahun Akademik</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.tahunAkademik}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Wali Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.waliKelas}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewKelas = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Kelas"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                            onClick={viewCreateKelas}>
                                        Tambah Data
                                    </Button>
                                    <FilterAcademic
                                        academicNow={academic}
                                        id="filter_academic_data_kelas"
                                        getYear={(e) => {
                                        const {  options, selectedIndex } = e.target;
                                        setAcademic(e.target.value)
                                        setYear(options[selectedIndex].text)
                                        const selectedYear =(options[selectedIndex].text)
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
                                                    )}/>
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
                        {grid ? <CardDataKelas/> : <TableKelas/>}
                    </div>
                </div>
            </div>
        )
    }

    const createKelas = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

        axios.post(BASE_URL, {
                "processDefinitionId": ProcessId[4].proses_def_id,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "validasi",
                        "type": "json",
                        "value": {
                            "data": {
                                "academic_year_id": "required",
                                "class": "required",
                                "sub_class": "required",
                                "sub_sub_class": "required",
                                "class_location": "required",
                                "calss_advisor_id": "required",
                                "image": "required",
                                "image_type": "required",
                                "nama_folder": "required"
                            },
                            "academic_year_id": data.tahun_akademik,
                            "class": data.nama_kelas,
                            "sub_class": data.sub_kelas,
                            "sub_sub_class": '-',
                            "class_location": data.lokasi_kelas,
                            "calss_advisor_id": data.wali_kelas, //api
                            "image": "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",
                            "image_type": "png",
                            "nama_folder": "image_class"
                        }
                    },
                    {
                        "name": "class",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_academic_classModel",
                            "tbl_coloumn": {
                                "academic_year_id": data.tahun_akademik,
                                "class": data.nama_kelas,
                                "sub_class": data.sub_kelas,
                                "sub_sub_class": '-',
                                "class_location": data.lokasi_kelas,
                                "calss_advisor_id": data.wali_kelas,
                            }
                        }
                    },
                    {
                        "name": "upload_image",
                        "type": "json",
                        "value": {
                            "image": "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",
                            "image_type": "png",
                            "nama_folder": "image_class"
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const resCode = response.data.variables[4].value
            if (resCode == 200) {
                setIsViewCreate(false)
                setIsViewKelas(true)
                notification.success({
                    message: "Sukses",
                    description: 'Data kelas berhasil ditambahkan',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan data kelas, mohon kontak admin.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            alert(error)
        });
    }

    const editKelas = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios.post(BASE_URL, {
                "processDefinitionId": ProcessId[1].proses_def_id,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_updatedata",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_academic_classModel",
                            "id": selectedUser.id,
                            "tbl_coloumn": {
                                "academic_year_id": data.tahun_akademik,
                                "class": data.nama_kelas,
                                "sub_class": data.sub_kelas,
                                "class_location": data.lokasi_kelas,
                                "calss_advisor_id": data.wali_kelas,
                            }
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const resCode = JSON.parse(response.data.variables[2].value)
            const statusCode = resCode.status;
            if (statusCode == 'success') {
                setIsViewEdit(false)
                setIsViewKelas(true)
                notification.success({
                    message: "Sukses",
                    description: 'Data kelas berhasil di update',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan update kelas, mohon kontak admin.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            alert(error)
        });
    }

    const deleteKelas = (record) => {
        const dateNow = new Date().toLocaleString();
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
                axios.post(BASE_URL, {
                        "processDefinitionId": "GlobalUpdateRecord:2:d08b0e52-d595-11ec-a2ad-3a00788faff5",
                        "returnVariables": true,
                        "variables": [
                            {
                                "name": "global_updatedata",
                                "type": "json",
                                "value": {
                                    "tbl_name": "x_academic_classModel",
                                    "id": record.id,
                                    "tbl_coloumn": {
                                        "deleted_at": dateNow
                                    }
                                },
                            }
                        ]
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                ).then(function (response) {
                    setRefreshState(true);
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data kelas ' + record.namaKelas,
                        'success'
                    )
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
            <FormAdminKelas
                setView={() => setIsViewKelas(true)}
                title="Tambah Kelas"
                submit={createKelas}
                // selectYears={academicYears.map((data) => (
                //     <option value={data.id_academic}>{data.academic_year}</option>
                // ))}
                selectWaliKelas={waliKelas.map((data) => (
                    <option value={data.id_user}>{data.name}</option>
                ))}
                tahunAkademik={year}
                idTahunAkademik={academic}
                isDisabled={false}
            />
        )
    }
    const FormEdit = () => {
        return (
            <FormAdminKelas
                setView={() => setIsViewKelas(true)}
                title="Edit Kelas"
                submit={editKelas}
                // selectYears={academicYears.map((data) => (
                //     <option value={data.id_academic}>{data.academic_year}</option>
                // ))}
                selectWaliKelas={waliKelas.map((data) => (
                    <option value={data.id_user}>{data.name}</option>
                ))}
                namaKelas={selectedUser.namaKelas}
                subKelas={selectedUser.subKelas}
                lokasiKelas={selectedUser.lokasiKelas}
                waliKelas={selectedUser.waliKelas}
                idWaliKelas={selectedUser.idWaliKelas}
                tahunAkademik={selectedUser.tahunAkademik}
                idTahunAkademik={selectedUser.idTahunAkademik}
                isDisabled={false}
            />
        )
    }
    const FormDetail = () => {
        return (
            <FormAdminKelas
                setView={() => setIsViewKelas(true)}
                title="View Kelas"
                selectWaliKelas={waliKelas.map((data) => (
                    <option value={data.id_user}>{data.name}</option>
                ))}
                namaKelas={selectedUser.namaKelas}
                subKelas={selectedUser.subKelas}
                lokasiKelas={selectedUser.lokasiKelas}
                waliKelas={selectedUser.waliKelas}
                idWalikelas={selectedUser.idWaliKelas}
                tahunAkademik={selectedUser.tahunAkademik}
                idTahunAkademik={selectedUser.idTahunAkademik}
                isDisabled={true}
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
                        isViewKelas ?
                            <ViewKelas/> :
                            isViewCreate ?
                                <FormCreate/> :
                                isViewEdit ?
                                    <FormEdit/> :
                                    isViewDetail ?
                                        <FormDetail/> :
                                        <ViewKelas/>
                    }
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}