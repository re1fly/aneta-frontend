import React, { Fragment, useState, useEffect } from "react"
import axios from "axios";
import { BASE_URL } from "../../../api/Url";
import { useDispatch, useSelector } from "react-redux";
import { getProcessId, searchGlobal } from "../../../redux/Action";
import {
  Menu,
  Card,
  Button,
  Dropdown,
  message,
  Tag,
  Space,
  notification,
  Table,
  PageHeader,
} from "antd";
import {
  AppstoreOutlined,
  MenuOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined
} from "@ant-design/icons";

import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload"

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import Filter from "../../../components/Filter";
import { FormAdminPelajaran } from "../../../components/form/AdminDataPelajaran";
import Swal from "sweetalert2";

export default function DataMataPelajaranAdmin() {
  const [grid, setGrid] = useState(false)
  const [isViewPelajaran, setIsViewPelajaran] = useState(true);
  const [isViewEdit, setIsViewEdit] = useState(false);
  const [isViewCreate, setIsViewCreate] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshState, setRefreshState] = useState(false);

  const [getPelajaran, setGetPelajaran] = useState([]);
  const [btnPagination, setBtnPagination] = useState([]);
  const [paramsPage, setParamsPage] = useState("1");
  const [dataClass, setDataClass] = useState();
  const [academicYears, setAcademicYears] = useState([]);

  const [handleImage, setHandleImage] = useState('')
  const [_Img, setIMG] = useState('');
  const [_ImgBase64, setIMGBase64] = useState('');

  const academicYear = localStorage.getItem('academic_year')
  const institute = localStorage.getItem('institute');

  const dispatch = useDispatch();
  const searchRedux = useSelector(state => state.search);
  const DataSearch = searchRedux.DataSearch;

  const getProcess = useSelector(state => state.processId);
  let ProcessId = getProcess.DataProcess;

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  const onChangeImage = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setIMG(url);
        toDataURL(url, function (dataUrl) {
          setIMGBase64(dataUrl);
          setHandleImage(dataUrl);
          console.log('RESULT:', dataUrl)
        })
      });
    }
  };

  function onChangeTable(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const _onSelectMenu = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const _Account = (
    <Menu onClick={_onSelectMenu}>
      <Menu.Item key="1">Ubah</Menu.Item>
      <Menu.Item key="2">Hapus</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (DataSearch != '') {
      setGetPelajaran(DataSearch?.data?.data)
      setBtnPagination(DataSearch?.data?.links)
    }
  }, [DataSearch])

  const _onSearch = (value) => {
    const processDef = ProcessId[0].proses_def_id;
    const variableSearch = {
      "name": "global_join_where",
      "type": "json",
      "value": {
        "tbl_induk": "x_academic_subjects",
        "paginate": 10,
        "join": [
          {
            "tbl_join": "x_academic_year",
            "foregenkey": "academic_year_id",
            "refkey": "id"
          },

          {
            "tbl_join": "x_academic_class",
            "foregenkey": "course_grade_id",
            "refkey": "id"
          }
        ],
        "where": [
          {
            "tbl_coloumn": "x_academic_subjects",
            "tbl_field": "course_name",
            "tbl_value": value,
            "operator": "ILIKE"
          },
          {
            "tbl_coloumn": "x_academic_subjects",
            "tbl_field": "course_code",
            "tbl_value": value,
            "operator": "ILIKE"
          },
          {
            "tbl_coloumn": "x_academic_subjects",
            "tbl_field": "max_student",
            "tbl_value": value,
            "operator": "ILIKE"
          },
          {
            "tbl_coloumn": "x_academic_subjects",
            "tbl_field": "aktiv",
            "tbl_value": value,
            "operator": "ILIKE"
          },
          {
            "tbl_coloumn": "x_academic_class",
            "tbl_field": "class",
            "tbl_value": value,
            "operator": "ILIKE"
          },
          {
            "tbl_coloumn": "x_academic_year",
            "tbl_field": "academic_year",
            "tbl_value": value,
            "operator": "ILIKE"
          }
        ],
        "kondisi": {
          "keterangan": "where",
          "kolom": "x_academic_subjects.academic_year_id",
          "value": academicYear
        },
        "order_coloumn": "x_academic_subjects.course_name",
        "order_by": "asc"
      }
    }
    dispatch(searchGlobal(value, paramsPage, processDef, variableSearch))
  }

  useEffect(() => {
    dispatch(getProcessId(["getdatajoinwhere"]))
  }, [])

  useEffect(() => {
    axios.post(BASE_URL,
      {
        "processDefinitionId": "getdatajoinwhere:2:d2aed4a7-dff4-11ec-a658-66fc627bf211",
        "returnVariables": true,
        "variables": [
          {
            "name": "global_join_where",
            "type": "json",
            "value": {
              "tbl_induk": "x_academic_subjects",
              "select": [
                "x_academic_subjects.*",
                "x_academic_year.*",
                "x_academic_class.*",
                "x_academic_subjects.id as id_pelajaran"
              ],
              "paginate": 10,
              "join": [
                {
                  "tbl_join": "x_academic_year",
                  "foregenkey": "academic_year_id",
                  "refkey": "id"
                },
                {
                  "tbl_join": "x_academic_class",
                  "foregenkey": "course_grade_id",
                  "refkey": "id"
                }
              ],
              "where": [
                {
                  "tbl_coloumn": "x_academic_subjects",
                  "tbl_field": "academic_year_id",
                  "tbl_value": academicYear,
                  "operator": "="
                }
              ],
              "order_coloumn": "x_academic_subjects.id",
              "order_by": "asc"
            }
          },
          {
            "name": "page",
            "type": "string",
            "value": paramsPage
          }
        ]
      }
    ).then(function (response) {
      const pelajaran = JSON.parse(response.data.variables[3].value)
      setGetPelajaran(pelajaran.data.data)
      const pagination = pelajaran.data.links
      setBtnPagination(pagination)
    })

    axios.post(BASE_URL,
      {
        processDefinitionId:
          "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
        returnVariables: true,
        variables: [
          {
            name: "global_get_where",
            type: "json",
            value: {
              tbl_name: "x_academic_class",
              pagination: false,
              total_result: 2,
              order_coloumn: "x_academic_class.class",
              order_by: "asc",
              data: [
                {
                  kondisi: "where",
                  tbl_coloumn: "academic_year_id",
                  tbl_value: academicYear,
                  operator: "=",
                },
              ],
              tbl_coloumn: ["*"],
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(function (response) {
      const dataClass = JSON.parse(response.data.variables[2].value);
      // console.log(dataClass);
      setDataClass(dataClass);
    }).catch(function (error) {
      alert(error);
    });

    axios.post(BASE_URL, {
      "processDefinitionId": "getdatajoinwhere:2:d2aed4a7-dff4-11ec-a658-66fc627bf211",
      "returnVariables": true,
      "variables": [
        {
          "name": "global_join_where",
          "type": "json",
          "value": {
            "tbl_induk": "x_academic_year",
            "select": [
              "x_academic_year.id as id_academic",
              "x_academic_year.academic_year",
              "m_institutes.id"
            ],
            "paginate": 10,
            "join": [
              {
                "tbl_join": "m_institutes",
                "foregenkey": "institute_id",
                "refkey": "id"
              }
            ],
            "where": [
              {
                "tbl_coloumn": "x_academic_year",
                "tbl_field": "institute_id",
                "tbl_value": institute,
                "operator": "="
              }
            ],
            "order_coloumn": "x_academic_year.academic_year",
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
      const academics = JSON.parse(response.data.variables[3].value);
      setAcademicYears(academics.data.data);
    })
  }, [paramsPage, isViewPelajaran, refreshState])

  const CardDataPelajaran = () => {
    const channelList = getPelajaran.map((pelajaran, index) => {
      return {
        imageUrl: 'user.png',
        namaPelajaran: pelajaran.course_name,
        kode: pelajaran.course_code,
        tag2: '',
        tag3: '',
        kelas: pelajaran.class,
        tahunAkademik: pelajaran.academic_year,
        maxSiswa: pelajaran.max_student,
        status: [pelajaran.is_active],
      }
    })

    return (
      <>
        <div className="row">
          {channelList.map((value, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
              <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                  {value.status == true ? 'Nonaktif' : 'Aktif'}
                </span>
                <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                  overlay={_Account}>
                  <EllipsisOutlined />
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
                <h4 className="fw-700 font-xs mt-4">{value.namaPelajaran}</h4>
                <div className="clearfix"></div>
                {value.kode ? (
                  <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                    {value.kode}
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
                      <p className="font-xssss float-left lh-1">: {value.kelas}</p>
                    </div>
                  </div>

                  <div className="row ml-3">
                    <div className="col-6">
                      <p className="font-xssss float-left lh-1">Tahun Akademik</p>
                    </div>
                    <div className="">
                      <p className="font-xssss float-left lh-1">: {value.tahunAkademik}</p>
                    </div>
                  </div>

                  <div className="row ml-3">
                    <div className="col-6">
                      <p className="font-xssss float-left lh-1">Max siswa</p>
                    </div>
                    <div className="">
                      <p className="font-xssss float-left lh-1">: {value.maxSiswa}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center mt-4'>
          {btnPagination.map((dataBtn) => {
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
                  setParamsPage(linkUrl)
                }}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </>
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
        align: "center"
        // sorter: (a, b) => a.semester - b.semester,
      },
      {
        title: 'Kelas',
        dataIndex: 'kelas',
        defaultSortOrder: 'descend',
        align: "center"
        // sorter: (a, b) => a.semester - b.semester,
      },
      {
        title: 'Tahun Akademik',
        dataIndex: 'tahunAkademik',
        defaultSortOrder: 'descend',
        align: "center"
      },
      {
        title: 'Max Siswa',
        dataIndex: 'maxSiswa',
        defaultSortOrder: 'descend',
        align: "center"
      },
      {
        title: 'Status',
        dataIndex: 'status',
        responsive: ['sm'],
        render: status => (
          <>
            {status.map(status => {
              let color = status != "T" ? 'red' : 'green';
              return (
                <Tag style={{ borderRadius: '15px' }} color={color} key={status}>
                  {status ? "Aktif" : "Nonaktif"}
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
            <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailPelajaran(record)} />
            <EditOutlined style={{ color: "blue" }} onClick={() => viewEditPelajaran(record)} />
            <DeleteOutlined style={{ color: 'red' }} onClick={() => deletePelajaran(record)} />
          </Space>
        ),
      },
    ];

    const data_sampel = getPelajaran.map((pelajaran, index) => {
      return {
        no: index + 1,
        imageUrl: 'user.png',
        id: pelajaran.id_pelajaran,
        namaPelajaran: pelajaran.course_name,
        kode: pelajaran.course_code,
        idKelas: pelajaran.course_grade_id,
        kelas: pelajaran.class,
        idTahunAKademik: pelajaran.academic_year_id,
        tahunAkademik: pelajaran.academic_year,
        maxSiswa: pelajaran.max_student,
        status: [pelajaran.is_active],
      }
    })

    return (
      <>
        <Table className=""
          columns={columns}
          dataSource={data_sampel}
          onChange={onChangeTable}
          pagination={false}
          rowClassName="bg-greylight text-grey-900"
          scroll={{ x: 400 }} />
        <div className='text-center mt-4'>
          {btnPagination.map((dataBtn) => {
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
      </>
    );
  };

  const ViewPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader
              className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
              onBack={() => window.history.back()}
              title="Data Mata Pelajaran"
            />
            <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
              <div className="row">
                <div className="col-lg-8 col-md-6 my-2">
                  <Button className="mr-4" type="primary" shape="round" size='middle'
                    onClick={viewCreatePelajaran}>
                    Tambah Data
                  </Button>
                  <Filter title1="Mata Pelajaran" title2="Kelas" />
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
            {/* <div className="d-flex">
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
            </div> */}
            {grid ? <CardDataPelajaran /> : <TabelDataPelajaran />}
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
                  <form id="teacher_form"
                    onSubmit={createPelajaran}
                    method="POST">
                    <div className="row justify-content-center">
                      <div className="col-lg-4 text-center">
                        <figure className="avatar mr-auto mb-4 mt-2 w100">
                          <Card style={{ width: 200 }}>
                            <ImgCrop rotate>
                              <Upload
                                name="image_siswa"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              // onPreview={onPreview}
                              >
                                <PlusOutlined />
                              </Upload>
                            </ImgCrop>
                          </Card>
                        </figure>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Nama Pelajaran
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name='nama_pelajaran'
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name='kode'
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Kelas
                          </label>
                          <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kelas"
                            required
                          >
                            <option value="" selected disabled>
                              Pilih Kelas
                            </option>
                            {dataClass.map((data) => (
                              <option value={data.id}>{data.class}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Tahun Akademik
                          </label>
                          <select
                            className="form-control"
                            aria-label="Default select example"
                            name="tahun_akademik"
                            required
                          >
                            <option value="" selected disabled>
                              Pilih Tahun Akademik
                            </option>
                            {academicYears.map((data) => (
                              <option value={data.id_academic}>{data.academic_year}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Max Siswa
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name='max_siswa'
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <button
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          type="submit"
                        >
                          Simpan
                        </button>
                        <a
                          onClick={() => setIsViewPelajaran(true)}
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

  const createPelajaran = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    const dateNow = new Date().toLocaleString()
    console.log(data)

    axios.post(BASE_URL, {
      "processDefinitionId": "insertpelajaran:12:d495502b-f069-11ec-a658-66fc627bf211",
      "returnVariables": true,
      "variables": [
        {
          "name": "validasi",
          "type": "json",
          "value": {
            "data": {
              "course_name": "required",
              "course_code": "required",
              "max_student": "required",
              "course_grade": "required",
              "academic_year_id": "required"
            },
            "course_name": data.nama_pelajaran,
            "course_code": data.kode,
            "max_student": data.max_siswa,
            "course_grade": data.kelas,
            "academic_year_id": data.tahun_akademik

          }
        },
        {
          "name": "x_academic_subjects",
          "type": "json",
          "value": {
            "tbl_name": "x_academic_subjects",
            "tbl_coloumn": {
              "academic_year_id": data.tahun_akademik,
              "course_grade_id": data.kelas,
              "course_name": data.nama_pelajaran,
              "course_code": data.kode,
              "max_student": data.max_siswa
            }
          }
        },
        {
          "name": "upload_image",
          "type": "json",
          "value": {
            "image": "bb",
            "image_type": "png",
            "nama_folder": "image_pelajaran"
          }
        }
      ]
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(function (response) {
      console.log("test :", response);
      if (response.data.variables[5].value == 200) {
        setIsViewCreate(false)
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

  const editPelajaran = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    console.log(data)

    axios.post(BASE_URL, {
      "processDefinitionId": "updatepelajaran1:2:f978ef91-ef05-11ec-a658-66fc627bf211",
      "returnVariables": true,
      "variables": [
        {
          "name": "validasi",
          "type": "json",
          "value": {
            "data": {
              "course_name": "required",
              "course_code": "required",
              "max_student": "required",
              "course_grade_id": "required",
              "academic_year_id": "required"
            },
            "course_name": data.nama_pelajaran,
            "course_code": data.kode,
            "max_student": data.max_siswa,
            "course_grade_id": data.kelas,
            "academic_year_id": data.tahun_akademik
          }
        },
        {
          "name": "x_academic_subjects",
          "type": "json",
          "value": {
            "tbl_name": "x_academic_subjects",
            "id": selectedUser.id,
            "tbl_coloumn": {
              "course_name": data.nama_pelajaran,
              "course_code": data.kode,
              "max_student": data.max_siswa,
              "course_grade_id": data.kelas,
              "academic_year_id": data.tahun_akademik,
            }
          }
        }
      ]
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(function (response) {
      if (response.data.variables[3].value == 200) {
        setIsViewCreate(false)
        setIsViewPelajaran(true)
        notification.success({
          message: 'Sukses',
          description: 'Pelajaran berhasil di update.',
          placement: 'top'
        })
      } else {
        notification.error({
          message: 'Error',
          description: 'Harap isi semua field',
          placement: 'top'
        })
      }
      console.log(response)
    })
  }

  const deletePelajaran = (record) => {
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
                "tbl_name": "x_academic_subjectsModel",
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
            'Menghapus data siswa bernama ' + record.namaPelajaran,
            'success'
          )
        })
      }
    })
  }

  const viewCreatePelajaran = () => {
    setIsViewCreate(true)
    setIsViewPelajaran(false)
    setIsViewEdit(false)
    setIsViewDetail(false)
  }

  const viewEditPelajaran = (record) => {
    setSelectedUser(record)
    setIsViewEdit(true)
    setIsViewCreate(false)
    setIsViewPelajaran(false)
    setIsViewDetail(false)
  }

  const viewDetailPelajaran = (record) => {
    setSelectedUser(record)
    setIsViewCreate(false)
    setIsViewPelajaran(false)
    setIsViewEdit(false)
    setIsViewDetail(true)
  }

  const FormCreate = () => {
    return (
      <FormAdminPelajaran
        setView={() => setIsViewPelajaran(true)}
        title="Tambah Data Mata Pelajaran"
        submit={createPelajaran}
        selectKelas={dataClass.map((data) => (
          <option value={data.id}>
            {data.class}
          </option>
        ))}
        selectYears={academicYears.map((data) => (
          <option value={data.id_academic}>{data.academic_year}</option>
        ))}
        isDisabled={false}
      />
    )
  }

  const FormEdit = () => {
    return (
      <FormAdminPelajaran
        setView={() => setIsViewPelajaran(true)}
        title="Edit Pelajaran"
        submit={editPelajaran}
        selectKelas={dataClass.map((data) => (
          <option value={data.id}>{data.class}</option>
        ))}
        selectYears={academicYears.map((data) => (
          <option value={data.id_academic}>{data.academic_year}</option>
        ))}
        namaPelajaran={selectedUser.namaPelajaran}
        kode={selectedUser.kode}
        kelas={selectedUser.kelas}
        tahunAkademik={selectedUser.tahunAkademik}
        maxSiswa={selectedUser.maxSiswa}
        isDisabled={false}
      />
    )
  }

  const FormDetail = () => {
    return (
      <FormAdminPelajaran
        setView={() => setIsViewPelajaran(true)}
        title="View pelajaran"
        submit={createPelajaran}
        selectKelas={dataClass.map((data) => (
          <option value={data.id}>{data.class}</option>
        ))}
        selectYears={academicYears.map((data) => (
          <option value={data.id_academic}>{data.academic_year}</option>
        ))}
        namaPelajaran={selectedUser.namaPelajaran}
        kode={selectedUser.kode}
        kelas={selectedUser.kelas}
        tahunAkademik={selectedUser.tahunAkademik}
        maxSiswa={selectedUser.maxSiswa}
        isDisabled={true}
      />
    )
  }

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          {/* {isViewPelajaran ? <ViewPelajaran /> : <TambahPelajaran />} */}
          {
            isViewPelajaran ?
              <ViewPelajaran /> :
              isViewCreate ?
                <FormCreate /> :
                isViewEdit ?
                  <FormEdit /> :
                  isViewDetail ?
                    <FormDetail /> :
                    <ViewPelajaran />
          }
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
};