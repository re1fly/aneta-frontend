import { notification } from "antd";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import {
  role_guru_edit_penilaian,
  role_guru_get_edit_penilaian,
  url_by_institute,
} from "../../api/reference";
import { pageLoad } from "../misc/loadPage";

export const FormGuruNilaiTugas = (props) => {
  const [dataNilai, setDataNilai] = useState([]);
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

  const check = () => {
    console.log("test");
  };

  let disabledButton = props.isDisabled;
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
              {props.isUpload == true ? (
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
                    </>
                  </form>
                  <div className="row">
                    {!disabledButton ? (
                      <div className="col-lg-12">
                        <button
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          type="submit"
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
              ) : (
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form onSubmit={props.submit} method="POST">
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

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Nilai
                          </label>
                          <input
                            type="text"
                            name="tingkat_sekolah"
                            className="form-control"
                            defaultValue={props.nilai}
                            required
                            disabled={props.isDisabled}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    {!disabledButton ? (
                      <div className="col-lg-12">
                        <button
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          type="submit"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
