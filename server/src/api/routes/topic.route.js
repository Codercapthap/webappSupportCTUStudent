const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const passport = require('passport');
const passportConfig = require('../middlewares/passport');
const { authPost, authRole } = require('../middlewares/authorization');
const { validateBody, schemas, validateParam } = require('../validations/validate');

// get tất cả topic theo department id
router.get('/department/:id', topicController.getAllTopicsOfDepartmentId);

// xóa vĩnh viễn topic theo id
router.delete(
   '/:id/destroy',
   validateParam(schemas.idSchema, 'id'),
   passport.authenticate('jwt', { session: false }),
   authRole(['moderator', 'admin']),
   topicController.destroyTopicById
);

router.patch(
   '/:id/restore',
   validateParam(schemas.idSchema, 'id'),
   passport.authenticate('jwt', { session: false }),
   authRole(['moderator', 'admin']),
   topicController.restoreTopicById
);

router
   .route('/:id')
   .put(
      validateParam(schemas.idSchema, 'id'),
      validateBody(schemas.topicUpdateSchema),
      passport.authenticate('jwt', { session: false }),
      authRole(['moderator', 'admin']),
      topicController.updateTopicById
   )
   // xóa mềm topic
   .delete(
      validateParam(schemas.idSchema, 'id'),
      passport.authenticate('jwt', { session: false }),
      authRole(['moderator', 'admin']),
      topicController.deleteTopicById
   );

router.post(
   '/',
   validateBody(schemas.topicSchema),
   passport.authenticate('jwt', { session: false }),
   authRole(['moderator', 'admin']),
   topicController.createTopic
);

module.exports = router;
