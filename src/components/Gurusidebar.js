import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Adminsidebar extends Component {
    render() {
        var elements = document.querySelectorAll('.has-droupdown > a');
        for (var i in elements) {
            if (elements.hasOwnProperty(i)) {
                elements[i].onclick = function () {
                    this.parentElement
                        .querySelector('.submenu')
                        .classList.toggle('active');
                    this.classList.toggle('open');
                };
            }
        }
        return (
            <ul
                className="navbar-nav bg-white sidebar sidebar-dark scroll-bar"
                id="accordionSidebar"
            >
                <div
                    className="sidebar-brand d-flex align-items-start justify-content-start"
                    href="/admin"
                >
                    <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xl logo-text mb-0 text-capitalize lh-1">
                        Aneta.
                    </span>
                    <button className="ms-auto mt-2 d-lg-none" id="sidebarClose">
                        <i className="ti-close text-white font-sm text-grey-100 "></i>
                    </button>
                </div>

                <div className="sidebar-heading text-grey-500">Guru</div>

                <li className="nav-item">
                    <NavLink className="navi-link" to="/guru-beranda">
                        <i className="feather-home text-current text-current mr-2"></i>
                        <span className='text-grey-500'>Beranda</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="navi-link" to="/guru-data-materi">
                        <i className="feather-book text-current mr-2"></i>
                        <span className='text-grey-500'>Data Materi</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="navi-link" to="/notfound">
                        <i className="feather-file-text text-current mr-2"></i>
                        <span className='text-grey-500'>Data Tugas</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="navi-link" to="/notfound">
                        <i className="feather-calendar text-current mr-2"></i>
                        <span className='text-grey-500'>Jadwal Pelajaran</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="navi-link" to="/notfound">
                        <i className="feather-file-text text-current mr-2"></i>
                        <span className='text-grey-500'>Penilaian</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="navi-link" to="/notfound">
                        <i className="feather-clipboard text-current mr-2"></i>
                        <span className='text-grey-500'>Kompetensi</span>
                    </NavLink>
                </li>

            </ul>
        );
    }
}

export default Adminsidebar;
