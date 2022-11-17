import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {PageHeader, Select, Card, Row, Table, Input, Button, Modal, Tag, notification} from "antd"
import {getProcessId} from "../../../redux/Action";
import ERapor from "../../../components/pdf/ERapor";
import {useReactToPrint} from "react-to-print"
import {
    get_eraport,
    get_where_no_join,
    global_join_sub_where_get,
    json_eraport, role_walikelas_update_eraport,
    url_by_institute
} from "../../../api/reference";
import {BASE_URL} from "../../../api/Url";


function GuruSubmitRapor() {

    const [submitRapor, setSubmitRapor] = useState(false)

    const [refreshState, setRefreshState] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [tingkatKelas, setTingkatKelas] = useState([])
    const [selectedKelas, setSelectedKelas] = useState(null)
    const [listSiswa, setListSiswa] = useState([])
    const [selectedSiswa, setSelectedSiswa] = useState([])
    const institute = localStorage.getItem('institute');
    const academic = localStorage.getItem('academic_id');
    const userId = localStorage.getItem('user_id');
    const lastClass = localStorage.getItem('kelas');

    const _getSiswaFirst = () => {
        axios.post(
            url_by_institute,
            {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_students",
                            "select": [
                                "x_academic_students.id",
                                "x_academic_students.eraport",
                                "users.name",
                                "r_class_type.class_type",
                                "x_academic_class.sub_class"
                            ],
                            "paginate": false,
                            "join": [
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "user_id"
                                }, {
                                    "tbl_join": "x_academic_class",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "class_id"

                                }, {
                                    "tbl_join": "r_class_type",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_class",
                                    "foregenkey": "class"
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
                                    "tbl_coloumn": "x_academic_students",
                                    "tbl_field": "class_id",
                                    "tbl_value": lastClass,
                                    "operator": "="
                                }

                            ],
                            "order_coloumn": "x_academic_students.updated_at",
                            "order_by": "desc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": "1"
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                const dataSiswa = JSON.parse(res.data.variables[3].value);
                setListSiswa(dataSiswa.data)
            })
    }

    const _getSiswa = () => {
        axios.post(
            url_by_institute,
            {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_students",
                            "select": [
                                "x_academic_students.id",
                                "x_academic_students.eraport",
                                "users.name",
                                "r_class_type.class_type",
                                "x_academic_class.sub_class"
                            ],
                            "paginate": false,
                            "join": [
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "user_id"
                                }, {
                                    "tbl_join": "x_academic_class",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "class_id"

                                }, {
                                    "tbl_join": "r_class_type",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_class",
                                    "foregenkey": "class"
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
                                    "tbl_coloumn": "x_academic_students",
                                    "tbl_field": "class_id",
                                    "tbl_value": selectedKelas,
                                    "operator": "="
                                }

                            ],
                            "order_coloumn": "x_academic_students.updated_at",
                            "order_by": "desc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": "1"
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                const dataSiswa = JSON.parse(res.data.variables[3].value);
                setListSiswa(dataSiswa.data)
            })
    }

    const _selectTingkatKelas = () => {
        axios.post(url_by_institute, {
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
                                "r_class_type.class_type",
                                "x_academic_class.sub_class"
                            ],
                            "paginate": false,
                            "join": [
                                {
                                    "tbl_join": "r_class_type",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_class",
                                    "foregenkey": "class"
                                },
                                {
                                    "tbl_join": "x_academic_teachers",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_class",
                                    "foregenkey": "calss_advisor_id"
                                },
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "user_id"
                                }
                            ],
                            "kondisi": [
                                {
                                    "keterangan": "deleted_at",
                                    "kolom": "x_academic_class.deleted_at"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "users",
                                    "tbl_field": "id",
                                    "tbl_value": userId,
                                    "operator": "="
                                }

                            ],
                            "order_coloumn": "r_class_type.class_type",
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
            const resTingkatKelas = JSON.parse(response.data.variables[3].value);
            setTingkatKelas(resTingkatKelas.data)
        })
    }

    const _publish_rapor = () => {
        axios.post(
            url_by_institute,
            {
                "processDefinitionId": role_walikelas_update_eraport,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_student": selectedSiswa
                        }
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                const response = JSON.parse(res.data.variables[2].value);
                if(response.code == true){
                    notification.success({
                        message: "Sukses",
                        description: 'E-Rapor siswa berhasil di publish',
                        placement: 'top'
                    })
                    _getSiswa()
                    setTimeout(() => window.location.reload(), 2000)
                }else{
                    notification.error({
                        message: 'Error',
                        description: 'Harap hubungi admin',
                        placement: 'top'
                    })
                }
            })
    }

    useEffect(() => {
        _selectTingkatKelas()
    }, []);

    useEffect(() => {
        _getSiswaFirst()
    }, []);

    useEffect(() => {
        _getSiswa()
    }, [selectedKelas]);

    const getClick = () => {
        let checkedValue = document.querySelector("input[type=checkbox]");
        setSubmitRapor(checkedValue?.checked == true)
        if(submitRapor == false){
            let checkedV = [...document.querySelectorAll("#checkbox")].map(e => e.name)
            setSelectedSiswa(checkedV)
        }

    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const dataSiswa = listSiswa.map((data, index) => {
        return {
            id: data.id,
            no: index + 1,
            namaSiswa: data.name,
            kelas: `${data.class_type} / ${data.sub_class}`,
            status: data.eraport
        }
    })

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            align: "center"

        },
        // {
        //     title: 'Nama Pelajaran',
        //     dataIndex: 'namaPelajaran',
        //     align: "center"

        // },
        {
            title: 'Nama Siswa',
            dataIndex: 'namaSiswa',
            align: "center"

        },
        {
            title: 'Kelas',
            align: "center",
            dataIndex: "kelas"
        },
        {
            title: 'Status',
            align: "center",
            dataIndex: "status",
            render: (status) => {
                let color = status == true ? "green" : "red"
                return (
                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                        {status == true ? "Telah di publish" : "Belum di publish"}
                    </Tag>
                );
            }
        },
        {
            title: 'Publish Rapor',
            align: "center",
            dataIndex: 'submitRapor',
            children: [
                {
                    title:
                        <input name="is_upload" class="messageCheckbox" checked={submitRapor == true ? true : null}
                               onClick={() => {
                                   getClick(this?.value)
                               }} style={{marginTop: '20px'}} className="ml-3 mb-4" type="checkbox"/>,
                    align: "center",
                    dataIndex: 'raporAkhirSemester',
                    render: (text, record) => {
                        return (
                            <input name={record.id} key={record.id} id="checkbox" class="messageCheckbox" checked={submitRapor == true ? true : null}
                                   style={{marginTop: '20px'}} className="ml-3 mb-4" type="checkbox"
                            onChange={(e) => e.target.checked == true ? setSelectedSiswa([...selectedSiswa, record.id]) :
                                setSelectedSiswa( selectedSiswa.filter(item =>
                                    item !== record.id
                                ))}/>
                        )
                    }
                },
            ]
        },
    ]

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4 ">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Publish Rapor"
                        />
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="mont-font fw-600 font-xsss">
                                        Tingkat Kelas
                                    </label>
                                    <select
                                        className="form-control"
                                        name="kelas_erapor"
                                        required
                                        id="kelas_erapor"
                                        onChange={(e) => {
                                            setSelectedKelas(e.target.value)
                                            localStorage.setItem('kelas', e.target.value)
                                        }}
                                        value={lastClass}
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {tingkatKelas.map((data) => (
                                            <option value={data.id}>{data.class_type} / {data.sub_class}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            </div>
                            <div className="col-lg-3">
                                <button
                                    className="bg-current border-0 text-center text-white font-xss fw-600 p-2 w150 rounded-xl"
                                    style={{margin: '13% 0 0 5%'}}
                                    // type="submit"
                                    onClick={() => {
                                        _publish_rapor()
                                    }}
                                >
                                    Publish Rapor
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Table className="py-8"
                                   columns={columns}
                                   dataSource={dataSiswa}
                                   onChange={onChangeTable}
                                   pagination={false}
                                   rowClassName="bg-greylight text-grey-900"
                                   scroll={{x: 400}}
                                   size='middle'
                                   bordered/>
                            {/* <form id="form_deskripsi">
                                <div className="mt-4">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr className="bg-current text-light text-center">
                                                <th scope="col" rowSpan={2}>No</th>
                                                <th scope="col" rowSpan={2}>Nama Pelajaran</th>
                                                <th scope="col" rowSpan={2}>Nama Siswa</th>
                                                <th scope="col" rowSpan={2}>Kelas</th>
                                                <th scope="col">Submit Rapor</th>
                                            </tr>
                                            <tr className="bg-current text-light text-center">
                                                <td>
                                                    <input name="is_upload" class="messageCheckbox" checked={submitRapor == true ? true : null} onClick={() => { getClick(this?.value) }} className="ml-3" type="checkbox" />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">
                                                    1
                                                </td>
                                                <th className="text-center">
                                                    Matematika
                                                </th>
                                                <td className="text-center" >
                                                    Agung
                                                </td>
                                                <td className="text-center">
                                                    1 / A
                                                </td>
                                                <td className="text-center">
                                                    <input name="is_upload" class="messageCheckbox" checked={submitRapor == true ? true : null} className="ml-3" type="checkbox" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form> */}
                        </div>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default GuruSubmitRapor;