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
    MenuOutlined, PlusOutlined
} from "@ant-design/icons";
import Link from "react-router-dom/es/Link";
import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import {BASE_URL} from "../../api/Url";


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
                            }
                        ]
                    }
                }, {
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
    }, [paramsPage])

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

    const _onSearch = value => console.log(value);

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
                                {status.toUpperCase()}
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
        return {
            nis: index + 1,
            imageUrl: 'user.png',
            namaSiswa: siswa.name,
            tanggalLahir: siswa.periode_start,
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
                            {/*<a*/}
                            {/*    href="/default-channel"*/}
                            {/*    className="position-absolute right-0 mr-4 top-0 mt-3"*/}
                            {/*>*/}
                            {/*    <i className="ti-more text-grey-500 font-xs"></i>*/}
                            {/*</a>*/}

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
                                        <p className="font-xssss float-left lh-1">: {value.tanggalLahir}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-3">
                                        <p className="font-xssss float-left lh-1">Email</p>
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

                    if(linkUrl != null){
                       linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                    }

                    return (
                        <Button className="mr-2 bg-current text-white font-xssss fw-600"
                                disabled={linkUrl == null ? true : false}
                                onClick={() => {setParamsPage(linkUrl)}}>
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
                <Card className="card bg-lightblue border-0 text-grey-900">
                    <Row>
                        <Col span={12}>
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
                        </Col>
                        <Col span={12}>
                            <div className="float-right">
                                <Search className="mr-5" placeholder="Cari kata kunci" allowClear
                                        onSearch={_onSearch} style={{width: 250, lineHeight: '20px'}}/>
                                {grid == false ?
                                    <a>
                                        <AppstoreOutlined style={{fontSize: '30px'}}
                                                          onClick={() => setGrid(true)}/>
                                    </a> :
                                    <a>
                                        <MenuOutlined style={{fontSize: '30px'}}
                                                      onClick={() => setGrid(false)}/>
                                    </a>}
                            </div>
                        </Col>
                    </Row>
                </Card>

                {grid ? <CardDataSiswa/> : <TableDataSiswa/>}
            </div>
        )
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
                                                    <input type="number" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Siswa
                                                    </label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tempat Lahir
                                                    </label>
                                                    <input type="text" className="form-control"/>
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
                                                        Email
                                                    </label>
                                                    <input type="email" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        No. HP
                                                    </label>
                                                    <input type="number" className="form-control"/>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Alamat
                                                    </label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Provinsi
                                                    </label>
                                                    <input type="text" className="form-control"/>
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
                                    <i onClick={() => setIsViewSiswa(true)}
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
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Email
                                                    </label>
                                                    <input type="email" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tempat Lahir
                                                    </label>
                                                    <input type="text" className="form-control"/>
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
                                                        Email
                                                    </label>
                                                    <input type="email" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        No. HP
                                                    </label>
                                                    <input type="number" className="form-control"/>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Alamat
                                                    </label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Provinsi
                                                    </label>
                                                    <input type="text" className="form-control"/>
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

                                            <div className="col-lg-12">
                                                <a className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                   onClick={() => alert('saved')}
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
                {isViewFormSiswa ? <DataFormSiswa/> : <DataFormOrangtua/>}
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