const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoDb = require("./DB/ConnectDb.js");
const postRouter = require("./Routes/PostRoutes.js");
const userRouter = require("./Routes/UserRoutes.js");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
// connect mongo db.
mongoDb();

// uploading the images
app.use("/upload", express.static(path.join(__dirname, "/upload")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// post route
app.use("/api/posts", postRouter);
// user route
app.use("/api/user", userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is connected to port ${process.env.PORT}`);
});
