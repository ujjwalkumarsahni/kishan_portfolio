
const mongoose = require('mongoose')


async function connect()
{
    const val = await mongoose.connect("mongodb+srv://kishuraj1111:8kIRJ1BzkvTfKIQK@cluster0.cbvnpj8.mongodb.net/adminDB")

}
    
    
const admin= new mongoose.Schema({
        adminPassword:
        {
            type : String,
            required: true,
        }
    })


const adminSchema = new mongoose.model('admin',admin)

module.exports = {connect,adminSchema}