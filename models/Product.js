import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    id: {
        type: Number,
        required: true, // Assuming id is required
    },
    title: {
        type: String,
        required: true, // Assuming title is required
    },
    description: {
        type: String,
        required: true, // Assuming description is required
    },
    price: {
        type: Number,
        required: true, // Assuming price is required
    },
    category: {
        type: String,
        required: true, // Assuming category is required
    },
    image: {
        type: String,
        required: true, // Assuming image is required
    },
    sold: {
        type: Boolean,
        default: false // Default value for sold is false
    },
    dateOfSale: {
        type: Date,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

export const Product = mongoose.model("Product", productSchema);
