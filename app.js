const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
//app.use(cors({origin: '*', credentials: true, optionsSuccessStatus: 200,}));

app.use(cors());

app.use(express.static(__dirname));

//Middlewares
app.use(bodyParser.json()); //changes data to json for all endpoints


//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);


//Middlewares
/*
app.use('/posts', () => {
    console.log('This is a middleware running'); //runs everytime /posts is "hit"
})
*/

//ROUTES
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname })
});

//app.use(auth) runs auth everytime an endpoint is hit

//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to DB!'));



//How we start listening to the server
app.listen(3000);
