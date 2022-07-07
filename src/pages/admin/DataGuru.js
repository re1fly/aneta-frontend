import React, { Fragment, useEffect, useState } from 'react';
import Adminfooter from "../../components/Adminfooter";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
import Filter from '../../components/Filter';
import {
    Dropdown,
    Menu,
    PageHeader,
    message,
    Card,
    Button,
    Table,
    Tag,
    Space,
    notification,
} from "antd";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EllipsisOutlined,
    MenuOutlined,
    PlusOutlined,
    EyeOutlined
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import { BASE_URL } from "../../api/Url";
import { useDispatch, useSelector } from "react-redux";
import { getProcessId, searchGlobal } from "../../redux/Action";
import { FormAdminGuru } from '../../components/form/AdminGuru';
import Swal from "sweetalert2";
import { dateNow } from "../../components/misc/date";
import { pageLoad } from "../../components/misc/loadPage";
import { FilterAcademic } from "../../components/FilterAcademic";

function DataGuruAdmin() {
    const [grid, setGrid] = useState(false);
    const [isViewGuru, setIsViewGuru] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const institute = localStorage.getItem('institute');
    const academicYear = localStorage.getItem('academic_year')

    const [academic, setAcademic] = useState(academicYear);
    const [academicYears, setAcademicYears] = useState([]);

    const [getGuru, setGetGuru] = useState([]);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const [handleImage, setHandleImage] = useState('')
    const [_Img, setIMG] = useState('');
    const [_ImgBase64, setIMGBase64] = useState('');

    const dispatch = useDispatch();
    const searchRedux = useSelector(state => state.search);
    const DataSearch = searchRedux.DataSearch;
    const dataAddres = useSelector(state => state.addres);

    const provinsi = dataAddres?.DataProvinsi
    const city = dataAddres?.DataCity
    const kecamatan = dataAddres?.DataKecamatan
    const kelurahan = dataAddres?.DataKelurahan

    const [idProv, setIdProv] = useState('');
    const [idCity, setIdCity] = useState('');
    const [idKecamatan, setIdKecamatan] = useState('');

    // useEffect(() => {
    //     dispatch(GetProvinsi());
    //     if (idProv != '') {
    //         dispatch(GetCity(idProv));
    //     }
    //     if (idCity != '') {
    //         dispatch(GetKecamatan(idCity));
    //     }
    //     if (idKecamatan != '') {
    //         dispatch(GetKelurahan(idKecamatan));
    //     }
    // }, [idProv, idCity, idKecamatan])

    const getProcess = useSelector(state => state.processId);
    let ProcessId = getProcess.DataProcess;

    let getKeyGlobalJoin;

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    const onChangeImage = (info) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setIMG(url);
                toDataURL(url, function (dataUrl) {
                    setIMGBase64(dataUrl);
                    setHandleImage(dataUrl);
                    console.log('RESULT:', dataUrl)
                })
            });
        }
    };

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

    useEffect(() => {
        if (DataSearch != '') {
            setGetGuru(DataSearch?.data?.data)
            setBtnPagination(DataSearch?.data?.links)
        }
    }, [DataSearch])

    const _onSearch = (value) => {
        const processDef = ProcessId[0].proses_def_id;
        const variableSearch = {
            "name": "global_join_where",
            "type": "json",
            "value": {
                "tbl_induk": "x_academic_teachers",
                "paginate": 10,
                "join": [
                    {
                        "tbl_join": "x_academic_year",
                        "foregenkey": "academic_year_id",
                        "refkey": "id"
                    },
                    {
                        "tbl_join": "users",
                        "foregenkey": "user_id",
                        "refkey": "id"
                    },
                    {
                        "tbl_join": "m_user_profile",
                        "foregenkey": "user_id",
                        "refkey": "user_id"
                    }
                ],
                "where": [
                    {
                        "tbl_coloumn": "users",
                        "tbl_field": "name",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    },
                    {
                        "tbl_coloumn": "x_academic_teachers",
                        "tbl_field": "sk_number",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    },
                    {
                        "tbl_coloumn": "x_academic_teachers",
                        "tbl_field": "status",
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
                "kondisi": {
                    "keterangan": "where",
                    "kolom": "x_academic_teachers.academic_year_id",
                    "value": academicYear
                },
                "order_coloumn": "users.name",
                "order_by": "asc"
            }
        }
        dispatch(searchGlobal(value, paramsPage, processDef, variableSearch))
    }

    useEffect(() => {
        dispatch(getProcessId(["globaljoinsubwhereget", "getdatajoinwhere"]))
    }, [])

    useEffect(() => {

        axios.post(BASE_URL,
            {
                "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_teachers",
                            "select": [
                                "x_academic_teachers.*",
                                "x_academic_year.*",
                                "users.*",
                                "m_user_profile.*",
                                "r_city.city",
                                "r_state.state",
                                "r_district.district",
                                "r_sub_district.sub_district",
                                "x_academic_teachers.id as id_guru"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_academic_year",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "academic_year_id"
                                },
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "user_id"
                                },
                                {
                                    "tbl_join": "m_user_profile",
                                    "refkey": "user_id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "user_id"
                                },
                                {
                                    "tbl_join": "r_district",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "district_id"
                                },
                                {
                                    "tbl_join": "r_state",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "state_id"
                                },
                                {
                                    "tbl_join": "r_sub_district",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "sub_discrict_id"
                                },
                                {
                                    "tbl_join": "r_city",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "city_id"
                                },
                                {
                                    "tbl_join": "m_institutes",
                                    "refkey": "id",
                                    "tbl_join2": "users",
                                    "foregenkey": "institute_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_teachers",
                                    "tbl_field": "academic_year_id",
                                    "tbl_value": academic,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_academic_teachers.updated_at", // =>
                            "order_by": "desc" // => done
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
            console.log(response);
            const guru = JSON.parse(response?.data?.variables[3]?.value)
            setGetGuru(guru?.data?.data)
            const pagination = guru?.data?.links;
            setBtnPagination(pagination)
        })


        axios.post(BASE_URL, {
            "processDefinitionId": 'getdatajoinwhere:2:d2aed4a7-dff4-11ec-a658-66fc627bf211',
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
            // console.log(response);
            const academics = JSON.parse(response?.data?.variables[3]?.value);
            setAcademicYears(academics?.data?.data);
        })

    }, [academic, paramsPage, isViewGuru, refreshState])

    const CardDataGuru = () => {
        const channelList = getGuru.map((guru, index) => {
            const dataSk = guru.sk_date
            const tahunAktifGuru = dataSk.substring(0, 4)

            return {
                imageUrl: 'user.png',
                namaGuru: guru.name,
                nomorSk: guru.sk_number,
                tahunAktif: tahunAktifGuru,
                tag1: guru.class,
                tag2: '',
                tag3: '',
                statusGuru: [guru.status],
                status: guru.is_active
            }
        })

        return (
            <div className="middle-sidebar-left">
                <div className="row">
                    {channelList.map((value, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                            <div
                                className="card mb-4 d-block w-100 shadow-md rounded-lg p-4 border-0 text-center">
                                <span
                                    className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                    {value.status == "T" ? "Aktif" : "Nonaktif"}
                                </span>
                                <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                    overlay={_Account}>
                                    <EllipsisOutlined />
                                </Dropdown>

                                <a
                                    href="/default-channel"
                                    className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                                >
                                    <img
                                        src={`assets/images/${value.imageUrl}`}
                                        alt="icon"
                                        className="p-1 w-100"
                                    />
                                </a>
                                <h4 className="fw-700 font-xs mt-3 mb-3">{value.namaGuru}</h4>
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
                                        <div className="col-4 pl-0">
                                            <p className="font-xssss float-left lh-1">Status</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="font-xssss float-left lh-1">: {value.statusGuru}</p>
                                        </div>
                                    </div>

                                    <div className="row ml-3">
                                        <div className="col-4 pl-0">
                                            <p className="font-xssss float-left lh-1">Tahun Aktif</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="font-xssss float-left lh-1">: {value.tahunAktif}</p>
                                        </div>
                                    </div>

                                    <div className="row ml-3">
                                        <div className="col-4 pl-0">
                                            <p className="font-xssss float-left lh-1">Nomor SK</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="font-xssss float-left lh-1">: {value.nomorSk}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    };

    const TableDataGuru = () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'namaGuru',
                filters: [
                    {
                        text: 'Ms. Libby Bernhard DDSn',
                        value: 'Ms. Libby Bernhard DDS',
                    },
                    {
                        text: 'Shyann Kirlin Sr.',
                        value: 'Shyann Kirlin Sr.',
                    },
                ],
                onFilter: (value, record) => record.namaGuru.indexOf(value) === 0,
                sorter: (a, b) => a.namaGuru.length - b.namaGuru.length,
                // defaultSortOrder: 'ascend'
            },
            {
                title: 'Nomor SK',
                dataIndex: 'nomorSk',
                // defaultSortOrder: 'descend',
                // sorter: (a, b) => a.nomorSk - b.nomorSk,
            },
            {
                title: 'Status',
                dataIndex: 'statusGuru',
                render: statusGuru => (
                    <>
                        {statusGuru.map(statusGuru => {
                            let color = statusGuru.length > 5 ? 'blue' : 'green';
                            return (
                                <Tag style={{ borderRadius: '15px' }} color={color} key={statusGuru}>
                                    {statusGuru.toUpperCase()}
                                </Tag>

                            );
                        })}
                    </>
                ),
                filters: [
                    {
                        text: 'PNS',
                        value: 'pns',
                    },
                    {
                        text: 'HONORER',
                        value: 'honorer',
                    },
                ],
                onFilter: (value, record) => record.status.indexOf(value) === 0,
            },
            {
                title: 'Tahun Aktif',
                dataIndex: 'tahunAktif',
                // defaultSortOrder: 'descend',
                responsive: ['sm'],
                // sorter: (a, b) => a.nomorSk - b.nomorSk,
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailGuru(record)} />
                        <EditOutlined style={{ color: "blue" }} onClick={() => viewEditGuru(record)} />
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteGuru(record)} />
                    </Space>
                ),
            },
        ];

        const data_sampel = getGuru?.map((guru, index) => {
            const dataSk = guru?.sk_date
            const tahunAktifGuru = dataSk?.substring(0, 4)

            return {
                imageUrl: 'user.png',
                id: guru.id_guru,
                user_id: guru.user_id,
                id_profile: guru.id,
                namaGuru: guru.name,
                nomorSk: guru.sk_number,
                statusGuru: [guru.status],
                tahunAktif: tahunAktifGuru,
                kelas: guru.class,
                nomorHp: guru.mobile_phone,
                email: guru.email,
                tempatLahir: guru.place_of_birth,
                tanggalLahir: guru.date_of_birth,

                idProvinsi: guru.state_id,
                provinsi: guru.state,
                idKota: guru.city_id,
                kota: guru.city,
                idKec: guru.district_id,
                kecamatan: guru.district,
                idKel: guru.sub_district_id,
                kelurahan: guru.sub_district,
                alamat: guru.address,
            }
        })

        return (
            <>
                <Table
                    className="mt-4"
                    columns={columns}
                    dataSource={data_sampel}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ X: 400 }}
                />
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
            </>
        )
    };

    const ViewGuru = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Guru / Tenaga Pengajar"
                        />
                    </div>
                </div>
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={viewCreateGuru}>
                                Tambah Data
                            </Button>
                            <Filter title1="Nama" title2="Tahun Aktif" />
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
                            {/*<div className="float-right">*/}
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

                {grid ? <CardDataGuru /> : <TableDataGuru />}
            </div>
        )
    }

    const TambahGuru = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewGuru(true)}
                                        className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data Guru
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <form id="teacher_form"
                                        onSubmit={createGuru}
                                        method="POST">
                                        <div class="row">
                                            <div className="col-lg-12 mb-5">
                                                <div className="d-flex justify-content-center">
                                                    <Card className="bg-lightblue" style={{ width: 157 }}>
                                                        <ImgCrop rotate>
                                                            <Upload
                                                                name="image_siswa"
                                                                listType="picture-card"
                                                                className="avatar-uploader"
                                                                showUploadList={false}
                                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                onChange={onChangeImage}
                                                            // onPreview={onPreview}
                                                            >
                                                                {_Img ? (
                                                                    <img
                                                                        src={_Img}
                                                                        alt="avatar"
                                                                        style={{
                                                                            width: '100%',
                                                                        }}

                                                                    />
                                                                ) : (
                                                                    <PlusOutlined />
                                                                )}
                                                            </Upload>
                                                        </ImgCrop>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name='nama_guru'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nomor HP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name='nomortelefon_guru'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name='email_guru'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tanggal Lahir
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name='tanggallahir_guru'
                                                        defaultValue="11/11/1111"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Provinsi
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="state_guru"
                                                        defaultValue="11"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kota / Kabupaten
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="kota_guru"
                                                        defaultValue="1101"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kecamatan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="kecamatan_guru"
                                                        defaultValue="1101010"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kelurahan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="kelurahan_guru"
                                                        defaultValue="1101010001"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Status
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="status_guru"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Status Guru
                                                        </option>
                                                        <option value="PNS">
                                                            PNS
                                                        </option>
                                                        <option value="HONORER">
                                                            HONORER
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Alamat
                                                </label>
                                                <textarea
                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                    rows="5"
                                                    placeholder="Isi alamat detail anda..."
                                                    name="alamat_guru"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Simpan
                                                </button>
                                                <a
                                                    onClick={() => setIsViewGuru(true)}
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </a>
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

    const createGuru = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        // const dateNow = new Date().toLocaleString()
        console.log(data);

        axios.post(BASE_URL, {
            "processDefinitionId": "insertdataguru:18:b6bbf8a6-eb91-11ec-9ea6-c6ec5d98c2df",
            "returnVariables": true,
            "variables": [
                {
                    "name": "validasi",
                    "type": "json",
                    "value": {
                        "data": {
                            "user_email": "required",
                            "user_name": "required",
                            "user_role_id": "required",
                            "user_email_verified_at": "required",
                            "user_password": "required",
                            "user_place_of_birth": "required",
                            "user_date_of_birth": "required",
                            "user_mobile_phone": "required",
                            "user_state_id": "required",
                            "user_city_id": "required",
                            "user_district_id": "required",
                            "user_sub_discrict_id": "required",
                            "user_address": "required",
                            "user_image": "required",
                            "user_image_type": "required",
                            "user_academic_year_id": "required",
                            "user_register_date": "required",
                            "status": "required",
                            "sk_number": "required",
                            // "created_at": "required",
                            // "updated_at": "required",
                            "institute_id" : "required"
                            
                        },
                        "user_email": data.email_guru,
                        "user_name": data.nama_guru,
                        "user_role_id": 2,
                        "institute_id" : institute,
                        "user_email_verified_at": dateNow,
                        "user_password": "password",
                        "user_place_of_birth": data.tempatlahir_guru,
                        "user_date_of_birth": data.tanggallahir_guru,
                        "user_mobile_phone": data.nomortelefon_guru,
                        "user_state_id": data.provinsi_guru,
                        "user_city_id": data.kota_guru,
                        "user_district_id": data.kecamatan_guru,
                        "user_sub_discrict_id": data.kelurahan_guru,
                        "user_address": data.alamat_guru,
                        "user_image": "jpg",
                        "user_image_type": "string",
                        "user_academic_year_id": academicYear,
                        "user_register_date": dateNow,
                        "status": data.status_guru,
                        "sk_number": data.sk_guru,
                        // "created_at": dateNow, 
                        // "updated_at": dateNow
                    }
                },
                {
                    "name": "user_email",
                    "type": "string",
                    "value": data.email_guru,
                },
                {
                    "name": "users",
                    "type": "json",
                    "value": {
                        "tbl_name": "usersModel",
                        "tbl_coloumn": {
                            "name": data.nama_guru,
                            "email": data.email_guru,
                            "user_role_id": 2,
                            "institute_id" : institute,
                            "email_verified_at": dateNow,
                            "password": "password",
                        }
                    }
                },
                {
                    "name": "m_profile",
                    "type": "json",
                    "value": {
                        "tbl_name": "m_user_profile",
                        "tbl_coloumn": {
                            "place_of_birth": data.tempatlahir_guru,
                            "date_of_birth": data.tanggallahir_guru,
                            "mobile_phone": data.nomortelefon_guru,
                            "state_id": "11",
                            "city_id": "1101",
                            "district_id": "1101010",
                            "sub_discrict_id": "1101010001",
                            "address": data.alamat_guru
                        }
                    }
                },
                {
                    "name": "upload_image",
                    "type": "json",
                    "value": {
                        "image": "bb",
                        "image_type": "png",
                        "nama_folder": "image_guru"
                    }
                },
                {
                    "name": "x_academic_teachers",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_teachers",
                        "tbl_coloumn": {
                            "academic_year_id": academicYear,
                            "register_date": dateNow,
                            "sk_number": data.sk_guru,
                            "sk_date": dateNow,
                            "status": data.status_guru,
                            // "created_at": dateNow, // => done
                            // "updated_at": dateNow // => done
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
            if (response.data.variables[8].value == 200) {
                if (response.data.variables[10].value == 404) {
                    setIsViewCreate(false)
                    setIsViewGuru(true)
                    notification.success({
                        message: 'Sukses',
                        description: 'Guru berhasil ditambahkan.',
                        placement: 'top'
                    });
                } else if (response.data.variables[10].value == 200) {
                    notification.error({
                        message: 'Error',
                        description: 'Email sudah terdaftar, mohon masukkan email lain.',
                        placement: 'top'
                    });
                } else {
                    notification.error({
                        message: 'error',
                        description: 'Email sudah terdaftar, mohon masukan email lain.',
                        placement: "top"
                    });
                }
                pageLoad()
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                });
            }
            console.log(response)
        }).catch(error => {
            alert('Email Telah di gunakan, silahkan gunakan email lain.')
        });
    };

    const editGuru = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        const dateNow = new Date().toLocaleString()
        console.log(data)

        axios.post(BASE_URL, {
            "processDefinitionId": "updateguru:3:fdd13d0d-f118-11ec-a658-66fc627bf211",
            "returnVariables": true,
            "variables": [
                {
                    "name": "validasi",
                    "type": "json",
                    "value": {
                        "data": {
                            "user_name": "required",
                            "user_role_id": "required",
                            "user_place_of_birth": "required",
                            "user_date_of_birth": "required",
                            "user_mobile_phone": "required",
                            "user_state_id": "required",
                            "user_city_id": "required",
                            "user_district_id": "required",
                            "user_sub_discrict_id": "required",
                            "user_address": "required",
                            "user_image": "required",
                            "user_image_type": "required",
                            "sk_number": "required",
                            "status": "required"
                        },
                        "user_name": data.nama_guru,
                        "user_role_id": 2,
                        "user_place_of_birth": data.tempatlahir_guru,
                        "user_date_of_birth": data.tanggallahir_guru,
                        "user_mobile_phone": data.nomortelefon_guru,
                        "user_state_id": "11",
                        "user_city_id": "1101",
                        "user_district_id": "1101010",
                        "user_sub_discrict_id": "1101010001",
                        "user_address": data.alamat_guru,
                        "user_image": "jpg",
                        "user_image_type": "string",
                        "sk_number": data.sk_guru,
                        "status": data.status_guru,
                    }
                },
                {
                    "name": "users",
                    "type": "json",
                    "value": {
                        "tbl_name": "usersModel",
                        "id": selectedUser.user_id,
                        "tbl_coloumn": {
                            "name": data.nama_guru
                        }
                    }
                },
                {
                    "name": "m_user_profile",
                    "type": "json",
                    "value": {
                        "tbl_name": "m_user_profile",
                        "id": selectedUser.id_profile,
                        "tbl_coloumn": {
                            "place_of_birth": data.tempatlahir_guru,
                            "date_of_birth": data.tanggallahir_guru,
                            "mobile_phone": data.nomortelefon_guru,
                            "state_id": "11",
                            "city_id": "1101",
                            "district_id": "1101010",
                            "sub_discrict_id": "1101010001",
                            "address": data.alamat_guru
                        }
                    }
                },
                {
                    "name": "x_academic_teachers",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_teachers",
                        "id": selectedUser.id,
                        "tbl_coloumn": {
                            "user_id": selectedUser.user_id,
                            "status": data.status_guru,
                            "sk_number": data.sk_guru,
                            // "updated_at": dateNow, // => done
                        }
                    }
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(function (response) {
            if (response.data.variables[5].value == 200) {
                setIsViewEdit(false)
                setIsViewGuru(true)
                notification.success({
                    message: 'Sukses',
                    description: 'Data guru berhasil di update.',
                    placement: 'top'
                })
                pageLoad()
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                })
            }
            console.log(response)
        })
    }

    const deleteGuru = (record) => {
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
                axios.post(BASE_URL, {
                    "processDefinitionId": "GlobalDeleteRecord:3:cc4aec62-d58d-11ec-a2ad-3a00788faff5",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_delete",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_teachersModel",
                                "id": record.id
                            }
                        }
                    ]
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                ).then(function (response) {
                    console.log(response);
                    setRefreshState(true);
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data siswa bernama ' + record.namaGuru,
                        'success'
                    )
                    pageLoad()
                })
            }
        })
    }

    const viewCreateGuru = () => {
        setIsViewCreate(true)
        setIsViewGuru(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditGuru = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewGuru(false)
        setIsViewDetail(false)
    }

    const viewDetailGuru = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewGuru(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const FormCreate = () => {
        return (
            <FormAdminGuru
                setView={() => setIsViewGuru(true)}
                title="Tambah Guru"
                submit={createGuru}
                isDisabled={false}
                disabledEmail={false}
                provinsi="ACEH"
                idProvinsi="11"
                kota="KABUPATEN SIMEULUE"
                idKota="1101"
                kecamatan="TEUPAH SELATAN"
                idKec="1101010"
                kelurahan="LATIUNG"
                idKel="1101010001"
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormAdminGuru
                setView={() => setIsViewGuru(true)}
                title="Tambah Guru"
                submit={editGuru}
                namaGuru={selectedUser.namaGuru}
                nomorHp={selectedUser.nomorHp}
                email={selectedUser.email}
                tempatLahir={selectedUser.tempatLahir}
                tanggalLahir={selectedUser.tanggalLahir}
                nomorSk={selectedUser.nomorSk}
                idProvinsi={selectedUser.idProvinsi}
                provinsi={selectedUser.provinsi}
                idKota={selectedUser.idKota}
                kota={selectedUser.kota}
                idKec={selectedUser.idKec}
                kecamatan={selectedUser.kecamatan}
                idKel={selectedUser.idKel}
                kelurahan={selectedUser.kelurahan}
                statusGuru={selectedUser.statusGuru[0]}
                alamat={selectedUser.alamat}
                isDisabled={false}
                disabledEmail={true}
            />
        )
    }

    const FormDetail = () => {
        return (
            <FormAdminGuru
                setView={() => setIsViewGuru(true)}
                title="View Guru"
                submit={createGuru}
                namaGuru={selectedUser.namaGuru}
                nomorHp={selectedUser.nomorHp}
                email={selectedUser.email}
                tempatLahir={selectedUser.tempatLahir}
                tanggalLahir={selectedUser.tanggalLahir}
                nomorSk={selectedUser.nomorSk}
                idProvinsi={selectedUser.idProvinsi}
                provinsi={selectedUser.provinsi}
                idKota={selectedUser.idKota}
                kota={selectedUser.kota}
                idKec={selectedUser.idKec}
                kecamatan={selectedUser.kecamatan}
                idKel={selectedUser.idKel}
                kelurahan={selectedUser.kelurahan}
                statusGuru={selectedUser.statusGuru[0]}
                alamat={selectedUser.alamat}
                isDisabled={true}
                disabledEmail={true}
            />
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {/* {isViewGuru ? <ViewGuru /> : <TambahGuru />} */}
                    {
                        isViewGuru ?
                            <ViewGuru /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    isViewDetail ?
                                        <FormDetail /> :
                                        <ViewGuru />
                    }
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}

export default DataGuruAdmin;

