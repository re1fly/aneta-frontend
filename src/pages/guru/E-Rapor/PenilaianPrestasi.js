import axios from "axios";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProcessId} from "../../../redux/Action";
import {PageHeader, notification, Select, Card, Row, Table, Input, Modal, Button} from "antd"
import {GetMapelKelas} from "../../../components/filter/GetMapelKelas";
import {DataNotFound} from "../../../components/misc/DataNotFound";
import {
    get_input_deskripsi,
    global_join_sub_where_get,
    input_data_deskripsi, role_guru_get_prestasi, role_guru_get_sub_class, role_guru_insert_prestasi,
    url_by_institute
} from "../../../api/reference";
import {GetMapelKelasGuru} from "../../../components/filter/GetMapelKelasGuru";

function PenilaianPrestasi() {
    const userId = localStorage.getItem("user_id");
    const instituteId = localStorage.getItem('institute');
    const academic = localStorage.getItem('academic_year');

    const [deskripsiNilai, setDeskripsiNilai] = useState(null)
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubClass, setSelectedSubClass] = useState(null);
    const [tingkatKelas, setTingkatKelas] = useState([])
    const [subKelas, setSubKelas] = useState([]);
    const [dataSiswa, setDataSiswa] = useState([])
    const [selectedSiswa, setSelectedSiswa] = useState([])
    const [selectedIdSiswa, setSelectedIdSiswa] = useState(null);
    console.log(JSON.stringify(deskripsiNilai, null, 2));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrestasi, setTotalPrestasi] = useState(0);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleOk = () => {
        setLoadingSubmit(true)

        const formCV = document.querySelector("#form_prestasi");
        const formData = new FormData(formCV);
        const prestasi = formData.getAll("prestasi_new");
        const keterangan_prestasi = formData.getAll("keterangan_prestasi_new");
        const allPrestasi = [];
        const idSiswa = selectedIdSiswa

        for (let i = 0; i < totalPrestasi; i++) {
            allPrestasi.push({
                id: idSiswa,
                jenis_prestasi: prestasi[i],
                keterangan: keterangan_prestasi[i]
            });
        }
        console.log(allPrestasi)

        axios.post(url_by_institute, {
            "processDefinitionId": role_guru_insert_prestasi,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "data": allPrestasi
                    }
                }
            ]
        })
            .then(function (response) {
                const dataApi = JSON.parse(response?.data?.variables[2]?.value);
                const resCode = dataApi.code;
                if (resCode == true) {
                    notification.success({
                        message: "Sukses",
                        description: "Input Prestasi Sukses",
                        placement: "top",
                    });
                    setLoadingSubmit(false)
                    setIsModalOpen(false)
                    setTotalPrestasi(0)
                } else {
                    notification.error({
                        message: "Gagal",
                        description: "Mohon cek kembali inputan anda",
                        placement: "top",
                    });
                }
            })

        // setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const _getTingkatKelas = () => {
        axios
            .post(url_by_institute, {
                processDefinitionId: global_join_sub_where_get,
                returnVariables: true,
                variables: [
                    {
                        name: "global_join_where_sub",
                        type: "json",
                        value: {
                            tbl_induk: "r_class_type",
                            select: ["r_class_type.id", "r_class_type.class_type"],
                            paginate: false,
                            join: [
                                {
                                    tbl_join: "m_institutes",
                                    refkey: "id",
                                    tbl_join2: "r_class_type",
                                    foregenkey: "institute_id",
                                },
                            ],
                            where: [
                                {
                                    tbl_coloumn: "r_class_type",
                                    tbl_field: "institute_id",
                                    tbl_value: instituteId,
                                    operator: "=",
                                },
                            ],
                            order_coloumn: "r_class_type.class_type",
                            order_by: "asc",
                        },
                    },
                    {
                        name: "page",
                        type: "string",
                        value: "1",
                    },
                ],
            })
            .then(function (response) {
                const dataTingkatKelas = JSON.parse(response?.data?.variables[3]?.value);
                const dataTingkat = dataTingkatKelas?.data
                setTingkatKelas(dataTingkat);
                console.log(dataTingkat)
            })
    }
    const _getSubKelas = () => {
        axios.post(url_by_institute, {
            processDefinitionId: role_guru_get_sub_class,
            returnVariables: true,
            variables: [
                {
                    name: "get_sub_kelas_guru",
                    type: "json",
                    value: {
                        id_tingkat: selectedClass,
                        user_id: userId,
                        academic_year_id: academic,
                    },
                },
            ],
        })
            .then(function (response) {
                const dataSubKelas = JSON.parse(response?.data?.variables[2]?.value);
                const dataSub = dataSubKelas?.data;
                setSubKelas(dataSub);
                console.log(response)
            })
    }
    const _getSiswa = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": role_guru_get_prestasi,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_class": selectedSubClass,
                        "id_academic": academic
                    }
                }
            ]
        })
            .then(function (response) {
                const dataApi = JSON.parse(response?.data?.variables[2]?.value);
                const data = dataApi?.data;
                setDataSiswa(data);
            })
    }
    const _getSiswaDetail = (id) => {
        axios.post(url_by_institute, {
            "processDefinitionId": "globaljoinsubwhereget:2:ffda1ab3-2cc0-11ed-aacc-9a44706f3589",
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_eraport_prestasi",
                        "select": [
                            "x_eraport_prestasi.jenis_prestasi",
                            "x_eraport_prestasi.keterangan"
                        ],
                        "paginate": false,
                        "join": [
                            {
                                "tbl_join": "x_academic_students",
                                "refkey": "id",
                                "tbl_join2": "x_eraport_prestasi",
                                "foregenkey": "student_id"
                            }, {
                                "tbl_join": "users",
                                "refkey": "id",
                                "tbl_join2": "x_academic_students",
                                "foregenkey": "user_id"
                            }
                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_eraport_prestasi",
                                "tbl_field": "deleted_at",
                                "tbl_value": "",
                                "operator": "="
                            }, {
                                "tbl_coloumn": "x_eraport_prestasi",
                                "tbl_field": "student_id",
                                "tbl_value": id,
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
        })
            .then(function (response) {
                const dataApi = JSON.parse(response?.data?.variables[3]?.value);
                const data = dataApi?.data;
                setSelectedSiswa(data)
            })
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }


    useEffect(() => {
        _getTingkatKelas();
    }, []);

    useEffect(() => {
        _getSubKelas();
    }, [selectedClass]);

    useEffect(() => {
        _getSiswa();
    }, [selectedSubClass]);

    return (
        <Fragment>
            <div className="main-wrapper">
                <Modal title="List Prestasi" visible={isModalOpen} width={1000} footer={[
                    <Button key="back" onClick={handleCancel}>
                        Kembali
                    </Button>,
                    <Button key="submit" type="primary" loading={loadingSubmit} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}>
                    <div className="table-responsive-xl">
                        <form id="form_prestasi">
                        <table className="table table-bordered">
                            <thead>
                            <tr className="bg-current text-light">
                                <th scope="col" className="text-center">Jenis Prestasi</th>
                                <th scope="col" className="text-center">
                                    keterangan
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedSiswa.map((value) => {
                                return (
                                    <tr>
                                        <th>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="prestasi"
                                                value={value.jenis_prestasi}
                                                disabled
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="keterangan_prestasi"
                                                value={value.keterangan}
                                                disabled
                                            />
                                        </th>
                                    </tr>
                                );
                            })}
                                {[...Array(Number(totalPrestasi)).keys()].map(
                                    (data, index) => {
                                        return (
                                            <tr>
                                                <th>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="prestasi_new"
                                                    />
                                                </th>
                                                <th>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="keterangan_prestasi_new"
                                                    />
                                                </th>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                            <div className="ml-3">
                                <button
                                    className="bg-facebook border-0 text-white font-xssss fw-600 p-3 mt-3 mb-3 rounded-lg"
                                    onClick={() => {
                                        setTotalPrestasi(totalPrestasi + 1)
                                    }}
                                    type="button"
                                >
                                    Tambah Prestasi
                                </button>
                                {totalPrestasi >= 1 ?
                                    <button
                                        className="bg-danger border-0 text-white font-xssss fw-600 p-3 m-3 rounded-lg"
                                        onClick={() => {
                                            setTotalPrestasi(totalPrestasi - 1)
                                        }}
                                        type="button"
                                    >
                                        Hapus Kolom Baru
                                    </button> : null
                                }
                            </div>
                        </table>
                        </form>
                        {/*<div className="mt-5 float-right">*/}
                        {/*    <button*/}
                        {/*        className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"*/}
                        {/*        onClick={_submitPenilaian}*/}
                        {/*    >*/}
                        {/*        Submit Nilai*/}
                        {/*    </button>*/}
                        {/*    <a*/}
                        {/*        onClick={() => window.history.back()}*/}
                        {/*        className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"*/}
                        {/*    >*/}
                        {/*        Batal*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>
                </Modal>
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4 ">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Input Data Deskripsi Nilai (Rapor)"
                        />
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <div className="form-group mr-4">
                                    <select
                                        className="form-control"
                                        key="id_class_filter"
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                    >
                                        <option value="" selected disabled>
                                            Pilih Tingkat Kelas
                                        </option>
                                        {tingkatKelas.map((data) => (
                                            <option value={data.id}>
                                                {data.class_type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-3">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        key="id_class_filter"
                                        onChange={(e) => setSelectedSubClass(e.target.value)}
                                    >
                                        <option value="" selected disabled>
                                            Pilih Sub Kelas
                                        </option>
                                        {subKelas?.map((data) => (
                                            <option value={data.id}>
                                                {data.sub_class}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {dataSiswa.length >= 1 ?
                            <div className="col-lg-12 pt-3">
                                <div className="table-responsive-xl">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className="bg-current text-light">
                                            <th scope="col">Nama Siswa</th>
                                            <th scope="col" className="text-center">
                                                Prestasi
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dataSiswa.map((value) => {
                                            return (
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        style={{
                                                            lineHeight: 3.5,
                                                            textTransform: "capitalize",
                                                        }}
                                                    >
                                                        {value.nama}
                                                    </th>
                                                    <td>
                                                        <div className="text-center">
                                                            <button
                                                                className="bg-current border-0 text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                                onClick={() => {
                                                                    setIsModalOpen(true);
                                                                    _getSiswaDetail(value.id)
                                                                    setSelectedIdSiswa(value.id)
                                                                }}
                                                                type="button"
                                                            >
                                                                List Prestasi
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <input
                                                        type="hidden"
                                                        className="form-control"
                                                        name="id_siswa"
                                                        required
                                                        value={value.id}
                                                    />
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                    {/*<div className="mt-5 float-right">*/}
                                    {/*    <button*/}
                                    {/*        className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"*/}
                                    {/*        onClick={_submitPenilaian}*/}
                                    {/*    >*/}
                                    {/*        Submit Nilai*/}
                                    {/*    </button>*/}
                                    {/*    <a*/}
                                    {/*        onClick={() => window.history.back()}*/}
                                    {/*        className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"*/}
                                    {/*    >*/}
                                    {/*        Batal*/}
                                    {/*    </a>*/}
                                    {/*</div>*/}
                                </div>
                            </div> : <DataNotFound/>
                        }
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default PenilaianPrestasi;