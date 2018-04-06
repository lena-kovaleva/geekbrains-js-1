let items = [
    {
        name: "Телевизор",
        price: 60000
    },
    {
        name: "Утюг",
        price: 2500
    },
    {
        name: "Пылесос",
        price: 7600
    },
    {
        name: "Телефон",
        price: 43900
    },
    {
        name: "Фен",
        price: 3400
    },
    {
        name: "Ноутбук",
        price: 17000
    }


];
let sum = 0;

let market = document.getElementById("market");
let basket = document.getElementById("basket");
let sumDiv = document.getElementById("sum");

for(let i=0; i<items.length; i++) {
    let itemDiv = createItem(items[i].name, items[i].price);

    let button = document.createElement("a");
    button.textContent = "Купить";
    button.className = "button";
    button.index = i;
    button.addEventListener("click", buy);

    itemDiv.appendChild(button);

    market.appendChild(itemDiv);
}

function buy(event) {
    let index = event.target.index;
    let item = items[index];

    let itemDiv = createItem(item.name, item.price);

    basket.appendChild(itemDiv);

    sum += item.price;

    sumDiv.textContent = "" + sum + "р.";
}

function createItem(name, price) {
    let itemDiv = document.createElement("div");
    let nameDiv = document.createElement("div");
    let priceDiv = document.createElement("div");

    itemDiv.className = "item";
    nameDiv.textContent = name;
    priceDiv.textContent = "цена: " + price + "  р."

    itemDiv.appendChild(nameDiv);
    itemDiv.appendChild(priceDiv);

    return itemDiv;
}