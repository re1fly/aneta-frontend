import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {DataNotFound} from "../../../components/misc/DataNotFound";
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import {notification, PageHeader} from "antd";
import {
    global_insert,
    global_join_sub_where_get, role_guru_get_absensi, role_guru_get_sub_class, role_guru_insert_absensi,
    url_by_institute,
} from "../../../api/reference";

export default function PenilaianAbsensi() {
    const academic = localStorage.getItem("academic_year");
    const instituteId = localStorage.getItem('institute');
    const userId = localStorage.getItem("user_id");
    const [dataSiswa, setDataSiswa] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubClass, setSelectedSubClass] = useState(null);
    const [tingkatKelas, setTingkatKelas] = useState([])
    const [subKelas, setSubKelas] = useState([]);

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
    const _getDataSiswa = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": role_guru_get_absensi,
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
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic YWRtaW46TWFuYWczciE=",
                    },
                }
            )
            .then(function (response) {
                const resData = JSON.parse(response.data.variables[2].value);
                setDataSiswa(resData.data);
                console.log(response)
            });
    };

    const _submitPenilaian = (e) => {
        const formCV = document.querySelector('#form_ekskul');
        const formData = new FormData(formCV);
        const idSiswa = formData.getAll('id_siswa');
        const sakit = formData.getAll('sakit');
        const izin = formData.getAll('izin');
        const tanpaKeterangan = formData.getAll('tanpa_keterangan');
        const saran = formData.getAll('saran');
        const naikKelas = formData.getAll('naik_kelas');

        const allPenilaian = [];

        for (let i = 0; i < dataSiswa.length; i++) {
            allPenilaian.push({
                id: idSiswa[i],
                sakit: sakit[i],
                izin: izin[i],
                tanpa_keterangan: tanpaKeterangan[i],
                saran: saran[i],
                naik_kelas: naikKelas[i]
            });
        }

        axios.post(url_by_institute,
            {
                "processDefinitionId": role_guru_insert_absensi,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "data": allPenilaian
                        }
                    }
                ]
            },
            {
                "name": "page",
                "type": "string",
                "value": "1"
            }).then(function (response) {
            console.log(response)
            const resData = JSON.parse(response?.data?.variables[2]?.value)

            if (resData.code == true) {
                notification.success({
                    message: "Sukses",
                    description: "Nilai Absensi berhasil diinput.",
                    placement: "top",
                });
            } else {
                notification.error({
                    message: "Error",
                    description: "Error, harap hubungi admin EDII",
                    placement: "top",
                });
            }
        })
    };

    useEffect(() => {
        _getTingkatKelas();
    }, []);

    useEffect(() => {
        _getSubKelas();
    }, [selectedClass]);



    useEffect(() => {
        console.log('get data')
        console.log(selectedClass)
        console.log(selectedSubClass)
        _getDataSiswa();
    }, [selectedSubClass]);

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row pb-5">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="Input Nilai Absensi"
                                />
                            </div>
                        </div>
                        {dataSiswa == [] ? (
                            <DataNotFound/>
                        ) : (
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
                                { dataSiswa.length >= 1 ?
                                    <div className="col-lg-12 pt-3">
                                        <div className="table-responsive-xl">

                                            <form id='form_ekskul'>
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr className="bg-current text-light">
                                                        <th scope="col">Nama Siswa</th>
                                                        <th scope="col" className="text-center">
                                                            Sakit
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Izin
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Tanpa Keterangan
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Saran
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Naik Kelas
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
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="sakit"
                                                                        required
                                                                        defaultValue={value.sakit}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="izin"
                                                                        required
                                                                        defaultValue={value.izin}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="tanpa_keterangan"
                                                                        required
                                                                        defaultValue={value.tanpa_keterangan}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="saran"
                                                                        required
                                                                        defaultValue={value.saran}
                                                                    />
                                                                </td>
                                                                <td style={{maxWidth: "70px"}}>
                                                                    <select
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name="naik_kelas"
                                                                        defaultValue={value.naik_kelas}
                                                                    >
                                                                        {value.indicator_id == null ?
                                                                            <option value="" selected disabled>
                                                                                Naik Kelas
                                                                            </option> : <></>
                                                                        }
                                                                        <option value={true}>Ya</option>
                                                                        <option value={false}>Tidak</option>
                                                                    </select>
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
                                            </form>
                                            <div className="mt-5 float-right">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    onClick={_submitPenilaian}
                                                >
                                                    Submit Nilai
                                                </button>
                                                <a
                                                    onClick={() => window.history.back()}
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </a>
                                            </div>
                                        </div>
                                    </div> : <DataNotFound />
                                }
                            </div>
                        )}
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}
