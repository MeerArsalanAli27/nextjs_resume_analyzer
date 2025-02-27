
const mongoose=require('mongoose')



export const mongoconnect=async()=>{
  console.log("coneccting.. to momgodb");
  try {
    await mongoose.connect(process.env.MONGO_URLL);

    console.log("Successfully connected to MongoDB.");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}
};


export const mongoDisconnect = async () => {
  console.log("Disconnecting from MongoDB...");
  try {
      await mongoose.disconnect(process.env.MONGO_URLL);
      console.log("Successfully disconnected from MongoDB.");
  } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
  }
};