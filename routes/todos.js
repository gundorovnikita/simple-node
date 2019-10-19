const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/',async(req,res)=>{
	const todos = await Todo.find({})
	res.render('index', { 
		title: 'index' ,
		todos
	});
})
router.get('/post/:name',async(req,res)=>{
	const todos = await Todo.findOne({title:req.params.name});
	res.render('detail', { 
		title: 'detail' ,
		todos,
	});
})

router.get('/create',(req,res)=>{
	res.render('create', { title: 'create' });
})

router.post('/create',async(req,res)=>{
	const todo = new Todo({
		title: req.body.title
	})
	await todo.save()
	res.redirect('/')
})

router.post('/complete', async(req,res)=>{
	const todo = await Todo.findById(req.body.id)
	await todo.delete()
	res.redirect('/')
})

module.exports = router