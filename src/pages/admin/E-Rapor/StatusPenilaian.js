import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment } from "react";
import { PageHeader, Card, Row, Select, Table } from "antd"

function StatusPenilaian() {

    const { Option } = Select;
    const { Column, ColumnGroup } = Table;

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    const channelList = [
        {
            key: '1',
            no: '1',
            mataPelajaran: 'Pendidikan Agama Islam',
            namaPendidik: 'Bambang S.Pd',
            pengetahuan: 'Ok',
            keterampilan: 'Ok',
            sikapSpiritual: 'Ok',
            sikapSosial: 'Ok',
            finalisasi: 'Ok',
            deskripsi: 'Ok',
        },
        {
            key: '2',
            no: '2',
            mataPelajaran: 'PPKN',
            namaPendidik: 'Waluyo S.Pd',
            pengetahuan: 'Ok',
            keterampilan: 'Ok',
            sikapSpiritual: 'Ok',
            sikapSosial: '-',
            finalisasi: '-',
            deskripsi: 'Ok',
        },
        {
            key: '3',
            no: '3',
            mataPelajaran: 'Penjas',
            namaPendidik: 'Monica S.Pd',
            pengetahuan: '-',
            keterampilan: '-',
            sikapSpiritual: '-',
            sikapSosial: '-',
            finalisasi: '-',
            deskripsi: '-',
        },
    ]

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Status Penilaian"
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
                                    Pratinjau
                                </button>
                            </div>
                        </div>
                        <Table
                            dataSource={channelList}
                            className="mt-4"
                            align='center'
                            pagination={false}
                            bordered>
                            <Column align='center' title="No" dataIndex="no" key="no" />
                            <Column  width="15%" title="Mata Pelajaran" dataIndex="mataPelajaran" key="mataPelajaran" />
                            <Column align='center' width="15%" title="Nama Pendidik" dataIndex="namaPendidik" key="namaPendidik" />
                            <ColumnGroup title="Status Penilaian">
                                <Column align='center' title="Pengetahuan" dataIndex="pengetahuan" key="pengetahuan" />
                                <Column align='center' title="Keterampilan" dataIndex="keterampilan" key="keterampilan" />
                                <Column align='center' title="Sikap Spiritual" dataIndex="sikapSpiritual" key="sikapSpiritual" />
                                <Column align='center' title="Sikap Sosial" dataIndex="sikapSosial" key="sikapSosial" />
                            </ColumnGroup>
                            {/* <ColumnGroup title="Status Penilaian">
                                <Column align='center' title="Peng." dataIndex="_pengetahuan" key="_pengetahuan" />
                                <Column align='center' title="Ketr." dataIndex="_keterangan" key="_keterangan" />
                                <Column align='center' title="Sik. Spr." dataIndex="sikap_Spiritual" key="sikap_Spiritual" />
                                <Column align='center' title="Sik. Sos." dataIndex="sikap_Sosial" key="sikap_Sosial" />
                            </ColumnGroup> */}
                            <ColumnGroup title="Status Nilai Rapor">
                                <Column align='center' title="Finalisasi" dataIndex="finalisasi" key="finalisasi" />
                                <Column align='center' title="Deskripsi" dataIndex="deskripsi" key="deskripsi" />
                            </ColumnGroup>
                        </Table>
                    </div>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default StatusPenilaian;