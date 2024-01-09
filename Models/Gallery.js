const mongoose = require('mongoose')
const GallerySchema = mongoose.Schema({
                         Images:{
                             type:Array,
                             required:true
                         },
                         Title:{
                             type:String,
                             required:true
                         },
                         
},{timestamps:true});

module.exports =mongoose.model("Gallery",GallerySchema,"Gallery")