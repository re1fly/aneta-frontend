import React, { Fragment, useEffect, useState } from "react";
import Adminfooter from "../../components/Adminfooter";
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
  Table,
} from "antd";
import {
  AppstoreOutlined,
  DownOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "react-router-dom/es/Link";
import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
import Filter from "../../components/Filter";

import {
  global_join_sub_where_get,
  url_by_institute,
} from "../../api/reference";

function DataAnakOrangtua() {
  const [grid, setGrid] = useState(true);
  const [isViewSiswa, setIsViewSiswa] = useState(true);
  const [isViewFormSiswa, setIsViewFormSiswa] = useState(true);
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const [getDataAnak, setGetDataAnak] = useState([]);
  console.log(getDataAnak);

  const userId = localStorage.getItem("user_id");

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
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

  const _onSelectMenu = ({ key }) => {
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

  const _onSearch = (value) => console.log(value);

  const columns = [
    {
      title: "NISN",
      dataIndex: "nisn",
      defaultSortOrder: "ascend",
      // sorter: (a, b) => a.nis - b.nis,
    },
    {
      title: "Name",
      dataIndex: "namaAnak",
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tanggalLahirAnak",
      defaultSortOrder: "descend",
    },
    {
      title: "Email",
      dataIndex: "emailAnak",
      defaultSortOrder: "descend",
    },
    {
      title: "Phone",
      dataIndex: "noHpAnak",
      defaultSortOrder: "descend",
    },
    {
      title: "Status",
      dataIndex: "status",
      responsive: ["sm"],
      render: (status) => (
        <>
          {status.map((status) => {
            let color = status.length > 5 ? "red" : "green";
            return (
              <Tag style={{ borderRadius: "15px" }} color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: [
        {
          text: "Aktif",
          value: "aktif",
        },
        {
          text: "Nonaktif",
          value: "nonAktif",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];

  const channelList = getDataAnak?.map((data, index) => {
    return {
      no: index + 1,
      imageUrl: "user.png",
      namaAnak: data.name,
      nisn: data.nisn,
      emailAnak: data.email,
      tanggalLahirAnak: data.date_of_birth,
      noHpAnak: data.mobile_phone,
      status: [],
    };
  });

  function onChangeTable(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  useEffect(() => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: global_join_sub_where_get,
          returnVariables: true,
          variables: [
            {
              name: "global_join_where_sub",
              type: "json",
              value: {
                tbl_induk: "x_user_parent",
                select: [
                  "users.name",
                  "m_user_profile.nisn",
                  "m_user_profile.date_of_birth",
                  "users.email",
                  "m_user_profile.mobile_phone",
                ],
                paginate: 10,
                join: [
                  {
                    tbl_join: "users",
                    refkey: "id",
                    tbl_join2: "x_user_parent",
                    foregenkey: "user_id",
                  },
                  {
                    tbl_join: "m_user_profile",
                    refkey: "user_id",
                    tbl_join2: "users",
                    foregenkey: "id",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "x_user_parent",
                    tbl_field: "parent_id",
                    tbl_value: userId,
                    operator: "=",
                  },
                ],
                order_coloumn: "users.name",
                order_by: "asc",
              },
            },
            {
              name: "page",
              type: "string",
              value: "1",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic YWRtaW46TWFuYWczciE=",
          },
        }
      )
      .then(function (response) {
        const dataRes = JSON.parse(response?.data?.variables[3].value);
        setGetDataAnak(dataRes?.data?.data);
      });
  }, []);

  const CardDataSiswa = () => (
    <div className="middle-sidebar-left mt-3">
      <div className="row">
        {channelList.map((value, index) => (
          <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
            <div className="card mb-4 d-block w-100 shadow-md rounded-lg p-4 border-0 text-center">
              <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                Aktif
              </span>

              <a
                href="/default-channel"
                className="btn-round-xxxl mt-3 rounded-lg bg-lightblue ml-auto mr-auto"
              >
                <img
                  src={`assets/images/${value.imageUrl}`}
                  alt="icon"
                  className="p-1 w-100"
                />
              </a>
              <h4 className="fw-700 font-xs mt-3 mb-3">{value.namaAnak}</h4>
              <div className="clearfix"></div>
              {value.tag1 ? (
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                  {value.tag1}
                </span>
              ) : (
                ""
              )}
              {value.tag2 ? (
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                  {value.tag2}
                </span>
              ) : (
                ""
              )}
              {value.tag3 ? (
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-1">
                  {value.tag3}
                </span>
              ) : (
                ""
              )}
              <div className="clearfix"></div>
              <div className="mt-4 mx-auto">
                <div className="row ml-3">
                  <div className="col-3">
                    <p className="font-xssss float-left lh-1">NISN</p>
                  </div>
                  <div className="col-9">
                    <p className="font-xssss float-left lh-1">: {value.nisn}</p>
                  </div>
                </div>

                <div className="row ml-3">
                  <div className="col-3">
                    <p className="font-xssss float-left lh-1">TTL</p>
                  </div>
                  <div className="col-9">
                    <p className="font-xssss float-left lh-1">
                      : {value.tanggalLahirAnak}
                    </p>
                  </div>
                </div>

                <div className="row ml-3">
                  <div className="col-3">
                    <p className="font-xssss float-left lh-1">Email</p>
                  </div>
                  <div className="col-9">
                    <p className="font-xssss float-left lh-1">
                      : {value.emailAnak}
                    </p>
                  </div>
                </div>
                <div className="row ml-3">
                  <div className="col-3">
                    <p className="font-xssss float-left lh-1">Phone</p>
                  </div>
                  <div className="col-9">
                    <p className="font-xssss float-left lh-1">
                      : {value.noHpAnak}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TableDataSiswa = () => (
    <Table
      className="mt-4"
      columns={columns}
      dataSource={channelList}
      onChange={onChangeTable}
      pagination={{ position: ["bottomCenter"] }}
      rowClassName="bg-greylight text-grey-900"
      scroll={{ x: 400 }}
    />
  );

  const ViewSiswa = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row mb-3">
          <div className="col-lg-12">
            <PageHeader
              className="site-page-header card bg-lightblue text-grey-900 fw-700 "
              onBack={() => window.history.back()}
              title="Data Anak"
            />
          </div>
        </div>
        <Card className="card bg-lightblue border-0 text-grey-900">
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <div className="float-right">
                <Search
                  className="mr-5"
                  placeholder="Cari kata kunci"
                  allowClear
                  onSearch={_onSearch}
                  style={{ width: 250, lineHeight: "20px" }}
                />
                {grid == false ? (
                  <a>
                    <AppstoreOutlined
                      style={{ fontSize: "30px" }}
                      onClick={() => setGrid(true)}
                    />
                  </a>
                ) : (
                  <a>
                    <MenuOutlined
                      style={{ fontSize: "30px" }}
                      onClick={() => setGrid(false)}
                    />
                  </a>
                )}
              </div>
            </Col>
          </Row>
        </Card>

        {grid ? <CardDataSiswa /> : <TableDataSiswa />}
      </div>
    );
  };

  const DataFormSiswa = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <i
                    onClick={() => setIsViewSiswa(true)}
                    className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"
                  ></i>
                  <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                    Tambah Data Siswa
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <div className="row">
                    <div className="col-lg-12 mb-5">
                      <div className="d-flex justify-content-center">
                        <Card className="bg-lightblue" style={{ width: 157 }}>
                          <ImgCrop rotate>
                            <Upload
                              className="avatar-uploader"
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              listType="picture-card"
                              fileList={fileList}
                              onChange={onChange}
                              onPreview={onPreview}
                            >
                              {fileList.length < 1 && <PlusOutlined />}
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
                          <input type="number" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Nama Siswa
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Tempat Lahir
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Tanggal Lahir
                          </label>
                          <input type="date" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Email
                          </label>
                          <input type="email" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            No. HP
                          </label>
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Alamat
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Provinsi
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kecamatan
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kelurahan
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <a
                          className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
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
    );
  };

  const DataFormOrangtua = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <i
                    onClick={() => setIsViewSiswa(true)}
                    className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"
                  ></i>
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
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Email
                          </label>
                          <input type="email" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Tempat Lahir
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Tanggal Lahir
                          </label>
                          <input type="date" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Email
                          </label>
                          <input type="email" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            No. HP
                          </label>
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Alamat
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Provinsi
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kecamatan
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kelurahan
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <a
                          className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          onClick={() => alert("saved")}
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
    );
  };

  const TambahSiswa = () => {
    return <>{isViewFormSiswa ? <DataFormSiswa /> : <DataFormOrangtua />}</>;
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          {isViewSiswa ? <ViewSiswa /> : <TambahSiswa />}
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}

export default DataAnakOrangtua;
