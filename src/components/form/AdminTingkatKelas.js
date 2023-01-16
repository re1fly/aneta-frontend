import React from "react";

export const FormAdminTingkatKelas = (props) => {
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
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form onSubmit={props.submit}
                                    method="POST">

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tingkat Kelas
                                                </label>
                                                <input
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="tingkat_kelas"
                                                    defaultValue={props.tingkatKelas}
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                </input>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tingkat Sekolah
                                                </label>
                                                <input type="text"
                                                    name="tingkat_sekolah"
                                                    className="form-control"
                                                    defaultValue={props.tingkatSekolah}
                                                    required
                                                    disabled={props.isDisabled}
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
                                                className="ml-2 bg-lightblue border-0 text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
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