import { Products } from "../Models/product.js";
export const addProducts=async(req,res)=>{
    const{title,description,price,category,qty,imgSrc}=req.body;
    try{
         let product=await Products.create({
            title,description,price,category,qty,imgSrc
         });
         res.json({message:'Product added Successfully',product});
    }
    catch(error){
        res.json(error.message);
    }
}
export const getProducts=async(req,res)=>{
        let products=await Products.find().sort({createdAt:-1});
        res.json({message:"All Products",products});
}
export const getProductById=async(req,res)=>{
    const id=req.params.id;
      let product= await Products.findById(id);
      if(!product)return res.json({message:"Invalid Id"});
       return res.json({message:"Specific Product",product});
};
export const updateProductById=async(req,res)=>{
    const id=req.params.id;
      let product= await Products.findByIdAndUpdate(id,req.body,{new:true});
      if(!product)return res.json({message:"Invalid Id"});
       return res.json({message:"Product is Updated",product});
};
export const deleteProductById=async(req,res)=>{
    const id=req.params.id;
      let product= await Products.findByIdAndDelete(id);
      if(!product)return res.json({message:"Invalid Id"});
       return res.json({message:"Product is deleted",product});
};
