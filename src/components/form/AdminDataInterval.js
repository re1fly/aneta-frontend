import React from "react";

export const FormAdminDataInterval = (props) => {
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
                                    <h4>Predikat A</h4>
                                    <div className="row mt-3">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Min</div>
                                                    </div>

                                                    <input type="number"
                                                           name="nilai_a_min"
                                                           className="form-control"
                                                           defaultValue={props.nilai_a_min}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Max</div>
                                                    </div>
                                                    <input type="number"
                                                           name="nilai_a_max"
                                                           className="form-control"
                                                           defaultValue={props.nilai_a_max}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4>Predikat B</h4>
                                    <div className="row mt-3">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Min</div>
                                                    </div>
                                                    <input type="number"
                                                           name="nilai_b_min"
                                                           className="form-control"
                                                           defaultValue={props.nilai_b_min}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Max</div>
                                                    </div>
                                                    <input type="number"
                                                           name="nilai_b_max"
                                                           className="form-control"
                                                           defaultValue={props.nilai_b_max}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4>Predikat C</h4>
                                    <div className="row mt-3">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Min</div>
                                                    </div>
                                                    <input type="number"
                                                           name="nilai_c_min"
                                                           className="form-control"
                                                           defaultValue={props.nilai_c_min}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Max</div>
                                                    </div>
                                                    <input type="number"
                                                           name="nilai_c_max"
                                                           className="form-control"
                                                           defaultValue={props.nilai_c_max}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4>Predikat D</h4>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Min</div>
                                                    </div>
                                                    <input type="number"
                                                           name="nilai_d_min"
                                                           className="form-control"
                                                           defaultValue={props.nilai_d_min}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">Max</div>
                                                    </div>
                                                    <input type="number"
                                                           name="nilai_d_max"
                                                           className="form-control"
                                                           defaultValue={props.nilai_d_max}
                                                           required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-lg-12">
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
                                        </div>
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