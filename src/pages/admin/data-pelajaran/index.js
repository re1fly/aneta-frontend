import React, { Fragment, useState } from "react"
import {
  Menu, 
  Card, 
  Row, 
  Col, 
  Button, 
  Dropdown, 
  message, 
  Tag, 
  Space,
  notification,
  Table,
  PageHeader
} from "antd";
import {
  DownOutlined,
  AppstoreOutlined,
  MenuOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from "@ant-design/icons";

import { Link } from 'react-router-dom';

import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload"

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';

export default function DataPelajaranAdmin() {
  const [grid, setGrid] = useState(false)
  const [isViewPelajaran, setIsViewPelajaran] = useState(true);
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

  const _onSearch = value => console.log(value);

  function onChangeTable(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

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

  const CardDataPelajaran = () => {
    const channelList = [
      {
        imageUrl: 'user.png',
        title: 'MATEMATIKA SD5',
        tag1: 'MTK 05',
      },
      {
        imageUrl: 'user.png',
        title: 'BAHASA INDONESIA SD5',
        tag1: 'BI 05',
      },
      {
        imageUrl: 'user.png',
        title: 'PPKN SD5',
        tag1: 'PPKN 05',
      },
      {
        imageUrl: 'user.png',
        title: 'MATEMATIKA SD5',
        tag1: 'MTK 05',
      },
      {
        imageUrl: 'user.png',
        title: 'BAHASA INDONESIA SD5',
        tag1: 'BI 05',
      },
      {
        imageUrl: 'user.png',
        title: 'PPKN SD5',
        tag1: 'PPKN 05',
      },
    ];

    return (
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
              {/* <a
              href=""
              className="position-absolute right-0 mr-4 top-0 mt-4l"
              >
              <i className="ti-more text-grey-500 font-xs"></i>
              </a> */}
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
                    <p className="font-xssss float-left lh-1">Kelas</p>
                  </div>
                  <div className="">
                    <p className="font-xssss float-left lh-1">: 5</p>
                  </div>
                </div>

                <div className="row ml-3">
                  <div className="col-6">
                    <p className="font-xssss float-left lh-1">Tahun Akademik</p>
                  </div>
                  <div className="">
                    <p className="font-xssss float-left lh-1">: 2022</p>
                  </div>
                </div>

                <div className="row ml-3">
                  <div className="col-6">
                      <p className="font-xssss float-left lh-1">Max siswa</p>
                  </div>
                  <div className="">
                    <p className="font-xssss float-left lh-1">: 200</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))};
      </div>
    );
  };

  const TabelDataPelajaran = () => {
    const columns = [
      {
        title: 'No',
        dataIndex: 'no',
        defaultSortOrder: 'ascend',
        responsive: ['sm'],
        // sorter: (a, b) => a.nis - b.nis,
      },
      {
        title: 'Pelajaran',
        dataIndex: 'namaPelajaran',
        filters: [
            {
              text: 'Matematika',
              value: 'Matematika',
            },
            {
              text: 'Bahasa Indonesia',
              value: 'Bahasa Indonesia',
            },
            {
              text: 'Submenu',
              value: 'Submenu',
              children: [
                {
                  text: 'Green',
                  value: 'Green',
                },
                {
                  text: 'Red',
                  value: 'Red',
                },
              ],
            },
          ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.namaKompetensi.indexOf(value) === 0,
        // sorter: (a, b) => a.namaKompetensi.length - b.namaKompetensi.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Kode',
        dataIndex: 'kode',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.semester - b.semester,
      },
      {
        title: 'Kelas',
        dataIndex: 'kelas',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.semester - b.semester,
      },
      {
        title: 'Tahun Akademik',
        dataIndex: 'tahunAkademik',
        defaultSortOrder: 'descend',
      },
      {
        title: 'Max Siswa',
        dataIndex: 'maxSiswa',
        defaultSortOrder: 'descend',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        responsive: ['sm'],
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

    const data = [
      {
        no: '001',
        namaPelajaran: 'Matematika SD5',
        kode: 'MTK 05',
        kelas: '5',
        tahunAkademik: '2020',
        maxSiswa: '200',
        status: ['aktif'],
      },
      {
        no: '002',
        namaPelajaran: 'Bahasa Indonesia SD5',
        kode: 'BI 05',
        kelas: '5',
        tahunAkademik: '2020',
        maxSiswa: '200',
        status: ['aktif'],
      },
      {
        no: '003',
        namaPelajaran: 'PPKN SD5',
        kode: 'PPKN 05',
        kelas: '5',
        tahunAkademik: '2020',
        maxSiswa: '200',
        status: ['aktif'],
      },
      {
        no: '004',
        namaPelajaran: 'Matematika SD5',
        kode: 'MTK 05',
        kelas: '5',
        tahunAkademik: '2020',
        maxSiswa: '200',
        status: ['aktif'],
      },
      {
        no: '005',
        namaPelajaran: 'Bahasa Indonesia SD5',
        kode: 'BI 05',
        kelas: '5',
        tahunAkademik: '2020',
        maxSiswa: '200',
        status: ['aktif'],
      },
      {
        no: '006',
        namaPelajaran: 'PPKN SD5',
        kode: 'PPKN 05',
        kelas: '5',
        tahunAkademik: '2020',
        maxSiswa: '200',
        status: ['aktif'],
      },
    ];

    return(
      <Table className=""
              columns={columns}
              dataSource={data}
              onChange={onChangeTable}
              pagination={{position: ['bottomCenter']}}
              rowClassName="bg-greylight text-grey-900"
              scroll={{x:400}}/>
    );
  };

  const ViewPelajaran = () => {
    return(
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
          <PageHeader
                      className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                      onBack={() => window.history.back()}
                      title="Data Pelajaran"
          />
          <Card className="shadow-md mb-4">
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
            <div className="d-flex">
              <div className="mt-1">
                <h5 className="fw-600 mb-1">
                  Tahun Akademik
                </h5>
                <input
                type="text"
                className="form-control w-100"
                />
              </div>
              <div className="mt-1 ml-3">
                <h5 className="fw-600 mb-1">
                  Kelas
                </h5>
                <input
                type="text"
                className="form-control w-100 mb-3"
                />
              </div>
            </div>
            {grid ? <TabelDataPelajaran/> : <CardDataPelajaran/>}
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
                    Tambah Pelajaran
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 text-center">
                      <figure className="avatar mr-auto mb-4 mt-2 w100">
                        <Card style={{width: 200}}>
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
                      </figure>
                    </div>
                  </div>

                  <form action="#">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Nama Pelajaran
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kode
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>

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
                            Max Siswa
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
          {isViewPelajaran ? <ViewPelajaran/> : <TambahPelajaran/> }
          <Adminfooter/>
        </div>
      </div>
    </Fragment>
  );
};