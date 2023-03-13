const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to Database"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ message: "Email id is already registered", alert: false });
  }

  const data = new userModel(req.body);
  try {
    await data.save();
    res.json({ message: "Successfully signed up", alert: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving user data", alert: false });
  }
});

app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      const dataToSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      res.send({ message: "Login successful", alert: true, data: dataToSend });
    } else {
      res.send({ message: "Email not found, please sign up", alert: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error", alert: false });
  }
});

app.listen(PORT, () => console.log("server is running at port : " + PORT));
