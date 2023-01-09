import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class Header extends Component {
  state = {
    isOpen: false,
  };
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const navClass = `${this.state.isOpen ? ' show' : ''}`;
    const { divClass, color = 'light' } = this.props;
    let colorClass;
    if (color === 'dark') {
      colorClass = 'text-white';
    }
    return (
        <div className={`header-wrapper pt-2 pb-2 shadow-xss ${divClass}`}>
          <div className="container">
            <div className="row">
              <div className="navbar col-lg-12 row pt-0 pb-0">
                <div className=''>
                  <Link to="/" className=''>
                    <img className='w125' src={`assets/images/logo/logo_pelindo_anper_bb.png`} alt="edii logo"></img>
                  </Link>
                  <Link to="/" className='ml-5'>
                    <img className='w125' src={`assets/images/logo/aneta.png`} alt="aneta logo"></img>
                  </Link>
                </div>
                {/* <button className="navbar-toggler" onClick={this.toggleOpen}>
                <span className="navbar-toggler-icon"></span>
              </button> */}
                <div
                    className={`collapse navbar-collapse ${navClass}`}
                    id="navbarNavDropdown"
                >
                  <Navbar
                      expand="lg"
                      className="dropdown-navbar slide-navmenu nav-menu py-0"
                  >
                    <Navbar id="basic-navbar-nav" className="w-100 d-block">
                      <Nav className={`mt-2 ${colorClass}`}>
                        <a className="mr-5 navbar-feature">
                          Tentang Kami
                        </a>
                        {/* <NavDropdown.Item className="mr-3 navbar-feature" href="/contact">
                        Tentang Kami
                      </NavDropdown.Item> */}
                        {/* <NavDropdown title="Home" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/home-2">
                          Home One
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-3">
                          Home Two
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-4">
                          Home Three
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-5">
                          Home Four
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-6">
                          Home Five
                        </NavDropdown.Item>
                      </NavDropdown> */}
                        <a className="mr-4 navbar-feature">
                          Fitur
                        </a>
                        {/* <NavDropdown.Item className="mr-3 navbar-feature" href="/contact">
                        Fitur
                      </NavDropdown.Item> */}
                        {/* <NavDropdown title="Pages" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/about">About</NavDropdown.Item>
                        <NavDropdown.Item href="/contact">
                          Contact
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/contact-2">
                          Contact 2
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/notfound">
                          404
                        </NavDropdown.Item>
                      </NavDropdown> */}
                        {/*<a className="mr-5 navbar-feature">*/}
                        {/*  Cara Pendaftaran*/}
                        {/*</a>*/}
                         <NavDropdown title="Download" id="basic-nav-dropdown">
                        <NavDropdown.Item target="_blank" href="https://drive.google.com/file/d/1hdT4WNztwtZzVc1B4xxt8Mv7VXY8Kt7z/view?usp=share_link">
                          User Manual Admin
                        </NavDropdown.Item>
                        <NavDropdown.Item target="_blank" href="https://drive.google.com/file/d/1RI6Dl3R01wrRG0StypKTEynJWf2JRW4T/view?usp=share_link">
                          User Manual Guru
                        </NavDropdown.Item>
                        <NavDropdown.Item target="_blank" href="https://drive.google.com/file/d/1nspzTQC4YAA3etX7hrp68rM4x-0xNjD_/view?usp=share_link">
                          User Manual Siswa
                        </NavDropdown.Item>
                      </NavDropdown>
                        <a className="mr-5 ml-4 pr-5 navbar-feature">
                          Bantuan
                        </a>
                        {/* <NavDropdown.Item className="mr-3 navbar-feature" href="/contact">
                        Bantuan
                      </NavDropdown.Item> */}
                        {/* <NavDropdown title="Courses" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/courses-grid-1">
                          Course Gird 1
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/courses-grid-2">
                          Course Gird 2
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/courses-grid-3">
                          Course Gird 3
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/course-details">
                          Single Course 1
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/course-details-2">
                          Single Course 2
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/user-profile">
                          User Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/author-profile">
                          Author Profile
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown.Item href="/contact">
                        Contact
                      </NavDropdown.Item> */}
                        {/* <div className='mr-5 w125'>

                      </div> */}

                        <div className="mr-0 d-flex align-items-center">
                          <Link
                              to="/login"
                              className={`text-center text-grey-800`}
                          >
                            <button className=" btn-login btn-login:hover rounded-pill px-4 py-1">
                              Login
                            </button>
                          </Link>
                          <Link
                              to="/register"
                              className={`text-center ml-3 text-grey-800`}
                          >
                            <button className="btn-register btn-register:hover rounded-pill px-3 py-1">
                              Register
                            </button>
                          </Link>
                        </div>
                      </Nav>
                    </Navbar>
                  </Navbar>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Header;
