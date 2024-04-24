# Task Manager API

This is a simple Task Manager API built with Node.js. It allows you to manage tasks with the following operations:

## Endpoints

### POST /tasks

Create a new task.

**Request Body:**
- `title` (string): The title of the task.
- `description` (string): The description of the task.
- `completed` (boolean): The completion status of the task.

### GET /tasks

Get all tasks.

**Response:**
- An array of task objects.

### GET /tasks/:id

Get a task by its ID.

**Path Parameters:**
- `id` (string): The ID of the task.

**Response:**
- A task object.

### DELETE /tasks/:id

Delete a task by its ID.

**Path Parameters:**
- `id` (string): The ID of the task.

### PUT /tasks/:id

Update a task by its ID.

**Path Parameters:**
- `id` (string): The ID of the task.

**Request Body:**
- `title` (string): The new title of the task.
- `description` (string): The new description of the task.
- `completed` (boolean): The new completion status of the task.

## Running the API

To run the API, first install the dependencies with `npm install`. Then, start the server with `node app.js`.

## Testing

To run the tests, use the command `npm run test`.
