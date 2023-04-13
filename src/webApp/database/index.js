import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
const app = express();
app.disable('x-powered-by');
app.use(cors());

const PORT = 3031;

let db = new sqlite3.Database('database.db', (err) => {
  if (!err) {
    db.run('CREATE TABLE tbl_about_myself (name text, email text)', (err2) => {
      if (!err2) {
        db.run('INSERT INTO tbl_about_myself (name, email) VALUES ("charles", "test@test.com")');
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});

app.get('/', (req, res, next) => {
  res.json({ rsp: 'ok' });
});

app.get('/db/about-me', (req, res, next) => {
  db.all('SELECT * FROM tbl_about_myself', (err, rows) => {
    console.log('rows', rows);
    if (!err) {
      res.json({
        rsp: 'ok',
        data: rows[0],
      })
    } else {
      console.log('DB Error!');
    }
  });
});