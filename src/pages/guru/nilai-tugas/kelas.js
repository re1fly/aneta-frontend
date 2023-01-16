import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PathKelasNilaiGuru } from "../../../redux/Action";
import { Card, PageHeader } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import axios from "axios";
import Search from "antd/es/input/Search";
import Adminfooter from "../../../components/Adminfooter";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import {
  global_join_sub_where_get,
  url_by_institute,
} from "../../../api/reference";

export default function GuruNilaiKelas() {
  const [grid, setGrid] = useState(false);
  const [getKelas, setGetKelas] = useState([]);

  const academicYear = localStorage.getItem("academic_year");
  const instituteId = localStorage.getItem("institute");

  const dispatch = useDispatch();
  const _onSearch = (value) => console.log(value);

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
                tbl_induk: "r_class_type",
                select: ["r_class_type.id", "r_class_type.class_type"],
                paginate: false,
                join: [
                  {
                    tbl_join: "m_institutes",
                    refkey: "id",
                    tbl_join2: "r_class_type",
                    foregenkey: "institute_id",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "r_class_type",
                    tbl_field: "institute_id",
                    tbl_value: instituteId,
                    operator: "=",
                  },
                ],
                order_coloumn: "r_class_type.class_type",
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
        const kelas = dataRes?.data;
        setGetKelas(kelas);
      });
  }, [academicYear]);

  const channelList = getKelas.map((data, index) => {
    return {
      idClass: data.id,
      kelas: data.class_type,
    };
  });

  let history = useHistory();
  const handleSubClass = (id, kelas) => {
    dispatch(PathKelasNilaiGuru(kelas));
    history.push(`/guru-nilai-sub-kelas-${id}`);
  };

  const ViewPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader
              className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
              // onBack={() => window.history.back()}
              title="Data Nilai"
            />
            <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
              <div className="row">
                <div className="col-lg-8 col-md-6 my-2"></div>
                <div className="col-lg-4 col-md-6 my-2">
                  <Search
                    className="mr-3"
                    placeholder="Cari kata kunci"
                    allowClear
                    onSearch={_onSearch}
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </Card>

            <div className="px-1 py-2 ">
              <div className="row">
                {channelList.map((value, index) => {
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-4">
                      <div
                        className="d-flex align-items-center justify-content-center card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 text-center"
                        onClick={() =>
                          handleSubClass(value.idClass, value.kelas)
                        }
                      >
                        <h2 className="ml-auto mr-auto font-weight-bold mb-0">
                          Kelas {value.kelas}
                        </h2>
                      </div>
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
