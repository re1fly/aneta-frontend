import React, { Fragment, useState } from "react"

import { 
    Menu,
    Card,
    Row,
    Col,
    Button,
    Dropdown,
    message,
    Calendar,
    Table,
    Space,
    notification,
    PageHeader
} from "antd";
import { 
    DownOutlined,
    AppstoreOutlined,
    MenuOutlined,
    DeleteOutlined,
    EditOutlined,
    CalendarOutlined,
    TableOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import { Link } from 'react-router-dom';

import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';

export default function JadwalPelajaranAdminDetail() {
  const [grid, setGrid] = useState(false);
  const [calendar, setCalendar] = useState(true);
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

  const CalendarData = () => {
    return(
      <Calendar className=""/>
    );
  }

  const TableJadwalPelajaran = () => {
    const columns = [
      {
        title: 'Mata Pelajaran',
        dataIndex: 'namaPelajaran',
        align: 'center',
        filters: [
          {
            text: 'Tematik 1',
            value: 'Tematik 1',
          },
          {
            text: 'Tematik 2',
            value: 'Tematik 2',
          },
        ],
        // onFilter: (value, record) => record.namaPelajaran.indexOf(value) === 0,
        // sorter: (a, b) => a.namaPelajaran.length - b.namaPelajaran.length,
      },
      {
        title: 'Guru/Tenaga Pengajar',
        dataIndex: 'namaPengajar',
        align: 'center',
        filters: [
          {
            text: 'Sri Wahyuni S.pd',
            value: 'Sri Wahyuni S.pd',
          },
          {
            text: 'Siti Mulyani S.pd',
            value: 'Siti Mulyani S.pd',
          },
        ],
        // onFilter: (value, record) => record.namaPengajar.indexOf(value) === 0,
        // sorter: (a, b) => a.namaPengajar.length - b.namaPengajar.length,
      },
      {
        title: 'Waktu Mulai - Waktu Selesai',
        dataIndex: 'waktu',
        align: 'center'
      },
      {
        title: 'Aksi',
        key: 'action',
        align: 'center',
        responsive: ['sm'],
        render: (text, record) => (
          <Space size="middle">
            <EditOutlined style={{color: "blue"}} onClick={() => notification.open({
              message: 'Edit',
              description:
                'Edit user bernama ' + record.namaPelajaran,
              duration: 2

            })}/>
            <DeleteOutlined style={{color: 'red'}} onClick={() => notification.open({
              message: 'Delete',
              description:
                'Hapus user bernama ' + record.namaPelajaran,
              duration: 2
            })}/>
          </Space>
        ),
      },
    ];

    const data = [
      {
        namaPelajaran: 'Tematik 1',
        namaPengajar: 'Sri Wahyuni S.pd',
        waktu: '07.30 - 08.30',
      },
      {
        namaPelajaran: 'Tematik 2',
        namaPengajar: 'Siti Mulyani S.pd',
        waktu: '08.30 - 09.30',
      },
      {
        namaPelajaran: ' ',
        namaPengajar: ' ',
        waktu: ' ',
      },
      {
        namaPelajaran: ' ',
        namaPengajar: ' ',
        waktu: ' ',
      },
    ];

    function onChangeTable(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }

    return (
      <>
        <div className="mt-2">
          <div className="bg-grey">
          <p className="strong text-black pl-4 mb-0">SENIN</p>
          </div>
        </div>
        <Table className=""
                columns={columns}
                dataSource={data}
                onChange={onChangeTable}
                pagination={{position: ['none']}}
                rowClassName="bg-greylight text-grey-900"
                scroll={{x:400}}/>
        <div className="mt-4">
          <div className="bg-grey">
            <p className="strong text-black pl-4 mb-0">SELASA</p>
          </div>
        </div>
        <Table className=""
                columns={columns}
                dataSource={data}
                onChange={onChangeTable}
                pagination={{position: ['none']}}
                rowClassName="bg-greylight text-grey-900"
                scroll={{x:400}}/>
        <div className="mt-4">
          <div className="bg-grey">
            <p className="strong text-black pl-4 mb-0">RABU</p>
          </div>
        </div>
        <Table className=""
                columns={columns}
                dataSource={data}
                onChange={onChangeTable}
                pagination={{position: ['none']}}
                rowClassName="bg-greylight text-grey-900"
                scroll={{x:400}}/>
      </>
    );
  };

  const CardJadwalPelajaran = () => {
    const _onSelectMenu = ({key}) => {
      message.info(`Click on item ${key}`);
    };

    const _Account = (
      <Menu onClick={_onSelectMenu}>
        <Menu.Item key="1">Ubah</Menu.Item>
        <Menu.Item key="2">Hapus</Menu.Item>
      </Menu>
    );

    const channelList = [
      {
        imageUrl: 'user.png',
        title: 'Pengetahuan 1',
        tag1: 'Kelas 1',
        tag2: 'Semester II'
      },
      {
        imageUrl: 'user.png',
        title: 'Pengetahuan 2',
        tag1: 'kelas 1',
        tag2: 'Semester II'
      },
      {
        imageUrl: 'user.png',
        title: 'Pengetahuan 3',
        tag1: 'kelas 1',
        tag2: 'Semester II'
      },
      {
        imageUrl: 'user.png',
        title: 'Pengetahuan 1',
        tag1: 'Kelas 1',
        tag2: 'Semester II'
      },
      {
        imageUrl: 'user.png',
        title: 'Pengetahuan 2',
        tag1: 'kelas 1',
        tag2: 'Semester II'
      },
      {
        imageUrl: 'user.png',
        title: 'Pengetahuan 3',
        tag1: 'kelas 1',
        tag2: 'Semester II'
      },
    ];

    return (
      <div className="row px-3">
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
              <a
              href=""
              className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4"
              >
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
                    <p className="font-xssss float-left lh-1">Kode</p>
                  </div>
                  <div className="">
                    <p className="font-xssss float-left lh-1">: 3.1</p>
                  </div>
                </div>

                <div className="row ml-3">
                  <div className="col-6">
                    <p className="font-xssss float-left lh-1">Kompetensi Dasar</p>
                  </div>
                  <div className="">
                    <p className="font-xssss float-left lh-1">: Mengenal Vocal</p>
                  </div>
                </div>

                <div className="row ml-3">
                  <div className="col-6">
                    <p className="font-xssss float-left lh-1">Keterangan</p>
                  </div>
                  <div className="">
                    <p className="font-xssss float-left lh-1">: Mengetahui Huruf</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ViewPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="flex-wrap">
              <PageHeader
                className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                onBack={() => window.history.back()}
                title="Jadwal Pelajaran"
              />
              <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                <div className="row">
                  <div className="col-lg-8 col-md-6 my-2">
                    <Button className="mr-4" type="primary" shape="round" size='middle'
                            onClick={() => setIsViewPelajaran(false)}>
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
            </div>
            <div className="py-2">
              {calendar == false ?
              <h5  onClick={() => setCalendar(true)}
                  className='align-items-center d-flex justify-content-end cursor-pointer'>
                      <TableOutlined style={{fontSize: '22px'}}/>
                      <p className="font-weight-bolder ml-2 mb-0">Tampilkan Mode Tabel</p>
              </h5> :
              <h5 onClick={() => setCalendar(false)}
                  className='align-items-center d-flex justify-content-end cursor-pointer'>
                    <CalendarOutlined style={{fontSize: '20px'}}/>
                    <p className="font-weight-bolder ml-2 mb-0">Tampilkan Mode Kalender</p>
              </h5>}
            </div>
            {calendar ? <TableJadwalPelajaran/> : <CalendarData/>}
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
};