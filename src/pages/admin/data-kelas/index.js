import React, { Fragment, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Dropdown,
    Menu,
    message,
    notification,
    Row,
    Space,
    Table,
    PageHeader
} from "antd";
import {
    AppstoreOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MenuOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { Link } from 'react-router-dom';

import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";

import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Filter from '../../../components/Filter';

export default function DataKelasAdmin() {
    const [grid, setGrid] = useState(false);
    const [isViewKelas, setIsViewKelas] = useState(true);
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

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

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _onSearch = value => console.log(value);

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    };
  
    const TableKelas = () => {
        const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            defaultSortOrder: 'ascend',
            responsive: ['sm'],
            // sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Nama Kelas',
            dataIndex: 'namaKelas',
            filters: [
                
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.namaKelas.indexOf(value) === 0,
            // sorter: (a, b) => a.namaKelas.length - b.namaKelas.length,
            // sortDirections: ['ascend'],
        },
        {
            title: 'Sub Kelas',
            dataIndex: 'subKelas',
            defaultSortOrder: 'ascend',
            // sorter: (a, b) => a.subKelas - b.subKelas,
        },
        {
            title: 'Lokasi Kelas',
            dataIndex: 'lokasiKelas',
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Tahun Akademik',
            dataIndex: 'tahunAkademik',
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Wali Kelas',
            dataIndex: 'waliKelas',
            defaultSortOrder: 'ascend',
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
                            'Edit user bernama ' + record.namaKelas,
                        duration: 2
                    })}/>
                    <DeleteOutlined style={{color: 'red'}} onClick={() => notification.open({
                        message: 'Delete',
                        description:
                            'Hapus user bernama ' + record.namaKelas,
                        duration: 2
                    })}/>
                </Space>
            ),
        },
        ];
        
        const data_sampel = [
        {
            id: '001',
            namaKelas: 'Kelas 1',
            subKelas: 'C',
            lokasiKelas: 'Ruang 404',
            tahunAkademik: '2020/2021',
            waliKelas: 'Ibu Siti Mastuti S.Pd'
        },
        {
            id: '002',
            namaKelas: 'Kelas 2',
            subKelas: 'A',
            lokasiKelas: 'Ruang 405',
            tahunAkademik: '2020/2021',
            waliKelas: 'Bapak Haryono S.Pd'
        },
        {
            id: '003',
            namaKelas: 'Kelas 3',
            subKelas: 'B',
            lokasiKelas: 'Ruang 406',
            tahunAkademik: '2020/2021',
            waliKelas: 'Ibu Nunung Ningsih S.Pd'
        },
        {
            id: '004',
            namaKelas: 'Kelas 4',
            subKelas: 'C',
            lokasiKelas: 'Ruang 407',
            tahunAkademik: '2020/2021',
            waliKelas: 'Ibu Ninig Hanjarwati S.Pd'
        },
        {
            id: '005',
            namaKelas: 'Kelas 5',
            subKelas: 'A',
            lokasiKelas: 'Ruang 408',
            tahunAkademik: '2020/2021',
            waliKelas: 'Bapak Jim Doe S.Pd'
        },
        {
            id: '006',
            namaKelas: 'Kelas 6',
            subKelas: 'B',
            lokasiKelas: 'Ruang 409',
            tahunAkademik: '2020/2021',
            waliKelas: 'Bapak Jhon Doe S.Pd'
        },
        ];

        return(
        <Table className="py-8"
                columns={columns}
                dataSource={data_sampel}
                onChange={onChangeTable}
                pagination={{position: ['bottomCenter']}}
                rowClassName="bg-greylight text-grey-900"
                scroll={{x:400}}/>
        );
    }

    const CardDataKelas = () => {
        const channelList = [
            {
                imageUrl: 'user.png',
                title: 'Kelas 1',
                tag1: 'C',
                tag2: ''
            },
            {
                imageUrl: 'user.png',
                title: 'Kelas 2',
                tag1: 'A',
                tag2: ''
            },
            {
                imageUrl: 'user.png',
                title: 'Kelas 3',
                tag1: 'B',
                tag2: ''
            },
            {
                imageUrl: 'user.png',
                title: 'Kelas 4',
                tag1: 'C',
                tag2: ''
            },
            {
                imageUrl: 'user.png',
                title: 'Kelas 5',
                tag1: 'A',
                tag2: ''
            },
            {
                imageUrl: 'user.png',
                title: 'Kelas 6',
                tag1: 'B',
                tag2: ''
            },
        ];

        return(
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
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
                            <h4 className="fw-700 font-xs mt-4">{value.title}</h4>
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
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Lokasi Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: 404</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tahun Akademik</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: 2020/2021</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Wali Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: Bapak Jhon Doe S.Pd</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewKelas = () => {
        return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <PageHeader
                        className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                        onBack={() => window.history.back()}
                        title="Data Kelas"
                    />
                    <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                        <div className="row">
                            <div className="col-lg-8 col-md-6 my-2">
                                <Button className="mr-4" type="primary" shape="round" size='middle'
                                        onClick={() => setIsViewKelas(false)}>
                                    Tambah Data
                                </Button>
                                <Filter title1="Nama Kelas" title2="Sub Kelas"/>
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
                    {grid ? <CardDataKelas/> : <TableKelas/>}
                </div>
            </div>
         </div>
        )    
    }
    
    const TambahKelas = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewKelas(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Kelas
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
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
                                                        Nama Kelas
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Sub Kelas
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Lokasi Kelas
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Tahun Akademik
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Wali Kelas
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <Link to="/account-information"
                                                      className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Save
                                                </Link>
                                                <Link to="/account-information"
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
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {isViewKelas ? <ViewKelas/> : <TambahKelas/>}
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}