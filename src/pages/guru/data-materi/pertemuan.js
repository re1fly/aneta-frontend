import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Adminfooter from "../../../components/Adminfooter";
import {
  Button,
  Card,
  Col,
  Dropdown,
  notification,
  PageHeader,
  Row,
  Space,
  Table,
} from "antd";
import {
  AppstoreOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  MenuOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  url_by_institute,
  role_guru_create_data_pertemuan_materi,
  global_join_sub_where_get,
  get_where_no_join,
  role_guru_get_matpel,
  role_guru_get_sub_class,
  global_update, role_guru_create_pertemuan,
} from "../../../api/reference";

import axios from "axios";
import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import { FormCreatePertemuanMateri } from "../../../components/form/GuruPertemuanMateri";
import { pageLoad } from "../../../components/misc/loadPage";
import Swal from "sweetalert2";
import { dateNow } from "../../../components/misc/date";

const GuruPertemuan = () => {
  const [grid, setGrid] = useState(false);
  const [dataPertemuan, setDataPertemuan] = useState([]);
  const [isViewPertemuan, setIsViewPertemuan] = useState(true);
  const [isViewEdit, setIsViewEdit] = useState(false);
  const [isViewCreate, setIsViewCreate] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshState, setRefreshState] = useState(false);

  const [getKelas, setGetKelas] = useState(null);
  const [dataMapel, setDataMapel] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMapel, setSelectedMapel] = useState(null);

  const [btnPagination, setBtnPagination] = useState([]);
  const [paramsPage, setParamsPage] = useState("1");

  const userId = localStorage.getItem("user_id");
  const academic_year_id = localStorage.getItem("academic_year");
  const institute = localStorage.getItem("institute");

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const _getDataKelas = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: role_guru_get_sub_class,
          returnVariables: true,
          variables: [
            {
              name: "get_sub_kelas_guru",
              type: "json",
              value: {
                user_id: userId,
              },
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
        const data = JSON.parse(response.data.variables[2].value);
        setGetKelas(data?.data);
      });
  };
  const _getDataMapel = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: role_guru_get_matpel,
          returnVariables: true,
          variables: [
            {
              name: "update_jadwal_pelajaran",
              type: "json",
              value: {
                user_id: userId,
                id_class: selectedClass,
              },
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
        const dataMapelApi = JSON.parse(response.data.variables[2].value);
        const getMapel = dataMapelApi?.data;
        setDataMapel(getMapel);
      });
  };

  const deletePertemuan = (record) => {
    console.log(record.namaPertemuan);
    Swal.fire({
      title: "Apakah anda yakin menghapus data?",
      text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batalkan",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            url_by_institute,
            {
              processDefinitionId:
                "GlobalUpdateRecord:2:184b8903-2ccb-11ed-aacc-9a44706f3589",
              returnVariables: true,
              variables: [
                {
                  name: "global_updatedata",
                  type: "json",
                  value: {
                    tbl_name:
                      "x_academic_subjects_schedule_contents_meetingModel",
                    id: record.id,
                    tbl_coloumn: {
                      deleted_at: dateNow,
                    },
                  },
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
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            const code = dataRes.status;
            if (code == "success") {
              getListPertemuan();
              Swal.fire(
                "Data telah terhapus!",
                "Menghapus data pertemuan " + record.namaPertemuan,
                "success"
              );
            } else {
              Swal.fire("Data not found!", "Error");
            }
          });
      }
    });
  };

  const getListPertemuan = () => {
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
                tbl_induk: "x_academic_subjects_schedule_contents_meeting",
                select: [
                  "x_academic_subjects_schedule_contents_meeting.id",
                  "x_academic_subjects_schedule_contents_meeting.meeting_name",
                  "x_academic_subjects_schedule_date.date",
                  "x_academic_subjects_schedule_time.time_start",
                  "x_academic_subjects_schedule_time.time_end",
                  "x_academic_subjects_schedule_contents.tittle",
                  "r_class_type.class_type",
                  "x_academic_class.sub_class",
                  "x_academic_subjects_schedule_contents_files.file_name"
                ],
                paginate: 10,

                join: [
                  {
                    tbl_join: "x_academic_subjects_schedule_contents_files",
                    refkey: "subjects_schedule_contents_id",
                    tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                    foregenkey: "id",
                  },
                  {
                    tbl_join: "x_academic_subjects_schedule_date",
                    refkey: "id",
                    tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                    foregenkey: "schedule_date_id",
                  },
                  {
                    tbl_join: "x_academic_subjects_schedule_time",
                    refkey: "id",
                    tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                    foregenkey: "schedule_time_id",
                  },
                  {
                    tbl_join: "x_academic_subjects_schedule_contents",
                    refkey: "id",
                    tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                    foregenkey: "contents_id",
                  },
                  {
                    tbl_join: "x_academic_class",
                    refkey: "id",
                    tbl_join2: "x_academic_subjects_schedule_contents",
                    foregenkey: "class_id",
                  },
                  {
                    tbl_join: "r_class_type",
                    refkey: "id",
                    tbl_join2: "x_academic_class",
                    foregenkey: "class",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "x_academic_subjects_schedule_contents",
                    tbl_field: "subjects_content_type_id",
                    tbl_value: "1",
                    operator: "=",
                  },
                  {
                    tbl_coloumn: "x_academic_subjects_schedule_contents",
                    tbl_field: "created_by",
                    tbl_value: userId,
                    operator: "=",
                  },
                  {
                    tbl_coloumn: "x_academic_subjects_schedule_contents",
                    tbl_field: "deleted_at",
                    tbl_value: "",
                    operator: "=",
                  },
                  {
                    tbl_coloumn:
                      "x_academic_subjects_schedule_contents_meeting",
                    tbl_field: "deleted_at",
                    tbl_value: "",
                    operator: "=",
                  },
                  {
                    tbl_coloumn: "x_academic_subjects_schedule_contents",
                    tbl_field: "academic_year_id",
                    tbl_value: academic_year_id,
                    operator: "=",
                  },
                ],
                order_coloumn:
                  "x_academic_subjects_schedule_contents_meeting.updated_at",
                order_by: "desc",
              },
            },
            {
              name: "page",
              type: "string",
              value: paramsPage,
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
        const dataRes = JSON.parse(response?.data?.variables[3]?.value);
        setDataPertemuan(dataRes?.data?.data);
        const pagination = dataRes?.data?.links;
        setBtnPagination(pagination);
      });
  }

  useEffect(() => {
    _getDataKelas();
    _getDataMapel();
    getListPertemuan();

  }, [userId, paramsPage, selectedClass]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      defaultSortOrder: "ascend",
      responsive: ["sm"],
    },
    {
      title: "Kelas",
      dataIndex: "kelas",
      align: "center",
    },
    {
      title: "Nama Materi",
      dataIndex: "namaMateri",
    },
    {
      title: "Nama Pertemuan",
      dataIndex: "namaPertemuan",
      align: "center",
    },
    {
      title: "Tanggal Pertemuan",
      dataIndex: "tanggalPertemuan",
      align: "center",
    },
    {
      title: "Jam",
      dataIndex: "jam",
      align: "center",
    },
    {
      title: "Aksi",
      key: "action",
      responsive: ["sm"],
      render: (text, record) => (
        <Space size="middle">
          {/* <Link to="/guru-data-materi-detail">
                        <EyeOutlined style={{ color: "black" }} />
                    </Link> */}
          <EyeOutlined
            style={{ color: "black" }}
            onClick={() => viewDetailPertemuan(record)}
          />
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => viewEditPertemuan(record)}
          />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => deletePertemuan(record)}
          />
        </Space>
      ),
    },
  ];

  const data = dataPertemuan.map((data, index) => {
    return {
      no: index + 1,
      id: data.id,
      namaMateri: data.tittle,
      namaPertemuan: data.meeting_name,
      kelas: `${data.class_type} / ${data.sub_class}`,
      tanggalPertemuan: data.date,
      jam: `${data.time_start} - ${data.time_end}`,
      embed: data.file_name
    };
  });

  function onChangeTable(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const _onSearch = (value) => console.log(value);

  const ViewPertemuan = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row mb-3">
          <div className="col-lg-12">
            <PageHeader
              className="site-page-header card bg-lightblue text-grey-900 fw-700 "
              onClick={() => window.history.back()}
              title="Data Pertemuan"
            />
          </div>
        </div>
        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
          <Row>
            <Col span={12}>
              <Button
                className="mr-4"
                type="primary"
                shape="round"
                size="middle"
                onClick={viewCreatePertemuan}
              >
                Tambah Data
              </Button>
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
                <Search
                  className="mr-5"
                  placeholder="Cari kata kunci"
                  allowClear
                  onSearch={_onSearch}
                  style={{ width: 250, lineHeight: "20px" }}
                />
                {/* {grid == false ?
                                    <a>
                                        <AppstoreOutlined style={{ fontSize: '30px' }}
                                            onClick={() => setGrid(true)} />
                                    </a> :
                                    <a>
                                        <MenuOutlined style={{ fontSize: '30px' }}
                                            onClick={() => setGrid(false)} />
                                    </a>} */}
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
                onChange={(e) => setSelectedClass(e.target.value)}
                value={selectedClass}
              >
                <option value="" selected disabled>
                  Pilih Kelas
                </option>
                {getKelas?.map((data) => (
                  <option value={data.id}>
                    {data.class_type} - {data.sub_class}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-lg-3 mb-3">
            <div className="form-group">
              <select
                className="form-control"
                aria-label="Default"
                name="pilih_mataPelajaran"
                onChange={(e) => setSelectedMapel(e.target.value)}
                value={selectedMapel}
              >
                <option value="" selected disabled>
                  Pilih Mata Pelajaran
                </option>
                {dataMapel == null
                  ? null
                  : dataMapel?.map((data) => (
                    <option value={data.id}>{data.nama_mata}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <Table
          className=""
          columns={columns}
          dataSource={data}
          onChange={onChangeTable}
          pagination={false}
          rowClassName="bg-greylight text-grey-900"
        />
        <div className="text-center mt-4">
          {btnPagination?.map((dataBtn) => {
            const labelBtn = dataBtn.label;
            const label = labelBtn
              .replace(/(&laquo\;)/g, "")
              .replace(/(&raquo\;)/g, "");
            let linkUrl = dataBtn.url;

            if (linkUrl != null) {
              linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
            }

            return (
              <Button
                className="btn btn-primary mr-2 font-xssss fw-600"
                disabled={linkUrl == null ? true : false}
                onClick={() => {
                  setParamsPage(linkUrl);
                }}
              >
                {label}
              </Button>
            );
          })}
        </div>
        <Adminfooter />
      </div>
    );
  };

  const CreatePertemuan = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    const idJam = data.jam_pertemuan?.split(",")?.map(Number);
    const idKompetensi = data.id_kompetensi?.split(",")?.map(Number) < 1 ? null : data.id_kompetensi?.split(",")?.map(Number);
    const idMateri = data.nama_materi.split(",")[0]
    const iFrame = data.embed_materi;
    const id = iFrame?.split("id=")[1];
    const id_content_wp = id?.split('" width=')[0];


    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: role_guru_create_pertemuan,
          returnVariables: true,
          variables: [
            {
              name: "data",
              type: "json",
              value: {
                id_content: idMateri,
                nama_pertemuan: data.nama_pertemuan,
                id_date: data.tanggal_pertemuan,
                id_jam: idJam,
                embed_materi: data.embed_materi,
                id_content_wp: id_content_wp,
                id_kompetensi: idKompetensi,
              },
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
        console.log("Insert :", response);
        const valueRes = response.data.variables[2].value;
        const valueResObj = JSON.parse(valueRes);
        if (valueResObj.message == "success insert") {
          setIsViewCreate(false);
          setIsViewPertemuan(true);
          setRefreshState(true);
          getListPertemuan();
          localStorage.removeItem("idJam");
          notification.success({
            message: "Sukses",
            description: "Data Pertemuan berhasil ditambahkan.",
            placement: "top",
          });
        } else {
          notification.error({
            message: "Error",
            description: "Harap isi semua field",
            placement: "top",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditPertemuan = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    // const dateNow = new Date().toLocaleString()
    console.log(data);

    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: global_update,
          returnVariables: true,
          variables: [
            {
              name: "global_updatedata",
              type: "json",
              value: {
                tbl_name: "x_academic_subjects_schedule_contents_meetingModel",
                id: selectedUser.id,
                tbl_coloumn: {
                  meeting_name: data.nama_pertemuan,
                },
              },
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
        // console.log("Update :", response);
        const valueRes = response.data.variables[2].value;
        const valueResObj = JSON.parse(valueRes);
        if (valueResObj.message == "succes update data") {
          setIsViewCreate(false);
          setIsViewPertemuan(true);
          setRefreshState(true);
          getListPertemuan();
          notification.success({
            message: "Sukses",
            description: "Pertemuan berhasil diupdate.",
            placement: "top",
          });
        } else {
          notification.error({
            message: "Error",
            description: "Harap isi semua field",
            placement: "top",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewCreatePertemuan = () => {
    setIsViewCreate(true);
    setIsViewPertemuan(false);
    setIsViewEdit(false);
    setIsViewDetail(false);
  };

  const viewEditPertemuan = (record) => {
    setSelectedUser(record);
    setIsViewEdit(true);
    setIsViewCreate(false);
    setIsViewPertemuan(false);
    setIsViewDetail(false);
  };

  const viewDetailPertemuan = (record) => {
    setSelectedUser(record);
    setIsViewCreate(false);
    setIsViewPertemuan(false);
    setIsViewEdit(false);
    setIsViewDetail(true);
  };

  const FormCreate = () => {
    return (
      <FormCreatePertemuanMateri
        setView={() => setIsViewPertemuan(true)}
        title="Tambah Data Pertemuan"
        submit={CreatePertemuan}
        isDisabled={false}
        form="Materi"
      />
    );
  };

  const FormEdit = () => {
    return (
      <FormCreatePertemuanMateri
        setView={() => setIsViewPertemuan(true)}
        title="Edit Data Pertemuan"
        submit={EditPertemuan}
        embed={selectedUser.embed}
        isDisabled={true}
        titleDisable={false}
        disabledButton={false}
        namaMateri={selectedUser.namaMateri}
        namaPertemuan={selectedUser.namaPertemuan}
        tanggalPertemuan={selectedUser.tanggalPertemuan}
        jam={selectedUser.jam}
      />
    );
  };

  const FormDetail = () => {
    return (
      <FormCreatePertemuanMateri
        setView={() => setIsViewPertemuan(true)}
        title="View Data Pertemuan"
        isDisabled={true}
        titleDisable={true}
        disabledButton={true}
        namaMateri={selectedUser.namaMateri}
        namaPertemuan={selectedUser.namaPertemuan}
        tanggalPertemuan={selectedUser.tanggalPertemuan}
        jam={selectedUser.jam}
        embed={selectedUser.embed}
      />
    );
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          {isViewPertemuan ? (
            <ViewPertemuan />
          ) : isViewCreate ? (
            <FormCreate />
          ) : isViewEdit ? (
            <FormEdit />
          ) : isViewDetail ? (
            <FormDetail />
          ) : (
            <ViewPertemuan />
          )}
          {/* {isViewPertemuan ? <ViewMateri /> : <TambahMateri />} */}
        </div>
      </div>
    </Fragment>
  );
};

export default GuruPertemuan;
