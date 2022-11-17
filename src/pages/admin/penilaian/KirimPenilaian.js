import { useState, useEffect } from "react"
import axios from "axios";
import { GetMapelKelas } from "../../../components/filter/GetMapelKelas";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment } from "react";
import { PageHeader, notification, Select, Card, Table, Row, Button, Space, Menu, Dropdown, message } from "antd"
import {
    AppstoreOutlined,
    MenuOutlined,
    EyeOutlined,
    EllipsisOutlined,
    SearchOutlined
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { dateNow } from "../../../components/misc/date";
import { DataNotFound } from "../../../components/misc/DataNotFound";
import {
    cari_kirim_penilaian,
    get_kirim_penilaian,
    get_kirim_penilaian_detail,
    global_update,
    url_by_institute
} from "../../../api/reference";

function KirimPenilaian() {

    const [getKirimPenilaian, setGetKirimPenilaian] = useState([]);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");
    const [dataKirimNilai, setDataKirimNilai] = useState(null);
    const idHeader = dataKirimNilai?.id_header

    // console.log(JSON.stringify(dataKirimNilai, null, 2));

    const [grid, setGrid] = useState(false);
    const [isViewKirimPenilaian, setIsViewKirimPenilaian] = useState(true);

    const academicYear = localStorage.getItem('academic_year');
    const institute = localStorage.getItem('institute');

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

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const _onSearch = (value) => {
        if (value == "") {
            window.location.reload();
        } else {
            notification.info({
                message: "Search",
                description: "Mencari data : " + value,
                duration: 1,
                icon: <SearchOutlined />,
            });
            axios.post(url_by_institute,
                {
                    "processDefinitionId": cari_kirim_penilaian,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": {
                                "id_academic": academicYear,
                                "cari": value
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
                const dataRes = JSON.parse(response?.data?.variables[3]?.value)
                console.log(dataRes.data);
                setGetKirimPenilaian(dataRes?.data)
                const pagination = dataRes?.links;
                setBtnPagination(pagination)
            })
        }
    }

    // kirim penilaian tampilan depan
    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": get_kirim_penilaian,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_academic": academicYear,
                            "result": 10
                        }
                    }, {
                        "name": "page",
                        "type": "string",
                        "value": paramsPage
                    }
                ]
            }
        ).then(function (response) {
            // console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[3]?.value)
            setGetKirimPenilaian(dataRes?.data?.data)
            setBtnPagination(dataRes?.data?.links)
        })

    }, [academicYear])


    const TabelKirimPenilaian = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                defaultSortOrder: 'ascend',
                responsive: ['sm'],
            },
            {
                title: 'Kelas/Sub Kelas',
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
                title: 'Dibuat oleh',
                dataIndex: 'dibuatOleh',
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

        const data = getKirimPenilaian.map((data, index) => {
            return {
                no: index + 1,
                kelas: `${data.kelas} / ${data.sub_kelas}`,
                mataPelajaran: data.matapelajaran,
                pendidik: data.pendidik,
                ta_smt: `${data.tahun_akademik} / ${data.semester}`,
                status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
                tanggalProses: data.send_date,
                dibuatOleh: data.created_by,
            }
        })

        return (

            <>
                <Table className=""
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{ x: 400 }} />
                <div className='text-center mt-4'>
                    {btnPagination?.map((dataBtn) => {
                        const labelBtn = dataBtn.label;
                        const label = labelBtn
                            .replace(/(&laquo\;)/g, "")
                            .replace(/(&raquo\;)/g, "");
                        let linkUrl = dataBtn.url;

                        if (linkUrl != null) {
                            linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                        }

                        return (
                            <Button
                                className="btn btn-primary mr-2 font-xssss fw-600"
                                disabled={linkUrl == null ? true : false}
                                onClick={() => {
                                    setParamsPage(linkUrl);
                                }}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </div>
            </>
        )
    }

    const CardKirimPenilaian = () => {

        const channelList = getKirimPenilaian.map((data, index) => {
            return {
                no: index + 1,
                tag1: `${data.class_type} / ${data.sub_class}`,
                mataPelajaran: data.nama_mata,
                pendidik: data.name,
                tag2: `${data.academic_year} / ${data.semester}`,
                status: data.status,
                tanggalProses: data.send_date,
                // dibuatOleh: ''
            }
        })

        console.log(channelList);

        return (
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                {channelList.status}
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
                            <h4 className="fw-700 font-xs mt-5">{value.mataPelajaran}</h4>
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
                                        <p className="font-xssss float-left lh-1">: {value.pendidik}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Status</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.status.charAt(0).toUpperCase() + value.status.slice(1)}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tanggal Proses</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.tanggalProses.split(' ')[0]}</p>
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
                    title="Status Penilaian"
                />
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={() => setIsViewKirimPenilaian(false)}>
                                Tambah Data
                            </Button>
                            {/* <Filter title1="Kelas" title2="Mata Pelajaran" /> */}
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

    // data (Tambah data)
    const _getDataKirimPenilaian = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
        axios.post(url_by_institute,
            {
                "processDefinitionId": get_kirim_penilaian_detail,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_academic": academicYear,
                            "id_class": data.id_class_filter,
                            "id_matpel": data.id_mapel_filter
                        }
                    }
                ]
            }
            ,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                },
            }
        ).then(function (response) {
            console.log(response);
            const dataRes = JSON.parse(response.data.variables[2].value);
            console.log(dataRes);
            const dataKirim = dataRes.data
            const rsCode = dataRes.code


            if (rsCode === true) {
                setDataKirimNilai(dataKirim);
                notification.success({
                    message: "Data Ditemukan",
                    description: "Data Dapat dilihat dalam table",
                    placement: 'top'
                })
            } else {
                setDataKirimNilai(null);
                notification.info({
                    message: "Not Found",
                    description: "Data tidak ditemukan",
                    placement: 'top'
                })
            }

        }, [academicYear, data?.id_class_filter, data?.id_mapel_filter])
    }

    const onSubmit = (e) => {
        axios
            .post(
                url_by_institute, {
                "processDefinitionId": global_update,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_updatedata",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_assessment_headerModel",
                            "id": idHeader,
                            "tbl_coloumn": {
                                "is_value_sent": true,
                                "send_date": dateNow,
                                "status": "terkirim"
                            }
                        }
                    }
                ]
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            )
            .then(function (response) {
                const dataRes = JSON.parse(response.data.variables[2].value);
                const rsCode = dataRes.status
                console.log(rsCode);

                if (rsCode === "success") {
                    notification.success({
                        message: "Sukses",
                        description: "Penilaian berhasil di kirim",
                        placement: 'top'
                    })
                } else {
                    notification.info({
                        message: "Gagal",
                        description: "Penilaian tidak berhasil di kirim",
                        placement: 'top'
                    })
                }
            })
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
                nilaiKkm: dataKirimNilai?.interval_predikat?.data[0]?.kkm,
                predikat1: `${dataKirimNilai?.interval_predikat?.data[0]?.name} : Sangat Baik`,
                predikat2: `${dataKirimNilai?.interval_predikat?.data[1]?.name} : Baik`,
                predikat3: `${dataKirimNilai?.interval_predikat?.data[2]?.name} : Cukup`,
                predikat4: `${dataKirimNilai?.interval_predikat?.data[3]?.name} : Kurang`,
            },
            {
                key: "2",
                nilaiKkm: dataKirimNilai?.interval_predikat?.data[0]?.kkm,
                predikat1: `>= ${dataKirimNilai?.interval_predikat?.data[0]?.min}`,
                predikat2: `${dataKirimNilai?.interval_predikat?.data[1]?.min} >= Nilai < ${dataKirimNilai?.interval_predikat?.data[1]?.max}`,
                predikat3: `${dataKirimNilai?.interval_predikat?.data[2]?.min} >= Nilai < ${dataKirimNilai?.interval_predikat?.data[2]?.max}`,
                predikat4: `< ${dataKirimNilai?.interval_predikat?.data[2]?.min}`
            },
        ]

        const data_sampel1 = () => {
            var tmp = []
            dataKirimNilai?.siswa?.map((data, index) => {
                tmp.push({
                    key: '1',
                    no: '1',
                    namaSiswa: data.nama_siswa,
                    kelas: data.kelas,
                    kkm: data.kkm,
                    // pengetahuan
                    nilaiPengetahuan: dataKirimNilai?.siswa[index]?.data_nilai[0]?.given_value,
                    predikatPengetahuan: dataKirimNilai?.siswa[index]?.data_nilai[0]?.predikat,
                    // keterampilan
                    nilaiKeterampilan: dataKirimNilai?.siswa[index]?.data_nilai[1]?.given_value,
                    predikatKeterampilan: dataKirimNilai?.siswa[index]?.data_nilai[1]?.predikat,
                    // spiritual
                    predikatSpiritual: dataKirimNilai?.siswa[index]?.data_nilai[2]?.predikat,
                    // sikap
                    predikatSosial: dataKirimNilai?.siswa[index]?.data_nilai[2]?.predikat,
                })
            })
            return tmp;
        }

        return (
            <div className="container px-3 py-4">
                <PageHeader
                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                    onBack={() => setIsViewKirimPenilaian(true)}
                    title="Status Penilaian"
                />
                <GetMapelKelas valueFilter={(e) => _getDataKirimPenilaian(e)} />
                {dataKirimNilai == null ?
                    <DataNotFound />
                    :
                    <>
                        {dataKirimNilai.interval_predikat == null ?
                            <div className="mt-4 bg-grey">
                                <p className="font-xssss strong text-black pl-4 mb-0">Data Interval Predikat kosong</p>
                            </div> :
                            <>
                                <div className="mt-4 bg-grey">
                                    <p className="font-xssss strong text-black pl-4 mb-0">Tabel Interval Predikat - {dataKirimNilai?.interval_predikat?.nama_matpel}</p>
                                </div>
                                <Table className="mt-0 py-8"
                                    columns={columns}
                                    dataSource={data}
                                    onChange={onChangeTable}
                                    pagination={false}
                                    rowClassName="bg-greylight text-grey-900"
                                    scroll={{ x: 400 }}
                                    bordered />
                            </>
                        }

                        <Table
                            dataSource={data_sampel1()}
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
                                onClick={onSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-lightblue border-0 text-center font-xsss fw-600 p-3 w150 rounded-xl d-inline-block mt-5"
                                onClick={() => setIsViewKirimPenilaian(true)}
                            >
                                Batal
                            </button>
                        </div>
                    </>
                }
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