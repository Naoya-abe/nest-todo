import { Injectable } from '@nestjs/common';
import { domainToASCII } from 'url';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, EditTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async createTodo(dto: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
    return todo;
  }

  async getTodos() {
    const todos = this.prisma.todo.findMany();
    return todos;
  }

  async getTodoById(todoId: number) {
    const todo = this.prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    return todo;
  }

  async editTodoById(todoId: number, dto: EditTodoDto) {
    const updatedTodo = await this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
    return updatedTodo;
  }

  async deleteTodoById(todoId: number) {
    await this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    return todoId;
  }
}
