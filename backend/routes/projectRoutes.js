const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/projectController");

router.post("/", auth, ctrl.createProject);
router.get("/", auth, ctrl.getProjects);
router.put("/:id", auth, ctrl.updateProject);
router.delete("/:id", auth, ctrl.deleteProject);

module.exports = router;
