import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {notification, PageHeader} from "antd";
import {GetMapelKelas} from "../../../../components/filter/GetMapelKelas";
import axios from "axios";
import "../../../../style/custom.css";
import {DataNotFound} from "../../../../components/misc/DataNotFound";
import {get_data_kompetens_nilai_spiritual, input_nilai_spiritual, url_by_institute} from "../../../../api/reference";
import { GetMapelKelasGuru } from "../../../../components/filter/GetMapelKelasGuru";

function GuruDataNilaiSpiritual() {
    const academic = localStorage.getItem("academic_year");
    const userId = localStorage.getItem("user_id");
    const [dataSiswa, setDataSiswa] = useState(null)
    const [jmlKompetensi, setJmlKompetensi] = useState(null)

    const _getDataSiswa = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios
            .post(
                url_by_institute, {
                    "processDefinitionId": get_data_kompetens_nilai_spiritual,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": {
                                "academic_year_id": academic,
                                "class_id": data.id_class_filter,
                                "subjects_id": data.id_mapel_filter,
                                "competence_aspect_id": 3
                            }
                        }
                    ]
                }
                ,
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                },
                }
            )
            .then(function (response) {
                const dataRes = JSON.parse(response.data.variables[2].value);
                const resCode = dataRes.status;
                const dataSiswa = dataRes?.data?.siswa;
                const kompetensi = dataRes?.data?.kompetensi;

                if (resCode === 200) {
                    setJmlKompetensi(kompetensi)
                    setDataSiswa(dataSiswa);
                    notification.success({
                        message: "Data Ditemukan",
                        description: "Data Dapat dilihat dalam table",
                        placement: 'top'
                    })
                } else {
                    setDataSiswa(null);
                    notification.info({
                        message: "Not Found",
                        description: "Data tidak ditemukan",
                        placement: 'top'
                    })
                }
            })
    }

    const _submitPenilaian = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") {
                data[el.name] = el.value;
            }
        }

        const splitObject = o => Object.keys(o).map(e => {
            let id_student = e.split("_")[0]
            let id_input = e.split("_")[1]
            return (
                {
                    id_check: id_input,
                    student_id: id_student,
                    indicator_id: o[e],
                    created_by: userId
                }
            )
        });

        axios
            .post(
                url_by_institute, {
                    "processDefinitionId": input_nilai_spiritual,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": {
                                "data": splitObject(data)
                            }
                        }
                    ]
                }
                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            )
            .then(function (response) {
                const dataRes = JSON.parse(response.data.variables[2].value);
                const resCode = dataRes.code;

                if (resCode === true) {
                    notification.success({
                        message: "Sukses",
                        description: "Data Penilaian Spiritual berhasil di input",
                        placement: 'top'
                    })
                } else {
                    notification.info({
                        message: "Gagal",
                        description: "Silahkan hubungi Admin",
                        placement: 'top'
                    })
                }
            })

    }

    return (
        <Fragment>
            <div className="main-wrapper custom-table">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row pb-5">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="Input Nilai Spiritual"
                                />
                            </div>
                        </div>
                        <GetMapelKelasGuru valueFilter={(e) => _getDataSiswa(e)}/>
                        {dataSiswa == null ?
                            <DataNotFound/>
                            :
                            <form onSubmit={_submitPenilaian} method="POST">
                                <div className="row">
                                    <div className="col-lg-12 pt-3">
                                        <div className="table-custom">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr className='bg-current text-light'>
                                                    <th scope="col" rowSpan={2}
                                                        style={{textAlign: 'center', verticalAlign: 'middle'}}>Nama
                                                        Siswa
                                                    </th>
                                                    <th scope="col" colSpan={jmlKompetensi == null ? 1 :
                                                        jmlKompetensi.length} className='text-center'>Kompetensi Dasar /
                                                        Indikator Sikap Spiritual
                                                    </th>
                                                </tr>
                                                <tr className='bg-current text-light'>
                                                    {
                                                        jmlKompetensi.map((item, index) => (
                                                            <th scope="col"
                                                                className='text-center text-capitalize'>{item.competence_desc}</th>
                                                        ))}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    dataSiswa.map((value) => (
                                                        <tr>
                                                            <th scope="row"
                                                                style={{
                                                                    lineHeight: 3.5,
                                                                    textTransform: 'capitalize'
                                                                }}>{value.nama_siswa}</th>
                                                            {
                                                                jmlKompetensi.map((item, index) => {
                                                                    return (
                                                                        <td>
                                                                            <select
                                                                                className="form-control"
                                                                                aria-label="Default"
                                                                                name={`${value.id_student}_${item.id_check}`}
                                                                                required
                                                                            >
                                                                                <option value="">
                                                                                    Pilih Penilaian
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
                                                                    )
                                                                })
                                                            }
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
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
                            </form>
                        }
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default GuruDataNilaiSpiritual;