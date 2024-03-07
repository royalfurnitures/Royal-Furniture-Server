const mongoose = require('mongoose')
const ContactSchema = mongoose.Schema({
                 SubSectionData:{
                             type:Array,
                             required:true
                         },
                 mainContent1:{
                             type:Object,
                             required:true
                         },
                 mainContent2:{
                            type:Object,
                            required:true
                         },
                 category:{
                         type:String
                         },
                 subType:{
                         type:String
                         },
                 EdufurnDivision:{
                        type:String
                        }
},{timestamps:true});

module.exports =mongoose.model("Blog",ContactSchema,"Blog")