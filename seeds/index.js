const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6843e052c41be772779517da',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dp8fcjtg8/image/upload/v1749542381/YelpCamp/lizozkavfotxwtu3bwfl.jpg',
                    filename: 'YelpCamp/lizozkavfotxwtu3bwfl',
                },
                {
                    url: 'https://res.cloudinary.com/dp8fcjtg8/image/upload/v1749542383/YelpCamp/tqvverzauhkxjxmexlis.jpg',
                    filename: 'YelpCamp/tqvverzauhkxjxmexlis',
                }
            ]
            ,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, molestiae iure! Nulla praesentium dolorem voluptatum facilis eligendi ratione animi veniam molestias! Exercitationem earum cumque mollitia excepturi quo ab porro explicabo!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})