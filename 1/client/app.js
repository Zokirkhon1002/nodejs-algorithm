// calling getData with url
let url = "http://localhost:8000";
getData(url);

async function getData(url) {
  let drinks = await fetch(url + "/drinks");
  drinks
    .json()
    .then((res) => showDrinks(res))
    .catch((err) => console.log(err));

  let foods = await fetch(url + "/foods");
  foods
    .json()
    .then((res) => showFoods(res))
    .catch((err) => console.log(err));
}

function showDrinks(data) {
  resultDrink.innerHTML = "";
  console.log(data);
  data.drinks.forEach((i) => {
    let item = `
    <div>
      <img src="${i.url}" alt="${i.name}" />
      <h2>${i.name}</h2>
      </div>
      `;
    resultDrink.insertAdjacentHTML("beforeend", item);
  });
}
function showFoods(data) {
  resultFood.innerHTML = "";
  console.log(data);
  data.foods.forEach((i) => {
    let item = `
      <div>
      <img src="${i.url}" alt="${i.name}" />
      <h2>${i.name}</h2>
      </div>
      `;
    resultFood.insertAdjacentHTML("beforeend", item);
  });
}
