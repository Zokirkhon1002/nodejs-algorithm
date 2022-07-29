/* eslint-disable arrow-body-style */
import React from "react";

const NewLoader = () => {
  return (
    <svg
      style={{ margin: "auto", background: "transparent", display: "block" }}
      width="217px"
      height="217px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="66" cy="50" r="4" fill="#89b8e0">
        <animate
          attributeName="cx"
          values="66;50"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="cy"
          values="50;66"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="fill"
          values="#89b8e0;#1370fc"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle cx="50" cy="66" r="4" fill="#1370fc">
        <animate
          attributeName="cx"
          values="50;34"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="cy"
          values="66;50"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="fill"
          values="#1370fc;#89b8e0"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle cx="34" cy="50" r="4" fill="#89b8e0">
        <animate
          attributeName="cx"
          values="34;50"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="cy"
          values="50;34"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="fill"
          values="#89b8e0;#64f51b"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle cx="50" cy="34" r="4" fill="#64f51b">
        <animate
          attributeName="cx"
          values="50;66"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="cy"
          values="34;49.99999999999999"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="fill"
          values="#64f51b;#89b8e0"
          keyTimes="0;1"
          dur="0.65125s"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
  );
};

export default NewLoader;
