import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { CreateTodoDto, EditTodoDto } from '../src/todo/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(8080);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:8080');
  });

  afterAll(() => {
    app.close();
  });

  describe('Todo', () => {
    describe('Get empty todos', () => {
      it('should get empty todos', () => {
        return pactum.spec().get('/todos').expectStatus(200).expectBody([]);
      });
    });
    describe('Create todo', () => {
      it('should create todo', () => {
        const dto: CreateTodoDto = { title: 'Todo1' };
        return pactum
          .spec()
          .post('/todos')
          .withBody(dto)
          .expectStatus(201)
          .expectBodyContains(dto.title)
          .stores('todoId', 'id');
      });
    });
    describe('Get todos', () => {
      it('should get todos', () => {
        return pactum
          .spec()
          .get('/todos')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get todo by id', () => {
      it('should get a todo by id', () => {
        return pactum
          .spec()
          .get('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .expectStatus(200)
          .expectBodyContains('$S{todoId}');
      });
    });
    describe('Edit todo by id', () => {
      it('should edit a todo by id', () => {
        const dto: EditTodoDto = {
          title: 'Todo1.1',
          description: 'Todo1の続き',
        };
        return pactum
          .spec()
          .patch('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains('$S{todoId}')
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description);
      });
    });
    describe('Delete todo by id', () => {
      it('should delete a todo by id', () => {
        return pactum
          .spec()
          .delete('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .expectStatus(200)
          .expectBodyContains('$S{todoId}');
      });
    });
  });
});
