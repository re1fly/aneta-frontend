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
    Tag,
    Space,
    notification,
    Table,
} from "antd";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EllipsisOutlined,
    MenuOutlined, PlusOutlined, SearchOutlined
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import {BASE_URL} from "../../api/Url";
import pagination from "../../components/Pagination";


function DataSiswaAdmin() {
    const [grid, setGrid] = useState(false);
    const [isViewSiswa, setIsViewSiswa] = useState(true);
    const [isViewFormSiswa, setIsViewFormSiswa] = useState(true);
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const [getSiswa, setGetSiswa] = useState([]);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState('1');
    const [dataClass, setDataClass] = useState();

    const [newSiswa, setNewSiswa] = useState({
        nisn: "123",
        image: "",
        image_type: "jpeg",
        nama_siswa: "Budi",
        email: "budi@gmail.com",
        tempat_lahir: "jakarta",
        tanggal_lahir: "2020-09-09 09:00:00",
        no_hp: "29032932",
        provinsi: "DKI Jakarta",
        kota: "Jakarta",
        kecamatan: "kelapa gading",
        kelurahan: "kelapa cengkir",
        alamat: "no 7",
        academic_year_id: 1,
        id_class: "2",
        email_ortu: "tatang@gmail.com",
        nama_ortu: "tatang",
        tempat_lahir_ortu: "jakarta",
        tanggal_lahir_ortu: "2020-09-09 09:00:00",
        no_hp_ortu: "232321",
        provinsi_ortu: "DKI Jakarta",
        kota_ortu: "jakarta",
        kecamatan_ortu: "kelapa gading",
        kelurahan_ortu: "kelapa cengkir",
        alamat_ortu: "no 7",
        profesi_ortu: "wiraswasta",
        nik: "a"
    });

    useEffect(() => {
        axios.post(BASE_URL, {
            "processDefinitionId": "getjoinglobal:4:30625eca-db37-11ec-a2ad-3a00788faff5",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_students",
                        "pagination": 10,
                        "join": [
                            {
                                "tbl_join": "x_academic_year",
                                "foregenkey": "academic_year_id",
                                "refkey": "id"
                            },
                            {
                                "tbl_join": "users",
                                "foregenkey": "user_id",
                                "refkey": "id"
                            },
                            {
                                "tbl_join": "x_academic_class",
                                "foregenkey": "class_id",
                                "refkey": "id"
                            },
                            {
                                "tbl_join": "m_user_profile",
                                "foregenkey": "user_id",
                                "refkey": "user_id"
                            }
                        ],
                        "order_coloumn": "users.name",
                        "order_by": "asc"
                    }
                },
                {
                    "name": "page",
                    "type": "string",
                    "value": paramsPage
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            const siswa = JSON.parse(response.data.variables[3].value);
            setGetSiswa(siswa.data.data)

            const pagination = siswa.data.links;
            setBtnPagination(pagination)
        });
        axios.post(BASE_URL, {
            "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_get_where",
                    "type": "json",
                    "value": {
                        "tbl_name": "x_academic_class",
                        "pagination": false,
                        "total_result": 2,
                        "order_coloumn": "x_academic_class.class",
                        "order_by": "asc",
                        "data": [
                            {
                                "kondisi": "where",
                                "tbl_coloumn": "academic_year_id",
                                "tbl_value": "1",
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
            const dataClass = JSON.parse(response.data.variables[2].value);
            setDataClass(dataClass)
        }).catch(function (error) {
            console.log(error);
        });

    }, [paramsPage])


    const createSiswa = () => {
        axios.post(BASE_URL, {
            "processDefinitionId": "createsiswa:6:f61a59cc-e247-11ec-a2ad-3a00788faff5",
            "returnVariables": true,
            "variables": [
                {
                    "name": "siswa",
                    "type": "json",
                    "value": {
                        "image": newSiswa.image,
                        "image_type": newSiswa.image_type,
                        "nisn": newSiswa.nisn,
                        "nama_siswa": newSiswa.nama_siswa,
                        "email": newSiswa.email,
                        "tempat_lahir": newSiswa.tempat_lahir,
                        "tanggal_lahir": newSiswa.tanggal_lahir,
                        "no_hp": newSiswa.no_hp,
                        "provinsi": newSiswa.provinsi,
                        "kota": newSiswa.kota,
                        "kecamatan": newSiswa.kecamatan,
                        "kelurahan": newSiswa.kelurahan,
                        "alamat": newSiswa.alamat,
                        "academic_year_id": newSiswa.academic_year_id,
                        "id_class": newSiswa.id_class,
                        "email_ortu": newSiswa.email_ortu,
                        "nama_ortu": newSiswa.nama_ortu,
                        "tempat_lahir_ortu": newSiswa.tempat_lahir_ortu,
                        "tanggal_lahir_ortu": newSiswa.tanggal_lahir_ortu,
                        "no_hp_ortu": newSiswa.no_hp_ortu,
                        "provinsi_ortu": newSiswa.provinsi_ortu,
                        "kota_ortu": newSiswa.kota_ortu,
                        "kecamatan_ortu": newSiswa.kecamatan_ortu,
                        "kelurahan_ortu": newSiswa.kelurahan_ortu,
                        "alamat_ortu": newSiswa.alamat_ortu,
                        "profesi_ortu": newSiswa.profesi_ortu,
                        "nik": newSiswa.nik
                    }
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            const dataStatus = response.data.variables[2].value;
            // const dataMessage = response.statusText;


            // notification.success({
            //     message: dataStatus,
            //     description: dataMessage,
            //     placement: 'top'
            // })
            console.log(dataStatus)
            alert(dataStatus)
        });
    }

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


    const _onSelectMenu = ({key}) => {
        message.info(`Click on item ${key}`);
    };

    const _account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Delete</Menu.Item>
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

    const _onSearch = (value) => {
        if (value == "") {
            window.location.reload();
        } else {
            notification.info({
                message: 'Search',
                description: 'Mencari data : ' + value,
                duration: 1,
                icon: <SearchOutlined/>
            });
            axios.post(BASE_URL, {
                "processDefinitionId": "getdatajoinwhere:2:d2aed4a7-dff4-11ec-a658-66fc627bf211",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_students",
                            "paginate": 200,
                            "join": [
                                {
                                    "tbl_join": "x_academic_year",
                                    "foregenkey": "academic_year_id",
                                    "refkey": "id"
                                },
                                {
                                    "tbl_join": "users",
                                    "foregenkey": "user_id",
                                    "refkey": "id"
                                },
                                {
                                    "tbl_join": "x_academic_class",
                                    "foregenkey": "class_id",
                                    "refkey": "id"
                                },
                                {
                                    "tbl_join": "m_user_profile",
                                    "foregenkey": "user_id",
                                    "refkey": "user_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "m_user_profile",
                                    "tbl_field": "nisn",
                                    "tbl_value": value,
                                    "operator": "ILIKE"
                                },
                                {
                                    "tbl_coloumn": "users",
                                    "tbl_field": "name",
                                    "tbl_value": value,
                                    "operator": "ILIKE"
                                },
                                {
                                    "tbl_coloumn": "m_user_profile",
                                    "tbl_field": "date_of_birth",
                                    "tbl_value": value,
                                    "operator": "ILIKE"
                                },
                                {
                                    "tbl_coloumn": "users",
                                    "tbl_field": "email",
                                    "tbl_value": value,
                                    "operator": "ILIKE"
                                }

                            ],
                            "order_coloumn": "users.name",
                            "order_by": "asc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": paramsPage
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (response) {
                const siswa = JSON.parse(response.data.variables[3].value);
                const pagination = siswa.data.links;

                setGetSiswa(siswa.data.data)
                setBtnPagination(pagination)
            });
        }
    }

    const columns = [
        {
            title: 'NIS',
            dataIndex: 'nis',
            defaultSortOrder: 'ascend',
            // sorter: (a, b) => a.nis - b.nis,
        },
        {
            title: 'Name',
            dataIndex: 'namaSiswa',
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
            onFilter: (value, record) => record.namaSiswa.indexOf(value) === 0,
            sorter: (a, b) => a.namaSiswa.length - b.namaSiswa.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Tanggal Lahir',
            dataIndex: 'tanggalLahir',
            defaultSortOrder: 'descend',
            responsive: ['sm'],
            // sorter: (a, b) => a.tanggalLahir - b.tanggalLahir,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => (
                <>
                    {status.map(status => {
                        let color = status.length > 5 ? 'red' : 'green';
                        return (
                            <Tag style={{borderRadius: '15px'}} color={color} key={status}>
                                {status ? 'Aktif' : 'Nonaktif'}
                            </Tag>

                        );
                    })}
                </>
            ),
            filters: [
                {
                    text: 'Aktif',
                    value: 'aktif',
                },
                {
                    text: 'Nonaktif',
                    value: 'nonAktif',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
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
                            'Edit user bernama ' + record.namaSiswa,
                        duration: 2

                    })}/>
                    <DeleteOutlined style={{color: 'red'}} onClick={() => notification.open({
                        message: 'Delete',
                        description:
                            'Hapus user bernama ' + record.namaSiswa,
                        duration: 2
                    })}/>
                </Space>
            ),
        },
    ];

    const channelList = getSiswa.map((siswa, index) => {
        const dataBirth = siswa.date_of_birth
        const [year, month, day] = dataBirth.split('-');
        const birthDate = `${day}-${month}-${year}`;

        return {
            nis: index + 1,
            imageUrl: 'user.png',
            namaSiswa: siswa.name,
            tanggalLahir: birthDate,
            tempatLahir: siswa.place_of_birth,
            email: siswa.email,
            tag1: '',
            tag2: siswa.class,
            tag3: '',
            status: [JSON.stringify(siswa.student_status_id)],
        }
    });

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );


    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const CardDataSiswa = () => (
        <div className="middle-sidebar-left mt-3">
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
                            <h4 className="fw-700 font-xs mt-3 mb-3">{value.namaSiswa}</h4>
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
                                    <div className="col-3">
                                        <p className="font-xssss float-left lh-1">NIS</p>
                                    </div>
                                    <div className="col-9">
                                        <p className="font-xssss float-left lh-1">: 001</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-3">
                                        <p className="font-xssss float-left lh-1">TTL</p>
                                    </div>
                                    <div className="col-9">
                                        <p className="font-xssss float-left lh-1">: {value.tempatLahir}, {value.tanggalLahir}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-3">
                                        <p className="font-xssssa float-left lh-1">Email</p>
                                    </div>
                                    <div className="col-9">
                                        <p className="font-xssss float-left lh-1">: {value.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const TableDataSiswa = () => (
        <>
            <Table className="mt-4"
                   columns={columns}
                   dataSource={channelList}
                   onChange={onChangeTable}
                   pagination={false}
                   rowClassName="bg-greylight text-grey-900"
                   scroll={{x: 400}}
            />
            <div className="text-center mt-4">
                {
                    btnPagination.map(dataBtn => {
                        const labelBtn = dataBtn.label;
                        const label = labelBtn.replace(/(&laquo\;)/g, "").replace(/(&raquo\;)/g, "")
                        let linkUrl = dataBtn.url;

                        if (linkUrl != null) {
                            linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                        }

                        return (
                            <Button className="btn btn-primary mr-2 font-xssss fw-600"
                                    disabled={linkUrl == null ? true : false}
                                    onClick={() => {
                                        setParamsPage(linkUrl)
                                    }}>
                                {label}
                            </Button>
                        )
                    })
                }
            </div>

        </>
    )

    const ViewSiswa = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Siswa"
                        />
                    </div>
                </div>
                {/* <Card className="card bg-lightblue border-0 text-grey-900"> */}
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">

                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                    onClick={() => setIsViewSiswa(false)}>
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
                        {/*</div>*/}
                    </div>
                </Card>

                {grid ? <CardDataSiswa/> : <TableDataSiswa/>}
            </div>
        )
    }

    const _handleNewSiswa = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setNewSiswa(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const DataFormSiswa = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewSiswa(true)}
                                       className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data Siswa
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
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
                                                        NISN
                                                    </label>
                                                    <input type="text"
                                                           // key="form_nisn"
                                                           className="form-control"
                                                           value={newSiswa.nisn}
                                                           name="nisn"
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                                <a
                                                    onClick={() => console.log(newSiswa)}
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </a>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Siswa
                                                    </label>
                                                    <input type="text"
                                                           // key="form_nama"
                                                           className="form-control"
                                                           name="nama_siswa"
                                                           value={newSiswa.nama_siswa}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kelas
                                                    </label>
                                                    <select className="form-control"
                                                            aria-label="Default select example"
                                                            name="id_class"
                                                            value={newSiswa.id_class}
                                                            onChange={_handleNewSiswa}
                                                    >
                                                        
                                                        <option value="" selected disabled>Pilih Kelas</option>
                                                        {dataClass.map(data => (
                                                            <option value={data.id}>{data.class}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tempat Lahir
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="tempat_lahir"
                                                           value={newSiswa.tempat_lahir}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tanggal Lahir
                                                    </label>
                                                    <input type="date"
                                                           className="form-control"
                                                           value={newSiswa.tanggal_lahir}
                                                           name="tanggal_lahir"
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Email
                                                    </label>
                                                    <input type="email"
                                                           className="form-control"
                                                           value={newSiswa.email}
                                                           onChange={_handleNewSiswa}
                                                           name="email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        No. HP
                                                    </label>
                                                    <input type="number"
                                                           className="form-control"
                                                           value={newSiswa.no_hp}
                                                           onChange={_handleNewSiswa}
                                                           name="no_hp"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Provinsi
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           value={newSiswa.provinsi}
                                                           onChange={_handleNewSiswa}
                                                           name="provinsi"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kota
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           value={newSiswa.kota}
                                                           onChange={_handleNewSiswa}
                                                           name="kota"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kecamatan
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           value={newSiswa.kecamatan}
                                                           onChange={_handleNewSiswa}
                                                           name="kecamatan"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kelurahan
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           value={newSiswa.kelurahan}
                                                           onChange={_handleNewSiswa}
                                                           name="kelurahan"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Alamat
                                                </label>
                                                <textarea
                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                    rows="5"
                                                    placeholder="Isi alamat detail anda..."
                                                    value={newSiswa.alamat}
                                                    onChange={_handleNewSiswa}
                                                    name="alamat"
                                                ></textarea>
                                            </div>

                                            <div className="col-lg-12">
                                                <a className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                   onClick={() => setIsViewFormSiswa(false)}
                                                >
                                                    Selanjutnya
                                                </a>
                                                <a
                                                    onClick={() => setIsViewSiswa(true)}
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
        )
    }

    const DataFormOrangtua = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewFormSiswa(true)}
                                       className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data Siswa - OrangTua
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Orang Tua / Wali
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="nama_ortu"
                                                           value={newSiswa.nama_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Email
                                                    </label>
                                                    <input type="email"
                                                           className="form-control"
                                                           name="email_ortu"
                                                           value={newSiswa.email_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tempat Lahir
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="tempat_lahir_ortu"
                                                           value={newSiswa.tempat_lahir_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tanggal Lahir
                                                    </label>
                                                    <input type="date"
                                                           className="form-control"
                                                           name="tanggal_lahir_ortu"
                                                           value={newSiswa.tanggal_lahir_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Email
                                                    </label>
                                                    <input type="email"
                                                           className="form-control"
                                                           name="email_ortu"
                                                           value={newSiswa.email_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        No. HP
                                                    </label>
                                                    <input type="number"
                                                           className="form-control"
                                                           name="no_hp_ortu"
                                                           value={newSiswa.no_hp_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Provinsi
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="provinsi_ortu"
                                                           value={newSiswa.provinsi_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kota
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="kota_ortu"
                                                           value={newSiswa.kota_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kecamatan
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="kecamatan_ortu"
                                                           value={newSiswa.kecamatan_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kelurahan
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="kelurahan_ortu"
                                                           value={newSiswa.kelurahan_ortu}
                                                           onChange={_handleNewSiswa}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Alamat
                                                </label>
                                                <textarea
                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                    rows="5"
                                                    placeholder="Isi alamat detail anda..."
                                                    name="alamat_ortu"
                                                    value={newSiswa.alamat_ortu}
                                                    onChange={_handleNewSiswa}
                                                ></textarea>
                                            </div>

                                            <div className="col-lg-12">
                                                <a className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                   onClick={createSiswa}
                                                >
                                                    Simpan
                                                </a>
                                                <a
                                                    onClick={() => setIsViewFormSiswa(true)}
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Kembali
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
        )
    }

    const TambahSiswa = () => {
        return (
            <>
                {isViewFormSiswa ? DataFormSiswa(): DataFormOrangtua()}
            </>

        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {isViewSiswa ? <ViewSiswa/> : <TambahSiswa/>}
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}

export default DataSiswaAdmin;