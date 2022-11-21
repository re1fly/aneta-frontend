import React, {Component, Fragment} from 'react';
import Header from '../components/Header';
import Upperheader from '../components/Upperheader';
import Footer from '../components/Footer';
import Footertwo from "../components/Footertwo";

class Verification extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <div className="vertical-wrapper pt-lg--10 pt-5 pb-lg--10 pb-5 vh100">
                    <div className="container mt-5 pt-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-8 text-center default-page">
                                <div className="card border-0 text-center d-block">
                                    <h1 className="fw-700 text-grey-900 display2-size">
                                       Anda belum bisa menggunakan Fitur Aneta
                                    </h1>
                                    <p className="font-xss">
                                        Mohon menunggu verifikasi dari Admin, jika terlalu lama harap hubungi admin.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footertwo/>
            </Fragment>
        );
    }
}

export default Verification;
