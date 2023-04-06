import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Card, Col, Divider, notification, PageHeader} from "antd";
import Navheader from "../../../components/Navheader.js";
import Appheader from "../../../components/Appheader.js";
import Adminfooter from "../../../components/Adminfooter.js";
import axios from "axios";
import {
    get_where_no_join,
    global_join_sub_where_get,
    role_guru_get_sub_class,
    url_by_institute
} from "../../../api/reference.js";
import TextArea from "antd/es/input/TextArea.js";

function ForumGuru() {
    const [dataForum, setDataForum] = useState([])
    const [detailForum, setDetailForum] = useState([])
    const [dataMateri, setDataMateri] = useState([])
    const [dataTugas, setDataTugas] = useState([])
    const userId = localStorage.getItem('user_id')
    const academicId = localStorage.getItem('academic_year')
    const [selectedForum, setSelectedForum] = useState()
    const [selectedDataForum, setSelectedDataForum] = useState({})
    const [viewDetail, setViewDetail] = useState(false)
    const [viewCreate, setViewCreate] = useState(false);
    const [viewForum, setViewForum] = useState(true);
    const [isMeetingTugas, setIsMeetingTugas] = useState("")

    const _getDataForum = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": "rolegurugetforum:1:0a63c8c5-a92c-11ed-9c1d-6ea2a406192e",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "id_guru": userId,
                                "id_academic": academicId
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
                const data = JSON.parse(response.data.variables[2].value);
                setDataForum(data.data)
                console.log(response)
            });
    }

    const _getDetailForum = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": "rolegurugetforumdetail:1:ab83f418-a92c-11ed-9c1d-6ea2a406192e",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "id_forum": selectedForum
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
                const data = JSON.parse(response.data.variables[2].value);
                setDetailForum(data.data)
                console.log(detailForum)
            });
    }

    const _getMateri = () => {
        axios
            .post(
                url_by_institute,
                {
                    processDefinitionId: global_join_sub_where_get,
                    returnVariables: true,
                    variables: [
                        {
                            name: "global_join_where_sub",
                            type: "json",
                            value: {
                                tbl_induk: "x_academic_subjects_schedule_contents_meeting",
                                select: [
                                    "x_academic_subjects_schedule_contents_meeting.id",
                                    "x_academic_subjects_schedule_contents_meeting.meeting_name",
                                    "x_academic_subjects_schedule_date.date",
                                    "x_academic_subjects_schedule_time.time_start",
                                    "x_academic_subjects_schedule_time.time_end",
                                    "x_academic_subjects_schedule_contents.tittle",
                                    "r_class_type.class_type",
                                    "x_academic_class.sub_class",
                                    "x_academic_subjects_schedule_contents_files.file_name"
                                ],
                                paginate: 100000,
                                join: [
                                    {
                                        tbl_join: "x_academic_subjects_schedule_contents_files",
                                        refkey: "subjects_schedule_contents_id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "id",
                                    },
                                    {
                                        tbl_join: "x_academic_subjects_schedule_date",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "schedule_date_id",
                                    },
                                    {
                                        tbl_join: "x_academic_subjects_schedule_time",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "schedule_time_id",
                                    },
                                    {
                                        tbl_join: "x_academic_subjects_schedule_contents",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "contents_id",
                                    },
                                    {
                                        tbl_join: "x_academic_class",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents",
                                        foregenkey: "class_id",
                                    },
                                    {
                                        tbl_join: "r_class_type",
                                        refkey: "id",
                                        tbl_join2: "x_academic_class",
                                        foregenkey: "class",
                                    },
                                ],
                                where: [
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "subjects_content_type_id",
                                        tbl_value: "1",
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "created_by",
                                        tbl_value: userId,
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "deleted_at",
                                        tbl_value: "",
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn:
                                            "x_academic_subjects_schedule_contents_meeting",
                                        tbl_field: "deleted_at",
                                        tbl_value: "",
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "academic_year_id",
                                        tbl_value: academicId,
                                        operator: "=",
                                    },
                                ],
                                order_coloumn:
                                    "x_academic_subjects_schedule_contents_meeting.updated_at",
                                order_by: "desc",
                            },
                        },
                        {
                            name: "page",
                            type: "string",
                            value: '1',
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
                setDataMateri(dataRes?.data?.data);
            });
    }

    const _getTugas = () => {
        axios
            .post(
                url_by_institute,
                {
                    processDefinitionId: global_join_sub_where_get,
                    returnVariables: true,
                    variables: [
                        {
                            name: "global_join_where_sub",
                            type: "json",
                            value: {
                                tbl_induk: "x_academic_subjects_schedule_contents_meeting",
                                select: [
                                    "x_academic_subjects_schedule_contents_meeting.id",
                                    "x_academic_subjects_schedule_contents_meeting.meeting_name",
                                    "x_academic_subjects_schedule_date.date",
                                    "x_academic_subjects_schedule_time.time_start",
                                    "x_academic_subjects_schedule_time.time_end",
                                    "x_academic_subjects_schedule_contents.tittle",
                                    "r_class_type.class_type",
                                    "x_academic_class.sub_class",
                                    "x_academic_subjects_schedule_contents_files.file_name"
                                ],
                                paginate: 100000,

                                join: [
                                    {
                                        tbl_join: "x_academic_subjects_schedule_contents_files",
                                        refkey: "subjects_schedule_contents_id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "id",
                                    },
                                    {
                                        tbl_join: "x_academic_subjects_schedule_date",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "schedule_date_id",
                                    },
                                    {
                                        tbl_join: "x_academic_subjects_schedule_time",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "schedule_time_id",
                                    },
                                    {
                                        tbl_join: "x_academic_subjects_schedule_contents",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                                        foregenkey: "contents_id",
                                    },
                                    {
                                        tbl_join: "x_academic_class",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents",
                                        foregenkey: "class_id",
                                    },
                                    {
                                        tbl_join: "r_class_type",
                                        refkey: "id",
                                        tbl_join2: "x_academic_class",
                                        foregenkey: "class",
                                    },
                                ],
                                where: [
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "subjects_content_type_id",
                                        tbl_value: "2",
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "created_by",
                                        tbl_value: userId,
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "deleted_at",
                                        tbl_value: "",
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn:
                                            "x_academic_subjects_schedule_contents_meeting",
                                        tbl_field: "deleted_at",
                                        tbl_value: "",
                                        operator: "=",
                                    },
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "academic_year_id",
                                        tbl_value: academicId,
                                        operator: "=",
                                    },
                                ],
                                order_coloumn:
                                    "x_academic_subjects_schedule_contents_meeting.updated_at",
                                order_by: "desc",
                            },
                        },
                        {
                            name: "page",
                            type: "string",
                            value: '1',
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
                setDataTugas(dataRes?.data?.data);
            });
    }

    const _createForum = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios
            .post(
                url_by_institute, {
                    "processDefinitionId": "GlobalInsertRecord:1:f45afc4a-2ccb-11ed-aacc-9a44706f3589",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_Insert",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_subjects_schedule_contents_meeting_forumModel",
                                "tbl_coloumn": {
                                    "id_meeting": data.pertemuan_forum,
                                    "topic": data.topik_forum,
                                    "description": data.desc_forum
                                }
                            }
                        }
                    ]
                }
                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic YWRtaW46TWFuYWczciE=",
                    },
                }
            )
            .then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                console.log(response)
                if (dataRes.status == 'success') {
                    notification.success({
                        message: "Sukses",
                        description: "Forum berhasil dibuat.",
                        placement: "top",
                    });
                    setViewCreate(false)
                    setViewForum(true)
                    _getDataForum()
                } else {
                    notification.error({
                        message: "Error",
                        description: "Error harap hubungi Admin.",
                        placement: "top",
                    });
                }
            });
    }

    const _submitComment = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios
            .post(
                url_by_institute, {
                    "processDefinitionId": "GlobalInsertRecord:1:f45afc4a-2ccb-11ed-aacc-9a44706f3589",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_Insert",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_subjects_schedule_contents_meeting_forum_replyModel",
                                "tbl_coloumn": {
                                    "id_forum": selectedForum,
                                    "id_user": userId,
                                    "reply": data.reply_forum
                                }
                            }
                        }
                    ]
                }
                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic YWRtaW46TWFuYWczciE=",
                    },
                }
            )
            .then(function (response) {
                const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                console.log(response)
                if (dataRes.status == 'success') {
                    notification.success({
                        message: "Sukses",
                        description: "Comment berhasil dibuat.",
                        placement: "top",
                    });
                    _getDetailForum()
                } else {
                    notification.error({
                        message: "Error",
                        description: "Error harap hubungi Admin.",
                        placement: "top",
                    });
                }
            });
    }

    const viewCreateForum = () => {
        setViewForum(false)
        setViewCreate(true)
    }

    const ViewCreateForum = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i onClick={() => {
                                        setViewCreate(false)
                                        setViewForum(true)
                                    }}
                                       className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Create Forum
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <form onSubmit={_createForum}
                                          method="POST">

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Pertemuan
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        name="pilih_meeting"
                                                        required
                                                        value={isMeetingTugas}
                                                        onChange={(e) => {
                                                            setIsMeetingTugas(e.target.value)
                                                        }}
                                                    >`
                                                        <option value="">
                                                            Pilih Pertemuan
                                                        </option>
                                                        <option value="1">
                                                            Tugas
                                                        </option>
                                                        <option value="0">
                                                            Materi
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            {
                                                isMeetingTugas == "1" ?
                                                    <div className="col-lg-6 mb-3">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">
                                                                Pertemuan Tugas
                                                            </label>
                                                            <select
                                                                className="form-control"
                                                                aria-label="Default select example"
                                                                name="pertemuan_forum"
                                                                required
                                                            >
                                                                <option value="" selected disabled>
                                                                    Pilih Tugas
                                                                </option>
                                                                {dataTugas.map((data, i) => {
                                                                    return (
                                                                        <option
                                                                            value={data.id}
                                                                        >
                                                                            {data.meeting_name}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div> : isMeetingTugas == "0" ?
                                                        <div className="col-lg-6 mb-3">
                                                            <div className="form-group">
                                                                <label className="mont-font fw-600 font-xsss">
                                                                    Pertemuan Materi
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    aria-label="Default select example"
                                                                    name="pertemuan_forum"
                                                                    required
                                                                >
                                                                    <option value="" selected disabled>
                                                                        Pilih Materi
                                                                    </option>
                                                                    {dataMateri.map((data, i) => {
                                                                        return (
                                                                            <option
                                                                                value={data.id}
                                                                            >
                                                                                {data.meeting_name}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div> : null
                                            }

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Topik
                                                    </label>
                                                    <input type="text"
                                                           name="topik_forum"
                                                           className="form-control"
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Deskripsi Topik
                                                    </label>
                                                    <textarea
                                                        className="form-control mb-0 p-3 bg-greylight lh-16"
                                                        rows="5"
                                                        placeholder="Isi deskripsi topik..."
                                                        name="desc_forum"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Buat Forum
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setViewCreate(false)
                                                        setViewForum(true)
                                                    }}
                                                    className="ml-2 bg-lightblue border-0 text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const ViewDetailForum = () => {
        return (
            <>
                <Card type="inner"
                      title={selectedDataForum.topic}
                      className='text-capitalize mb-3 mt-3'
                      style={{borderRadius: '15px'}}
                      hoverable
                >
                    <p className='mb-5'>{selectedDataForum.desc}</p>
                    <p className='text-grey-600 float-right'>
                                                <span
                                                    className='text-ornage'>{selectedDataForum.tingkat} / {selectedDataForum.subClass}</span> | <span
                        className='text-ornage'>{selectedDataForum.namaMapel}</span> | <span
                        className='text-ornage'>{selectedDataForum.namaMeet}</span>
                    </p>
                </Card>
                <Divider className="text-primary">Comments</Divider>
                <form onSubmit={_submitComment}>
                     <textarea
                         className="form-control mb-0 p-3 bg-greylight lh-16"
                         rows="5"
                         placeholder="Balas Forum..."
                         name="reply_forum"
                     ></textarea>
                    <button
                        className="btn bg-current text-white mt-3 mb-4 position-relative float-right"
                        type="submit"
                    >
                        Comment
                    </button>
                </form>

                <div className="clearfix"></div>

                {detailForum.map((data) => {
                    const id = data.id
                    return (
                        <Card type="inner"
                              title={data.name}
                              className='text-capitalize mb-3'
                              style={{borderRadius: '5px'}}
                              hoverable
                              extra={<i className="feather-message-circle w350 text-primary"></i>}
                        >
                            <p>{data.reply}</p>
                        </Card>
                    )
                })}
            </>
        )
    }

    const ViewForum = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => setViewDetail(false)}
                            title="Forum Diskusi"
                        />
                    </div>
                    {
                        viewDetail !== true ?
                            <div className="col-4 p-4">
                                <Button
                                    className="mr-4 mt-2"
                                    type="primary"
                                    shape="round"
                                    size="middle"
                                    onClick={() => viewCreateForum()}
                                >
                                    Buat Forum
                                </Button>
                            </div> : null
                    }

                </div>
                {
                    viewDetail !== true ?
                        dataForum.map((data) => {
                            const id = data.id
                            return (
                                <Card type="inner"
                                      title={data.topic}
                                      className='text-capitalize mb-3'
                                      style={{borderRadius: '15px'}}
                                      hoverable
                                      extra={<button className='btn btn-primary'>
                                          <i className="feather-message-circle w350"> {data.jumlah_reply}</i>
                                      </button>}
                                      onClick={() => {
                                          setSelectedForum(data.id)
                                          setViewDetail(true)
                                          setSelectedDataForum({
                                              id: data.id,
                                              topic: data.topic,
                                              desc: data.description,
                                              tingkat: data.tingkat,
                                              subClass: data.sub_class,
                                              namaMapel: data.nama_mata,
                                              namaMeet: data.meeting_name
                                          })
                                      }}
                                >
                                    <p className='mb-5'>{data.description}</p>
                                    <p className='text-grey-600 float-right'>
                                                <span
                                                    className='text-ornage'>{data.tingkat} / {data.sub_class}</span> | <span
                                        className='text-ornage'>{data.nama_mata}</span> | <span
                                        className='text-ornage'>{data.meeting_name}</span>
                                    </p>
                                </Card>
                            )
                        }) : <ViewDetailForum />

                }
            </div>
        )
    }

    useEffect(() => {
        _getDataForum()
        _getMateri()
        _getTugas()
    }, [viewForum]);

    useEffect(() => {
        _getDetailForum()
    }, [viewDetail === true]);


    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {
                        viewForum ? <ViewForum/> :
                            viewCreate ? <ViewCreateForum/> : null
                    }
                    {/*<button className='btn btn-primary' onClick={() => console.log(selectedForum)}>*/}
                    {/*    <i className="feather-message-circle w350"> TEST</i></button>*/}
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default ForumGuru;