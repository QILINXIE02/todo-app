import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

const todos = [
  { id: uuidv4(), itemtodo: 'Task 1', complete: false },
  { id: uuidv4(), itemtodo: 'Task 2', complete: true },
  { id: uuidv4(), itemtodo: 'Task 3', complete: false },
];

const server = setupServer(
  rest.post('/login', (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
      return res(
        ctx.json({
          token: 'mocked_token',
          user: { username: 'user', role: 'user' },
        })
      );
    } else {
      return res(ctx.status(401));
    }
  }),
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.json(todos));
  }),
  rest.post('/todos', (req, res, ctx) => {
    const newTodo = { ...req.body, id: uuidv4(), complete: false };
    todos.push(newTodo);
    return res(ctx.json(newTodo));
  }),
  rest.put('/todos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...req.body };
      return res(ctx.json(todos[index]));
    } else {
      return res(ctx.status(404));
    }
  }),
  rest.delete('/todos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const deletedTodo = todos.splice(index, 1)[0];
      return res(ctx.json(deletedTodo));
    } else {
      return res(ctx.status(404));
    }
  })
);

export { server, rest };
