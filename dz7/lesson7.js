// Глобальные переменные:                            
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат
var scoreDiv;  // div для вывода очков

function init() {
    prepareGameField(); // Генерация поля

    // находим div для вывода очков
    scoreDiv = document.getElementById("snake-score");    
    var wrap = document.getElementsByClassName('wrap')[0];
    // Подгоняем размер контейнера под игровое поле
    
	/*
	if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
    */
    wrap.style.width = '400px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

// Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true;
    respawn();//создали змейку

    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 5000);
    setTimeout(createBomb, 5000);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}

/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку
    if (direction == 'x-') {
        coord_x--;
    }
    else if (direction == 'x+') {
        coord_x++;
    }
    else if (direction == 'y+') {
        coord_y--;
    }
    else if (direction == 'y-') {
        coord_y++;
    }

    if (coord_x < 0) {
        coord_x = FIELD_SIZE_X - 1;
    } else if (coord_x >= FIELD_SIZE_X) {
        coord_x = 0;
    } else if (coord_y < 0) {
        coord_y = FIELD_SIZE_Y - 1;
    } else if (coord_y >= FIELD_SIZE_Y) {
        coord_y = 0;
    }
    new_unit = document.getElementsByClassName('cell-' + coord_y + '-' + coord_x)[0];

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    //console.log(new_unit);
    if (!isSnakeUnit(new_unit) && !haveBomb(new_unit)) {
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Находим хвост
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
    else {
        finishTheGame();
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {
    var check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}

/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    var check = false;

    if (haveUnit(unit, 'food')) {
        createFood();

        // обновляем div с очками
        scoreDiv.textContent = ++score;

        check = true;
    }

    return check;
}

function haveBomb(unit) {
    return haveUnit(unit, 'bomb');
}

/**
 * Проверка на определенный тип юнита
 */
function haveUnit(unit, type) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');

    // Если соответствующий тип юнита
    if (unit_classes.includes(type + '-unit')) {
        check = true;
    }
    return check;
}

/**
 * Создание еды
 */
function createFood() {
    createUnit('food');
}

/**
 * Создание бомбы
 */
function createBomb() {
    createUnit('bomb');

    setTimeout(removeBomb, 5000);
}

/**
 * Создание дополнительного юнита (бомбы или еды)
 */
function createUnit(type) {
    var unitCreated = false;

    while (!unitCreated) {
        // рандом
        var unit_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var unit_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var unit_cell = document.getElementsByClassName('cell-' + unit_y + '-' + unit_x)[0];
        var unit_cell_classes = unit_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!unit_cell_classes.includes('snake-unit')) {
            unit_cell.className = unit_cell.className + ' ' + type + '-unit';
            unitCreated = true;
        }
    }
}

function removeBomb() {
    var bomb_cell = document.getElementsByClassName('bomb-unit')[0];

    var classes = bomb_cell.getAttribute("class").split(" ");
    bomb_cell.className = classes[0] + " " + classes[1];

    setTimeout(createBomb, 5000);
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score);
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;