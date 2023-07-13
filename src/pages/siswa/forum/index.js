import React, {Fragment, useEffect, useState} from "react";
import Navheader from "../../../components/Navheader.js";
import Appheader from "../../../components/Appheader.js";
import Adminfooter from "../../../components/Adminfooter.js";
import {Card, Collapse, Divider, notification, PageHeader, Spin} from "antd";
import axios from "axios";
import {
    global_insert,
    role_guru_get_forum_detail,
    role_siswa_get_forum,
    url_by_institute
} from "../../../api/reference.js";
import {DataNotFound} from "../../../components/misc/DataNotFound.js";

function ForumSiswa() {
    const [dataForum, setDataForum] = useState([])
    const [detailForum, setDetailForum] = useState([])
    const [isMeetingTugas, setIsMeetingTugas] = useState("")
    const [paramMeeting, setParamMeeting] = useState({})
    const [dataPertemuan, setDataPertemuan] = useState([])
    const academicYear = localStorage.getItem('academic_id')
    const userId = localStorage.getItem('user_id')
    const [selectedForum, setSelectedForum] = useState()
    const [selectedDataForum, setSelectedDataForum] = useState({})
    const [viewForum, setViewForum] = useState(true);
    const [loading, setLoading] = useState(false);
    const [countRender, setCountRender] = useState(0)
    const [dataSuccess, setDataSuccess] = useState(false)
    const {Panel} = Collapse;

    const _getPertemuan = (e) => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": "rolesiswagetmateri:1:3dbe87e7-4ac6-11ed-8f22-927b5be84510",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "id_academic": academicYear,
                                "id_user": userId,
                                "type": e.target.value
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
                setDataPertemuan(data.data)
            });
    }

    const _getForum = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": role_siswa_get_forum,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": paramMeeting
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
                const datas = data.data
                setDataForum(datas)
                if (datas.length >= 1) {
                    setLoading(false)
                    setDataSuccess(true)
                } else {
                    setDataSuccess(false)
                    setLoading(false)
                    setCountRender(countRender + 1)
                }
            });
    }

    const _getDetailForum = () => {
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": role_guru_get_forum_detail,
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
                const responseData = data.message;
                setDetailForum(data.data)
                if (responseData == "succes get data") {
                    setLoading(false)
                    setDataSuccess(true)
                } else {
                    setDataSuccess(false)
                    setCountRender(countRender + 1)
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
                    "processDefinitionId": global_insert,
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

    const _submitReply = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios
            .post(
                url_by_institute, {
                    "processDefinitionId": global_insert,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_Insert",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_subjects_schedule_contents_meeting_forum_reply_subModel",
                                "tbl_coloumn": {
                                    "id_reply": data.id_reply,
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
                if (dataRes.status == 'success') {
                    notification.success({
                        message: "Sukses",
                        description: "Comment berhasil dibuat.",
                        placement: "top",
                    });
                    _getDetailForum()
                    document.getElementById("reply_forum").value = "";
                } else {
                    notification.error({
                        message: "Error",
                        description: "Error harap hubungi Admin.",
                        placement: "top",
                    });
                }
            });
    }

    useEffect(() => {
        _getDetailForum()
    }, [viewForum === false]);

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        {
                            viewForum ?
                                <>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <PageHeader
                                                className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                                onBack={() => window.history.back()}
                                                title="Forum Diskusi"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-lg-3 mb-3">
                                            <div className="form-group">
                                                {/*<label className="mont-font fw-600 font-xsss">*/}
                                                {/*    Pertemuan*/}
                                                {/*</label>*/}
                                                <select
                                                    className="form-control"
                                                    name="pilih_meeting"
                                                    required
                                                    value={isMeetingTugas}
                                                    onChange={(e) => {
                                                        setIsMeetingTugas(e.target.value)
                                                        _getPertemuan(e)
                                                    }}
                                                >`
                                                    <option value="" disabled>
                                                        Pilih Pertemuan
                                                    </option>
                                                    <option value="2">
                                                        Tugas
                                                    </option>
                                                    <option value="1">
                                                        Materi
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 mb-3">
                                            <div className="form-group">
                                                <select
                                                    className="form-control"
                                                    name="pilih_mapel"
                                                    required
                                                    onChange={(e) => {
                                                        setParamMeeting(JSON.parse(e.target.value))
                                                    }}
                                                    disabled={isMeetingTugas == "" ? true : false}
                                                >
                                                    {
                                                        isMeetingTugas == "1" ?
                                                            <option value="">
                                                                Pilih Materi
                                                            </option> : isMeetingTugas == "2" ?
                                                                <option value="">
                                                                    Pilih Tugas
                                                                </option> :
                                                                <option value="" disabled>
                                                                    Pilih Mapel
                                                                </option>
                                                    }
                                                    {dataPertemuan.map((data, i) => {
                                                        return (
                                                            <option
                                                                value={JSON.stringify({
                                                                    id_matpel: data.id_matpel,
                                                                    id_class: data.id_kelas,
                                                                    type: isMeetingTugas,
                                                                    id_academic: academicYear
                                                                })}
                                                                className="text-capitalize"
                                                            >
                                                                {data.nama_matpel}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 mb-3">
                                            <button
                                                className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 rounded-lg d-inline-block"
                                                type='button'
                                                onClick={() => {
                                                    setLoading(true)
                                                    _getForum()
                                                }}
                                            >
                                                Cari Forum
                                            </button>
                                        </div>
                                    </div>

                                    <Spin tip="Loading..." spinning={loading} className='mt-5'>
                                        {dataForum.length >= 1 ?
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
                                                              setLoading(true)
                                                              setSelectedForum(data.id)
                                                              setViewForum(false)
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
                                            }) :
                                            <DataNotFound/>
                                        }
                                    </Spin>
                                </> :
                                <>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <PageHeader
                                                className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                                onBack={() => setViewForum(true)}
                                                title="Forum Diskusi Detail"
                                            />
                                        </div>
                                    </div>
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
                         id="reply_forum"/>
                                        <button
                                            className="btn bg-current text-white mt-3 mb-4 position-relative float-right"
                                            type="submit"
                                        >
                                            Comment
                                        </button>
                                    </form>

                                    <div className="clearfix"></div>
                                    <Spin tip="Loading..." spinning={loading} className='mt-5'>
                                        {detailForum.map((data) => {
                                            const id = data.id
                                            return (
                                                <Card type="inner"
                                                      title={data.name}
                                                      className='text-capitalize mb-3'
                                                      style={{borderRadius: '5px'}}
                                                      hoverable
                                                      extra={<i
                                                          className="feather-message-circle w350 text-primary"></i>}
                                                >
                                                    <p>{data.reply}</p>
                                                    <Collapse size="small">
                                                        <Panel
                                                            header={`Baca Balasan Komentar (${data.sub_reply.length})`}
                                                            key="1">
                                                            {
                                                                data.sub_reply.map((value) => {
                                                                    return (
                                                                        <>
                                                                            <Card type="inner"
                                                                                  title={value.name}
                                                                                  className='text-capitalize mb-3'
                                                                                  style={{borderRadius: '5px'}}
                                                                                  hoverable
                                                                                  extra={<i
                                                                                      className="feather-message-square w350 text-success"></i>}
                                                                            >
                                                                                <p>{value.reply}</p>
                                                                            </Card>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                            <form onSubmit={e => _submitReply(e)}>
                                                                <h4 className="mt-4">Balas Komentar ini</h4>
                                                                <textarea
                                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                                    rows="5"
                                                                    placeholder="Balas komentar..."
                                                                    name="reply_forum"
                                                                ></textarea>
                                                                <input name="id_reply" type="hidden"
                                                                       value={data.id_reply}/>
                                                                <button
                                                                    className="btn bg-current text-white mt-3 mb-4 position-relative float-right"
                                                                    type="submit"
                                                                    // onClick={() => _submitReply(data.id_reply)}
                                                                >
                                                                    Comment
                                                                </button>
                                                            </form>
                                                        </Panel>
                                                    </Collapse>
                                                </Card>
                                            )
                                        })}
                                    </Spin>
                                </>
                        }
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default ForumSiswa;