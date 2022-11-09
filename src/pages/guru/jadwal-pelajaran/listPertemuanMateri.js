import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Adminfooter from "../../../components/Adminfooter";
import {
    Button,
    Card,
    Col,
    PageHeader,
    Row,
    Space,
    Table,
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import { global_join_sub_where_get, url_by_institute } from '../../../api/reference';
import { useHistory, useParams } from 'react-router-dom';

function GuruListPertemuanMateri() {
    const [grid, setGrid] = useState(false);
    const [materi, setGetMateri] = useState([])

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const academicYear = localStorage.getItem('academic_year')
    const userId = localStorage.getItem('user_id')

    const params = useParams()
    const idMateri = params?.id

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": global_join_sub_where_get,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_subjects_schedule_contents_meeting",
                            "select": [
                                "x_academic_subjects_schedule_contents_meeting.id",
                                "x_academic_subjects_schedule_contents_meeting.meeting_name",
                                "x_academic_subjects_schedule_date.date",
                                "x_academic_subjects_schedule_time.time_start",
                                "x_academic_subjects_schedule_time.time_end"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_academic_subjects_schedule_date",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "schedule_date_id"
                                },
                                {
                                    "tbl_join": "x_academic_subjects_schedule_time",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "schedule_time_id"
                                }, {
                                    "tbl_join": "x_academic_subjects_schedule_contents",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                    "foregenkey": "contents_id"

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
                            "order_coloumn": "x_academic_subjects_schedule_contents_meeting.updated_at",
                            "order_by": "desc"
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
            const dataRes = JSON.parse(response?.data?.variables[3]?.value);
            const dataMateri = dataRes?.data?.data
            setGetMateri(dataMateri)
            const pagination = dataRes?.data?.links;
            setBtnPagination(pagination)
        })
    }, [userId, paramsPage])

    let history = useHistory();
    const handleRouter = (id) => {
        history.push(`/guru-materi-${id}`)
    }

    const data = materi.map((data, index) => {
        return {
            no: index + 1,
            id: data.id,
            namaPertemuan: data.meeting_name,
            tanggal: data.date,
            jam: `${data.time_start} - ${data.time_end}`,
        }
    })

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            align: 'center',
        },
        {
            title: 'Nama Pertemuan',
            dataIndex: 'namaPertemuan',
            align: 'center',
        },
        {
            title: 'Tanggal',
            dataIndex: 'tanggal',
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

    const ViewMateri = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Pertemuan Materi"
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
                                    onSearch={_onSearch} style={{ width: 250, lineHeight: '20px' }} />
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
                    <ViewMateri />
                </div>
            </div>
        </Fragment>
    );
}

export default GuruListPertemuanMateri;