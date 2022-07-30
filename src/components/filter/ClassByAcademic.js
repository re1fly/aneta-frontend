import React from "react";

export const ClassByAcademic = (props) => {
    return (
        <div className="form-group">
            <select
                className="form-control"
                name="id_class_filter"
                onChange={props.onChangeKelas}
            >
                <option value="" selected disabled>
                    Pilih Kelas
                </option>
                {props.selectKelas}
            </select>
        </div>
    )
}