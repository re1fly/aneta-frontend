import {notification} from "antd";
import axios from "axios";
import {SearchOutlined} from "@ant-design/icons";
import {BASE_URL} from "../api/Url";

export const searchGlobal = (value, paramsPage, processDef, variablesSearch) => (dispatch) => {
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
                const data = JSON.parse(response.data.variables[3].value);
                dispatch({type: "SEARCH_GLOBAL", value: data});
                console.log(data)
            });
    }
};


export const filterGlobal = (dispatch) => {
    
}