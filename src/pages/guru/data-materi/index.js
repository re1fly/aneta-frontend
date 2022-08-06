import React, { Fragment, useState } from 'react';
import Adminfooter from "../../../components/Adminfooter";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Menu,
    message,
    notification,
    PageHeader,
    Progress,
    Row,
    Space,
    Table,
    Tag,
    Upload,
    Select
} from "antd";
import Link from "react-router-dom/es/Link";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MenuOutlined,
    EyeOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Filter from '../../../components/Filter';


function GuruDataMateri() {
    const [grid, setGrid] = useState(false);
    const [isViewMateri, setIsViewMateri] = useState(true);

    const { Option } = Select;

    const _onSelectMenu = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
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

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            defaultSortOrder: 'ascend',
            responsive: ['sm'],
        },
        {
            title: 'Nama Materi',
            dataIndex: 'namaMateri',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value, record) => record.namaMateri.indexOf(value) === 0,
            // sorter: (a, b) => a.namaMateri.length - b.namaMateri.length,
            // sortDirections: ['descend'],
        },
        {
            title: 'Tingkat Kelas',
            dataIndex: 'tingkatKelas',
            align: 'center',
        },
        {
            title: 'TA / Semester',
            dataIndex: 'ta_semester',
            align: 'center',
        },
        {
            title: 'Mata Pelajaran',
            dataIndex: 'mataPelajaran',
            align: 'center',
        },
        {
            title: 'Jenis Materi',
            dataIndex: 'jenisMateri',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
        },
        {
            title: 'Aksi',
            key: 'action',
            responsive: ['sm'],
            render: (text, record) => (
                <Space size="middle">
                    <Link to="/guru-data-materi-detail">
                        <EyeOutlined style={{ color: "black" }} />
                    </Link>
                    <EditOutlined style={{ color: "blue" }} onClick={() => notification.open({
                        message: 'Edit',
                        description:
                            'Edit materi bernama ' + record.namaMateri,
                        duration: 2

                    })} />
                    <DeleteOutlined style={{ color: 'red' }} onClick={() => notification.open({
                        message: 'Delete',
                        description:
                            'Hapus materi bernama ' + record.namaMateri,
                        duration: 2
                    })} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            no: '01',
            namaMateri: 'Bangun Datar',
            tingkatKelas: '3',
            ta_semester: '2021/2022/Genap',
            mataPelajaran: 'Matematika',
            jenisMateri: 'Teks',
            status: 'Draf',
        },
        {
            no: '02',
            namaMateri: 'Puisi dan Syair',
            tingkatKelas: '3',
            ta_semester: '2021/2022/Genap',
            mataPelajaran: 'Bahasa Indonesia',
            jenisMateri: 'Video',
            status: 'Selesai',
        },
        {
            no: '03',
            namaMateri: 'Regresi Linier',
            tingkatKelas: '3',
            ta_semester: '2021/2022/Genap',
            mataPelajaran: 'Ilmu Pengetahuan Alam',
            jenisMateri: 'Teks',
            status: 'Draf',
        },
    ];

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const _onSearch = value => console.log(value);

    const ViewMateri = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onClick={() => window.history.back()}
                            title="Data Materi"
                        />
                    </div>
                </div>
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <Row>
                        <Col span={12}>
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                onClick={() => setIsViewMateri(false)}>
                                Tambah Data
                            </Button>
                            {/* <Filter title1="Nama Materi" title2="KI/KD" /> */}
                            {/* <Dropdown overlay={_filterMenu}>
                                        <a className="ant-dropdown-link mr-4 font-bold"
                                           onClick={e => e.preventDefault()}>
                                            Filter by <DownOutlined/>
                                        </a>
                                    </Dropdown>
                                    <Dropdown overlay={_sortMenu}>
                                        <a className="ant-dropdown-link font-bold" onClick={e => e.preventDefault()}>
                                            Sort by <DownOutlined/>
                                        </a>
                                    </Dropdown> */}
                        </Col>
                        <Col span={12}>
                            <div className="float-right">
                                <Search className="mr-5" placeholder="Cari kata kunci" allowClear
                                    onSearch={_onSearch} style={{ width: 250, lineHeight: '20px' }} />
                                {grid == false ?
                                    <a>
                                        <AppstoreOutlined style={{ fontSize: '30px' }}
                                            onClick={() => setGrid(true)} />
                                    </a> :
                                    <a>
                                        <MenuOutlined style={{ fontSize: '30px' }}
                                            onClick={() => setGrid(false)} />
                                    </a>}
                            </div>
                        </Col>
                    </Row>
                </Card>

                <div className="row">
                    <div className="col-lg-3 mb-3">
                        <div className="form-group">
                            <select
                                className="form-control"
                                aria-label="Default"
                                name="pilih_kelas"
                            >
                                <option value="" selected disabled>
                                    Pilih Kelas
                                </option>
                                {/* {dataKelas.map((data) => (
                                        <option value={data.id_class}>{data.class}</option>
                                    ))} */}
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-3 mb-3">
                        <div className="form-group">
                            <select
                                className="form-control"
                                aria-label="Default"
                                name="pilih_mataPelajaran"
                            >
                                <option value="" selected disabled>
                                    Pilih Mata Pelajaran
                                </option>
                                {/* {dataKelas.map((data) => (
                                        <option value={data.id_class}>{data.class}</option>
                                    ))} */}
                            </select>
                        </div>
                    </div>
                </div>

                <Table className=""
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={{ position: ['bottomCenter'] }}
                    rowClassName="bg-greylight text-grey-900" />
                <Adminfooter />
            </div>
        )
    }

    const TambahMateri = () => {
        const { Dragger } = Upload;

        const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onDrop(e) {
                console.log('Dropped files', e.dataTransfer.files);
            },
        };
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => setIsViewMateri(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data Materi
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <form id="mataPelajaran_form"
                                        // onSubmit={createJadwalPelajaran}
                                        method="POST">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Mata Pelajaran
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="pilih_mata_pelajaran"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Mata Pelajaran
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
                                                        name="Tingkat Kelas"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Tingkat Kelas
                                                        </option>
                                                        {/* {mataPelajaran.map((data, i) => {
                                                            return (
                                                                <option value={data.id_subjects} selected key={i}>
                                                                    {data.nama_mata}
                                                                </option>
                                                            )
                                                        })} */}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Materi
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Materi
                                                        </option>
                                                        {/* {getGuru.map((data, i) => {
                                                            return (
                                                                <option value={data.id_guru} selected key={i}>
                                                                    {data.name}
                                                                </option>
                                                            )
                                                        })} */}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Jenis Materi
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="materi"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Jenis Materi
                                                        </option>
                                                        <option value="">
                                                            Text
                                                        </option>
                                                        <option value="">
                                                            Video
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Sumber Video
                                                    </label>
                                                    <Dragger {...props} style={{ height: "90%" }} className="mt-12">
                                                        <p className="ant-upload-drag-icon">
                                                            <VideoCameraOutlined />
                                                        </p>
                                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                        <p className="ant-upload-hint">
                                                            Max. file size 50MB
                                                        </p>
                                                    </Dragger>
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Keterangan
                                                    </label>
                                                    <textarea
                                                        className="form-control mb-0 p-3 bg-greylight lh-16"
                                                        rows="5"
                                                        placeholder="Isi Keterangan..."
                                                        name="keterangan"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Isi Materi
                                                    </label>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data=""
                                                        row="20px"
                                                        as="textarea"
                                                        onReady={(editor) => {
                                                        }}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            console.log({ event, editor, data });
                                                        }}
                                                        onBlur={(event, editor) => {
                                                            console.log("Blur.", editor);
                                                        }}
                                                        onFocus={(event, editor) => {
                                                            console.log("Focus.", editor);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kompetensi
                                                    </label>
                                                    {/* <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="kompetensi"
                                                        required
                                                    >
                                                        <option value="" selected disabled>
                                                            Pilih Kompetensi
                                                        </option>
                                                    </select> */}
                                                    <Select
                                                        // className="form-control"
                                                        mode="multiple"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        placeholder="Pilih Kompetensi"
                                                        onChange={handleChange}
                                                        optionLabelProp="label"
                                                    >
                                                        <Option value="Kompetensi 1">
                                                            Kompetensi 1
                                                        </Option>
                                                        <Option value="Kompetensi 2">
                                                            Kompetensi 2
                                                        </Option>
                                                        <Option value="Kompetensi 3">
                                                            Kompetensi 3
                                                        </Option>
                                                        <Option value="Kompetensi 4">
                                                            Kompetensi 4
                                                        </Option>
                                                        <Option value="Kompetensi 5">
                                                            Kompetensi 5
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button
                                                    className="bg-tumblr border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Draft
                                                </button>
                                                <button
                                                    className="ml-2 bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Simpan
                                                </button>
                                                <button
                                                    onClick={() => setIsViewMateri(true)}

                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-none"
                                                >
                                                    Batal
                                                </button>
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
                    {isViewMateri ? <ViewMateri /> : <TambahMateri />}
                </div>
            </div>
        </Fragment>
    );
}

export default GuruDataMateri;