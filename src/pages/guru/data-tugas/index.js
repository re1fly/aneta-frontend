import React, {Fragment, useState, useEffect} from "react";
import Adminfooter from "../../../components/Adminfooter";
import {
    Button,
    Card,
    Col,
    Dropdown,
    notification,
    PageHeader,
    Row,
    Space, Spin,
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
    role_guru_create_materi,
    get_where_no_join,
    role_guru_get_matpel,
    global_join_sub_where_get,
    role_guru_get_sub_class,
    global_update, role_guru_get_materi, role_guru_create_materi_v2,
} from "../../../api/reference";

import axios from "axios";
import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import {FormCreateMateri} from "../../../components/form/GuruCreateMateri";
import {pageLoad} from "../../../components/misc/loadPage";
import Swal from "sweetalert2";
import {dateNow} from "../../../components/misc/date";

function GuruDataTugas() {
    const [grid, setGrid] = useState(false);
    const [dataTugas, setDataTugas] = useState([]);
    const [isViewTugas, setIsViewTugas] = useState(true);
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);

    const [loading, setLoading] = useState(true);
    const [countRender, setCountRender] = useState(0)
    const [dataSuccess, setDataSuccess] = useState(false)

    /* const [getKelas, setGetKelas] = useState(null);
     const [dataMapel, setDataMapel] = useState(null);
     const [selectedClass, setSelectedClass] = useState(null);
     const [selectedMapel, setSelectedMapel] = useState(null);*/

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const userId = localStorage.getItem("user_id");
    const academic_year_id = localStorage.getItem("academic_year");
    const institute = localStorage.getItem("institute");

    /*  const _getDataKelas = () => {
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
      };*/

    const deleteTugas = (record) => {
        console.log(record);
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
                                        tbl_name: "x_academic_subjects_schedule_contentsModel",
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
                            getListTugas();
                            Swal.fire(
                                "Data telah terhapus!",
                                "Menghapus data tugas " + record.namaTugas,
                                "success"
                            );
                        } else {
                            Swal.fire("Data not found!", "Error");
                        }
                    });
            }
        });
    };

    const getListTugas = () => {
        axios
            .post(
                url_by_institute,
                {
                    processDefinitionId: role_guru_get_materi,
                    returnVariables: true,
                    variables: [
                        {
                            name: "data",
                            type: "json",
                            value: {
                                id_subject_type: 2,
                                created_by: userId,
                                id_academic: academic_year_id,
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
                setDataTugas(dataRes?.data?.data);
                const pagination = dataRes?.data?.links;
                setBtnPagination(pagination);
                const responseCode = dataRes.code;
                if (responseCode == 200) {
                    setLoading(false)
                    setDataSuccess(true)
                } else {
                    setDataSuccess(false)
                    setCountRender(countRender + 1)
                }
            });
    }

    const _loadingData = () => {
        if (dataSuccess == false) {
            getListTugas()
        }
    }

    if (countRender > 1 && countRender < 4) {
        setInterval(_loadingData, 5000)
    }
    useEffect(() => {
        getListTugas();
    }, [userId, refreshState, paramsPage]);

    // useEffect(() => {
    //   _getDataKelas();
    //   _getDataMapel();
    //   getListTugas();
    // }, [userId, refreshState, paramsPage, selectedClass]);

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            defaultSortOrder: "ascend",
            responsive: ["sm"],
        },
        {
            title: "Kelas",
            dataIndex: "tingkatKelas",
            align: "center",
        },
        {
            title: "Nama Tugas",
            dataIndex: "namaMateri",
        },
        {
            title: "TA / Semester",
            dataIndex: "ta_semester",
            align: "center",
        },
        {
            title: "Mata Pelajaran",
            dataIndex: "mataPelajaran",
            align: "center",
        },
        {
            title: "Status",
            dataIndex: "status",
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
                        style={{color: "black"}}
                        onClick={() => viewDetailMateri(record)}
                    />
                    <EditOutlined
                        style={{color: "blue"}}
                        onClick={() => viewEditMateri(record)}
                    />
                    <DeleteOutlined
                        style={{color: "red"}}
                        onClick={() => deleteTugas(record)}
                    />
                </Space>
            ),
        },
    ];

    const data = dataTugas?.map((data, index) => {
        return {
            no: index + 1,
            id: data.id,
            namaMateri: data.tittle,
            ta_semester: data.academic_year,
            status: data.status,
            idPelajaran: data.id_mata,
            mataPelajaran: data.nama_mata,
            idTingkatKelas: data.id_tingkat,
            tingkatKelas: `${data.tingkat_nama} / ${data.sub_class}`,
            idSubKelas: data.id_sub_class,
            subKelas: data.sub_class,
            isUpload: data.is_upload,
            embed: data.embed,
            idContent: data.id_wp,
            keterangan: data.keterangan,
            kompetensi: "",
        };
    });

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    const _onSearch = (value) => console.log(value);

    const ViewMateri = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onClick={() => window.history.back()}
                            title="Data Tugas"
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
                                onClick={viewCreateMateri}
                            >
                                Tambah Data
                            </Button>
                        </Col>
                        <Col span={12}>
                            <div className="float-right">
                                <Search
                                    className="mr-5"
                                    placeholder="Cari kata kunci"
                                    allowClear
                                    onSearch={_onSearch}
                                    style={{width: 250, lineHeight: "20px"}}
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

                {/* <div className="row">
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
        </div>*/}

                <Spin tip="Loading..." spinning={loading} className='mt-5'>
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
                </Spin>
                <Adminfooter/>
            </div>
        );
    };

    const CreateTugas = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data);
        const idKompetensi = data.kompetensi?.split(",")?.map(Number);
        console.log(idKompetensi);
        const iFrame = data.embed_materi;
        const id = iFrame?.split("id=")[1];
        const id_content_wp = id?.split('" width=')[0];

        axios
            .post(
                url_by_institute,
                {
                    processDefinitionId: role_guru_create_materi_v2,
                    returnVariables: true,
                    variables: [
                        {
                            name: "create_materi_matpel_guru",
                            type: "json",
                            value: {
                                subjects_content_type_id: 2,
                                user_id: userId,
                                id_tingkat: data.tingkat_kelas,
                                id_sub_kelas: data.sub_kelas,
                                id_matpel: data.mata_pelajaran,
                                nama_materi: data.nama_materi,
                                // embed_materi: data.embed_materi,
                                // id_content_wp: id_content_wp,
                                keterangan: data.keterangan,
                                // id_kompetensi: idKompetensi,
                                status: "publish",
                                academic_year_id: academic_year_id,
                                is_upload: data.is_upload,
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
                // console.log("Insert Tugas:", response);
                const valueRes = response.data.variables[2].value;
                const valueResObj = JSON.parse(valueRes);
                if (valueResObj.message == "success insert materi") {
                    setIsViewCreate(false);
                    setIsViewTugas(true);
                    setRefreshState(true);
                    getListTugas();
                    notification.success({
                        message: "Sukses",
                        description: "Tugas berhasil ditambahkan.",
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

    const EditTugas = (e) => {
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
                                tbl_name: "x_academic_subjects_schedule_contentsModel",
                                id: selectedUser.id,
                                tbl_coloumn: {
                                    tittle: data.nama_materi,
                                    desc: data.keterangan,
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
                    setIsViewTugas(true);
                    setRefreshState(true);
                    getListTugas();
                    notification.success({
                        message: "Sukses",
                        description: "Tugas berhasil diupdate.",
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

    const viewCreateMateri = () => {
        setIsViewCreate(true);
        setIsViewTugas(false);
        setIsViewEdit(false);
        setIsViewDetail(false);
    };

    const viewEditMateri = (record) => {
        setSelectedUser(record);
        setIsViewEdit(true);
        setIsViewCreate(false);
        setIsViewTugas(false);
        setIsViewDetail(false);
    };

    const viewDetailMateri = (record) => {
        setSelectedUser(record);
        setIsViewCreate(false);
        setIsViewTugas(false);
        setIsViewEdit(false);
        setIsViewDetail(true);
    };

    const FormCreate = () => {
        return (
            <FormCreateMateri
                form="Tugas"
                setView={() => setIsViewTugas(true)}
                title="Tambah Data"
                submit={CreateTugas}
                isDisabled={false}
                disabledButton={false}
            />
        );
    };

    const FormEdit = () => {
        return (
            <FormCreateMateri
                form="Tugas"
                setView={() => setIsViewTugas(true)}
                title="Edit Data"
                submit={EditTugas}
                isDisabled={true}
                titleDisabled={false}
                descDisabled={false}
                disabledButton={false}
                id={selectedUser.id}
                namaMateri={selectedUser.namaMateri}
                idTingkatKelas={selectedUser.idTingkatKelas}
                tingkatKelas={selectedUser.tingkatKelas}
                idSubKelas={selectedUser.idSubKelas}
                subKelas={selectedUser.subKelas}
                idPelajaran={selectedUser.idPelajaran}
                mataPelajaran={selectedUser.mataPelajaran}
                embed={selectedUser.embed}
                idContent={selectedUser.idContent}
                isUpload={selectedUser.isUpload}
                keterangan={selectedUser.keterangan}
                idKompetensi={selectedUser.idKompetensi}
                kompetensi={selectedUser.kompetensi}
            />
        );
    };

    const FormDetail = () => {
        return (
            <FormCreateMateri
                form="Tugas"
                setView={() => setIsViewTugas(true)}
                title="View Data"
                // submit={createGuru}
                isDisabled={true}
                titleDisabled={true}
                descDisabled={true}
                disabledButton={true}
                id={selectedUser.id}
                namaMateri={selectedUser.namaMateri}
                idTingkatKelas={selectedUser.idTingkatKelas}
                tingkatKelas={selectedUser.tingkatKelas}
                idSubKelas={selectedUser.idSubKelas}
                subKelas={selectedUser.subKelas}
                idPelajaran={selectedUser.idPelajaran}
                mataPelajaran={selectedUser.mataPelajaran}
                embed={selectedUser.embed}
                idContent={selectedUser.idContent}
                isUpload={selectedUser.isUpload}
                keterangan={selectedUser.keterangan}
                idKompetensi={selectedUser.idKompetensi}
                kompetensi={selectedUser.kompetensi}
            />
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {isViewTugas ? (
                        <ViewMateri/>
                    ) : isViewCreate ? (
                        <FormCreate/>
                    ) : isViewEdit ? (
                        <FormEdit/>
                    ) : isViewDetail ? (
                        <FormDetail/>
                    ) : (
                        <ViewMateri/>
                    )}
                    {/* {isViewMateri ? <ViewMateri /> : <TambahMateri />} */}
                </div>
            </div>
        </Fragment>
    );
}

export default GuruDataTugas;
