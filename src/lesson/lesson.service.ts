import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id: id } });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name: createLessonInput.name,
      startDate: createLessonInput.startDate,
      endDate: createLessonInput.endDate,
    });
    return this.lessonRepository.save(lesson);
  }
}
