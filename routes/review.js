const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js")

//Post review route
router.post("/", validateReview, isLoggedIn,wrapAsync(reviewController.createReview))

//Post review delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports = router