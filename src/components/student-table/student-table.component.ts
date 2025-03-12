import { Component, OnInit, effect } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  // Local student list (kept in sync with the service signal)
  students: Student[] = [];
  // Define the columns for the Angular Material table.
  displayedColumns: string[] = ['id', 'name', 'age', 'gender', 'course', 'skills', 'address', 'actions'];

  constructor(private studentService: StudentService) {
    // Use an effect so that changes in the student list signal automatically update this.students.
    effect(() => {
      this.students = this.studentService.students;
    });
  }

  ngOnInit(): void {
    

  }

  // Delete a student based on the given id.
  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
  }

  // Trigger editing by setting the selected student in the service.
  editStudent(student: Student) {
    this.studentService.setSelectedStudent(student);
    // Scroll to top to show the form.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
