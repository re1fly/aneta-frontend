import axios from "axios";
import { BASE_URL } from "../../../api/Url";

import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProcessId } from "../../../redux/Action";
import { PageHeader, notification, Select, Card, Row, Table, Input } from "antd"
import { DataNotFound } from "../../../components/misc/DataNotFound";

function InputDataDeskripsiSikap() {
    const userId = localStorage.getItem("user_id");
    const institute = localStorage.getItem('institute');
    const academic = localStorage.getItem('academic_year');

    const [getKelas, setGetKelas] = useState([]);
    const [selectClass, setSelectClass] = useState([]);
    const [deskripsiSikap, setDeskripsiSikap] = useState([])
    // console.log(JSON.stringify(deskripsiSikap, null, 2));
    const [refreshState, setRefreshState] = useState(false);

    const dispatch = useDispatch();
    const getProcess = useSelector(state => state.processId);
    let ProcessId = getProcess.DataProcess;
    let getKeyGlobalJoin;

    useEffect(() => {
        dispatch(getProcessId(["globaljoinsubwhereget"]))
    }, [])

    useEffect(() => {
            axios.post(BASE_URL,
                {
                    "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_class",
                                "select": [
                                    "x_academic_class.id",
                                    "r_class_type.class_type as class",
                                    "x_academic_class.sub_class"
                                ],
                                "paginate": false,
                                "join": [
                                    {
                                        "tbl_join": "r_class_type",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_class",
                                        "foregenkey": "class"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    }, {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_academic_class.id",
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
                }
            }
            ).then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[3]?.value);
                setGetKelas(dataRes?.data);
            })
    }, [academic])

    const _getDataDeskripsiSikap = () => {
        axios.post(BASE_URL,
            {
                "processDefinitionId": "inputdeskripsisikapraport:1:2a35f330-146e-11ed-ac5e-66fc627bf211",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_class": selectClass,
                            "id_academic": academic
                        }
                    }
                ]
            }
        ).then(function (response) {
            // console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            const dataSikap = dataRes?.siswa
            const resCode = dataRes?.code;
            // console.log(dataRes);
            // console.log(resCode);

            if (resCode == true) {
                setDeskripsiSikap(dataSikap);
                notification.success({
                    message: "Data Ditemukan",
                    description: "Data Dapat dilihat dalam table",
                    placement: 'top'
                })
                // console.log(dataSikap.length);
            } else {
                setDeskripsiSikap([]);
                notification.info({
                    message: "Not Found",
                    description: "Data tidak ditemukan",
                    placement: 'top'
                })
                // console.log(dataSikap.length);
            }
        })
    }

    // useEffect(() => {
    //     axios.post(BASE_URL,
    //         {
    //             "processDefinitionId": "inputdeskripsisikapraport:1:2a35f330-146e-11ed-ac5e-66fc627bf211",
    //             "returnVariables": true,
    //             "variables": [
    //                 {
    //                     "name": "get_data",
    //                     "type": "json",
    //                     "value": {
    //                         "id_class": selectClass,
    //                         "id_academic": academic
    //                     }
    //                 }
    //             ]
    //         }
    //     ).then(function (response) {
    //         const dataRes = JSON.parse(response?.data?.variables[2]?.value);
    //         const dataSikap = dataRes?.siswa
    //         const resCode = dataRes?.code;
    //         // console.log(resCode);

    //         if (resCode === true) {
    //             setDeskripsiSikap(dataSikap);
    //             notification.success({
    //                 message: "Data Ditemukan",
    //                 description: "Data Dapat dilihat dalam table",
    //                 placement: 'top'
    //             })
    //         } else {
    //             setDeskripsiSikap(null);
    //             notification.info({
    //                 message: "Not Found",
    //                 description: "Data tidak ditemukan",
    //                 placement: 'top'
    //             })
    //         }
    //     })
    // }, [selectClass, academic])

    const _submitNilai = (e) => {
        const formCV = document.querySelector('#form_deskripsi');
        const formData = new FormData(formCV);

        const predikatSosial = formData.getAll('predikat_sosial');
        const deskripsiSosial = formData.getAll('deskripsi_sosial');
        const predikatSpiritual = formData.getAll('predikat_spiritual');
        const deskripsiSpiritual = formData.getAll('deskripsi_spiritual');

        const allDeskripsi = [];
        const Spritual = [];
        const Sosial = [];
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
        for (let i = 0; i < predikatSosial.length; i++) {
            Spritual?.push(
                {
                    "competence_aspect": "Sikap Spiritual",
                    "id_aspect": 3,
                    "indicator_name": filterIndicator(predikatSpiritual[i]),
                    "id_indikator": predikatSpiritual[i],
                    "given_desc": deskripsiSpiritual[i]
                },
            );
        }
        for (let i = 0; i < predikatSosial.length; i++) {
            Sosial?.push(

                {
                    "competence_aspect": "Sikap Sosial",
                    "id_aspect": 4,
                    "indicator_name": filterIndicator(predikatSosial[i]),
                    "id_indikator": predikatSosial[i],
                    "given_desc": deskripsiSosial[i]
                },
            );
        }

        deskripsiSikap.map((siswa, i) => {
            allDeskripsi?.push(
                {
                    "id_academic": academic,
                    "nama_siswa": siswa.nama_siswa,
                    "id_siswa": siswa.id_siswa,
                    "id_class": siswa.id_class,
                    "data": [
                        Spritual[i],
                        Sosial[i]
                    ]
                },
            );
        });
        console.log(allDeskripsi)

        axios
            .post(
                BASE_URL, {
                "processDefinitionId": "cb03c73a-148d-11ed-ac5e-66fc627bf211",
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
                    },
                }
            )
            .then(function (response) {
                console.log(response)
                const dataRes = JSON.parse(response.data.variables[2].value);
                const resCode = dataRes.status;
                if (resCode === true) {
                    notification.success({
                        message: "Sukses",
                        description: "Deskripsi sikap berhasil di input",
                        placement: 'top'
                    })
                } else {
                    notification.info({
                        message: "Gagal",
                        description: "Deskripsi sikap tidak berhasil di input",
                        placement: 'top'
                    })
                }
            })
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
                            title="Input Data Deskripsi Sikap (Rapor)"
                        />
                        <form
                            id="form_deskripsi">
                            <div className="row d-flex align-items-center">
                                <div className="col-lg-10">
                                    <Card className="shadow-md my-6 rounded">
                                        <Row>
                                            <select style={{ width: '100%' }}
                                                name="select_class"
                                                className='600 h35'
                                                onChange={(e) => setSelectClass(e.target.value)}
                                            >
                                                <option selected disabled>
                                                    Pilih Kelas
                                                </option>
                                                {getKelas.map((data, i) => {
                                                    return (
                                                        <>
                                                            <option value={data.id}>
                                                                {`${data.class} / ${data.sub_class}`}
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </select>
                                        </Row>
                                    </Card>
                                </div>
                                <div className="col-lg-2">
                                    <button
                                        className="bg-current border-0 text-center text-white font-xs fw-600 p-2 w150 rounded-xl d-inline-block"
                                        type="button"
                                        onClick={_getDataDeskripsiSikap}
                                    >
                                        Proses
                                    </button>
                                </div>
                            </div>
                            {deskripsiSikap.length == 0 ?
                                <DataNotFound />
                                :
                                <div className="mt-4">
                                    <div className="table-custom mb-0">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr className="bg-current text-light text-center">
                                                    <th scope="col">No</th>
                                                    <th scope="col">Nama Siswa</th>
                                                    <th scope="col">Predikat Sikap Sosial</th>
                                                    <th scope="col">Deskripsi Sikap Sosial</th>
                                                    <th scope="col">Predikat Sikap Spiritual</th>
                                                    <th scope="col">Deskripsi Sikap Spiritual</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {deskripsiSikap?.map((siswa, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <th scope="row" className="text-center">
                                                                    <span name="nama_siswa">{siswa.nama_siswa}</span>
                                                                </th>
                                                                {siswa?.data == null ? (
                                                                    <>
                                                                        <td className="text-center">
                                                                            <select
                                                                                className="form-control"
                                                                                aria-label="Default"
                                                                                name='predikat_sosial'
                                                                            >
                                                                                <option value="" disabled selected>
                                                                                    Pilih Predikat
                                                                                </option>
                                                                                <option value="1" >
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
                                                                            <textarea
                                                                                className="form-control "
                                                                                aria-label="Default"
                                                                                name='deskripsi_sosial'
                                                                            />
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <select
                                                                                className="form-control"
                                                                                aria-label="Default"
                                                                                name='predikat_spiritual'
                                                                            >
                                                                                <option value="" disabled selected>
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
                                                                            <textarea
                                                                                className="form-control "
                                                                                aria-label="Default"
                                                                                name='deskripsi_spiritual'
                                                                            />
                                                                        </td>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <td className="text-center">
                                                                            <select
                                                                                className="form-control"
                                                                                aria-label="Default"
                                                                                name='predikat_sosial'
                                                                            >
                                                                                <option value="" disabled selected={siswa?.data[1].id_indikator == 0 ? true : false}>
                                                                                    Pilih Predikat
                                                                                </option>
                                                                                <option value="1" selected={siswa?.data[1].id_indikator == 1 ? true : false}>
                                                                                    Sangat Kurang
                                                                                </option>
                                                                                <option value="2" selected={siswa?.data[1].id_indikator == 2 ? true : false}>
                                                                                    Kurang
                                                                                </option>
                                                                                <option value="3" selected={siswa?.data[1].id_indikator == 3 ? true : false}>
                                                                                    Cukup
                                                                                </option>
                                                                                <option value="4" selected={siswa?.data[1].id_indikator == 4 ? true : false}>
                                                                                    Baik
                                                                                </option>
                                                                                <option value="5" selected={siswa?.data[1].id_indikator == 5 ? true : false}>
                                                                                    Sangat Baik
                                                                                </option>
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <textarea
                                                                                className="form-control "
                                                                                aria-label="Default"
                                                                                name='deskripsi_sosial'
                                                                                defaultValue={siswa?.data[1]?.given_desc}
                                                                            />
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <select
                                                                                className="form-control"
                                                                                aria-label="Default"
                                                                                name='predikat_spiritual'
                                                                            >
                                                                                <option value="" disabled selected={siswa?.data[0].id_indikator == 0 ? true : false}>
                                                                                    Pilih Predikat
                                                                                </option>
                                                                                <option value="1" selected={siswa?.data[0].id_indikator == 1 ? true : false}>
                                                                                    Sangat Kurang
                                                                                </option>
                                                                                <option value="2" selected={siswa?.data[0].id_indikator == 2 ? true : false}>
                                                                                    Kurang
                                                                                </option>
                                                                                <option value="3" selected={siswa?.data[0].id_indikator == 3 ? true : false}>
                                                                                    Cukup
                                                                                </option>
                                                                                <option value="4" selected={siswa?.data[0].id_indikator == 4 ? true : false}>
                                                                                    Baik
                                                                                </option>
                                                                                <option value="5" selected={siswa?.data[0].id_indikator == 5 ? true : false}>
                                                                                    Sangat Baik
                                                                                </option>
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <textarea
                                                                                className="form-control "
                                                                                aria-label="Default"
                                                                                name='deskripsi_spiritual'
                                                                                defaultValue={siswa?.data[0]?.given_desc}
                                                                            />
                                                                        </td>
                                                                    </>
                                                                )}
                                                            </tr>
                                                        </>

                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-lg-12 mt-5 mb-5 d-flex justify-content-end">
                                        <button
                                            className="bg-current border-0 text-center text-white font-xsss p-3 fw-600 w150 rounded-xl d-inline-block mr-2 mt-5"
                                            type="button"
                                            onClick={_submitNilai}
                                        >
                                            Simpan
                                        </button>
                                        <button
                                            className="bg-lightblue border-0 text-center font-xsss fw-600 p-3 w150 rounded-xl d-inline-block mt-5"
                                            onClick={() => setDeskripsiSikap([])}
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default InputDataDeskripsiSikap;