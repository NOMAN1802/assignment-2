import { Schema, model } from "mongoose";
import { ProductModel, TInventory, TProduct, TVariant } from "./product.interface";


const variantSchema = new Schema<TVariant>({
         type: { 
            type: String,
            required: [true,'Type is required']
         },
         value: { 
            type: String,
            required:[true,'Value is required'] 
        }
});

const inventorySchema = new Schema<TInventory>({
         quantity: { 
            type: Number,
            required: [true,'Quantity is required'] 
        },
         inStock: { 
            type: Boolean,
            required: [true,'stock is required']
         }
});

const productSchema = new Schema<TProduct>({
        name: { 
        type: String, 
        required: [true,'Name is required']
         },
         productId: { 
        type: String, 
        
         },
       description: { 
        type: String,
        required: [true,'Description is required']
        },
        price: { 
        type: Number, 
        required: [true,'Price is required']
        },
        category: { 
        type: String, 
        required: [true,'Category is required']
        },
        tags: { 
        type: [String], 
        required: [true,'Tag is required']
        },
        variants: { 
        type: [variantSchema], 
        required: [true,'Variants are required']
        },
        inventory: {
        type: inventorySchema, 
        required: [true,'Inventory is required']
        }
});


// pre save middleware/hook: will work on create() & save()

productSchema.pre('save',async function(next){
   
   const prod = this; //doc
   prod.productId = prod._id.toString();
 
   next();
 })
 
 
 // query middleware
 
 productSchema.pre('find', function( next){
  this.find({isDeleted: {$ne: true}}) 
 // console.log(this);
 next()
 })
 
 productSchema.pre('findOne', function( next){
  this.find({isDeleted: {$ne: true}}) 
 // console.log(this);
 next()
 })


// creating a custom static method

productSchema.statics.isProductExists = async function(id: string){
   const existingProduct = await Product.findOne({id});
   return existingProduct;
 }
 export const Product = model<TProduct,ProductModel>("Product",productSchema);