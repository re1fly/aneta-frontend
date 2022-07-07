import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment } from "react";
import { PageHeader, Select, Card, Row, Table, Input } from "antd"

function InputDataDeskripsi() {

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
        },
        {
            title: 'Deskripsi Keterampilan',
            dataIndex: 'deskripsiKeterampilan',
            defaultSortOrder: 'descend',
        },
    ];

    const data = [
        {
            no: '001',
            namaSiswa: 'Boy Jati Asmara',
            nilaiPengetahuan: <Input placeholder="75" />,
            deskripsiPengetahuan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
            nilaiKeterampilan: <Input placeholder="75" />,
            deskripsiKeterampilan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        },
        {
            no: '002',
            namaSiswa: 'Rochy Putiari',
            nilaiPengetahuan: <Input placeholder="75" />,
            deskripsiPengetahuan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
            nilaiKeterampilan: <Input placeholder="75" />,
            deskripsiKeterampilan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        },
        {
            no: '003',
            namaSiswa: 'Yaris Riyadi',
            nilaiPengetahuan: <Input placeholder="75"  />,
            deskripsiPengetahuan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
            nilaiKeterampilan: <Input placeholder="75" />,
            deskripsiKeterampilan: <TextArea rows={3} placeholder="Memiliki Penguasaan Pengetahuan Yang Baik" />,
        },
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
                            title="Input Data Deskripsi (Rapor)"
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
                                dataSource={data}
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

export default InputDataDeskripsi;