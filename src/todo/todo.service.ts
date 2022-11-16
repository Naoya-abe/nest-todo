import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  createTodo() {
    return 'createTodo';
  }

  getTodos() {
    return 'getTodos';
  }

  getTodoById(todoId: number) {
    return `getTodoById:${todoId}`;
  }

  editTodoById(todoId: number) {
    return `editTodoById:${todoId}`;
  }

  deleteTodoById(todoId: number) {
    return `deleteTodoById:${todoId}`;
  }
}
