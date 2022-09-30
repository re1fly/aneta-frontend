import React, { Fragment, useEffect, useState } from 'react';
import Adminfooter from "../../components/Adminfooter";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
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
    Modal,
} from "antd";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EllipsisOutlined,
    MenuOutlined,
    EyeOutlined,
    SearchOutlined
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProcessId, searchGlobal } from "../../redux/Action";
import { FormAdminGuru } from '../../components/form/AdminGuru';
import Swal from "sweetalert2";

import { dateNow } from "../../components/misc/date";
import { FilterAcademic } from "../../components/FilterAcademic";
import {
    export_guru,
    global_data_join_where, global_delete_record,
    global_join_sub_where_get,
    import_guru, insert_guru, update_guru,
    url_by_institute
} from "../../api/reference";
// import { useDataGuru } from '../../components/function/useDataGuru'; ==> component


function DataGuruAdmin() {
    // const {getGuru, getListGuru, setGetGuru} = useDataGuru(); ==> component
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
    // console.log(JSON.stringify(getGuru, null, 2));
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const dispatch = useDispatch();
    const searchRedux = useSelector(state => state.search);
    const DataSearch = searchRedux.DataSearch;

    const getProcess = useSelector(state => state.processId);
    let ProcessId = getProcess.DataProcess;

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
                    "processDefinitionId": global_data_join_where,
                    "returnVariables": true,
                    "variables": [
                        {
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
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
                        }
                    ]
                }
            ).then(function (response) {
                const guru = JSON.parse(response?.data?.variables[3]?.value)
                setGetGuru(guru?.data?.data)
                const pagination = guru?.data?.links;
                setBtnPagination(pagination)
            })
        }
    }


    const getListGuru = () => {

        axios.post(url_by_institute,
            {
                "processDefinitionId": global_join_sub_where_get,
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
                            "order_by": "desc" // => 
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
            const guru = JSON.parse(response?.data?.variables[3]?.value)
            setGetGuru(guru?.data?.data)
            const pagination = guru?.data?.links;
            setBtnPagination(pagination)
        })
    }

    useEffect(() => {

        getListGuru()

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
            const academics = JSON.parse(response?.data?.variables[3]?.value);
            setAcademicYears(academics?.data?.data);
        })

    }, [academic, paramsPage, isViewGuru, refreshState])

    const _exportDataExcel = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": export_guru,
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "academic_year_id": academic
                    }
                }
            ]
        }).then(response => {
            const resData = JSON.parse(response.data.variables[2].value)
            const dataExcel = resData.data
            const byteCharacters = atob(dataExcel);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'DataGuru.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }

    const convertBase64 = (uploaded) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploaded);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const _changeExcelFormat = async (e) => {
        let uploaded = e.target.files[0];
        const base64 = await convertBase64(uploaded);
        const getLinkUrl = base64.split(',')[1]
        console.log(getLinkUrl);

        axios.post(url_by_institute,
            {
                "processDefinitionId": import_guru,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "file_base64": getLinkUrl,
                            "file_type": "xlsx",
                            "type": "update_create",
                            "institute_id": institute
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
            const resData = JSON.parse(response.data.variables[2].value)
            console.log(resData);
            const resCode = resData.data
            if (resCode == "success") {
                setRefreshState(true);
                notification.success({
                    message: "Sukses",
                    description: 'Data Guru berhasil di Import',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan data guru, mohon cek kembali file excel anda.',
                    placement: 'top'
                })
            }
        })

    }

    const _changeExcelFormatNew = async (e) => {
        let uploaded = e.target.files[0];
        const base64 = await convertBase64(uploaded);
        const getLinkUrl = base64.split(',')[1]
        // console.log(getLinkUrl);

        axios.post(url_by_institute,
            {
                "processDefinitionId": import_guru,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "file_base64": getLinkUrl,
                            "file_type": "xlsx",
                            "type": "clear",
                            "institute_id": institute
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
            const resData = JSON.parse(response.data.variables[2].value)
            console.log(resData);
            const resCode = resData.data
            if (resCode == "success") {
                setRefreshState(true);
                notification.success({
                    message: "Sukses",
                    description: 'Data Guru berhasil di Import',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan data guru, mohon cek kembali file excel anda.',
                    placement: 'top'
                })
            }
        })

    }

    const _modalImportNew = () => {
        Modal.warning({
            title: 'Jika anda memilih fitur ini, maka semua data guru akan di replace dengan data excel yang anda impor.',
            width: '800px',
            content: (
                <div>
                    {/*<p>Klik Button dibawah ini untuk mengimpor data :</p>*/}
                    <label id='label_import_new' htmlFor="file_excel_kelas_baru"
                        className="bg-dark border-0 text-center text-white ant-btn-round mr-4 mt-3"
                        style={{ padding: '4px 16px', cursor: 'pointer' }}>
                        Upload File Disini
                    </label>
                    <input
                        onChange={_changeExcelFormatNew}
                        name="new_excel_initiator"
                        className="w100"
                        type="file"
                        id="file_excel_kelas_baru"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        style={{ display: "none" }}
                    />
                </div>
            ),
            okText: 'Batal',
            okType: 'danger'
        });

    }

    const CardDataGuru = () => {
        const channelList = getGuru.map((guru, index) => {
            const dataSk = guru?.sk_date
            const tahunAktifGuru = dataSk?.substring(0, 4)

            return {
                imageUrl: guru.imageUrl,
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

        console.log(channelList);

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
                                <img
                                    src={value.imageUrl}
                                    alt="icon"
                                    className="p-1"
                                    style={{ width: "70px", height: "70px" }}
                                />
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
                title: 'No',
                dataIndex: "no"
            },
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
                            let color = statusGuru.length > 3 ? 'blue' : 'green';
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
                no: index + 1,
                imageUrl: `http://10.1.6.109/storage/${guru.image}`,
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
                idKel: guru.sub_discrict_id,
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
                            <Button className="mr-4" style={{ backgroundColor: '#00a629', color: 'white' }}
                                shape="round" size='middle'
                                onClick={() => _exportDataExcel()}>
                                Export Data
                            </Button>
                            <label for="file_excel_kelas"
                                className="bg-dark border-0 text-center text-white ant-btn-round mr-4"
                                style={{ padding: '4px 16px', cursor: 'pointer' }}>
                                Import Data
                            </label>
                            <input
                                onChange={_changeExcelFormat}
                                name="excel_initiator"
                                className="w100"
                                type="file"
                                id="file_excel_kelas"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                style={{ display: "none" }}
                            />
                            <Button className="mr-4" style={{ backgroundColor: '#5e7082', color: 'white' }}
                                shape="round" size='middle'
                                onClick={_modalImportNew}>
                                Import Data Baru
                            </Button>

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

    const createGuru = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        // const dateNow = new Date().toLocaleString()
        console.log(data);

        axios.post(url_by_institute, {
            "processDefinitionId": insert_guru,
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
                            "created_at": "required",
                            "updated_at": "required",
                            "institute_id": "required",
                            "employment_status": "required",
                            "religion": "required",
                            "tmt_appointment": "required",
                            "agency_appointment": "required",
                            "source_of_salary": "required",
                            "mother_name": "required",
                            "profession_husband_or_wife": "required",
                            "citizenship": "required",
                            "nik": "required"
                        },
                        "user_email": data.email_guru,
                        "user_name": data.nama_guru,
                        "user_role_id": 2,
                        "user_email_verified_at": dateNow,
                        "user_password": "$2a$12$4Qy.9BLBPpRlwl2eboY3xeTAld8ukLjfmc2s6gH6PfmFFQb4WcCW6",
                        "user_place_of_birth": data.tempatlahir_guru,
                        "user_date_of_birth": data.tanggallahir_guru,
                        "user_mobile_phone": data.nomortelefon_guru,
                        "user_state_id": data.provinsi_guru,
                        "user_city_id": data.kota_guru,
                        "user_district_id": data.kecamatan_guru,
                        "user_sub_discrict_id": data.kelurahan_guru,
                        "user_address": data.alamat_guru,
                        "user_image": data.image_base64,
                        "user_image_type": "string",
                        "user_academic_year_id": academicYear,
                        "user_register_date": dateNow,
                        "status": data.status_guru,
                        "created_at": dateNow,
                        "updated_at": dateNow,
                        "institute_id": institute,
                        "employment_status": data.status_kepegawaian,
                        "religion": data.agama,
                        "tmt_appointment": data.tmt_pengangkatan,
                        "agency_appointment": data.lembaga_pengangkatan,
                        "source_of_salary": data.sumber_gaji,
                        "mother_name": data.nama_ibu,
                        "profession_husband_or_wife": data.pekerjaan_pasangan,
                        "citizenship": data.kewarganegaraan,
                        "nik": data.nik
                    }
                },
                {
                    "name": "user_email",
                    "type": "string",
                    "value": ""
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
                            "institute_id": institute,
                            "email_verified_at": dateNow,
                            "password": "$2a$12$4Qy.9BLBPpRlwl2eboY3xeTAld8ukLjfmc2s6gH6PfmFFQb4WcCW6"
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
                            "state_id": data.provinsi_guru,
                            "city_id": data.kota_guru,
                            "district_id": data.kecamatan_guru,
                            "sub_discrict_id": data.kelurahan_guru,
                            "address": data.alamat_guru,
                            "nuptk": data.nuptk,
                            "nip": data.nip,
                            "gender": data.jenis_kelamin,
                            "employment_status": data.status_kepegawaian,
                            "religion": data.agama,
                            "phone": data.nomortelefon2_guru,
                            "village_name": data.nama_dusun,
                            "rt": data.rt,
                            "rw": data.rw,
                            "postal_code": data.kode_pos,
                            "additional_task": data.tugas_tambahan,
                            "sk_cpns": data.sk_cpns,
                            "date_cpns": data.tanggal_cpns,
                            "sk_appointment": data.sk_pengangkatan,
                            "tmt_appointment": data.tmt_pengangkatan,
                            "agency_appointment": data.lembaga_pengangkatan,
                            "group_rank": data.pangkat_golongan,
                            "source_of_salary": data.sumber_gaji,
                            "mother_name": data.nama_ibu,
                            "marital_status": data.status_perkawinan,
                            "name_husband_or_wife": data.nama_pasangan,
                            "nip_husband_or_wife": data.nip_pasangan,
                            "profession_husband_or_wife": data.pekerjaan_pasangan,
                            "tmt_pns": data.tmt_pns,
                            "already_licensed_principal": data.lisensi_kepsek,
                            "ever_working_training": data.diklat_kepegawaian,
                            "braille_skill": data.lkeahian_braille,
                            "sign_language_skill": data.bahasa_isyarat,
                            "npwp": data.npwp,
                            "name_of_the_taxpayer": data.nama_wajibpajak,
                            "citizenship": data.kewarganegaraan,
                            "nik": data.nik,
                            "no_kk": data.no_kk,
                            "bank": data.bank,
                            "no_rek": data.no_rekening,
                            "account_name": data.nama_rekening,
                            "karpeg": data.kerpeg,
                            "karis": data.karis_karsu,
                            "latitude": data.lintang,
                            "longitude": data.bujur,
                            "nuks": data.nuks
                        }
                    }
                },
                {
                    "name": "upload_image",
                    "type": "json",
                    "value": {
                        "image": data.image_base64,
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
                            "status": data.status_guru
                        }
                    }
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
            const valueRes = response.data.variables[20].value;
            const valueResObj = JSON.parse(valueRes);
            console.log(valueResObj);
            if (valueResObj.status == "success") {
                setIsViewCreate(false)
                setIsViewGuru(true)
                notification.success({
                    message: 'Sukses',
                    description: 'Guru berhasil ditambahkan.',
                    placement: 'top'
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                });
            }
            // if (response.data.variables[8].value == 200) {
            //     if (response.data.variables[10].value == 404) {
            //         setIsViewCreate(false)
            //         setIsViewGuru(true)
            //         notification.success({
            //             message: 'Sukses',
            //             description: 'Guru berhasil ditambahkan.',
            //             placement: 'top'
            //         });
            //     } else if (response.data.variables[10].value == 200) {
            //         notification.error({
            //             message: 'Error',
            //             description: 'Email sudah terdaftar, mohon masukkan email lain.',
            //             placement: 'top'
            //         });
            //     } else {
            //         notification.error({
            //             message: 'error',
            //             description: 'Email sudah terdaftar, mohon masukan email lain.',
            //             placement: "top"
            //         });
            //     }
            //     // pageLoad()
            // } else {
            //     notification.error({
            //         message: 'Error',
            //         description: 'Harap isi semua field',
            //         placement: 'top'
            //     });
            // }
            // console.log(response)
        }).catch(error => {
            // alert('Email Telah di gunakan, silahkan gunakan email lain.')
        });
    };

    const editGuru = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        const dateNow = new Date().toLocaleString()
        console.log(data.image_base64)
        console.log(data);

        axios.post(url_by_institute, {
            "processDefinitionId": update_guru,
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
                        "user_state_id": data.provinsi_guru,
                        "user_city_id": data.kota_guru,
                        "user_district_id": data.kecamatan_guru,
                        "user_sub_discrict_id": data.kecamatan_guru,
                        "user_address": data.alamat_guru,
                        "user_image": data.image_base64,
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
                            "state_id": data.provinsi_guru,
                            "city_id": data.kota_guru,
                            "district_id": data.kecamatan_guru,
                            "sub_discrict_id": data.kelurahan_guru,
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
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
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
                // pageLoad()
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
                axios.post(url_by_institute, {
                    "processDefinitionId": global_delete_record,
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
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    }
                }
                ).then(function (response) {
                    console.log(response);
                    getListGuru()
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data guru bernama ' + record.namaGuru,
                        'success'
                    )
                    // pageLoad()
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
                isViewForm={isViewGuru}
                location={"create"}
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormAdminGuru
                setView={() => setIsViewGuru(true)}
                title="Edit Guru"
                submit={editGuru}
                imageUrl={selectedUser.imageUrl}
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
                location={"edit"}
            />
        )
    }

    const FormDetail = () => {
        return (
            <FormAdminGuru
                setView={() => setIsViewGuru(true)}
                title="View Guru"
                submit={createGuru}
                imageUrl={selectedUser.imageUrl}
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
                location={"detail"}

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

