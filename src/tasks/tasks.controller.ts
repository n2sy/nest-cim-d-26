import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { TasksService } from './tasks.service.js';
import { AddTaskDto } from './DTO/addTask.dto.js';

@Controller('tasks')
export class TasksController {
  //constructor(private taskSer: TasksService) {}
  @Inject(TasksService) taskSer;

  @Get('all')
  getAllTasks() {
    let res = this.taskSer.getAllTasks();
    return { tabTasks: res };
  }

  @Get('stats')
  nbreTask(@Query('year1', ParseIntPipe) y1, @Query('year2', ParseIntPipe) y2) {
    console.log(typeof y1, typeof y2);
    let res = this.taskSer.getNbTasks(y1, y2);
    return { tabTasks: res };
  }

  @Get('search/:taskId')
  getTaskById(@Param('taskId') id) {
    let res = this.taskSer.getTaskById(id);
    return { taskRecherche: res };
  }

  @Post('add')
  addNewTask(@Body() corps: AddTaskDto) {
    console.log(corps instanceof AddTaskDto);
    let res = this.taskSer.addNewTask(corps);
    return { message: 'Task added Successfully', tabTasks: res };
  }

  @Put('edit/:id')
  updateTask(@Param('id') id, @Body() corps) {
    let res = this.taskSer.updateTask(id, corps);
    return { message: 'Task updated Successfully', tabTasks: res };
  }

  @Delete('delete/:deleteId')
  deleteTask(@Param('deleteId') id) {
    let res = this.taskSer.deleteTask(id);
    return { message: 'Task deleted Successfully', tabTasks: res };
  }
}
