// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./seeMoreProduct.css";
import axios from "../../api/axios";
import NewLoader from "../loader/Loader";
import Skeleton from "../skeleton/Skeleton.jsx";
import { v4 as uuid } from "uuid";

let page = 2;
const SeeMore = () => {
  const [count, setCount] = useState(2);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hidingForSeeMoreBtn, setHidingForSeeMoreBtn] = useState(false);
  const [allPage, setAllPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/products/seemore`, { params: { count, page: 1 } })
      .then(
        ({
          data: {
            data: { products, totalPage },
          },
        }) => {
          // console.log(products);
          // console.log(totalPage);
          setAllPage(totalPage);
          setData(products);
          setLoading(false);
        }
      )
      .catch((e) => console.log(e));
  }, [count]);

  useEffect(() => {
    if (allPage > count) {
      setHidingForSeeMoreBtn(false);
    } else {
      setHidingForSeeMoreBtn(true);
    }
  }, [allPage, count]);

  return (
    <div>
      <h1>See More Products</h1>
      <div className="wrapper1">
        {data?.map((i, idx) => (
          <div key={idx} className="product">
            <img src={i.url[0]} alt={i.title} />
            <h4>{i.title}</h4>
            <p>{i.price}</p>
          </div>
        ))}
        {loading ? <Skeleton key={uuid} skeleton={page} /> : ""}
      </div>
      {loading ? (
        <NewLoader />
      ) : (
        <div className="see-more">
          <button
            disabled={loading || hidingForSeeMoreBtn}
            onClick={() => {
              setCount((last) => last + 2);
              setLoading(true);
            }}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default SeeMore;
