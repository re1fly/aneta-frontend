import React, { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom";

import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";


export default function DataMateriDetail() {
    const history = useHistory();
    const [pressed, setPressed] = useState(false);
    const checkSelected = () => {
        setPressed(!pressed)
    }

    const DropDown = () => {
        return (
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="ml-5">
                    <h5 className="mt-4 strong text-lg">1. Kompetensi 1</h5>
                    <h5 className="mt-4 strong text-lg">2. Kompetensi 2</h5>
                    <h5 className="mt-4 strong text-lg mb-4">3. Kompetensi 3</h5>
                </div>
            </div>
        )
    }


    const TimetableRenderer = () => {
        return (
            <>
                <div
                    className='cursor-pointer card-body p-4 w-100 bg-current border-0 d-flex justify-content-between rounded-lg'
                    onClick={() => checkSelected()}>
                    <h4 className="font-xs text-white fw-600 ml-3 mb-0 mt-2">
                        Kompetensi
                    </h4>
                    <i className='d-inline-block font-sm mt-2 ti-angle-down text-white'/>
                </div>
                {pressed ? <DropDown /> : null}
            </>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="middle">
                                    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                        <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                            <i onClick={() => history.goBack()} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                            <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                                Matematika - Bangun datar
                                            </h4>
                                        </div>
                                        <div className="card-body p-lg-5 p-4 w-100 border-0 mb-3">
                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <div className="d-flex justify-content-center">
                                                        <img
                                                            src={`assets/images/user.png`}
                                                            alt="icon"
                                                            className="w-25"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 bg-lightblue">
                                                    <h5 className="mt-3 strong text-lg">1. Lorem Ipsum dolor</h5>
                                                    <h5 className="lh-24 mt-2 mb-3">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                                        <br />
                                                    </h5>

                                                    <h5 className="mt-4 strong text-lg">2. Lorem Ipsum dolor</h5>
                                                    <h5 className="lh-24 mt-2 mb-3">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book. t has survived not only five centuries, but also the leap into electronic typesetting.
                                                        <br />
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <TimetableRenderer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}