import { data } from "../temp/tempData.js";

const getAllTempData = async (req, res) => {
  res.json({
    data,
  });
};

export { getAllTempData };
