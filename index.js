const express = require('express');
const cors = require('cors');
const db = require("./app/models");
const app = express();


const corsOptions = {
    origin : "*"
};

//Register CORS Middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongooseConfig = {
        useNewUrlParser : true,
        useUnifiedTopology : true
};


//Connect to Database
db.mongoose.connect(db.url,mongooseConfig)
    .then(() => console.log("Database Connected"))
    .catch(err => {
        console.log(`Couldn't Connect to ${err.message}`);
        process.exit();
    });



//Routes
app.get("/", (req, res) => {
    res.json({message : "Hello Kevin The Human , I am C-3 The Sentient" })
})

//Connect to Folder Routes
require("./app/routes/auth")(app);
require("./app/routes/user")(app);
require("./app/routes/activity")(app);
require("./app/routes/skill")(app);


//Port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
