const express = require('express');

const router = express.Router();

const { CreateBlog ,UpdateBlog ,DeleteBlog ,GetBlogsbyModules,GetBlogsbyModulesandCategory ,GetBlogsbyid} =require('../Controllers/Blog');

router.post('/create-blog',CreateBlog);
router.post('/update-blog',UpdateBlog);
router.post('/delete-blog',DeleteBlog);
router.get('/get-blog-by-modules/:moduleName',GetBlogsbyModules);
router.get('/get-blog-by-modules-and-category/:moduleName/:subType',GetBlogsbyModulesandCategory);
router.get('/get-blog-by-id/:id',GetBlogsbyid);



module.exports = router ;