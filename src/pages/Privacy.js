import React, {Component, Fragment} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Card} from "antd";

class PrivacyPolicy extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <div className="post-title page-nav pt-lg--7 pt-lg--7 pt-5 pb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h1 className="mb-2 lh-2 display1-size display1-md-size mont-font text-grey-900 fw-700">
                                    Privacy Policy
                                </h1>
                                <hr/>
                                <h2 className="mont-font text-grey-900 fw-700">AnetaApp</h2>
                                <h3 className="mont-font fw-700 text-primary mb-5">PT. Electronic Data Interchange
                                    Indonesia</h3>
                                <div className="text-left mb-5">
                                    <ol className="mont-font fw-600 text-grey-600 lh-34">
                                        <li>1. PT. EDII built the AnetaApp app as a lisenced app. This SERVICE is provided
                                            by PT. EDII at cost and is intended for use as is.
                                        </li>
                                        <li>2. AnetaApp is used by external or public users.</li>
                                        <li>3. This page is used to inform visitors regarding our policies with the
                                            collection, use, and disclosure of Personal Information if anyone decided to
                                            use our Service.
                                        </li>
                                        <li>4. If you choose to use our Service, then you agree to the collection and use
                                            of information in relation to this policy. The Personal Information that we
                                            collect is used for providing and improving the Service. We will not use or
                                            share your information with anyone except as described in this Privacy
                                            Policy
                                        </li>
                                        <li>5. The terms used in this Privacy Policy have the same meanings as in our Terms
                                            and Conditions, which is accessible at AnetaApp unless otherwise defined in
                                            this Privacy Policy.
                                        </li>
                                    </ol>
                                </div>
                                <h4 className="mont-font fw-700 text-grey-600 pt-4 mt-5 mb-3">Regards, Administrator AnetaApp</h4>
                                <p className="font-xss">PT. Electronic Data Interchange Indonesia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PrivacyPolicy;
