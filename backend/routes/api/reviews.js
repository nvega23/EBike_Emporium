const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');
const { requireUser } = require('../../config/passport');
const validateReviewInput = require('../../validations/reviews');

const Review = require('../../models/Review');
const User = require('../../models/User');


function formatReview(review) {
    return {
        title: review.title,
        postedAt: review.createdAt,
        rating: review.rating,
        reviewee: review.reviewee._id,
        reviewer: review.reviewer._id,
        post: review.post,
        body: review.body,
        username: review.reviewer.username,
        id: review.id
    }
}

function formatReviews(reviews) {
    let returnData = {};
    reviews.forEach((review) => {
        returnData[review.id] = formatReview(review);
    });
    return returnData;
}




router.get('/user/:userId', (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        Review.find({ reviewee: user.id})
        .then(reviews => {
            res.json(formatReviews(reviews));
        });
    }).catch(err => res.status(404).json({ nouserfound: 'No user found with that ID'}))
});


router.get('/post/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            Review.find({ post: post.id })
                .then(reviews => {
                    res.json(formatReviews(reviews));
                });
        }).catch(err => res.status(404).json({ nouserfound: 'No post found with that ID' }))
});


router.get('/review/:reviewId', (req, res) => {

    Review.findById(req.params.reviewId)
        .then(review => {
            res.json(formatReview(review))
        }).catch(err => res.status(404).json({ noreviewfound: 'no review found with that ID' }))
})






//create review
router.post('/:postId/:userId', requireUser, validateReviewInput, async (req, res, next)=> {

    try {
        // reviewer: req.user.id,

        const newReview = new Review({
            reviewee: req.params.userId,
            reviewer: req.user.id,
            post: req.params.postId,
            title: req.body.title,
            body: req.body.body,
            rating: req.body.rating
        });

        let review = await newReview.save();

        review = await review.populate("reviewer", "_id username")
        review = await review.populate("post", "_id body author")

        return res.json(review)
    }
    catch (err) {
        const error = new Error("Something went wrong");
        error.statusCode = 404;
        error.errors = {message: "Something went wrong saving"};
        return next(error)
    }
})

router.patch('/:id', requireUser, validateReviewInput, async(req, res, next)=>{
    try{
        let review = await Review.findById(req.params.id)


    //     if (review.reviewer.toString() !== req.user.id.toString()) {
    //         res.status().json({ notowned: 'Current user does not own this review' })
    // } else {
        review.title = req.body.title;
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.save()
        //let newreview = await review.save();

        // return res.json(newreview);
    //}
    }
    catch (err){
        const error = new Error("Something went wrong");
        error.statusCode = 404;
        error.errors = {message: "Something went wrong saving"};
        return res.status(400).json(error);
}})

router.delete('/:id', requireUser, async(req, res, next)=>{
    try{
        // const posts = await Post.findById(req.params.id);
        const review = await Review.findById(req.params.id);
        // const user = await User.findById(req.params.id);
        //sf
        review.remove()

        res.json({ msg: 'Review removed' });
    }
    catch (err){
        const error = new Error("Something went wrong");
        error.statusCode = 404;
        error.errors = {message: "Something went wrong saving"};
        return res.status(400).json(error);
}})

module.exports = router;




