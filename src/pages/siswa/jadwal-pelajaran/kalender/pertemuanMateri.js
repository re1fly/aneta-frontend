import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Adminfooter from "../../../../components/Adminfooter";
import {
    Button,
    Card,
    Col,
    PageHeader,
    Row,
    Space,
    Table, Tag, Tooltip,

} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
    EyeOutlined, EyeInvisibleOutlined,
} from "@ant-design/icons";
import {
    global_join_sub_where_get, role_siswa_get_pertemuan,
    url_by_institute,
} from '../../../../api/reference';

import axios from 'axios';
import Search from "antd/es/input/Search";
import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";

const SiswaKalenderMateri = () => {
    const [grid, setGrid] = useState(false);
    const [dataPertemuan, setDataPertemuan] = useState([])

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const userId = localStorage.getItem('user_id');
    const academicId = localStorage.getItem('academic_id')

    const params = useParams()
    const idMateri = params.id

    const dataMateri = useSelector((state) => state.dataPathKalenderSiswa.allPath)

    useEffect(() => {
        axios.post(url_by_institute, {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_subjects_schedule_contents_meeting",
                            "select": [
                                "x_academic_subjects_schedule_contents_meeting.contents_id",
                                "x_academic_subjects_schedule_contents_meeting.meeting_name",
                                "x_academic_subjects_schedule_date.date",
                                "x_academic_subjects_schedule_time.time_start",
                                "x_academic_subjects_schedule_time.time_end"
                            ],
                            "paginate": false,
                            "join": [
                                {
                                    "tbl_join": "x_academic_subjects_schedule_contents",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "contents_id"
                                }, {
                                    "tbl_join": "x_academic_subjects_schedule_date",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "schedule_date_id"
                                }, {
                                    "tbl_join": "x_academic_subjects_schedule_time",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "schedule_time_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_subjects_schedule_contents_meeting",
                                    "tbl_field": "contents_id",
                                    "tbl_value": idMateri,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_academic_subjects_schedule_contents_meeting.meeting_name",
                            "order_by": "asc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": paramsPage
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            setDataPertemuan(dataRes?.data);
            const pagination = dataRes?.links;
            setBtnPagination(pagination)
        })

    }, [idMateri])

    let history = useHistory();
    const handleRouter = (id) => {
        history.push(`/siswa-kelas-materi-${id}`)
    }

    const data = dataPertemuan?.map((data, index) => {
        return {
            no: index + 1,
            id: data.contents_id,
            namaPertemuan: data.meeting_name,
            tanggalPertemuan: data.date,
            jam: `${data.time_start} - ${data.time_end}`,
        }
    });

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
        },
        {
            title: 'Nama Pertemuan',
            dataIndex: 'namaPertemuan',
            align: 'center',
        },
        {
            title: 'Tanggal Pertemuan',
            dataIndex: 'tanggalPertemuan',
            align: 'center',
        },
        {
            title: 'Jam',
            dataIndex: 'jam',
            align: 'center',
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            responsive: ['sm'],
            render: (text, record) => (
                <Space size="middle">
                    <EyeOutlined onClick={() => handleRouter(record.id)} style={{ color: "black" }} />
                </Space>
            ),
        },
    ];

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const _onSearch = value => console.log(value);

    const ViewPertemuan = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title={`Jadwal Pelajaran Kalender / Materi dan Tugas / ${dataMateri.namaPelajaran} / Materi / ${dataMateri.namaMateri}`}
                        />
                    </div>
                </div>
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <Row>
                        <Col span={12}>
                        </Col>
                        <Col span={12}>
                            <div className="float-right">
                                <Search className="mr-5" placeholder="Cari kata kunci" allowClear
                                        onSearch={_onSearch} style={{width: 250, lineHeight: '20px'}}/>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Table className=""
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900" />
                <div className='text-center mt-4'>
                    {btnPagination?.map((dataBtn) => {
                        const labelBtn = dataBtn.label;
                        const label = labelBtn
                            .replace(/(&laquo\;)/g, "")
                            .replace(/(&raquo\;)/g, "");
                        let linkUrl = dataBtn.url;

                        if (linkUrl != null) {
                            linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                        }

                        return (
                            <Button
                                className="btn btn-primary mr-2 font-xssss fw-600"
                                disabled={linkUrl == null ? true : false}
                                onClick={() => {
                                    setParamsPage(linkUrl);
                                }}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </div>
                <Adminfooter />
            </div>
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <ViewPertemuan />
                </div>
            </div>
        </Fragment>
    );
}

export default SiswaKalenderMateri;