import React, { Fragment, useState } from 'react';
import {
    Card,
    Button,
    Calendar,
    Table,
    PageHeader,
    Modal
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

import { TanggalPertemuan } from '../../../components/table/TanggalPertemuan';

function JadwalPelajaranGuru() {
    const [grid, setGrid] = useState(false);
    const [calendar, setCalendar] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
                title: 'Tanggal',
                dataIndex: 'tanggal',
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
                tanggal: <Button className="rounded-xl" onClick={() => { setModalVisible(true) }}><i className="feather-calendar"></i></Button>,
                // tanggal: <CalendarOutlined className='cursor-pointer' style={{ fontSize: '18px' }} onClick={showModal} />,
                kelas: "1/A",
                namaPelajaran: "Matematika",
                namaPengajar: "Natsu",
                waktu: "14.00 - 15.00",
            }
        ]

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
                                    {/* <div className="py-2 col-lg-4">
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
                                    </div> */}
                                </div>
                                {calendar ? <TableJadwalPelajaran /> : <CalendarData />}
                                <Modal
                                    title="Tanggal Pertemuan"
                                    okText="Close"
                                    width={1000}
                                    style={{
                                        top: 100,
                                    }}
                                    visible={modalVisible}
                                    onOk={() => setModalVisible(false)}
                                    onCancel={() => setModalVisible(false)}
                                >
                                    <TanggalPertemuan />
                                </Modal>
                            </div>
                        </div>
                        <Adminfooter />
                    </div>
                </div>
            </div>
        </Fragment>);
}

export default JadwalPelajaranGuru;
