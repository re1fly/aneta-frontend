import React, { Fragment, useState, useEffect } from 'react';
import {
    Menu,
    Card,
    Row,
    Col,
    Button,
    Dropdown,
    message,
    Calendar,
    Table,
    Space,
    notification,
    PageHeader
} from "antd";
import {
    DownOutlined,
    AppstoreOutlined,
    MenuOutlined,
    CalendarOutlined,
    TableOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import axios from "axios";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

import {global_join_sub_first, jadwal_pelajaran_on_going, url_by_institute} from "../../../api/reference";

function JadwalPelajaranSiswa() {
    const [grid, setGrid] = useState(false);
    const [calendar, setCalendar] = useState(true);
    const [getJadwalPelajaran, setGetJadwalPelajaran] = useState([]);
    const [dataSenin1, setDataSenin1] = useState([]);
    const [dataSelasa1, setDataSelasa1] = useState([]);
    const [dataRabu1, setDataRabu1] = useState([]);
    const [dataKamis1, setDataKamis1] = useState([]);
    const [dataJumat1, setDataJumat1] = useState([]);
    const [dataSabtu1, setDataSabtu1] = useState([]);

    const [getKelasSiswa, setGetKelas] = useState([]);

    const userName = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id')
    const academicYear = localStorage.getItem('academic_id')

    const kelas = `${getKelasSiswa[0]?.class_type} ${"/"} ${getKelasSiswa[0]?.sub_class}`
    const dataKelas = getKelasSiswa?.map((data, index) => {
        const kelas = `${data?.class_type} ${"/"} ${data?.sub_class}`
        return {
            kelas: kelas,
        }
    })

    const dataMapper = (dailyData) => {
        let pelajaran = []
        dailyData.map(function (data, index) {
            pelajaran.push({
                hari: data?.hari,
                kelas: kelas,
                namaPelajaran: data?.mata_pelarajan,
                namaPengajar: data?.nama_guru,
                waktu: data?.jam_mulai,
            })
        })
        return pelajaran
    }

    const setDailyData = () => {
        getJadwalPelajaran.filter((data) => {
            if (data.hari === "senin") {
                setDataSenin1(dataMapper(data.data))
            } else if (data.hari === "selasa") {
                setDataSelasa1(dataMapper(data.data))
            } else if (data.hari === "rabu") {
                setDataRabu1(dataMapper(data.data))
            } else if (data.hari === "kamis") {
                setDataKamis1(dataMapper(data.data))
            } else if (data.hari === "jumat") {
                setDataJumat1(dataMapper(data.data))
            } else if (data.hari === "sabtu") {
                setDataSabtu1(dataMapper(data.data))
            }
        })
    }

    const senin = getJadwalPelajaran?.filter((data) => {
        return data.hari === "senin"
    })

    const selasa = getJadwalPelajaran?.filter((data) => {
        return data.hari === "selasa"
    })

    const rabu = getJadwalPelajaran?.filter((data) => {
        return data.hari === "rabu"
    })

    const kamis = getJadwalPelajaran?.filter((data) => {
        return data.hari === "kamis"
    })

    const jumat = getJadwalPelajaran?.filter((data) => {
        return data.hari === "jumat"
    })

    const sabtu = getJadwalPelajaran?.filter((data) => {
        return data.hari === "sabtu"
    })

    const _onSearch = value => console.log(value);

    useEffect(() => {
        setDailyData()
    }, [getJadwalPelajaran])

    useEffect(() => {
        axios.post(url_by_institute, {
            "processDefinitionId": jadwal_pelajaran_on_going,
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "user_id": userId,
                        "academic_id": 91
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
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            // console.log(dataRes);
            if (dataRes.code == true) {
                setGetJadwalPelajaran(dataRes?.data);
            }
        })

        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_first,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub_first",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_students",
                        "select": ["m_user_profile.nisn", "users.name", "x_academic_class.class", "x_academic_year.semester", "x_academic_year.academic_year", "x_academic_class.sub_class", "r_class_type.class_type"],
                        "join": [
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

                            }, {
                                "tbl_join": "x_academic_class",
                                "refkey": "id",
                                "tbl_join2": "x_academic_students",
                                "foregenkey": "class_id"
                            }, {
                                "tbl_join": "m_institutes",
                                "refkey": "id",
                                "tbl_join2": "users",
                                "foregenkey": "institute_id"
                            }, {
                                "tbl_join": "x_academic_year",
                                "refkey": "institute_id",
                                "tbl_join2": "m_institutes",
                                "foregenkey": "id"
                            }, {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_class",
                                "foregenkey": "class"
                            }
                        ],

                        "where": [
                            {
                                "tbl_coloumn": "x_academic_year",
                                "tbl_field": "is_active",
                                "tbl_value": "T",
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_students",
                                "tbl_field": "user_id",
                                "tbl_value": userId,
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_academic_class",
                                "tbl_field": "deleted_at",
                                "tbl_value": "",
                                "operator": "="
                            }
                        ]
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
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            setGetKelas([dataRes?.data])
        })


    }, [userId])

    const CalendarData = () => {
        return (
            <Calendar className="" />
        );
    }

    const TableJadwalPelajaran = () => {
        const columns = [
            {
                title: 'Kelas',
                dataIndex: 'kelas',
                align: 'center',
            },
            {
                title: 'Mata Pelajaran',
                dataIndex: 'namaPelajaran',
                align: 'center',
            },
            {
                title: 'Guru/Tenaga Pengajar',
                dataIndex: 'namaPengajar',
                align: 'center',
            },
            {
                title: 'Waktu Mulai - Waktu Selesai',
                dataIndex: 'waktu',
                align: 'center'
            },
        ];

        // const kelas = `${getKelasSiswa[0]?.class} ${"/"} ${getKelasSiswa[0]?.sub_class}`
        // console.log(kelas);

        // const dataSenin = senin[0]?.data?.map((data, index) => {
        //     return {
        //         hari: data?.hari,
        //         kelas: kelas,
        //         namaPelajaran: data?.mata_pelarajan,
        //         namaPengajar: data?.nama_guru,
        //         waktu: data?.jam_mulai,
        //     }
        // })

        // const dataSelasa = selasa[0]?.data?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: kelas,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
        //     }
        // })

        // const dataRabu = rabu[0]?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: kelas,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
        //     }
        // })

        // const dataKamis = kamis[0]?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: kelas,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
        //     }
        // })

        // const dataJumat = jumat[0]?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: kelas,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
        //     }
        // })

        // const dataSabtu = sabtu[0]?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: kelas,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
        //     }
        // })

        function onChangeTable(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }

        return (
            <>
                <div className="mt-2">
                    <div className="bg-grey">
                        <p className="strong text-black pl-4 mb-0">SENIN</p>
                    </div>
                </div>
                <Table className=""
                    columns={columns}
                    dataSource={dataSenin1 !== undefined ? dataSenin1 : []}
                    // dataSource={dataSenin !== undefined ? dataSenin : []}
                    onChange={onChangeTable}
                    pagination={{ position: ['none'] }}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />

                <div className="mt-4">
                    <div className="bg-grey">
                        <p className="strong text-black pl-4 mb-0">SELASA</p>
                    </div>
                </div>
                <Table className=""
                    columns={columns}
                    dataSource={dataSelasa1}
                    onChange={onChangeTable}
                    pagination={{ position: ['none'] }}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />

                <div className="mt-4">
                    <div className="bg-grey">
                        <p className="strong text-black pl-4 mb-0">RABU</p>
                    </div>
                </div>
                <Table className=""
                    columns={columns}
                    dataSource={dataRabu1}
                    onChange={onChangeTable}
                    pagination={{ position: ['none'] }}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />

                <div className="mt-4">
                    <div className="bg-grey">
                        <p className="strong text-black pl-4 mb-0">KAMIS</p>
                    </div>
                </div>
                <Table className=""
                    columns={columns}
                    dataSource={dataKamis1}
                    onChange={onChangeTable}
                    pagination={{ position: ['none'] }}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />

                <div className="mt-4">
                    <div className="bg-grey">
                        <p className="strong text-black pl-4 mb-0">JUMAT</p>
                    </div>
                </div>
                <Table className=""
                    columns={columns}
                    dataSource={dataJumat1}
                    onChange={onChangeTable}
                    pagination={{ position: ['none'] }}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />

                <div className="mt-4">
                    <div className="bg-grey">
                        <p className="strong text-black pl-4 mb-0">SABTU</p>
                    </div>
                </div>
                <Table className=""
                    columns={columns}
                    dataSource={dataSabtu1}
                    onChange={onChangeTable}
                    pagination={{ position: ['none'] }}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />

            </>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="flex-wrap">
                                    <PageHeader
                                        className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                                        onBack={() => window.history.back()}
                                        title="Jadwal Pelajaran"
                                    />
                                    <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                                        <div className="row">
                                            <div className="col-lg-8 col-md-6 my-2">
                                                {/* <Button className="mr-4" type="primary" shape="round" size='middle'
                                                    >
                                                    Tambah Data
                                                </Button> */}
                                            </div>
                                            <div className="col-lg-4 col-md-6 my-2">
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
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 d-flex">
                                        {/* <p className="font-weight-bolder ml-2 mt-2 mb-0 mr-3 mt-0">Pilih Hari</p>
                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                name="status_guru"
                                                required
                                            >
                                                <option value="" selected disabled>

                                                </option>
                                                <option value="Senin">
                                                    Senin
                                                </option>
                                                <option value="Selasa">
                                                    Selasa
                                                </option>
                                                <option value="Rabu">
                                                    Rabu
                                                </option>
                                                <option value="Kamis">
                                                    Kamis
                                                </option>
                                                <option value="Jumat">
                                                    Jumat
                                                </option>
                                            </select>
                                        </div> */}
                                    </div>
                                    <div className="py-2 col-lg-4">
                                        {calendar == false ?
                                            <h5 onClick={() => setCalendar(true)}
                                                className='align-items-center d-flex justify-content-end cursor-pointer'>
                                                <TableOutlined style={{ fontSize: '22px' }} />
                                                <p className="font-weight-bolder ml-2 mb-0">Tampilkan Mode Tabel</p>
                                            </h5> :
                                            <h5 onClick={() => setCalendar(false)}
                                                className='align-items-center d-flex justify-content-end cursor-pointer'>
                                                <CalendarOutlined style={{ fontSize: '20px' }} />
                                                <p className="font-weight-bolder ml-2 mb-0">Tampilkan Mode Kalender</p>
                                            </h5>}
                                    </div>
                                </div>
                                {calendar ? <TableJadwalPelajaran /> : <CalendarData />}
                            </div>
                        </div>
                        <Adminfooter />
                    </div>
                </div>
            </div>
        </Fragment>);
}

export default JadwalPelajaranSiswa;
