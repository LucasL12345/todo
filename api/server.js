const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();
	res.json(todos);
});

app.post('/todo/new', async (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	await todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	await Todo.findByIdAndDelete(req.params.id);
	res.json({ success: true });
});

app.get('/todo/complete/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
  
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      todo.complete = !todo.complete;
      await todo.save();
  
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	todo.text = req.body.text;
	await todo.save();
	res.json(todo);
});

app.listen(3001);
