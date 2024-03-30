const express = require("express");


const { ProductsModel} =require("../Model/Products.model");


const ProductRouter = express.Router();



ProductRouter.get("/", async(req,res) => {
    try{
        const products=await ProductsModel.find()
        if(products){
            res.status(200).json({products})
        }else{
            res.status(400).json({msg:"Post not Found"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
})


ProductRouter.post("/", async(req,res) => {
    try{
     console.log(req.body);
     const post = new ProductsModel(req.body);
     await post.save();
     res.json({msg: "Post create successfully"});     
    }catch(err){
     res.json(err);
    }
 })


ProductRouter.patch("/:id", async (req,res) => {
    try{
       const postID = req.params.id;
        await ProductsModel.findByIdAndUpdate({_id:postID}, req.body);
        res.status(200).json({"msg": "updated"})
    }catch(err){
        res.status(400).send(err);
    }
})


ProductRouter.delete("/:id", async(req,res) => {
    try{
        const postID = req.params.id;
         await ProductsModel.findByIdAndDelete({_id:postID}, req.body);
         res.status(200).json({"msg": "title has been deleted"})
     }catch(err){
         res.status(400).send(err);
     }
})



ProductRouter.get("/:id",async(req,res)=>{ // to get a particular post
    const {id}=req.params;
    try {
        const post = await postModel.findOne({ _id: id });
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send({ "error": "Internal Server Error" })
    }
})


module.exports = {
    ProductRouter
}