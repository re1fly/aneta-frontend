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
    EllipsisOutlined,
    PicCenterOutlined
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import Filter from "../../../components/Filter";

function KirimPenilaian() {
    const [grid, setGrid] = useState(false);
    const [isViewKirimPenilaian, setIsViewKirimPenilaian] = useState(true);

    const { Column, ColumnGroup } = Table;
    const { Option } = Select;
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

    const TabelKirimPenilaian = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                defaultSortOrder: 'ascend',
                responsive: ['sm'],
            },
            {
                title: 'Kelas',
                dataIndex: 'kelas',
                sortDirections: ['descend'],
            },
            {
                title: 'Mata Pelajaran',
                dataIndex: 'mataPelajaran',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Pendidik',
                dataIndex: 'pendidik',
                defaultSortOrder: 'descend',
            },
            {
                title: 'TA / SMT',
                dataIndex: 'ta_smt',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Tanggal Proses',
                dataIndex: 'tanggalProses',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Aksi',
                dataIndex: 'aksi',
                defaultSortOrder: 'descend',
                render: () => (
                    <Space size="middle">
                        <EyeOutlined style={{ color: "black" }} />
                    </Space>
                ),
            },
        ];

        const data = [
            {
                no: '001',
                kelas: '2A',
                mataPelajaran: "Penjaskes",
                pendidik: "Nursyila S.Pd",
                ta_smt: "2020/Ganjil",
                status: "Terkirim",
                tanggalProses: "12 Juni 2022, 16.00",
                aksi: "",

            },
            {
                no: '002',
                kelas: '2B',
                mataPelajaran: "Penjaskes",
                pendidik: "Nursyila S.Pd",
                ta_smt: "2020/Ganjil",
                status: "Perbaikan",
                tanggalProses: "12 Juni 2022, 16.00",
                aksi: "",
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

    const CardKirimPenilaian = () => {
        const channelList = [
            {
                // imageUrl: 'user.png',
                title: 'Penjaskes',
                tag1: 'Kelas 2A',
                tag2: '2020 / Ganjil',
            },
            {
                // imageUrl: 'user.png',
                title: 'Penjaskes',
                tag2: '2020 / Ganjil',
                tag1: 'Kelas 2A',
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
                                        <p className="font-xssss float-left lh-1">Pendidik</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: Nursyila S.Pd</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Status</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: Terkirim</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tanggal Proses</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: 12 Juni 2022, 16.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewKirimPenilaian = () => {
        return (
            <div className="container px-3 py-4 ">
                <PageHeader
                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                    onBack={() => window.history.back()}
                    title="Kirim Penilain"
                />
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={() => setIsViewKirimPenilaian(false)}>
                                Tambah Data
                            </Button>
                            <Filter title1="Kelas" title2="Mata Pelajaran" />
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
                    {grid ? <CardKirimPenilaian /> : <TabelKirimPenilaian />}
                </div>
            </div>
        )
    }

    const TambahKirimPenilaian = () => {

        const columns = [
            {
                title: 'Nilai KKM',
                dataIndex: 'nilaiKkm',
                width: '25%',
                align: 'center',
                onCell: (_, index) => {
                    if (index === 0) {
                        return {
                            rowSpan: 3,
                        };
                    }

                    if (index === 1) {
                        return {
                            rowSpan: 0,
                        };
                    }

                    if (index === 2) {
                        return {
                            colSpan: 0,
                        };
                    }

                    return {};
                }
            },
            {
                title: 'Aturan Predikat',
                dataIndex: 'predikat1',
                colSpan: 4,
                align: 'center',
                onCell: (_, index) => {
                    if (index === 1) {
                        return {
                            rowSpan: 2,
                        };
                    }

                    if (index === 2) {
                        return {
                            rowSpan: 0,
                        };
                    }

                    return {};
                }
            },
            {
                title: '',
                dataIndex: 'predikat2',
                align: 'center',
                colSpan: 0,
            },
            {
                title: '',
                dataIndex: 'predikat3',
                align: 'center',
                colSpan: 0,
            },
            {
                title: '',
                dataIndex: 'predikat4',
                align: 'center',
                colSpan: 0,
            },
        ];

        const data = [
            {
                key: "1",
                nilaiKkm: "75",
                predikat1: "A : Sangat Baik",
                predikat2: "B : Baik",
                predikat3: "C : Cukup",
                predikat4: "D : Kurang"
            },
            {
                key: "2",
                nilaiKkm: "75",
                predikat1: ">= 91",
                predikat2: "83 >= Nilai < 91",
                predikat3: "75 >= Nilai < 83",
                predikat4: "< 75"
            },
        ]

        const data_sampel = [
            {
                key: '1',
                no: '1',
                namaSiswa: 'Boy Jati Asmara',
                kelas: '1A',
                kkm: '75',
                nilaiPengetahuan: '65',
                predikatPengetahuan: 'D',
                nilaiKeterampilan: '80',
                predikatKeterampilan: 'C',
                predikatSpiritual: 'Baik',
                predikatSosial: 'Baik',
            },
            {
                key: '2',
                no: '2',
                namaSiswa: 'Rochy Putiary',
                kelas: '1A',
                kkm: '75',
                nilaiPengetahuan: '87',
                predikatPengetahuan: 'B',
                nilaiKeterampilan: '97',
                predikatKeterampilan: 'A',
                predikatSpiritual: 'Sangat Baik',
                predikatSosial: 'Baik',
            },
            {
                key: '3',
                no: '3',
                namaSiswa: 'Yaris Riyadi',
                kelas: '1A',
                kkm: '75',
                nilaiPengetahuan: '100',
                predikatPengetahuan: 'A',
                nilaiKeterampilan: '91',
                predikatKeterampilan: 'A',
                predikatSpiritual: 'Baik',
                predikatSosial: 'Baik',
            },
        ];

        return (
            <div className="container px-3 py-4">
                <PageHeader
                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                    onBack={() => setIsViewKirimPenilaian(true)}
                    title="Kirim Penilaian"
                />
                <div className="row d-flex align-items-center">
                    <div className="col-lg-5">
                        <Card className="shadow-md my-6 rounded">
                            <Row>
                                <Select style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Pilih Kelas ...."
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="kelas1">Kelas 1</Option>
                                    <Option value="kelas2">Kelas 2</Option>
                                    <Option value="kelas3">Kelas 3</Option>
                                </Select>
                            </Row>
                        </Card>
                    </div>
                    <div className="col-lg-5">
                        <Card className="shadow-md my-6 rounded">
                            <Row>
                                <Select style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Pilih Mata Pelajaran ...."
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="matematika">Matematika</Option>
                                    <Option value="bahasaIndonesia">Bahasa Indonesia</Option>
                                    <Option value="ilmuPengetahuanAlam">Ilmu Pengetahuan Alam</Option>
                                </Select>
                            </Row>
                        </Card>
                    </div>
                    <div className="col-lg-2">
                        <button
                            className="bg-current border-0 text-center text-white font-xs fw-600 p-2 w150 rounded-xl d-inline-block"
                            type="submit"
                        >
                            Pratinjau
                        </button>
                    </div>
                </div>
                <div className="mt-4 bg-grey">
                    <p className="font-xssss strong text-black pl-4 mb-0">Tabel Interval Predikat - Penjaskes</p>
                </div>
                <Table className="mt-0 py-8"
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }}
                    bordered />

                <Table
                    dataSource={data_sampel}
                    className="mt-4"
                    align='center'
                    pagination={false}
                    bordered>
                    <Column align='center' title="No" dataIndex="no" key="no" />
                    <Column align='center' title="Nama Siswa" dataIndex="namaSiswa" key="namaSiswa" />
                    <Column align='center' title="Kelas" dataIndex="kelas" key="kelas" />
                    <Column align='center' title="KKM" dataIndex="kkm" key="kkm" />
                    <ColumnGroup title="Pengetahuan">
                        <Column align='center' title="Nilai" dataIndex="nilaiPengetahuan" key="nilaiPengetahuan" />
                        <Column align='center' title="Predikat" dataIndex="predikatPengetahuan" key="predikatPengetahuan" />
                    </ColumnGroup>
                    <ColumnGroup title="Keterampilan">
                        <Column align='center' title="Nilai" dataIndex="nilaiKeterampilan" key="nilaiKeterampilan" />
                        <Column align='center' title="Predikat" dataIndex="predikatKeterampilan" key="predikatKeterampilan" />
                    </ColumnGroup>
                    <ColumnGroup align='center' title="Sikap Spiritual">
                        <Column align='center' title="Predikat" dataIndex="predikatSpiritual" key="predikatSpiritual" />
                    </ColumnGroup>
                    <ColumnGroup align='center' title="Sikap Sosial">
                        <Column align='center' title="Predikat" dataIndex="predikatSosial" key="predikatSosial" />
                    </ColumnGroup>
                </Table>

                <div className="col-lg-12 mt-5 mb-5 d-flex justify-content-end">
                    <button
                        className="bg-current border-0 text-center text-white font-xsss p-3 fw-600 w150 rounded-xl d-inline-block mr-2 mt-5"
                        type="submit"
                    >
                        Kirim
                    </button>
                    <button
                        className="bg-lightblue border-0 text-center font-xsss fw-600 p-3 w150 rounded-xl d-inline-block mt-5"
                    >
                        Batal
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {isViewKirimPenilaian ? <ViewKirimPenilaian /> : <TambahKirimPenilaian />}
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default KirimPenilaian;