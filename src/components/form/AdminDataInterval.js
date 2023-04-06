import React, {useState} from "react";

export const FormAdminDataInterval = (props) => {

    const [aMin, setAMin] = useState(props.nilai_a_min);
    const [aMax, setAMax] = useState(props.nilai_a_max);
    const [bMin, setBMin] = useState(props.nilai_b_min);
    const [bMax, setBMax] = useState(props.nilai_b_max);
    const [cMin, setCMin] = useState(props.nilai_c_min);
    const [cMax, setCMax] = useState(props.nilai_c_max);
    const [dMin, setDMin] = useState(props.nilai_d_min);
    const [dMax, setDMax] = useState(props.nilai_d_max);

    const checkValidation = () => {
        if (bMin > bMax) { //B min
            document.getElementById('b_min_error').innerHTML = "Nilai harus lebih kecil dari nilai B Maksimal"
        }if( bMin < bMax){
            document.getElementById('b_min_error').innerHTML = ""
        }

        if (cMax < cMin) { //C max
            document.getElementById('c_max_error').innerHTML = "Silahkan masukkan Nilai B min & C min dengan benar"
        }
        if( cMax > cMin){
            document.getElementById('c_max_error').innerHTML = ""
        }

        if (cMin > cMax && cMin > aMin) { //C min
            document.getElementById('c_min_error').innerHTML = "Nilai harus lebih kecil dari nilai C Maksimal"
        }
        if( cMin < cMax && cMin < aMin){
            document.getElementById('c_min_error').innerHTML = ""
        }

        if (dMax == dMin && dMax == cMax) { //D max
            document.getElementById('d_max_error').innerHTML = "Silahkan masukkan Nilai C min dengan benar"
        }
        if( dMax < cMin && dMax < cMax){
            document.getElementById('d_max_error').innerHTML = ""
        }

        if (dMin > dMax) { //D min
            document.getElementById('d_min_error').innerHTML = "Nilai Predikat diatas harus benar"
        }
        if( dMin < dMax){
            document.getElementById('d_min_error').innerHTML = ""
        }

    }


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
                                                           id="nilai_a_min"
                                                           className="form-control"
                                                           defaultValue={props.nilai_a_min}
                                                           onKeyUp={(e) => {
                                                               setAMin(e.target.value)
                                                               setBMax(e.target.value - 1)
                                                               setCMax(bMax - 1)
                                                               setDMax(0)
                                                               checkValidation()
                                                           }}
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
                                                           onKeyUp={(e) => {
                                                               if (e.target.value > bMax) {
                                                                   setBMin(e.target.value = bMax - 1);
                                                               }
                                                               setBMin(e.target.value)
                                                               setCMax(e.target.value - 1)
                                                               checkValidation()
                                                           }}
                                                           required
                                                    />
                                                    <span id="b_min_error" style={{color: 'red'}}></span>
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
                                                           value={bMax}
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
                                                           onKeyUp={(e) => {
                                                               if (e.target.value > cMax) {
                                                                   setCMin(e.target.value = cMax - 1);
                                                               }
                                                               setCMin(e.target.value)
                                                               setDMax(e.target.value - 1)
                                                               checkValidation()
                                                           }}
                                                    />
                                                    <span id="c_min_error" style={{color: 'red'}}></span>
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
                                                           value={cMax}
                                                    />
                                                    <span id="c_max_error" style={{color: 'red'}}></span>
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
                                                           onKeyUp={(e) => {
                                                               if (e.target.value > dMax) {
                                                                   setDMin(e.target.value = dMax - 1);
                                                               }
                                                               setDMin(e.target.value)
                                                               checkValidation()
                                                           }}
                                                           disabled
                                                    />
                                                    <span id="d_min_error" style={{color: 'red'}}></span>
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
                                                           value={cMin-1}
                                                    />
                                                    <span id="d_max_error" style={{color: 'red'}}></span>
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