import {CommentDTO} from "./comment-dto";

export class BugDto{
  id!: string;
  title!: string;
  description!: string;
  priority!: string;
  reporter!: string;
  status!: string;
  created!: string;
  comments!: CommentDTO[];


  constructor(id: string, title: string, description: string, priority: string, reporter: string, status: string, created: string, comments: CommentDTO[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.reporter = reporter;
    this.status = status;
    this.created = created;
    this.comments = comments;
  }
}
