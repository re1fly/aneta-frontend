import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useState} from "react";
import {Button, Card, Dropdown, Menu, message, notification, PageHeader, Space, Table} from "antd";
import Filter from "../../../components/Filter";
import {FilterAcademic} from "../../../components/FilterAcademic";
import Search from "antd/es/input/Search";
import {
    AppstoreOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    EyeOutlined,
    MenuOutlined
} from "@ant-design/icons";
import {FormAdminEkskul} from "../../../components/form/AdminEkskul";


export default function DataEkstrakurikuler() {
    const [grid, setGrid] = useState(false);
    const [btnPagination, setBtnPagination] = useState([]);
    const [selectedEkskul, setSelectedEkskul] = useState(null);
    const [paramsPage, setParamsPage] = useState("1");
    const [isViewEkskul, setIsViewEkskul] = useState(true);
    // const [pembina, setPembina] = useState([]);
    // const [tahunAkademik, setIsTahunAkademik] = useState([])
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const getEkskul = [
        {
            id_ekskul: 1,
            nama_ekskul: "Basket",
            id_pembina: 3,
            nama_pembina: "Johnny",
            kelas: [
                {
                    id_kelas: 1,
                    nama_kelas: "III",
                    sub_kelas: "C"
                },
                {
                    id_kelas: 2,
                    nama_kelas: "II",
                    sub_kelas: "B"
                }
            ],
            id_ta: 1,
            ta: '2020',
            semester_ta: '1',
            jumlah_siswa: 10,
            lokasi_ekskul: "Gor Kelapa Gading"
        },
        {
            id_ekskul: 2,
            nama_ekskul: "Sepak Bola",
            id_pembina: 2,
            nama_pembina: "Tri",
            kelas: [
                {
                    id_kelas: 1,
                    nama_kelas: "I",
                    sub_kelas: "B"
                },
                {
                    id_kelas: 2,
                    nama_kelas: "II",
                    sub_kelas: "C"
                }
            ],
            id_ta: 2,
            ta: '2020',
            semester_ta: '2',
            jumlah_siswa: 20,
            lokasi_ekskul: "Lapangan Old Trafford"
        },
        {
            id_ekskul: 3,
            nama_ekskul: "Pramuka",
            id_pembina: 1,
            nama_pembina: "Joko",
            kelas: [
                {
                    id_kelas: 1,
                    nama_kelas: "I",
                    sub_kelas: "B"
                },
                {
                    id_kelas: 5,
                    nama_kelas: "III",
                    sub_kelas: "A"
                }
            ],
            id_ta: 3,
            ta: '2021',
            semester_ta: '1',
            jumlah_siswa: 50,
            lokasi_ekskul: "Sekolah"
        }
    ]
    const pembina = [
        {
            id_pembina: 1,
            nama_pembina: "Joko"
        },
        {
            id_pembina: 2,
            nama_pembina: "Tri"
        },
        {
            id_pembina: 3,
            nama_pembina: "Johnny"
        }
    ]
    const tahunAkademik = [
        {
            id_ta: 1,
            ta: '2020',
            semester_ta: '1'
        },
        {
            id_ta: 2,
            ta: '2020',
            semester_ta: '2'
        },
        {
            id_ta: 3,
            ta: '2021',
            semester_ta: '1'
        }
    ]

    const dataSiswa = [
        {
            id_siswa: 1,
            nama_siswa: "Lola",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 2,
            nama_siswa: "Rachel",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 3 ,
            nama_siswa: "Lizzy",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        }
    ]

    const _onSearch = (value) => {
        console.log(value)
    }

    const viewCreateEkskul = () => {
        setIsViewCreate(true)
        setIsViewEkskul(false)
        setIsViewEdit(false)
    }

    const viewEditEkskul = (record) => {
        console.log(record)
        setSelectedEkskul(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewEkskul(false)
    }

    const deleteEkskul = (record) => {
        console.log(record)
    }

    const _onSelectMenu = ({key}) => {
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
    };

    const allDataEkskul = getEkskul.map((data, index) => {
        return {
            no: index + 1,
            imageUrl: 'user.png',
            idEkskul: data.id_ekskul,
            namaEkskul: data.nama_ekskul,
            idPembina: data.id_pembina,
            namaPembina: data.nama_pembina,
            kelas: data.kelas,
            idTahunAkademik: data.id_ta,
            tahunAkademik: data.ta,
            semester: data.semester_ta,
            jumlahSiswa: data.jumlah_siswa,
            lokasiEkskul: data.lokasi_ekskul
        }
    })


    const CardDataEkskul = () => {

        return (
            <div className="row">
                {allDataEkskul.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span
                                className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                Aktif
                            </span>
                            <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                      overlay={_Account}>
                                <EllipsisOutlined/>
                            </Dropdown>
                            <a href="" className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4">
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a>
                            <h4 className="fw-700 font-xs mt-4">{value.namaEkskul}</h4>
                            <div className="clearfix"></div>
                            <div className="mt-4 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Pembina</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.namaPembina}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Jumlah Siswa</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.jumlahSiswa}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const TableEkskul = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
            },
            {
                title: 'Nama Ekstrakurikuler',
                dataIndex: 'namaEkskul',
            },
            {
                title: 'Pembina',
                dataIndex: 'namaPembina',
            },
            {
                title: 'Kelas',
                dataIndex: 'kelas',
                render: (kelas) => kelas.map(
                    (data) => ' ' + data.nama_kelas + data.sub_kelas
                ).join(),
            },
            {
                title: 'Jumlah Siswa',
                dataIndex: 'jumlahSiswa',
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EditOutlined style={{color: "blue"}} onClick={() => viewEditEkskul(record)}/>
                        <DeleteOutlined style={{color: 'red'}} onClick={() => deleteEkskul(record)}/>
                    </Space>
                ),
            },
        ];

        return (
            <>
                <Table className="py-8"
                       columns={columns}
                       dataSource={allDataEkskul}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900"
                       scroll={{x: 400}}/>
                <div className="text-center mt-4">
                    {btnPagination.map((dataBtn) => {
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
        );
    }

    const createEkskul = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
    }

    const editEkskul = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
    }

    const FormCreate = () => {
        return (
            <FormAdminEkskul
                setView={() => setIsViewEkskul(true)}
                title="Tambah Ekstrakurikuler"
                submit={createEkskul}
                namaPembina="Pilih Pembina"
                idPembina=""
                selectPembina={pembina.map((data) => (
                    <option value={data.id_pembina}>{data.nama_pembina}</option>
                ))}
                idTahunAkademik=""
                thAkademik="Pilih Tahun Akademik"
                semester="Semester"
                selectedTahunAkademik="Pilih Tahun Akademik / Semester"
                selectTahunAkademik={tahunAkademik.map((data) => (
                    <option value={data.id_ta}>{data.ta} / Semester {data.semester_ta}</option>
                ))}
                isDisabled={false}
                isEdit={false}
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormAdminEkskul
                setView={() => setIsViewEkskul(true)}
                title="Edit Ekstrakurikuler"
                submit={editEkskul}
                namaEkskul={selectedEkskul.namaEkskul}
                namaPembina={selectedEkskul.namaPembina}
                idPembina={selectedEkskul.idPembina}
                selectPembina={pembina.map((data) => (
                    <option value={data.id_pembina}>{data.nama_pembina}</option>
                ))}
                idTahunAkademik={selectedEkskul.idTahunAkademik}
                thAkademik={selectedEkskul.tahunAkademik}
                semester={selectedEkskul.semester}
                selectedTahunAkademik="Pilih Tahun Akademik / Semester"
                selectTahunAkademik={tahunAkademik.map((data) => (
                    <option value={data.id_ta}>{data.ta} / Semester {data.semester_ta}</option>
                ))}
                lokasiEkskul={selectedEkskul.lokasiEkskul}
                isDisabled={false}
                isEdit={true}
            />
        )
    }

    const ViewEkskul = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Ekstrakurikuler"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                            onClick={viewCreateEkskul}>
                                        Tambah Data
                                    </Button>
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                            onSearch={_onSearch} style={{width: '80%'}}/>
                                    {grid == false ?
                                        <a>
                                            <AppstoreOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                              onClick={() => setGrid(true)}/>
                                        </a> :
                                        <a>
                                            <MenuOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                          onClick={() => setGrid(false)}/>
                                        </a>}
                                </div>
                            </div>
                        </Card>
                        {grid ? <CardDataEkskul/> : <TableEkskul/>}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        {
                            isViewEkskul ?
                                <ViewEkskul/> :
                                isViewCreate ?
                                    <FormCreate/> :
                                    isViewEdit ?
                                        <FormEdit/> :
                                        <ViewEkskul/>
                        }
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}