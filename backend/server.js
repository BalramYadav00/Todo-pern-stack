const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes

// Create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newtodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newtodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get all todo4

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT  * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM TODO WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// update a todo

app.put("/todos/:id", async(req, res) => {
    try {

        const {id} =  req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Updated!"); 
    } catch (err) {
        console.log(err.message);
    }
})

// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted!");
    } catch(err){
        console.log(err);
    }
})

app.listen(5000, () => {
  console.log("server is running on 5000");
});
