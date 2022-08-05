// @ts-nocheck
import React, { useState } from "react";
import axios from "../api/axios";

function UploadFiles() {
  const [inpName, setName] = useState("");
  const [multipleFileChange, setMultipleFiles] = useState("");
  const [loader, setLoader] = useState(false);

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };
  const handleSubmit = async (e) => {
    setLoader(true);
    var formdata = new FormData();

    formdata.append("title", inpName);

    Array.from(multipleFileChange).forEach((i) => {
      formdata.append("image", i, i.name);
    });

    axios
      .post("/files", formdata)
      .then((result) => {
        console.log(result);
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <h1>uploadFiles</h1>
      <input
        value={inpName}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <input onChange={(e) => MultipleFileChange(e)} type="file" multiple />
      <button onClick={handleSubmit}>
        {loader ? "loading..." : "submit"}{" "}
      </button>
    </div>
  );
}

export default UploadFiles;
