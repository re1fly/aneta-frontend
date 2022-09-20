import React, { Component } from 'react';
import Darkbutton from '../components/Darkbutton';
import Sidebartoggle from '../components/Sidebartoggle';

class AdminTopnav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow-xs ">
        <Sidebartoggle />

        <div className="form-group mb-0 icon-input d-none d-lg-block ml-auto mr-2">
          <i className="feather-search font-sm text-grey-400"></i>
          <input
            type="text"
            placeholder="Start typing to search.."
            className="lh-38 pt-2 pb-2 pl-5 pr-3 font-xssss fw-500 rounded-xl posr"
          />
        </div>

        <ul className="navbar-nav">
          <li className="nav-item dropdown no-arrow d-sm-none">

            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="feather-search text-current"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="navi-link dropdown-toggle"
              href="/"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="feather-bell font-xl text-current"></i>

            </a>
          </li>

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="navi-link dropdown-toggle"
              href="/"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="feather-message-square font-xl text-current"></i>

            </a>
          </li>

          <Darkbutton />

          
        </ul>
      </nav>
    );
  }
}

export default AdminTopnav;
