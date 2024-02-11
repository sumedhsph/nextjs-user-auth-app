import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (err: any) => {
      console.log("MongoDB error. Please make sure MongoDB is running" + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
