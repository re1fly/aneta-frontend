import React, { Fragment, useState, useEffect } from "react";
import { Menu, Card, Button, Dropdown, message, PageHeader } from "antd";
import {
  DownOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Search from "antd/es/input/Search";
import Adminfooter from "../../../components/Adminfooter";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import { useDispatch } from "react-redux";
import { GetIdClass } from "../../../redux/Action";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  global_join_sub_where_get,
  url_by_institute,
} from "../../../api/reference";

export default function JadwalPelajaranAdminSubKelas() {
  const [grid, setGrid] = useState(false);
  const [getSubKelas, setGetSubKelas] = useState([]);

  const institute = localStorage.getItem("institute");
  const academicYear = localStorage.getItem("academic_year");

  const _onSearch = (value) => console.log(value);

  const params = useParams();
  const idClass1 = params.id;

  useEffect(() => {
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
                  "x_academic_class.id as id_class",
                  "x_academic_class.class",
                  "x_academic_class.sub_class",
                  "x_academic_class.class_location",
                  "x_academic_year.academic_year",
                  "x_academic_year.id as id_academic",
                  "users.name",
                  "x_academic_teachers.id as id_walikelas",
                  "users.institute_id",
                  "r_class_type.class_type",
                ],
                paginate: 10,
                join: [
                  {
                    tbl_join: "x_academic_teachers",
                    refkey: "id",
                    tbl_join2: "x_academic_class",
                    foregenkey: "calss_advisor_id",
                  },
                  {
                    tbl_join: "users",
                    refkey: "id",
                    tbl_join2: "x_academic_teachers",
                    foregenkey: "user_id",
                  },
                  {
                    tbl_join: "x_academic_year",
                    refkey: "id",
                    tbl_join2: "x_academic_class",
                    foregenkey: "academic_year_id",
                  },
                  {
                    tbl_join: "r_class_type",
                    refkey: "id",
                    tbl_join2: "x_academic_class",
                    foregenkey: "class",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "users",
                    tbl_field: "institute_id",
                    tbl_value: institute,
                    operator: "=",
                    kondisi: "where",
                  },
                  {
                    tbl_coloumn: "x_academic_class",
                    tbl_field: "academic_year_id",
                    tbl_value: academicYear,
                    operator: "=",
                    kondisi: "where",
                  },
                  {
                    tbl_coloumn: "x_academic_class",
                    tbl_field: "deleted_at",
                    tbl_value: "",
                    operator: "=",
                    kondisi: "where",
                  },
                  {
                    tbl_coloumn: "x_academic_class",
                    tbl_field: "class",
                    tbl_value: idClass1,
                    operator: "=",
                    kondisi: "where",
                  },
                ],
                order_coloumn: "x_academic_class.sub_class",
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
        const subKelas = dataRes?.data?.data;
        setGetSubKelas(subKelas);
      });
  });

  const channelList = getSubKelas.map((data, index) => {
    return {
      class: data.class_type,
      idSubclass: data.id_class,
      sub_class: data.sub_class,
    };
  });

  let history = useHistory();
  const handleSubClass = (id) => {
    history.push(`/admin-jadwal-pelajaran-detail-${id}`);
  };

  const ViewPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader
              className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
              onBack={() => window.history.back()}
              title="Jadwal Pelajaran"
            />
            <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
              <div className="row">
                <div className="col-lg-8 col-md-6 my-2">
                  {/* <Button className="mr-4" type="primary" shape="round" size='middle'
                    onClick={() => setIsViewPelajaran(false)}>
                    Tambah Data
                  </Button> */}
                </div>
                <div className="col-lg-4 col-md-6 my-2">
                  <Search
                    className="mr-3"
                    placeholder="Cari kata kunci"
                    allowClear
                    onSearch={_onSearch}
                    style={{ width: "80%" }}
                  />
                  {grid == false ? (
                    <a>
                      <AppstoreOutlined
                        style={{ fontSize: "2em", lineHeight: 1 }}
                        onClick={() => setGrid(true)}
                      />
                    </a>
                  ) : (
                    <a>
                      <MenuOutlined
                        style={{ fontSize: "2em", lineHeight: 1 }}
                        onClick={() => setGrid(false)}
                      />
                    </a>
                  )}
                </div>
              </div>
            </Card>
            <div className="px-1 py-2 ">
              <div className="row">
                {channelList.map((value, index) => {
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-4">
                      {/* <Link
                        onClick={() => {
                          dispatch({ type: 'SET_SUBCLASS', value: value })
                        }
                        }
                        to={{ pathname: `/admin-jadwal-pelajaran-detail` }}
                      > */}
                      <div
                        className="card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 pt-3 text-center"
                        onClick={() => handleSubClass(value.idSubclass)}
                      >
                        <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">
                          {value.class} - {value.sub_class}
                        </h2>
                      </div>
                      {/* </Link> */}
                    </div>
                  );
                })}
              </div>
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
          <ViewPelajaran />
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}
