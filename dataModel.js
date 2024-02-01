const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const dataSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,

    },
    adhar:{
        type:Number,required:true
    },
    pan:{
        type:String,
        required:true
    },
    mobile:{
        type:Array,
        required:true
    },
    
},{timestamps:true})
module.exports=mongoose.model('data',dataSchema)