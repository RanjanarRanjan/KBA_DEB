import { Controller, Post, Body, UploadedFile, UseInterceptors, UseGuards, Get, Param, Delete, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentService } from './student.service';
import { CreateStudentDto } from './student.dto';
import { AuthGuard } from '@nestjs/passport';
import * as multer from 'multer';

@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Add Student
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: multer.memoryStorage() }))
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const base64Image = file?.buffer.toString('base64');
    return this.studentService.create({
      ...createStudentDto,
      image: base64Image,
    });
  }

  // Get All Students
  @Get('all')
  async findAll() {
    return this.studentService.findAll();
  }
@Get(':s_id')
async getStudentById(@Param('s_id') s_id: string) {
  return this.studentService.getStudentById(s_id);
}

  //  Delete Student
  @Delete(':s_id')
  async deleteStudent(@Param('s_id') s_id: string) {
    return this.studentService.deleteStudent(s_id);
  }
 
  @Put(':s_id')
@UseInterceptors(FileInterceptor('image', { storage: multer.memoryStorage() }))
async updateStudent(
  @Param('s_id') s_id: string,
  @Body() updateStudentDto: CreateStudentDto,
  @UploadedFile() file: Express.Multer.File,
) {
  const base64Image = file?.buffer.toString('base64');
  return this.studentService.updateStudent(s_id, {
    ...updateStudentDto,
    image: base64Image,
  });
}

// Get Students by Department
@Get('department/:department')
async getStudentsByDepartment(@Param('department') department: string) {
  return this.studentService.getStudentsByDepartment(department);
}
}
