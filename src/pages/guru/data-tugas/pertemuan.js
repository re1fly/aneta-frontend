import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
    Progress,
    Row,
    Space,
    Table,
    Tag,
    Upload,
    Select,
} from "antd";
import Link from "react-router-dom/es/Link";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MenuOutlined,
    EyeOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {
    url_by_institute,
    role_guru_create_data_pertemuan_materi,
    global_join_sub_where_get
} from '../../../api/reference';

import axios from 'axios';
import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import { FormCreatePertemuanTugas } from '../../../components/form/GuruPertemuanTugas';
import { pageLoad } from '../../../components/misc/loadPage';

const GuruPertemuan = () => {
    const [grid, setGrid] = useState(false);
    const [dataPertemuan, setDataPertemuan] = useState([])
    const [isViewPertemuan, setIsViewPertemuan] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
   
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const [getKelas, setGetKelas] = useState(null);
    const [dataMapel, setDataMapel] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedMapel, setSelectedMapel] = useState(null);

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const userId = localStorage.getItem('user_id');
    const academic_year_id = localStorage.getItem('academic_year')

    const { Option } = Select;
    const children = [];

    children.push(
        <Option key="1">08:00 - 09:00</Option>,
        <Option key="2">09:00 - 10:00</Option>,
        <Option key="3">10:00 - 11:00</Option>,
        <Option key="3">13:00 - 14:00</Option>,
    );

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

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
            "processDefinitionId": "globaljoinsubwhereget:2:ffda1ab3-2cc0-11ed-aacc-9a44706f3589",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_subjects_schedule_contents_meeting",
                        "select": [
                            "x_academic_subjects_schedule_contents_meeting.id",
                            "x_academic_subjects_schedule_contents_meeting.meeting_name",
                            "x_academic_subjects_schedule_date.date",
                            "x_academic_subjects_schedule_time.time_start",
                            "x_academic_subjects_schedule_time.time_end",
                            "x_academic_subjects_schedule_contents.tittle"
                        ],
                        "paginate": 10,

                        "join": [
                            {
                                "tbl_join": "x_academic_subjects_schedule_date",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                "foregenkey": "schedule_date_id"
                            }, {
                                "tbl_join": "x_academic_subjects_schedule_time",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                "foregenkey": "schedule_time_id"
                            }, {
                                "tbl_join": "x_academic_subjects_schedule_contents",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                "foregenkey": "contents_id"
                            }
                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "subjects_content_type_id",
                                "tbl_value": "2",
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents",
                                "tbl_field": "created_by",
                                "tbl_value": userId,
                                "operator": "="
                            }
                        ],
                        "order_coloumn": "x_academic_subjects_schedule_contents_meeting.updated_at",
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
            setDataPertemuan(dataRes?.data?.data);
            const pagination = dataRes?.data?.links;
            setBtnPagination(pagination)
        })

    }, [userId, paramsPage, selectedClass, refreshState])

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
            title: 'Nama Pertemuan',
            dataIndex: 'namaPertemuan',
            align: 'center',
        },
        {
            title: 'Tanggal Pertemuan',
            dataIndex: 'tanggalPertemuan',
            align: 'center',
        },
        {
            title: 'Jam',
            dataIndex: 'jam',
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
                    <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailPertemuan(record)} />
                    <EditOutlined style={{ color: "blue" }} onClick={() => viewEditPertemuan(record)} />
                    <DeleteOutlined style={{ color: 'red' }} />
                </Space>
            ),
        },
    ];

    const data = dataPertemuan.map((data, index) => {
        return {
            no: index + 1,
            namaMateri: data.tittle,
            namaPertemuan: data.meeting_name,
            tanggalPertemuan: data.date,
            jam: `${data.time_start} - ${data.time_end}`,
        }
    });

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const _onSearch = value => console.log(value);

    const ViewPertemuan = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onClick={() => window.history.back()}
                            title="Data Pertemuan"
                        />
                    </div>
                </div>
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <Row>
                        <Col span={12}>
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={viewCreatePertemuan}>
                                Tambah Data
                            </Button>
                            {/* <Dropdown overlay={_filterMenu}>
                                        <a className="ant-dropdown-link mr-4 font-bold"
                                           onClick={e => e.preventDefault()}>
                                            Filter by <DownOutlined/>
                                        </a>
                                    </Dropdown>
                                    <Dropdown overlay={_sortMenu}>
                                        <a className="ant-dropdown-link font-bold" onClick={e => e.preventDefault()}>
                                            Sort by <DownOutlined/>
                                        </a>
                                    </Dropdown> */}
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
                            >
                                <option value="" selected disabled>
                                    Pilih Mata Pelajaran
                                </option>
                                {dataMapel?.map((data) => (
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

    const TambahMateri = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewPertemuan(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data Pertemuan
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <form id="mataPelajaran_form"
                                        // onSubmit={createJadwalPelajaran}
                                        method="POST">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Materi
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
                                                        required
                                                    >
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Pertemuan
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
                                                        required
                                                    >
                                                    </input>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tanggal Pertemuan
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="pilih_mata_pelajaran"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Tanggal
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Jam
                                                    </label>
                                                    <Select
                                                        className="pt-1 pb-1"
                                                        name="tanggal"
                                                        size="large"
                                                        mode="multiple"
                                                        allowClear
                                                        style={{ width: '100%', borderRadius: '0.25rem', color: '#495057', }}
                                                        placeholder="Pilih Jam"
                                                        onChange={handleChange}
                                                    >
                                                        {children}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button
                                                    className="ml-2 bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Simpan
                                                </button>
                                                <button
                                                    onClick={() => setIsViewPertemuan(true)}

                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-none"
                                                >
                                                    Batal
                                                </button>
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

    const CreatePertemuan = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        // const dateNow = new Date().toLocaleString()
        const idJam = data.jam_pertemuan?.split(',')?.map(Number);
        // console.log(idJam);
        console.log(data);

        axios.post(url_by_institute, {
            "processDefinitionId": role_guru_create_data_pertemuan_materi,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_content": data.nama_materi,
                        "nama_pertemuan": data.nama_pertemuan,
                        "id_date": data.tanggal_pertemuan,
                        "id_jam": idJam,
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
            const valueRes = response.data.variables[2].value;
            const valueResObj = JSON.parse(valueRes);
            // console.log(valueResObj);
            if (valueResObj.message == "success insert") {
                setIsViewCreate(false)
                setIsViewPertemuan(true)
                setRefreshState(true);
                pageLoad()
                localStorage.removeItem("idJam")
                notification.success({
                    message: 'Sukses',
                    description: 'Data Pertemuan berhasil ditambahkan.',
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

    const viewCreatePertemuan = () => {
        setIsViewCreate(true)
        setIsViewPertemuan(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditPertemuan = (record) => {
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewPertemuan(false)
        setIsViewDetail(false)
    }

    const viewDetailPertemuan = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewPertemuan(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const FormCreate = () => {
        return (
            <FormCreatePertemuanTugas
                setView={() => setIsViewPertemuan(true)}
                title="Tambah Data Pertemuan"
                submit={CreatePertemuan}
                isDisabled={false}
            // GetIdJam={GetIdJam}
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormCreatePertemuanTugas
                setView={() => setIsViewPertemuan(true)}
                title="Edit Data Pertemuan"
                // submit={editGuru}
                isDisabled={false}
            />
        )
    }

    const FormDetail = () => {
        return (
            <FormCreatePertemuanTugas
                setView={() => setIsViewPertemuan(true)}
                title="View Data Pertemuan"
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
                        isViewPertemuan ?
                            <ViewPertemuan /> :
                            isViewCreate ?
                                <FormCreate /> :
                                isViewEdit ?
                                    <FormEdit /> :
                                    isViewDetail ?
                                        <FormDetail /> :
                                        <ViewPertemuan />
                    }
                    {/* {isViewPertemuan ? <ViewMateri /> : <TambahMateri />} */}
                </div>
            </div>
        </Fragment>
    );
}

export default GuruPertemuan;