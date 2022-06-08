import {notification} from "antd";
import axios from "axios";
import {SearchOutlined} from "@ant-design/icons";
import {BASE_URL} from "../api/Url";

export const searchGlobal = (value, paramsPage) => (dispatch) => {
    if (value == "") {
        window.location.reload();
    } else {
        notification.info({
            message: "Search",
            description: "Mencari data : " + value,
            duration: 1,
            icon: <SearchOutlined/>,
        });
        axios
            .post(
                BASE_URL,
                {
                    processDefinitionId:
                        "getdatajoinwhere:2:d2aed4a7-dff4-11ec-a658-66fc627bf211",
                    returnVariables: true,
                    variables: [
                        {
                            name: "global_join_where",
                            type: "json",
                            value: {
                                tbl_induk: "x_academic_students",
                                paginate: 200,
                                join: [
                                    {
                                        tbl_join: "x_academic_year",
                                        foregenkey: "academic_year_id",
                                        refkey: "id",
                                    },
                                    {
                                        tbl_join: "users",
                                        foregenkey: "user_id",
                                        refkey: "id",
                                    },
                                    {
                                        tbl_join: "x_academic_class",
                                        foregenkey: "class_id",
                                        refkey: "id",
                                    },
                                    {
                                        tbl_join: "m_user_profile",
                                        foregenkey: "user_id",
                                        refkey: "user_id",
                                    },
                                ],
                                where: [
                                    {
                                        tbl_coloumn: "m_user_profile",
                                        tbl_field: "nisn",
                                        tbl_value: value,
                                        operator: "ILIKE",
                                    },
                                    {
                                        tbl_coloumn: "users",
                                        tbl_field: "name",
                                        tbl_value: value,
                                        operator: "ILIKE",
                                    },
                                    {
                                        tbl_coloumn: "m_user_profile",
                                        tbl_field: "date_of_birth",
                                        tbl_value: value,
                                        operator: "ILIKE",
                                    },
                                    {
                                        tbl_coloumn: "users",
                                        tbl_field: "email",
                                        tbl_value: value,
                                        operator: "ILIKE",
                                    },
                                ],
                                order_coloumn: "users.name",
                                order_by: "asc",
                            },
                        },
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
                // const pagination = siswa.data.links;

                dispatch({type: "SEARCH_GLOBAL", value: siswa});
                console.log(siswa)
                // setGetSiswa(siswa.data.data)
                // setBtnPagination(pagination)
            });
    }
};
