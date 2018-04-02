let figures = [
    [ 'LW', 'HW', 'SW', 'KW', 'FW', 'SW', 'HW', 'LW' ],
    [ 'PW', 'PW', 'PW', 'PW', 'PW', 'PW', 'PW', 'PW' ],
    [ '', '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '', '' ],
    [ '', '', '', '', '', '', '', '' ],
    [ 'PB', 'PB', 'PB', 'PB', 'PB', 'PB', 'PB', 'PB' ],
    [ 'LB', 'HB', 'SB', 'KB', 'FB', 'SB', 'HB', 'LB' ]
];

function createTable(figures) {
    let table = document.createElement("table");
    table.style.borderCollapse = "collapse";

    let letters = document.createElement("tr");
    table.appendChild(letters);

    for(let l=0; l<9; l++) {
        let letter = document.createElement("td");
        letters.appendChild(letter);

        if (l > 0) {
            letter.textContent = String.fromCharCode(64 + l);
        }

        letter.style.textAlign = "center";
        letter.style.color = "lightgray";
    }

    for(let i=0; i<8; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);

        let number = document.createElement("td");
        tr.appendChild(number);
        number.textContent = i + 1;
        number.style.padding = "0 10px 0 10px";
        number.style.color = "lightgray";

        for(let j=0; j<8; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);

            td.style.width = "70px";
            td.style.height = "70px";
            td.style.border = "1px black solid";
            td.style.textAlign = "center";

            if ((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
                td.style.backgroundColor = "gray";
            }

            let figure = figures[i][j];
            if (figure != '') {
                let address = "./images/" + figure + ".png";
                let img = document.createElement("img");
                img.src = address;
                td.appendChild(img);
            }
        }
    }

    return table;
}

let table = createTable(figures);
document.body.appendChild(table);