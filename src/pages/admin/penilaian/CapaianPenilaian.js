import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment} from "react";
import {PageHeader, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";

function CapaianPenilaian() {
    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    };
    const getNilai = [
        {
            kelas: '1A',
            mata_pelajaran: 'Penjaskes',
            kkm: '75',
            peng: 1,
            ket_per: 1,
            skp_spr_per: 1,
            skp_sos_per: 1,
            bobot: 1,
            ket_pen: 1,
            skp_spr_pen: 3,
            skp_sos_pen: 5,
            pts: 1,
            pas: 1,
            kirim_nilai: 1,
            desc: 0
        },
        {
            kelas: '2A',
            mata_pelajaran: 'Tematik',
            kkm: '70',
            peng: 2,
            ket_per: 4,
            skp_spr_per: 7,
            skp_sos_per: 8,
            bobot: 5,
            ket_pen: 2,
            skp_spr_pen: 3,
            skp_sos_pen: 5,
            pts: 0,
            pas: 0,
            kirim_nilai: 0,
            desc: 1

        }
    ];

    const dataNilai = getNilai.map((data, index) => {
        // const number = 1++;

        return {
            no: index + 1 ,
            kelas: data.kelas,
            mata_pelajaran: data.mata_pelajaran,
            kkm: data.kkm,
            peng: data.peng,
            ket_per: data.ket_per,
            skp_spr_per: data.skp_spr_per,
            skp_sos_per: data.skp_sos_per,
            bobot: data.bobot,
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
            defaultSortOrder: 'ascend',
        },,
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
            defaultSortOrder: 'ascend',
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
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Jumlah Perencanaan',
            children: [
                {
                    title: 'Peng',
                    dataIndex: 'peng',
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Ket',
                    dataIndex: 'ket_per',
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Skp Spr',
                    dataIndex: 'skp_spr_per',
                    defaultSortOrder: 'ascend',
                },
                {
                    title: 'Skp Sos',
                    dataIndex: 'skp_sos_per',
                    defaultSortOrder: 'ascend',
                },
            ]
        },
        {
            title: 'Bobot',
            dataIndex: 'bobot',
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Jumlah Penilaian',
            children: [
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
                    defaultSortOrder: 'ascend',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == 0 ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == 1 ? "Sudah" : "Belum"}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                },
                {
                    title: 'PAS',
                    dataIndex: 'pas',
                    defaultSortOrder: 'ascend',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == 0 ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == 1 ? "Sudah" : "Belum"}
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
                    defaultSortOrder: 'ascend',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == 0 ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == 1 ? "Sudah" : "Belum"}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                },
                {
                    title: 'Deskripsi',
                    dataIndex: 'desc',
                    defaultSortOrder: 'ascend',
                    render: (data) => (
                        <>
                            {data.map((status) => {
                                let color = status == 0 ? "red" : "green";
                                return (
                                    <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                        {status == 1 ? "Sudah" : "Belum"}
                                    </Tag>
                                );
                            })}
                        </>
                    ),
                }
            ]
        }
    ];

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