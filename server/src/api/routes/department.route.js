const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authAccount, authRole } = require("../middlewares/authorization");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../validations/validate");

router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(
    validateBody(schemas.departmentSchema),
    passport.authenticate("jwt", { session: false }),
    authRole("admin"),
    departmentController.createDepartment
  );

// router
//   .route("/:id")
//   .put(auth, departmentController.updateDepartment) // admin of department
//   .delete(auth, departmentController.deleteDepartment); // delete all topic, post, comment, document, image

module.exports = router;