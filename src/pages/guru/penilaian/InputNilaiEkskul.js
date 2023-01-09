import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {DataNotFound} from "../../../components/misc/DataNotFound";
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import {notification, PageHeader, Spin} from "antd";
import {
    get_input_nilai_extra_kurikuler,
    global_join_sub_where_get,
    insert_input_deskripsi_raport, insert_or_update_nilai_extra_kurikuler, role_guru_filter_class_extrakurikuler,
    url_by_institute
} from "../../../api/reference";
import {LoadingOutlined} from "@ant-design/icons";


export default function GuruInputNilaiEkskul() {
    const academic = localStorage.getItem("academic_year");
    const userId = localStorage.getItem("user_id");
    const [dataKelas, setDataKelas] = useState([]);
    const [dataEkskul, setDataEkskul] = useState([])
    const [dataSiswa, setDataSiswa] = useState([])
    const [selectedClass, setSelectedClass,] = useState(null)
    const [rerender, setRerender] = useState(false);
    const [selectedEkskul, setSelectedEkskul] = useState(null)

    const _getDataKelas = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": role_guru_filter_class_extrakurikuler,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_user" : userId,
                            "id_academic" : academic
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setDataKelas(dataRes?.data);
        })
    }
    const _getDataEkskul = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_where_get,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_ekstrakurikuler_master",
                        "select": [
                            "x_ekstrakurikuler_master.id",
                            "x_ekstrakurikuler_master.name"
                        ],
                        "paginate": false,
                        "join": [
                            {
                                "tbl_join": "x_academic_year",
                                "refkey": "id",
                                "tbl_join2": "x_ekstrakurikuler_master",
                                "foregenkey": "academic_year_id"
                            },{
                                "tbl_join": "x_academic_teachers",
                                "refkey": "id",
                                "tbl_join2": "x_ekstrakurikuler_master",
                                "foregenkey": "teacher_id"
                            },{
                                "tbl_join": "users",
                                "refkey": "id",
                                "tbl_join2": "x_academic_teachers",
                                "foregenkey": "user_id"
                            }
                        ],
                        "kondisi": [
                            {
                                "keterangan": "deleted_at",
                                "kolom": "x_ekstrakurikuler_master.deleted_at"
                            }
                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_ekstrakurikuler_master",
                                "tbl_field": "academic_year_id",
                                "tbl_value": academic,
                                "operator": "="
                            },{
                                "tbl_coloumn": "users",
                                "tbl_field": "id",
                                "tbl_value": userId,
                                "operator": "="
                            }
                        ],
                        "order_coloumn": "x_ekstrakurikuler_master.name",
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
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const resData = JSON.parse(response.data.variables[3].value);
            setDataEkskul(resData.data)
            console.log('exs',response)
        })
    }
    const _getDataSiswa = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": get_input_nilai_extra_kurikuler,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_extrakurikuler": selectedEkskul,
                            "id_class": selectedClass
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const resData = JSON.parse(response.data.variables[2].value);
            setDataSiswa(resData.data)
            console.log(resData.data)
        })
    }

    const _submitPenilaian = (e) => {
        const formCV = document.querySelector('#form_nilai');
        const formData = new FormData(formCV);

        const predikatNilai = formData.getAll('predikat_nilai');
        const deskripsiNilai = formData.getAll('deskripsi_nilai');
        const idSiswa = formData.getAll('id_siswa');
        const idEkskul = formData.getAll('id_ekskul');

        const allNilai = []
        const filterIndicator = (val) => {
            let indicator = 0;
            if (val == '1') {
                indicator = "Sangat Kurang";
            } else if (val == '2') {
                indicator = "Kurang";
            } else if (val == '3') {
                indicator = "Cukup";
            } else if (val == '4') {
                indicator = "Baik";
            } else if (val == '5') {
                indicator = "Sangat Baik";
            }
            return indicator
        }

        for (let i = 0; i < predikatNilai.length; i++) {
            allNilai?.push(

                {
                    "id": idEkskul[i],
                    "indicator_name": filterIndicator(predikatNilai[i]),
                    "indicator_id" : predikatNilai[i],
                    "id_siswa": idSiswa[i],
                    "description": deskripsiNilai[i]
                },
            );
        }
        console.log(allNilai)
        if(allNilai.length < dataSiswa.length){
            notification.warning({
                message: "Harap Isi semua data",
                description: "Cek kembali form input data",
                placement: 'top'
            })
        }else if(allNilai.length >= dataSiswa.length){
            axios.post(url_by_institute, {
                    "processDefinitionId": insert_or_update_nilai_extra_kurikuler,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "data": allNilai
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
                    const resCode = dataRes.status;
                    if (resCode === 'success') {
                        notification.success({
                            message: "Sukses",
                            description: "Nilai Ekstarkurikuler berhasil di input",
                            placement: 'top'
                        })
                    } else {
                        notification.info({
                            message: "Gagal",
                            description: "Nilai Ekstrakurikuler tidak berhasil di input, hubungi admin EDII",
                            placement: 'top'
                        })
                    }
                })
        }
    }

    useEffect(() => {
        _getDataKelas()
        _getDataEkskul()
    }, []);

    useEffect(() => {
        setDataSiswa([{data: 'dummy'}])
        _getDataSiswa()
    }, [selectedClass, selectedEkskul]);

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

                        <form id='form_nilai'>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group mr-4">
                                        <select
                                            className="form-control"
                                            key="id_class_filter"
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                        >
                                            <option value="" selected disabled>
                                                Pilih Kelas
                                            </option>
                                            {dataKelas.map((data) => (
                                                <option value={data.id}>{data.class_type} / {data.sub_class}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group ml-4">
                                        <select
                                            className="form-control"
                                            key="id_ekskul_filter"
                                            onChange={(e) => setSelectedEkskul(e.target.value)}
                                        >
                                            <option value="" selected disabled>
                                                Pilih Nama Ekstrakurikuler
                                            </option>
                                            {dataEkskul.map((data) => (
                                                <option value={data.id}>{data.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {dataSiswa.length == 0 ?
                                    <DataNotFound/> : dataSiswa.length == 1 ? null
                                        :
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
                                                        dataSiswa.map((value, index) => {
                                                            console.log(value)
                                                            return(
                                                                <tr>
                                                                    <th scope="row"
                                                                        style={{lineHeight: 3.5, textTransform: 'capitalize'}}>
                                                                        {value.name}
                                                                    </th>
                                                                    <td style={{maxWidth: '70px'}}>
                                                                        <select
                                                                            className="form-control"
                                                                            aria-label="Default"
                                                                            name='predikat_nilai'
                                                                            required
                                                                        >
                                                                            <option value="" selected={value.indicator_id == null ? true : false} disabled>
                                                                                Pilih Predikat
                                                                            </option>
                                                                            <option value="1" selected={value.indicator_id == 1 ? true : false}>
                                                                                Sangat Kurang
                                                                            </option>
                                                                            <option value="2" selected={value.indicator_id == 2 ? true : false}>
                                                                                Kurang
                                                                            </option>
                                                                            <option value="3" selected={value.indicator_id == 3 ? true : false}>
                                                                                Cukup
                                                                            </option>
                                                                            <option value="4" selected={value.indicator_id == 4 ? true : false}>
                                                                                Baik
                                                                            </option>
                                                                            <option value="5" selected={value.indicator_id == 5 ? true : false}>
                                                                                Sangat Baik
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                    { rerender == false ?  <td>
                                                                    <textarea
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name='deskripsi_nilai'
                                                                        defaultValue={value.description == null ? '' : value.description}
                                                                        required
                                                                    />
                                                                        </td> :
                                                                        <td>
                                                                    <textarea
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name='deskripsi_nilai'
                                                                        defaultValue={value.description == null ? '' : value.description}
                                                                        required
                                                                    />
                                                                        </td>
                                                                    }
                                                                    <input
                                                                        type="hidden"
                                                                        className="form-control"
                                                                        name='id_ekskul'
                                                                        value={value.id}
                                                                    />
                                                                    <input
                                                                        type="hidden"
                                                                        className="form-control"
                                                                        name='id_siswa'
                                                                        value={value.id_siswa}
                                                                    />
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                                <div className="mt-5 float-right">
                                                    <button
                                                        className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                        type="button"
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
                                        </div>
                                }
                            </div>
                        </form>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}