import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, { Fragment, useEffect, useState } from "react";
import { notification, PageHeader } from "antd";
import "../../../../style/custom.css";
import axios from "axios";
import { DataNotFound } from "../../../../components/misc/DataNotFound";
import {
  global_join_sub_where_get,
  insert_perencanaan_penilaian,
  url_by_institute,
} from "../../../../api/reference";

function NilaiPengetahuan() {
  const academic = localStorage.getItem("academic_year");
  const userId = localStorage.getItem("user_id");
  const [dataMapel, setDataMapel] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataKompetensi, setDataKompetensi] = useState([]);
  const [totalPenilaian, setTotalPenilaian] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  let jumlahPenilaian = [];

  jumlahPenilaian = new Array(20).fill().map((e, i) => {
    return {
      id: i + 1,
      value: `P.${i + 1}`,
    };
  });

  const _getDataMapel = () => {
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
                tbl_induk: "x_academic_subject_master",
                select: [
                  "x_academic_subjects.academic_subjects_master_id as id_subject",
                  "x_academic_subject_master.nama_mata",
                ],
                paginate: 1000,
                join: [
                  {
                    tbl_join: "x_academic_year",
                    refkey: "id",
                    tbl_join2: "x_academic_subject_master",
                    foregenkey: "academic_year_id",
                  },
                  {
                    tbl_join: "x_academic_subjects",
                    refkey: "academic_subjects_master_id",
                    tbl_join2: "x_academic_subject_master",
                    foregenkey: "id",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "x_academic_subjects",
                    tbl_field: "academic_year_id",
                    tbl_value: academic,
                    operator: "=",
                    kondisi: "where",
                  },
                  {
                    tbl_coloumn: "x_academic_subjects",
                    tbl_field: "course_grade_id",
                    tbl_value: selectedClass,
                    operator: "=",
                    kondisi: "where",
                  },
                  {
                    tbl_coloumn: "x_academic_subject_master",
                    tbl_field: "deleted_at",
                    tbl_value: "",
                    operator: "=",
                    kondisi: "where",
                  },
                  {
                    tbl_coloumn: "x_academic_subjects",
                    tbl_field: "course_grade_id",
                    tbl_value: "",
                    operator: "!=",
                    kondisi: "where",
                  },
                ],
                order_coloumn: "x_academic_subject_master.nama_mata",
                order_by: "desc",
              },
            },
            {
              name: "page",
              type: "string",
              value: "1",
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
        const dataMapelApi = JSON.parse(response.data.variables[3].value);
        const getMapel = dataMapelApi.data.data;

        setDataMapel(getMapel);
      });
  };

  const _getDataKelas = () => {
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
                tbl_induk: "x_academic_class",
                select: [
                  "x_academic_class.id",
                  "r_class_type.class_type as class",
                  "x_academic_class.sub_class",
                ],
                paginate: false,
                join: [
                  {
                    tbl_join: "r_class_type",
                    refkey: "id",
                    tbl_join2: "x_academic_class",
                    foregenkey: "class",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "x_academic_class",
                    tbl_field: "academic_year_id",
                    tbl_value: academic,
                    operator: "=",
                  },
                  {
                    tbl_coloumn: "x_academic_class",
                    tbl_field: "deleted_at",
                    tbl_value: "",
                    operator: "=",
                  },
                ],
                order_coloumn: "x_academic_class.id",
                order_by: "asc",
              },
            },
            {
              name: "page",
              type: "string",
              value: "1",
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
        const data = JSON.parse(response.data.variables[3].value);
        setDataKelas(data.data);
      });
  };

  const _getCompetency = (e) => {
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
                tbl_induk: "x_competence_detail",
                select: [
                  "x_competence_detail.id as id_detail",
                  "x_competence_detail.competence_desc",
                  "x_competence_detail.code",
                ],
                paginate: 1000,
                join: [
                  {
                    tbl_join: "x_competence",
                    refkey: "id",
                    tbl_join2: "x_competence_detail",
                    foregenkey: "competence_id",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "x_competence",
                    tbl_field: "academic_courses_id",
                    tbl_value: e.target.value,
                    operator: "=",
                  },
                  {
                    tbl_coloumn: "x_competence_detail",
                    tbl_field: "competence_aspect_id",
                    tbl_value: "1",
                    operator: "=",
                  },
                ],
                order_coloumn: "x_competence_detail.competence_desc",
                order_by: "asc",
              },
            },
            {
              name: "page",
              type: "string",
              value: "1",
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
        const competency = JSON.parse(response.data.variables[3].value);
        const allCompetency = competency.data.data;
        setDataKompetensi(allCompetency);
      });
  };

  const _submitNilai = (e) => {
    const formCV = document.querySelector("#form_perencanaan");
    const formData = new FormData(formCV);

    const teknikPenilaian = formData.getAll("teknik_penilaian");
    console.log(teknikPenilaian);

    const bobotPenilaian = formData.getAll("bobot_penilaian");
    const namaPenilaian = formData.getAll("nama_penilaian");
    const classId = formData.get("id_class_filter");
    const subjectId = formData.get("id_mapel_filter");
    const allPlaning = [];

    for (let i = 0; i < totalPenilaian; i++) {
      allPlaning.push({
        competence_aspect_id: "1",
        serial: i + 1,
        assessment_technique_id: teknikPenilaian[i],
        assessment_bobot: bobotPenilaian[i],
        assessment_name: namaPenilaian[i],
      });
    }

    let elementKompetensi = document.querySelectorAll(
      "#form_perencanaan input[type=checkbox]"
    );

    for (let index = 0; index < elementKompetensi.length; index++) {
      if (elementKompetensi.value === "")
        elementKompetensi = elementKompetensi.value[index];
    }
    const boxKompetensi = Array.from(elementKompetensi);

    const allCompetency = boxKompetensi.map((el) => {
      return {
        detail_id: el.id.split("_")[1],
        penilaian: el.id.split("_")[2],
        check: el.checked,
      };
    });

    const insertToApi = {
      academic_id: academic,
      class_id: classId,
      subjects_id: subjectId,
      created_by: userId,
      jumlah_penilaian: totalPenilaian,
      planing: allPlaning,
      kompetensi: allCompetency,
    };

    console.log(insertToApi);

    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: insert_perencanaan_penilaian,
          returnVariables: true,
          variables: [
            {
              name: "get_data",
              type: "json",
              value: insertToApi,
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
        const dataRes = JSON.parse(response.data.variables[2].value);
        const resCode = dataRes.code;
        console.log(response);

        if (resCode === "true") {
          notification.success({
            message: "Sukses",
            description: "Perencanaan nilai pengetahuan berhasil di input",
            placement: "top",
          });
        } else {
          notification.info({
            message: "Gagal",
            description:
              "Perencanaan nilai pengetahuan gagal. Pastikan Form telah diisi semua",
            placement: "top",
          });
        }
      });
  };

  useEffect(() => {
    _getDataKelas();
  }, []);

  useEffect(() => {
    _getDataMapel();
    setDataKompetensi([]);
  }, [selectedClass]);

  return (
    <Fragment>
      <div className="main-wrapper custom-table">
        <Navheader />
        <div className="main-content">
          <Appheader />
          <div className="container px-3 py-4">
            <div className="row pb-5">
              <div className="col-lg-12">
                <PageHeader
                  className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                  onBack={() => window.history.back()}
                  title="Rencana Nilai Pengetahuan"
                />
              </div>
            </div>
            <form id="form_perencanaan">
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="id_class_filter"
                      onChange={(e) => setSelectedClass(e.target.value)}
                    >
                      <option value="" selected disabled>
                        Pilih Kelas
                      </option>
                      {dataKelas.map((data) => (
                        <option value={data.id}>
                          {data.class} / {data.sub_class}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="id_mapel_filter"
                      onChange={(e) => _getCompetency(e)}
                    >
                      <option value="" selected disabled>
                        Pilih Mata Pelajaran
                      </option>
                      {dataMapel.map((data) => (
                        <option value={data.id_subject}>
                          {data.nama_mata}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <select
                      className="form-control"
                      aria-label="Default"
                      name="pilih_penilaian"
                      onChange={(e) => setTotalPenilaian(e.target.value)}
                    >
                      <option value="" selected disabled>
                        Jumlah Penilaian
                      </option>
                      {jumlahPenilaian.map((data) => (
                        <option className="text-capitalize" value={data.id}>
                          {data.id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {totalPenilaian == 0 ? (
                  <DataNotFound />
                ) : (
                  <div className="col-lg-12">
                    <div className="table-custom">
                      <table className="table table-bordered">
                        <thead>
                          <tr className="bg-current text-light text-center">
                            <th scope="col">Penilaian</th>

                            {totalPenilaian > 0 && (
                              <>
                                {[...Array(Number(totalPenilaian)).keys()].map(
                                  (data, index) => {
                                    return (
                                      <th scope="col">Penilaian {data + 1}</th>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Kelompok / Teknik Penilaian</th>
                            {totalPenilaian > 0 && (
                              <>
                                {[...Array(Number(totalPenilaian)).keys()].map(
                                  (data, index) => {
                                    return (
                                      <td>
                                        <select
                                          className="form-control"
                                          aria-label="Default"
                                          name="teknik_penilaian"
                                        >
                                          <option value="1">Tes Lisan</option>
                                          <option value="2">Tes Tulis</option>
                                          <option value="3">Penugasan</option>
                                        </select>
                                      </td>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">Bobot Teknik Penilaian</th>
                            {totalPenilaian > 0 && (
                              <>
                                {[...Array(Number(totalPenilaian)).keys()].map(
                                  (data, index) => {
                                    return (
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="bobot_penilaian"
                                          placeholder="isi bobot penilaian"
                                        />
                                      </td>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </tr>
                          <tr>
                            <th scope="row">Nama Penilaian</th>
                            {totalPenilaian > 0 && (
                              <>
                                {[...Array(Number(totalPenilaian)).keys()].map(
                                  (data, index) => {
                                    return (
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="nama_penilaian"
                                          placeholder="isi nama penilaian"
                                        />
                                      </td>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </tr>
                          <tr style={{ borderRightStyle: "hidden" }}>
                            <th
                              scope="row"
                              style={{
                                borderLeftStyle: "hidden",
                                borderRightStyle: "hidden",
                                backgroundColor: "white",
                                color: "black",
                              }}
                            >
                              <h3>
                                <b>Kompetensi Dasar</b>
                              </h3>
                            </th>
                          </tr>
                          {dataKompetensi.map((data) => (
                            <tr style={{ borderStyle: "hidden" }}>
                              <th
                                scope="row"
                                style={{
                                  borderRightStyle: "hidden",
                                  backgroundColor: "white",
                                  color: "black",
                                  textTransform: "capitalize",
                                }}
                              >
                                {data.code} {data.competence_desc}
                              </th>
                              {totalPenilaian > 0 && (
                                <>
                                  {[
                                    ...Array(Number(totalPenilaian)).keys(),
                                  ].map((item, index) => {
                                    return (
                                      <td
                                        style={{ borderRightStyle: "hidden" }}
                                      >
                                        <input
                                          type="checkbox"
                                          className="form-control"
                                          style={{ zoom: 0.4 }}
                                          // name={`kompetensi_${data.id_detail}_${index + 1}`}
                                          name="kompetensi"
                                          id={`kompetensi_${data.id_detail}_${
                                            index + 1
                                          }`}
                                          key={data.id_detail}
                                          onChange={(e) => {
                                            setIsChecked(e?.target?.checked);
                                          }}
                                          value={isChecked}
                                        />
                                      </td>
                                    );
                                  })}
                                </>
                              )}
                            </tr>
                          ))}
                          {/*<tr style={{borderStyle: 'hidden'}}>*/}
                          {/*    <th scope="row" style={{*/}
                          {/*        borderRightStyle: 'hidden',*/}
                          {/*        backgroundColor: 'white',*/}
                          {/*        color: 'black'*/}
                          {/*    }}>*/}
                          {/*        3.1 Mengidentifikasi Gerakan Dasar Senam*/}
                          {/*    </th>*/}
                          {/*    {totalPenilaian > 0 &&*/}
                          {/*        <>*/}
                          {/*            {[...Array(Number(totalPenilaian)).keys()]*/}
                          {/*                .map(data => {*/}
                          {/*                    return (*/}
                          {/*                        <td style={{borderRightStyle: 'hidden'}}>*/}
                          {/*                            <input*/}
                          {/*                                type="checkbox"*/}
                          {/*                                className="form-control"*/}
                          {/*                                style={{zoom: 0.4}}*/}
                          {/*                                name={`kompetensi1_p${data + 1}`}*/}
                          {/*                                placeholder="isi nama penilaian"*/}
                          {/*                            />*/}
                          {/*                        </td>*/}
                          {/*                    )*/}
                          {/*                })}*/}
                          {/*        </>*/}
                          {/*    }*/}
                          {/*</tr>*/}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </form>
            {totalPenilaian == 0 ? null : (
              <div className="row">
                <div className="col">
                  <div className="mt-5 mb-4 float-right">
                    <button
                      className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                      onClick={_submitNilai}
                    >
                      Simpan
                    </button>
                    <a
                      onClick={() => window.history.back()}
                      className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                    >
                      Batal
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}

export default NilaiPengetahuan;
