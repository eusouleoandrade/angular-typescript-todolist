export class Todo {

    public id: number;
    public title: string;
    public done: boolean;

    constructor(title: string, done: boolean, id?: number) {
        this.id = id === undefined ? 0 : id;
        this.title = title;
        this.done = done;
    }
}