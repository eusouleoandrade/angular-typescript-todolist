import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { TodoApiResponse } from 'src/responses/todoApi.response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = "Todo List | My tasks";
  public todos: Todo[] = [];
  public form: FormGroup;
  public mode: string = "list";

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(60), Validators.required])]
    });

    this.getTodos();
  }

  public add() {
    const title = this.form.controls['title'].value;
    let todo = new Todo(title, false);

    this.todoService.postTodo(todo).subscribe(() => {
      this.todos.push(todo);
      this.clearForm();
      this.mode = "list";
      this.getTodos();
    });
  }

  public clearForm() {
    this.form.reset();
  }

  public remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todoService.deleteTodo(todo).subscribe(() => {
        this.todos.splice(index, 1);
      });
    }
  }

  public markAsDone(todo: Todo) {
    todo.done = true;
    this.todoService.updateTodo(todo).subscribe();
  }

  public markAsUndone(todo: Todo) {
    todo.done = false;
    this.todoService.updateTodo(todo).subscribe();
  }

  public changeScreenMode(mode: string) {
    this.mode = mode;
  }

  public getTodos() {
    this.todoService.getTodos().subscribe((todoApiResponse: TodoApiResponse) => {
      this.todos = todoApiResponse.data;
    });
  }

  public update(todo : Todo){
  }
}