const authHelper = require( "./helper.js");
const userModel =require( "./model.js");

 const JWT=require ( 'jsonwebtoken');
 
 
 const registerController=async(req,res)=>{
  try {
    const {name,mobile,pin}=req.body;
    //validations
    if(!name){
        return res.send({message:'Name is Required'})
    }
    if(!mobile){
        return res.send({message:'Mobile is Required'})
    }
    if(!pin){
        return res.send({message:'Pin is Required'})
    }
    
    //existing user
    const existingUser=await userModel.findOne({mobile})
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already register please login"
        })
    }
    //register user
    const hashedPassword=await authHelper.hashPassword(pin)
    //save
    const user=await new userModel({name,mobile,pin:hashedPassword}).save()
    res.status(201).send({
        success:true,
        message:"User register successfully",
        user
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,message:'Error in Registration',
        error
    })
  }
}


//login\\post
 const loginController=async(req,res)=>{
   try {
    const {mobile,pin}=req.body
    //validation
    if(!mobile || !pin){
        return res.status(404).send({
            success:false,
            message:"Invalid mobile or password"
        })
    }
        const user=await userModel.findOne({mobile});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Invalid mobile no"
            })
        }
        const match=await authHelper.comparePassword(pin,user.pin)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Pin incorrect"
            })

        }
        //token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                mobile:user.mobile,
                
            },token
        })

     
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in login",error
    })
   }
}
const testController=(req,res)=>{
    res.send('protedted route')
}


module.exports.registerController=registerController;
module.exports.loginController=loginController;