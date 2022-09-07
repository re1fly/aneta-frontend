import {React, useEffect, useState} from "react";
import {Table, Button} from "antd";
import axios from "axios";
import {BASE_URL} from "../../api/Url";

export const FormKompetensi = (props) => {
    const institute = localStorage.getItem('institute')
    const [selectedYear, setSelectedYear] = useState(null)
    const [selectedClass, setSelectedClass] = useState(null)
    const [dataSemester, setDataSemester] = useState([])
    const [dataMapel, setDataMapel] = useState([]);
    const [dataKelas, setDataKelas] = useState([]);

    const _getAcademicYears = () => {
        axios.post(BASE_URL, {
                "processDefinitionId": 'getdatajoinwhere:1:5718bdea-2cc2-11ed-aacc-9a44706f3589',
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
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const academics = JSON.parse(response.data.variables[3].value);
            setDataSemester(academics.data.data);
        })
    }
    const _getDataKelas = (e) => {
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "getwherenojoin:1:3510ed73-2cc3-11ed-aacc-9a44706f3589",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_get_where",
                            "type": "json",
                            "value": {
                                "tbl_name": "r_class_type",
                                "pagination": false,
                                "total_result": 2,
                                "order_coloumn": "r_class_type.id",
                                "order_by": "asc",
                                "data": [
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "institute_id",
                                        "tbl_value": institute,
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
                console.log(response)
                const resClass = JSON.parse(response?.data?.variables[2]?.value) || [];
                if (resClass.status == false) {
                    setDataKelas([]);
                    setSelectedYear(e.target.value)
                } else {
                    setDataKelas(resClass);
                    setSelectedYear(e.target.value)
                }
            })
    }
    const _getDataMapel = (e) => {
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "8812bebe-2cf6-11ed-aacc-9a44706f3589",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "get_data",
                            "type": "json",
                            "value": {
                                "id_academic": selectedYear,
                                "paginate": false,
                                "tingkat": e.target.value
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
                const dataMapelApi = JSON.parse(response.data.variables[2].value);
                const getMapel = dataMapelApi.data

                setDataMapel(getMapel);
            })
    }


    useEffect(() => {
        _getAcademicYears()
    }, []);

    // useEffect(() => {
    //     _getDataKelas()
    // }, [selectedYear]);

    // useEffect(() => {
    //     _getDataMapel()
    // }, [selectedClass]);


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
                    onChange={(e) => _getDataKelas(e)}
                    required
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
                    )}
                </select>,
            kelas:
                <select
                    className="form-control w125"
                    name="kelas"
                    onChange={(e) => _getDataMapel(e)}
                    required
                >
                    <option value="" selected disabled hidden>
                        Pilih Kelas
                    </option>
                    {dataKelas?.length == 0 ? null : dataKelas?.map((data) => (
                        <option value={data?.id}>{data?.class_type}</option>
                    ))}
                </select>,
            mataPelajaran:
                <select
                    className="form-control w200"
                    name="mata_pelajaran"
                    required
                >
                    <option value="" selected disabled hidden>
                        Pilih Mata Pelajaran
                    </option>
                    {dataMapel.length == 0 ? null : dataMapel?.map((data) => (
                        <option value={data.id}>{data.nama_mata}</option>
                    ))}
                </select>,
            kode:
                <input name="kode_kompetensi" className="form-control w75" required/>,
            kompetensiInti:
                <select
                    className="form-control w175"
                    name="kompetensi"
                    required
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
                <textarea name="ket_kd" className="form-control w150" required/>,
            keterangan:
                <textarea name="ket" className="form-control w150" required/>,
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
                               scroll={{x: 400}}/>
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