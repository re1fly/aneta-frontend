import {useEffect, useState} from "react";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, {Fragment} from "react";
import {PageHeader, Card, Table, Button, Space, Menu, Dropdown, message, Modal, Form, Input, notification} from "antd"
import {
    AppstoreOutlined,
    MenuOutlined,
    EyeOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined, UserOutlined, LockOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import Filter from "../../../components/Filter";
import axios from "axios";
import {BASE_URL} from "../../../api/Url";
import Swal from "sweetalert2";
import {FormAdminKelas} from "../../../components/form/AdminKelas";
import {FormAdminDataInterval} from "../../../components/form/AdminDataInterval";

function DataIntervalPredikat() {
    const [grid, setGrid] = useState(false);
    const [dataInterval, setDataInterval] = useState([])
    const [paramsPage, setParamsPage] = useState("1");
    const [btnPagination, setBtnPagination] = useState([]);
    const institute = localStorage.getItem("institute");
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [selectedData, setSelectedData] = useState(null);


    const getDataInterval = () => {
        axios.post(BASE_URL, {
                "processDefinitionId": "dedcd8f3-2d8c-11ed-aacc-9a44706f3589",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "institute_id": institute,
                            "result": 10
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
            const resData = JSON.parse(response.data.variables[3].value)
            const dataItv = resData.data
            const pagination = resData.links;

            setDataInterval(dataItv)
            setBtnPagination(pagination);

        }).catch(error => {
            alert(error)
        });
    }
    const sinkronisasiData = () => {
        axios.post(BASE_URL, {
                "processDefinitionId": "819397e7-2d8f-11ed-9f7a-3e427f6ada72",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "institude_id": institute
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
            const res = JSON.parse(response.data.variables[2].value)
            const resCode = res.code

            if (resCode === true) {
                getDataInterval();
                notification.success({
                    message: "Sukses",
                    description: res.message,
                    placement: 'top',
                    className: 'text-capitalize'
                })
            } else {
                notification.error({
                    message: "Gagal",
                    description: res.message,
                    placement: 'top',
                    className: 'text-capitalize'
                })
            }

        }).catch(error => {
            alert(error)
        });
    }
    const deleteData = (record) => {
        Swal.fire({
            title: 'Apakah anda yakin menghapus data?',
            text: "Data yang telah terhapus dapat dikembalikan jika anda sinkronisasi data.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Hapus'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(BASE_URL, {
                        "processDefinitionId": "380b3aa5-fc3c-11ec-9ea6-c6ec5d98c2df",
                        "returnVariables": true,
                        "variables": [
                            {
                                "name": "get_data",
                                "type": "json",
                                "value": {
                                    "id_subject_master" : record.id
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
                    const res = JSON.parse(response.data.variables[2].value)
                    const resCode = res.status
                    if (resCode === true) {
                        getDataInterval()
                        Swal.fire(
                            'Data telah terhapus!',
                            'Menghapus data interval mata pelajaran ' + record.mataPelajaran,
                            'success'
                        )
                    } else {
                        notification.error({
                            message: "Gagal",
                            description: 'Data gagal dihapus',
                            placement: 'top',
                            className: 'text-capitalize'
                        })
                    }

                }).catch(error => {
                    alert(error)
                });
            }
        })

    }
    const editInterval = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

        axios.post(BASE_URL, {
                "processDefinitionId": "e2e8ced4-2d8d-11ed-aacc-9a44706f3589",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "get_data",
                        "type": "json",
                        "value": {
                            "id_matpel": selectedData.id,
                            "konten": [
                                {
                                    "min": data.nilai_a_min,
                                    "max": data.nilai_a_max,
                                    "predikat": "A",
                                    "id_predikat": 1
                                },
                                {
                                    "min": data.nilai_b_min,
                                    "max": data.nilai_b_max,
                                    "predikat": "B",
                                    "id_predikat": 2
                                },
                                {
                                    "min": data.nilai_c_min,
                                    "max": data.nilai_c_max,
                                    "predikat": "C",
                                    "id_predikat": 3
                                },
                                {
                                    "min": data.nilai_d_min,
                                    "max": data.nilai_d_max,
                                    "predikat": "D",
                                    "id_predikat": 4
                                }
                            ]
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
            const res = JSON.parse(response.data.variables[2].value)
            const resCode = res.code

            if (resCode === true) {
                setIsViewEdit(false);
                getDataInterval()
                notification.success({
                    message: "Sukses",
                    description: res.message,
                    placement: 'top',
                    className: 'text-capitalize'
                })
            } else {
                notification.error({
                    message: "Gagal",
                    description: res.message,
                    placement: 'top',
                    className: 'text-capitalize'
                })
            }
        }).catch(error => {
            alert(error)
        });

    };


    useEffect(() => {
        getDataInterval()
    }, [paramsPage]);


    const _onSelectMenu = ({key}) => {
        message.info(`Click on item ${key}`);
    };

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _onSearch = value => console.log(value);

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const showModalEdit = (record) => {
        setSelectedData(record)
        console.log(record)
        setIsViewEdit(true);
    };

    const FormEdit = () => {
        return (
            <FormAdminDataInterval
                setView={() => setIsViewEdit(false)}
                title={`Edit Data Interval ${selectedData.mataPelajaran}`}
                submit={editInterval}
                nilai_a_min={selectedData.nilai_a_min}
                nilai_a_max={selectedData.nilai_a_max}
                nilai_b_min={selectedData.nilai_b_min}
                nilai_b_max={selectedData.nilai_b_max}
                nilai_c_min={selectedData.nilai_c_min}
                nilai_c_max={selectedData.nilai_c_max}
                nilai_d_min={selectedData.nilai_d_min}
                nilai_d_max={selectedData.nilai_d_max}
            />
        )
    }

    const dataTableInterval = dataInterval.map((data, index) => {
        const nilaiInterval = data.konten;

        const nilaiA = nilaiInterval.find(nilai => nilai.predikat == 'A');
        const getIntervalA = `${nilaiA.min} - ${nilaiA.max}`

        const nilaiB = nilaiInterval.find(nilai => nilai.predikat == 'B');
        const getIntervalB = `${nilaiB.min} - ${nilaiB.max}`

        const nilaiC = nilaiInterval.find(nilai => nilai.predikat == 'C');
        const getIntervalC = `${nilaiC.min} - ${nilaiC.max}`

        const nilaiD = nilaiInterval.find(nilai => nilai.predikat == 'D');
        const getIntervalD = `${nilaiD.min} - ${nilaiD.max}`


        return {
            no: index + 1,
            id: data.id_matpel,
            mataPelajaran: data.matpel,
            ta_smt: `${data.academic_year} / ${data.semester}`,
            tingkatKelas: data.tingkat,
            nilai_a: getIntervalA,
            nilai_a_min: nilaiA.min,
            nilai_a_max: nilaiA.max,
            nilai_b: getIntervalB,
            nilai_b_min: nilaiB.min,
            nilai_b_max: nilaiB.max,
            nilai_c: getIntervalC,
            nilai_c_min: nilaiC.min,
            nilai_c_max: nilaiC.max,
            nilai_d: getIntervalD,
            nilai_d_min: nilaiD.min,
            nilai_d_max: nilaiD.max,
        }

    })

    const TabelDataPredikat = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
            },
            {
                title: 'Mata Pelajaran',
                dataIndex: 'mataPelajaran',
            },
            {
                title: 'TA / Semester',
                dataIndex: 'ta_smt',
                align: 'center'
            },
            {
                title: 'Tingkat Kelas',
                dataIndex: 'tingkatKelas',
                align: 'center'
            },
            {
                title: 'Nilai A',
                dataIndex: 'nilai_a',
                align: 'center'
            },
            {
                title: 'Nilai B',
                dataIndex: 'nilai_b',
                align: 'center'
            },
            {
                title: 'Nilai C',
                dataIndex: 'nilai_c',
                align: 'center'
            },
            {
                title: 'Nilai D',
                dataIndex: 'nilai_d',
                align: 'center'
            },
            {
                title: 'Aksi',
                dataIndex: 'aksi',
                align: "center",
                render: (text, record) => (
                    <Space size="middle">
                        <EditOutlined style={{color: "blue"}} onClick={() => showModalEdit(record)}/>
                        <DeleteOutlined style={{color: "red"}} onClick={() => deleteData(record)}/>

                    </Space>
                ),
            },
        ];


        return (
            <>
                <Table className=""
                       columns={columns}
                       dataSource={dataTableInterval}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900 text-capitalize"
                       scroll={{x: 400}}/>
                <div className="text-center mt-4">
                    {btnPagination.map((dataBtn, index) => {
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
                                key={`interval_${index}`}
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

        )
    }

    const CardDataPredikat = () => {
        const channelList =
            dataInterval.map((data, index) => {
                const nilaiInterval = data.konten;

                const nilaiA = nilaiInterval.find(nilai => nilai.predikat == 'A');
                const getIntervalA = `${nilaiA.min} - ${nilaiA.max}`

                const nilaiB = nilaiInterval.find(nilai => nilai.predikat == 'B');
                const getIntervalB = `${nilaiB.min} - ${nilaiB.max}`

                const nilaiC = nilaiInterval.find(nilai => nilai.predikat == 'C');
                const getIntervalC = `${nilaiC.min} - ${nilaiC.max}`

                const nilaiD = nilaiInterval.find(nilai => nilai.predikat == 'D');
                const getIntervalD = `${nilaiD.min} - ${nilaiD.max}`
                return {
                    title: data.matpel,
                    tag3: data.semester == 1 ? data.academic_year + ' / Ganjil' : '',
                    tag1: data.semester == 2 ? data.academic_year + ' / Genap' : '',
                    tingkatKelas: data.tingkat,
                    nilai_a: getIntervalA,
                    nilai_b: getIntervalB,
                    nilai_c: getIntervalC,
                    nilai_d: getIntervalD,
                }
            })

        return (
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div
                            className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span
                                className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                Aktif
                            </span>
                            <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                      overlay={_Account}>
                                <EllipsisOutlined/>
                            </Dropdown>
                            <h4 className="fw-700 font-xs mt-5 mb-4 text-capitalize">{value.title}</h4>
                            <div className="clearfix"></div>
                            {value.tag1 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1 mt-2">
                                    {value.tag1}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag2 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                    {value.tag2}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag3 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-1">
                                    {value.tag3}
                                </span>
                            ) : (
                                ''
                            )}
                            <div className="clearfix"></div>
                            <div className="mt-5 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Tingkat Kelas</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.tingkatKelas}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Nilai A</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.nilai_a}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Nilai B</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.nilai_b}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Nilai C</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.nilai_c}</p>
                                    </div>
                                </div>
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Nilai D</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: {value.nilai_d}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewDataPredikat = () => {
        return (
            <div className="container px-3 py-4 ">
                <PageHeader
                    className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                    onBack={() => window.history.back()}
                    title="Data Interval Predikat"
                />
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button className="mr-4" type="primary" shape="round" size='middle'
                                    onClick={() => sinkronisasiData()}>
                                Sinkronisasi
                            </Button>
                            {/* <Filter title1="Kompetensi" title2="Kelas" /> */}
                            {/* <Dropdown overlay={_filterMenu}>
                            <a className="ant-dropdown-link mr-4 font-bold"
                            onClick={e => e.preventDefault()}>
                            Filter by <DownOutlined/>
                            </a>
                        </Dropdown>
                        <Dropdown overlay={_sortMenu}>
                            <a className="ant-dropdown-link font-bold"
                            onClick={e => e.preventDefault()}>
                            Sort by <DownOutlined/>
                            </a>
                        </Dropdown> */}
                        </div>
                        <div className="col-lg-4 col-md-6 my-2">
                            <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                    onSearch={_onSearch} style={{width: '80%'}}/>
                            {grid == false ?
                                <a>
                                    <AppstoreOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                      onClick={() => setGrid(true)}/>
                                </a> :
                                <a>
                                    <MenuOutlined style={{fontSize: '2em', lineHeight: 1}}
                                                  onClick={() => setGrid(false)}/>
                                </a>
                            }
                        </div>
                    </div>
                </Card>
                <div className="row d-flex align-items-center">

                </div>
                <div className="mt-4">
                    {grid ? <CardDataPredikat/> : <TabelDataPredikat/>}
                </div>
            </div>
        )
    }



    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {isViewEdit ? <FormEdit /> : <ViewDataPredikat/>
                    }
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default DataIntervalPredikat;