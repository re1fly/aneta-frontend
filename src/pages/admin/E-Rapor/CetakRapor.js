import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment } from "react";
import { PageHeader, Select, Card, Row, Table, Input, Button } from "antd"

function CetakRapor() {

    const { Option } = Select;
    const { TextArea } = Input;
    const { Column, ColumnGroup } = Table;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const data = [
        {
            key: '1',
            no: '1',
            namaSiswa: 'Boy Jati Asmara',
            kelas: '1A',
            raporTengahSemester: <Button className="rounded-xl">
                <i className="feather-printer mr-2"></i>Cetak PDF
            </Button>,
            raporAkhirSemester: <Button className="rounded-xl">
                <i className="feather-printer mr-2"></i>Cetak PDF
            </Button>,
            tanggalCetak: "07 Juni 2022, 13.00"
        },
        {
            key: '2',
            no: '2',
            namaSiswa: 'Rochy Putiray',
            kelas: '1A',
            raporTengahSemester: <Button className="rounded-xl">
                <i className="feather-printer mr-2"></i>Cetak PDF
            </Button>,
            raporAkhirSemester: <Button className="rounded-xl">
                <i className="feather-printer mr-2"></i>Cetak PDF
            </Button>,
            tanggalCetak: "05 Juni 2022, 15.00"
        },
        {
            key: '3',
            no: '3',
            namaSiswa: 'Yaris Riyadi',
            kelas: '1A',
            raporTengahSemester: <Button className="rounded-xl">
                <i className="feather-printer mr-2"></i>Cetak PDF
            </Button>,
            raporAkhirSemester: <Button className="rounded-xl">
                <i className="feather-printer mr-2"></i>Cetak PDF
            </Button>,
            tanggalCetak: "02 Juni 2022, 09.00"
        }
    ]

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
                            title="Cetak Rapor"
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
                                            placeholder="Pilih Tahun Akademik / Semester ...."
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="2022 / 1">2022 / 1</Option>
                                            <Option value="2022 / 2">2022 / 2</Option>
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
                            <Table
                                dataSource={data}
                                className="mt-4"
                                align='center'
                                pagination={false}
                                bordered>
                                <Column title="No" dataIndex="no" key="no" align='center'/>
                                <Column title="Nama Siswa" dataIndex="namaSiswa" key="namaSiswa" width="20%"/>
                                <ColumnGroup title="Kelas" align='center' >
                                    <Column title="Semua"
                                            align='center'
                                            dataIndex="kelas"
                                            key="kelas" />
                                </ColumnGroup>
                                <ColumnGroup title="Cetak Rapor Tengah Semester" align='center'>
                                    <Column title={<Button className="rounded-xl"><i className="feather-printer mr-2"/>Cetak Semua PDF</Button>} 
                                            align='center'
                                            dataIndex="raporTengahSemester"
                                            key="raporTengahSemester" />
                                </ColumnGroup>
                                <ColumnGroup title="Cetak Rapor Akhir Semester" align='center'>
                                    <Column title={<Button className="rounded-xl"><i className="feather-printer mr-2"/>Cetak Semua PDF</Button>}
                                            align='center'
                                            dataIndex="raporAkhirSemester"
                                            key="raporAkhirSemester" />
                                </ColumnGroup>
                                <ColumnGroup title="Tanggal Cetak Terakhir" align='center'>
                                    <Column title="11 Juni 2022, 16.00"
                                            align='center'
                                            dataIndex="tanggalCetak"
                                            key="tanggalCetak" />
                                </ColumnGroup>
                            </Table>
                        </div>
                    </div>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default CetakRapor;