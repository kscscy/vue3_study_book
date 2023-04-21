import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
const app = express();
app.disable('x-powered-by');
app.use(cors());

const PORT = 3031;

let db = new sqlite3.Database('database.db', (err) => {
  if (!err) {
    db.run('CREATE TABLE IF NOT EXISTS tbl_about_myself (name text, email text, UNIQUE(name, email))', (err2) => {
      if (!err2) {
        db.run('INSERT OR IGNORE INTO tbl_about_myself (name, email) VALUES ("charles", "test@test.com")');
      }
    });
    db.run('CREATE TABLE IF NOT EXISTS tbl_my_resume (date DATE, title TEXT, content TEXT, URL TEXT, UNIQUE(date, title))',
    (err2) => {
      if (!err2) {
        const resume = [
          {
            date: '1990-01-01',
            title: '탄생',
            content: '생일 입니다.',
            url: null
          },
          {
            date: '2010-01-01',
            title: '생존',
            content: '살아 있습니다.',
            url: null
          },
          {
            date: '2030-01-01',
            title: '위기',
            content: '위험에 처했습니다.',
            url: 'https://naver.com'
          },
        ];
        resume.forEach((item) => {
          const query = `INSERT OR IGNORE INTO tbl_my_resume (date, title, content, URL)
          VALUES ('${item.date}', '${item.title}', '${item.content}', '${item.url}')`;
          db.run(query);
        });
      }
    })
  }
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});

app.get('/', (req, res, next) => {
  res.json({ rsp: 'ok' });
});

app.get('/db/about-me', (req, res, next) => {
  let result = {
    rsp: 'fail',
  };

  db.get('SELECT * FROM tbl_about_myself', (err, row) => {
    if (!err) {
      result.data = row;
      db.all('SELECT * FROM tbl_my_resume ORDER BY date desc', (err2, rows) => {
        if (!err2) {
          result.rsp = 'ok';
          result.data.resume = rows;
          res.json(result);
        } else {
          res.json(result);
        }
      });
    } else {
      res.json(result);
    }
  });
});
