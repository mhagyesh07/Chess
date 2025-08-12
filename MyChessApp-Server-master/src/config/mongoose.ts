import "../util/dotenv"
import mongoose from "mongoose";
import { IS_PROD } from "./constants";

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
  autoIndex: !IS_PROD,
  useCreateIndex: true,
};

// For debug only
// mongoose.set("debug", function (coll, method, query, doc, options) {
//   console.log("DEBUG MONGO: ", coll, method, query, doc, options);
// });

mongoose.connect(process.env.MONGO_URL || "", options);

const db = mongoose.connection;

db.on("error", (err:Error) => {
  console.error(new Error("Could not connect to database"), err);
});

db.once("open", () => {
  console.info(`Database Connected`);
});
