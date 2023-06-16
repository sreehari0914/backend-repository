const mongoose = require("mongoose")
const User = require("./User")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        min:6,
        max:100,
        required:true
    },
    img:{
        type:String,
        default:"https://images.pexels.com/photos/930530/pexels-photo-930530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

    },
    startDate:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date
    },
    eventStartDate:{
        type:Date
    },
    eventEndDate:{
        type:Date
    },
    participation:{
        type:String,
        required:true,
        default:"Individual"
    },
    cost:{
        type:String,
        required:true,
        default:"Free"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    tags:{
        type:[String]   
    },
    url:{
        type:String,
        required:true
    }

})
const Post = mongoose.model("Post",postSchema)
module.exports = Post