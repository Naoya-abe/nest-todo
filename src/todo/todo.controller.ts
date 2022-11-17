import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto, EditTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id', ParseIntPipe) todoId: number) {
    return this.todoService.getTodoById(todoId);
  }

  @Patch(':id')
  editTodoById(
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: EditTodoDto,
  ) {
    return this.todoService.editTodoById(todoId, dto);
  }

  @Delete(':id')
  deleteTodoById(@Param('id', ParseIntPipe) todoId: number) {
    return this.todoService.deleteTodoById(todoId);
  }
}
