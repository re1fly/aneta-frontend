import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import { GetCity, GetKecamatan, GetKelurahan, GetProvinsi } from "../../redux/Action";

export const FormAdminGuru = (props) => {

    const dispatch = useDispatch();
    const dataAddres = useSelector(state => state.addres);

    const provinsi = dataAddres?.DataProvinsi
    const city = dataAddres?.DataCity
    const kecamatan = dataAddres?.DataKecamatan
    const kelurahan = dataAddres?.DataKelurahan

    const [idProv, setIdProv] = useState('');
    const [idCity, setIdCity] = useState('');
    const [idKecamatan, setIdKecamatan] = useState('');
    const [idKelurahan, setIdKelurahan] = useState('');

    const [handleImage, setHandleImage] = useState('')
    const [_Img, setIMG] = useState('');
    const [_ImgBase64, setIMGBase64] = useState('');

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    const onChangeImage = (info) => {
        console.log("tet", info);
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setIMG(url);
                toDataURL(url, function (dataUrl) {
                    setIMGBase64(dataUrl);
                    setHandleImage(dataUrl);
                    console.log('RESULT:', dataUrl)
                })
            });
        }
    };

    useEffect(() => {
        dispatch(GetProvinsi());
        if (idProv != '') {
            dispatch(GetCity(idProv));
        }
        if (idCity != '') {
            dispatch(GetKecamatan(idCity));
        }
        if (idKecamatan != '') {
            dispatch(GetKelurahan(idKecamatan));
        }
    }, [idProv, idCity, idKecamatan])

    useEffect(() => {
        if (props.location == 'edit' || props.location == 'detail') {
            setIdProv(props.idProvinsi);
            setIdCity(props.idKota);
            setIdKecamatan(props.idKec);
            setIdKelurahan(props.idKel);
        }

    }, [])


    let disabledButton = props.isDisabled;

    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i onClick={props.setView}
                                    className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title}
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0">
                                <form id="teacher_form"
                                    onSubmit={props.submit}
                                    method="POST">
                                    <div class="row">
                                        <div className="col-lg-12 mb-5">
                                            <div className="d-flex justify-content-center">
                                                <Card className="bg-lightblue" style={{ width: 157 }}>
                                                    <ImgCrop rotate>
                                                        <Upload
                                                            name="image_guru"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                            onChange={onChangeImage}
                                                        // onPreview={onPreview}
                                                        >
                                                            {_Img ? (
                                                                <img
                                                                    src={_Img}
                                                                    alt="avatar"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}

                                                                />
                                                            ) : (
                                                                <PlusOutlined />
                                                            )}
                                                        </Upload>
                                                    </ImgCrop>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nama_guru'
                                                    className="form-control"
                                                    defaultValue={props.namaGuru}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nomor HP
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nomortelefon_guru'
                                                    className="form-control"
                                                    defaultValue={props.nomorHp}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tempat Lahir
                                                </label>
                                                <input
                                                    type="text"
                                                    name="tempatlahir_guru"
                                                    className="form-control"
                                                    defaultValue={props.tempatLahir}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tanggal Lahir
                                                </label>
                                                <input
                                                    type="date"
                                                    name='tanggallahir_guru'
                                                    className="form-control"
                                                    defaultValue={props.tanggalLahir}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    name='email_guru'
                                                    className="form-control"
                                                    defaultValue={props.email}
                                                    required
                                                    disabled={props.disabledEmail}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nomor SK
                                                </label>
                                                <input
                                                    type="text"
                                                    name='sk_guru'
                                                    className="form-control"
                                                    defaultValue={props.nomorSk}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Provinsi
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="provinsi_guru"
                                                    // disabled={props.isDisabled}
                                                    disabled={props.isDisabled}
                                                    required
                                                    onChange={(event) => {
                                                        if (idProv != '') {
                                                            //  isResetData("provinsi");
                                                            if (event.currentTarget.value != idProv) {
                                                                // ResetDataFun()
                                                                dispatch({ type: "SET_CITY", value: [] });
                                                                dispatch({ type: "SET_KECAMATAN", value: [] });
                                                                dispatch({ type: "SET_KELURAHAN", value: [] });
                                                                setIdCity('');
                                                                setIdKecamatan('');
                                                                setIdKelurahan('');

                                                            }
                                                        }
                                                        setIdProv(event.currentTarget.value);
                                                    }}
                                                >
                                                    <option selected={idProv == '' ? false : true}>
                                                        {props.provinsi == undefined ? "Pilih Provinsi" : idProv != props.idProvinsi ? "Pilih Provinsi" : props.provinsi}
                                                    </option>


                                                    {provinsi.map((data, i) => {
                                                        return (
                                                            <option value={data.id} selected={data.id != idProv ? false : true} >
                                                                {data.state}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kota / Kabupaten
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kota_guru"
                                                    // disabled={props.isDisabled}
                                                    disabled={props.isDisabled}
                                                    required
                                                    onChange={(event) => {
                                                        if (idCity != '') {
                                                            // isResetData("city");
                                                            if (event.currentTarget.value != idCity) {
                                                                // ResetDataFun()
                                                                dispatch({ type: "SET_KECAMATAN", value: [] });
                                                                dispatch({ type: "SET_KELURAHAN", value: [] });
                                                                setIdKecamatan('');
                                                                setIdKelurahan('');
                                                            }
                                                        }
                                                        setIdCity(event.currentTarget.value)
                                                    }
                                                    }
                                                >

                                                    <option selected={idCity == '' ? false : true}>
                                                        {props.kota == undefined ? "Pilih Kota" : idCity != props.idKota ? "Pilih Kota" : props.kota}
                                                    </option>
                                                    {city.map((data, i) => {
                                                        return (
                                                            <option value={data.id} selected={data.id != idCity ? false : true} key={i}>
                                                                {data.city}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kecamatan
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kecamatan_guru"
                                                    // disabled={props.isDisabled}
                                                    disabled={props.isDisabled}
                                                    required
                                                    onChange={(event) => {
                                                        if (idKecamatan != '') {
                                                            if (event.currentTarget.value != idKecamatan) {
                                                                dispatch({ type: "SET_KELURAHAN", value: [] });
                                                                setIdKelurahan('');
                                                            }
                                                        }
                                                        setIdKecamatan(event.currentTarget.value)
                                                    }}
                                                >
                                                    <option selected={idKecamatan == '' ? false : true}>
                                                        {props.kecamatan == undefined ? "Pilih Kecamatan" : idKecamatan != props.idKec ? "Pilih Kecamatan" : props.kecamatan}
                                                    </option>
                                                    {kecamatan.map((data, i) => {
                                                        return (
                                                            <option value={data.id} selected={data.id != idKecamatan ? false : true} key={i}>
                                                                {data.district}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kelurahan
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kelurahan_guru"
                                                    disabled={props.isDisabled}
                                                    required
                                                    onChange={(event) => {
                                                        setIdKelurahan(event.currentTarget.value);
                                                    }}
                                                >
                                                    <option selected={idKelurahan == '' ? false : true}>
                                                        {props.kelurahan == undefined ? "Pilih Kelurahan" : idKelurahan != props.idKel ? "Pilih Kelurahan" : props.kelurahan}
                                                    </option>
                                                    {kelurahan.map((data, i) => {
                                                        return (
                                                            <option value={data.id} selected={data.id != idKelurahan ? false : true} key={i}>
                                                                {data.sub_district}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Status
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="status_guru"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.statusGuru} selected disabled>
                                                        {props.statusGuru}
                                                    </option>
                                                    <option value="PNS">
                                                        PNS
                                                    </option>
                                                    <option value="HONORER">
                                                        HONORER
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss">
                                                Alamat
                                            </label>
                                            <textarea
                                                className="form-control mb-0 p-3 bg-greylight lh-16"
                                                rows="5"
                                                name="alamat_guru"
                                                placeholder="Isi alamat detail anda..."
                                                defaultValue={props.alamat}
                                                required
                                                disabled={props.isDisabled}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {!disabledButton ? <div className="col-lg-12">

                                            <button
                                                className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                type="submit"
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                onClick={props.setView}
                                                className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-none"
                                            >
                                                Batal
                                            </button>
                                        </div> : null}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}