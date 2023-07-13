import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
    PageHeader,
    Select,
    Card,
    Row,
    Table,
    Input,
    Button,
    Modal, Spin,
} from "antd";
import {getProcessId} from "../../../redux/Action";
import ERapor from "../../../components/pdf/ERapor";
import {useReactToPrint} from "react-to-print";
import {
    get_eraport,
    get_where_no_join,
    global_join_sub_first,
    global_join_sub_where_get, global_update,
    json_eraport,
    url_by_institute,
} from "../../../api/reference";

function SiswaCetakRapor() {
    const [refreshState, setRefreshState] = useState(false);
    const [dataRapor, setDataRapor] = useState([]);
    const [getErapor, setGetErapor] = useState([]);
    const [selectClass, setSelectClass] = useState([]);
    const [selectAcademic, setSelectAcademic] = useState([]);
    const [statusPublish, setStatusPublish] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [idPrint, setIdPrint] = useState(null);

    const [loading, setLoading] = useState(true);
    const [countRender, setCountRender] = useState(0)
    const [dataSuccess, setDataSuccess] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    const institute = localStorage.getItem("institute");
    const academic = localStorage.getItem("academic_id");
    const userId = localStorage.getItem("user_id");

    let componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    const getDataSiswa = () => {
        axios
            .post(url_by_institute, {
                processDefinitionId: global_join_sub_first,
                returnVariables: true,
                variables: [
                    {
                        name: "global_join_where_sub_first",
                        type: "json",
                        value: {
                            tbl_induk: "users",
                            select: [
                                "users.name",
                                "users.id as id_user",
                                "r_class_type.class_type",
                                "x_academic_class.sub_class",
                                "x_academic_year.academic_year",
                                "x_academic_year.semester",
                                "x_academic_students.last_print_rapor_date",
                                "x_academic_students.id",
                                "x_academic_students.eraport",
                            ],

                            join: [
                                {
                                    tbl_join: "x_academic_students",
                                    refkey: "user_id",
                                    tbl_join2: "users",
                                    foregenkey: "id",
                                },
                                {
                                    tbl_join: "x_academic_class",
                                    refkey: "id",
                                    tbl_join2: "x_academic_students",
                                    foregenkey: "class_id",
                                },
                                {
                                    tbl_join: "r_class_type",
                                    refkey: "id",
                                    tbl_join2: "x_academic_class",
                                    foregenkey: "class",
                                },
                                {
                                    tbl_join: "x_academic_year",
                                    refkey: "id",
                                    tbl_join2: "x_academic_students",
                                    foregenkey: "academic_year_id",
                                },
                            ],
                            where: [
                                {
                                    tbl_coloumn: "users",
                                    tbl_field: "id",
                                    tbl_value: userId,
                                    operator: "=",
                                },
                            ],
                        },
                    },
                ],
            })
            .then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                const data = dataRes.data;
                const responseMsg = dataRes.message;
                setGetErapor(data);
                setIdPrint(data.id);

                if (responseMsg == "Success Found") {
                    setLoading(false)
                    setDataSuccess(true)
                } else {
                    setDataSuccess(true)
                    setCountRender(countRender + 1)
                }

                if (data.eraport == true ) {
                    setStatusPublish(true);
                } else {
                    setStatusPublish(false);
                }
            })
    };

    const getDataRapor = () => {
        axios
            .post(url_by_institute, {
                processDefinitionId: json_eraport,
                returnVariables: true,
                variables: [
                    {
                        name: "get_data",
                        type: "json",
                        value: {
                            id_user: userId,
                            id_academic: academic,
                        },
                    },
                ],
            })
            .then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                setDataRapor(dataRes?.data);

            });
    };

    const cetakTanggal = () => {
        const dateNow = new Date().toLocaleString();
        axios
            .post(url_by_institute, {
                processDefinitionId: "GlobalUpdateRecord:2:184b8903-2ccb-11ed-aacc-9a44706f3589",
                returnVariables: true,
                variables: [
                    {
                        name: "global_updatedata",
                        type: "json",
                        value: {
                            tbl_name: "x_academic_studentsModel",
                            id: idPrint,
                            tbl_coloumn: {
                                last_print_rapor_date: dateNow,
                            },
                        },
                    },
                ],
            })
            .then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                if (dataRes.status == "success") {
                    getDataSiswa();
                }
            });
    };

    const _loadingData = () => {
        if (dataSuccess == false) {
            getDataSiswa()
        }
    }

    if (countRender > 1 && countRender < 4) {
        setInterval(_loadingData, 5000)
    }

    useEffect(() => {
        getDataSiswa();
    }, [refreshState, academic]);

    useEffect(() => {
        getDataRapor();
    }, [selectedUser?.id]);

    const columns = [
        {
            title: "Nama Siswa",
            dataIndex: "namaSiswa",
            align: "center",
        },
        {
            title: "Kelas",
            align: "center",
            dataIndex: "kelas",
        },
        {
            title: "Semester",
            align: "center",
            dataIndex: "semester",
            // render: (record) => {
            //     return (
            //         <Button className="rounded-xl" >
            //             <i className="feather-printer mr-2"></i>Cetak PDF
            //         </Button>
            //     )
            // }
        },
        {
            title: "Cetak Rapor",
            align: "center",
            render: (text, record) => {
                return (
                    <Button
                        className="rounded-xl"
                        onClick={() => {
                            setModalVisible(true);
                            setSelectedUser(record);
                            getDataRapor()
                            setLoading(true)
                        }}
                        disabled={statusPublish == true ? false : true}
                    >
                        <i className="feather-printer mr-2"></i>Cetak PDF
                    </Button>
                );
            },
        },
        {
            title: "Tanggal Cetak Terakhir",
            dataIndex: "tanggalCetak",
        },
    ];

    const channelList = [
        {
            idSiswa: getErapor.id_user,
            namaSiswa: getErapor.name,
            kelas: `${getErapor.class_type} - ${getErapor.sub_class}`,
            tanggalCetak: getErapor.last_print_rapor_date,
            semester: `${getErapor.academic_year} / ${getErapor.semester}`,
        },
    ];

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
                            title="Cetak Rapor"
                        />
                        <div className="mt-4">
                            <Spin tip="Loading..." spinning={loading} className='mt-5'>
                                <Table
                                    className="py-8"
                                    columns={columns}
                                    dataSource={channelList}
                                    onChange={onChangeTable}
                                    pagination={false}
                                    rowClassName="bg-greylight text-grey-900"
                                    scroll={{x: 400}}
                                    size="middle"
                                    bordered
                                />
                            </Spin>

                            <Modal
                                title=""
                                okText="Cetak Rapor"
                                width={1500}
                                style={{
                                    top: 20,
                                }}
                                visible={modalVisible}
                                onOk={() => {
                                    // handlePrint
                                    cetakTanggal();
                                    handlePrint();
                                }}
                                onCancel={() => setModalVisible(false)}
                            >
                                <ERapor ref={componentRef} data={dataRapor}/>
                            </Modal>
                        </div>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}

export default SiswaCetakRapor;
