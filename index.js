const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
	defaultlayout: 'main',
	extname: 'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use(todoRoutes)

async function start(){
	try{
		await mongoose.connect('mongodb+srv://gundorovnikita:1q2w3e4r@cluster0-bl48a.mongodb.net/todos',{
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})
		app.listen(PORT, ()=>{
			console.log("start")
		})
	} catch(e){
		console.log(e)
	}
}

start()