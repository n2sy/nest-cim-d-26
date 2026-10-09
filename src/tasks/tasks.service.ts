import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './models/task.model.js';

@Injectable()
export class TasksService {
  allTasks: Task[] = [
    {
      id: '1',
      title: 'Project 0',
      status: 'todo',
      year: 2025,
      createdAt: new Date(2024, 5, 6),
    },
    {
      id: '2',
      title: 'Project 1',
      status: 'done',
      year: 2025,
      createdAt: new Date(2024, 2, 3),
    },
    {
      id: '3',
      title: 'Project 1',
      status: 'in progress',
      year: 2026,
      createdAt: new Date(2025, 11, 10),
    },
  ];

  getNbTasks(y1, y2) {
    return this.allTasks.filter((task) => task.year >= y1 && task.year <= y2);
  }

  getAllTasks() {
    return this.allTasks;
  }

  getTaskById(taskId) {
    let selectedTask = this.allTasks.find((task) => task.id == taskId);
    if (!selectedTask) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
  }

  addNewTask(task) {
    let newTask = new Task(
      crypto.randomUUID(),
      task.title,
      task.year,
      task.status,
      new Date(),
    );
    this.allTasks.push(newTask);
    return this.allTasks;
  }

  updateTask(taskId, uTask) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);
    this.allTasks[i] = {
      id: taskId,
      //   title: uTask.title,
      //   year: uTask.year,
      //   status: uTask.status,
      ...uTask,
      createdAt: this.allTasks[i].createdAt,
    };
    return this.allTasks;
  }

  deleteTask(taskId) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);

    this.allTasks.splice(i, 1);
    return this.allTasks;
  }
}
