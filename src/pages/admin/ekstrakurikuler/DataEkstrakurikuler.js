import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Dropdown, Menu, message, Modal, notification, PageHeader, Space, Table, Tooltip} from "antd";
import Filter from "../../../components/Filter";
import {FilterAcademic} from "../../../components/FilterAcademic";
import Search from "antd/es/input/Search";
import {
    AppstoreOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    EyeOutlined,
    MenuOutlined, UserAddOutlined
} from "@ant-design/icons";
import {FormAdminEkskul} from "../../../components/form/AdminEkskul";
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import {
    get_all_siswa_extrakurikuler,
    get_extrakurikuler,
    get_where_no_join, global_delete_record,
    global_insert,
    global_join_sub_where_get,
    global_update, insert_siswa_to_extrakurikuler,
    url_by_institute
} from "../../../api/reference";
import Swal from "sweetalert2";
import {searchGlobal} from "../../../redux/Action";
import {useDispatch, useSelector} from "react-redux";


export default function DataEkstrakurikuler() {
    const [grid, setGrid] = useState(false);
    const [selectedEkskul, setSelectedEkskul] = useState({idEkskul: null});
    const [isViewEkskul, setIsViewEkskul] = useState(true);
    // const [pembina, setPembina] = useState([]);
    // const [tahunAkademik, setIsTahunAkademik] = useState([])
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewSiswa, setIsViewSiswa] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const academicYear = localStorage.getItem('academic_year')
    const institute = localStorage.getItem('institute')
    const [btnPagination, setBtnPagination] = useState([]);
    const [dataEkskul, setDataEkskul] = useState([])
    const [dataPembina, setDataPembina] = useState([])
    const [dataTahunAkademik, setDataTahunAkademik] = useState([])
    const [paramsPage, setParamsPage] = useState("1");
    const [dataSelectedSiswa, setDataSelectedSiswa] = useState([])
    const dispatch = useDispatch();
    const searchRedux = useSelector(state => state.search);
    const DataSearch = searchRedux.DataSearch;

    const _getEkskul = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": "getekstrakurikuler:2:6ed4a14b-6a2b-11ed-bb6a-a2fb3d782380",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "academic_year_id": academicYear

                        }
                    }, {
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
            console.log(response)
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            setDataEkskul(dataRes.data)
            setBtnPagination(dataRes.links);
        })
    }
    const _getPembina = () => {
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
                                "users.name",
                                "x_academic_teachers.id as id_guru"

                            ],
                            "paginate": 1000,
                            "join": [
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "user_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_teachers",
                                    "tbl_field": "academic_year_id",
                                    "tbl_value": academicYear,
                                    "operator": "="
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
            }
        ).then(function (response) {
            const guru = JSON.parse(response?.data?.variables[3]?.value)
            setDataPembina(guru?.data?.data)
        })
    }
    const _getTahunAkademik = () => {
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
                            "pagination": false,
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
            setDataTahunAkademik(tahunAkademik)
            console.log(response)
        })
    }


    const _getSiswaEksul = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_ekstrakurikuler_detail",
                            "select": [
                                "x_ekstrakurikuler_detail.id",
                                "m_user_profile.nisn",
                                "users.name",
                                "r_class_type.class_type",
                                "x_academic_class.sub_class"
                            ],
                            "paginate": false,
                            "join": [
                                {
                                    "tbl_join": "x_academic_students",
                                    "refkey": "id",
                                    "tbl_join2": "x_ekstrakurikuler_detail",
                                    "foregenkey": "student_id"
                                },
                                {
                                    "tbl_join": "x_academic_class",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "class_id"
                                },
                                {
                                    "tbl_join": "r_class_type",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_class",
                                    "foregenkey": "class"
                                },
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "user_id"
                                },
                                {
                                    "tbl_join": "m_user_profile",
                                    "refkey": "user_id",
                                    "tbl_join2": "users",
                                    "foregenkey": "id"
                                }
                            ],
                            "kondisi": [
                                {
                                    "keterangan": "deleted_at",
                                    "kolom": "x_academic_students.deleted_at"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_ekstrakurikuler_detail",
                                    "tbl_field": "ekstrakurikuler_master_id",
                                    "tbl_value": selectedEkskul.idEkskul,
                                    "operator": "="
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
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            console.log(response)
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            const data = dataRes.data
            setDataSelectedSiswa(data)
        })
    }


    useEffect(() => {
        _getEkskul()
        _getPembina()
        _getTahunAkademik()
    }, [paramsPage, isViewEkskul]);

    useEffect(() => {
        if (DataSearch != '') {
            setDataEkskul(DataSearch?.data)
            setBtnPagination(DataSearch?.links)
        }
    }, [isViewSiswa])


    useEffect(() => {
        _getSiswaEksul()
    }, [selectedEkskul]);

    const FormAdminSiswaEkskul = (props) => {
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [submitAll, setSubmitAll] = useState(false)
        const [selectedSiswa, setSelectedSiswa] = useState([])
        const [dataAllSiswa, setDataAllSiswa] = useState([])
        const [tingkatKelas, setTingkatKelas] = useState([])
        const [selectedClass, setSelectedClass] = useState(null)
        const _getAllSiswa = () => {
            axios.post(url_by_institute, {
                    "processDefinitionId": get_all_siswa_extrakurikuler,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "id": localStorage.getItem("id_ekskul"),
                                "id_academic": academicYear,
                                "id_tingkat": selectedClass
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
                const dataRes = JSON.parse(response?.data?.variables[3]?.value);
                const data = dataRes.data
                setDataAllSiswa(data)
            })
        }

        const _deleteSiswa = (id) => {
            Swal.fire({
                title: 'Apakah anda yakin menghapus data?',
                text: "Anda harus menambahkan ulang pada data yang sudah terhapus",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Batalkan',
                confirmButtonText: 'Hapus',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(url_by_institute,
                        {
                            "processDefinitionId": global_delete_record,
                            "returnVariables": true,
                            "variables": [
                                {
                                    "name": "global_delete",
                                    "type": "json",
                                    "value": {
                                        "tbl_name": "x_ekstrakurikuler_detailModel",
                                        "id": id
                                    }
                                }
                            ]
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Basic YWRtaW46TWFuYWczciE="
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
                        }).then(function (response) {
                        const resData = JSON.parse(response?.data?.variables[2]?.value)

                        if (resData.status == "success") {
                            notification.success({
                                message: "Sukses",
                                description: "Siswa berhasil dihapus.",
                                placement: "top",
                            });
                            _getSiswaEksul()
                            _getAllSiswa()
                        } else {
                            notification.error({
                                message: "Error",
                                description: "Error menghapus data, harap hubungi admin EDII",
                                placement: "top",
                            });
                        }
                    })
                }
            })
        }

        const _getTingkatKelas = () => {
            axios.post(url_by_institute, {
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
                                "paginate": false,
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
                const dataRes = JSON.parse(response?.data?.variables[3]?.value);
                setTingkatKelas(dataRes.data)
            })
        }

        const _onSearch = (value) => {
            axios
                .post(
                    BASE_URL,
                    {
                        processDefinitionId: 'getallsiswaextrakurikuler:1:50e0ade7-6b9e-11ed-bb6a-a2fb3d782380',
                        returnVariables: true,
                        variables: [
                            {
                                "name": "data",
                                "type": "json",
                                "value": {
                                    "id": selectedEkskul.idEkskul,
                                    "id_academic": academicYear,
                                    "search": value
                                }
                            },
                            {
                                name: "page",
                                type: "string",
                                value: paramsPage,
                            },
                        ],
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Basic YWRtaW46TWFuYWczciE="
                        },
                    }
                )
                .then(function (response) {
                    const siswa = JSON.parse(response.data.variables[3].value);
                    setDataAllSiswa(siswa.data)
                });
        }
        const allSiswa = dataAllSiswa.map((data, index) => {
            return {
                no: index + 1,
                idSiswa: data.id,
                nisn: data.nisn,
                namaSiswa: data.name,
                kelas: `${data.class_type} / ${data.sub_class}`
            }
        })

        const siswaOnEkskul = dataSelectedSiswa.map((data, index) => {
            return {
                no: index + 1,
                idSiswa: data.id,
                nisn: data.nisn,
                namaSiswa: data.name,
                kelas: `${data.class_type} / ${data.sub_class}`
            }
        })
        const getClick = () => {
            let checkedValue = document.querySelector("input[type=checkbox]");
            setSubmitAll(checkedValue?.checked == true)
            if(submitAll == false){
                let checkedV = [...document.querySelectorAll("#checkbox")].map(e => e.name)
                setSelectedSiswa(checkedV)
            }

        }
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
            },
            {
                title: 'NISN',
                dataIndex: 'nisn',
            },
            {
                title: 'Nama Siswa',
                dataIndex: 'namaSiswa',

            },
            {
                title: 'Kelas',
                dataIndex: 'kelas',
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                align: 'center',
                render: (text, record) => (
                    <Space size="middle">
                        <DeleteOutlined style={{color: 'red'}} onClick={() => _deleteSiswa(record.idSiswa)}/>
                    </Space>
                ),
            },
        ];
        const columnsAddSiswa = [
            // {
            //     title: 'Pilih Siswa',
            //     key: 'action',
            //     responsive: ['sm'],
            //     align: 'center',
            //     render: (text, record) => {
            //         return (
            //             <input name={record.id} key={record.id} id="checkbox" className="messageCheckbox"
            //                    checked={submitAll == true ? true : null}
            //                    style={{marginTop: '20px'}} className="ml-3 mb-4" type="checkbox"
            //                    onChange={(e) => e.target.checked == true ? setSelectedSiswa([...selectedSiswa, record.idSiswa]) :
            //                        setSelectedSiswa(selectedSiswa.filter(item =>
            //                            item !== record.idSiswa
            //                        ))}
            //             />
            //         )
            //     }
            // },
            {
                title: 'Pilih Siswa',
                align: "center",
                children: [
                    {
                        title:
                            <input name="is_upload" class="messageCheckbox" checked={submitAll == true ? true : null}
                                   onClick={() => {
                                       getClick(this?.value)
                                   }} style={{marginTop: '20px'}} className="ml-3 mb-4" type="checkbox"/>,
                        align: "center",
                        render: (text, record) => {
                            return (
                                <input name={record.idSiswa} key={record.idSiswa} id="checkbox" className="messageCheckbox ml-3 mb-4" 
                                       checked={submitAll == true ? true : null}
                                       style={{marginTop: '20px'}} type="checkbox"
                                       onChange={(e) => e.target.checked == true ? setSelectedSiswa([...selectedSiswa, record.idSiswa]) :
                                           setSelectedSiswa(selectedSiswa.filter(item =>
                                               item !== record.idSiswa
                                           ))}
                                />
                            )
                        }
                    },
                ]
            },
            {
                title: 'NISN',
                dataIndex: 'nisn',
                sorter: (a, b) => a.nisn.localeCompare(b.nisn)
            },
            {
                title: 'Nama Siswa',
                dataIndex: 'namaSiswa',
                sorter: (a, b) => a.namaSiswa.localeCompare(b.namaSiswa)

            },
            {
                title: 'Kelas',
                dataIndex: 'kelas',
                sorter: (a, b) => a.kelas.localeCompare(b.kelas)
            },
        ];

        const showModal = () => {
            _getTingkatKelas()
            setIsModalVisible(true);
        };
        const handleOk = () => {
            setIsModalVisible(false);
            axios.post(url_by_institute, {
                    "processDefinitionId": insert_siswa_to_extrakurikuler,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "id_extrakurikuler": selectedEkskul.idEkskul,
                                "id_siswa": selectedSiswa
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
                const dataRes = JSON.parse(response?.data?.variables[3]?.value);
                if (dataRes.status == "success") {
                    notification.success({
                        message: "Sukses",
                        description: "Siswa berhasil ditambahkan.",
                        placement: "top",
                    });
                    _getSiswaEksul()
                    _getAllSiswa()
                } else {
                    notification.error({
                        message: "Error",
                        description: "Error, harap hubungi admin EDII",
                        placement: "top",
                    });
                }
            })
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };

        useEffect(() => {
            _getAllSiswa()
        }, [selectedClass]);



        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={props.setView}
                                       className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        {props.title}
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="float-right">
                                                <button
                                                    className="bg-linkedin border-0 text-center text-white font-xsss fw-600 p-2 w150 rounded-pill d-inline-block"
                                                    type="button"
                                                    onClick={showModal}
                                                >
                                                    Tambah Siswa
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <h1 className='mt-5 mb-3 text-center font-weight-bold'>Daftar Siswa</h1>
                                            <Table className="py-8"
                                                   columns={columns}
                                                   dataSource={siswaOnEkskul}
                                                   pagination={false}
                                                   rowClassName="bg-white text-grey-900"
                                                   scroll={{y: 400}}
                                                   height={500}
                                                   style={{
                                                       boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                                                   }}
                                            />
                                        </div>

                                    </div>
                                    <Modal title="Tambah Data Siswa"
                                           visible={isModalVisible}
                                           onOk={handleOk}
                                           onCancel={handleCancel}
                                           width={1000}
                                           bodyStyle={{minHeight: '600px'}}
                                           footer={[
                                               <Button key="submit" type="primary" onClick={handleOk}
                                                       className='bg-current border-0 rounded-pill'>
                                                   Tambah Siswa
                                               </Button>,
                                               <Button key="back" onClick={handleCancel} className='rounded-pill'>
                                                   Cancel
                                               </Button>

                                           ]}
                                    >
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group mr-4">
                                                    <select
                                                        className="form-control"
                                                        key="id_class_filter"
                                                        style={{height: '35px', width: '70%'}}
                                                        onChange={(e) => setSelectedClass(e.target.value)}
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Kelas
                                                        </option>
                                                        {tingkatKelas.map((data) => (
                                                            <option value={data.id}>Kelas {data.class_type}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <Search className="mr-3" placeholder="Cari Siswa" allowClear
                                                        onSearch={_onSearch} style={{width: '70%', float: 'right'}}/>
                                            </div>
                                        </div>
                                        <Table className="py-8 p-3"
                                               columns={columnsAddSiswa}
                                               dataSource={allSiswa}
                                               pagination={false}
                                               rowClassName="bg-white text-grey-900"
                                               scroll={{y: 400}}
                                        />
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const _onSearch = (value) => {
        const processDef = get_extrakurikuler;
        const variableSearch = {
            "name": "data",
            "type": "json",
            "value": {
                "academic_year_id": academicYear,
                "search": value
            }
        }
        dispatch(searchGlobal(value, paramsPage, processDef, variableSearch))
    }

    const viewCreateEkskul = () => {
        setIsViewCreate(true)
        setIsViewEkskul(false)
        setIsViewEdit(false)
    }

    const viewEditEkskul = (record) => {
        setSelectedEkskul(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewEkskul(false)
    }

    const viewSiswaEkskul = (record) => {
        setSelectedEkskul(record)
        setIsViewEdit(false)
        setIsViewCreate(false)
        setIsViewEkskul(false)
        setIsViewSiswa(true)
    }

    const deleteEkskul = (record) => {
        const dateNow = new Date().toLocaleString();
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
                axios.post(url_by_institute,
                    {
                        "processDefinitionId": global_update,
                        "returnVariables": true,
                        "variables": [
                            {
                                "name": "global_updatedata",
                                "type": "json",
                                "value": {
                                    "tbl_name": "x_ekstrakurikuler_masterModel",
                                    "id": record.idEkskul,
                                    "tbl_coloumn": {
                                        "deleted_at": dateNow
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": "1"
                    }).then(function (response) {
                    const resData = JSON.parse(response?.data?.variables[2]?.value)

                    if (resData.status == "success") {
                        notification.success({
                            message: "Sukses",
                            description: "Ekstrakurikuler berhasil dihapus.",
                            placement: "top",
                        });
                        _getEkskul()
                    } else {
                        notification.error({
                            message: "Error",
                            description: "Error menghapus data, harap hubungi admin EDII",
                            placement: "top",
                        });
                    }
                })
            }
        })
    }

    const _onSelectMenu = (
            {
                key
            }
        ) => {
            message.info(`Click on item ${key}`);
        }
    ;

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const allDataEkskul = dataEkskul.map((data, index) => {
            return {
                no: index + 1,
                // imageUrl: 'user.png',
                idEkskul: data.id,
                namaEkskul: data.nama,
                idPembina: data.pembina_id,
                namaPembina: data.pembina,
                kelas: data.kelas,
                idTahunAkademik: data.academic_year_id,
                tahunAkademik: data.academic_year,
                semester: data.semester,
                jumlahSiswa: data.jumlah_siswa,
                lokasiEkskul: data.lokasi
            }
        }
    )

    const CardDataEkskul = () => {

        return (
            <div className="row">
                {allDataEkskul.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div
                            className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
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
                            <h4 className="fw-700 font-xs mt-4">{value.namaEkskul}</h4>
                            <div className="clearfix"></div>
                            <div className="mt-4 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Pembina</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.namaPembina}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Jumlah Siswa</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.jumlahSiswa}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const TableEkskul = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
            },
            {
                title: 'Nama Ekstrakurikuler',
                dataIndex: 'namaEkskul',
            },
            {
                title: 'Pembina',
                dataIndex: 'namaPembina',
            },
            {
                title: 'Kelas',
                dataIndex: 'kelas',
                // render: (kelas) => kelas.map(
                //     (data) => ' ' + data.nama_kelas + data.sub_kelas
                // ).join(),
            },
            {
                title: 'Lokasi',
                dataIndex: 'lokasiEkskul',
                // render: (kelas) => kelas.map(
                //     (data) => ' ' + data.nama_kelas + data.sub_kelas
                // ).join(),
            },
            {
                title: 'Jumlah Siswa',
                dataIndex: 'jumlahSiswa',
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <Tooltip title="Edit Ekskul">
                            <EditOutlined style={{color: "blue"}} onClick={() => viewEditEkskul(record)}/>
                        </Tooltip>
                        <Tooltip title="Tambah Siswa Ekskul">
                            <UserAddOutlined style={{color: "black"}} onClick={() => {
                                viewSiswaEkskul(record)
                                localStorage.setItem('id_ekskul', record.idEkskul)
                            }}/>
                        </Tooltip>
                        <DeleteOutlined style={{color: 'red'}} onClick={() => deleteEkskul(record)}/>
                    </Space>
                ),
            },
        ];

        return (
            <>
                <Table className="py-8"
                       columns={columns}
                       dataSource={allDataEkskul}
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

    const createEkskul = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

        axios.post(url_by_institute,
            {
                "processDefinitionId": global_insert,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_Insert",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_ekstrakurikuler_masterModel",
                            "tbl_coloumn": {
                                "name": data.nama_ekskul,
                                "academic_year_id": data.ta_semester,
                                "teacher_id": data.nama_pembina,
                                "location": data.lokasi_ekskul
                            }
                        }
                    }
                ]
            },
            {
                "name": "page",
                "type": "string",
                "value": "1"
            }).then(function (response) {
            const resData = JSON.parse(response?.data?.variables[2]?.value)

            if (resData.status == "success") {
                setIsViewEkskul(true)
                notification.success({
                    message: "Sukses",
                    description: "Ekstrakurikuler berhasil ditambahkan.",
                    placement: "top",
                });
            } else {
                notification.error({
                    message: "Error",
                    description: "Error, harap hubungi admin EDII",
                    placement: "top",
                });
            }
        })

    }

    const editEkskul = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_update,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_updatedata",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_ekstrakurikuler_masterModel",
                            "id": selectedEkskul.idEkskul,
                            "tbl_coloumn": {
                                "name": data.nama_ekskul,
                                "academic_year_id": data.ta_semester,
                                "teacher_id": data.nama_pembina,
                                "location": data.lokasi_ekskul
                            }
                        }
                    }
                ]
            },
            {
                "name": "page",
                "type": "string",
                "value": "1"
            }).then(function (response) {
            const resData = JSON.parse(response?.data?.variables[2]?.value)
            if (resData.status == "success") {
                setIsViewEkskul(true)
                _getEkskul()
                notification.success({
                    message: "Sukses",
                    description: "Edit Ekstrakurikuler berhasil.",
                    placement: "top",
                });
            } else {
                notification.error({
                    message: "Error",
                    description: "Error, harap hubungi admin EDII",
                    placement: "top",
                });
            }
        })
    }

    const FormCreate = () => {
        return (
            <FormAdminEkskul
                setView={() => setIsViewEkskul(true)}
                title="Tambah Ekstrakurikuler"
                submit={createEkskul}
                namaPembina="Pilih Pembina"
                idPembina=""
                selectPembina={dataPembina.map((data) => (
                    <option value={data.id_guru}>{data.name}</option>
                ))}
                idTahunAkademik=""
                thAkademik="Pilih Tahun Akademik"
                semester="Semester"
                selectedTahunAkademik="Pilih Tahun Akademik / Semester"
                selectTahunAkademik={dataTahunAkademik.map((data) => (
                    <option value={data.id}>{data.academic_year} / Semester {data.semester}</option>
                ))}
                isDisabled={false}
                isEdit={false}
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormAdminEkskul
                setView={() => setIsViewEkskul(true)}
                title="Edit Ekstrakurikuler"
                submit={editEkskul}
                namaEkskul={selectedEkskul.namaEkskul}
                namaPembina={selectedEkskul.namaPembina}
                idPembina={selectedEkskul.idPembina}
                selectPembina={dataPembina.map((data) => (
                    <option value={data.id_guru}>{data.name}</option>
                ))}
                idTahunAkademik={selectedEkskul.idTahunAkademik}
                thAkademik={selectedEkskul.tahunAkademik}
                semester={selectedEkskul.semester}
                selectedTahunAkademik="Pilih Tahun Akademik / Semester"
                selectTahunAkademik={dataTahunAkademik.map((data) => (
                    <option value={data.id}>{data.academic_year} / Semester {data.semester}</option>
                ))}
                lokasiEkskul={selectedEkskul.lokasiEkskul}
                isDisabled={false}
                isEdit={true}
            />
        )
    }

    const FormSiswa = () => (
        <FormAdminSiswaEkskul
            setView={() => setIsViewEkskul(true)}
            title={`Edit Siswa Ekstrakurikuler ${selectedEkskul.namaEkskul}`}
            // allSiswa={allSiswa}
            // siswaSelected={siswaOnEkskul}
        />
    )


    const ViewEkskul = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Ekstrakurikuler"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                            onClick={viewCreateEkskul}>
                                        Tambah Data
                                    </Button>
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
                        {grid ? <CardDataEkskul/> : <TableEkskul/>}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        {
                            isViewEkskul ?
                                <ViewEkskul/> :
                                isViewCreate ?
                                    <FormCreate/> :
                                    isViewEdit ?
                                        <FormEdit/> :
                                        isViewSiswa ?
                                            <FormSiswa/> :
                                            <ViewEkskul/>
                        }
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}