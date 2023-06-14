const express = require("express");
const cors = require('cors');
const {mongoose} = require("mongoose");
const bodyParser = require("body-parser");
const projectRoutes = require("./routes/projectRouter");
const taskRoutes = require("./routes/taskRouter");
const userRoutes = require("./routes/userRouter");
const authRouter = require('./routes/authRouter');
require('./passport.js');


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    auth: {
        username: "root",
        password: "example"
    }
};

mongoose.connect("mongodb://host.docker.internal/projectUJ", options).then(() => console.log('connected')).catch(e => console.log(e));

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/projects/", projectRoutes);
app.use("/api/tasks/", taskRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRouter);


app.listen(8080, () => {
    console.log("listening on port 8080");
});