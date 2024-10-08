import { type } from "express/lib/response";
import mongoose from "mongoose";


const BlogSchema = new mongoose.Schema(
    {
        title: {
            type : String,
            required: true.,
            min:4 
        },
        description: {
            type : String,
            required: true,
            min:20
        },
        excerpt: {
            type : String,
            required: true,
            min: 10
        },
        quote: {
            type : String,
            required: true,
            min:6
        },
        image:{
            id:{
                type : String
            },
            url:{
                type : String

            }

        },
        catagory:{
            type: String,
            required:true

        },
        authorId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        likes : {
            type: [mongoose.Schema.Types.ObjectId],
            ref : "User",
            default:[]
        },
        commnets:[{
            user : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "User",
                required: true
            },
            text:{
                type: String,
                required:true
            },
            data:{
                type: Date,
                default:Date.now
            }
            

        }]
    } ,
    {
        timestamps:true
    }
)

export default mongoose?.models?.Blog || mongoose.model("Blog",BlogSchema);