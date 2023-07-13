import React, {Fragment, useEffect, useState} from 'react';
import Adminfooter from "../../../components/Adminfooter";
import {Button, Card, DatePicker, notification, PageHeader, Space, Table} from "antd";
import Upload from "antd/es/upload/Upload";
import {
    AppstoreOutlined,
    CheckOutlined, DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    MenuOutlined,
    PlusOutlined
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import axios from "axios";
import {FormDaerah} from "../../../components/form/FormDaerah.js";
import {
    get_where_no_join, global_insert,
    global_join_sub_first,
    global_join_sub_where_get,
    global_update,
    url_by_institute
} from "../../../api/reference.js";
import {FilterAcademic} from "../../../components/FilterAcademic.js";
import Search from "antd/es/input/Search.js";
import Swal from "sweetalert2";
import {FormAdminKelas} from "../../../components/form/AdminKelas.js";
import {FormTandaRapor} from "../../../components/form/AdminTandaRapor.js";

function TandaRapor() {
    const institute = localStorage.getItem('institute');
    const [dataSekolah, setDataSekolah] = useState([])
    const [getTahunAkademik, setGetTahunAkademik] = useState([])
    const [selectedData, setSelectedData] = useState(null);
    const [isViewTable, setIsViewTable] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);

    const getListTahunAkademik = () => {
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
                        "value": "1"
                    }
                ]
            },
        ).then(function (response) {
            const tahunAkademik = JSON.parse(response?.data?.variables[3]?.value)
            setGetTahunAkademik(tahunAkademik?.data)
            console.log(getTahunAkademik)
        })
    }
    const _getDataSekolah = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_eraport_kepala_sekolah",
                            "select": [
                                "x_eraport_kepala_sekolah.*",
                                "x_academic_year.academic_year"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_academic_year",
                                    "refkey": "id",
                                    "tbl_join2": "x_eraport_kepala_sekolah",
                                    "foregenkey": "x_academic_year_id"
                                },
                                {
                                    "tbl_join": "m_institutes",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_year",
                                    "foregenkey": "institute_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "m_institutes",
                                    "tbl_field": "id",
                                    "tbl_value": institute,
                                    "operator": "="
                                }, {
                                    "tbl_coloumn": "x_eraport_kepala_sekolah",
                                    "tbl_field": "deleted_at",
                                    "tbl_value": "",
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_eraport_kepala_sekolah.updated_at",
                            "order_by": "desc"
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
            setDataSekolah(dataRes.data.data)
            console.log(dataRes.data.data)
        }).catch(error => {
            alert(error)
        })
    }

    useEffect(() => {
        _getDataSekolah()
        getListTahunAkademik()
    }, [])

    useEffect(() => {
        _getDataSekolah()
    }, [isViewTable])

    const createTanda = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_insert,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_Insert",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_eraport_kepala_sekolahModel",
                            "tbl_coloumn": {
                                "x_academic_year_id": data.tahun_akademik,
                                "nama_kepala_sekolah": data.nama_kepsek,
                                "tempat_tanggal": data.address_rapor
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
            const isSuccess = resCode.status;
            if (isSuccess == 'success') {
                notification.success({
                    message: "Sukses",
                    description: 'Data Tanda Rapor berhasil di tambahkan',
                    placement: 'top'
                })
                setIsViewCreate(false)
                setIsViewTable(true)
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal ubah data Tanda Rapor.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            alert(error)
        });
    }

    const editTanda = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_update,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_updatedata",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_eraport_kepala_sekolahModel",
                            "id": 1,
                            "tbl_coloumn": {
                                "x_academic_year_id": data.tahun_akademik,
                                "nama_kepala_sekolah": data.nama_kepsek,
                                "tempat_tanggal": data.address_rapor
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
            console.log(response)
            const resCode = JSON.parse(response.data.variables[2].value)
            const isSuccess = resCode.status;
            if (isSuccess == 'success') {
                notification.success({
                    message: "Sukses",
                    description: 'Data Tanda Rapor berhasil di ubah',
                    placement: 'top'
                })
                setIsViewEdit(false)
                setIsViewTable(true)
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal ubah data Tanda Rapor.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            alert(error)
        });
    }

    const deleteData = (record) => {
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
                axios.post(url_by_institute, {
                        "processDefinitionId": global_update,
                        "returnVariables": true,
                        "variables": [
                            {
                                "name": "global_updatedata",
                                "type": "json",
                                "value": {
                                    "tbl_name": "x_eraport_kepala_sekolahModel",
                                    "id": record.id,
                                    "tbl_coloumn": {
                                        "deleted_at": "2019-09-09 00:00:00"

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
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data kelas ' + record.namaKelas,
                        'success'
                    )
                    _getDataSekolah();
                })
            }
        })

    }


    const viewCreate = () => {
        setIsViewCreate(true)
        setIsViewTable(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEdit = (record) => {
        setSelectedData(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewTable(false)
        setIsViewDetail(false)
    }

    const viewDetail = (record) => {
        setSelectedData(record)
        setIsViewCreate(false)
        setIsViewTable(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }


    const TableData = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
            },
            {
                title: 'Nama Kepala Sekolah',
                dataIndex: 'kepala_sekolah',
                align: 'center',
            },
            {
                title: 'Tempat Tanggal',
                dataIndex: 'tempat_tanggal',
                align: 'center',
            },
            {
                title: 'Tahun Akademik',
                dataIndex: 'academic_year',
                align: 'center',
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EyeOutlined style={{color: "black"}} onClick={() => viewDetail(record)}/>
                        <EditOutlined style={{color: "blue"}} onClick={() => viewEdit(record)}/>
                        <DeleteOutlined style={{color: 'red'}} onClick={() => deleteData(record)}/>
                        {/*<div className="ribbon"><span>Last Created</span></div>*/}
                    </Space>
                ),
            },
        ];

        const allDataSekolah = dataSekolah.map((data, index) => {
            return {
                no: index + 1,
                id: data.id,
                academic_year_id: data.x_academic_year_id,
                academic_year: data.academic_year,
                kepala_sekolah: data.nama_kepala_sekolah,
                tempat_tanggal: data.tempat_tanggal
            }
        })

        return (
            <>
                <Table className="py-8"
                       columns={columns}
                       dataSource={allDataSekolah}
                       rowClassName="bg-greylight text-grey-900"
                       scroll={{x: 400}}/>
            </>
        );
    }

    const ViewTable = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Tanda Rapor"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                            onClick={viewCreate}>
                                        Tambah Data
                                    </Button>
                                </div>
                            </div>
                        </Card>
                        <TableData/>
                    </div>
                </div>
            </div>
        )
    }

    const FormCreate = () => {
        return (
            <FormTandaRapor
                setView={() => setIsViewTable(true)}
                title="Tambah Tanda Rapor"
                submit={createTanda}
                selectAcademicYear= {getTahunAkademik.map(data => (
                    <>
                        <option value={data.id}>{data.academic_year}</option>
                    </>
                ))}
                academic_year="Pilih Tahun Akademik"
                isDisabled={false}
            />
        )
    }
    const FormEdit = () => {
        return (
            <FormTandaRapor
                setView={() => setIsViewTable(true)}
                title="Edit Tanda Rapor"
                submit={editTanda}
                selectAcademicYear= {getTahunAkademik.map(data => (
                    <>
                        <option value={data.id}>{data.academic_year}</option>
                    </>
                ))}
                kepalaSekolah={selectedData.kepala_sekolah}
                x_academic_year_id={selectedData.academic_year_id}
                academic_year={selectedData.academic_year}
                tempat_tanggal={selectedData.tempat_tanggal}
                isDisabled={false}
            />
        )
    }
    const FormDetail = () => {
        return (
            <FormTandaRapor
                setView={() => setIsViewTable(true)}
                title="View Tanda Rapor"
                submit={editTanda}
                kepalaSekolah={selectedData.kepala_sekolah}
                x_academic_year_id={selectedData.academic_year_id}
                academic_year={selectedData.academic_year}
                tempat_tanggal={selectedData.tempat_tanggal}
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
                        isViewTable ?
                            <ViewTable/> :
                            isViewCreate ?
                                <FormCreate/> :
                                isViewEdit ?
                                    <FormEdit/> :
                                    isViewDetail ?
                                        <FormDetail/> :
                                        <ViewTable/>
                    }
                    {/*<form onSubmit={editInstitute}*/}
                    {/*      className="p-4"*/}
                    {/*      method="POST">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col-lg-6 mb-3">*/}
                    {/*            <div className="form-group">*/}
                    {/*                <label className="mont-font fw-600 font-xsss">*/}
                    {/*                    Nama Kepala Sekolah*/}
                    {/*                </label>*/}
                    {/*                <input*/}
                    {/*                    defaultValue={dataSekolah.nama_kepala_sekolah}*/}
                    {/*                    name="nama_kepsek"*/}
                    {/*                    type="text"*/}
                    {/*                    className="form-control"*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-lg-6 mb-3">*/}
                    {/*            <div className="form-group">*/}
                    {/*                <label className="mont-font fw-600 font-xsss">*/}
                    {/*                    Tahun Akademik*/}
                    {/*                </label>*/}
                    {/*                <select*/}
                    {/*                    defaultValue={dataSekolah.academic_year}*/}
                    {/*                    name="tahun_akademik"*/}
                    {/*                    className="form-control"*/}
                    {/*                >*/}
                    {/*                    <option value={dataSekolah.x_academic_year_id}*/}
                    {/*                            disabled>{dataSekolah.academic_year}</option>*/}
                    {/*                    {getTahunAkademik.map(data => (*/}
                    {/*                        <>*/}
                    {/*                            <option value={data.id}>{data.academic_year}</option>*/}
                    {/*                        </>*/}
                    {/*                    ))}*/}
                    {/*                </select>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col-lg-12 mb-3">*/}
                    {/*            <div className="form-group">*/}
                    {/*                <label className="mont-font fw-600 font-xsss">*/}
                    {/*                    Tempat Tanggal*/}
                    {/*                </label>*/}
                    {/*                <input*/}
                    {/*                    type="text"*/}
                    {/*                    defaultValue={dataSekolah.tempat_tanggal}*/}
                    {/*                    name="address_rapor"*/}
                    {/*                    className="form-control"*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <div className="row">*/}
                    {/*        <div className="col-lg-12">*/}
                    {/*            <button*/}
                    {/*                className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"*/}
                    {/*                type="submit"*/}
                    {/*            >*/}
                    {/*                Simpan*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                </div>
                <Adminfooter/>
            </div>
        </Fragment>
    );
}

export default TandaRapor;