import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../api/Url";


export function useDataGuru() {
    const [getGuru, setGetGuru] = useState([]);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1")

    const academic = localStorage.getItem('academic_year')

    const getListGuru = () => {
        axios.post(BASE_URL,
            {
                "processDefinitionId": "globaljoinsubwhereget:2:ffda1ab3-2cc0-11ed-aacc-9a44706f3589",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_teachers",
                            "select": [
                                "x_academic_teachers.*",
                                "x_academic_year.*",
                                "users.*",
                                "m_user_profile.*",
                                "r_city.city",
                                "r_state.state",
                                "r_district.district",
                                "r_sub_district.sub_district",
                                "x_academic_teachers.id as id_guru"
                            ],
                            "paginate": 10,
                            "join": [
                                {
                                    "tbl_join": "x_academic_year",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "academic_year_id"
                                },
                                {
                                    "tbl_join": "users",
                                    "refkey": "id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "user_id"
                                },
                                {
                                    "tbl_join": "m_user_profile",
                                    "refkey": "user_id",
                                    "tbl_join2": "x_academic_teachers",
                                    "foregenkey": "user_id"
                                },
                                {
                                    "tbl_join": "r_district",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "district_id"
                                },
                                {
                                    "tbl_join": "r_state",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "state_id"
                                },
                                {
                                    "tbl_join": "r_sub_district",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "sub_discrict_id"
                                },
                                {
                                    "tbl_join": "r_city",
                                    "refkey": "id",
                                    "tbl_join2": "m_user_profile",
                                    "foregenkey": "city_id"
                                },
                                {
                                    "tbl_join": "m_institutes",
                                    "refkey": "id",
                                    "tbl_join2": "users",
                                    "foregenkey": "institute_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_teachers",
                                    "tbl_field": "academic_year_id",
                                    "tbl_value": academic,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_academic_teachers.updated_at", // =>
                            "order_by": "desc" // => 
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": paramsPage
                    }
                ]
            }
        ).then(function (response) {
            const guru = JSON.parse(response?.data?.variables[3]?.value)
            setGetGuru(guru?.data?.data)
            const pagination = guru?.data?.links;
            setBtnPagination(pagination)
        })
    }
    return{
        getGuru,
        getListGuru,
        setGetGuru,
    }
}