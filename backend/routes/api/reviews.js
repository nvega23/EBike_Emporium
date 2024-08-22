const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');
const { requireUser } = require('../../config/passport');
const validateReviewInput = require('../../validations/reviews');

const Review = require('../../models/Review');
const User = require('../../models/User');
const Post = require('../../models/Post');

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
    };
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
            if (!user) {
                return res.status(404).json({ nouserfound: 'No user found with that ID' });
            }
            Review.find({ reviewee: user.id })
                .then(reviews => {
                    res.json(formatReviews(reviews));
                })
                .catch(err => {
                    console.error('Error fetching reviews:', err);
                    res.status(500).json({ error: 'Error fetching reviews' });
                });
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.status(404).json({ nouserfound: 'No user found with that ID' });
        });
});

router.get('/post/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ nopostfound: 'No post found with that ID' });
            }
            Review.find({ post: post.id })
                .then(reviews => {
                    res.json(formatReviews(reviews));
                })
                .catch(err => {
                    console.error('Error fetching reviews:', err);
                    res.status(500).json({ error: 'Error fetching reviews' });
                });
        })
        .catch(err => {
            console.error('Error finding post:', err);
            res.status(404).json({ nopostfound: 'No post found with that ID' });
        });
});

router.get('/review/:reviewId', (req, res) => {
    Review.findById(req.params.reviewId)
        .then(review => {
            if (!review) {
                return res.status(404).json({ noreviewfound: 'No review found with that ID' });
            }
            res.json(formatReview(review));
        })
        .catch(err => {
            console.error('Error fetching review:', err);
            res.status(500).json({ error: 'Error fetching review' });
        });
});

// Create review
router.post('/:postId/:userId', requireUser, validateReviewInput, async (req, res, next) => {
    try {
        const newReview = new Review({
            reviewee: req.params.userId,
            reviewer: req.user.id,
            post: req.params.postId,
            title: req.body.title,
            body: req.body.body,
            rating: req.body.rating
        });

        let review = await newReview.save();

        review = await review.populate("reviewer", "_id username");
        review = await review.populate("post", "_id body author");

        return res.json(review);
    } catch (err) {
        console.error('Error saving review:', err);
        const error = new Error("Something went wrong");
        error.statusCode = 500;
        error.errors = { message: "Something went wrong saving" };
        return next(error);
    }
});

// Update review
router.patch('/:id', requireUser, validateReviewInput, async (req, res, next) => {
    try {
        let review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ noreviewfound: 'No review found with that ID' });
        }
        review.title = req.body.title;
        review.body = req.body.body;
        review.rating = req.body.rating;
        await review.save();
        res.json(formatReview(review));
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ error: 'Error updating review' });
    }
});

// Delete review
router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ noreviewfound: 'No review found with that ID' });
        }
        await review.deleteOne();
        res.json({ msg: 'Review removed' });
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ error: 'Error deleting review' });
    }
});

module.exports = router;
