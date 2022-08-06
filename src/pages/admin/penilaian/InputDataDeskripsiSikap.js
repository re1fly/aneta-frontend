import axios from "axios";
import { BASE_URL } from "../../../api/Url";

import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment, useState, useEffect } from "react";
import { PageHeader, Select, Card, Row, Table, Input } from "antd"

function InputDataDeskripsiSikap() {

    const [deskripsiSikap, setDeskripsiSikap] = useState([])
    console.log(deskripsiSikap);

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
                "processDefinitionId":"inputdeskripsisikapraport:1:2a35f330-146e-11ed-ac5e-66fc627bf211",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                           "id_class" : 86
                        }
                    }
                ]
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value)
            // console.log(dataRes.siswa);
            setDeskripsiSikap(dataRes.siswa)
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
            title: 'Predikat Sikap Sosial',
            dataIndex: 'predikatSosial',
            defaultSortOrder: 'descend',
            align: 'center'
        },
        {
            title: 'Deskripsi Sikap Sosial',
            dataIndex: 'deskripsiSosial',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Predikat Sikap Spiritual',
            dataIndex: 'predikatSpiritual',
            defaultSortOrder: 'descend',
            align: 'center'
        },
        {
            title: 'Deskripsi Sikap Spiritual',
            dataIndex: 'deskripsiSpiritual',
            defaultSortOrder: 'descend',
        },
    ];

    const channelList = deskripsiSikap?.map((data, index) => {
        return {
            no: '001',
            namaSiswa: data.nama_siswa,
            predikatSosial: "Baik",
            deskripsiSosial: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
            predikatSpiritual: "Sangat Baik",
            deskripsiSpiritual: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        }
    })

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
                                dataSource={channelList}
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

export default InputDataDeskripsiSikap;