import { Component,EventEmitter,Output,inject,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type AddTaskModel } from './add-task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Input({required:true}) userId!:string
  @Output() closeDialog = new EventEmitter<void>()

  private taskService = inject(TaskService)
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDate = signal('');
  enteredTitle ='';
  enteredSummary = '';
  enteredDate = '';

  onSubmit() {
    this.taskService.addingTask({title:this.enteredTitle,summary:this.enteredSummary,date:this.enteredDate},this.userId)
    this.closeDialog.emit()
  }

  onClosingDialog(){
    this.closeDialog.emit()
  }
}
