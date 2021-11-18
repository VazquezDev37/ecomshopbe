const router = require("express").Router();

//FIND USER BY ID
router.put("/:id", async (req, res) => {

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

//DELETE USER
router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user)
        return res
          .status(400)
          .send(`The user with id “${id.params.id}” does not exist`);
      return res.send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });




module.exports = router