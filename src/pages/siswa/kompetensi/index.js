import React, { Fragment, useEffect, useState } from "react"
import axios from "axios";
import {
    Menu,
    Card,
    Row,
    Col,
    Button,
    Dropdown,
    message,
    Select,
    Tag,
    Space,
    notification,
    Table,
    Input,
    PageHeader
} from "antd";
import {
    DownOutlined,
    AppstoreOutlined,
    MenuOutlined,
    EditOutlined,
    DeleteOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import {
    get_data_pelajaran_by_tingkat,
    get_kompetensi_dashboard,
    get_where_no_join,
    url_by_institute
} from "../../../api/reference";

export default function KompetensiSiswa() {
    const [grid, setGrid] = useState(false)
    const academicYear = localStorage.getItem('academic_year')

    const _onSearch = value => console.log(value);

    const _onSelectMenu = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );


    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const TabelKompetensi = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                defaultSortOrder: 'ascend',
                responsive: ['sm'],
                align: "center"
            },
            {
                title: 'Kompetensi',
                dataIndex: 'namaKompetensi',
                // align: "center"
            },
            {
                title: 'Tingkat Kelas',
                dataIndex: 'kelas',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Semester',
                dataIndex: 'semester',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Kode',
                dataIndex: 'kode',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Kompetensi Dasar',
                dataIndex: 'kompetensiDasar',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Status',
                dataIndex: 'status',
                responsive: ['sm'],
                render: status => (
                    <>
                        {status.map(status => {
                            let color = status == 'true' ? 'green' : 'red';
                            return (
                                <Tag style={{ borderRadius: '15px' }} color={color} key={status}>
                                    {status == 'true' ? 'Aktif' : 'Tidak Aktif'}
                                </Tag>

                            );
                        })}
                    </>
                ),
            },
        ];

        const channelList = [
            {
                no: "1",
                namaKompetensi: "Kompetensi 1",
                kelas: "1/A",
                semester: "2020/2021 Semester 1",
                kode: "1.1",
                kompetensiDasar: "KD 1",
                keterangan: "Keterangan 1",
                status: ["true"],
            },
        ];

        return (
            <Table className=""
                columns={columns}
                dataSource={channelList}
                onChange={onChangeTable}
                pagination={false}
                rowClassName="bg-greylight text-grey-900"
                scroll={{ x: 400 }} />
        );
    };

    const CardDataKompetensi = () => {

        const channelList = [
            {
                // imageUrl: 'user.png',
                namaKompetensi: "Kompetensi 1",
                tag1: "1/A",
                tag2: "2021/2022/1",
                tag3: '',
                kode: "1.1",
                kompetensiDasar: "KD 1",
                keterangan: "Keterangan 1"
            },
        ];

        return (
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span
                                className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                Aktif
                            </span>
                            <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                overlay={_Account}>
                                <EllipsisOutlined />
                            </Dropdown>
                            {/* <a
                                href=""
                                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4"
                            >
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a> */}
                            <h4 className="fw-700 font-xs mt-5">{value.namaKompetensi}</h4>
                            <div className="clearfix"></div>
                            {value.tag1 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                    {value.tag1}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag2 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                    Semester {value.tag2}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag3 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-1">
                                    {value.tag3}
                                </span>
                            ) : (
                                ''
                            )}
                            <div className="clearfix"></div>
                            <div className="mt-4 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Kode</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.kode}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Kompetensi Dasar</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.kompetensiDasar}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Keterangan</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.keterangan}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewKompetensi = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Kompetensi"
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
                        <div className="py-2">
                            <div className="flex">
                                <div className="form-group w-full">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="form-group">
                                                <select
                                                    className="form-control"
                                                    id="id_mapel_comp"
                                                    key="id_mapel_comp"
                                                    name="id_mapel_comp"
                                                // onChange={(e) => setSelectedMapel(e.target.value)}
                                                // value={selectedMapel}
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Mata Pelajaran
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {grid ? <CardDataKompetensi /> : <TabelKompetensi />}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <ViewKompetensi />
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
};