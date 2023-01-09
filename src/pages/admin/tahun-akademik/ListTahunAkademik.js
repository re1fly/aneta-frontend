import React, { Fragment, useState, useEffect } from "react"
import axios from "axios";
import {
    Menu,
    Card,
    Button,
    Dropdown,
    message,
    Tag,
    Space,
    notification,
    DatePicker,
    Table,
    PageHeader,
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    EllipsisOutlined,
    PoweroffOutlined,
    SearchOutlined
} from "@ant-design/icons";

import Search from "antd/es/input/Search";
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import { FormAdminTahunAkademik } from "../../../components/form/AdminTahunAkademik";
import Swal from "sweetalert2";
import { pageLoad } from "../../../components/misc/loadPage";
import { dateNow } from "../../../components/misc/date";
import {
    academic_year_change,
    get_where_no_join, global_delete_record,
    global_insert,
    global_join_sub_where_get,
    global_update,
    url_by_institute
} from "../../../api/reference";

export default function ListTahunAkademik() {
    const [grid, setGrid] = useState(false)
    const [isViewTahunAkademik, setIsViewTahunAkademik] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [getTahunAkademik, setGetTahunAkademik] = useState([])
    console.log(getTahunAkademik);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const academicYear = localStorage.getItem('academic_year');
    const institute = localStorage.getItem('institute');
    const user = localStorage.getItem('user_id');
    const dateFormat = 'YYYY-MM-DD';

    const handleChange = (value) => {
        console.log(`selected ${value}`);
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

    // const _onSearch = (value) => {
    //     if (value == "") {
    //         window.location.reload();
    //     } else {
    //         notification.info({
    //             message: "Search",
    //             description: "Mencari data : " + value,
    //             duration: 1,
    //             icon: <SearchOutlined />,
    //         });
    //         axios.post(url_by_institute,
    //             {
    //                 "processDefinitionId": global_join_sub_where_get,
    //                 "returnVariables": true,
    //                 "variables": [
    //                     {
    //                         "name": "global_join_where_sub",
    //                         "type": "json",
    //                         "value": {
    //                             "tbl_induk": "x_academic_year",
    //                             "paginate": 10,
    //                             "join": [
    //                                 {
    //                                     "tbl_join": "m_institutes",
    //                                     "refkey": "id",
    //                                     "tbl_join2": "x_academic_year",
    //                                     "foregenkey": "institute_id"
    //                                 }
    //                             ],
    //                             "kondisi": [
    //                                 {
    //                                     "keterangan": "where",
    //                                     "kolom": "x_academic_year.institute_id",
    //                                     "value": institute
    //                                 }
    //                             ],
    //                             "where": [
    //                                 {
    //                                     "tbl_coloumn": "x_academic_year",
    //                                     "tbl_field": "academic_year",
    //                                     "tbl_value": value,
    //                                     "operator": "ILIKE"
    //                                 },
    //                                 {
    //                                     "tbl_coloumn": "x_academic_year",
    //                                     "tbl_field": "semester",
    //                                     "tbl_value": value,
    //                                     "operator": "ILIKE"
    //                                 }

    //                             ],
    //                             "order_coloumn": "x_academic_year.id",
    //                             "order_by": "asc"
    //                         }
    //                     },
    //                     {
    //                         "name": "page",
    //                         "type": "string",
    //                         "value": paramsPage
    //                     }
    //                 ]
    //             }
    //         ).then(function (response) {
    //             // console.log(response);
    //             const tahunAkademik = JSON.parse(response?.data?.variables[3]?.value)
    //             // console.log(tahunAkademik.data.data);
    //             setGetTahunAkademik(tahunAkademik?.data?.data)
    //             setBtnPagination(tahunAkademik?.data?.links)
    //         })
    //     }
    // }

    // Get Tahun Akademik
    
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
                            "tbl_name": "x_academic_year",
                            "pagination": true,
                            "total_result": 10,
                            "order_coloumn": "x_academic_year.is_active",
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
                                "*"
                            ]
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": paramsPage
                    }
                ]
            },
        ).then(function (response) {
            const tahunAkademik = JSON.parse(response?.data?.variables[3]?.value)
            setGetTahunAkademik(tahunAkademik?.data)
            setBtnPagination(tahunAkademik?.links)
        })
    }, [institute, paramsPage])

    const CardTahunAkademik = () => {

        const data_sampel = getTahunAkademik?.map((data, index) => {
            return {
                tahunAkademik: data.academic_year,
                semester: data.semester,
                tag2: '',
                tag3: '',
                periodeAwal: data.periode_start,
                periodeAkhir: data.periode_end,
                tahunAkademikAktif: [data.is_active],
            }
        })

        return (
            <>
                <div className="row">
                    {data_sampel?.map((value, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" /*key={index}*/>
                            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                {value.tahunAkademikAktif == "T" ?
                                    <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                        Aktif
                                    </span> :
                                    <span className="badge badge-danger rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                        Tidak Aktif
                                    </span>}
                                {/* <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                    {value.tahunAkademikAktif == "T" ? 'Aktif' : 'Tidak Aktif'}
                                </span> */}
                                <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                    overlay={_Account}>
                                    <EllipsisOutlined />
                                </Dropdown>
                                <h4 className="fw-700 font-xs mt-5">Tahun Akademik</h4>
                                <h4 className="fw-700 font-xs">{value.tahunAkademik}</h4>
                                <div className="clearfix"></div>
                                {value.semester ? (
                                    <span
                                        className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1 mt-2">
                                        Semester {value.semester}
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
                                            <p className="font-xssss float-left lh-1">Periode Awal</p>
                                        </div>
                                        <div className="">
                                            <p className="font-xssss float-left lh-1">: {value.periodeAwal}</p>
                                        </div>
                                    </div>

                                    <div className="row ml-3">
                                        <div className="col-6">
                                            <p className="font-xssss float-left lh-1">Periode Akhir</p>
                                        </div>
                                        <div className="">
                                            <p className="font-xssss float-left lh-1">: {value.periodeAkhir}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    const TableTahunAkademik = () => {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: 'Tahun Akademik',
                dataIndex: 'tahunAkademik',
                align: 'center',
            },
            {
                title: 'Semester',
                dataIndex: 'semester',
                defaultSortOrder: 'descend',
                align: 'center',
                responsive: ['sm'],
            },
            {
                title: 'Periode Awal',
                dataIndex: 'periodeAwal',
                align: 'center',
                defaultSortOrder: 'descend',
                responsive: ['sm'],
            },
            {
                title: 'Periode Akhir',
                dataIndex: 'periodeAkhir',
                align: 'center',
                defaultSortOrder: 'descend',
                responsive: ['sm'],
            },
            {
                title: 'Tahun Akademik Aktif',
                dataIndex: 'tahunAkademikAktif',
                align: 'center',
                render: tahunAkademikAktif => (
                    <>
                        {tahunAkademikAktif.map(tahunAkademikAktif => {
                            let color = tahunAkademikAktif != "T" ? 'red' : 'green';
                            return (
                                <Tag style={{ borderRadius: '15px' }} color={color} key={tahunAkademikAktif}>
                                    {tahunAkademikAktif != "T" ? "Tidak Aktif" : "Aktif"}
                                </Tag>

                            );
                        })}
                    </>
                ),
            },
            {
                title: 'Aksi',
                key: 'action',
                align: 'center',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <PoweroffOutlined onClick={() => setAktifTahunAkademik(record)} />
                        {/* <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailTahunAkademik(record)} /> */}
                        <EditOutlined style={{ color: "blue" }} onClick={() => viewEditTahunAkademik(record)} />
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteTahunAkademik(record)} />
                    </Space>
                ),
            },
        ];

        const data_sampel = getTahunAkademik?.map((data, index) => {
            return {
                id: data.id,
                tahunAkademik: data.academic_year,
                semester: data.semester,
                periodeAwal: data.periode_start,
                periodeAkhir: data.periode_end,
                tahunAkademikAktif: [data.is_active],
                jumlahMurid: data.number_of_student,
                jumlahGuru: data.number_of_teachers,
                jumlahStaff: data.number_of_staff,
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

    const ViewTahunAkademik = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Tahun Akademik"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                        onClick={viewCreateAkademik}>
                                        Tambah Data
                                    </Button>
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                        // onSearch={_onSearch} 
                                        style={{ width: '80%' }} />
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
                        {grid ? <CardTahunAkademik /> : <TableTahunAkademik />}
                        {/* {grid ? <TableTahunAkademik /> : <TableTahunAkademik />} */}
                    </div>
                </div>
            </div>
        );
    };

    const TambahTahunAkademik = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <form id="teacher_form"
                                onSubmit={creatTahunAkademik}
                                method="POST">
                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                        <i onClick={() => setIsViewTahunAkademik(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                        <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                            Tambah Data Tahun Akademik
                                        </h4>
                                    </div>
                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tahun Akademik
                                                    </label>
                                                    <DatePicker
                                                        className="form-control"
                                                        picker="year"
                                                        placeholder="Pilih Tahun Akademik"
                                                        name="tahun_akademik"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Semester
                                                    </label>
                                                    {/* <input
                                                        type="text"
                                                        defaultValue="1"
                                                        name="semster"
                                                        className="form-control"
                                                        maxLength={2}
                                                    /> */}
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="semester"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Semster
                                                        </option>
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Periode Awal
                                                    </label>
                                                    <DatePicker
                                                        className="form-control"
                                                        format={dateFormat}
                                                        placeholder="Pilih Periode Awal"
                                                        name="periode_awal"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Periode Akhir
                                                    </label>
                                                    <DatePicker
                                                        className="form-control"
                                                        format={dateFormat}
                                                        placeholder="Pilih Periode Akhir"
                                                        name="periode_akhir"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Status
                                                    </label>
                                                    <select className="form-control" defaultValue="Pilih Status" name="status_akhir" onChange={handleChange} disabled={true} >
                                                        {getTahunAkademik != null ? <option className="form-control" value="F">Nonaktif</option>
                                                            : <option className="form-control" value="T">Aktif</option>}
                                                        {/* <option className="form-control" value="aktif">Aktif</option>
                                                        <option className="form-control" value="nonaktif">Nonaktif</option> */}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Jumlah Murid
                                                    </label>
                                                    <input
                                                        type="number"
                                                        defaultValue="300"
                                                        name="jumlah_murid"
                                                        className="form-control"
                                                        maxLength={4}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Jumlah Guru
                                                    </label>
                                                    <input
                                                        type="number"
                                                        defaultValue="20"
                                                        name="jumlah_guru"
                                                        className="form-control"
                                                        maxLength={4}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Jumlah Staff
                                                    </label>
                                                    <input
                                                        type="number"
                                                        defaultValue="30"
                                                        name="jumlah_staff"
                                                        className="form-control"
                                                        maxLength={4}
                                                    />
                                                </div>
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
                                                    onClick={() => setIsViewTahunAkademik(true)}
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Kembali
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const creatTahunAkademik = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        const dateNow = new Date().toLocaleString()
        console.log(data)
        const akademikInsert = `${data.tahun_akademik} / ${parseInt(data.tahun_akademik) + 1} `

        axios.post(url_by_institute, {
            "processDefinitionId": global_insert,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_Insert",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_yearModel",
                        "tbl_coloumn": {
                            "uuid": "",
                            "institute_id": institute,
                            "academic_year": akademikInsert,
                            "periode_start": data.periode_awal,
                            "periode_end": data.periode_akhir,
                            "is_active": data.tahunAkademik_aktif,
                            "number_of_student": data.jumlah_murid,
                            "number_of_teachers": data.jumlah_guru,
                            "number_of_staff": data.jumlah_staff,
                            "semester": data.semester,
                            "created_at": dateNow,
                            "updated_at": dateNow,
                            "created_by": user
                        }
                    }
                }
            ]
        }).then(function (response) {
            const dataRes = JSON.parse(response.data.variables[2].value)
            if (dataRes.status == 'success') {
                // setIsViewPelajaran(true)
                notification.success({
                    message: 'Sukses',
                    description: 'Tahun Akademik berhasil ditambahkan.',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                })
            }
            if (data.tahunAkademik_aktif == "T") {
                localStorage.setItem('academic_year', dataRes.id);
                localStorage.setItem('year', data.tahun_akademik);
                localStorage.setItem('semester', data.semester);
            }
            pageLoad()
        })
    }

    const editTahunAkademik = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        // const dateNow = new Date().toLocaleString()
        console.log(data)
        const akademikInsert = `${data.tahun_akademik} / ${parseInt(data.tahun_akademik) + 1} `

        axios.post(url_by_institute, {
            "processDefinitionId": global_update,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_updatedata",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_yearModel",
                        "id": selectedUser.id,
                        "tbl_coloumn": {
                            "uuid": '',
                            "institute_id": institute,
                            "academic_year": akademikInsert,
                            "periode_start": data.periode_awal,
                            "periode_end": data.periode_akhir,
                            "is_active": data.status_akhir,
                            "number_of_student": data.jumlah_murid,
                            "number_of_teachers": data.jumlah_guru,
                            "number_of_staff": data.jumlah_staff,
                            "semester": data.semester,
                            "created_at": dateNow,
                            "updated_at": dateNow,
                            "created_by": user
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
            const valueRes = response.data.variables[2].value
            const valueResObj = JSON.parse(valueRes)
            if (valueResObj.status == "success") {
                setIsViewEdit(false)
                setIsViewTahunAkademik(true)
                notification.success({
                    message: 'Sukses',
                    description: 'Data Tahun Akademik berhasil di update.',
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

    const deleteTahunAkademik = (record) => {
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
                                "tbl_name": "x_academic_yearModel",
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
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data tahun akademik ' + record.tahunAkademik,
                        'success'
                    )
                    pageLoad()
                })
            }
        })
    }

    const setAktifTahunAkademik = (record) => {
        Swal.fire({
            title: 'Apakah anda yakin merubah tahun akademik aktif?',
            // text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Ya',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url_by_institute, {
                    "processDefinitionId": academic_year_change,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": {
                                "institute_id": institute,
                                "academic_id": record.id
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
                    // console.log(response);
                    const valueRes = response.data.variables[2].value
                    const valueResObj = JSON.parse(valueRes)
                    console.log(valueResObj);
                    if (valueResObj.status == "success") {
                        localStorage.setItem('academic_year', record.id);
                        localStorage.setItem('year', record.tahunAkademik);
                        localStorage.setItem('semester', record.semester);
                    }
                    Swal.fire(
                        'Tahun Akademik Aktif telah diganti!',
                        'Tahun Akademik Aktif saat ini ' + record.tahunAkademik + ' Semester ' + record.semester,
                        'success'
                    )
                    pageLoad()
                })
            }
        })
    }

    const viewCreateAkademik = () => {
        setIsViewCreate(true)
        setIsViewTahunAkademik(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditTahunAkademik = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewTahunAkademik(false)
        setIsViewDetail(false)
    }

    const viewDetailTahunAkademik = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewTahunAkademik(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const setAktif = (record) => {
        setSelectedUser(record)

    }

    const FormCreate = () => {
        return (
            <FormAdminTahunAkademik
                setView={() => setIsViewTahunAkademik(true)}
                title="Tambah Tahun Akademik"
                submit={creatTahunAkademik}
                isDisabled={false}
                isViewForm={isViewTahunAkademik}
                getTahunAkademik={getTahunAkademik}
                location={"create"}
                isDisabledStatus={true}
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormAdminTahunAkademik
                setView={() => setIsViewTahunAkademik(true)}
                title="Edit Tahun Akademik"
                submit={editTahunAkademik}
                id={selectedUser.id}
                tahunAkademik={selectedUser.tahunAkademik}
                semester={selectedUser.semester}
                periodeAwal={selectedUser.periodeAwal}
                periodeAkhir={selectedUser.periodeAkhir}
                tahunAkademikAktif={selectedUser.tahunAkademikAktif[0]}
                jumlahMurid={selectedUser.jumlahMurid}
                jumlahGuru={selectedUser.jumlahGuru}
                jumlahStaff={selectedUser.jumlahStaff}
                isDisabled={false}
                getTahunAkademik={getTahunAkademik}
                isDisabledStatus={true}
                location={"edit"}
            />
        )
    }

    const FormDetail = () => {
        return (
            <FormAdminTahunAkademik
                setView={() => setIsViewTahunAkademik(true)}
                title="Detail Tahun Akademik"
                submit={creatTahunAkademik}
                id={selectedUser.id}
                tahunAkademik={selectedUser.tahunAkademik}
                semester={selectedUser.semester}
                periodeAwal={selectedUser.periodeAwal}
                periodeAkhir={selectedUser.periodeAkhir}
                tahunAkademikAktif={selectedUser.tahunAkademikAktif[0]}
                jumlahMurid={selectedUser.jumlahMurid}
                jumlahGuru={selectedUser.jumlahGuru}
                jumlahStaff={selectedUser.jumlahStaff}
                getTahunAkademik={getTahunAkademik}
                isDisabled={true}
                isDisabledStatus={true}
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
                    {/* {isViewTahunAkademik ? <ViewTahunAkademik /> : <TambahTahunAkademik />} */}
                    {
                        isViewTahunAkademik ?
                            <ViewTahunAkademik /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    isViewDetail ?
                                        <FormDetail /> :
                                        <ViewTahunAkademik />
                    }
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
};