const express = require("express");
const app = express();
require("dotenv/config")
const cors = require("cors");
const {default : mongoose} = require("mongoose");

app.use(cors({origin : true}));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Hai There....")
})

//user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

//artist Routes
const artistsRoutes = require("./routes/artist");
app.use("/api/artists/", artistsRoutes);

//Albums ROutes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

//Songs Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true});
mongoose.connection
.once("open", () => console.log("Connected"))
.on("Error", (error) => {
    console.log(`ERROR : ${error}`);
})

app.listen(4000, () => console.log("Liseting Port 4000"));