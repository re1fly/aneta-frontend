import React from "react";

export const MapelByAcademic = (props) => {
    return (
        <div className="form-group">
            <select
                className="form-control"
                name="id_mapel_filter"
            >
                <option value="" selected disabled>
                    Pilih Mata Pelajaran
                </option>
                {props.selectMapel}
            </select>
        </div>
    )
}