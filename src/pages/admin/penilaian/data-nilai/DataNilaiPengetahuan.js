import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, { Fragment, useEffect, useState } from "react";
import { notification, PageHeader } from "antd";
import { GetMapelKelas } from "../../../../components/filter/GetMapelKelas";
import axios from "axios";
import "../../../../style/custom.css";
import { DataNotFound } from "../../../../components/misc/DataNotFound";
import {
  get_data_input_penilaian,
  insert_input_data_nilai,
  url_by_institute,
} from "../../../../api/reference";

function DataNilaiPengetahuan() {
  const academic = localStorage.getItem("academic_year");
  const [dataSiswa, setDataSiswa] = useState(null);
  const [jmlPenilaian, setjmlPenilaian] = useState(null);

  const _getDataSiswa = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    console.log(data);
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: get_data_input_penilaian,
          returnVariables: true,
          variables: [
            {
              name: "get_data",
              type: "json",
              value: {
                academic_year_id: academic,
                class_id: data.id_class_filter,
                subjects_id: data.id_mapel_filter,
                competence_aspect_id: 1,
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
        const resCode = dataRes.status;
        const dataSiswa = dataRes?.data?.siswa;
        const penilaian = dataRes?.data?.count_p;

        if (resCode === 200) {
          setjmlPenilaian(penilaian);
          setDataSiswa(dataSiswa);
          notification.success({
            message: "Data Ditemukan",
            description: "Data Dapat dilihat dalam table",
            placement: "top",
          });
        } else {
          setDataSiswa(null);
          notification.info({
            message: "Not Found",
            description: "Data tidak ditemukan",
            placement: "top",
          });
        }
      });
  };

  const _submitPenilaian = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") {
        data[el.name] = el.value;
      }
    }
    console.log("dataForm : ", data);
    const splitObject = (o) =>
      Object.keys(o).map((e) => {
        let id_student = e.split("_")[0];
        let serial = e.split("_")[1];
        let id_input = e.split("_")[2];
        return {
          assessment_planing_id: id_input,
          given_value: o[e],
          serial: serial,
          student_id: id_student,
        };
      });
    console.log("data json : ", splitObject(data));

    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: insert_input_data_nilai,
          returnVariables: true,
          variables: [
            {
              name: "get_data",
              type: "json",
              value: {
                data: splitObject(data),
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
        if (resCode === true) {
          notification.success({
            message: "Sukses",
            description: "Data Penilaian berhasil di input",
            placement: "top",
          });
        } else {
          notification.info({
            message: "Gagal",
            description: "Silahkan hubungi Admin",
            placement: "top",
          });
        }
      });
  };

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
                  title="Input Nilai Pengetahuan"
                />
              </div>
            </div>
            <GetMapelKelas valueFilter={(e) => _getDataSiswa(e)} />

            {dataSiswa == null ? (
              <DataNotFound />
            ) : (
              <form onSubmit={_submitPenilaian} method="POST">
                <div className="row">
                  <div className="col-lg-12 pt-3">
                    <div className="table-custom">
                      <table className="table table-bordered">
                        <thead>
                          <tr className="bg-current text-light">
                            <th scope="col">Nama Siswa</th>
                            {jmlPenilaian == null ? (
                              <th scope="col">Data Penilaian</th>
                            ) : (
                              jmlPenilaian.map((item, index) => (
                                <th scope="col" className="text-center">
                                  Penilaian {item.serial}
                                </th>
                              ))
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {dataSiswa.map((value) => (
                            <tr>
                              <th
                                scope="row"
                                style={{
                                  lineHeight: 3.5,
                                  textTransform: "capitalize",
                                }}
                              >
                                {value.nama_siswa}
                              </th>
                              {jmlPenilaian.map((item, index) => {
                                return (
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      key={index}
                                      name={`${value.id_student}_${item.serial}_${item.id}`}
                                      placeholder="input nilai (contoh : 90)"
                                      required
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-5 float-right">
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
                        Batal
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}

export default DataNilaiPengetahuan;
