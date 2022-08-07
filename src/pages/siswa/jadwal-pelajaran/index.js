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

function JadwalPelajaranSiswa() {
    const user = localStorage.getItem('user_name');

    const [grid, setGrid] = useState(false);
    const [calendar, setCalendar] = useState(true);

    const _onSearch = value => console.log(value);

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
                filters: [
                    {
                        text: 'Tematik 1',
                        value: 'Tematik 1',
                    },
                    {
                        text: 'Tematik 2',
                        value: 'Tematik 2',
                    },
                ],
                // onFilter: (value, record) => record.namaPelajaran.indexOf(value) === 0,
                // sorter: (a, b) => a.namaPelajaran.length - b.namaPelajaran.length,
            },
            {
                title: 'Guru/Tenaga Pengajar',
                dataIndex: 'namaPengajar',
                align: 'center',
                filters: [
                    {
                        text: 'Sri Wahyuni S.pd',
                        value: 'Sri Wahyuni S.pd',
                    },
                    {
                        text: 'Siti Mulyani S.pd',
                        value: 'Siti Mulyani S.pd',
                    },
                ],
                // onFilter: (value, record) => record.namaPengajar.indexOf(value) === 0,
                // sorter: (a, b) => a.namaPengajar.length - b.namaPengajar.length,
            },
            {
                title: 'Waktu Mulai - Waktu Selesai',
                dataIndex: 'waktu',
                align: 'center'
            },
            {
                title: 'Aksi',
                key: 'action',
                align: 'center',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EditOutlined style={{ color: "blue" }} onClick={() => notification.open({
                            message: 'Edit',
                            description:
                                'Edit user bernama ' + record.namaPelajaran,
                            duration: 2

                        })} />
                        <DeleteOutlined style={{ color: 'red' }} onClick={() => notification.open({
                            message: 'Delete',
                            description:
                                'Hapus user bernama ' + record.namaPelajaran,
                            duration: 2
                        })} />
                    </Space>
                ),
            },
        ];

        const data = [
            {
                kelas: '2/B',
                namaPelajaran: 'Tematik 1',
                namaPengajar: 'Sri Wahyuni S.pd',
                waktu: '07.30 - 08.30',
            },
            {
                kelas: '2/B',
                namaPelajaran: 'Tematik 2',
                namaPengajar: 'Siti Mulyani S.pd',
                waktu: '08.30 - 09.30',
            },
        ];

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
