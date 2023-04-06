import axios from "axios";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProcessId } from "../../../redux/Action";
import { PageHeader, notification, Select, Card, Row, Table, Input } from "antd"
import { GetMapelKelas } from "../../../components/filter/GetMapelKelas";
import { DataNotFound } from "../../../components/misc/DataNotFound";
import {
    get_input_deskripsi,
    global_join_sub_where_get,
    input_data_deskripsi, role_guru_get_sub_class,
    url_by_institute
} from "../../../api/reference";
import { GetMapelKelasGuru } from "../../../components/filter/GetMapelKelasGuru";

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
    console.log(JSON.stringify(deskripsiNilai, null, 2));

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
            "processDefinitionId": "rolegurugetprestasi:1:9b31c4ff-d1d6-11ed-953f-d2e8b005a012",
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
                console.log(data)
            })
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    const _getDataDeskripsiNilai = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
        axios.post(url_by_institute,
            {
                "processDefinitionId": get_input_deskripsi,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_class": data.id_class_filter, // 86 untuk test data.id_class_filter
                            "id_academic": academic,
                            "id_matpel": data.id_mapel_filter // 219 untuk test data.id_mapel_filter
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
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            // console.log(dataRes.siswa);
            setDeskripsiNilai(dataRes?.siswa)

            // if (dataRes[0].data.length >= 2) {
            //     setDeskripsiNilai(dataRes?.siswa)
            //     notification.success({
            //         message: "Data Ditemukan",
            //         description: "Data Dapat dilihat dalam table",
            //         placement: 'top'
            //     })
            // } else {
            //     setDeskripsiNilai(null)
            //     notification.info({
            //         message: "Not Found",
            //         description: "Data tidak ditemukan",
            //         placement: 'top'
            //     })
            // }

        }, [academic])
    }

    const _submitNilai = (e) => {
        const formCV = document.querySelector('#form_deskripsi');
        const formData = new FormData(formCV);

        const deskripsiPengetahuan = formData.getAll('deskripsi_pengetahuan');
        const deskripsiKeterampilan = formData.getAll('deskripsi_keterampilan');
        const nilaiPengetahuan = formData.getAll('nilai_pengetahuan')
        const nilaiKeterampilan = formData.getAll('nilai_keterampilan')

        const allDeskripsi = [];
        console.log(allDeskripsi);
        const Pengetahuan = [];
        const Keterampilan = [];

        for (let i = 0; i < deskripsiPengetahuan.length; i++) {
            Pengetahuan.push(
                {
                    // "assessment_header_id": 102,
                    "id_aspect": 1,
                    "competence_aspect": "Pengetahuan",
                    "given_description": deskripsiPengetahuan[i]
                },
            );
        }
        for (let i = 0; i < deskripsiPengetahuan.length; i++) {
            Keterampilan.push(
                {
                    // "assessment_header_id": 102,
                    "id_aspect": 2,
                    "competence_aspect": "Keterampilan",
                    "given_description": deskripsiKeterampilan[i]
                },
            );
        }
        const checkDataFunc = () => {
            let checkData1 =[];
            deskripsiNilai.map((dd, i) => {
                if (dd.data.length != 0) {
                    checkData1.push('ada')
                } else {
                    checkData1.push('kosong')

                }
            })
            return !checkData1.includes('kosong');
        }
        // console.log(checkDataFunc());

        if (checkDataFunc()) {
            deskripsiNilai.map((siswa, i) => {
                allDeskripsi.push(
                    {
                        "nama_siswa": siswa.nama_siswa,
                        "id_siswa": siswa.id_siswa,
                        "data": [
                            {
                                ...Pengetahuan[i],
                                "given_value": siswa?.data[0]?.given_value,
                                "assessment_header_id": siswa?.data[0]?.assessment_header_id,

                            },
                            {
                                ...Keterampilan[i],
                                "given_value": siswa?.data[1]?.given_value,
                                "assessment_header_id": siswa?.data[0]?.assessment_header_id,
                            }
                        ]
                    },
                );
            });
        }

        console.log(JSON.stringify(allDeskripsi, null, 2));

        if (checkDataFunc()) {
            axios
                .post(
                    url_by_institute, {
                        "processDefinitionId": input_data_deskripsi,
                        "returnVariables": true,
                        "variables": [
                            {
                                "name": "get_data",
                                "type": "json",
                                "value": {
                                    "created_by": userId,
                                    "siswa":
                                    allDeskripsi,
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
                    // console.log(dataRes);
                    const resCode = dataRes.code;
                    // console.log(resCode);
                    if (resCode === true) {
                        notification.success({
                            message: "Sukses",
                            description: "Deskripsi nilai berhasil di input",
                            placement: 'top'
                        })
                    } else {
                        notification.info({
                            message: "Gagal",
                            description: "Deskripsi nilai tidak berhasil di input",
                            placement: 'top'
                        })
                    }
                })
        } else {
            console.log("data ada yang kosong");
            notification.info({
                message: "Gagal Simpan data",
                description: "Data ada yang kosong",
                placement: 'top'
            })
        }

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
                <Navheader />
                <div className="main-content">
                    <Appheader />
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
                        {deskripsiNilai == null || deskripsiNilai.length == 0 ?
                            <DataNotFound />
                            :
                            <form id="form_deskripsi">
                                <div className="mt-4">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className="bg-current text-light text-center">
                                            <th scope="col">No</th>
                                            <th scope="col">Nama Siswa</th>
                                            <th scope="col">Jenis Prestasi</th>
                                            <th scope="col">Keterangan</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {deskripsiNilai?.map((siswa, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">
                                                        {index + 1}
                                                    </td>
                                                    <th className="text-center">
                                                        {siswa.nama_siswa}
                                                    </th>
                                                    {siswa?.data == null || siswa.data.length == 0 ? (
                                                        <>
                                                            <td className="text-center">

                                                            </td>
                                                            <td>
                                                                    <textarea
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name='deskripsi_pengetahuan'
                                                                    />
                                                            </td>
                                                            <td className="text-center">

                                                            </td>
                                                            <td>
                                                                    <textarea
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name='deskripsi_keterampilan'
                                                                    />
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td>
                                                                    <textarea
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name='deskripsi_pengetahuan'
                                                                        defaultValue={siswa?.data[0]?.given_description}
                                                                    />
                                                            </td>
                                                            <td>
                                                                    <textarea
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name='deskripsi_keterampilan'
                                                                        defaultValue={siswa?.data[1]?.given_description}
                                                                    />
                                                            </td>
                                                        </>
                                                    )}

                                                </tr>
                                            )
                                        })}

                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        }
                        <div className="col-lg-12 mt-5 mb-5 d-flex justify-content-end">
                            <button
                                className="bg-current border-0 text-center text-white font-xsss p-3 fw-600 w150 rounded-xl d-inline-block mr-2 mt-5"
                                type="submit"
                                onClick={_submitNilai}
                            >
                                Simpan
                            </button>
                            <button
                                className="bg-lightblue border-0 text-center font-xsss fw-600 p-3 w150 rounded-xl d-inline-block mt-5"
                                onClick={() => setDeskripsiNilai(null)}
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default PenilaianPrestasi;