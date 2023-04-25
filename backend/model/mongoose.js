const mongoose = require('mongoose');

const newSchema = mongoose.Schema({
    name:{
        type:"String",
        required:[true ,"this field is required"]
    },
    completed:{
        type:"Boolean",
        required: false
    }
})

const New = mongoose.model("New",newSchema);

module.exports = New;