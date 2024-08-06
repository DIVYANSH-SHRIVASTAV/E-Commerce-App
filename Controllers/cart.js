import { Cart } from "../Models/Cart.js";

//addTOCart
export const addToCart=async(req,res)=>{
    const{productId,title,price,qty,imgSrc}=req.body;
    const userId=req.user;
     let cart=await Cart.findOne({userId});
     if(!cart){
    cart=new Cart({userId,items:[]});
     }
    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);
    if(itemIndex>-1){
        cart.items[itemIndex].qty+=qty;
        cart.items[itemIndex].price+=qty*price;
    }else{
        cart.items.push({productId,title,price,qty,imgSrc});
    }
   
    await cart.save();
    res.json({message:"Item is Added to Cart",cart});
}
// get User cart
export const userCart=async(req,res)=>{
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart)return res.json({message:"cart is not found"});
    res.json({message:"user cart",cart});
}
// remove Product from Cart
export const removeProductFromCart=async(req,res)=>{
    const productId=req.params.productId;
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart)return res.json({message:"cart is not found"});
    cart.items=cart.items.filter((item)=>item.productId.toString()!==productId);
    await cart.save();
    res.json({message:"product remove from cart"});
}
// clear cart
export const clearCart=async(req,res)=>{
   
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart) cart=new Cart({items:[]});
    else
       cart.items=[];
    await cart.save();
    res.json({message:"cart is clear"});
}
//decrease dty from cart
export const decreaseProductQty=async(req,res)=>{
    const{productId,qty}=req.body;
    const userId=req.user;
     let cart=await Cart.findOne({userId});
     if(!cart){
    cart=new Cart({userId,items:[]});
     }
    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);
    if(itemIndex>-1){
        const item = cart.items[itemIndex];
        if(item.qty>qty){
            const PriceperUnit=item.price/item.qty;
            item.qty-=qty;
            item.price-=PriceperUnit*qty;
        }
        else{
            cart.items.splice(itemIndex,1)
        }
    }else{
        res.json({message:"Invalid Product Id"});
    }
   
    await cart.save();
    res.json({message:"item qty decrease",cart});
}

