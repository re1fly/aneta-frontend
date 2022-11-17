import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { PageHeader, Select, Card, Row, Table, Input, Button, Modal } from "antd"
import ERapor from "../../../components/pdf/ERapor";
import { useReactToPrint } from "react-to-print"
import {
    get_eraport,
    get_where_no_join,
    global_join_sub_where_get,
    json_eraport,
    url_by_institute
} from "../../../api/reference";


function CetakRapor() {

    const [getKelas, setGetKelas] = useState([]);
    const [getTahunAkademik, setGetTahunAkademik] = useState([])
    const [refreshState, setRefreshState] = useState(false);

    const [dataRapor, setDataRapor] = useState([])
    const [getErapor, setGetErapor] = useState([])
    console.log(getErapor);
    const [selectClass, setSelectClass] = useState([]);
    const [selectAcademic, setSelectAcademic] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);

    const institute = localStorage.getItem('institute');
    const academic = localStorage.getItem('academic_year');

    let componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const { Option } = Select;
    const { TextArea } = Input;
    const { Column, ColumnGroup } = Table;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    useEffect(() => {
        axios.post(url_by_institute,
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
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            setGetKelas(dataRes?.data);
        })

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
            }
        ).then(function (response) {
            // console.log(response);
            const tahunAkademik = JSON.parse(response?.data?.variables[3]?.value)
            setGetTahunAkademik(tahunAkademik?.data)
        })
    }, [refreshState, academic])

    const handleDataErapor = () => {
        console.log(selectAcademic, selectClass);
        setRefreshState(true)
        axios.post(url_by_institute,
            {
                "processDefinitionId": get_eraport,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_academic": selectAcademic,
                            "id_class": selectClass
                        }
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            if (dataRes.code == true) {
                console.log("succes", dataRes.data);
                setRefreshState(false);
                setGetErapor(dataRes?.data)
            } else {
                setRefreshState(false);
                setGetErapor([])
            }
        }).catch(error => {
            console.log(error);
            setRefreshState(false);
        })
    }

    const getDataRapor = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": json_eraport,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_user": selectedUser?.id,
                            "id_academic": academic
                        }
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setDataRapor(dataRes?.data)
        })
    }

    useEffect(() => {
        getDataRapor()
    }, [selectedUser?.id])

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            align: "center"

        },
        {
            title: 'Nama Siswa',
            dataIndex: 'namaSiswa',
            align: "center"

        },
        {
            title: 'Kelas',
            align: "center",
            // dataIndex: 'kelas',
            children: [
                {
                    title: 'Semua',
                    align: "center",
                    dataIndex: 'kelas',
                    defaultSortOrder: 'ascend',
                },
            ]
        },
        // {
        //     title: 'Cetak Rapor Tengah Semester',
        //     align: "center",
        //     children: [
        //         {
        //             title: <Button className="rounded-xl" >
        //                 <i className="feather-printer mr-2"></i>Cetak PDF
        //             </Button>,
        //             align: "center",
        //             dataIndex: 'raporTengahSemester',
        //             defaultSortOrder: 'ascend',
        //             render: (record) => {
        //                 return (
        //                     <Button className="rounded-xl" >
        //                         <i className="feather-printer mr-2"></i>Cetak PDF
        //                     </Button>
        //                 )
        //             }
        //         },
        //     ],
        // },
        {
            title: 'Cetak Rapor Akhir Semester',
            align: "center",
            // dataIndex: 'raporAkhirSemester',
            children: [
                {
                    title: <Button className="rounded-xl" >
                        <i className="feather-printer mr-2"></i>Cetak PDF
                    </Button>,
                    align: "center",
                    dataIndex: 'raporAkhirSemester',
                    defaultSortOrder: 'ascend',
                    render: (text, record) => {
                        return (
                            <Button className="rounded-xl" onClick={() => {
                                console.log(record);
                                setModalVisible(true);
                                setSelectedUser(record);
                            }} >
                                <i className="feather-printer mr-2"></i>Cetak PDF
                            </Button>
                        )
                    }
                },
            ]
        },
        {
            title: 'Tanggal Cetak Terakhir',
            dataIndex: 'tanggalCetakTerakhir',
            align: "center",
            // children: [
            //     {
            //         title: '',
            //         align: "center",
            //         dataIndex: 'tanggalCetakTerakhir',
            //         defaultSortOrder: 'ascend',
            //     },
            // ]
        },

    ]

    const channelList = getErapor.map((data, index) => {
        return {
            key: '1',
            no: index + 1,
            id: data.id_user,
            namaSiswa: data.name,
            kelas: `${data.class} / ${data.sub_class}`,
            // raporTengahSemester:
            //     <Button className="rounded-xl" >
            //         <i className="feather-printer mr-2"></i>Cetak PDF
            //     </Button>,
            // raporAkhirSemester: <Button className="rounded-xl" onClick={() => setModalVisible(true)}>
            //     <i className="feather-printer mr-2"></i>Cetak PDF
            // </Button>,
            tanggalCetak: data.last_print
        }
    });

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4 ">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Cetak Rapor"
                        />
                        <div className="row d-flex align-items-center">
                            <div className="col-lg-5">
                                <Card className="shadow-md my-6 rounded">
                                    <Row>
                                        <select style={{ width: '100%' }}
                                            name="select_class"
                                            className='w600 h35'
                                            onChange={(e) => setSelectClass(e.target.value)}
                                        >
                                            <option selected disabled>
                                                Pilih Kelas
                                            </option>
                                            {getKelas.map((data, i) => {
                                                return (
                                                    <>
                                                        <option value={data.id}>
                                                            {`${data.class} / ${data.sub_class}`}
                                                        </option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                    </Row>
                                </Card>
                            </div>
                            <div className="col-lg-5">
                                <Card className="shadow-md my-6 rounded">
                                    <Row>
                                        <select style={{ width: '100%' }}
                                            name="select_academic"
                                            className='w600 h35'
                                            onChange={(e) => setSelectAcademic(e.target.value)}
                                        >
                                            <option selected disabled>
                                                Pilih Tahun Akademik / Semester
                                            </option>
                                            {getTahunAkademik.map((data, i) => {
                                                return (
                                                    <>
                                                        <option value={data.id}>
                                                            {`${data.academic_year} / ${data.semester}`}
                                                        </option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                    </Row>
                                </Card>
                            </div>
                            <div className="col-lg-2">
                                <button
                                    className="bg-current border-0 text-center text-white font-xs fw-600 p-2 w150 rounded-xl d-inline-block"
                                    type="submit"
                                    onClick={() => handleDataErapor()}
                                >
                                    Proses
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Table className="py-8"
                                columns={columns}
                                dataSource={channelList}
                                onChange={onChangeTable}
                                pagination={false}
                                rowClassName="bg-greylight text-grey-900"
                                scroll={{ x: 400 }}
                                size='middle'
                                bordered />

                            <Modal
                                title=""
                                okText="Cetak Rapor"
                                width={1500}
                                style={{
                                    top: 20,
                                }}
                                visible={modalVisible}
                                onOk={handlePrint}
                                onCancel={() => setModalVisible(false)}
                            >
                                <ERapor ref={componentRef} data={dataRapor} />
                            </Modal>
                        </div>
                    </div>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default CetakRapor;