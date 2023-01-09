import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {GetCity, GetKecamatan, GetKelurahan, GetProvinsi} from "../../redux/Action.js";
import {RequiredTooltip} from "../misc/RequiredTooltip.js";

export const FormDaerah = (props) => {
    const dispatch = useDispatch();
    const dataAddres = useSelector((state) => state.addres);

    const provinsi = dataAddres?.DataProvinsi;
    const city = dataAddres?.DataCity;
    const kecamatan = dataAddres?.DataKecamatan;
    const kelurahan = dataAddres?.DataKelurahan;

    const [idProv, setIdProv] = useState("");
    const [idCity, setIdCity] = useState("");
    const [idKecamatan, setIdKecamatan] = useState("");
    const [idKelurahan, setIdKelurahan] = useState("");

    useEffect(() => {
        dispatch(GetProvinsi());
        if (idProv != "") {
            dispatch(GetCity(idProv));
        }
        if (idCity != "") {
            dispatch(GetKecamatan(idCity));
        }
        if (idKecamatan != "") {
            dispatch(GetKelurahan(idKecamatan));
        }
    }, [idProv, idCity, idKecamatan]);

    useEffect(() => {
        if (props.location == "edit" || props.location == "detail") {
            setIdProv(props.idProvinsi);
            setIdCity(props.idKota);
            setIdKecamatan(props.idKec);
            setIdKelurahan(props.idKel);
        }
    }, []);

    return(
        <>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Provinsi { props.isRequired == true ?  <RequiredTooltip /> : null }
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name={props.nameProvinsi}
                            // disabled={props.isDisabled}
                            disabled={props.isDisabled}
                            required={props.isRequired}
                            onChange={(event) => {
                                if (idProv != "") {
                                    //  isResetData("provinsi");
                                    if (event.currentTarget.value != idProv) {
                                        // ResetDataFun()
                                        dispatch({ type: "SET_CITY", value: [] });
                                        dispatch({ type: "SET_KECAMATAN", value: [] });
                                        dispatch({ type: "SET_KELURAHAN", value: [] });
                                        setIdCity("");
                                        setIdKecamatan("");
                                        setIdKelurahan("");
                                    }
                                }
                                setIdProv(event.currentTarget.value);
                            }}
                        >
                            <option
                                value={""}
                                selected={idProv == "" ? false : true}
                            >
                                {props.provinsi == undefined
                                    ? "Pilih Provinsi"
                                    : idProv != props.idProvinsi
                                        ? "Pilih Provinsi"
                                        : props.provinsi}
                            </option>

                            {provinsi.map((data, i) => {
                                return (
                                    <option
                                        value={data.id}
                                        selected={data.id != idProv ? false : true}
                                    >
                                        {data.state}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kota / Kabupaten { props.isRequired == true ?  <RequiredTooltip /> : null }
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name={props.nameKota}
                            // disabled={props.isDisabled}
                            disabled={props.isDisabled}
                            required={props.isRequired}
                            onChange={(event) => {
                                if (idCity != "") {
                                    // isResetData("city");
                                    if (event.currentTarget.value != idCity) {
                                        // ResetDataFun()
                                        dispatch({ type: "SET_KECAMATAN", value: [] });
                                        dispatch({ type: "SET_KELURAHAN", value: [] });
                                        setIdKecamatan("");
                                        setIdKelurahan("");
                                    }
                                }
                                setIdCity(event.currentTarget.value);
                            }}
                        >
                            <option
                                value={""}
                                selected={idCity == "" ? false : true}
                            >
                                {props.kota == undefined
                                    ? "Pilih Kota"
                                    : idCity != props.idKota
                                        ? "Pilih Kota"
                                        : props.kota}
                            </option>
                            {city?.map((data, i) => {
                                return (
                                    <option
                                        value={data.id}
                                        selected={data.id != idCity ? false : true}
                                        key={i}
                                    >
                                        {data.city}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kecamatan { props.isRequired == true ?  <RequiredTooltip /> : null }
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name={props.nameKecamatan}
                            // disabled={props.isDisabled}
                            disabled={props.isDisabled}
                            required={props.isRequired}
                            onChange={(event) => {
                                if (idKecamatan != "") {
                                    if (event.currentTarget.value != idKecamatan) {
                                        dispatch({ type: "SET_KELURAHAN", value: [] });
                                        setIdKelurahan("");
                                    }
                                }
                                setIdKecamatan(event.currentTarget.value);
                            }}
                        >
                            <option
                                value={""}
                                selected={idKecamatan == "" ? false : true}
                            >
                                {props.kecamatan == undefined
                                    ? "Pilih Kecamatan"
                                    : idKecamatan != props.idKec
                                        ? "Pilih Kecamatan"
                                        : props.kecamatan}
                            </option>
                            {kecamatan?.map((data, i) => {
                                return (
                                    <option
                                        value={data.id}
                                        selected={data.id != idKecamatan ? false : true}
                                        key={i}
                                    >
                                        {data.district}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kelurahan { props.isRequired == true ?  <RequiredTooltip /> : null }
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name={props.nameKelurahan}
                            disabled={props.isDisabled}
                            required={props.isRequired}
                            onChange={(event) => {
                                setIdKelurahan(event.currentTarget.value);
                            }}
                        >
                            <option
                                value={""}
                                selected={idKelurahan == "" ? false : true}
                            >
                                {props.kelurahan == undefined
                                    ? "Pilih Kelurahan"
                                    : idKelurahan != props.idKel
                                        ? "Pilih Kelurahan"
                                        : props.kelurahan}
                            </option>
                            {kelurahan?.map((data, i) => {
                                return (
                                    <option
                                        value={data.id}
                                        selected={data.id != idKelurahan ? false : true}
                                        key={i}
                                    >
                                        {data.sub_district}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}