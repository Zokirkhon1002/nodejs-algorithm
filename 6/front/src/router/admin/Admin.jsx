import React from "react";
import { useDispatch } from "react-redux";
import { SIGN_OUT_AUTH } from "../../context/action/actionTypes";
import { useHistory } from "react-router-dom";
import CreatePro from "../../components/create-product/CreateProduct";
import UploadFiles from "../../components/UploadFiles";



function Admin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const signOut = () => {
    dispatch({ type: SIGN_OUT_AUTH });
    history.push("/login/sign-in");
  };
  return (
    <div>
      <h1>Admin</h1>
      <button onClick={signOut}>Sign Out</button>
      <CreatePro />
      <UploadFiles />
    </div>
  );
}

export default Admin;
