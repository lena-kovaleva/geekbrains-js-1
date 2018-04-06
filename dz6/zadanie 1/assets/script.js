let images = [
    "./assets/images/m1.jpg", 
    "./assets/images/m2.jpg", 
    "./assets/images/m3.jpg",
    "./assets/images/m4.jpg"  
];
let bigImages = [
    "./assets/images/b1.jpg", 
    "./assets/images/b2.jpg", 
    "./assets/images/b3.jpg",
    "./assets/images/b.jpg"  
];

let minis = document.getElementById("minis");
let big = document.getElementById("big-picture");
let arrow_left = document.getElementById("arrow-left");
let arrow_right = document.getElementById("arrow-right");
let current = 0;
let prev = 0;


big.addEventListener("error", error);
arrow_left.addEventListener("click", left);
arrow_right.addEventListener("click", right);

for (let i=0; i<images.length; i++) {
    let img = document.createElement("img");
    img.index = i;
    img.src = images[i];
    minis.appendChild(img);
    img.addEventListener("click", click);
};

function click(event){
    prev = current;
    current = event.target.index;
    big.src = bigImages[current];
}

function error() {
    alert("Картинка не найдена!");
    big.src = bigImages[prev];
}

function left(event) {
    prev = current;
    current--;
    if (current < 0) {
        current = images.length - 1;
    }
    big.src = bigImages[current];
}

function right(event) {
    prev = current;
    current++;
    if (current > images.length - 1) {
        current = 0;
    }
    big.src = bigImages[current];
}