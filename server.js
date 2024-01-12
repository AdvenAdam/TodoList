const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

var sync = false;

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

if (sync) {
    db.sequelize
        .sync()
        .then(() => {
            console.log('Synced db.');
        })
        .catch((err) => {
            console.log('Failed to sync db: ' + err.message);
        });
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;

const checklistRoute = require('./app/routes/checklist.route');
const checklistItemRoute = require('./app/routes/checklist.item.route');
const userRoute = require('./app/routes/user.route');

// Ensure you are passing the 'app' instance to the route handlers
checklistRoute(app);
checklistItemRoute(app);
userRoute(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
