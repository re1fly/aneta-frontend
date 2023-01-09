import React, {useEffect, useState} from "react";
import {Button, Modal, notification, Space, Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import axios from "axios";
import {
    get_all_siswa_extrakurikuler,
    global_delete_record,
    global_join_sub_where_get,
    global_update, insert_siswa_to_extrakurikuler,
    url_by_institute
} from "../../api/reference";
import Swal from "sweetalert2";

export const FormAdminSiswaEkskul = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [submitRapor, setSubmitRapor] = useState(false)
    const [selectedSiswa, setSelectedSiswa] = useState([])
    const idEkskul = sessionStorage.getItem('id_ekskul')
    const academicYear = localStorage.getItem('academic_year')
    const [dataSelectedSiswa, setDataSelectedSiswa] = useState([])
    const [dataAllSiswa, setDataAllSiswa] = useState([])

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
                                    "tbl_value": idEkskul,
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
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            const data = dataRes.data
            setDataSelectedSiswa(data)
            console.log(response)
        })
    }
    const _getAllSiswa = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": get_all_siswa_extrakurikuler,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id": idEkskul,
                            "id_academic": academicYear
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
            console.log(response)
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

    useEffect(() => {
        setTimeout( () => {
            _getSiswaEksul()
            _getAllSiswa()
            console.log(dataAllSiswa)
            console.log(dataSelectedSiswa)
        }, 1500)
    }, []);


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
        {
            title: 'Pilih Siswa',
            key: 'action',
            responsive: ['sm'],
            align: 'center',
            render: (text, record) => {
                return (
                    <input name={record.id} key={record.id} id="checkbox" className="messageCheckbox"
                           checked={submitRapor == true ? true : null}
                           style={{marginTop: '20px'}} className="ml-3 mb-4" type="checkbox"
                           onChange={(e) => e.target.checked == true ? setSelectedSiswa([...selectedSiswa, record.idSiswa]) :
                               setSelectedSiswa(selectedSiswa.filter(item =>
                                   item !== record.idSiswa
                               ))}/>
                )
            }
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
    ];

    const showModal = () => {
        // let checkedValue = document.querySelector("input[type=checkbox]");
        // setSubmitRapor(checkedValue?.checked == false)
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
                            "id_extrakurikuler": idEkskul,
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
                                    <Table className="py-8 p-3"
                                           columns={columnsAddSiswa}
                                           dataSource={allSiswa}
                                           pagination={false}
                                           rowClassName="bg-white text-grey-900"
                                           scroll={{y: 250}}
                                           height={250}
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