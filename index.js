const { Command } = require("commander");
const program = new Command();
const fs = require("fs");
const todoFile = "./todos.json";

program
  .name("Todo-CLI")
  .description("A command based todo application")
  .version("1.0.0");
//add tasks
program
  .command("add <todo>")
  .description("add new task")

  .action((todo) => {
    const todos = getallTodo();
    todos.push({ task: todo, status: false });
    updateTodo(todos);
    console.log(`"${todo}" has been added`);
  });

//done tasks
program
  .command("done <index>")
  .description("mark as done")
  .action((index) => {
    const todos = getallTodo();
    if (index >= 0 && index < todos.length) {
      todos[index].status = true;
      updateTodo(todos);
      console.log(`Todo no: ${index} "${todos[index].task} "done`);
    } else {
      console.log("invalid index");
    }
  });

// List all tasks
program
  .command("listalltask")
  .description("list all tasks")
  .action(() => {
    const todos = getallTodo();
    todos.forEach((todos, index) => {
      const done = todos.status ? "✔" : "[ ]";
      console.log(`${index}. ${todos.task}--${done}`);
    });
  });

//delete tasks
program
  .command("delete <index>")
  .description("delete task by the index number")
  .action((index) => {
    const todos = getallTodo();
    if (index >= 0 && index < todos.length) {
      const deletetodo = todos.splice(index, 1);
      updateTodo(todos);
      console.log(`${deletetodo[0].task}:task deleted`);
    } else {
      console.log("invalid index");
    }
  });

//clearAll
program
    .command('clearAll')
    .description('Deleting all todo')
    .action(()=>{
        const todos = [];
        updateTodo(todos);
        console.log('All task deleted');
    });  

function getallTodo() {
  try {
    if (fs.existsSync(todoFile)) {
      const fileContent = fs.readFileSync(todoFile);
      return JSON.parse(fileContent.toString());
    } else {
      return [];
    }
  } catch (e) {
    console.error("Error reading file:", e);
    return [];
  }
}
function updateTodo(todos) {
  try {
    fs.writeFileSync(todoFile, JSON.stringify(todos, null, 2));
    console.log("todos updates successfully");
  } catch (e) {
    console.error("Error reading file:", e);
    return [];
  }
}
program.parse();
