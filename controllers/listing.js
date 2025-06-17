const Listing = require("../models/listing")

//index route
module.exports.index = async (req,res)=>{
    const allListing = await Listing.find()
    res.render("listings/index.ejs", {allListing})
}

//new route
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
}

//create route
module.exports.createListing = async (req,res)=>{
    let url = req.file.path
    let filename = req.file.filename
    // let {title, description, image, price, location, country} = req.params
    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    newListing.image = {url,filename}
    await newListing.save()
    req.flash("success","New Listing Created ! ")
    res.redirect("/listings")
}

//show route
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner") // nested populate for author
    if(!listing){
        req.flash("error","Listing does not Exist!")
        res.redirect("/listings")
    }
   res.render("listings/show.ejs", {listing})
}

//edit route
module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
      if(!listing){
        req.flash("error","Listing does not Exist!")
        res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
   res.render("listings/edit.ejs", {listing, originalImageUrl})
}

//update route
module.exports.updateListing = async(req,res)=>{
   
    let {id} = req.params
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.path
        listing.image = {url,filename}
        await listing.save()
    }
    req.flash("success"," Listing Updated ! ")
    res.redirect(`/listings/${id}`)
}

//delete route
module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params
   let deletedListings = await Listing.findByIdAndDelete(id)
   console.log(deletedListings)
   req.flash("success"," Listing Deleted ! ")
    res.redirect("/listings")
}