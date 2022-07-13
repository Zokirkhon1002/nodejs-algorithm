// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";

const CreateProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const createProduct = (e) => {
    e.preventDefault();
    let newProduct = {
      title,
      price,
      url,
      category,
    };

    axios
      .post("http://localhost:5000/products", newProduct)
      .then((res) => {
        setData(res.data);
        setTitle("");
        setPrice("");
        setCategory("");
        setUrl("");
      })
      .catch(({ response }) => setData(response.data));
  };

  if (data) {
    console.log(data);
  }


  return (
    <div>
      <h1>CreateProducts</h1>
      <h2 style={{ backgroundColor: data && data.state ? "green" : "red" }}>
        {data && data.msg}
      </h2>
      <form onSubmit={createProduct}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          type="text"
          placeholder="title..."
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          type="text"
          placeholder="price..."
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name="url"
          type="text"
          placeholder="url..."
        />
        <select
          name=""
          id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" id="phone">
            Select Category
          </option>
          <option value="phone" id="phone">
            phone
          </option>
          <option value="laptop" id="laptop">
            laptop
          </option>
          <option value="television" id="tv">
            television
          </option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateProducts;
