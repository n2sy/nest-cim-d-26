import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { TasksModule } from './tasks/tasks.module.js';
import { BooksModule } from './books/books.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cim26d',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
