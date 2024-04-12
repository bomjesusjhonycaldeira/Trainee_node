import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { FindAllParameters, TaskDto, TaskRouteParameters } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() Task: TaskDto): Promise<TaskDto> {
    console.log('post');
    return await this.taskService.create(Task);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    console.log('GET');
    return await this.taskService.findAll(params);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.findById(id);
  }
  
  @Patch('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    await this.taskService.update(params.id, task);
  }

  @Delete('/:id')
  remove(@Param() params: TaskRouteParameters,) {
    return this.taskService.remove(params.id);
  }
}
