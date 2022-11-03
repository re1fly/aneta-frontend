import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PageHeader, Select, Card, Row, Table, Input, Button, Modal } from "antd"
import { getProcessId } from "../../../redux/Action";
import ERapor from "../../../components/pdf/ERapor";
import { useReactToPrint } from "react-to-print"
import {
    get_eraport,
    get_where_no_join,
    global_join_sub_where_get,
    json_eraport,
    url_by_institute
} from "../../../api/reference";


function SiswaCetakRapor() {

    const [refreshState, setRefreshState] = useState(false);
    const [dataRapor, setDataRapor] = useState([])
    const [getErapor, setGetErapor] = useState([])
    const [selectClass, setSelectClass] = useState([]);
    const [selectAcademic, setSelectAcademic] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);

    const institute = localStorage.getItem('institute');
    const academic = localStorage.getItem('academic_id');
    const userId = localStorage.getItem('user_id');

    let componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": "globaljoinsubfirst:1:884bddf2-2ccb-11ed-aacc-9a44706f3589",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub_first",
                        "type": "json",
                        "value": {
                            "tbl_induk": "users",
                            "select": [
                                "users.name",
                                "users.id as id_user",
                                "r_class_type.class_type",
                                "x_academic_class.sub_class"
                            ],

                            "join": [

                                {
                                    "tbl_join": "x_academic_students",
                                    "refkey": "user_id",
                                    "tbl_join2": "users",
                                    "foregenkey": "id"
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
                            "where": [
                                {
                                    "tbl_coloumn": "users",
                                    "tbl_field": "id",
                                    "tbl_value": userId,
                                    "operator": "="
                                }
                            ]
                        }
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setGetErapor(dataRes.data)
            console.log(dataRes.data);
        }).catch(error => {
            console.log(error);
        })


    }, [refreshState, academic])

    const getDataRapor = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": "jsoneraport:1:e07834f5-2ccf-11ed-aacc-9a44706f3589",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_user": userId,
                            "id_academic": academic
                        }
                    }
                ]
            }
        ).then(function (response) {
            console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setDataRapor(dataRes?.data)
        })
    }

    useEffect(() => {
        getDataRapor()
    }, [selectedUser?.id])

    const columns = [
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
            title: 'Cetak Rapor Tengah Semester',
            align: "center",
            render: (record) => {
                return (
                    <Button className="rounded-xl" >
                        <i className="feather-printer mr-2"></i>Cetak PDF
                    </Button>
                )
            }
        },
        {
            title: 'Cetak Rapor Akhir Semester',
            align: "center",
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
        {
            title: 'Tanggal Cetak Terakhir',
            dataIndex: 'tanggalCetakTerakhir',
        },

    ]

    const channelList = [
        {
            idSiswa: getErapor.id_user,
            namaSiswa: getErapor.name,
            kelas: `${getErapor.class_type} - ${getErapor.sub_class}`,
            tanggalCetak: "12-10-2022"
        },
    ];

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

export default SiswaCetakRapor;