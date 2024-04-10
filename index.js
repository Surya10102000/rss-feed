const express = require('express');
const Parser = require('rss-parser');
const parser = new Parser();
const app = express();
require('dotenv').config()
const connectDB = require('./db/connectDB')
const cron = require('node-cron');
const fetchAndStoreFeedData = require('./controllers/fetchAndStoreFeedData');


const connectionString = process.env.MONGO_URI

connectDB(connectionString)

app.set('view engine', 'ejs');
app.use(express.static('public'));

cron.schedule('*/10 * * * *', fetchAndStoreFeedData)

// Route for fetching and rendering RSS feed
app.get('/', async (req, res) => {
    const feed = await parser.parseURL('https://timesofindia.indiatimes.com/rssfeeds/74317216.cms');
    const key = Object.keys(feed)
    console.log( key, feed.items.length)
    res.render('index', { feedItems: feed.items });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});