# Student Management System

A CRUD application built with Angular 18 and Angular Material for managing student records. Demonstrates Angular reactive forms, component communication, service layer patterns, and Material Design UI.

## Features

- Add, view, and manage student records
- Reactive form with validation (student-form component)
- Data table with sorting and display (student-table component)
- Service layer abstracting data operations
- Angular Material UI components (table, form fields, buttons)

## Tech Stack

![Angular](https://img.shields.io/badge/Angular_18-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-757575?style=flat&logo=material-design&logoColor=white)

## Project Structure

```
src/
├── app/
│   └── app.component.ts        # Root component
├── components/
│   ├── student-form/           # Add/edit student form
│   └── student-table/          # Student records table
└── services/
    └── student.service.ts      # Data service layer
```

## Getting Started

```bash
git clone https://github.com/kartik70/student-management.git
cd student-management
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200)

## Author

[Kartik Kakad](https://github.com/kartik70)
