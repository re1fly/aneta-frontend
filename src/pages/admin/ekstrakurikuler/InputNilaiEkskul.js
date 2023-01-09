import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import Adminfooter from "../../../components/Adminfooter";
import React, { Fragment, useEffect, useState } from "react";
import { DataNotFound } from "../../../components/misc/DataNotFound";
import axios from "axios";
import { BASE_URL } from "../../../api/Url";
import { PageHeader } from "antd";
import {
  global_join_sub_where_get,
  url_by_institute,
} from "../../../api/reference";

export default function InputNilaiEkskul() {
  const academic = localStorage.getItem("academic_year");
  const [dataKelas, setDataKelas] = useState([]);
  const [dataEkskul, setDataEkskul] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedEkskul, setSelectedEkskul] = useState(null);

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
        const dataRes = JSON.parse(response?.data?.variables[3]?.value);
        setDataKelas(dataRes?.data);
      });
  };
  const _getDataEkskul = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId:
            "globaljoinsubwhereget:2:ffda1ab3-2cc0-11ed-aacc-9a44706f3589",
          returnVariables: true,
          variables: [
            {
              name: "global_join_where_sub",
              type: "json",
              value: {
                tbl_induk: "x_ekstrakurikuler_master",
                select: [
                  "x_ekstrakurikuler_master.id",
                  "x_ekstrakurikuler_master.name",
                ],
                paginate: false,
                join: [
                  {
                    tbl_join: "x_academic_year",
                    refkey: "id",
                    tbl_join2: "x_ekstrakurikuler_master",
                    foregenkey: "academic_year_id",
                  },
                ],
                kondisi: [
                  {
                    keterangan: "deleted_at",
                    kolom: "x_ekstrakurikuler_master.deleted_at",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "x_ekstrakurikuler_master",
                    tbl_field: "academic_year_id",
                    tbl_value: academic,
                    operator: "=",
                  },
                ],
                order_coloumn: "x_ekstrakurikuler_master.name",
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
        const resData = JSON.parse(response.data.variables[3].value);
        setDataEkskul(resData.data);
      });
  };
  const _getDataSiswa = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: "62eb9f70-6bcd-11ed-bb6a-a2fb3d782380",
          returnVariables: true,
          variables: [
            {
              name: "data",
              type: "json",
              value: {
                id_extrakurikuler: selectedEkskul,
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
        const resData = JSON.parse(response.data.variables[2].value);
        setDataSiswa(resData.data);
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
    const splitObject = (o) =>
      Object.keys(o).map((e) => {
        let id = e.split("_")[1];
        let indicator_id = e.split("_")[2];
        let id_siswa = e.split("_")[3];
        let description = e.split("_")[4];
        return {
          id: id,
          indicator_id: indicator_id,
          id_siswa: id_siswa,
          description: description,
        };
      });
    console.log(data);
    console.log(splitObject(data));
  };

  useEffect(() => {
    _getDataKelas();
    _getDataEkskul();
  }, []);

  useEffect(() => {
    _getDataSiswa();
  }, [selectedClass, selectedEkskul]);

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
                  title="Input Nilai Ekstrakurikuler"
                />
              </div>
            </div>
            {dataSiswa == [] ? (
              <DataNotFound />
            ) : (
              <form onSubmit={_submitPenilaian} method="POST">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <div className="form-group mr-4">
                      <select
                        className="form-control"
                        key="id_class_filter"
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
                  <div className="col-lg-6 mb-3">
                    <div className="form-group ml-4">
                      <select
                        className="form-control"
                        key="id_ekskul_filter"
                        onChange={(e) => setSelectedEkskul(e.target.value)}
                      >
                        <option value="" selected disabled>
                          Pilih Nama Ekstrakurikuler
                        </option>
                        {dataEkskul.map((data) => (
                          <option value={data.id}>{data.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 pt-3">
                    <div className="table-responsive-xl">
                      <table className="table table-bordered">
                        <thead>
                          <tr className="bg-current text-light">
                            <th scope="col">Nama Siswa</th>
                            <th scope="col" className="text-center">
                              Predikat
                            </th>
                            <th scope="col" className="text-center">
                              Deskripsi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataSiswa.map((value) => {
                            console.log(value);
                            return (
                              <tr>
                                <th
                                  scope="row"
                                  style={{
                                    lineHeight: 3.5,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {value.name}
                                </th>
                                <td style={{ maxWidth: "70px" }}>
                                  <select
                                    className="form-control"
                                    aria-label="Default"
                                    name={`${value.id_siswa}_2`}
                                  >
                                    <option value="" selected disabled>
                                      Pilih Predikat
                                    </option>
                                    <option value="1">Sangat Kurang</option>
                                    <option value="2">Kurang</option>
                                    <option value="3">Cukup</option>
                                    <option value="4">Baik</option>
                                    <option value="5">Sangat Baik</option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name={`${value.id_siswa}_4`}
                                    placeholder="Tulis Deskripsi..."
                                    required
                                  />
                                </td>
                                <input
                                  type="hidden"
                                  className="form-control"
                                  name={`${value.id_siswa}_1`}
                                  required
                                  value={value.id}
                                />
                                <input
                                  type="hidden"
                                  className="form-control"
                                  name={`${value.id_siswa}_3`}
                                  required
                                  value={value.id_siswa}
                                />
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="mt-5 float-right">
                        <button
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          type="submit"
                        >
                          Submit Nilai
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
