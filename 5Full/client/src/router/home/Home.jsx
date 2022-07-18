// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  // get Products
  const [data2, setData2] = useState({});
  const [temp, setTemp] = useState(true);
  const [category2, setCategory2] = useState("all");

  // all data
  const [allData, setAllData] = useState([]);
  const [idForUpdate, setIsForUpdate] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const createProduct = (e) => {
    e.preventDefault();
    let newProduct = {
      title,
      price,
      url,
      category,
    };

    if (isUpdate) {
      setIsUpdate(false);
      axios
        .put(`http://localhost:5000/products/${idForUpdate}`, newProduct)
        .then((res) => {
          alert("successfully updated");
          setTemp(false);
        })
        .catch(({ response }) => setData(response.data));
    } else {
      axios
        .post("http://localhost:5000/products", newProduct)
        .then((res) => {
          setData(res.data);
        })
        .catch(({ response }) => setData(response.data));
    }
    setTitle("");
    setPrice("");
    setCategory("");
    setUrl("");
  };

  if (data) {
    console.log(data);
  }

  // get products

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setAllData(res.data);
      })
      .catch((e) => console.log(e));

    if (category2 === "all") {
      axios
        .get("http://localhost:5000/products")
        .then((res) => {
          setData2(res.data);
          setTemp(true);
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get(`http://localhost:5000/products/category/${category2}`)
        .then((res) => {
          setData2(res.data);
          setTemp(true);
        })
        .catch((e) => console.log(e));
    }
  }, [category2, temp]);

  const handleDelete = (id) => {
    let confirmation = window.confirm("Do you want to delete?");

    if (confirmation) {
      axios
        .delete(`http://localhost:5000/products/${id}`)
        .then((res) => {
          alert(res.data.msg);
          setTemp(false);
        })
        .catch((e) => console.log(e));
    } else {
      return;
    }
  };

  const handleUpdate = (id) => {
    setIsForUpdate(id);
    setIsUpdate(true);
    window.scrollTo(0, 0);
    let i = allData.data.find((el) => el._id === id);
    setTitle(i.title);
    setUrl(i.url);
    setPrice(i.price);
    setCategory(i.category);
  };

  return (
    <div>
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

      {/* 

      get products
      
      */}
      <div>
        <h2 style={{ backgroundColor: data2 && data2.state ? "green" : "red" }}>
          {data2 && data2?.msg}
        </h2>
        <select onChange={(e) => setCategory2(e.target.value)} name="" id="">
          <option value="all">All</option>
          <option value="phone">Phone</option>
          <option value="laptop">Laptop</option>
          <option value="television">Television</option>
        </select>
        {data2 &&
          data2.state &&
          data2.data.map((item, idx) => (
            <div
              key={idx}
              style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid #000",
              }}
            >
              <i
                title={`delete: ${item.title}`}
                onClick={() => handleUpdate(item._id)}
                className="bi bi-pencil-square"
                style={{
                  marginLeft: "20px",
                  cursor: "pointer",
                  color: "green",
                }}
              ></i>
              <i
                title={`delete: ${item.title}`}
                onClick={() => handleDelete(item._id)}
                className="bi bi-x-circle"
                style={{
                  marginLeft: "20px",
                  color: "red",
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              ></i>
              <h1>name: {item.title}</h1>
              <p>price: {item.price}</p>
              <p>category: {item.category}</p>
              {item.url?.map((l, i) => (
                <img key={i} src={l} alt={item.title} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
