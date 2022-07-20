import { notification } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { BASE_URL } from "../api/Url";

export const searchGlobal =
  (value, paramsPage, processDef, variablesSearch) => (dispatch) => {
    if (value == "") {
      window.location.reload();
    } else {
      notification.info({
        message: "Search",
        description: "Mencari data : " + value,
        duration: 1,
        icon: <SearchOutlined />,
      });
      axios
        .post(
          BASE_URL,
          {
            processDefinitionId: processDef,
            returnVariables: true,
            variables: [
              variablesSearch,
              {
                name: "page",
                type: "string",
                value: paramsPage,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          const siswa = JSON.parse(response.data.variables[3].value);
          dispatch({ type: "SEARCH_GLOBAL", value: siswa });
        });
    }
  };

export const getProcessId = (keyProcess) => (dispatch) => {
  axios
    .post(
      BASE_URL,
      {
        processDefinitionId:
          "getdefinisionid:1:c22eb863-ed24-11ec-9ea6-c6ec5d98c2df",
        returnVariables: true,
        variables: [
          {
            name: "key",
            type: "json",
            value: {
              key: keyProcess,
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const data = JSON.parse(response?.data?.variables[2]?.value);
      const getValue = data?.data;
      dispatch({ type: "GET_PROCESSID", value: getValue });
    });
};

export const GetProvinsi = () => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId:
        "getdataglobal:5:7248a1b1-d5a7-11ec-a658-66fc627bf211",
      returnVariables: true,
      variables: [
        {
          name: "global_getdata",
          type: "json",
          value: {
            tbl_name: "r_state",
            tbl_coloumn: ["*"],
            order_coloumn: "state",
            order_by: "asc",
            pagination: false,
            total_result: 2,
          },
        },
      ],
    })
    .then(function (response) {
      const dataProvinsi = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_PROVINSI", value: dataProvinsi?.data });
      // console.log(dataProvinsi);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetCity = (id_provinsi) => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId:
        "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
      returnVariables: true,
      variables: [
        {
          name: "global_get_where",
          type: "json",
          value: {
            tbl_name: "r_city",
            order_coloumn: "city",
            order_by: "asc",
            pagination: false,
            total_result: 2,
            data: [
              {
                kondisi: "where",
                tbl_coloumn: "state_id",
                tbl_value: id_provinsi,
                operator: "=",
              },
            ],
            tbl_coloumn: ["*"],
          },
        },
      ],
    })
    .then(function (response) {
      const data = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_CITY", value: data });
      // console.log('city', data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetKecamatan = (id_city) => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId:
        "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
      returnVariables: true,
      variables: [
        {
          name: "global_get_where",
          type: "json",
          value: {
            tbl_name: "r_district",
            pagination: false,
            order_coloumn: "district",
            order_by: "asc",
            total_result: 2,
            data: [
              {
                kondisi: "where",
                tbl_coloumn: "city_id",
                tbl_value: id_city,
                operator: "=",
              },
            ],
            tbl_coloumn: ["*"],
          },
        },
      ],
    })
    .then(function (response) {
      const data = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_KECAMATAN", value: data });
      // console.log('Kecamatan', data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetKelurahan = (id_kecamatan) => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId:
        "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
      returnVariables: true,
      variables: [
        {
          name: "global_get_where",
          type: "json",
          value: {
            tbl_name: "r_sub_district",
            order_coloumn: "sub_district",
            order_by: "asc",
            pagination: false,
            total_result: 2,
            data: [
              {
                kondisi: "where",
                tbl_coloumn: "district_id",
                tbl_value: id_kecamatan,
                operator: "=",
              },
            ],
            tbl_coloumn: ["*"],
          },
        },
      ],
    })
    .then(function (response) {
      const data = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_KELURAHAN", value: data });
      // console.log('Kelurahan', data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
