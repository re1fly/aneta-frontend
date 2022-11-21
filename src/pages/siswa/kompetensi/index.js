import React, { Fragment, useEffect, useState } from "react"
import axios from "axios";
import {
    Card,
    Tag,
    Table,
    PageHeader,
    Button
} from "antd";
import Search from "antd/lib/input/Search";

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import {
    url_by_institute
} from "../../../api/reference";

export default function KompetensiSiswa() {

    const [dataKompetensi, setDataKompetensi] = useState([]);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const academicId = localStorage.getItem('academic_id');
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": "rolesiswagetkompetensi:2:cb58fbeb-5047-11ed-8f22-927b5be84510",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_academic": academicId,
                            "id_user": userId,
                            "pagination": 10
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
            console.log(dataRes);
            setDataKompetensi(dataRes?.data?.data)
            const pagination = dataRes?.data?.links;
            setBtnPagination(pagination)
        })
    }, [])

    const _onSearch = value => console.log(value);

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const TabelKompetensi = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                defaultSortOrder: 'ascend',
                responsive: ['sm'],
                align: "center"
            },
            {
                title: 'Nama Pelajaran',
                dataIndex: 'pelajaran',
                align: "center"
            },
            {
                title: 'Kompetensi',
                dataIndex: 'namaKompetensi',
                align: "center"
            },
            {
                title: 'Semester',
                dataIndex: 'semester',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Kode',
                dataIndex: 'kode',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Kompetensi Dasar',
                dataIndex: 'kompetensiDasar',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
                defaultSortOrder: 'descend',
                align: "center"
            },
            {
                title: 'Status',
                dataIndex: 'status',
                responsive: ['sm'],
                render: status => (
                    <>
                        {status.map(status => {
                            let color = status == true ? 'green' : 'red';
                            return (
                                <Tag style={{ borderRadius: '15px' }} color={color} key={status}>
                                    {status == true ? 'Aktif' : 'Tidak Aktif'}
                                </Tag>

                            );
                        })}
                    </>
                ),
            },
        ];

        const channelList = dataKompetensi?.map((data, index) => {
            return {
                no: index + 1,
                pelajaran: data.nama_mata,
                namaKompetensi: data.competence_aspect,
                semester: `${data.academic_year} / ${data.semester}`,
                kode: data.code,
                kompetensiDasar: data.competance_target,
                keterangan: data.competence_desc,
                status: [data.status],
            }
        })

        return (
            <>
                <Table className=""
                       columns={columns}
                       dataSource={channelList}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900"
                       scroll={{ x: 400 }} />
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
            </>
        );
    };

    const ViewKompetensi = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Kompetensi"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                            onSearch={_onSearch} style={{ width: '80%' }} />
                                </div>
                            </div>
                        </Card>
                        <TabelKompetensi />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <ViewKompetensi />
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
};