import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Descriptions,
  notification,
  PageHeader,
  Space,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import { DataNotFound } from "../../../../components/misc/DataNotFound";
import {
  get_kompetensi_dasar_sikap_social,
  global_join_sub_where_get,
  insert_perencanaan_penilaian,
  role_guru_get_matpel,
  role_guru_get_sub_class,
  url_by_institute,
} from "../../../../api/reference";

function GuruNilaiSosial() {
  const academic = localStorage.getItem("academic_year");
  const userId = localStorage.getItem("user_id");
  const [dataMapel, setDataMapel] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataKompetensi, setDataKompetensi] = useState([]);
  const [totalPenilaian, setTotalPenilaian] = useState(0);
  const [selectedClass, setSelectedClass] = useState(null);

  const _getDataMapel = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: role_guru_get_matpel,
          returnVariables: true,
          variables: [
            {
              name: "update_jadwal_pelajaran",
              type: "json",
              value: {
                user_id: userId,
                id_class: selectedClass,
                academic_year_id: academic
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
        const dataMapelApi = JSON.parse(response.data.variables[2].value);
        const getMapel = dataMapelApi.data;
        setDataMapel(getMapel);
      });
  };
  const _getDataKelas = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: role_guru_get_sub_class,
          returnVariables: true,
          variables: [
            {
              name: "get_sub_kelas_guru",
              type: "json",
              value: {
                user_id: userId,
                academic_year_id: academic
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
        const data = JSON.parse(response.data.variables[2].value);
        setDataKelas(data.data);
      });
  };
  const _getCompetency = (e) => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: get_kompetensi_dasar_sikap_social,
          returnVariables: true,
          variables: [
            {
              name: "get_data",
              type: "json",
              value: {
                id_matpel: e.target.value,
                id_aspect: "4",
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
        const competency = JSON.parse(response.data.variables[2].value);
        const allCompetency = competency.data;
        setDataKompetensi(allCompetency);
        if (allCompetency.length == 0) {
          setTotalPenilaian(0);
        } else {
          setTotalPenilaian(1);
        }
      });
  };

  const _submitNilai = (e) => {
    const formCV = document.querySelector("#form_perencanaan_sosial");
    const formData = new FormData(formCV);

    let elementKompetensi = document.querySelectorAll(
      "#form_perencanaan_sosial input[type=checkbox]"
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

    const classId = formData.get("id_class_filter");
    const subjectId = formData.get("id_mapel_filter");

    const insertToApi = {
      academic_id: academic,
      class_id: classId,
      subjects_id: subjectId,
      created_by: userId,
      jumlah_penilaian: totalPenilaian,
      planing: [
        {
          competence_aspect_id: "4",
          serial: "1",
          assessment_technique_id: null,
          assessment_bobot: null,
          assessment_name: null,
        },
      ],
      kompetensi: allCompetency,
    };

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

        if (resCode === "true") {
          notification.success({
            message: "Sukses",
            description: "Perencanaan nilai sosial berhasil di input",
            placement: "top",
          });
        } else {
          notification.info({
            message: "Gagal",
            description:
              "Perencanaan nilai sosial gagal. Pastikan Form telah diisi semua",
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
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          <div className="container px-3 py-4">
            <div className="row pb-5">
              <div className="col-lg-12">
                <PageHeader
                  className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                  onBack={() => window.history.back()}
                  title="Rencana Nilai Sikap Sosial"
                />
              </div>
            </div>
            <form id="form_perencanaan_sosial">
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <div className="form-group mr-4">
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
                          {data.class_type} / {data.sub_class}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group ml-4">
                    <select
                      className="form-control"
                      name="id_mapel_filter"
                      onChange={(e) => _getCompetency(e)}
                    >
                      <option value="" selected disabled>
                        Pilih Mata Pelajaran
                      </option>
                      {dataMapel?.map((data) => (
                        <option value={data.id}>{data.nama_mata}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {totalPenilaian == 0 ? (
                  <DataNotFound />
                ) : (
                  <div className="col-lg-12 pt-5">
                    <div className="table-responsive-xl">
                      <table
                        className="table"
                        style={{ borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr className="bg-current text-light">
                            <th scope="col" style={{ width: 500 }}>
                              Penilaian
                            </th>
                            <th
                              scope="col"
                              colSpan="3"
                              className="m-auto text-center"
                            >
                              Penilaian 1
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th
                              scope="row"
                              style={{ borderBottomStyle: "hidden" }}
                            >
                              <h4>
                                <b>Kompetensi Dasar / Butir Sikap Sosial</b>
                              </h4>
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
                                {data.competence_desc}
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
                                          defaultChecked={data.is_checked}
                                        />
                                      </td>
                                    );
                                  })}
                                </>
                              )}
                            </tr>
                          ))}
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

export default GuruNilaiSosial;
