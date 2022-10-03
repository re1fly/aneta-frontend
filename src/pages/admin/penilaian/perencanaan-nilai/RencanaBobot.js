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
import { GetMapelKelas } from "../../../../components/filter/GetMapelKelas";
import axios from "axios";
import { DataNotFound } from "../../../../components/misc/DataNotFound";
import {
  global_join_sub_where_get,
  perencanaan_penilaian,
  url_by_institute,
} from "../../../../api/reference";

function RencanaBobot() {
  const academic = localStorage.getItem("academic_year");
  const userId = localStorage.getItem("user_id");
  const [dataMapel, setDataMapel] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const _checkDataMapel = (e) => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: perencanaan_penilaian,
          returnVariables: true,
          variables: [
            {
              name: "get_data",
              type: "json",
              value: {
                id_academic: academic,
                id_class: selectedClass,
                id_pelajaran: e.target.value,
                ph: null,
                pts: null,
                pas: null,
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
        const resData = JSON.parse(response.data.variables[2].value);
        setIsDataAvailable(resData.code);
        console.log(response);
      });
  };

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

  useEffect(() => {
    _getDataKelas();
  }, []);

  useEffect(() => {
    _getDataMapel();
  }, [selectedClass]);

  const _submitBobot = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") {
        data[el.name] = el.value;
      }
    }

    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: perencanaan_penilaian,
          returnVariables: true,
          variables: [
            {
              name: "get_data",
              type: "json",
              value: {
                id_academic: academic,
                id_class: data.id_class_filter,
                id_pelajaran: data.id_mapel_filter,
                ph: data.bobot_ph,
                pts: data.bobot_pts,
                pas: data.bobot_pas,
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
        const dataRes = JSON.parse(response.data.variables[2].value);
        const resCode = dataRes.code;
        if (resCode == true) {
          notification.success({
            message: "Sukses",
            description: "Input Bobot Perencanaan Sukses",
            placement: "top",
          });
        } else {
          notification.error({
            message: "Gagal",
            description: "Mohon cek kembali inputan anda",
            placement: "top",
          });
        }
      });
  };

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
                  title="Rencana Bobot PH, PTS, dan PAS"
                />
              </div>
            </div>
            <form onSubmit={_submitBobot} method="POST">
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="id_class_filter"
                      onChange={(e) => setSelectedClass(e.target.value)}
                      required
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
                      required
                      onChange={(e) => _checkDataMapel(e)}
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
                {!isDataAvailable ? (
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
                            <th scope="col">Bobot Penilaian Harian (PH)</th>
                            <th scope="col">
                              Bobot Penilaian Tengah Semester (PTS)
                            </th>
                            <th scope="col">
                              Bobot Penilaian Akhir Semester (PAS)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                name="bobot_ph"
                                placeholder="isi bobot penilaian"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                name="bobot_pts"
                                placeholder="isi bobot penilaian"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                name="bobot_pas"
                                placeholder="isi bobot penilaian"
                                required
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="pt-10 mt-5 float-right">
                        <button
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          type="submit"
                        >
                          Simpan
                        </button>
                        <a
                          onClick={() => window.history.back()}
                          className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        >
                          Kembali
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}

export default RencanaBobot;
