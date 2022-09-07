import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {DataNotFound} from "../../../components/misc/DataNotFound";
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import {PageHeader} from "antd";


export default function InputNilaiEkskul() {
    const academic = localStorage.getItem("academic_year");
    const [dataKelas, setDataKelas] = useState([]);
    const [selectedClass, setSelectedClass,] = useState(null)

    const _getDataKelas = () => {
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_get_where",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_class",
                                "pagination": false,
                                "total_result": 2,
                                "order_coloumn": "x_academic_class.class",
                                "order_by": "asc",
                                "data": [
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    },
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "tbl_coloumn": [
                                    "*"
                                ]
                            }
                        }
                    ]
                },
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                },
                }
            )
            .then(function (response) {
                const data = JSON.parse(response.data.variables[2].value);
                setDataKelas(data);
            })
    }

    const dataSiswa = [
        {
            "id_student": 68,
            "nama_siswa": "Ahmad"
        },
        {
            "id_student": 69,
            "nama_siswa": "Najib"
        },
        {
            "id_student": 70,
            "nama_siswa": "Ilham"
        },
    ];

    const dataEkskul = [
        {
            "id_ekskul": 1,
            "nama_ekskul": "Basket"
        },
        {
            "id_ekskul": 2,
            "nama_ekskul": "Pramuka"
        },
        {
            "id_ekskul": 3,
            "nama_ekskul": "Sepak Bola"
        }
    ];

    const _submitPenilaian = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") {
                data[el.name] = el.value;
            }
        }
        console.log(data)
    }

    useEffect(() => {
        _getDataKelas()
    }, []);

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
                                    title="Input Nilai Ekstrakurikuler"
                                />
                            </div>
                        </div>
                        {dataSiswa == null ?
                            <DataNotFound/>
                            :
                            <form onSubmit={_submitPenilaian} method="POST">
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group mr-4">
                                            <select
                                                className="form-control"
                                                name="id_class_filter"
                                                onChange={(e) => setSelectedClass(e.target.value)}
                                            >
                                                <option value="" selected disabled>
                                                    Pilih Kelas
                                                </option>
                                                {dataKelas.map((data) => (
                                                    <option value={data.id}>{data.class} / {data.sub_class}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group ml-4">
                                            <select
                                                className="form-control"
                                                name="id_ekskul_filter"
                                                // onChange={(e) => _getCompetency(e)}
                                            >
                                                <option value="" selected disabled>
                                                    Pilih Nama Ekstrakurikuler
                                                </option>
                                                {dataEkskul.map((data) => (
                                                    <option value={data.id_ekskul}>{data.nama_ekskul}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 pt-3">
                                        <div className="table-responsive-xl">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr className='bg-current text-light'>
                                                    <th scope="col">Nama Siswa</th>
                                                    <th scope="col" className='text-center'>Predikat</th>
                                                    <th scope="col" className='text-center'>Deskripsi</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    dataSiswa.map((value) => (
                                                        <tr>
                                                            <th scope="row"
                                                                style={{lineHeight: 3.5, textTransform: 'capitalize'}}>
                                                                {value.nama_siswa}
                                                            </th>
                                                            <td style={{maxWidth: '70px'}}>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default"
                                                                    name={`${value.id_student}_1`}
                                                                >
                                                                    <option value="" selected disabled>
                                                                        Pilih Predikat
                                                                    </option>
                                                                    <option value="1">
                                                                        Sangat Kurang
                                                                    </option>
                                                                    <option value="2">
                                                                        Kurang
                                                                    </option>
                                                                    <option value="3">
                                                                        Cukup
                                                                    </option>
                                                                    <option value="4">
                                                                        Baik
                                                                    </option>
                                                                    <option value="5">
                                                                        Sangat Baik
                                                                    </option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name={`${value.id_student}_2`}
                                                                    placeholder="Tulis Deskripsi..."
                                                                    required
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="mt-5 float-right">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Simpan
                                                </button>
                                                <a
                                                    onClick={() => window.history.back()}
                                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}