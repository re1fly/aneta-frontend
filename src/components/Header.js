import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

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
            <div className="col-lg-12 navbar pt-0 pb-0">
              <Link to="/" className=''>
                <img className='w125' src="https://aneta.id/assets/img/aneta.png" alt="aneta logo"></img>
              </Link>
              <button className="navbar-toggler" onClick={this.toggleOpen}>
                <span className="navbar-toggler-icon"></span>
              </button>
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
                      <a className="mr-5 navbar-feature">
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
                      <a className="mr-5 navbar-feature">
                        Cara Pendaftaran
                      </a>
                      {/* <NavDropdown.Item className="mr-3 navbar-feature" href="/contact">
                        Cara Pendaftaran
                      </NavDropdown.Item> */}
                      {/* <NavDropdown title="Blog" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/blog">Blog</NavDropdown.Item>
                        <NavDropdown.Item href="/blog-sidebar">
                          Blog Sidebar
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/blog-single">
                          Blog Single
                        </NavDropdown.Item>
                      </NavDropdown> */}
                      <a className="mr-5 pr-5 navbar-feature">
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
                      <div className='mr-5 w125'>

                      </div>
                      
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
