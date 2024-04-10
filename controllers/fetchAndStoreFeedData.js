const categories = require('../utils/services')
const Parser = require('rss-parser')
const parser = new Parser()
const News = require('../models/News')

const fetchAndStoreFeedData = async () => {
    try {
        for (const category in categories) {
            const feed = await parser.parseURL(categories[category]);
            for (const item of feed.items) {
                const existingNews = await News.findOne({ title: item.title });
                if (!existingNews) {
                    await News.create({
                        title: item.title,
                        link: item.link,
                        description: item.contentSnippet,
                        category: category // Add category field to distinguish news items
                        // Add more fields as needed
                    });
                }
            }
        }
        console.log('Feed data stored successfully');
    } catch (error) {
        console.error('Error fetching or storing feed data:', error);
    }
};

module.exports = fetchAndStoreFeedData
