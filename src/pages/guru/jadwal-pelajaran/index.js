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
    DeleteOutlined,
    EditOutlined,
    CalendarOutlined,
    TableOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import axios from "axios";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

import { BASE_URL } from "../../../api/Url";
import {url_by_institute} from "../../../api/reference";

function JadwalPelajaranGuru() {
    const [grid, setGrid] = useState(false);
    const [calendar, setCalendar] = useState(true);
    const [getJadwalPelajaran, setGetJadwalPelajaran] = useState([]);

    const userName = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id')

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
        axios.post(BASE_URL, {
            "processDefinitionId": "e81e093e-028d-11ed-ac5e-66fc627bf211",
            "returnVariables": true,
            "variables": [
                {
                    "name": "get_data",
                    "type": "json",
                    "value": {
                        "user_id": userId,
                        "academic_id": 65
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
            setGetJadwalPelajaran(dataRes?.data);
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

        const data = [
            {
                hari: "Senin",
                kelas: "6/A",
                namaPelajaran: "Matematika",
                namaPengajar: "John Doe S.Pd",
                waktu: "08.00 - 10.00",
            }
        ]

        // const dataSenin = senin[0]?.data?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: kelas,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
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

        // const dataRabu = rabu?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: data.class,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
        //     }
        // })

        // const dataKamis = kamis?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: data.class,
        //         namaPelajaran: data.mata_pelarajan,
        //         namaPengajar: data.nama_guru,
        //         waktu: data.jam_mulai,
        //     }
        // })

        // const dataJumat = jumat?.map((data, index) => {
        //     return {
        //         hari: data.hari,
        //         kelas: data.class,
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
                    dataSource={data}
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
                    dataSource={data}
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
                    dataSource={data}
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
                    dataSource={data}
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
                    dataSource={data}
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
                    dataSource={data}
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

export default JadwalPelajaranGuru;
