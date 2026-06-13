# TaskPilot

A full-stack work track web app where you can browse, search, add, edit & view detailed task.
Built with React frontend, Express/Node backend, MongoDB, database & JWT-based authentication.

---

## Demo Link

[Live Demo](https://task-pilot-pearl.vercel.app)

##

---

## Login

> **Guest**
> Email: `guest@gmail.com`
> Password: `123456789`

---

## Quick Start

```
git clone https://github.com/rahulCode1/TaskPilot.git
cd TaskPilot
npm install
npm start
```

---

## Technologies

- React JS
- React Router
- Node JS
- Express
- MongoDB
- JWT

---

## Demo Video

Watch a walkthrough of all the major features of this app:
[Loom Video](https://drive.google.com/file/d/1qoI4RADyGYeATX_Xbaod6MILAp3Ec6TC/view?usp=sharing)

---

## Features

**Dashboard**

- Display a list of all projects & tasks.

**Projects**

- View tasks grouped via project.
- Filter & short

**Tasks**

- View all tasks
- Various filters & tasks

**Task Details**

- View full task details.
- Authenticated user can edit task.

**Team**

- Display all tasks via team.

**Report**

- Showing task report using chart.

**Setting**

- All tasks (Authenticated user can delete tasks.)
- All projects (Authenticated user can delete projects.)
- All team (Authenticated user can delete team.)

**Authentication**

- User Signup & Login with JWT
- Protected routes for add, edit, delete tasks (Only add & delete project, team).

--

## API Reference

### **GET /api/task**

List of all tasks
Sample Response:

```
[
    {
        id, name, project, ...
    }, ...
]
```

### **POST /api/task**

Add new task
Sample Response

```
{
    id, name, project, ...
}
```

### **Get /api/task/:id**

Task details
Sample Response

```
{
    id, name, project, ...
}
```

### **Patch /api/task/:id**

Edit task

### **Delete /api/task/:id**

Delete task

### **Post /api/project**

Add project
Sample response:

```
{
    id, name, description
}
```

### **Get /api/project**

Get all projects
Sample response:

```
[
    {
        id, name, description, ...
    }   , ...
]
```

### **Delete /api/project/:id**

Delete project

### **Get /api/team**

Get all team
Sample response

```
[
    {
        id, name, description, ...
    }, ...
]
```

### **Post /api/team**

Add team
Sample response

```
{
    id, name, description
}
```

### **Delete /api/team/:id**

Delete team

### **Post /api/tags**

Add tag
Sample response:

```
{
    name
}
```

### **Get /api/tags**

Get all tags
Sample response:

```
[
    {
        name
    }, ...
]
```

### **Post /api/user/signup**

Add user
Sample response:

```
{
    name, email, password
}
```

### **Post /api/user/login**

User login
Sample response:
{
userId, token
}

---

## Contact

For bugs or feature request, please reach out to rahulkumawat50665@gmail.com
