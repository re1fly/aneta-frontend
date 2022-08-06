import {React, useEffect, useState} from "react";
import { Table, Button } from "antd";
import axios from "axios";
import {BASE_URL} from "../../api/Url";

export const FormKompetensi = (props) => {
    const institute =  localStorage.getItem('institute')
    const [selectedYear, setSelectedYear] = useState(null)
    const [dataSemester, setDataSemester] = useState([])
    const [dataMapel, setDataMapel] = useState([]);

    const _getAcademicYears = () => {
        axios.post(BASE_URL, {
                "processDefinitionId": 'getdatajoinwhere:2:d2aed4a7-dff4-11ec-a658-66fc627bf211',
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_year",
                            "select": [
                                "x_academic_year.id as id_academic",
                                "x_academic_year.academic_year",
                                "m_institutes.id", "x_academic_year.semester"
                            ],
                            "paginate": 1000,
                            "join": [
                                {
                                    "tbl_join": "m_institutes",
                                    "foregenkey": "institute_id",
                                    "refkey": "id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_year",
                                    "tbl_field": "institute_id",
                                    "tbl_value": institute,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_academic_year.academic_year",
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
            const academics = JSON.parse(response.data.variables[3].value);
            setDataSemester(academics.data.data);
        })
    }
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
                                        "tbl_value": selectedYear,
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },{
                                        "tbl_coloumn": "x_academic_subject_master",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "=",
                                        "kondisi" : "where"
                                    },
                                    {
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


    useEffect(() => {
        _getAcademicYears()
    }, []);

    useEffect(() => {
        _getDataMapel()
    }, [selectedYear]);


    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    // let [count, setCount] = useState(1);

    // const increment = () => {
    //     setCount((prevCount) => prevCount + 1);
    // };
    //
    // const decrement = () => {
    //     setCount((prevCount) => prevCount - 1);
    // };

    let disabledButton = props.isDisabled;

    const columns = [
        // {
        //     title: 'No',
        //     dataIndex: 'no',
        // },
        {
            title: 'TA/Semester',
            dataIndex: 'ta_semester',
        },
        {
            title: 'Kelas',
            dataIndex: 'kelas',
        },
        {
            title: 'Mata Pelajaran',
            dataIndex: 'mataPelajaran',
        },
        {
            title: 'Kode',
            dataIndex: 'kode',
        },
        {
            title: 'Kompetensi Inti',
            dataIndex: 'kompetensiInti',
        },
        {
            title: 'Kompetensi Dasar',
            dataIndex: 'kompetensiDasar',
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
        },
    ];

    const data = [
        {
            // no: '1',
            ta_semester:
                <select
                    id="select_semester_kompetensi"
                    className="form-control w250"
                    name="semester_kompetensi"
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="" selected disabled hidden>
                        Pilih Semester
                    </option>
                    {dataSemester.map((data) => {
                            return (
                                <>
                                    <option value={data.id_academic}>
                                        {data.academic_year} Semester {data.semester}
                                    </option>
                                </>
                            )
                        }
                    )}}
                </select>,
            kelas:
                <select
                    className="form-control w125"
                    name="kelas"
                >
                    <option value="" selected disabled hidden>
                        Pilih Kelas
                    </option>
                    <option value="Kelas 1">
                        Kelas 1
                    </option>
                    <option value="Kelas 2">
                        Kelas 2
                    </option>
                    <option value="Kelas 3">
                        Kelas 3
                    </option>
                    <option value="Kelas 4">
                        Kelas 4
                    </option>
                    <option value="Kelas 5">
                        Kelas 5
                    </option>
                    <option value="Kelas 6">
                        Kelas 6
                    </option>
                </select>,
            mataPelajaran:
                <select
                    className="form-control w200"
                    name="mata_pelajaran"
                >
                    <option value="" selected disabled hidden>
                        Pilih Mata Pelajaran
                    </option>
                    {dataMapel.map((data) => (
                        <option value={data.id_subject}>{data.nama_mata}</option>
                    ))}
                </select>,
            kode:
                <input name="kode_kompetensi" className="form-control w75" />,
            kompetensiInti:
                <select
                    className="form-control w175"
                    name="kompetensi"
                >
                    <option value="" selected disabled hidden>
                        Pilih Kompetensi
                    </option>
                    <option value="1">Pengetahuan</option>
                    <option value="2">Keterampilan</option>
                    <option value="3">Sikap Spiritual</option>
                    <option value="4">Sikap Sosial</option>
                </select>,
            kompetensiDasar:
                <textarea name="ket_kd" className="form-control w150" />,
            keterangan:
                <textarea name="ket" className="form-control w150" />,
        },
    ];

    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    {/*<div className='d-flex mb-3 justify-content-end g-1s'>*/}
                    {/*    <h5 className='pt-2'>Tambah Baris</h5>*/}
                    {/*    <Button className='ml-2' onClick={decrement} shape="circle">-</Button>*/}
                    {/*    <h4 className='mt-2 ml-2'>{count}</h4>*/}
                    {/*    <Button className='ml-2' onClick={increment} shape="circle">+</Button>*/}
                    {/*</div>*/}
                    <form id="competence_form"
                        onSubmit={props.submit}
                        // method="POST"
                    >
                        <div className="card-body p-4 w-90 bg-current border-0 d-flex rounded-lg mx-4 py-8">
                            <i onClick={props.setView}
                                className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                            <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                Tambah Kompetensi
                            </h4>
                        </div>
                        <Table className="mx-4 py-8"
                            columns={columns}
                            dataSource={data}
                            onChange={onChangeTable}
                            pagination={false}
                            rowClassName="bg-greylight text-grey-900"
                            scroll={{ x: 400 }} />
                        <div className="row mx-2 py-8 mt-5">
                            <div className="col-lg-12">

                                <button
                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                    type="submit"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={props.setView}
                                    className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-none"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* <div className="col-lg-12 mt-5">
                        <div className="table ">
                            <thead>
                                <td className="bg-current text-light text-center">
                                    <th className="">Nama Pelajaran</th>
                                </td>
                                <td className="bg-current text-light text-center">
                                    <th className="">Kelas</th>
                                </td>
                                <td className="bg-current text-light text-center">
                                    <th className="">Semester</th>
                                </td>
                                <td className="bg-current text-light text-center">
                                    <th className="">Kode</th>
                                </td>
                                <td className="bg-current text-light text-center">
                                    <th className="">Kompetensi</th>
                                </td>
                                <td className="bg-current text-light text-center">
                                    <th className="">Kompetensi Dasar</th>
                                </td>
                                <td className="bg-current text-light text-center">
                                    <th className="">Keterangan</th>
                                </td>
                            </thead>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}