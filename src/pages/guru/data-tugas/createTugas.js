import React, { Fragment } from 'react';
import Adminfooter from "../../../components/Adminfooter";

import { NavLink } from 'react-router-dom';

import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

import Gurusidebar from "../../../components/Gurusidebar";
import GuruTopnav from "../../../components/GuruTopnav";

function GuruCreateTugas() {

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {/* <iframe src="https://lms.aneta.id:8443/dashboard" width="100%" height="1000px"></iframe> */}
                    <iframe src="http://localhost:8080/wordpress/wp-admin/admin.php?page=h5p" width="100%" style={{ minHeight: '600px' }}></iframe>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}

export default GuruCreateTugas;