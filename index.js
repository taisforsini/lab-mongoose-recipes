const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    const myRecipe = await Recipe.create({
      title: "Brigadeiro",
      level: "Easy Peasy",
      ingridients: ["condensed milk", "butter", "powdered chocolate"],
      cuisine: "brazilian",
      dishType: "dessert",
      duration: 5,
      creator: "Chef Taís",
      created: "7-15-2021",
    });

    const manyRecipes = await Recipe.insertMany(data);

    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );

    const deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Deleted carrot cake recipe");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
