import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Card, Tag, Table, PageHeader, Button} from "antd";
import Search from "antd/lib/input/Search";

import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import {
    role_siswa_get_kompetensi, role_siswa_get_rekap_tugas,
    url_by_institute,
} from "../../../../api/reference";

export default function SiswaRekapTugas() {
    const [dataKompetensi, setDataKompetensi] = useState([]);
    const [dataTugas, setDataTugas] = useState([]);
    const [deadline, setDeadline] = useState(0);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const academicId = localStorage.getItem("academic_id");
    const userId = localStorage.getItem("user_id");

    const _getTugas = (deadline) => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": role_siswa_get_rekap_tugas,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "id_academic": academicId,
                                "id_user": userId,
                                "filter": deadline
                            }
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic YWRtaW46TWFuYWczciE=",
                    },
                }
            )
            .then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                console.log(dataRes.data);
                setDataTugas(dataRes?.data);
            });
    }

    useEffect(() => {
        axios
            .post(
                url_by_institute,
                {
                    processDefinitionId: role_siswa_get_kompetensi,
                    returnVariables: true,
                    variables: [
                        {
                            name: "data",
                            type: "json",
                            value: {
                                id_academic: academicId,
                                id_user: userId,
                                pagination: 10,
                            },
                        },
                        {
                            name: "page",
                            type: "string",
                            value: paramsPage,
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic YWRtaW46TWFuYWczciE=",
                    },
                }
            )
            .then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[3]?.value);
                setDataKompetensi(dataRes?.data?.data);
                const pagination = dataRes?.data?.links;
                setBtnPagination(pagination);
            });
        _getTugas()
    }, []);

    const _onSearch = (value) => console.log(value);

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    const TabelKompetensi = () => {
        const columns = [
            {
                title: "No",
                dataIndex: "no",
                defaultSortOrder: "ascend",
                responsive: ["sm"],
                align: "center",
            },
            {
                title: "Nama Pertemuan",
                dataIndex: "meeting",
                align: "center",
            },
            {
                title: "Deadline Tugas",
                dataIndex: "date",
                align: "center",
            }
        ];

        const channelList = dataTugas?.map((data, index) => {
            return {
                no: index + 1,
                meeting: data.meeting_name,
                date: data.date,
            };
        });

        return (
            <>
                <Table
                    className="text-capitalize"
                    columns={columns}
                    dataSource={channelList}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{x: 400}}
                />
                <div className="text-center mt-4">
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
                            title="Rekap Tugas"
                        />
                        <div className="row pt-2 pb-2 pl-4">
                            <div className="col-lg-3 mb-3">
                                <div className="form-group">
                                    <label className="mont-font fw-600 font-xsss">
                                        Deadline
                                    </label>
                                    <select
                                        className="form-control"
                                        name="pilih_meeting"
                                        required
                                        value={deadline}
                                        onChange={(e) => {
                                            setDeadline(e.target.value)
                                            _getTugas(e.target.value)
                                        }}
                                    >`
                                        <option value="" disabled>
                                            Pilih Pertemuan
                                        </option>
                                        <option value="0">
                                            Tugas Terlewat
                                        </option>
                                        <option value="1">
                                            Tugas Minggu Ini
                                        </option>
                                        <option value="2">
                                            Tugas Minggu Depan
                                        </option>
                                        <option value="3">
                                            Tugas Telah Dikerjakan
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <TabelKompetensi/>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <ViewKompetensi/>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}
