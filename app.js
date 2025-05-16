const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground')

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

app.get('/makecampground', async (req,res) => {
    const camp = new Campground({title: 'My Backyard', description: 'Cheap camping'});
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('SERVING ON PORT 3000!');
})