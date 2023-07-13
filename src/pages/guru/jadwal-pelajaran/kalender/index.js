import {Badge, Calendar, Card, DatePicker, notification, PageHeader, Spin} from "antd";
import Search from "antd/lib/transfer/search";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Adminfooter from "../../../../components/Adminfooter";
import Appheader from "../../../../components/Appheader";
import Navheader from "../../../../components/Navheader";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TanggalKalenderGuru } from "../../../../redux/Action";
import {role_guru_get_kalender, url_by_institute} from "../../../../api/reference";
import axios from "axios";
import { useState } from "react";

export default function GuruKalender() {

    const [dataTanggal, setDataTanggal] = useState([])
    const [loading, setLoading] = useState(true);
    const [countRender, setCountRender] = useState(0)
    const [dataSuccess, setDataSuccess] = useState(false)

    const userId = localStorage.getItem("user_id")
    const academicId = localStorage.getItem("academic_year");
    const [currentMonth, setCurrentMonth] = useState( moment().format('MM'));
    const [currentYear, setCurrentYear] = useState(moment().year());


    const dispatch = useDispatch();
    const _onSearch = value => console.log(value);

    const _getDataKalender = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": role_guru_get_kalender,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_guru": userId,
                            "bulan": currentMonth,
                            "year": currentYear,
                            "id_academik": academicId,

                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            console.log(currentMonth)
            console.log(currentYear)
            setDataTanggal(dataRes.data)
            const responseData = dataRes.code;
            if (responseData == true){
                setLoading(false)
                setDataSuccess(true)
            }else{
                setDataSuccess(false)
                setCountRender(countRender + 1)
            }
        })
    }
    const _loadingData = () => {
        if(dataSuccess == false){
            _getDataKalender()
        }
    }

    if(countRender > 1 && countRender < 4){
        setInterval(_loadingData, 5000)
        console.log('5s')
    }

    useEffect(() => {
        _getDataKalender()
    }, [userId, currentMonth, currentYear])

    const headerRender = () => null;


    const getListData = (value, dataTanggal) => {
        let listData;
        const forDate = '0' + value.date();
        const date = forDate.slice(-2)
        const forMonth = '0' + (value.month() + 1);
        const month = forMonth.slice(-2)
        const year = value.year();
        const allDay = `${year}-${month}-${date}`;

        {
            dataTanggal?.map((tanggal, i) => {
                switch (allDay) {
                    case tanggal.date:
                        listData = [
                            {
                                type: tanggal.materi == true ? 'success' : null,
                                content: tanggal.materi == true ? 'Materi' : null,
                            },
                            {
                                type: tanggal.tugas == true ? 'warning' : null,
                                content: tanggal.tugas == true ? 'Tugas' : null,
                            },
                        ];
                        break;
                    default:
                }
            });
        }

        return listData || [];
    };

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value, dataTanggal);

        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge className="font-xsss" status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    let history = useHistory();
    const selectKalender = (e) => {
        const tanggal = e.format("YYYY/MM/DD")
        dispatch(TanggalKalenderGuru(tanggal));
        history.push(`/guru-list-pertemuan-kalender`, {
            dataTanggal: tanggal
        })
    }

    const onChangeDate = (date, dateString) => {
        setLoading(true)
        const month = dateString.split('-')[0];
        const year = dateString.split('-')[1];
        setCurrentMonth(month)
        setCurrentYear(year)
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    title="Jadwal Pelajaran Kalender"
                                />
                                <div className="d-flex justify-content-between">
                                    <div></div>
                                    <div className="mr-3">
                                        <DatePicker onChange={onChangeDate}
                                                    picker="month"
                                                    format="MM-YYYY"
                                                    placeholder="Filter Bulan & Tahun"
                                                    size="middle"
                                                    style={{width: '200px'}}
                                        />
                                    </div>
                                </div>
                                <Spin tip="Loading..." spinning={loading}>
                                <Calendar
                                    className="mt-5"
                                    dateCellRender={dateCellRender}
                                    monthCellRender={monthCellRender}
                                    onSelect={selectKalender}
                                    headerRender={headerRender}
                                />
                                </Spin>
                            </div>
                        </div>
                    </div>

                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}