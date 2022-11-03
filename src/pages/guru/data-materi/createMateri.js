import React, { Fragment } from 'react';
import Adminfooter from "../../../components/Adminfooter";

import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

import Gurusidebar from "../../../components/Gurusidebar";
import GuruTopnav from "../../../components/GuruTopnav";

function GuruCreateMateri() {

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {/* <iframe src="https://lms.aneta.id:8443/dashboard" width="100%" height="1000px"></iframe> */}
                    {/* <iframe src="http://localhost:8080/wordpress/wp-admin/admin.php?page=h5p" width="100%" height="1000px"></iframe> */}
                    <iframe src="https://lms.aneta.id:8443/wp-admin/admin.php?page=h5p" width="100%" style={{ minHeight: '600px' }}></iframe>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
        // <Fragment>
        //     <div id="wrapper">
        //         <Gurusidebar />
        //         <div id="content-wrapper" className="d-flex flex-column">
        //             <div id="content">
        //                 <GuruTopnav />
        //                 {/* <iframe src="http://localhost:8080/wordpress/wp-admin/admin.php?page=h5p" width="100%" height="1000px"></iframe> */}
        //                 {/* <iframe src="http://localhost:8080/wp-aneta/wp-admin/admin.php?page=h5p" width="100%" height="1000px"></iframe> */}
        //                 <iframe src="https://lms.aneta.id:8443/dashboard" width="100%" height="1000px"></iframe>
        //             </div>
        //         </div>
        //     </div>
        // </Fragment>
    );
}

export default GuruCreateMateri;