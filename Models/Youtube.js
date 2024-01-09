const mongoose = require('mongoose')
const YoutubeSchema = mongoose.Schema({
                         YoutubeVideoID:{
                                       type:String,
                                       required:true
                         },
                         YoutubeVideoTitle:{
                                       type:String,
                                       required:true
                         }
},{timestamps:true});

module.exports =mongoose.model("Youtube",YoutubeSchema,"Youtube")