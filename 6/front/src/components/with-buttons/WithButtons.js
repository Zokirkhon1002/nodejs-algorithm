// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./WithButtons.css";
import axios from "../../api/axios";
import NewLoader from "../loader/Loader";
import Skeleton from "../skeleton/Skeleton.jsx";
import { v4 as uuid } from "uuid";
import { useParams, useHistory } from "react-router-dom";
import {
  BsArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

let pageSize = 3;
const WithButtons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [buttonCount, setBtnCount] = useState(1);
  const { pageNumber: id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setPageNumber(Number(id));
  }, [id]);

  useEffect(() => {
    axios
      .get(`/products/with-buttons`, { params: { pageSize, pageNumber } })
      .then(
        ({
          data: {
            data: { products, btnCount },
          },
        }) => {
          history.push(`/pagination/with-buttons/${id}`);
          setData(products);
          setBtnCount(btnCount);
          setLoading(false);
        }
      )
      .catch((e) => console.log(e));
  }, [pageNumber, id, history]);

  const handlePaginationBtn = (e) => {
    let number = Number(e.target.innerText);
    setPageNumber(number);
    history.push(`/pagination/with-buttons/${number}`);
  };
  const rightPaginationBtn = () => {
    if (pageNumber < buttonCount) {
      setPageNumber(pageNumber + 1);
      history.push(`/pagination/with-buttons/${pageNumber + 1}`);
    } else {
      return;
    }
  };
  const leftPaginationBtn = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      history.push(`/pagination/with-buttons/${pageNumber - 1}`);
    } else {
      return;
    }
  };

  return (
    <>
      <h1>With Buttons</h1>
      <div className="wrapper1">
        {loading ? (
          <Skeleton key={uuid} skeleton={pageSize} />
        ) : (
          data?.map((i, idx) => (
            <div key={idx} className="product">
              <img src={i.url[0]} alt={i.title} />
              <h4>{i.title}</h4>
              <p>{i.price}</p>
            </div>
          ))
        )}
      </div>

      <div className="with_button">
        {loading ? (
          <NewLoader />
        ) : (
          <div>
            <button
              disabled={pageNumber === 1}
              onClick={() => {
                setLoading(true);
                leftPaginationBtn();
              }}
              className="left"
            >
              <BsArrowLeftCircleFill />
            </button>
            {new Array(buttonCount).fill("").map((_, idx) => (
              <button
                className={
                  pageNumber === idx + 1 ? "innerBtn active" : "innerBtn"
                }
                disabled={pageNumber === idx + 1}
                onClick={(e) => {
                  setLoading(true);
                  handlePaginationBtn(e);
                }}
                key={idx}
              >
                {idx + 1}
              </button>
            ))}
            <button
              disabled={pageNumber === buttonCount}
              onClick={() => {
                setLoading(true);
                rightPaginationBtn();
              }}
              className="right"
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WithButtons;
