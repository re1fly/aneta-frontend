import {notification} from "antd";
import axios from "axios";
import React from "react";
import {useEffect, useState} from "react";
import {
    role_guru_edit_penilaian,
    role_guru_get_edit_penilaian, role_guru_submit_penilaian_tugas_siswa,
    url_by_institute,
} from "../../api/reference";
import {pageLoad} from "../misc/loadPage";

export const FormGuruNilaiTugas = (props) => {
    const [dataNilai, setDataNilai] = useState([]);
    const [feedback, setFeedback] = useState(props.feedback);
    const detailReview = props.dataReview
    console.log(JSON.stringify(dataNilai, null, 2));

    useEffect(() => {
        axios
            .post(
                url_by_institute,
                {
                    processDefinitionId: role_guru_get_edit_penilaian,
                    returnVariables: true,
                    variables: [
                        {
                            name: "data",
                            type: "json",
                            value: {
                                id_siswa: props.idSiswa,
                                id_content: props.idContent,
                            },
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
                const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                setDataNilai(dataRes?.data);
            });
    }, [props.idSiswa, props.idContent]);

    const _submitNilai = () => {
        const formCV = document.querySelector("#form_nilai");
        const formData = new FormData(formCV);

        const nilaiKompetensi = formData.getAll("nilai_kompetensi");

        const allNilai = [];
        const nilaiCompetence = [];
        console.log(nilaiCompetence);

        for (let i = 0; i < nilaiKompetensi.length; i++) {
            nilaiCompetence.push({
                nilai: nilaiKompetensi[i],
            });
        }

        const checkDataFunc = () => {
            let checkData1 = [];
            dataNilai.map((dd, i) => {
                if (dd.length != 0) {
                    checkData1.push("ada");
                } else {
                    checkData1.push("kosong");
                }
            });
            return !checkData1.includes("kosong");
        };
        // console.log(checkDataFunc());

        if (checkDataFunc()) {
            dataNilai?.map((data, i) => {
                console.log(data);
                allNilai.push({
                    id_kompetensi: data.id_kompetensi,
                    kompetensi: data.kompetensi,
                    ...nilaiCompetence[i],
                });
            });
        }

        console.log(JSON.stringify(allNilai, null, 2));

        if (checkDataFunc()) {
            axios
                .post(
                    url_by_institute,
                    {
                        processDefinitionId: role_guru_edit_penilaian,
                        returnVariables: true,
                        variables: [
                            {
                                name: "data",
                                type: "json",
                                value: {
                                    nama_siswa: props.nama,
                                    id_siswa: props.idSiswa,
                                    id_content: props.idContent,
                                    is_upload: props.isUpload,
                                    data: allNilai,
                                },
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
                    console.log(response);
                    const dataRes = JSON.parse(response.data.variables[2].value);
                    const resCode = dataRes.code;
                    if (resCode === 200) {
                        pageLoad();
                        notification.success({
                            message: "Sukses",
                            description: "Nilai berhasil di input",
                            placement: "top",
                        });
                    } else {
                        notification.info({
                            message: "Gagal",
                            description: "Nilai tidak berhasil di input",
                            placement: "top",
                        });
                    }
                });
        } else {
            console.log("data ada yang kosong");
            notification.info({
                message: "Gagal Simpan data",
                description: "Data ada yang kosong",
                placement: "top",
            });
        }
    };

    const _submitReview2 = () => {
        const formCV = document.querySelector("#form_review");
        const formData = new FormData(formCV);

        const nilaiReview = formData.getAll("nilai_review");
        const idReview = formData.getAll("id_review");
        const feedbackReview = formData.getAll("feedback_review");
        const bobotSiswa = formData.getAll("nilai_bobot");

        let arrayReview = [];

        for (let i = 0; i < nilaiReview.length; i++) {
            arrayReview.push({
                nilai: nilaiReview[i],
                id: idReview[i],
                feedback: feedbackReview[i],
                bobot_siswa: bobotSiswa[i]
            });
        }
        console.log(arrayReview)
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": role_guru_submit_penilaian_tugas_siswa,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "data",
                            "type": "json",
                            "value": {
                                "id_content": props.idContent,
                                "feedback": feedback,
                                "id_siswa": props.idSiswa,
                                "data": arrayReview
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
                console.log(response);
                const dataRes = JSON.parse(response.data.variables[2].value);
                const resCode = dataRes.code;
                if (resCode === 200) {
                    notification.success({
                        message: "Sukses",
                        description: "Feedback berhasil di input",
                        placement: "top",
                    });
                    pageLoad();
                } else {
                    notification.info({
                        message: "Gagal",
                        description: "Feedback tidak berhasil di input",
                        placement: "top",
                    });
                }
            });

    }

    const check = () => {
        console.log("test");
    };

    let disabledButton = props.isDisabled;
    let upload = props.isUpload;
    let reviewButton = props.isReview;
    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i
                                    onClick={props.setView}
                                    className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"
                                ></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title}
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form id="form_nilai">
                                    <>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama Siswa
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="name"
                                                        defaultValue={props.nama}
                                                        required
                                                        disabled={props.disableName}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kompetensi
                                                    </label>
                                                    {dataNilai?.map((competence, index) => {
                                                        return (
                                                            <input
                                                                className="form-control mb-1"
                                                                aria-label="Default select example"
                                                                name="kompetensi"
                                                                defaultValue={competence?.kompetensi}
                                                                required
                                                                disabled={props.disableName}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nilai
                                                    </label>
                                                    {dataNilai?.map((competence, index) => {
                                                        return (
                                                            <input
                                                                type="text"
                                                                name="nilai_kompetensi"
                                                                className="form-control mb-1"
                                                                defaultValue={competence?.nilai}
                                                                required
                                                                disabled={props.isDisabled}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <form id="form_review">
                                                        {props.review}
                                                        {
                                                            reviewButton && disabledButton ?
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss">
                                                                        Feedback Guru
                                                                    </label>
                                                                    <textarea
                                                                        className="form-control mb-0 p-3 bg-greylight lh-16"
                                                                        rows="5"
                                                                        placeholder=""
                                                                        name="feedback"
                                                                            defaultValue={props.feedback}
                                                                        disabled={detailReview.length < 1 ? true : false}
                                                                        onChange={(e)=> setFeedback(e.target.value)}
                                                                    ></textarea>
                                                                </div> : null
                                                        }
                                                        <div className="row">
                                                        </div>
                                                        {
                                                            reviewButton && disabledButton ?
                                                                <div className="col-lg-12 mt-5">
                                                                    <button
                                                                        className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                                        // type="submit"
                                                                        type='button'
                                                                        onClick={_submitReview2}
                                                                        disabled={detailReview.length < 1 ? true : false}
                                                                    >
                                                                        Simpan
                                                                    </button>
                                                                    <button
                                                                        onClick={props.setView}
                                                                        className="ml-2 bg-lightblue border-0 text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                                    >
                                                                        Batal
                                                                    </button>
                                                                </div> : null
                                                        }
                                                    </form>
                                                </div>
                                            </div>
                                        }
                                    </>
                                </form>
                                <div className="row">
                                    {!disabledButton ? (
                                        <div className="col-lg-12">
                                            <button
                                                className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                type="submit"
                                                id='button_edit'
                                                onClick={_submitNilai}
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                onClick={props.setView}
                                                className="ml-2 bg-lightblue border-0 text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
