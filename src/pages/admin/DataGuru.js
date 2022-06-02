import React, {Fragment, useEffect, useState} from 'react';
import Adminfooter from "../../components/Adminfooter";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
import {
    Dropdown,
    Menu,
    PageHeader,
    message,
    Card,
    Row,
    Col,
    Button,
    Table,
    Tag,
    Space,
    notification,
} from "antd";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EllipsisOutlined,
    MenuOutlined, PlusOutlined
} from "@ant-design/icons";
import Link from "react-router-dom/es/Link";
import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import {BASE_URL} from "../../api/Url";


function DataGuruAdmin() {
    const [grid, setGrid] = useState(false);
    const [isViewGuru, setIsViewGuru] = useState(true);
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const [dataProv, setDataProv] = useState([]);
    const [dataCity, setDataCity] = useState([]);

    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const channelList = [
        {
            imageUrl: 'user.png',
            namaGuru: 'Nining Hanjarwati',
            nomorSk: 'SKI-MEI-012212',
            tahunAktif: '2010',
            tag1: 'Kelas 5 A',
            tag2: 'Kelas 4 B',
            tag3: 'Kelas 3 C',
            statusGuru: ['pns'],
            status: 'Pegawai Negeri Sipil'
        },
        {
            imageUrl: 'user.png',
            namaGuru: 'Eko Prasetyo',
            nomorSk: 'SKI-MEI-012212',
            tahunAktif: '2005',
            tag1: '',
            tag2: 'Kelas 5 A',
            tag3: '2 A',
            statusGuru: ['pns'],
            status: 'Pegawai Negeri Sipil'

        },
        {
            imageUrl: 'user.png',
            namaGuru: 'Bambang Setiawan',
            nomorSk: 'SKI-MEI-012212',
            tahunAktif: '2011',
            tag1: 'Kelas 5 A',
            tag2: 'Kelas 4 B',
            tag3: 'Kelas 3 C',
            statusGuru: ['pns'],
            status: 'Pegawai Negeri Sipil'
        },
        {
            imageUrl: 'user.png',
            namaGuru: 'Triyanto',
            nomorSk: 'SKI-MEI-012212',
            tahunAktif: '2009',
            tag1: 'Kelas 5 A',
            tag2: 'Kelas 4 B',
            tag3: 'Kelas 3 C',
            statusGuru: ['pns'],
            status: 'Pegawai Negeri Sipil'
        },
        {
            imageUrl: 'user.png',
            namaGuru: 'Nunung Sutisna',
            nomorSk: 'SKI-MEI-012212',
            tahunAktif: '2010',
            tag1: 'Kelas 5 A',
            tag2: 'Kelas 4 B',
            tag3: 'Kelas 3 C',
            statusGuru: ['pns'],
            status: 'Pegawai Negeri Sipil'
        },
        {
            imageUrl: 'user.png',
            namaGuru: 'Reza Tanuwijaya',
            nomorSk: 'SKI-MEI-012212',
            tahunAktif: '2021',
            tag1: 'Kelas 5 A',
            tag2: 'Kelas 4 B',
            tag3: 'Kelas 3 C',
            statusGuru: ['honorer'],
            status: 'Pegawai Honorer'
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'namaGuru',
            filters: [
                {
                    text: 'John',
                    value: 'John',
                },
                {
                    text: 'James',
                    value: 'James',
                },
            ],
            onFilter: (value, record) => record.namaGuru.indexOf(value) === 0,
            sorter: (a, b) => a.namaGuru.length - b.namaGuru.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Nomor SK',
            dataIndex: 'nomorSk',
            defaultSortOrder: 'descend',
            // sorter: (a, b) => a.nomorSk - b.nomorSk,
        },
        {
            title: 'Status',
            dataIndex: 'statusGuru',
            render: statusGuru => (
                <>
                    {statusGuru.map(statusGuru => {
                        let color = statusGuru.length > 5 ? 'blue' : 'green';
                        return (
                            <Tag style={{borderRadius: '15px'}} color={color} key={statusGuru}>
                                {statusGuru.toUpperCase()}
                            </Tag>

                        );
                    })}
                </>
            ),
            filters: [
                {
                    text: 'Pegawai Negeri Sipil',
                    value: 'pns',
                },
                {
                    text: 'Pegawai Honorer',
                    value: 'honorer',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Tahun Aktif',
            dataIndex: 'tahunAktif',
            defaultSortOrder: 'descend',
            responsive: ['sm'],
            // sorter: (a, b) => a.nomorSk - b.nomorSk,
        },
        {
            title: 'Aksi',
            key: 'action',
            responsive: ['sm'],
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={{color: "blue"}} onClick={() => notification.open({
                        message: 'Edit',
                        description:
                            'Edit user bernama ' + record.namaGuru,
                        duration: 2

                    })}/>
                    <DeleteOutlined style={{color: 'red'}} onClick={() => notification.open({
                        message: 'Delete',
                        description:
                            'Hapus user bernama ' + record.namaGuru,
                        duration: 2
                    })}/>
                </Space>
            ),
        },
    ];

    const _onSelectMenu = ({key}) => {
        message.info(`Click on item ${key}`);
    };

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _filterMenu = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">1st filter</Menu.Item>
            <Menu.Item key="2">2nd filter</Menu.Item>
            <Menu.Item key="3">3rd filter</Menu.Item>
        </Menu>
    );

    const _sortMenu = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">1st sort</Menu.Item>
            <Menu.Item key="2">2nd sort</Menu.Item>
            <Menu.Item key="3">3rd sort</Menu.Item>
        </Menu>
    );

    const _onSearch = value => console.log(value);

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }


    const CardDataGuru = () => (
        <div className="middle-sidebar-left">
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div
                            className="card mb-4 d-block w-100 shadow-md rounded-lg p-4 border-0 text-center">
                                <span
                                    className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                    Aktif
                                </span>
                            <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                      overlay={_Account}>
                                <EllipsisOutlined/>
                            </Dropdown>

                            <a
                                href="/default-channel"
                                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                            >
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a>
                            <h4 className="fw-700 font-xs mt-3 mb-3">{value.title}</h4>
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
                                    <div className="col-4 pl-0">
                                        <p className="font-xssss float-left lh-1">Status</p>
                                    </div>
                                    <div className="col-8">
                                        <p className="font-xssss float-left lh-1">: {value.status}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-4 pl-0">
                                        <p className="font-xssss float-left lh-1">Tahun Aktif</p>
                                    </div>
                                    <div className="col-8">
                                        <p className="font-xssss float-left lh-1">: {value.tahunAktif}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-4 pl-0">
                                        <p className="font-xssss float-left lh-1">Nomor SK</p>
                                    </div>
                                    <div className="col-8">
                                        <p className="font-xssss float-left lh-1">: {value.nomorSk}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const TableDataGuru = () => (
        <Table className="mt-4"
               columns={columns}
               dataSource={channelList}
               onChange={onChangeTable}
               pagination={{position: ['bottomCenter']}}
               rowClassName="bg-greylight text-grey-900"
        />
    )

    const ViewGuru = () => (
        <div className="container px-3 py-4">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <PageHeader
                        className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                        onBack={() => window.history.back()}
                        title="Data Guru / Tenaga Pengajar"
                    />
                </div>
            </div>
            <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                <div className="row">
                    <div className="col-lg-8 col-md-6 my-2">
                        <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={() => setIsViewGuru(false)}>
                            Tambah Data
                        </Button>
                        <Dropdown overlay={_filterMenu}>
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
                        </Dropdown>
                    </div>
                    <div className="col-lg-4 col-md-6 my-2">
                        {/*<div className="float-right">*/}
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

            {grid ? <CardDataGuru/> : <TableDataGuru/>}
        </div>
    )
    const _getCity = (e) => {
        const selectedProvince = e.target.value;
        console.log(selectedProvince)

        axios.post(BASE_URL, {
            "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_get_where",
                    "type": "json",
                    "value": {
                        "tbl_name": "r_city",
                        "order_coloumn": "city",
                        "order_by": "asc",
                        "pagination": false,
                        "total_result": 2,
                        "data": [
                            {
                                "kondisi": "where",
                                "tbl_coloumn": "state_id",
                                "tbl_value": 31,
                                "operator": "="
                            }
                        ],
                        "tbl_coloumn": [
                            "*"
                        ]
                    }
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            const kota = JSON.parse(response.data.variables[2].value);
           console.log(kota);
           // setDataCity(kota)
        }).catch(function (error) {
            console.log(error);
        });
    }

    const TambahGuru = () => {
        axios.post(BASE_URL, {
            "processDefinitionId": "getdataglobal:5:7248a1b1-d5a7-11ec-a658-66fc627bf211",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_getdata",
                    "type": "json",
                    "value": {
                        "tbl_name": "r_state",
                        "tbl_coloumn": [
                            "*"
                        ],
                        "order_coloumn": "state",
                        "order_by": "asc",
                        "pagination": false,
                        "total_result": 2
                    }
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            const data = JSON.parse(response.data.variables[2].value).data;
            setDataProv(data);
        });

        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewGuru(true)}
                                       className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data Guru
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div class="row">
                                        <div className="col-lg-12 mb-5">
                                            <div className="d-flex justify-content-center">
                                                <Card className="bg-lightblue" style={{width: 157}}>
                                                    <ImgCrop rotate>
                                                        <Upload
                                                            className="avatar-uploader"
                                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onChange={onChange}
                                                            onPreview={onPreview}
                                                        >
                                                            {fileList.length < 1 && <PlusOutlined/>}
                                                        </Upload>
                                                    </ImgCrop>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>

                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama
                                                    </label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nomor Telefon
                                                    </label>
                                                    <input type="number" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Email
                                                    </label>
                                                    <input type="email" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tanggal Lahir
                                                    </label>
                                                    <input type="date" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Provinsi
                                                    </label>
                                                    <select className="form-control"
                                                            aria-label="Default select example"
                                                            onChange={_getCity}
                                                    >
                                                        >
                                                        <option value="" selected disabled>Pilih Provinsi</option>
                                                        {dataProv.map(data => (
                                                            <option value={data.state_code}>{data.state}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kota / Kabupaten
                                                    </label>
                                                    <select className="form-control"
                                                            aria-label="Default select example"
                                                    >
                                                        >
                                                        <option value="" selected disabled>Pilih Kota</option>
                                                        {/*{dataCity.map(data => (*/}
                                                        {/*    <option value={data.state_id}>{data.city}</option>*/}
                                                        {/*))}*/}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kecamatan
                                                    </label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kelurahan
                                                    </label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Alamat
                                                </label>
                                                <textarea
                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                    rows="5"
                                                    placeholder="Isi alamat detail anda..."
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <Link
                                                    to="/account-information"
                                                    className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Save
                                                </Link>
                                                <Link
                                                    to="/account-information"
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </Link>
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
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {isViewGuru ? <ViewGuru/> : <TambahGuru/>}
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}

export default DataGuruAdmin;

