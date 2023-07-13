import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {DataNotFound} from "../../../components/misc/DataNotFound";
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import {notification, PageHeader} from "antd";
import {
    get_data_siswa_penilaian_kesehatan,
    global_insert,
    global_join_sub_where_get, role_guru_get_sub_class, submit_fitur_penilaian_kesehatan,
    url_by_institute,
} from "../../../api/reference";

export default function PenilaianKesehatan() {
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
                    "processDefinitionId": get_data_siswa_penilaian_kesehatan,
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
        const pendengaran = formData.getAll('pendengaran');
        const penglihatan = formData.getAll('penglihatan');
        const gigi = formData.getAll('gigi');
        const lainnya = formData.getAll('lainnya');
        const tinggibadan_smt1 = formData.getAll('tinggibadan_smt1');
        const beratbadan_smt1 = formData.getAll('beratbadan_smt1');
        const tinggibadan_smt2 = formData.getAll('tinggibadan_smt2');
        const beratbadan_smt2 = formData.getAll('beratbadan_smt2');

        const allPenilaian = [];

        for (let i = 0; i < dataSiswa.length; i++) {
            allPenilaian.push({
                id: idSiswa[i],
                pendengaran: pendengaran[i],
                penglihatan: penglihatan[i],
                gigi: gigi[i],
                lainnya: lainnya[i],
                tinggi_badan_semester1: tinggibadan_smt1[i],
                berat_badan_semester1: beratbadan_smt1[i],
                tinggi_badan_semester2: tinggibadan_smt2[i],
                berat_badan_semester2: beratbadan_smt2[i]
            });
        }

        axios.post(url_by_institute,
            {
                "processDefinitionId": submit_fitur_penilaian_kesehatan,
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
                    description: "Kondisi Kesehatan berhasil diinput.",
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
                                    title="Input Kondisi Kesehatan"
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
                                                            Pendengaran
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Penglihatan
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Gigi
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Lainnya
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Tinggi Badan (Smt 1)
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Berat Badan (Smt 1)
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Tinggi Badan (Smt 2)
                                                        </th>
                                                        <th scope="col" className="text-center">
                                                            Berat Badan (Smt 2)
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
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="pendengaran"
                                                                        required
                                                                        defaultValue={value.pendengaran}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="penglihatan"
                                                                        required
                                                                        defaultValue={value.penglihatan}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="gigi"
                                                                        required
                                                                        defaultValue={value.gigi}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="lainnya"
                                                                        required
                                                                        defaultValue={value.lainnya}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="tinggibadan_smt1"
                                                                        required
                                                                        defaultValue={value.tinggi_badan_semester1}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="beratbadan_smt1"
                                                                        required
                                                                        defaultValue={value.berat_badan_semester1}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="tinggibadan_smt2"
                                                                        required
                                                                        defaultValue={value.tinggi_badan_semester2}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="beratbadan_smt2"
                                                                        required
                                                                        defaultValue={value.berat_badan_semester2}
                                                                    />
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
