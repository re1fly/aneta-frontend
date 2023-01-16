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
  role_guru_get_matpel,
  role_guru_get_sub_class,
  url_by_institute,
} from "../../../../api/reference";

function GuruRencanaBobot() {
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
          processDefinitionId: role_guru_get_matpel,
          returnVariables: true,
          variables: [
            {
              name: "update_jadwal_pelajaran",
              type: "json",
              value: {
                user_id: userId,
                id_class: selectedClass,
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
                          {data.class_type} / {data.sub_class}
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
                      {dataMapel?.map((data) => (
                        <option value={data.id}>{data.nama_mata}</option>
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

export default GuruRencanaBobot;
