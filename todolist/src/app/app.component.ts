import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title : string = "Todo List - Making your life easier";
  public todos : Todo[] = [];

  constructor() {
    this.todos.push(new Todo(1, 'Tarefa exemplo', false));
  }
}
