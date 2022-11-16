import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  createTodo() {
    return this.todoService.createTodo();
  }

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') todoId: number) {
    return this.todoService.getTodoById(todoId);
  }

  @Patch(':id')
  editTodoById(@Param('id') todoId: number) {
    return this.todoService.editTodoById(todoId);
  }

  @Delete(':id')
  deleteTodoById(@Param('id') todoId: number) {
    return this.todoService.deleteTodoById(todoId);
  }
}
