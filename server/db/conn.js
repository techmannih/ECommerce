const mongoose =require("mongoose")

const connectDB =async () =>{
    try{
        const conn= await mongoose.connect(process.env.dbURL, {
            useNewUrlParser: true
        });
        console.log("database connected");
    

    } catch(err){
        console.log(err.message);

    }
}
module.exports = connectDB ;