import { Component,EventEmitter,Output,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type AddTaskModel } from './add-task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Output() closeDialog = new EventEmitter<void>()
  @Output() submitForm = new EventEmitter<AddTaskModel>()

  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDate = signal('');
  enteredTitle ='';
  enteredSummary = '';
  enteredDate = '';

  onSubmit() {
    this.submitForm.emit({title:this.enteredTitle,summary:this.enteredSummary,date:this.enteredDate})
  }

  onClosingDialog(){
    this.closeDialog.emit()
  }
}
