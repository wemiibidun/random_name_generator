const express = require('express');
const data = require('./MOCK_DATA.json');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static('public/assets'));

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const sanitizeText = (value = '') => value.toString().trim();

const filterData = ({ startsWith, length }) => {
  let results = data;

  if (startsWith) {
    const letter = startsWith.toLowerCase();
    results = results.filter((item) =>
      item.first_name.toLowerCase().startsWith(letter)
    );
  }

  if (length) {
    results = results.filter((item) => item.first_name.length >= length);
  }

  return results;
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/random-name', (req, res) => {
  const count = Math.min(20, Math.max(1, toNumber(req.query.count, 1)));
  const startsWith = sanitizeText(req.query.startsWith);
  const length = toNumber(req.query.length, 0);

  const filtered = filterData({ startsWith, length });

  if (!filtered.length) {
    return res.status(404).json({
      error: 'No names match your filters. Try adjusting the options.'
    });
  }

  const picks = Array.from({ length: count }, () => {
    const index = Math.floor(Math.random() * filtered.length);
    const { first_name, last_name } = filtered[index];
    return { first_name, last_name };
  });

  return res.json({
    count,
    results: picks
  });
});

app.get('/', (req, res) => {
  return res.render('index');
});

app.listen(3000, () => console.log('Listening on port 3000...'));
