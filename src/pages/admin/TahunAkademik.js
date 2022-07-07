import { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { DatePicker, Input, PageHeader, Select, Button } from "antd";

import Appheader from "../../components/Appheader";
import Navheader from "../../components/Navheader"
import Adminfooter from "../../components/Adminfooter";
import axios from "axios";
import { BASE_URL } from "../../api/Url";



function TahunAkademikAdmin() {
  const [isViewTahunAkademik, setIsViewTahunAkademik] = useState(true);

  const dateFormat = 'YYYY-MM-DD';
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [getTahunAkademik, setGetTahunAkademik] = useState(null);

  const academicYear = localStorage.getItem('academic_year')
  const institute = localStorage.getItem('institute');
  const user = localStorage.getItem('user_id')

  useEffect(() => {
    axios.post(BASE_URL,
      {
        processDefinitionId: "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
        returnVariables: true,
        variables: [
          {
            name: "global_get_where",
            type: "json",
            value: {
              tbl_name: "x_academic_year",
              pagination: false,
              total_result: 2,
              order_coloumn: "x_academic_year.id",
              order_by: "desc",
              data: [
                {
                  kondisi: "where",
                  tbl_coloumn: "institute_id",
                  tbl_value: institute,
                  operator: "="
                },
                {
                  kondisi: "where",
                  tbl_coloumn: "is_active",
                  tbl_value: "T",
                  operator: "="
                }
              ],
              tbl_coloumn: [
                "*"
              ]
            },
          },
        ],
      }
    ).then(function (response) {
      // console.log(response);
      const akademik = JSON.parse(response.data.variables[2].value);
      const data = akademik[0]
      setGetTahunAkademik(data);
    })
  }, [])

  const creatTahunAkademik = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    const dateNow = new Date().toLocaleString()
    console.log(data, dateNow)
    console.log('institute', institute)
    console.log('academic_year', academicYear)

    axios.post(BASE_URL, {
      "processDefinitionId": "GlobalInsertRecord:7:7777c884-d588-11ec-a2ad-3a00788faff5",
      "returnVariables": true,
      "variables": [
        {
          "name": "global_Insert",
          "type": "json",
          "value": {
            "tbl_name": "x_academic_yearModel",
            "tbl_coloumn": {
              "uuid": "",
              "institute_id": institute,
              "academic_year": data.tahun_akademik,
              "periode_start": data.periode_awal,
              "periode_end": data.periode_akhir,
              "is_active": data.status_akhir,
              "number_of_student": data.jumlah_murid,
              "number_of_teachers": data.jumlah_guru,
              "number_of_staff": data.jumlah_staff,
              "created_at": dateNow,
              "updated_at": dateNow,
              "created_by": user
            }
          }
        }
      ]
    }).then(function (response) {
      console.log(response);
    })
  }

  const ViewTahunAkademik = () => {
    // console.log(_Akademik);
    return (
      <div className="container px-3 py-4">
        <div className="row mb-3">
          <div className="col-lg-12">
            <PageHeader
              className="site-page-header card bg-lightblue text-grey-900 fw-700 "
              onBack={() => window.history.back()}
              title="Tahun Akademik"
            />
          </div>
        </div>
        <form className="px-3 py-4" action="#">
          <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Tahun Akademik
                </label>
                <Input
                  disabled={true}
                  defaultValue={getTahunAkademik?.academic_year}
                  name="tahun_akademik"
                  type="number"
                  className="text-black form-control"
                />
              </div>
            </div>

            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Semester
                </label>
                <Input
                  disabled={true}
                  defaultValue={getTahunAkademik?.semester ?? '1'}
                  className="text-black form-control"
                  name="semester"
                  placeholder="Pilih Tahun Akademik"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Periode Awal
                </label>
                <Input
                  disabled={true}
                  defaultValue={getTahunAkademik?.periode_start}
                  name="periode_awal"
                  type="text"
                  className="text-black form-control"
                />
              </div>
            </div>

            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Periode Akhir
                </label>
                <Input
                  disabled={true}
                  type="text"
                  className="text-black form-control"
                  defaultValue={getTahunAkademik?.periode_end}
                  name="periode_akhir"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Status
                </label>
                <Input
                  disabled={true}
                  type="text"
                  className="text-black form-control"
                  defaultValue={getTahunAkademik?.is_active === 'T' ? 'Aktif' : 'Non Aktif'}
                  name="status"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button
                className="bg-lightblue text-center text-blue border-none font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                onClick={() => setIsViewTahunAkademik(false)}>
                Tambah Data
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  };

  const TambahTahunAkademik = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="middle-wrap">
              <form id="teacher_form"
                onSubmit={creatTahunAkademik}
                method="POST">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                    <i onClick={() => setIsViewTahunAkademik(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                      Tambah Data Tahun Akademik
                    </h4>
                  </div>
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Nama Sekolah
                          </label>
                          <input
                            defaultValue="SD Bahagia"
                            name="nama_sekolah"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Tahun Akademik
                          </label>
                          <DatePicker
                            className="form-control"
                            picker="year"
                            placeholder="Pilih Tahun Akademik"
                            name="tahun_akademik"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Semester
                          </label>
                          <input
                            type="text"
                            defaultValue="I"
                            name="semster"
                            className="form-control"
                            maxLength={2}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Periode Awal
                          </label>
                          <DatePicker
                            className="form-control"
                            format={dateFormat}
                            placeholder="Pilih Periode Awal"
                            name="periode_awal"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Periode Akhir
                          </label>
                          <DatePicker
                            className="form-control"
                            format={dateFormat}
                            placeholder="Pilih Periode Akhir"
                            name="periode_akhir"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Status
                          </label>
                          <select className="form-control" defaultValue="Pilih Status" name="status_akhir" onChange={handleChange} disabled={true}>
                            {getTahunAkademik != null ? <option className="form-control" value="F">Nonaktif</option>
                              : <option className="form-control" value="T">Aktif</option>}
                            {/* <option className="form-control" value="aktif">Aktif</option>
                            <option className="form-control" value="nonaktif">Nonaktif</option> */}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Jumlah Murid
                          </label>
                          <input
                            type="number"
                            defaultValue="300"
                            name="jumlah_murid"
                            className="form-control"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Jumlah Guru
                          </label>
                          <input
                            type="number"
                            defaultValue="20"
                            name="jumlah_guru"
                            className="form-control"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Jumlah Staff
                          </label>
                          <input
                            type="number"
                            defaultValue="30"
                            name="jumlah_staff"
                            className="form-control"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <button
                          className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                          type="submit"
                        >
                          Simpan
                        </button>
                        <a
                          onClick={() => setIsViewTahunAkademik(true)}
                          className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        >
                          Kembali
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          {isViewTahunAkademik ? <ViewTahunAkademik /> : <TambahTahunAkademik />}
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  )
}

export default TahunAkademikAdmin;