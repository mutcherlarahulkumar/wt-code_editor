const  mongoose  = require('mongoose')

mongoose.connect('mongodb+srv://rahul:hDzJYkAenZIbyQLR@cluster0.qkwlpub.mongodb.net/wt').then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log("No Connection");
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });


const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const Notes = mongoose.model('Notes', notesSchema);

module.exports = { User, Notes };