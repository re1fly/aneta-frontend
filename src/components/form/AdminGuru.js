import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Tooltip } from "antd";
import { GetCity, GetKecamatan, GetKelurahan, GetProvinsi } from "../../redux/Action";
import { RequiredTooltip } from "../../components/misc/RequiredTooltip"
import UploadImage from "../misc/UploadImage";

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
                                                <UploadImage
                                                    imageUrl={props.imageUrl}
                                                    isDisabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama <RequiredTooltip />
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
                                                    NUPTK
                                                </label>
                                                <input
                                                    type="number"
                                                    name='nuptk'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NIP
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nip'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jenis Kelamin
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="jenis_kelamin"
                                                    // required
                                                    disabled={props.isDisabled}
                                                >
                                                    {/* <option value={props.statusGuru} selected disabled>
                                                        {props.statusGuru}
                                                    </option> */}
                                                    <option value='' selected disabled>
                                                        Pilih Jenis Kelamin
                                                    </option>
                                                    <option value="L">
                                                        Laki-Laki
                                                    </option>
                                                    <option value="P">
                                                        Perempuan
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tempat Lahir <RequiredTooltip />
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
                                                    Tanggal Lahir <RequiredTooltip />
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
                                                    Status Kepegawaian <RequiredTooltip />
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="status_kepegawaian"
                                                    required
                                                // disabled={props.isDisabled}
                                                >
                                                    <option value='' selected disabled>
                                                        Pilih Status Kepegawaian
                                                    </option>
                                                    <option value="1">
                                                        Guru Honorer Sekolah
                                                    </option>
                                                    <option value="2">
                                                        GTY/PTY
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jenis PTK <RequiredTooltip />
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="jenis_ptk"
                                                    required
                                                // disabled={props.isDisabled}
                                                >
                                                    <option value='' selected disabled>
                                                        Pilih Jenis PTK
                                                    </option>
                                                    <option value="1">
                                                        Guru Mapel
                                                    </option>
                                                    <option value="2">
                                                        Guru Kelas
                                                    </option>
                                                    <option value="3">
                                                        Guru Pendamping Khusus
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Agama <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='agama'
                                                    className="form-control"
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Email <RequiredTooltip />
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
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nomor HP <RequiredTooltip />
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

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nomor Telepon
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nomortelefon2_guru'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nomor SK <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='sk_guru'
                                                    className="form-control"
                                                    defaultValue={props.nomorSk}
                                                    // required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Status <RequiredTooltip />
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
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Provinsi <RequiredTooltip />
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
                                                    Kota / Kabupaten <RequiredTooltip />
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
                                                    Kecamatan <RequiredTooltip />
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
                                                    Kelurahan <RequiredTooltip />
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
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Dusun
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nama_dusun'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    RT
                                                </label>
                                                <input
                                                    type="text"
                                                    name='rt'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    RW
                                                </label>
                                                <input
                                                    type="text"
                                                    name='rw'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kode Pos
                                                </label>
                                                <input
                                                    type="text"
                                                    name='kode_pos'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss">
                                                Alamat <RequiredTooltip />
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
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tugas Tambahan
                                                </label>
                                                <input
                                                    type="text"
                                                    name='tugas_tambahan'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    SK CPNS
                                                </label>
                                                <input
                                                    type="text"
                                                    name='sk_cpns'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tanggal CPNS
                                                </label>
                                                <input
                                                    type="date"
                                                    name='tanggal_cpns'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    SK Pengangkatan
                                                </label>
                                                <input
                                                    type="text"
                                                    name='sk_pengangkatan'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    TMT Pengangkatan <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="date"
                                                    name='tmt_pengangkatan'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Lembaga Pengangkatan <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='lembaga_pengangkatan'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Pangkat Golongan
                                                </label>
                                                <input
                                                    type="text"
                                                    name='pangkat_golongan'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Sumber Gaji <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='sumber_gaji'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Ibu Kandung <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nama_ibu'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Status Perkawinan
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="status_perkawinan"
                                                // required
                                                // disabled={props.isDisabled}
                                                >
                                                    <option value='' selected disabled>
                                                        Pilih Status Perkawinan
                                                    </option>
                                                    <option value="1">
                                                        Kawin
                                                    </option>
                                                    <option value="2">
                                                        Belum Kawin
                                                    </option>
                                                    <option value="3">
                                                        Janda / Duda
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Suami / Istri
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nama_pasangan'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NIP Suami / Istri
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nip_pasangan'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Pekerjaan Sumai / Istri <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='pekerjaan_pasangan'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    TMT PNS
                                                </label>
                                                <input
                                                    type="text"
                                                    name='tmt_pns'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Sudah Lisensi Kepala Sekolah
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="lisensi_kepsek"
                                                // required
                                                // disabled={props.isDisabled}
                                                >
                                                    <option value='' selected disabled>
                                                        Pilih Lisensi
                                                    </option>
                                                    <option value="1">
                                                        Ya
                                                    </option>
                                                    <option value="2">
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Pernah Diklat Kepegawaian
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="diklat_kepegawaian"
                                                // required
                                                // disabled={props.isDisabled}
                                                >
                                                    <option value='' selected disabled>
                                                        Pilih Diklat Kepegawaian
                                                    </option>
                                                    <option value="1">
                                                        Ya
                                                    </option>
                                                    <option value="2">
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Keahlian Braille
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="lkeahian_braille"
                                                // required
                                                // disabled={props.isDisabled}
                                                >
                                                    <option value='' selected disabled>
                                                        Pilih Keahlian Braille
                                                    </option>
                                                    <option value="1">
                                                        Ya
                                                    </option>
                                                    <option value="2">
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Keahlian Bahasa Isyarat
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="bahasa_isyarat"
                                                // required
                                                // disabled={props.isDisabled}
                                                >
                                                    <option value='' selected disabled>
                                                        Pilih Keahlian Bahasa Isyarat
                                                    </option>
                                                    <option value="1">
                                                        Ya
                                                    </option>
                                                    <option value="2">
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NPWP
                                                </label>
                                                <input
                                                    type="text"
                                                    name='npwp'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Wajib Pajak
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nama_wajibpajak'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kewarganegaraan <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='kewarganegaraan'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NIK <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nik'
                                                    className="form-control"
                                                    // defaultValue={props.nomorHp}
                                                    required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No Kartu Keluarga
                                                </label>
                                                <input
                                                    type="text"
                                                    name='no_kk'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Bank
                                                </label>
                                                <input
                                                    type="text"
                                                    name='bank'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No Rekening Bank
                                                </label>
                                                <input
                                                    type="text"
                                                    name='no_rekening'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Rekening Atas Nama
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nama_rekening'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Karpeg
                                                </label>
                                                <input
                                                    type="text"
                                                    name='karpeg'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Karis / Karsu
                                                </label>
                                                <input
                                                    type="text"
                                                    name='karis_karsu'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Lintang
                                                </label>
                                                <input
                                                    type="text"
                                                    name='lintang'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Bujur
                                                </label>
                                                <input
                                                    type="text"
                                                    name='bujur'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NUKS
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nuks'
                                                    className="form-control"
                                                // defaultValue={props.nomorHp}
                                                // required
                                                // disabled={props.isDisabled}
                                                />
                                            </div>
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