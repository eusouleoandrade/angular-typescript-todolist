import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title : string = "Todo List - Making your life easier";
  public todos : Todo[] = [];
  public form: FormGroup;
  public formVisible : boolean = false;

  constructor(private fb: FormBuilder) {
    
    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(60), Validators.required])]
    });
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;

    this.todos.push(new Todo(id, title, false));

    this.clearForm();
  }

  clearForm(){
    this.form.reset();
    this.formVisible = false;
  }

  remove(todo : Todo){
    const index = this.todos.indexOf(todo);

    if(index !== -1){
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo : Todo){
    todo.done = true;
  }

  markAsUnDone(todo : Todo){
    todo.done = false;
  }
}