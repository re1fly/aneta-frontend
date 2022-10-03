import React, { Fragment, useState } from "react";
import Adminfooter from "../../../components/Adminfooter";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Menu,
  message,
  notification,
  PageHeader,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Upload,
  Select,
} from "antd";
import Link from "react-router-dom/es/Link";
import {
  AppstoreOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  MenuOutlined,
  EyeOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { NavLink } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Search from "antd/es/input/Search";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";

import Gurusidebar from "../../../components/Gurusidebar";
import GuruTopnav from "../../../components/GuruTopnav";

function GuruCreateMateri() {
  return (
    <Fragment>
      <div id="wrapper">
        {/* <Navheader /> */}
        <Gurusidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* <Appheader /> */}
            <GuruTopnav />
            {/* <iframe src="http://www.google.com/search?igu=1" width="100%" height="1000px"></iframe> */}
            {/* <iframe
              src="http://localhost/h5p/wp-admin/admin.php?page=h5p"
              width="100%"
              height="1000px"
            ></iframe> */}
            {/* <iframe src="https://ikhlas-travel.site/ikhlas/sample-page/" width="100%" height="1000px"></iframe> */}
            {/* <iframe src="https://project-aneta.vercel.app/" width="100%" height="1000px"></iframe> */}
            <iframe
              src="https://lms.aneta.id/dashboard"
              width="100%"
              height="1000px"
              title="Create Materi"
            ></iframe>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GuruCreateMateri;
