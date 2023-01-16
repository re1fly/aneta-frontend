import { Card, Tooltip } from "antd";
import { useState } from "react";

function UploadImage(props) {
  const [image, setImage] = useState("assets/images/user.png");
  const [imageUpload, setImageUpload] = useState("");
  // console.log(image);

  const handleUploadChange = async (e) => {
    console.log("test", e);
    let uploaded = e.target.files[0];
    const base64 = await convertBase64(uploaded);
    console.log(base64);
    setImage(base64);
    setImageUpload(base64.split(",")[1]);
  };

  const convertBase64 = (uploaded) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploaded);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <Card
      className="bg-lightblue"
      style={{ width: 200, height: 200 }}
      bodyStyle={{ padding: 0 }}
    >
      <label>
        <Tooltip title="Click to Edit Image" color="blue">
          <div className="mb-2 d-flex justify-content-center">
            <img
              src={
                props.imageUrl == null
                  ? image
                  : props.imageUrl == "http://10.1.6.109/storage/null"
                  ? image
                  : image != "assets/images/user.png"
                  ? image
                  : props.imageUrl
              }
              style={{ width: "200px", height: "200px", cursor: "pointer" }}
              alt="..."
            />
          </div>
          <input
            name="image_base64"
            type="hidden"
            defaultValue={
              props.imageUrl == null
                ? imageUpload
                : imageUpload != ""
                ? imageUpload
                : props.imageUrl
            }
          />
          <div className="d-flex justify-content-center">
            <input
              onChange={handleUploadChange}
              name="image_guru"
              className="w100"
              type="file"
              id="formFile"
              accept="image/*"
              disabled={props.isDisabled}
              style={{ display: "none" }}
            />
          </div>
        </Tooltip>
      </label>
    </Card>
  );
}

export default UploadImage;
