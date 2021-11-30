const express = require('express');
const router = express.Router();
const {Comment, validate, validateComment} = require('../models/comment');


router.get('/', async (req, res) => {
    try {
        const comment = await Comment.find();
        return res.send(comment);
    } catch (ex) { 
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:productId', async (req, res) => {
    try {

        const comment = await Comment.find(req.params.id);

        if (!comment)
            return res.status(400).send(`The comments with the id "${req.params.id}" does not exist.`);

            return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {

        const { error } = Comment(req.body);
        if (error)
        return res.status(400).send(error);

        const comment = new Comment ({
            text: req.body.text,
            // productId: req.body.productId,
            
        });

        await comment.save();

        return res.send(comment);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment)
            return res.status(400).send(`The comments with the id "${req.params.id}" does not exist.`);
        
        const reply = new Reply({
            text: req.body.text
         });


         comment.replies.push(reply);

         await comment.save();

         return res.send(comment);
         
    } catch (ex) {
        return res.send(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = Comment(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
                productId: req.body.productId
            }
        );

        if (!comment)
            return res.send(400).send(`The comment with the id: "${req.params.id}" does not exist`);

            await comment.save();

            return res.send(comment)
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id/dislikes', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
            if (comment)
            {

                comment.dislikes+= 1;
            }

        await comment.save();

        return res.send(comment)
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id/likes', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
            if (comment)
            {

                comment.likes+= 1;
            }

        await comment.save();

        return res.send(comment)
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const comment = await Comment.findOneAndRemove(req.params.id);

        if (!comment)
            return res.status(400).send(`The comments with the id: "${req.params.id}" does not exist`);

            return res.send(comment);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



module.exports = router;