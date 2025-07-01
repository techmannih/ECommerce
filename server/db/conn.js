const mongoose =require("mongoose")

const connectDB =async () =>{
    try{
        const conn= await mongoose.connect(process.env.dbURL, {
            useNewUrlParser: true
        });
    

    } catch(err){

    }
}
module.exports = connectDB ;