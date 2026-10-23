import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { TasksModule } from './tasks/tasks.module.js';
import { BooksModule } from './books/books.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger/logger.middleware.js';
import { DecryptMiddleware } from './decrypt/decrypt.middleware.js';
import { AuthModule } from './auth/auth.module.js';

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
        AuthModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware)
        //     .forRoutes('tasks/*');
        consumer.apply(DecryptMiddleware,
            LoggerMiddleware)
            .forRoutes(
                {
                    path: "tasks/*",
                    method: RequestMethod.GET
                }
            );


    }
}
