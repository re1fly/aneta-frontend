import {FileExclamationOutlined} from "@ant-design/icons";
import React from "react";

export const DataNotFound = () => (
    <div className="col-lg-12 text-center">
        <FileExclamationOutlined
            style={{fontSize: '10rem', color: '#006080', marginTop: '100px'}}/>
        <h2 style={{marginTop: '20px', marginBottom: '220px'}}>Data Kosong</h2>
    </div>
)