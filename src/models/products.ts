import mongoose, {Schema, mongo} from "mongoose";

const productsSchema = new Schema(
    {
        title: String,
        desc: String,
        img: String,
        price: Number,
        isFeatured: Boolean,
        cat: String
    },{
        timestamps: true
    }
)
const products = mongoose.models.products || mongoose.model("products", productsSchema)
export default products;