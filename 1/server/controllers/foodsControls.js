import server from "../server.js";
const { foods } = server;

// METHOD: GET
// Desc:   Get All Foods
const getAllFoods = async (req, res) => {
  try {
    res.status(200).json({
      msg: "success",
      foods,
    });
  } catch (err) {
    res.send(err);
  }
};

// METHOD: GET
// Desc:   get one food by Id
const getFoodByID = async (req, res) => {
  try {
    let id = req.params.id;
    let food = foods.find(
      (e) =>
        e.id == id ||
        e.name.toLocaleLowerCase().includes(id.toLocaleLowerCase())
    );

    if (!food) return res.status(404).json({ msg: "Not Found!" });

    return res.status(200).json({
      msg: "success",
      food,
    });
  } catch (err) {
    res.send(err);
  }
};

// METHOD: POST => Create
// Desc:   Adding new food to route which is '/foods'
const addingNewFood = async (req, res) => {
  try {
    let { name, url } = req.body;
    let newFood = {
      id: foods.length + 1,
      name,
      url,
    };
    foods.push(newFood);

    res.status(201).json({
      msg: "New food added successfully!",
      newFood,
    });
  } catch (err) {
    res.send(err);
  }
};

// METHOD: DELETE => delete
// Desc:   deleting food by id;
const deleteFoodById = async (req, res) => {
  try {
    let id = +req.params.id;
    let indexOfDeletingFood = foods.findIndex((e) => e.id === id);
    let deletedItem = foods.splice(indexOfDeletingFood, 1);

    res.status(200).json({
      msg: "Deleted",
      deletedItem,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: PUT (UPDATE)
// Desc:   edit food book by id;
const updateFoodById = async (req, res) => {
  try {
    let id = +req.params.id;
    let food = foods.find((e) => e.id === id);

    if (!food) return res.status(404).json({ msg: "Not Found" });

    const { name, url } = req.body;
    let indexOfUpdatingFood = foods.findIndex((e) => e.id === id);

    let updatedFood = { id, name, url };

    foods[indexOfUpdatingFood] = updatedFood;

    res.status(200).json({
      msg: "Successfully updated!",
      updatedItem: updatedFood,
    });
  } catch (err) {
    res.send(err);
  }
};

export {
  getAllFoods,
  addingNewFood,
  getFoodByID,
  deleteFoodById,
  updateFoodById,
};
