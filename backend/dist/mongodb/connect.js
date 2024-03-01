import mongoose from "mongoose";
const coonectDb = (url) => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(url)
        .then(() => {
        console.log("MongoDB connected");
    })
        .catch((err) => {
        console.log(err);
    });
};
export default coonectDb;
//# sourceMappingURL=connect.js.map