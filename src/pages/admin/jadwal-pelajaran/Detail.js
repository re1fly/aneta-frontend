import React, { Fragment, useEffect, useState } from "react"

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
  PageHeader,
  TimePicker,
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
  EyeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Search from "antd/es/input/Search";
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import Filter from "../../../components/Filter";
import axios from "axios";
import { BASE_URL } from "../../../api/Url";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pageLoad } from "../../../components/misc/loadPage";

export default function JadwalPelajaranAdminDetail() {
  const [grid, setGrid] = useState(false);
  const [calendar, setCalendar] = useState(true);
  const [isViewPelajaran, setIsViewPelajaran] = useState(true);
  const [getJadwalPelajaran, setGetJadwalPelajaran] = useState()
  const [mataPelajaran, setGetMataPelajaran] = useState()
  const [getGuru, setGetGuru] = useState([]);
  const [refreshState, setRefreshState] = useState(false)

  const academicYear = localStorage.getItem('academic_year')

  const senin = getJadwalPelajaran?.filter((data) => {
    return data.hari === "senin"
  })

  const selasa = getJadwalPelajaran?.filter((data) => {
    return data.hari === "selasa"
  })

  const rabu = getJadwalPelajaran?.filter((data) => {
    return data.hari === "rabu"
  })

  const kamis = getJadwalPelajaran?.filter((data) => {
    return data.hari === "kamis"
  })

  const jumat = getJadwalPelajaran?.filter((data) => {
    return data.hari === "jumat"
  })

  const sabtu = getJadwalPelajaran?.filter((data) => {
    return data.hari === "sabtu"
  })

  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  const _onSearch = value => console.log(value);

  const ClassReducer = useSelector(state => state.dataKelas)
  const idSubClass = ClassReducer.SubClass.id_class

  useEffect(() => {
    // if (ClassReducer.AllClass.length === 0) {
    //   window.history.back()
    // }
    axios.post(BASE_URL,
      {
        "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
        "returnVariables": true,
        "variables": [
          {
            "name": "global_join_where_sub",
            "type": "json",
            "value": {
              "tbl_induk": "x_academic_subjects_schedule",
              "select": [
                "x_academic_subjects_schedule.hari",
                "x_academic_subjects_schedule.time_start",
                "x_academic_subjects_schedule.time_end",
                "x_academic_subject_master.nama_mata",
                "users.name",
                "x_academic_subjects_schedule.id as id_shedule",
                "x_academic_subjects.id as id_subjects",
                "x_academic_teachers.id as id_teacher",
                "x_academic_class.class"
              ],
              "paginate": 10,
              "join": [
                {
                  "tbl_join": "x_academic_subjects",
                  "refkey": "id",
                  "tbl_join2": "x_academic_subjects_schedule",
                  "foregenkey": "academic_subjects_id"
                },
                {
                  "tbl_join": "x_academic_subject_master",
                  "refkey": "id",
                  "tbl_join2": "x_academic_subjects",
                  "foregenkey": "academic_subjects_master_id"
                },
                {
                  "tbl_join": "x_academic_class",
                  "refkey": "id",
                  "tbl_join2": "x_academic_subjects",
                  "foregenkey": "course_grade_id"
                },
                {
                  "tbl_join": "x_academic_teachers",
                  "refkey": "id",
                  "tbl_join2": "x_academic_subjects_schedule",
                  "foregenkey": "teachers_id"
                },
                {
                  "tbl_join": "users",
                  "refkey": "id",
                  "tbl_join2": "x_academic_teachers",
                  "foregenkey": "user_id"
                }
              ],
              "where": [
                {
                  "tbl_coloumn": "x_academic_subjects",
                  "tbl_field": "academic_year_id",
                  "tbl_value": academicYear,
                  "operator": "="
                },
                {
                  "tbl_coloumn": "x_academic_subjects",
                  "tbl_field": "course_grade_id",
                  "tbl_value": idSubClass,
                  "operator": "="
                }, {
                  "tbl_coloumn": "x_academic_subjects_schedule",
                  "tbl_field": "deleted_at",
                  "tbl_value": "",
                  "operator": "="
                }
              ],
              "order_coloumn": "x_academic_subjects_schedule.id",
              "order_by": "asc"
            }
          },
          {
            "name": "page",
            "type": "string",
            "value": "1"
          }
        ]
      }, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(function (response) {
      // console.log(response);
      const dataRes = JSON.parse(response?.data?.variables[3]?.value);
      // console.log(JSON.stringify(dataRes, null, 2));
      const pelajaran = dataRes?.data?.data
      setGetJadwalPelajaran(pelajaran);
    })

    axios.post(BASE_URL,
      {
        "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
        "returnVariables": true,
        "variables": [
          {
            "name": "global_join_where_sub",
            "type": "json",
            "value": {
              "tbl_induk": "x_academic_teachers",
              "select": [
                "users.name",
                "x_academic_teachers.id as id_guru"

              ],
              "paginate": 1000,
              "join": [
                {
                  "tbl_join": "users",
                  "refkey": "id",
                  "tbl_join2": "x_academic_teachers",
                  "foregenkey": "user_id"
                }
              ],
              "where": [
                {
                  "tbl_coloumn": "x_academic_teachers",
                  "tbl_field": "academic_year_id",
                  "tbl_value": academicYear,
                  "operator": "="
                }
              ],
              "order_coloumn": "users.name",
              "order_by": "asc"
            }
          },
          {
            "name": "page",
            "type": "string",
            "value": "1"
          }
        ]
      }
    ).then(function (response) {
      const guru = JSON.parse(response?.data?.variables[3]?.value)
      setGetGuru(guru?.data?.data)
    })
  }, [academicYear, refreshState, , academicYear])

  useEffect(() => {
    axios.post(BASE_URL,
      {
        "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
        "returnVariables": true,
        "variables": [
          {
            "name": "global_join_where_sub",
            "type": "json",
            "value": {
              "tbl_induk": "x_academic_subjects",
              "select": [
                "x_academic_subjects.id as id_subjects",
                "x_academic_subject_master.nama_mata"
              ],
              "paginate": 1000,
              "join": [
                {
                  "tbl_join": "x_academic_subject_master",
                  "refkey": "id",
                  "tbl_join2": "x_academic_subjects",
                  "foregenkey": "academic_subjects_master_id"
                }
              ],
              "where": [
                {
                  "tbl_coloumn": "x_academic_subjects",
                  "tbl_field": "academic_year_id",
                  "tbl_value": academicYear,
                  "operator": "="
                },
                {
                  "tbl_coloumn": "x_academic_subjects",
                  "tbl_field": "course_grade_id",
                  "tbl_value": idSubClass,
                  "operator": "="
                }

              ],
              "order_coloumn": "x_academic_subject_master.nama_mata",
              "order_by": "asc"
            }
          },
          {
            "name": "page",
            "type": "string",
            "value": "1"
          }
        ]
      }, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(function (response) {
      // console.log(response);
      const dataRes = JSON.parse(response?.data?.variables[3]?.value);
      const mataPelajaran = dataRes.data.data
      console.log(mataPelajaran);
      setGetMataPelajaran(mataPelajaran)
    })
  }, [academicYear,])


  const CalendarData = () => {
    return (
      <Calendar className="" />
    );
  }

  const TableJadwalPelajaran = () => {
    const columns = [
      {
        title: 'Kelas',
        dataIndex: 'kelas',
        align: 'center',
      },
      {
        title: 'Mata Pelajaran',
        dataIndex: 'namaPelajaran',
        align: 'center',
        // filters: [
        //   {
        //     text: 'Tematik 1',
        //     value: 'Tematik 1',
        //   },
        //   {
        //     text: 'Tematik 2',
        //     value: 'Tematik 2',
        //   },
        // ],
        // onFilter: (value, record) => record.namaPelajaran.indexOf(value) === 0,
        // sorter: (a, b) => a.namaPelajaran.length - b.namaPelajaran.length,
      },
      {
        title: 'Guru/Tenaga Pengajar',
        dataIndex: 'namaPengajar',
        align: 'center',
        // filters: [
        //   {
        //     text: 'Sri Wahyuni S.pd',
        //     value: 'Sri Wahyuni S.pd',
        //   },
        //   {
        //     text: 'Siti Mulyani S.pd',
        //     value: 'Siti Mulyani S.pd',
        //   },
        // ],
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
            <EyeOutlined style={{ color: "black" }} />
            <EditOutlined style={{ color: "blue" }} onClick={() => notification.open({
              message: 'Edit',
              description:
                'Edit user bernama ' + record.namaPelajaran,
              duration: 2

            })} />
            <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteJadwalPelajaran(record)} />
          </Space>
        ),
      },
    ];

    const dataSenin = senin?.map((data, index) => {
      return {
        id: data.id_shedule,
        hari: data.hari,
        kelas: data.class,
        namaPelajaran: data.nama_mata,
        namaPengajar: data.name,
        waktu: `${data.time_start} - ${data.time_end}`,
      }
    })

    const dataSelasa = selasa?.map((data, index) => {
      return {
        id: data.id_shedule,
        hari: data.hari,
        kelas: data.class,
        namaPelajaran: data.nama_mata,
        namaPengajar: data.name,
        waktu: `${data.time_start} - ${data.time_end}`,
      }
    })

    const dataRabu = rabu?.map((data, index) => {
      return {
        id: data.id_shedule,
        hari: data.hari,
        kelas: data.class,
        namaPelajaran: data.nama_mata,
        namaPengajar: data.name,
        waktu: `${data.time_start} - ${data.time_end}`,
      }
    })

    const dataKamis = kamis?.map((data, index) => {
      return {
        id: data.id_shedule,
        hari: data.hari,
        kelas: data.class,
        namaPelajaran: data.nama_mata,
        namaPengajar: data.name,
        waktu: `${data.time_start} - ${data.time_end}`,
      }
    })

    const dataJumat = jumat?.map((data, index) => {
      return {
        id: data.id_shedule,
        hari: data.hari,
        kelas: data.class,
        namaPelajaran: data.nama_mata,
        namaPengajar: data.name,
        waktu: `${data.time_start} - ${data.time_end}`,
      }
    })

    const dataSabtu = sabtu?.map((data, index) => {
      return {
        id: data.id_shedule,
        hari: data.hari,
        kelas: data.class,
        namaPelajaran: data.nama_mata,
        namaPengajar: data.name,
        waktu: `${data.time_start} - ${data.time_end}`,
      }
    })

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
          dataSource={dataSenin}
          onChange={onChangeTable}
          pagination={{ position: ['none'] }}
          rowClassName="bg-greylight text-grey-900"
          scroll={{ x: 400 }} />

        <div className="mt-4">
          <div className="bg-grey">
            <p className="strong text-black pl-4 mb-0">SELASA</p>
          </div>
        </div>
        <Table className=""
          columns={columns}
          dataSource={dataSelasa}
          onChange={onChangeTable}
          pagination={{ position: ['none'] }}
          rowClassName="bg-greylight text-grey-900"
          scroll={{ x: 400 }} />

        <div className="mt-4">
          <div className="bg-grey">
            <p className="strong text-black pl-4 mb-0">RABU</p>
          </div>
        </div>
        <Table className=""
          columns={columns}
          dataSource={dataRabu}
          onChange={onChangeTable}
          pagination={{ position: ['none'] }}
          rowClassName="bg-greylight text-grey-900"
          scroll={{ x: 400 }} />

        <div className="mt-4">
          <div className="bg-grey">
            <p className="strong text-black pl-4 mb-0">KAMIS</p>
          </div>
        </div>
        <Table className=""
          columns={columns}
          dataSource={dataKamis}
          onChange={onChangeTable}
          pagination={{ position: ['none'] }}
          rowClassName="bg-greylight text-grey-900"
          scroll={{ x: 400 }} />

        <div className="mt-4">
          <div className="bg-grey">
            <p className="strong text-black pl-4 mb-0">JUMAT</p>
          </div>
        </div>
        <Table className=""
          columns={columns}
          dataSource={dataJumat}
          onChange={onChangeTable}
          pagination={{ position: ['none'] }}
          rowClassName="bg-greylight text-grey-900"
          scroll={{ x: 400 }} />

        <div className="mt-4">
          <div className="bg-grey">
            <p className="strong text-black pl-4 mb-0">SABTU</p>
          </div>
        </div>
        <Table className=""
          columns={columns}
          dataSource={dataSabtu}
          onChange={onChangeTable}
          pagination={{ position: ['none'] }}
          rowClassName="bg-greylight text-grey-900"
          scroll={{ x: 400 }} />
      </>
    );
  };

  const CardJadwalPelajaran = () => {
    const _onSelectMenu = ({ key }) => {
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
                <EllipsisOutlined />
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
                    <Filter title1="Mata Pelajaran" title2="Guru/Tenaga Pengajar" />
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
                      onSearch={_onSearch} style={{ width: '80%' }} />
                    {grid == false ?
                      <a>
                        <AppstoreOutlined style={{ fontSize: '2em', lineHeight: 1 }}
                          onClick={() => setGrid(true)} />
                      </a> :
                      <a>
                        <MenuOutlined style={{ fontSize: '2em', lineHeight: 1 }}
                          onClick={() => setGrid(false)} />
                      </a>}
                  </div>
                </div>
              </Card>
            </div>
            <div className="row">
              <div className="col-lg-8 d-flex">
                <p className="font-weight-bolder ml-2 mt-2 mb-0 mr-3 mt-0">Pilih Hari</p>
                <div className="form-group">
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    name="hari"
                    required
                  >
                    <option value="" selected disabled>
                      Pilih Hari
                    </option>
                    <option value="senin">
                      Senin
                    </option>
                    <option value="selasa">
                      Selasa
                    </option>
                    <option value="rabu">
                      Rabu
                    </option>
                    <option value="kamis">
                      Kamis
                    </option>
                    <option value="jumat">
                      Jumat
                    </option>
                  </select>
                </div>
              </div>
              <div className="py-2 col-lg-4">
                {calendar == false ?
                  <h5 onClick={() => setCalendar(true)}
                    className='align-items-center d-flex justify-content-end cursor-pointer'>
                    <TableOutlined style={{ fontSize: '22px' }} />
                    <p className="font-weight-bolder ml-2 mb-0">Tampilkan Mode Tabel</p>
                  </h5> :
                  <h5 onClick={() => setCalendar(false)}
                    className='align-items-center d-flex justify-content-end cursor-pointer'>
                    <CalendarOutlined style={{ fontSize: '20px' }} />
                    <p className="font-weight-bolder ml-2 mb-0">Tampilkan Mode Kalender</p>
                  </h5>}
              </div>
            </div>
            {calendar ? <TableJadwalPelajaran /> : <CalendarData />}
          </div>
        </div>
      </div>
    );
  };

  const createJadwalPelajaran = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    const dateNow = new Date().toLocaleString()
    console.log(data);

    axios.post(BASE_URL,
      {
        "processDefinitionId": "GlobalInsertRecord:7:7777c884-d588-11ec-a2ad-3a00788faff5",
        "returnVariables": true,
        "variables": [
          {
            "name": "global_Insert",
            "type": "json",
            "value": {
              "tbl_name": "x_academic_subjects_scheduleModel",
              "tbl_coloumn": {
                "academic_subjects_id": data.mata_pelajaran,
                "time_start": data.waktu_mulai,
                "time_end": data.waktu_selesai,
                "max_student": "",
                "teachers_id": data.guru,
                "hari": data.hari,
              }
            }
          }
        ]
      }, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(function (response) {
      setRefreshState(true);
      // console.log(JSON.stringify(response.data.variables[2].value, null, 2));
      const valueRes = response.data.variables[2].value;
      const valueResObj = JSON.parse(valueRes);
      // console.log(valueResObj.status)
      if (valueResObj.status == 'success') {
        setIsViewPelajaran(true)
        notification.success({
          message: 'Sukses',
          description: 'Pelajaran berhasil ditambahkan.',
          placement: 'top'
        })
      } else {
        notification.error({
          message: 'Error',
          description: 'Harap isi semua field',
          placement: 'top'
        })
      }
    })
  }

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
                  <form id="mataPelajaran_form"
                    onSubmit={createJadwalPelajaran}
                    method="POST">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Hari
                          </label>
                          <select
                            className="form-control"
                            aria-label="Default select example"
                            name="hari"
                            required
                          >
                            <option value="" selected disabled>
                              Pilih Hari
                            </option>
                            <option value="senin">
                              Senin
                            </option>
                            <option value="selasa">
                              Selasa
                            </option>
                            <option value="rabu">
                              Rabu
                            </option>
                            <option value="kamis">
                              Kamis
                            </option>
                            <option value="jumat">
                              Jumat
                            </option>
                            <option value="sabtu">
                              Sabtu
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Mata Pelajaran
                          </label>
                          <select
                            className="form-control"
                            aria-label="Default select example"
                            name="mata_pelajaran"
                            required
                          >
                            {mataPelajaran.map((data, i) => {
                              return (
                                <option value={data.id_subjects} selected key={i}>
                                  {data.nama_mata}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Guru/Tenaga Pengajar
                          </label>
                          <select
                            className="form-control"
                            aria-label="Default select example"
                            name="guru"
                            required
                          >
                            {getGuru.map((data, i) => {
                              return (
                                <option value={data.id_guru} selected key={i}>
                                  {data.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Waktu Mulai
                          </label>
                          <TimePicker onChange={onChange}
                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                            name='waktu_mulai'
                            className="form-control"
                            required />
                          {/* <input
                            type="text"
                            name='waktu_mulai'
                            className="form-control"
                            required
                          /> */}
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Waktu Selesai
                          </label>
                          <TimePicker onChange={onChange}
                            defaultOpenValue={moment('00:00', 'HH:mm')}
                            name='waktu_selesai'
                            className="form-control"
                            required />
                          {/* <input
                            type="text"
                            name='waktu_selesai'
                            className="form-control"
                            required
                          /> */}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <button
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          type="submit"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setIsViewPelajaran(true)}

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

  const deleteJadwalPelajaran = (record) => {
    Swal.fire({
      title: 'Apakah anda yakin menghapus data?',
      text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batalkan',
      confirmButtonText: 'Hapus',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(BASE_URL, {
          "processDefinitionId": "GlobalDeleteRecord:3:cc4aec62-d58d-11ec-a2ad-3a00788faff5",
          "returnVariables": true,
          "variables": [
            {
              "name": "global_delete",
              "type": "json",
              "value": {
                "tbl_name": "x_academic_subjects_scheduleModel",
                "id": record.id
              }
            }
          ]
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        }
        ).then(function (response) {
          console.log(response);
          setRefreshState(true);
          Swal.fire(
            'Data telah terhapus!',
            'Menghapus data pelajaran ' + record.namaPelajaran,
            'success'
          )
          // pageLoad()
        })
      }
    })
  }

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          {isViewPelajaran ? <ViewPelajaran /> : <TambahPelajaran />}
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
};