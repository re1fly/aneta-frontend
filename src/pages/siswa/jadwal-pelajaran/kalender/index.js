import { Badge, Calendar, Card, PageHeader } from "antd";
import Search from "antd/lib/transfer/search";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TanggalKalenderSiswa } from "../../../../redux/Action";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  role_siswa_get_kalender,
  url_by_institute,
} from "../../../../api/reference";
import Adminfooter from "../../../../components/Adminfooter";
import Appheader from "../../../../components/Appheader";
import Navheader from "../../../../components/Navheader";
import moment from "moment";

export default function SiswaKalender() {
  const [dataTanggal, setDataTanggal] = useState([]);

  const userId = localStorage.getItem("user_id");
  const academicId = localStorage.getItem("academic_id");
  const currentMonth = 1 + moment().month();
  const currentYear = moment().year();

  const dispatch = useDispatch();
  const _onSearch = (value) => console.log(value);

  useEffect(() => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: role_siswa_get_kalender,
          returnVariables: true,
          variables: [
            {
              name: "data",
              type: "json",
              value: {
                id_siswa: userId,
                bulan: currentMonth,
                year: currentYear,
                id_academik: academicId,
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
        setDataTanggal(dataRes.data);
      });
  }, [userId, currentMonth, currentYear]);

  const getListData = (value, dataTanggal) => {
    let listData;

    const forDate = "0" + value.date();
    const date = forDate.slice(-2);
    const forMonth = "0" + (value.month() + 1);
    const month = forMonth.slice(-2);
    const year = value.year();
    const allDay = `${year}-${month}-${date}`;
    // console.log(month);

    {
      dataTanggal.map((tanggal, i) => {
        switch (allDay) {
          case tanggal.date:
            listData = [
              {
                type: tanggal.materi == true ? "success" : null,
                content: tanggal.materi == true ? "Materi" : null,
              },
              {
                type: tanggal.tugas == true ? "warning" : null,
                content: tanggal.tugas == true ? "Tugas" : null,
              },
            ];

            break;
          default:
        }
      });
    }

    return listData || [];
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    console.log(num);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, dataTanggal);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const headerRender = () => null;

  let history = useHistory();
  const selectKalender = (e) => {
    const tanggal = e.format("YYYY-MM-DD");
    dispatch(TanggalKalenderSiswa(tanggal));
    history.push(`/siswa-list-pertemuan-kalender`);
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          <div className="container px-3 py-4">
            <div className="row">
              <div className="col-lg-12">
                <PageHeader
                  className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                  title="Jadwal Pelajaran Kalender"
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
                <Calendar
                  dateCellRender={dateCellRender}
                  // monthCellRender={monthCellRender}
                  onSelect={selectKalender}
                  headerRender={headerRender}
                />
              </div>
            </div>
          </div>

          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}
