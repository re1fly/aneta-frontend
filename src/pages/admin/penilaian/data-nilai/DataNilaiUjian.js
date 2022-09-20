import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {Badge, Descriptions, notification, PageHeader, Space, Table, Tag} from "antd";
import axios from "axios";
import {BASE_URL} from "../../../../api/Url";
import {GetMapelKelas} from "../../../../components/filter/GetMapelKelas";
import {DataNotFound} from "../../../../components/misc/DataNotFound";

function DataNilaiUjian() {
    const academic = localStorage.getItem("academic_year");
    const [dataSiswa, setDataSiswa] = useState(null)
    const [headerId, setHeaderId] = useState(null)

    const _getDataSiswa = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios
            .post(
                BASE_URL, {
                    "processDefinitionId": "getInputNilaiPTSdanPAS:1:93ef96eb-2cd2-11ed-aacc-9a44706f3589",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": {
                                "academic_year_id": academic,
                                "class_id": data.id_class_filter,
                                "subjects_id": data.id_mapel_filter,
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
                if (response.data.variables[2].value == "") {
                    setDataSiswa(null)
                    setHeaderId(null)
                    notification.info({
                        message: "Not Found",
                        description: "Data tidak ditemukan",
                        placement: 'top'
                    })
                } else {
                    const dataRes = JSON.parse(response.data.variables[2].value);
                    const resCode = dataRes?.status;
                    const dataSiswa = dataRes?.data;
                    console.log(dataSiswa)
                    const header = dataRes?.header_id;

                    if (resCode === 200) {
                        setDataSiswa(dataSiswa);
                        setHeaderId(header)
                        notification.success({
                            message: "Data Ditemukan",
                            description: "Data Dapat dilihat dalam table",
                            placement: 'top'
                        })
                    } else {
                        setDataSiswa(null)
                        notification.info({
                            message: "Not Found",
                            description: "Data tidak ditemukan",
                            placement: 'top'
                        })
                    }
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
            let type_score = e.split("_")[1]
            return (
                {
                    assessment_header_id: headerId,
                    exam_type_id: type_score,
                    given_value: o[e],
                    student_id: id_student,
                }
            )
        });
        console.log(splitObject(data))
        if (splitObject(data).length < 1) {
            notification.error({
                message: "Data Kosong",
                description: "Mohon pilih kelas dan mata pelajaran terlebih dahulu, lalu input penilaian.",
                placement: 'top'
            })
        } else {
            axios
                .post(
                    BASE_URL, {
                        "processDefinitionId": "insertinputnilaiptsdanpas:1:c0ddd117-2cd2-11ed-aacc-9a44706f3589",
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
                    },
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
                    console.log(response)

                    if (resCode === true) {
                        notification.success({
                            message: "Sukses",
                            description: "Data Penilaian berhasil di input",
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


    }

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
                                    title="Input Nilai PTS dan PAS"
                                />
                            </div>
                        </div>

                        <GetMapelKelas valueFilter={(e) => _getDataSiswa(e)}/>
                        {dataSiswa == null ?
                            <DataNotFound/>
                            :
                            <form onSubmit={_submitPenilaian} method="POST">
                                <div className="row">
                                    <div className="col-lg-12 pt-3">
                                        <div className="table-responsive-xl">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr className='bg-current text-light'>
                                                    <th scope="col">Nama Siswa</th>
                                                    <th scope="col" className='text-center'>PTS</th>
                                                    <th scope="col" className='text-center'>PAS</th>
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
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name={`${value.id_student}_1`}
                                                                    placeholder="input nilai (contoh : 75)"
                                                                    required
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name={`${value.id_student}_2`}
                                                                    placeholder="input nilai (contoh : 75)"
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

export default DataNilaiUjian;