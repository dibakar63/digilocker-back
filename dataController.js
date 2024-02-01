const dataModel=require('./dataModel')

const getAllData = async (req, res, next) => {
  let data;
  try {
    data = await dataModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!data) {
    return res.status(404).json({ message: 'No data found' });
  }
  return res.status(200).json({ data })
}

const addData = async (req, res, next) => {
  const data = new dataModel({
    name: req.body.name,
    image: req.body.image,
    adhar: req.body.adhar,
    pan: req.body.pan,
    mobile: req.body.mobile,
    
  })
  try{
    const newdata = await data.save()
    res.status(201).json(newdata)
  } catch (error) {
    res.status(400).json({ message: 'Unable to Add' })
  }


};
const getById=async(req,res,next)=>{
  const id=req.params.id;
  let data;
  try {
    data=await dataModel.findById(id)
  } catch (error) {
    console.log(error)
  }
  if(!data){
    return res.status(500).json({message:'Data not Found'})
  }
  return res.status(200).json({data,message:"dataModel Found"})
}
const updateData=async(req,res,next)=>{
  //let id=req.params.id;
  let id=req.params.id;
  let data;
  try {
      const {name,image,adhar,mobile,pan}=req.body;
      let nwdata=await dataModel.findByIdAndUpdate(id,{name,image,adhar,mobile,pan})
      data=await nwdata.save()
      if(!data){
          res.status(500).send({
              success:false,
              message:"data is not updated",
  
          })
      }
      res.status(200).send({
          success:true,
          message:"Data updated",
          data
      }) 
  } catch (error) {
      console.log(error)
  }
}
const deleteData=async(req,res,next)=>{
    let id=req.params.id;
    let data;
    try {
        data=await dataModel.findByIdAndDelete(id)
        if(!data){
            res.status(500).send({
                success:false,
                message:"no data found with this id",
    
            })
        }
        res.status(200).send({
            success:true,
            message:"Data Deleted",
            data
        })

        
    } catch (error) {
       console.log(error) 
    }
    
}

exports.getAllData = getAllData;
exports.addData = addData;
exports.updateData=updateData;
exports.deleteData=deleteData;
exports.getById=getById;