import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Select } from "antd";
import { RequiredTooltip } from "../misc/RequiredTooltip";
import { GetKompetensi, GetPelajaran, GetSubKelas, GetTingkatKelas } from "../../redux/Action";
import GuruDataTugas from "../../pages/guru/data-tugas";

export const FormCreateMateri = (props) => {

    const dispatch = useDispatch();
    const dataClassMateri = useSelector(state => state.classMateri);

    const tingkatKelas = dataClassMateri?.DataTingkatKelas
    const subKelas = dataClassMateri?.DataSubKelas
    const pelajaran = dataClassMateri?.DataPelajaran
    const kompetensi = dataClassMateri?.DataKompetensi

    const [idTingkatKelas, setIdTingkatKelas] = useState('');
    const [idSubKelas, setIdSubKelas] = useState('');
    const [idPelajaran, setIdPelajaran] = useState('');
    const [idKompetensi, setIdKompetensi] = useState('');
    const [uploadTugas, setUploadTugas] = useState(false);
    console.log(uploadTugas);
    const [idKom, setIdKom] = useState([]);

    const getClick = () => {
        let checkedValue = document.querySelector("input[type=checkbox]");
        // console.log(checkedValue.checked);
        setUploadTugas(checkedValue?.checked)
    }

    useEffect(() => {
        dispatch(GetTingkatKelas());
        if (idTingkatKelas != '') {
            dispatch(GetSubKelas(idTingkatKelas));
        }
        if (idSubKelas != '') {
            dispatch(GetPelajaran(idTingkatKelas, idSubKelas));
        }
        if (idPelajaran != '') {
            dispatch(GetKompetensi(idPelajaran));
        }
    }, [idTingkatKelas, idSubKelas, idPelajaran])

    const { Option } = Select;

    const handleChange = (id, e) => {
        setIdKom(id)
    };

    // const iFrame = `<iframe src="http://localhost:8080/wordpress/wp-admin/admin-ajax.php?action=h5p_embed&id=3" width="741" height="826" frameborder="0" allowfullscreen="allowfullscreen" title="Materi Matematika"></iframe><script src="http://localhost:8080/wordpress/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js" charset="UTF-8"></script>`
    // let id = iFrame?.split('id=')[1]
    // let id_content_wp = id?.split('" width=')[0]

    let disabledButton = props.disabledButton;
    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i onClick={props.setView} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title} {props.form}
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form id="teacher_form"
                                    onSubmit={props.submit}
                                    method="POST">
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tingkat Kelas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="tingkat_kelas"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        if (idTingkatKelas != '') {
                                                            if (event.currentTarget.value != idTingkatKelas) {
                                                                dispatch({ type: "SET_SUBCLASS", value: [] });
                                                                dispatch({ type: "SET_PELAJARAN", value: [] });
                                                                dispatch({ type: "SET_KOMPETENSI", value: [] });
                                                                setIdSubKelas('');
                                                                setIdPelajaran('');
                                                                setIdKompetensi('');
                                                            }
                                                        }
                                                        setIdTingkatKelas(event.currentTarget.value);
                                                    }}
                                                >
                                                    <option value="" selected={idTingkatKelas == '' ? false : true}>
                                                        {props.tingkatKelas == undefined ? "Pilih Tingkat Kelas" : props.tingkatKelas}
                                                    </option>
                                                    {tingkatKelas.map((data, i) => {
                                                        return (
                                                            <option value={data.id}
                                                            // selected={data.id != idProv ? false : true}
                                                            >
                                                                {data.class_type}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Sub Kelas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="sub_kelas"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        if (idSubKelas != '') {
                                                            if (event.currentTarget.value != idSubKelas) {
                                                                dispatch({ type: "SET_PELAJARAN", value: [] });
                                                                dispatch({ type: "SET_KOMPETENSI", value: [] });
                                                                setIdPelajaran('');
                                                                setIdKompetensi('');
                                                            }
                                                        }
                                                        setIdSubKelas(event.currentTarget.value)
                                                    }
                                                    }
                                                >
                                                    <option value="" selected disabled>
                                                        {props.subKelas == undefined ? "Pilih Sub Kelas" : props.subKelas}
                                                    </option>
                                                    {subKelas.map((data, i) => {
                                                        return (
                                                            <option value={data.id}
                                                            // selected={data.id != idCity ? false : true} key={i}
                                                            >
                                                                {data.sub_class}
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
                                                    Mata Pelajaran
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="mata_pelajaran"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        if (idPelajaran != '') {
                                                            if (event.currentTarget.value != idPelajaran) {
                                                                dispatch({ type: "SET_KOMPETENSI", value: [] });
                                                                setIdKompetensi('');
                                                            }
                                                        }
                                                        setIdPelajaran(event.currentTarget.value)
                                                    }}
                                                >
                                                    <option value="" selected disabled>
                                                        {props.mataPelajaran == undefined ? "Pilih Mata Pelajaran" : props.mataPelajaran}
                                                    </option>
                                                    {pelajaran.map((data, i) => {
                                                        return (
                                                            <option value={data.id}
                                                            // selected={data.id != idKecamatan ? false : true} key={i}
                                                            >
                                                                {data.nama_mata}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama {props.form}
                                                </label>
                                                <input
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_materi"
                                                    required
                                                    disabled={props.titleDisabled}
                                                    defaultValue={props.namaMateri}
                                                >
                                                </input>
                                            </div>
                                        </div>
                                    </div>

                                    {props.form == "Tugas" ?
                                        <>
                                            <label className="mont-font fw-600 font-xsss">
                                                Metode Mengerim Jawaban {props.form}
                                            </label>
                                            <div className="row">
                                                <input name="is_upload" checked={props.isUpload == true ? true : null} disabled={props.isDisabled} class="messageCheckbox" value={uploadTugas == null ? false : uploadTugas} onClick={() => { getClick(this?.value) }} style={{ marginTop: '2.5px' }} className="ml-3 mb-4" type="checkbox" />
                                                <p className="ml-2 lh-2">Upload Jawaban Tugas</p>
                                            </div>
                                        </>
                                        : null}

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Embed {props.form}
                                                </label>
                                                <textarea
                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                    rows="3"
                                                    placeholder=""
                                                    name="embed_materi"
                                                    id="iframe"
                                                    required
                                                    defaultValue={props.embed}
                                                    disabled={props.isDisabled}
                                                ></textarea>
                                                <div className="mt--1 d-flex">
                                                    {/* <RequiredTooltip /> */}
                                                    <p className="text-red">*</p>
                                                    <p className="ml-1 mt-0 font-xssss">Embed {props.form} diperoleh dari menu LMS</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* id untuk materi */}
                                        <input type="hidden" name="id_content_wp" />

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Keterangan
                                                </label>
                                                <textarea
                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                    rows="5"
                                                    placeholder="Isi Keterangan..."
                                                    name="keterangan"
                                                    required
                                                    defaultValue={props.keterangan}
                                                    disabled={props.descDisabled}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <input type="hidden" name="kompetensi" value={idKom} />

                                    <div className="row">
                                        <div className="col-lg-5 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kompetensi
                                                </label>
                                                <Select
                                                    className="pt-1 pb-1"
                                                    name="kompetensi"
                                                    size="large"
                                                    mode={uploadTugas == true ? "multiple" : ''}
                                                    allowClear
                                                    style={{ width: '100%', borderRadius: '0.25rem', color: '#495057', }}
                                                    placeholder="Pilih Kompotensi"
                                                    // onChange={props.GetIdJam}
                                                    onChange={handleChange}
                                                    disabled={props.isDisabled}
                                                >
                                                    {kompetensi.map((data, i) => {
                                                        return (
                                                            <Option value={data.id_kompetensi} key={data.id_kompetensi}
                                                            // selected={data.id != idProv ? false : true}
                                                            >
                                                                {data.competence_desc}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                                {/* <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kompetensi"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        setIdKompetensi(event.currentTarget.value)
                                                    }}
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Kompetensi
                                                    </option>
                                                    {kompetensi.map((data, i) => {
                                                        return (
                                                            <option value={data.id_kompetensi}
                                                            // selected={data.id != idKecamatan ? false : true} key={i}
                                                            >
                                                                {data.competence_desc}
                                                            </option>
                                                        )
                                                    })}
                                                </select> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {!disabledButton ? <div className="col-lg-12">
                                            {/* <button
                                                className="bg-tumblr border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                type="submit"
                                            >
                                                Draft
                                            </button> */}
                                            <button
                                                className="ml-2 bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
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