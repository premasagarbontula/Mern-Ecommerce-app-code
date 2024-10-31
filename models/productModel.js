import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId, // as category has seperate model(a id will be created when a new category created)
      ref: "category", //(model name in category model is 'category')
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      data: Buffer, //Buffer type is used when you usually work with items that get saved in binary form, a good example would be images.
      contentType: String, //type of content we want to save
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema); //if we write 'Product',in database it will change to 'products'(lowercase)

//output after successful product creation look like below
/*  "...":"...",
    "...":"...",
    "quantity":1,
    "image": {
      "data": {
        "type": "Buffer",
        "data": [
          137,80...,
        ]
      },
      "contentType": "image/png"  
    }
*/
