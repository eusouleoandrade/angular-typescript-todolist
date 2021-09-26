import { Todo } from 'src/models/todo.model';

export class TodoApiResponse{

    constructor(public succeeded : boolean, 
        public message : string, 
        public errors : string[],
        public data : Todo[]) {
                
    }
}