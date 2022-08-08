import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment, useEffect, useState} from "react";
import {notification, PageHeader, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import {FilterAllClass} from "../../../components/FilterKelas";

function CapaianPenilaian() {
    const [dataCapaian, setDataCapaian] = useState([])
    const [dataKelas, setDataKelas] = useState([])
    const [selectedClass, setSelectedClass] = useState(null);
    const defaultAcademic = localStorage.getItem('academic_year');

    const _getDataCapaian = () => {
        axios.post(BASE_URL, {
                "processDefinitionId": "Getcapaianpenilaian:1:09b33e3c-fdc1-11ec-ac5e-66fc627bf211",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "academic_year": defaultAcademic,
                            "class_id": selectedClass
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const resData = JSON.parse(response.data.variables[2].value)
            const data = resData.data
            setDataCapaian(data)

        }).catch(error => {
            alert(error)
        });
    }
    const _selectKelas = () => {
        axios.post(BASE_URL, {
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
                                    "tbl_value": defaultAcademic,
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
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const resData = JSON.parse(response.data.variables[2].value)

            setDataKelas(resData)

        }).catch(error => {
            alert(error)
        });
    }

    useEffect(() => {
        _selectKelas()
        _getDataCapaian()
    }, []);

    useEffect(() => {
        _getDataCapaian()
    }, [selectedClass]);


    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    };
    const getNilai = dataCapaian.map(data => {
        return {
            kelas: data.kelas,
            mata_pelajaran: data.mata_pelajaran,
            kkm: data.kkm,
            peng_per: data.perencanaan_peng,
            ket_per: data.perencanaan_ket,
            skp_spr_per: data.perencanaan_skp,
            skp_sos_per: data.perencanaan_sos,
            bobot: data.bobot,
            peng_pen: data.penilaian_peng,
            ket_pen: data.penilaian_ket,
            skp_spr_pen: data.penilaian_skp,
            skp_sos_pen: data.penilaian_sos,
            pts: data.pts,
            pas: data.pas,
            kirim_nilai: data.kirim_nilai,
            desc: data.deskripsi
        }
    })

    const dataNilai = getNilai.map((data, index) => {

        return {
            no: index + 1,
            kelas: data.kelas,
            mata_pelajaran: data.mata_pelajaran,
            kkm: data.kkm,
            peng_per: data.peng_per,
            ket_per: data.ket_per,
            skp_spr_per: data.skp_spr_per,
            skp_sos_per: data.skp_sos_per,
            bobot: data.bobot,
            peng_pen: data.peng_pen,
            ket_pen: data.ket_pen,
            skp_spr_pen: data.skp_spr_pen,
            skp_sos_pen: data.skp_sos_pen,
            pts: [JSON.stringify(data.pts)],
            pas: [JSON.stringify(data.pas)],
            kirim_nilai: [JSON.stringify(data.kirim_nilai)],
            desc: [JSON.stringify(data.desc)]
        }
    })

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
        },
        {
            title: 'Kelas',
            dataIndex: 'kelas',
            filters: [
                {
                    text: "1A",
                    value: "1A",
                },
                {
                    text: "2A",
                    value: "2A",
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.kelas.indexOf(value) === 0,
            // sorter: (a, b) => a.namaKelas.length - b.namaKelas.length,
            // sortDirections: ['ascend'],
        },
        {
            title: 'Mata Pelajaran',
            dataIndex: 'mata_pelajaran',
            filters: [
                {
                    text: "Penjaskes",
                    value: "Penjaskes",
                },
                {
                    text: "Tematik",
                    value: "Tematik",
                },
            ],
            onFilter: (value, record) => record.mata_pelajaran.indexOf(value) === 0,
        },
        {
            title: 'KKM',
            dataIndex: 'kkm',
        },
        {
            title: 'Jumlah Perencanaan',
            children: [
                {
                    title: 'Peng',
                    dataIndex: 'peng_per',
                },
                {
                    title: 'Ket',
                    dataIndex: 'ket_per',
                },
                {
                    title: 'Skp Spr',
                    dataIndex: 'skp_spr_per',
                },
                {
                    title: 'Skp Sos',
                    dataIndex: 'skp_sos_per',
                },
            ]
        },
        {
            title: 'Bobot',
            dataIndex: 'bobot',
        },
        {
            title: 'Jumlah Penilaian',
            children: [
                {
                    title: 'Peng',
                    dataIndex: 'peng_pen',
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Ket',
                    dataIndex: 'ket_pen',
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Skp Spr',
                    dataIndex: 'skp_spr_pen',
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Skp Sos',
                    dataIndex: 'skp_sos_pen',
                    defaultSortOrder: 'ascend',
                },
            ]
        },
        {
            title: 'Input Nilai',
            children: [
                {
                    title: 'PTS',
                    dataIndex: 'pts',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == ['false'] ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == ['true'] ? "Sudah" : "Belum"}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                },
                {
                    title: 'PAS',
                    dataIndex: 'pas',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == ['false'] ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == ['true'] ? "Sudah" : "Belum"}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                }
            ]
        },
        {
            title: 'Status Nilai Rapor',
            children: [
                {
                    title: 'Kirim Nilai',
                    dataIndex: 'kirim_nilai',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == ['false'] ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == ['true'] ? "Sudah" : "Belum"}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                },
                {
                    title: 'Deskripsi',
                    dataIndex: 'desc',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == ['false'] ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == ['true'] ? "Sudah" : "Belum"}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                }
            ]
        }
    ];
    console.log(selectedClass)

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="Capaian Proses Penilaian"
                                />
                            </div>
                            <div className="col-lg-12">
                                <div className="w-25 mt-5">
                                    <label className="mont-font fw-600 font-xsss">
                                        Kelas / Sub Kelas
                                    </label>
                                    <FilterAllClass
                                        nameInput="filter_name_capaian"
                                        id="filter_capaian_penilaian"
                                        classNow={null}
                                        getClass={(e) => {
                                            const {options, selectedIndex} = e.target;
                                            setSelectedClass(e.target.value)
                                            const namaKelas = (options[selectedIndex].text)
                                            notification.info({
                                                message: "Tahun Akademik",
                                                description: 'Memilih Data Kelas ' + namaKelas,
                                                placement: 'top'
                                            })
                                        }}
                                        selectClass={dataKelas.map((data) => {
                                                return (
                                                    <>
                                                        <option value={data.id}>
                                                            {data.class} / {data.sub_class}
                                                        </option>
                                                    </>
                                                )
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 pt-5">
                                <Table className="py-8"
                                       columns={columns}
                                       dataSource={dataNilai}
                                       onChange={onChangeTable}
                                       pagination={false}
                                       rowClassName="bg-greylight text-grey-900"
                                       scroll={{x: 400}}
                                       size='middle'
                                       bordered/>
                            </div>
                        </div>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default CapaianPenilaian;