import React, {Fragment, useState} from 'react';
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
    Tag
} from "antd";
import Link from "react-router-dom/es/Link";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MenuOutlined
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Filter from '../../../components/Filter';

function GuruDetailPelajaran() {
    const [grid, setGrid] = useState(false);

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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
            responsive: ['sm'],
        },
        {
            title: 'Nama Materi',
            dataIndex: 'namaMateri',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.namaMateri.indexOf(value) === 0,
            sorter: (a, b) => a.namaMateri.length - b.namaMateri.length,
            sortDirections: ['descend'],
        },
        {
            title: 'KI / KD',
            dataIndex: 'kiKd',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.kiKd - b.kiKd,
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            defaultSortOrder: 'descend',
            render: progress => (
                <>
                    {progress.map(progress => {
                        return (
                            <Progress
                                percent={progress}
                            />
                        )
                    })}
                </>
            )
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
                            'Edit materi bernama ' + record.namaMateri,
                        duration: 2

                    })}/>
                    <DeleteOutlined style={{color: 'red'}} onClick={() => notification.open({
                        message: 'Delete',
                        description:
                            'Hapus materi bernama ' + record.namaMateri,
                        duration: 2
                    })}/>
                </Space>
            ),
        },
    ];


    const data = [
        {
            id: '001',
            namaMateri: 'Ambilkan Bulan',
            kiKd: '2.0',
            progress: [30],
            status: ['aktif'],
        },
        {
            id: '002',
            namaMateri: 'Si Kancil Berjalan',
            kiKd: '3.0',
            progress: [50],
            status: ['aktif'],
        },
        {
            id: '003',
            namaMateri: 'Bebek Berenang',
            kiKd: '4.0',
            progress: [100],
            status: ['aktif'],
        },
        {
            id: '004',
            namaMateri: 'Berhitung Sepuasnya',
            kiKd: '1.0',
            progress: [20],
            status: ['nonAktif'],
        },
    ];

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const _onSearch = value => console.log(value);


    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row mb-3">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="Data Materi / Materi Pelajaran"
                                />
                            </div>
                        </div>
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <Row>
                                <Col span={12}>
                                    <Link href='/admin/tambah-data-siswa'>
                                        <Button className="mr-4" type="primary" shape="round" size='middle'>
                                            Tambah Data
                                        </Button>
                                    </Link>
                                    <Filter title1="Nama Materi" title2="KI/KD"/>
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

                        <Table className="mx-4"
                               columns={columns}
                               dataSource={data}
                               onChange={onChangeTable}
                               pagination={{position: ['bottomCenter']}}
                               rowClassName="bg-greylight text-grey-900"/>
                        <Adminfooter/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default GuruDetailPelajaran;