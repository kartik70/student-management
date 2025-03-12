import { Component, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService, Student } from '../../services/student.service';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule, MatCheckboxModule, MatAutocompleteModule, MatCardModule, MatFormFieldModule, MatSelectModule,MatInputModule,CommonModule],
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  // List of courses available for the select/autocomplete field.
  courses: string[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  // List of skills available as checkboxes.
  availableSkills: string[] = ['Communication', 'Teamwork', 'Problem Solving', 'Leadership'];
  // Flag to check if form is in edit mode.
  editMode: boolean = false;
  editingStudentId: number | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentService) {// Use an effect to reactively populate the form when a student is selected for editing.
    effect(() => {
      const selected = this.studentService.selectedStudent;
      if (selected) {
        this.populateForm(selected);
        this.studentService.clearSelectedStudent();
      }
    });
  }

  ngOnInit(): void {
    this.initForm();


  }

  // Initialize the form with controls and validations.
  initForm() {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      course: ['', Validators.required],
      skills: this.fb.group(
        this.availableSkills.reduce((acc, skill) => {
          acc[skill] = [false];
          return acc;
        }, {} as { [key: string]: any })
      ),
      address: [''] // Additional details as a textarea.
    });
  }

  // Extract the list of selected skills from the form.
  getSelectedSkills(): string[] {
    const skillsGroup = this.studentForm.get('skills')?.value;
    return Object.keys(skillsGroup).filter(skill => skillsGroup[skill]);
  }

  // Handle the form submission to add or update a student.
  onSubmit() {
    if (this.studentForm.invalid) {
      return;
    }
    // Build the student object from the form values.
    const student: Student = {
      id: this.editMode && this.editingStudentId ? this.editingStudentId : new Date().getTime(),
      name: this.studentForm.value.name,
      age: this.studentForm.value.age,
      gender: this.studentForm.value.gender,
      course: this.studentForm.value.course,
      skills: this.getSelectedSkills(),
      address: this.studentForm.value.address
    };

    if (this.editMode) {
      // Update the existing student.
      this.studentService.updateStudent(student);
      this.editMode = false;
      this.editingStudentId = null;
    } else {
      // Add the new student.
      this.studentService.addStudent(student);
    }
    // Reset and reinitialize the form after submission.
    this.studentForm.reset();
    this.initForm();
  }

  // Populate the form with the selected student’s details for editing.
  populateForm(student: Student) {
    this.editMode = true;
    this.editingStudentId = student.id;
    // Build an object for the skills checkboxes.
    const skillsGroup: any = {};
    this.availableSkills.forEach(skill => {
      skillsGroup[skill] = student.skills.includes(skill);
    });
    this.studentForm.patchValue({
      name: student.name,
      age: student.age,
      gender: student.gender,
      course: student.course,
      address: student.address,
      skills: skillsGroup
    });
  }
}
