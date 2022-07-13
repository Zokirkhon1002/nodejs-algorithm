import React, { useEffect } from "react";
import axios from "axios";
import CreateProducts from "../../components/createProduct/CreateProducts";
import GetProduct from "../../components/getProduct/GetProduct";

const Home = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((i) => console.log("ok"))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <CreateProducts />
      <GetProduct />
    </div>
  );
};

export default Home;
