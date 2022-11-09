import React, {Fragment, useState, useEffect} from 'react';
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
    EyeOutlined, EyeInvisibleOutlined, LockOutlined,
} from "@ant-design/icons";
import {
    url_by_institute,
    global_join_sub_where_get, role_siswa_get_pertemuan
} from '../../../../api/reference';

import axios from 'axios';
import Search from "antd/es/input/Search";
import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import {useHistory, useParams} from 'react-router-dom';

const SiswaPertemuanTugas = () => {
    const [grid, setGrid] = useState(false);
    const [dataPertemuan, setDataPertemuan] = useState([])

    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");

    const userId = localStorage.getItem('user_id');
    const academicId = localStorage.getItem('academic_id')

    const params = useParams()
    const idTugas = params.id

    const _getDataPertemuan = () => {
        axios.post(url_by_institute, {
                "processDefinitionId": role_siswa_get_pertemuan,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "id_content": idTugas,
                            "id_siswa": userId,
                            "id_academic": academicId
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
            setDataPertemuan(dataRes?.data);
            const pagination = dataRes?.data?.links;
            setBtnPagination(pagination)
        })
    }

    useEffect(() => {
        _getDataPertemuan()
    }, [idTugas])

    // setTimeout(_getDataPertemuan, 5000)

    let history = useHistory();
    const handleRouter = (id, record) => {
        let myWindow;
        if (record.menit == 0) {
            myWindow = window.open(
                "https://lms.aneta.id:8443/wp-login.php?action=logout",
                "_blank",
                "location=yes,height=50,width=100,scrollbars=yes,status=yes"
            );
            setTimeout(function () {
                myWindow.close();
            }, 2000);
            history.push(`/siswa-kelas-tugas-${id}`, {
                dataTugas: record,
            });
        } else {
            history.push(`/siswa-kelas-tugas-${id}`, {
                dataTugas: record,
            });
        }
    };

    const data = dataPertemuan?.map((data, index) => {
        return {
            no: index + 1,
            id: data.contents_id,
            namaPertemuan: data.meeting_name,
            tanggalPertemuan: data.date,
            jam: `${data.time_start} - ${data.time_end}`,
            menit: data.menit,
            status: data.status,
            statusSiswa: data.status_siswa,
            file_name: data.file_name,
            file_path: data.file_path,
            class_type: data.class_type,
            sub_class: data.sub_class,
            meeting_name: data.meeting_name,
            tittle: data.tittle,
            is_upload: data.is_upload,
            idTugas: idTugas

        }
    });

    const textStatus = <span>Tugas dapat dikerjakan, tetapi tidak akan mendapat nilai</span>;

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
            title: 'Status',
            dataIndex: 'statusSiswa',
            align: 'center',
            render: (statusSiswa, record) => {
                let color = statusSiswa == 0 ? "green" : statusSiswa == 1 ? "red" : "orange";
                return (
                    <Tag style={{borderRadius: "15px"}} color={color} key={statusSiswa}>
                        {record.status == 2 && record.statusSiswa == 1 ? "Waktu Telah Habis" :statusSiswa == 0 ? "Tugas belum dikerjakan" : statusSiswa == 1 ? "Tugas sedang dikerjakan" : "Tugas sudah dikerjakan"}
                    </Tag>
                );
            }
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            responsive: ['sm'],
            render: (text, record) => (
                <Space size="middle">
                    {
                        record.status == 2 ?
                            <Tooltip placement="top" title={textStatus} color={'green'}>
                                <EyeOutlined onClick={() => {
                                    handleRouter(record.id, record)
                                }} style={{color: "green"}}/>
                            </Tooltip> : record.status == 1 ?
                                <EyeOutlined onClick={() => {
                                    handleRouter(record.id, record)
                                }} style={{color: "black"}}/> :
                                <LockOutlined style={{color: "red"}}/>
                    }
                </Space>
            ),
            // render: (text, record) => (
            //     <Space size="middle">
            //         <EyeOutlined onClick={() => {
            //             handleRouter(record.id, record)
            //         }} style={{color: "black"}}/>
            //     </Space>
            // ),
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
                            title="Data Pertemuan Tugas"
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
                                {grid == false ?
                                    <a>
                                        <AppstoreOutlined style={{fontSize: '30px'}}
                                                          onClick={() => setGrid(true)}/>
                                    </a> :
                                    <a>
                                        <MenuOutlined style={{fontSize: '30px'}}
                                                      onClick={() => setGrid(false)}/>
                                    </a>}
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Table className=""
                       columns={columns}
                       dataSource={data}
                       onChange={onChangeTable}
                       pagination={false}
                       rowClassName="bg-greylight text-grey-900"/>
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
                <Adminfooter/>
            </div>
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <ViewPertemuan/>
                </div>
            </div>
        </Fragment>
    );
}

export default SiswaPertemuanTugas;