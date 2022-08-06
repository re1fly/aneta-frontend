import axios from "axios";
import { BASE_URL } from "../../../api/Url";

import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment, useState, useEffect } from "react";
import { PageHeader, Select, Card, Row, Table, Input } from "antd"

function InputDataDeskripsiNilai() {

    const [dataDeskripsi, setDataDeskripsi] = useState([])

    const { Option } = Select;
    const { TextArea } = Input;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

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
                            "tbl_induk": "x_assessment_actual_desc",
                            "select": [
                                "x_assessment_actual_desc.*",
                                "x_assessment_header",
                                "x_academic_students",
                                "users.*",
                                "r_competence_aspect"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_assessment_header",
                                    "refkey": "id",
                                    "tbl_join2": "x_assessment_actual_desc",
                                    "foregenkey": "assessment_header_id"
                                },
                                {
                                    "tbl_join": "x_academic_students",
                                    "refkey": "id",
                                    "tbl_join2": "x_assessment_actual_desc",
                                    "foregenkey": "student_id"
                                },
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_students",
                                    "foregenkey": "user_id"
                                },
                                {
                                    "tbl_join": "r_competence_aspect",
                                    "refkey": "id",
                                    "tbl_join2": "x_assessment_actual_desc",
                                    "foregenkey": "competence_aspect_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_assessment_header",
                                    "tbl_field": "class_id",
                                    "tbl_value": "86",
                                    "operator": "="
                                }, {
                                    "tbl_coloumn": "x_assessment_header",
                                    "tbl_field": "subjects_id",
                                    "tbl_value": "219",
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_assessment_actual_desc.given_value",
                            "order_by": "desc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": "1"
                    }
                ]
            }
        ).then(function (response) {
            // console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[3]?.value)
            console.log(dataRes?.data?.data);
            // setGetKirimPenilaian(dataRes?.data?.data)
        })
    }, [])

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            defaultSortOrder: 'ascend',
            responsive: ['sm'],
        },
        {
            title: 'Nama Siswa',
            dataIndex: 'namaSiswa',
            sortDirections: ['descend'],
        },
        {
            title: 'Nilai Pengetahuan',
            dataIndex: 'nilaiPengetahuan',
            defaultSortOrder: 'descend',
            align: 'center'
        },
        {
            title: 'Deskripsi Pengetahuan',
            dataIndex: 'deskripsiPengetahuan',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Nilai Keterampilan',
            dataIndex: 'nilaiKeterampilan',
            defaultSortOrder: 'descend',
            align: 'center'
        },
        {
            title: 'Deskripsi Keterampilan',
            dataIndex: 'deskripsiKeterampilan',
            defaultSortOrder: 'descend',
        },
    ];

    const dataSample = [
        // {
        //     no: '001',
        //     namaSiswa: 'Boy Jati Asmara',
        //     nilaiPengetahuan: "75",
        //     deskripsiPengetahuan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        //     nilaiKeterampilan: "75",
        //     deskripsiKeterampilan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        // },
        // {
        //     no: '002',
        //     namaSiswa: 'Rochy Putiari',
        //     nilaiPengetahuan: "75",
        //     deskripsiPengetahuan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        //     nilaiKeterampilan: "75",
        //     deskripsiKeterampilan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        // },
        // {
        //     no: '003',
        //     namaSiswa: 'Yaris Riyadi',
        //     nilaiPengetahuan: "75",
        //     deskripsiPengetahuan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        //     nilaiKeterampilan: "75",
        //     deskripsiKeterampilan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        // },
    ];

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
                        <div className="row d-flex align-items-center">
                            <div className="col-lg-5">
                                <Card className="shadow-md my-6 rounded">
                                    <Row>
                                        <Select style={{ width: '100%' }}
                                            showSearch
                                            placeholder="Pilih Kelas ...."
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="kelas1">Kelas 1</Option>
                                            <Option value="kelas2">Kelas 2</Option>
                                            <Option value="kelas3">Kelas 3</Option>
                                        </Select>
                                    </Row>
                                </Card>
                            </div>
                            <div className="col-lg-5">
                                <Card className="shadow-md my-6 rounded">
                                    <Row>
                                        <Select style={{ width: '100%' }}
                                            showSearch
                                            placeholder="Pilih Mata Pelajaran ...."
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="matematika">Matematika</Option>
                                            <Option value="bahasaIndonesia">Bahasa Indonesia</Option>
                                            <Option value="ilmuPengetahuanAlam">Ilmu Pengetahuan Alam</Option>
                                        </Select>
                                    </Row>
                                </Card>
                            </div>
                            <div className="col-lg-2">
                                <button
                                    className="bg-current border-0 text-center text-white font-xs fw-600 p-2 w150 rounded-xl d-inline-block"
                                    type="submit"
                                >
                                    Proses
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Table className=""
                                columns={columns}
                                dataSource={dataSample}
                                onChange={onChangeTable}
                                pagination={false}
                                rowClassName="bg-greylight text-grey-900"
                                scroll={{ x: 400 }} />
                        </div>
                        <div className="col-lg-12 mt-5 mb-5 d-flex justify-content-end">
                            <button
                                className="bg-current border-0 text-center text-white font-xsss p-3 fw-600 w150 rounded-xl d-inline-block mr-2 mt-5"
                                type="submit"
                            >
                                Simpan
                            </button>
                            <button
                                className="bg-lightblue border-0 text-center font-xsss fw-600 p-3 w150 rounded-xl d-inline-block mt-5"
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