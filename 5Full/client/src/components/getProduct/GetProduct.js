// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";

const GetProduct = () => {
  const [data, setData] = useState({});
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (category === "all") {
      axios
        .get("http://localhost:5000/products")
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get(`http://localhost:5000/products/category/${category}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [category]);

  console.log(data);

  return (
    <div>
      <h2 style={{ backgroundColor: data && data.state ? "green" : "red" }}>
        {data && data?.msg}
      </h2>
      <select onChange={(e) => setCategory(e.target.value)} name="" id="">
        <option value="all">All</option>
        <option value="phone">Phone</option>
        <option value="laptop">Laptop</option>
        <option value="television">Television</option>
      </select>
      {data &&
        data.state &&
        data.data.map((item, idx) => (
          <div key={idx} style={{ margin: "10px" }}>
            <h1>name: {item.title}</h1>
            <p>price: {item.price}</p>
            <p>category: {item.category}</p>
            {item.url?.map((l, i) => (
              <img key={i} src={l} alt={item.title} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default GetProduct;
