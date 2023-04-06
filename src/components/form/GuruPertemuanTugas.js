import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker, Select} from "antd";
import {
    GetKompetensi,
    GetMateri,
    GetTanggalPertemuan,
    GetTanggalPertemuanTugas,
    GetTugas,
    GetWaktuPertemuan,
    GetWaktuPertemuanTugas
} from "../../redux/Action";

export const FormCreatePertemuanTugas = (props) => {

    const dispatch = useDispatch();
    const dataPertemuanTugas = useSelector(state => state.pertemuanTugas);
    const dataClassMateri = useSelector((state) => state.classMateri);
    const {RangePicker} = DatePicker;

    const kompetensi = dataClassMateri?.DataKompetensi;

    const tugas = dataPertemuanTugas?.DataTugas
    const tanggal = dataPertemuanTugas?.DataTanggal
    const jam = dataPertemuanTugas?.DataJam

    const [idTugas, setIdTugas] = useState('');
    const [idPelajaran, setIdPelajaran] = useState('');
    const [idTanggal, setIdTanggal] = useState('');
    const [idJam, setIdJam] = useState([]);
    const [uploadTugas, setUploadTugas] = useState(false);
    const [idKom, setIdKom] = useState([]);
    const [tanggalPertemuan, setTanggalPertemuan]= useState({
        mulai: null,
        selesai: null
    })

    const getValue = (value) => {
        setIdTugas(value.split(",")[0])
        setIdPelajaran(value.split(",")[1])
        console.log(value.split(",")[0]);
        console.log(value.split(",")[1]);
    }

    const getClick = () => {
        let checkedValue = document.querySelector("input[type=checkbox]");
        // console.log(checkedValue.checked);
        setUploadTugas(checkedValue?.checked);
    };

    const handleChangeKompetensi = (id, e) => {
        setIdKom(id)
    };

    useEffect(() => {
        dispatch(GetTugas());
        if (idTugas != '') {
            dispatch(GetTanggalPertemuanTugas(idTugas));
        }
        if (idPelajaran != '') {
            dispatch(GetKompetensi(idPelajaran));
        }
        if (idTanggal != '') {
            dispatch(GetWaktuPertemuanTugas(idTanggal));
        }
    }, [idTugas, idTanggal])

    const {Option} = Select;
    const children = [];

    children.push(
        <Option key="1">08:00 - 09:00</Option>,
        <Option key="2">09:00 - 10:00</Option>,
        <Option key="3">10:00 - 11:00</Option>,
        <Option key="3">13:00 - 14:00</Option>,
    );

    const handleChange = (id, e) => {
        setIdJam(id)
        localStorage.setItem("idJam", [id]);
    };

    const onChangeDate = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setTanggalPertemuan({
            mulai: dateString[0],
            selesai: dateString[1]
        })
    };
    const onOkDate = (value) => {
        console.log('onOk: ', value);
    };

    let disabledButton = props.disabledButton;
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
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form id="teacher_form"
                                      onSubmit={props.submit}
                                      method="POST">

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Tugas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_materi"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        if (idTugas != '') {
                                                            if (event.currentTarget.value != idTugas) {
                                                                dispatch({type: "SET_MATERITANGGAL", value: []});
                                                                dispatch({type: "SET_MATERIJAM", value: []});
                                                                setIdTanggal('');
                                                                setIdJam('');
                                                            }
                                                        }
                                                        // setIdTugas(event.currentTarget.value);
                                                        getValue(event.currentTarget.value)

                                                    }}
                                                >
                                                    <option value="">
                                                        {props.namaMateri == undefined ? "Pilih Tugas" : props.namaMateri}
                                                    </option>
                                                    {tugas.map((data, i) => {
                                                        return (
                                                            <option value={`${data.id},${data.subjects_master_id}`}
                                                                // selected={data.id != idProv ? false : true}
                                                            >
                                                                {`${data.class_type}/${data.sub_class} - ${data.nama_mata} - ${data.tittle} `}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Pertemuan
                                                </label>
                                                <input
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_pertemuan"
                                                    disabled={props.titleDisable}
                                                    defaultValue={props.namaPertemuan}
                                                    required
                                                >
                                                </input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss">
                                                Tanggal & Jam Pertemuan
                                            </label>
                                            <div className="form-group">
                                                <RangePicker
                                                    showTime={{
                                                        format: 'HH:mm',
                                                    }}
                                                    format="YYYY-MM-DD HH:mm"
                                                    onChange={onChangeDate}
                                                    onOk={onOkDate}
                                                    size="large"
                                                    style={{width: '100%'}}
                                                    disabled={props.isDisabled}
                                                />
                                                <input
                                                    className="form-control"
                                                    type='hidden'
                                                    name='tanggal_mulai'
                                                    aria-label="Default select example"
                                                    value={tanggalPertemuan.mulai}
                                                    required
                                                >
                                                </input>
                                                    <input
                                                        className="form-control"
                                                        type='hidden'
                                                        name='tanggal_selesai'
                                                        aria-label="Default select example"
                                                        value={tanggalPertemuan.selesai}
                                                        required
                                                    >
                                                </input>
                                                <input type="hidden" name="jam_pertemuan" value={idJam} />
                                                <input type="hidden" name="id_kompetensi" value={idKom} />
                                            </div>
                                        </div>
                                    </div>


                                    {/*<div className="row">*/}
                                    {/*    <div className="col-lg-6 mb-3">*/}
                                    {/*        <div className="form-group">*/}
                                    {/*            <label className="mont-font fw-600 font-xsss">*/}
                                    {/*                Tanggal Pertemuan*/}
                                    {/*            </label>*/}
                                    {/*            <select*/}
                                    {/*                className="form-control"*/}
                                    {/*                aria-label="Default select example"*/}
                                    {/*                name="tanggal_pertemuan"*/}
                                    {/*                required*/}
                                    {/*                disabled={props.isDisabled}*/}
                                    {/*                onChange={(event) => {*/}
                                    {/*                    if (idTanggal != '') {*/}
                                    {/*                        if (event.currentTarget.value != idTanggal) {*/}
                                    {/*                            dispatch({type: "SET_MATERIJAM", value: []});*/}
                                    {/*                            setIdJam('');*/}
                                    {/*                        }*/}
                                    {/*                    }*/}
                                    {/*                    setIdTanggal(event.currentTarget.value);*/}
                                    {/*                }}*/}
                                    {/*            >*/}
                                    {/*                <option value="">*/}
                                    {/*                    {props.tanggalPertemuan == undefined ? "Pilih Tanggal" : props.tanggalPertemuan}*/}
                                    {/*                </option>*/}
                                    {/*                {tanggal.map((data, i) => {*/}
                                    {/*                    return (*/}
                                    {/*                        <option value={data.id}*/}
                                    {/*                            // selected={data.id != idProv ? false : true}*/}
                                    {/*                        >*/}
                                    {/*                            {data.date}*/}
                                    {/*                        </option>*/}
                                    {/*                    )*/}
                                    {/*                })}*/}
                                    {/*            </select>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}

                                    {/*    <input type="hidden" name="jam_pertemuan" value={idJam}/>*/}
                                    {/*    <input type="hidden" name="id_kompetensi" value={idKom}/>*/}

                                    {/*    <div className="col-lg-6 mb-3">*/}
                                    {/*        <div className="form-group">*/}
                                    {/*            <label className="mont-font fw-600 font-xsss">*/}
                                    {/*                Jam*/}
                                    {/*            </label>*/}
                                    {/*            <Select*/}
                                    {/*                className="pt-1 pb-1"*/}
                                    {/*                name="jam_pertemuan"*/}
                                    {/*                size="large"*/}
                                    {/*                mode="multiple"*/}
                                    {/*                allowClear*/}
                                    {/*                style={{width: '100%', borderRadius: '0.25rem', color: '#495057',}}*/}
                                    {/*                placeholder={props.jam == undefined ? "Pilih Jam" : props.jam}*/}
                                    {/*                // onChange={props.GetIdJam}*/}
                                    {/*                onChange={handleChange}*/}
                                    {/*                disabled={props.isDisabled}*/}
                                    {/*            >*/}
                                    {/*                {jam.map((data, i) => {*/}
                                    {/*                    return (*/}
                                    {/*                        <Option value={data.id} key={data.id}*/}
                                    {/*                            // selected={data.id != idProv ? false : true}*/}
                                    {/*                        >*/}
                                    {/*                            {`${data.time_start} - ${data.time_end}`}*/}
                                    {/*                        </Option>*/}
                                    {/*                    )*/}
                                    {/*                })}*/}
                                    {/*            </Select>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {props.form == "Tugas" ? (
                                        <>
                                            <label className="mont-font fw-600 font-xsss">
                                                Metode Mengerim Jawaban {props.form}
                                            </label>
                                            <div className="row">
                                                <input
                                                    name="is_upload"
                                                    checked={props.isUpload == true ? true : null}
                                                    disabled={props.isDisabled}
                                                    class="messageCheckbox"
                                                    value={uploadTugas == null ? false : uploadTugas}
                                                    onClick={() => {
                                                        getClick(this?.value);
                                                    }}
                                                    style={{marginTop: "2.5px"}}
                                                    className="ml-3 mb-4"
                                                    type="checkbox"
                                                />
                                                <p className="ml-2 lh-2">Upload Jawaban Tugas</p>
                                            </div>
                                        </>
                                    ) : null}
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
                                                    <p className="ml-1 mt-0 font-xssss">
                                                        Embed {props.form} diperoleh dari menu LMS
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-5 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kompetensi
                                                </label>
                                                <Select
                                                    className="pt-1 pb-1"
                                                    name="kompetensi"
                                                    size="large"
                                                    mode="multiple"
                                                    allowClear
                                                    style={{
                                                        width: "100%",
                                                        borderRadius: "0.25rem",
                                                        color: "#495057",
                                                    }}
                                                    placeholder="Pilih Kompetensi"
                                                    onChange={handleChangeKompetensi}
                                                    disabled={props.isDisabled}
                                                >
                                                    {kompetensi?.map((data, i) => {
                                                        return (
                                                            <Option
                                                                value={data.id_kompetensi}
                                                                key={data.id_kompetensi}
                                                                // selected={data.id != idProv ? false : true}
                                                            >
                                                                {data.competence_desc}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {!disabledButton ? <div className="col-lg-12">
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