import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Badge, Descriptions, notification, PageHeader, Space, Table, Tag} from "antd";
import axios from "axios";
import {BASE_URL} from "../../../../api/Url";
import {DataNotFound} from "../../../../components/misc/DataNotFound";


function NilaiSpiritual() {
    const academic = localStorage.getItem("academic_year");
    const userId = localStorage.getItem("user_id");
    const [dataMapel, setDataMapel] = useState([]);
    const [dataKelas, setDataKelas] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [dataKompetensi, setDataKompetensi] = useState([]);
    const [totalPenilaian, setTotalPenilaian] = useState(0);
    const [selectedClass, setSelectedClass] = useState(null)

    const _getDataMapel = () => {
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_subject_master",
                                "select" : [
                                    "x_academic_subjects.id as id_subject",
                                    "x_academic_subject_master.nama_mata"
                                ],
                                "paginate": 1000,
                                "join": [
                                    {
                                        "tbl_join": "x_academic_year",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_subject_master",
                                        "foregenkey": "academic_year_id"
                                    },{
                                        "tbl_join": "x_academic_subjects",
                                        "refkey": "academic_subjects_master_id",
                                        "tbl_join2": "x_academic_subject_master",
                                        "foregenkey": "id"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_subjects",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },{
                                        "tbl_coloumn": "x_academic_subjects",
                                        "tbl_field": "course_grade_id",
                                        "tbl_value": selectedClass,
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },{
                                        "tbl_coloumn": "x_academic_subject_master",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },{
                                        "tbl_coloumn": "x_academic_subjects",
                                        "tbl_field": "course_grade_id",
                                        "tbl_value": "",
                                        "operator": "!=",
                                        "kondisi" : "where"
                                    }
                                ],
                                "order_coloumn": "x_academic_subject_master.nama_mata",
                                "order_by": "desc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
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
                const dataMapelApi = JSON.parse(response.data.variables[3].value);
                const getMapel = dataMapelApi.data.data

                setDataMapel(getMapel);
            })
    }
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
                    },
                }
            )
            .then(function (response) {
                const data = JSON.parse(response.data.variables[2].value);
                setDataKelas(data);
            })
    }
    const _getCompetency = (e) => {
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_competence_detail",
                                "select": [
                                    "x_competence_detail.id as id_detail",
                                    "x_competence_detail.competence_desc"

                                ],
                                "paginate": 1000,
                                "join": [
                                    {
                                        "tbl_join": "x_competence",
                                        "refkey": "id",
                                        "tbl_join2": "x_competence_detail",
                                        "foregenkey": "competence_id"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_competence",
                                        "tbl_field": "academic_courses_id",
                                        "tbl_value": e.target.value,
                                        "operator": "="
                                    }, {
                                        "tbl_coloumn": "x_competence_detail",
                                        "tbl_field": "competence_aspect_id",
                                        "tbl_value": "3",
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_competence_detail.competence_desc",
                                "order_by": "asc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
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
                const competency = JSON.parse(response.data.variables[3].value);
                const allCompetency = competency.data.data
                setDataKompetensi(allCompetency);
                if(allCompetency.length == 0){
                    setTotalPenilaian(0)
                }else{
                    setTotalPenilaian(1)
                }
            })
    }

    const _submitNilai = (e) => {
        const formCV = document.querySelector('#form_perencanaan_spiritual');
        const formData = new FormData(formCV);

        let elementKompetensi= document.querySelectorAll("#form_perencanaan_spiritual input[type=checkbox]")

        for (let index = 0; index < elementKompetensi.length; index++) {
            if (elementKompetensi.value === "")
                elementKompetensi = elementKompetensi.value[index]
        }
        const boxKompetensi = Array.from(elementKompetensi)

        const allCompetency = boxKompetensi.map(el => {
            return {
                detail_id: el.id.split("_")[1],
                penilaian: el.id.split("_")[2],
                check: el.checked
            }
        })

        const classId = formData.get('id_class_filter');
        const subjectId = formData.get('id_mapel_filter');

        const insertToApi = {
            academic_id: academic,
            class_id: classId,
            subjects_id: subjectId,
            created_by: userId,
            jumlah_penilaian: totalPenilaian,
            planing: [{
                competence_aspect_id: "3",
                serial: "1",
                assessment_technique_id: null,
                assessment_bobot: null,
                assessment_name: null
            }],
            kompetensi: allCompetency
        }

        axios
            .post(
                BASE_URL, {
                    "processDefinitionId": "5cb935c9-07da-11ed-ac5e-66fc627bf211",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": insertToApi
                        }
                    ]
                }
                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                console.log(response)
                const dataRes = JSON.parse(response.data.variables[2].value);
                const resCode = dataRes.code;

                if (resCode === 'true') {
                    notification.success({
                        message: "Sukses",
                        description: "Perencanaan nilai spiritual berhasil di input",
                        placement: 'top'
                    })
                } else {
                    notification.info({
                        message: "Gagal",
                        description: "Perencanaan nilai spiritual gagal. Pastikan Form telah diisi semua",
                        placement: 'top'
                    })
                }
            })
    }

    useEffect(() => {
        _getDataKelas()
    }, []);

    useEffect(() => {
        _getDataMapel()
        setDataKompetensi([])
    }, [selectedClass]);

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
                                    title="Rencana Nilai Sikap Spiritual"
                                />
                            </div>
                        </div>
                        <form id='form_perencanaan_spiritual'>
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
                                            name="id_mapel_filter"
                                            onChange={(e) => _getCompetency(e)}
                                        >
                                            <option value="" selected disabled>
                                                Pilih Mata Pelajaran
                                            </option>
                                            {dataMapel.map((data) => (
                                                <option value={data.id_subject}>{data.nama_mata}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                { totalPenilaian == 0 ?
                                    <DataNotFound/>
                                    :
                                    <div className="col-lg-12 pt-5">

                                        <div className="table-responsive-xl">
                                            <table className="table" style={{borderCollapse: 'collapse'}}>
                                                <thead>
                                                <tr className='bg-current text-light'>
                                                    <th scope="col" style={{width: 500}}>Penilaian</th>
                                                    <th scope="col" colspan="3" className='m-auto text-center'>Penilaian
                                                        1
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row" style={{borderBottomStyle: 'hidden'}}>
                                                        <h4><b>Kompetensi Dasar / Butir Sikap Spiritual</b></h4>
                                                    </th>
                                                </tr>
                                                {
                                                    dataKompetensi.map((data) => (
                                                        <tr style={{borderStyle: 'hidden'}}>
                                                            <th scope="row" style={{
                                                                borderRightStyle: 'hidden',
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                textTransform: 'capitalize'
                                                            }}>
                                                                {data.competence_desc}
                                                            </th>
                                                            {totalPenilaian > 0 &&
                                                                <>
                                                                    {[...Array(Number(totalPenilaian)).keys()]
                                                                        .map((item, index) => {
                                                                            return (
                                                                                <td style={{borderRightStyle: 'hidden'}}>
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        className="form-control"
                                                                                        style={{zoom: 0.4}}
                                                                                        // name={`kompetensi_${data.id_detail}_${index + 1}`}
                                                                                        name="kompetensi"
                                                                                        id={`kompetensi_${data.id_detail}_${index + 1}`}
                                                                                        key={data.id_detail}
                                                                                        onChange={(e) => {
                                                                                            setIsChecked(e?.target?.checked)
                                                                                        }}
                                                                                        value={isChecked}
                                                                                    />
                                                                                </td>
                                                                            )
                                                                        })}
                                                                </>
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                            </div>
                        </form>
                        { totalPenilaian == 0 ?
                            null
                            :
                            <div className="row">
                                <div className="col">
                                    <div className="mt-5 mb-4 float-right">
                                        <button
                                            className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                            onClick={_submitNilai}
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
                        }
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default NilaiSpiritual;