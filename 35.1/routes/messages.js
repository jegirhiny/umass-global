const Router = require("express").Router;
const Message = require("../models/message");
const { ensureLoggedIn, authenticateJWT } = require("../middleware/auth");

const router = new Router();

router.use(authenticateJWT);

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    let message = await Message.get(req.params.id);

    if (
      ![message.from_user.username, message.to_user.username].includes(
        req.user.username
      )
    ) {
      return next({ status: 401, message: "Unauthorized" });
    }

    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    let { to_username, body } = req.body;
    let from_username = req.user.username;
    let message = await Message.create({ from_username, to_username, body });
    
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
  try {
    let message = await Message.get(req.params.id);

    if (req.user.username !== message.to_user.username) {
      return next({ status: 401, message: "Unauthorized" });
    }
    
    let updatedMessage = await Message.markRead(req.params.id);
    return res.json({ message: updatedMessage });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
