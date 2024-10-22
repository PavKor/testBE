const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Инициализация базы данных SQLite
const db = new sqlite3.Database(':memory:'); // В памяти для простоты

// Создаем таблицу пользователей
db.serialize(() => {
    db.run("CREATE TABLE users (id INT, name TEXT)");
    db.run("INSERT INTO users (id, name) VALUES (1, 'John Doe')");
});

// Эндпоинт для получения списка пользователей
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.status(500).send('Ошибка базы данных');
        } else {
            res.json(rows);
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
