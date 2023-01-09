import React, { Fragment, useEffect, useState } from "react";
import Adminfooter from "../../components/Adminfooter";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
import { Button, notification, PageHeader, Space, Table, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FormVerification } from "../../components/form/SuperAdminVerification";
import axios from "axios";
import { get_extrakurikuler, url_by_institute } from "../../api/reference";
import { BASE_URL } from "../../api/Url";

function SuperAdminVerification() {
  const [dataSekolah, setDataSekolah] = useState([]);
  const [isViewTable, setIsViewTable] = useState(true);
  const [isViewForm, setIsViewForm] = useState(false);
  const [isViewEditForm, setIsViewEditForm] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const _getDataSekolah = () => {
    axios
      .post(
        BASE_URL,
        {
          processDefinitionId:
            "admingetinstitute:1:574a18ba-76c2-11ed-bb6a-a2fb3d782380",
          returnVariables: true,
          variables: [
            {
              name: "data",
              type: "json",
              value: {},
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
        setDataSekolah(dataRes.data);
      });
  };

  useEffect(() => {
    _getDataSekolah();
  }, []);

  const dataTable = dataSekolah?.map((data, index) => {
    return {
      no: index + 1,
      id: data.id,
      idEdit: data.id_edit,
      namaSekolah: data.nama_sekolah,
      apiKey: data.api_key,
      endpoint: data.endpoint,
      isVerified: data.is_verified,
    };
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      responsive: ["sm"],
      align: "center",
    },
    {
      title: "Nama Sekolah",
      dataIndex: "namaSekolah",
      align: "center",
    },
    {
      title: "API Key",
      dataIndex: "apiKey",
      align: "center",
    },
    {
      title: "Endpoint",
      align: "center",
      dataIndex: "endpoint",
    },
    {
      title: "Status Verifikasi",
      align: "center",
      render: (record, text) => (
        <>
          {record.isVerified == true ? (
            // <Tag style={{borderRadius: "15px", padding: '1px 9px 1px 9px'}} color='green' key={record.id}>
            //     Sudah Diverifikasi
            // </Tag>
            <CheckCircleOutlined style={{ color: "green", fontSize: "20px" }} />
          ) : (
            // <Tag style={{borderRadius: "15px"}} color='red' key={record.id}>
            //     Belum Diverifikasi
            // </Tag>
            <CloseCircleOutlined style={{ color: "red", fontSize: "20px" }} />
          )}
        </>
      ),
    },
    {
      title: "Aksi",
      align: "center",
      key: "action",
      responsive: ["sm"],
      render: (text, record) => (
        <Space size="middle">
          {record.isVerified == true ? (
            <Button
              type="primary"
              shape="round"
              size="middle"
              onClick={() => viewEditForm(record)}
              // disabled={ record.isVerified == true ? true : false}
            >
              Edit Verifikasi
            </Button>
          ) : (
            <Button
              type="primary"
              shape="round"
              size="middle"
              onClick={() => viewForm(record)}
              // disabled={ record.isVerified == true ? true : false}
            >
              Verifikasi
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const viewForm = (record) => {
    setSelectedData(record);
    setIsViewTable(false);
    setIsViewEditForm(false);
    setIsViewForm(true);
  };

  const viewEditForm = (record) => {
    setSelectedData(record);
    setIsViewTable(false);
    setIsViewForm(false);
    setIsViewEditForm(true);
  };

  const TableVerification = () => (
    <div className="container px-3 py-4">
      <div className="row mb-3">
        <div className="col-lg-12">
          <PageHeader
            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
            onClick={() => window.history.back()}
            title="Verifikasi Sekolah"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={false}
            rowClassName="bg-greylight text-grey-900"
          />
        </div>
      </div>
      <Adminfooter />
    </div>
  );

  const _submitVerif = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    axios
      .post(
        BASE_URL,
        {
          processDefinitionId:
            "adminverifikasiinstitute:1:9a2a319a-76c3-11ed-bb6a-a2fb3d782380",
          returnVariables: true,
          variables: [
            {
              name: "data",
              type: "json",
              value: {
                id_institute: selectedData.id,
                api_key: data.apikey,
                endpoint: data.endpoint,
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
        if (dataRes.status == "success") {
          notification.success({
            message: "Sukses",
            description:
              "Data sekolah berhasil di verifikasi & email berhasil dikirim.",
            placement: "top",
          });
          setIsViewEditForm(false);
          setIsViewForm(false);
          setIsViewTable(true);
          _getDataSekolah();
        } else {
          notification.error({
            message: "Error",
            description: "Gagal verifikasi data.",
            placement: "top",
          });
        }
      });
  };

  const _submitEditVerif = (e) => {
    e.preventDefault();
    const data = {};
    for (const el of e.target.elements) {
      if (el.name !== "") data[el.name] = el.value;
    }
    axios
      .post(
        BASE_URL,
        {
          processDefinitionId:
            "GlobalUpdateRecord:2:184b8903-2ccb-11ed-aacc-9a44706f3589",
          returnVariables: true,
          variables: [
            {
              name: "global_updatedata",
              type: "json",
              value: {
                tbl_name: "ref_api_keyModel",
                id: selectedData.idEdit,
                tbl_coloumn: {
                  api_key: data.apikey,
                  endpoint: data.endpoint,
                },
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

        if (dataRes.status == "success") {
          notification.success({
            message: "Sukses",
            description: "Data sekolah berhasil di verifikasi",
            placement: "top",
          });
          setIsViewEditForm(false);
          setIsViewForm(false);
          setIsViewTable(true);
          _getDataSekolah();
        } else {
          notification.error({
            message: "Error",
            description: "Gagal verifikasi data.",
            placement: "top",
          });
        }
      });
  };

  const FormVerif = () => {
    return (
      <FormVerification
        setView={() => setIsViewTable(true)}
        title={`Verifikasi Sekolah ${selectedData.namaSekolah}`}
        submit={_submitVerif}
      />
    );
  };

  const FormEditVerif = () => {
    return (
      <FormVerification
        setView={() => setIsViewTable(true)}
        title={`Edit Verifikasi Sekolah ${selectedData.namaSekolah}`}
        submit={_submitEditVerif}
        apiKey={selectedData.apiKey}
        endpoint={selectedData.endpoint}
      />
    );
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          <div className="container px-3 py-4">
            {isViewTable ? (
              <TableVerification />
            ) : isViewForm ? (
              <FormVerif />
            ) : isViewEditForm ? (
              <FormEditVerif />
            ) : (
              <TableVerification />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SuperAdminVerification;
