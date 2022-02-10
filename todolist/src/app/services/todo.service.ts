import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Todo } from 'src/models/todo.model';
import { TodoApiResponse } from 'src/responses/todoApi.response';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Set url
  private readonly url: string = 'https://localhost:5001/api/todo';

  public todos: Todo[] = [];

  // Headers
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Dependecy inject HttpClient
  constructor(private httpClient: HttpClient) {
  }

  // GetTodoList
  public getTodos(): Observable<TodoApiResponse> {

    return this.httpClient.get<TodoApiResponse>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // GetTodoById
  public getTodoById(id: number): Observable<Todo> {

    return this.httpClient.get<Todo>(this.url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  // PostTodo
  public postTodo(todo: Todo): Observable<Todo> {

    return this.httpClient.post<Todo>(this.url, JSON.stringify(todo), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // PutTodo
  public updateTodo(todo: Todo): Observable<Todo> {

    return this.httpClient.put<Todo>(this.url + '/' + todo.id, JSON.stringify(todo), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // DeleteTodo
  public deleteTodo(todo: Todo) {

    return this.httpClient.delete<Todo>(this.url + '/' + todo.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {

    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {

      // Error client side
      errorMessage = error.error.message;

    } else {

      // Error server side
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
