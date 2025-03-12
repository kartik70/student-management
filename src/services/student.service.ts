import { Injectable, signal } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  course: string;
  skills: string[];
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // Signal to store the list of students
  private _students = signal<Student[]>([]);
  // Signal to hold the selected student for editing
  private _selectedStudent = signal<Student | null>(null);

  // Getter to retrieve the current list of students
  get students() {
    return this._students();
  }

  // Getter to retrieve the selected student
  get selectedStudent() {
    return this._selectedStudent();
  }

  // Add a new student to the list
  addStudent(student: Student) {
    const currentStudents = this._students();
    this._students.set([...currentStudents, student]);
  }

  // Update an existing student
  updateStudent(updatedStudent: Student) {
    const updatedStudents = this._students().map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    this._students.set(updatedStudents);
  }

  // Delete a student by id
  deleteStudent(id: number) {
    const filteredStudents = this._students().filter(student => student.id !== id);
    this._students.set(filteredStudents);
  }

  // Set the selected student for editing
  setSelectedStudent(student: Student) {
    this._selectedStudent.set(student);
  }

  // Clear the selected student
  clearSelectedStudent() {
    this._selectedStudent.set(null);
  }
}
