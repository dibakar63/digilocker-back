const mongoose=require('mongoose');

const connectDb=async()=>{
    try {
        await mongoose.connect('mongodb+srv://dibakardey63:OHeaLo75G6TRf3yo@recipes.rglhoml.mongodb.net/digilocker')
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDb