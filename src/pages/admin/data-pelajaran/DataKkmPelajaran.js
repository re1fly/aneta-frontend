import { useState } from "react";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment } from "react";
import { PageHeader, Select, Card, Table, Row, Button, Space, Menu, Dropdown, message } from "antd"
import {
    AppstoreOutlined,
    MenuOutlined,
    EyeOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import Filter from "../../../components/Filter";

function DataKkmPelajaran() {
    const [grid, setGrid] = useState(false);
    const [isViewDataKkm, setIsViewDataKkm] = useState(true);

    const _onSelectMenu = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _onSearch = value => console.log(value);

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const TabelDataKkm = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                responsive: ['sm'],
                align: 'center'
            },
            {
                title: 'Mata Pelajaran',
                dataIndex: 'mataPelajaran',
            },
            {
                title: 'TA / Semester',
                dataIndex: 'ta_smt',
                align: 'center'
            },
            {
                title: 'Tingkat Kelas',
                dataIndex: 'tingkatKelas',
                align: 'center'
            },
            {
                title: 'Nilai KKM',
                dataIndex: 'nilaiKkm',
                align: 'center'
            },
            {
                title: 'Aksi',
                dataIndex: 'aksi',
                defaultSortOrder: 'descend',
                render: () => (
                    <Space size="middle">
                        <EditOutlined style={{ color: "blue" }} />
                        <DeleteOutlined style={{ color: "red" }} />
                    </Space>
                ),
            },
        ];

        const data = [
            {
                no: '1',
                mataPelajaran: "Pendidikan Agama Islam",
                ta_smt: "2022/Ganjil",
                tingkatKelas: "1",
                nilaiKkm: "75",

            },
            {
                no: '2',
                mataPelajaran: "Pendidikan Kewarganegaraan",
                ta_smt: "2022/Ganjil",
                tingkatKelas: "1",
                nilaiKkm: "70",
            },
            {
                no: '3',
                mataPelajaran: "Matematika",
                ta_smt: "2022/Genap",
                tingkatKelas: "2",
                nilaiKkm: "60",
            },
        ];

        return (
            <Table className=""
                columns={columns}
                dataSource={data}
                onChange={onChangeTable}
                pagination={{ position: ['bottomCenter'] }}
                rowClassName="bg-greylight text-grey-900"
                scroll={{ x: 400 }} />
        )
    }

    const CardDataKkm = () => {
        const channelList = [
            {
                imageUrl: 'user.png',
                title: 'Pendidikan Agama Islam',
                tag1: '2022 / Ganjil',
                tingkatKelas: '1',
                nilaiKkm: '75',
            },
            {
                imageUrl: 'user.png',
                title: 'Pendidikan Kewarganegaraan',
                tag1: '2022 / Ganjil',
                tingkatKelas: '1',
                nilaiKkm: '70',
            },
            {
                imageUrl: 'user.png',
                title: 'Matematika',
                tag1: '2022 / Genap',
                tingkatKelas: '2',
                nilaiKkm: '60',
            },
        ];

        return (
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                Aktif
                            </span>
                            <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                overlay={_Account}>
                                <EllipsisOutlined />
                            </Dropdown>
                            <a
                                href=""
                                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4"
                            >
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a>
                            <h4 className="fw-700 font-xs mt-5">{value.title}</h4>
                            <div className="clearfix"></div>
                            {value.tag1 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1 mt-2">
                                    {value.tag1}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag2 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                    {value.tag2}
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
                                        <p className="font-xssss float-left lh-1">Tingkat Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.tingkatKelas}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Nilai KKM</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.nilaiKkm}</p>
                                    </div>
                                </div>

                                {/* <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tanggal Proses</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: 12 Juni 2022, 16.00</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewDataKkm = () => {
        return (
            <div className="container px-3 py-4 ">
                <PageHeader
                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                    onBack={() => window.history.back()}
                    title="Data KKM Mata Pelajaran"
                />
                <Card className="card bg-lightblue border-0 mb-2 text-grey-900">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={() => setIsViewDataKkm(false)}>
                                Tambah Data
                            </Button>
                            <Filter title1="Mata Pelajaran" title2="TA / Semester" />
                            {/* <Dropdown overlay={_filterMenu}>
                            <a className="ant-dropdown-link mr-4 font-bold"
                            onClick={e => e.preventDefault()}>
                            Filter by <DownOutlined/>
                            </a>
                        </Dropdown>
                        <Dropdown overlay={_sortMenu}>
                            <a className="ant-dropdown-link font-bold"
                            onClick={e => e.preventDefault()}>
                            Sort by <DownOutlined/>
                            </a>
                        </Dropdown> */}
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
                                </a>
                            }
                        </div>
                    </div>
                </Card>
                <div className="row d-flex align-items-center">

                </div>
                <div className="mt-4">
                    {grid ? <CardDataKkm /> : <TabelDataKkm />}
                </div>
            </div>
        )
    }

    const TambahDataKkm = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewDataKkm(true)}
                                        className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data KKM Mata Pelajaran
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <form id="teacher_form"
                                        // onSubmit={createGuru}
                                        method="POST">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Mata Pelajaran
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name='mata_pelajaran'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        TA / Semester
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name='ta_semester'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kurikulum
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="kurikulum"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Kurikulum
                                                        </option>
                                                        <option value="Kurikulum 1">
                                                            Kurikulum 1
                                                        </option>
                                                        <option value="Kurikulum 2">
                                                            Kurikulum 2
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tingkat Kelas
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="status_guru"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Tingkat Kelas
                                                        </option>
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nilai KKM
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="state_guru"
                                                        defaultValue=""
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Simpan
                                                </button>
                                                <a
                                                    onClick={() => setIsViewDataKkm(true)}
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
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
                    {isViewDataKkm ? <ViewDataKkm /> : <TambahDataKkm />}
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default DataKkmPelajaran;