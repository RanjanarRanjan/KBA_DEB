import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './student.dto';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  // Create Student
  async create(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.studentModel.findOne({ s_id: createStudentDto.s_id });
    if (existingStudent) {
      throw new ConflictException(`Student with ID ${createStudentDto.s_id} already exists`);
    }

    const newStudent = new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  // Get All Students
  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  // Get Student by ID
  async getStudentById(s_id: string): Promise<Student> {
    const student = await this.studentModel.findOne({ s_id }).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${s_id} not found`);
    }
    return student;
  }
  
  
  // Delete Student
  async deleteStudent(s_id: string): Promise<{ message: string }> {
    const result = await this.studentModel.deleteOne({ s_id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Student with ID ${s_id} not found`);
    }
    return { message: 'Student deleted successfully' };
  }  
 
  async updateStudent(s_id: string, updateStudentDto: CreateStudentDto): Promise<Student> {
    const student = await this.studentModel.findOne({ s_id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${s_id} not found`);
    }
    // Check if s_id is being changed to an existing s_id
    if (updateStudentDto.s_id && updateStudentDto.s_id !== student.s_id) {
      const existingStudent = await this.studentModel.findOne({ s_id: updateStudentDto.s_id });
      if (existingStudent) {
        throw new ConflictException(`Student with ID ${updateStudentDto.s_id} already exists`);
      }
    }
    Object.assign(student, updateStudentDto);
    return student.save();
  }

  async getStudentsByDepartment(department: string) {
    return this.studentModel.find({ department });
  }
}
