import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  createTodo(dto: CreateTodoDto) {
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
