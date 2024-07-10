const express = require('express')
const ejs = require('ejs')
const user = require('./model/user')
const {connect,adminSchema} = require('./model/admin')
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))


app.get("", (req, res) => {
    try {
        res.render('port')
        res.end()
    } catch (error) {
        res.send("there was an error")
    }

})


app.get("/about", (req, res) => {
    try {
        res.render("about.ejs")
        res.end()
    } catch (error) {

    }
})


app.get("/skills", (req, res) => {
    try {
        res.render("skills")
        res.end()
    } catch (error) {

    }
})


app.get("/experience", (req, res) => {
    try {
        res.render("experience")
        res.end()
    } catch (error) {

    }
})

app.get("/home", (req, res) => {
    try {
        res.redirect("/")
        res.end()
    } catch (error) {

    }
})

app.get("/project", (req, res) => {
    try {
        res.render("project")
        res.end()
    } catch (error) {

    }
})


app.get("/education", (req, res) => {
    try {
        res.render("education")
        res.end()
    } catch (error) {

    }
})

app.get("/admin", (req, res) => {
    try {
        res.render("admin")
        res.end()
    } catch (error) {

    }
})

connect()
async function checkPass(req,res,next)
{
   try {
        const data = await req.body.password
        const dbd = await adminSchema.findOne({adminpassword:data})
        
        if(dbd==null)
        {
            console.log("no");
            res.redirect('/admin')
        }
        else
        {
            next()
        }
        
   } catch (error) {
    
   }
}

app.post("/submit",checkPass,async(req,res)=>
{
    try {
       
        res.render('admindashbord')
        res.end()
        
    } catch (error) {
        console.log(error);
    }
})


app.post('/submit/user',async(req,res)=>
{
    try {
        
        const create = await user.create(
            {
                name:req.body.name,
                email:req.body.email,
                subject:req.body.subject,
                message:req.body.message,
            }
       
        )
        if(create)
        {
            res.render('submit')
            res.end()
        }
        else
        {
            res.redirect('/')
            res.end()
        }
    } catch (error) {
        console.log(error);
    }
})


app.post('/find',async(req,res)=>
{
    try {
        // console.log(await req.body);
        const data = await user.find({email:req.body.findEmail})
        console.log(data , req.body.findEmail);
        if(data=="")
        {
          
            res.render('datanotfound')
            res.end()
        }
        else
        {
            res.render('finduser',{user:data})
        }
    } catch (error) {
        
    }
})


app.post('/delete',async(req,res)=>
{
    try {
        // console.log(await req.body);
        const data = await user.deleteOne({email:req.body.deleteEmail})

        console.log(data);
        if(data.deletedCount>=1)
        {
            res.render('deletesucess')
            res.end()
        }
        else
        {
            res.render('datanotfound')
            res.end()
        }
    } catch (error) {
        console.log(error);
    }
})


app.get('/findall',async(req,res)=>
{
    try {
        const data = await user.find()
        res.render('findall',{user:data})
        res.end()
    } catch (error) {
        console.log(error);
    }
})

app.listen(8000,(err)=>
    {
        try {
            console.log("server listen you");
        } catch (error) {
            console.log(error);
        }
    })