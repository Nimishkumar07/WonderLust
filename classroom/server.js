// This Directory is not a part of WonderLust

const express = require("express")
const app = express()
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

// const cookieParser = require("cookie-parser")

// app.use(cookieParser("secretcode"))

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true})
//     res.send("signed cookie sent")
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies)
//     res.send("verified")
// })

// app.get("/",(req,res)=>{
//      console.dir(req.cookies)
//     res.send("Hi, I am root")
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello")
//     res.cookie("madeIn", "India")
//     res.send("sent you some cookies")
// })

// app.get("/greet",(req,res)=>{
//     let {name="anynomous"} = req.cookies
//     res.send(`Hi, ${name}`)
// })
// app.get("/users", (req,res)=>{
//     res.send("Hi, I am user")
// })

// app.get("/post", (req,res)=>{
//     res.send("This is a post")
// })

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
}   

app.use(session(sessionOptions))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success")
    res.locals.errorMsg = req.flash("error")
    next();
})

app.get("/register", (req,res)=>{
    let { name = "anonymous"} = req.query
    req.session.name = name
    if(name==="anonymous"){
        req.flash("error","user not registered")
    }else{
        req.flash("success","user registered succesfully")
    }
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name})
})

app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    } else{
        req.session.count = 1
    }
    res.send(`you sent a request ${req.session.count} times`)
})

app.get("/test",(req,res)=>{
    res.send("test succesfull!")
})

app.listen(3000,()=>{
    console.log("server is listening to 3000")
})