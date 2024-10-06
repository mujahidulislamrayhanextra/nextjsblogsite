import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required: true
        },
        email: {
            type : String,
            required: true,
            unique:true
        },
        password: {
            type : String,
            required: true
        },
        designatiom: {
            type : String,
            default: ""
        },
        avater: {
            type : Object,
            default: {}
        },
        age: {
            type : String,
            default: ""
        },
        location: {
            type : String,
            default: ""
        },
        about: {
            type : String,
            default: ""
        },
    } ,
    {
        timestamps:true
    }
)

export default mongoose?.models?.User || mongoose.model("User",UserSchema);