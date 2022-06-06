import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footertwo extends Component {
  render() {
    return (
      <div className="footer-wrapper layer-after bg-dark mt-0">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-left">
              <h4 className="mb-4 text-grey-300 fw-300 font-xl open-font lh-3 d-inline-block">
                Get connected with us on social networks:
              </h4>
            </div>
            <div className="col-sm-6 text-left">
              <ul className="d-flex align-items-center mt-2 float-left xs-mb-2">
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-facebook">
                    <i className="font-xs ti-facebook text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-twiiter">
                    <i className="font-xs ti-twitter-alt text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-linkedin">
                    <i className="font-xs ti-linkedin text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-instagram">
                    <i className="font-xs ti-instagram text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-pinterest">
                    <i className="font-xs ti-pinterest text-white"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-5 offset-sm-1 text-right">
              <form className="mt-2">
                <input type="text" placeholder="Email" />
                <button>Submit</button>
              </form>
            </div>
            <div className="col-sm-12">
              <div className="middle-footer">
                <div className="row">
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6 sm-mb-4">
                    <h5 className="font-md strong mb-n3">Aneta</h5>
                    <ul>
                      <li className='mb-n3'>
                        <Link to="/">BACK TO SCHOOL</Link>
                      </li>
                      <li className='mb-n3'>
                        <Link to="/">&copy; 2022 - https://aneta.id/</Link>
                      </li>
                      <li className='mb-n3'>
                        <Link to="/">Privacy - Terms</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6 sm-mb-4">
                    <h5>Online</h5>
                    <ul>
                      <li>
                        <Link to="/">Web</Link>
                      </li>
                      <li>
                        <Link to="/">Series</Link>
                      </li>
                      <li>
                        <Link to="/">Natak</Link>
                      </li>
                      <li>
                        <Link to="/">Comedy</Link>
                      </li>
                      <li>
                        <Link to="/">Action</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6 sm-mb-4">
                    <h5>Language</h5>
                    <ul>
                      <li>
                        <Link to="/">English</Link>
                      </li>
                      <li>
                        <Link to="/">Spanish</Link>
                      </li>
                      <li>
                        <Link to="/">Arab</Link>
                      </li>
                      <li>
                        <Link to="/">Urdu</Link>
                      </li>
                      <li>
                        <Link to="/">Brazil</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6">
                    <h5>Channel</h5>
                    <ul>
                      <li>
                        <Link to="/">Makeup</Link>
                      </li>
                      <li>
                        <Link to="/">Dresses</Link>
                      </li>
                      <li>
                        <Link to="/">Girls</Link>
                      </li>
                      <li>
                        <Link to="/">Sandals</Link>
                      </li>
                      <li>
                        <Link to="/">Headphones</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6">
                    <h5>About</h5>
                    <ul>
                      <li>
                        <Link to="/">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/">Term of use</Link>
                      </li>
                      <li>
                        <Link to="/">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/">Feedback</Link>
                      </li>
                      <li>
                        <Link to="/">Careers</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6">
                    <h5 className="mb-3">Office</h5>
                    <div>
                      <div className='d-flex align-items-start'>
                        <i className='feather-map-pin text-warning mr-2 mt-2'></i>
                        <p className="w-100">
                          Wisma SMR, Jl.Yos Sudarso Kav.89 Jakarta Utara, Indonesia
                        </p>
                      </div>
                      <div className='d-flex align-items-start'>
                        <i className='feather-phone-call text-warning mr-2 mt-2'></i>
                        <p className="w-100">
                          +62 (21) 456 7890
                        </p>
                      </div>
                      <div className='d-flex align-items-start'>
                        <i className='feather-mail text-warning mr-2 mt-2'></i>
                        <p className="w-100">
                          hello@aneta.id
                        </p>
                      </div>
                      <div className='d-flex align-items-start'>
                        <i className='feather-inbox text-warning mr-2 mt-2'></i>
                        <p className="w-100">
                          +62 785 4578964
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 lower-footer"></div>
            <div className="col-sm-6">
              <p className="copyright-text">
                © 2021 copyright. All rights reserved.
              </p>
            </div>
            <div className="col-sm-6 text-right">
              <p className="float-right copyright-text">
                In case of any concern, <Link to="/contact">contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footertwo;
