import React, {Fragment, useState} from 'react';
import Adminfooter from "../../../components/Adminfooter";
import {Button, Card, Col, Dropdown, Menu, message, PageHeader, Row} from "antd";
import Link from "react-router-dom/es/Link";
import {AppstoreOutlined, DownOutlined, EllipsisOutlined, MenuOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

function MateriPelajaranGuru() {
    const [grid, setGrid] = useState(false);

    const channelList = [
        {
            pelajaran: 'tematik 1'
        },
        {
            pelajaran: 'tematik 2'
        },
        {
            pelajaran: 'bahasa indonesia',
        },
        {
            pelajaran: 'ips 1',
        },
        {
            pelajaran: 'ipa',
        },
        {
            pelajaran: 'kewarganegaraan',
        },

    ];

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

                        <div className="middle-sidebar-left">
                            <div className="row">
                                {channelList.map((value, index) => (
                                    <div className="col-xl-3 col-lg-4 col-md-4" key={index}>
                                        <Link to={'/guru-materi-pelajaran-detail'}>
                                            <div
                                                className="card mb-4 d-block w-100 shadow-md rounded-xl p-4 border-0 text-center">
                                                <h3 className="ml-auto mr-auto font-weight-bold mt-4 mb-4 text-capitalize">{value.pelajaran}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Adminfooter/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default MateriPelajaranGuru;