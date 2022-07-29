// @ts-nocheck
import React from "react";
import "./Skeleton.css";
import { v4 as uuid } from "uuid";

const skeleton = ({ skeleton }) => {
  return (
    <>
      {new Array(skeleton)
        .fill("")
        .map((_, idx) => (
          <div key={idx} className="skeleton_item">
            <div className="skeleton_img"></div>
            <div className="skeleton_price"></div>
            <div className="skeleton_title"></div>
          </div>
        ))}
    </>
  );
};

export default skeleton;
