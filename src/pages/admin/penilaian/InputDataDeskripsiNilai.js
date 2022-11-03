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
import {get_input_deskripsi, input_data_deskripsi, url_by_institute} from "../../../api/reference";

function InputDataDeskripsiNilai() {
    const userId = localStorage.getItem("user_id");
    const institute = localStorage.getItem('institute');
    const academic = localStorage.getItem('academic_year');

    const [deskripsiNilai, setDeskripsiNilai] = useState(null)
    console.log(JSON.stringify(deskripsiNilai, null, 2));

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
                            "id_class": data.id_class_filter,
                            "id_academic": academic,
                            "id_matpel": data.id_mapel_filter
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
                        <GetMapelKelas valueFilter={(e) => _getDataDeskripsiNilai(e)} />
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
                                                <th scope="col">Nilai Pengetahuan</th>
                                                <th scope="col">Deskripsi Pengetahuan</th>
                                                <th scope="col">Nilai Keterampilan</th>
                                                <th scope="col">Deskripsi Keterampilan</th>
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
                                                                <td className="text-center" >
                                                                    {/* <input name="nilai_pengetahuan" defaultValue={siswa?.data[0]?.given_value} /> */}
                                                                    {siswa?.data[0]?.given_value}
                                                                </td>
                                                                <td>
                                                                    <textarea
                                                                        className="form-control"
                                                                        aria-label="Default"
                                                                        name='deskripsi_pengetahuan'
                                                                        defaultValue={siswa?.data[0]?.given_description}
                                                                    />
                                                                </td>
                                                                <td className="text-center">
                                                                    {/* <input name="nilai_keterampilan" defaultValue={siswa?.data[1]?.given_value} /> */}
                                                                    {siswa?.data[1]?.given_value}
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

export default InputDataDeskripsiNilai;