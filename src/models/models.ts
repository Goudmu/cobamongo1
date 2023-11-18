import mongoose, {Schema, mongo} from "mongoose";

const productsSchema = new Schema(
    {
        title: String,
        desc: String,
        img: String,
        price: Number,
        isFeatured: Boolean,
        cat: String,
    },{
        timestamps: true
    }
)
export const products = mongoose.models.products || mongoose.model("products", productsSchema)

const catSchema = new Schema({
    title: String,
    desc: String,
    color: String,
    img: String,
    cat: {
        type: String,
        unique: true
    },
    productsSchema: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productsSchema"
    }]
}, {timestamps: true})

export const cats = mongoose.models.cats || mongoose.model("cats", catSchema)

const userAdminSchema = new Schema({
    username: String,
    password: {
        type: String,
        default: "asd"
    },
    gmail: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
export const usersAdmin = mongoose.models.usersAdmin || mongoose.model("usersAdmin", userAdminSchema)

const cartSchema2 = new Schema({
    gmail: {
        type: String,
        unique: true
    },
    productsSchema: [{
        title: String,
        desc: String,
        img: String,
        price: Number,
        isFeatured: Boolean,
        cat: String,
        qty: Number
    }]
}, {
    timestamps: true
})
export const carts2 = mongoose.models.carts2 || mongoose.model("carts2", cartSchema2)

const orderSchema2 = new Schema({
    gmail: String,
    status: {
        type: String,
        default: "On Going..."
    },
    totalPrice: Number,
    totalQty: Number,
    productsSchema: [{
        title: String,
        desc: String,
        img: String,
        price: Number,
        isFeatured: Boolean,
        cat: String,
        qty: Number
    }]
}, {
    timestamps: true
})
export const orders2 = mongoose.models.orders2 || mongoose.model("orders2", orderSchema2)