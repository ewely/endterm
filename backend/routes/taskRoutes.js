const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/taskController");

router.post("/", auth, ctrl.createTask);
router.get("/", auth, ctrl.getTasks);
router.put("/:id", auth, ctrl.updateTask);
router.delete("/:id", auth, ctrl.deleteTask);
router.post("/:id/comments", auth, ctrl.addComment);
router.get("/stats/by-project", auth, ctrl.taskStatsByProject);

module.exports = router;
