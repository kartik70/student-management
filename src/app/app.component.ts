import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { StudentFormComponent } from '../components/student-form/student-form.component';
import { StudentTableComponent } from '../components/student-table/student-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule, StudentFormComponent, StudentTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-management';
}
