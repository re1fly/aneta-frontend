import { Button } from "antd";
import { useState } from "react";

function Filter(props) {

    const {title1, title2}=props
    const [input, setInput] = useState(false);
    const dataInput = () => {
        setInput(!input)
    }
    
    return (
        <>
            <Button onClick={dataInput} className="mr-4" type="primary" shape="round" size='middle'>Filter</Button>
            { input && (
            <div className="d-flex mb-0 pb-0">
                <div className="mt-3">
                    <h5 className="fw-600 mb-1">
                        {title1}
                    </h5>
                    <input
                    type="text"
                    className="form-control w-100"
                    />
                </div>
                <div className="mt-3 ml-3">
                    <h5 className="fw-600 mb-1">
                        {title2}
                    </h5>
                    <input
                    type="text"
                    className="form-control w-100"
                    />
                </div>
            </div>
            )}
        </>
    );
};

export default Filter;