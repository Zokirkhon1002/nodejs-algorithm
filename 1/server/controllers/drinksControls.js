import server from "../server.js";
const { drinks } = server;

// METHOD: GET
// Desc:   Get All Drink
const getAllDrinks = async (req, res) => {
  try {
    res.status(200).json({
      msg: "success",
      drinks,
    });
  } catch (err) {
    res.send(err);
  }
};

// METHOD: GET
// Desc:   get drink by Id
const getDrinkById = async (req, res) => {
  try {
    let id = +req.params.id;
    let drink = drinks.find((e) => e.id === id);

    if (!drink) return res.status(404).json({ msg: "Not Found!" });

    return res.status(200).json({
      msg: "success",
      drink,
    });
  } catch (err) {
    res.send(err);
  }
};

// METHOD: POST => Create
// Desc:   Adding new drink to route which is '/drinks'
const addingNewDrink = async (req, res) => {
  try {
    let { name, url } = req.body;
    let newDrink = {
      id: drinks.length + 1,
      name,
      url,
    };
    drinks.push(newDrink);

    res.status(201).json({
      msg: "New drink added successfully!",
      newDrink,
    });
  } catch (err) {
    res.send(err);
  }
};

// METHOD: DELETE => delete
// Desc:   deleting drink by id
const deleteDrinkById = async (req, res) => {
  try {
    let id = +req.params.id;
    let indexOfDeletingDrink = drinks.findIndex((e) => e.id === id);
    let deletedItem = drinks.splice(indexOfDeletingDrink, 1);

    res.status(200).json({
      msg: "Deleted",
      deletedItem,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: PUT (UPDATE)
// Desc:   edit drink book by id;
const updateDrinkById = async (req, res) => {
  try {
    let id = +req.params.id;
    let drink = drinks.find((e) => e.id === id);

    if (!drink) return res.status(404).json({ msg: "Not Found" });

    const { name, url } = req.body;
    let indexOfUpdatingDrink = drinks.findIndex((e) => e.id === id);

    let updatedDrink = { id, name, url };

    drinks[indexOfUpdatingDrink] = updatedDrink;

    res.status(200).json({
      msg: "Successfully updated!",
      updatedItem: updatedDrink,
    });
  } catch (err) {
    res.send(err);
  }
};

export {
  getAllDrinks,
  addingNewDrink,
  getDrinkById,
  deleteDrinkById,
  updateDrinkById,
};
