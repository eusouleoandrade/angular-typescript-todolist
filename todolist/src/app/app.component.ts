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

  public title: string = "..... Todo List .....";
  public todos: Todo[] = [];
  public form: FormGroup;
  public screenMode: string = "list"; // list, edit, add
  private todo = {} as Todo;

  constructor(private fb: FormBuilder, private todoService: TodoService) {

    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(60), Validators.required])]
    });
  }

  ngOnInit() {

    this.getTodos();
  }

  // Get all
  public getTodos() {

    this.todoService.getTodos().subscribe((todoApiResponse: TodoApiResponse) => {
      this.todos = todoApiResponse.data;
      
      // Order by id
      this.todos.sort((a, b) => {
        return a.id - b.id;
      });
    });
  }

  // Save - Add or Update
  public saveTodo() {

    const title = this.form.controls['title'].value;

    if (this.todo.id === undefined) {

      this.todo.title = title;
      this.todo.done = false;

      this.todoService.postTodo(this.todo).subscribe(() => {
        this.cleanForm();
      });
    } else {

      this.todo.title = title;

      this.todoService.updateTodo(this.todo).subscribe(() => {
        this.cleanForm();
      });
    }
  }

  // Delete todo
  public deleteTodo(todo: Todo) {

    this.todoService.deleteTodo(todo).subscribe(() => {
      this.getTodos();
    });
  }

  // Clean Form
  public cleanForm() {

    this.getTodos();
    this.form.reset();
    this.todo = {} as Todo;
    this.screenMode = "list";
  }

  // Change screen mode
  public changeScreenMode(mode: string) {
    this.screenMode = mode;
  }

  // Set Done
  public markAsDone(todo: Todo) {

    todo.done = true;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.getTodos();
    });
  }

  // Set Undone
  public markAsUndone(todo: Todo) {

    todo.done = false;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.getTodos();
    });
  }

  // Edit todo
  public editTodo(todo: Todo) {

    this.todo.id = todo.id;
    this.todo.title = todo.title;
    this.todo.done = todo.done;

    this.form.controls['title'].setValue(todo.title);
    this.screenMode = 'edit';
  }
}