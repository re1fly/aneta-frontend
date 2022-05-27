import React, { Fragment, useState } from "react"

import {
  Menu,
  Card,
  Row,
  Col,
  Button,
  Dropdown,
  message,
  PageHeader
} from "antd";
import {
  DownOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Link } from 'react-router-dom';

import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";

import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';

export default function JadwalPelajaranAdmin() {
  const [grid, setGrid] = useState(false)
  const [isViewPelajaran, setIsViewPelajaran] = useState(true);
 
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

  const channelList = [
    {
      kelas: 'KELAS 1A',
    },
    {
      kelas: 'KELAS 1B',
    },
    {
      kelas: 'KELAS 2A',
    },
    {
      kelas: 'KELAS 2B',
    },
    {
      kelas: 'KELAS 3A',
    },
    {
      kelas: 'KELAS 3B',
    },
    {
      kelas: 'KELAS 4A',
    },
    {
      kelas: 'KELAS 4B',
    },
  ];

  const ViewPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader
                className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                onBack={() => window.history.back()}
                title="Jadwal Pelajaran"
            />
            <Card className="w-full shadow-md py-0 mb-4">
              <Row>
                <Col span={12}>
                  <Button onClick={() => setIsViewPelajaran(false)} className="mr-2 bg-current" type="primary" shape="round" size='middle'>
                    Tambah Data
                  </Button>
                  <Dropdown overlay={_filterMenu}>
                    <a className="ant-dropdown-link mr-2 font-bold" onClick={e => e.preventDefault()}>
                      Filter by <DownOutlined/>
                    </a>
                  </Dropdown>
                  <Dropdown overlay={_sortMenu}>
                    <a className="ant-dropdown-link font-bold" onClick={e => e.preventDefault()}>
                      Sort by <DownOutlined/>
                    </a>
                  </Dropdown>
                </Col>
                <Col span={12}>
                  <div className="float-right">
                    <Search className="mr-6" placeholder="Cari kata kunci" allowClear
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
            <div className="px-1 py-2 ">
              <div className="row">
                {channelList.map((value, index) => (
                  <div className="col-xl-3 col-lg-4 col-md-4">
                    <Link to={'/admin-jadwal-pelajaran-detail'}>
                      <div
                        className="card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 pt-3 text-center">
                        <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">{value.kelas}</h2>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TambahPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <i onClick={() => setIsViewPelajaran(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                  <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                    Tambah Jadwal Pelajaran
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kelas
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Hari
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Mata Pelajaran
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Guru/Tenaga Pengajar
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Waktu Mulai
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Waktu Selesai
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

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
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          {isViewPelajaran ? <ViewPelajaran/> : <TambahPelajaran/>}
          <Adminfooter/>
        </div>
      </div>
    </Fragment>
  );
}