import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print"
import ERapor from "../../components/pdf/ERapor";

export default function TestPdf() {

    let componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
      });

    return (
        <>
            <div>
                <ERapor ref={componentRef} />
                <button onClick={handlePrint} className="btn btn-primary">Print to PDF!</button>
                {/* <ReactToPrint
                    trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
                    content={() => componentRef}
                /> */}
            </div>
        </>
    );
}