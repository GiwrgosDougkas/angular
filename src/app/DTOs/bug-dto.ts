import {CommentDTO} from "./comment-dto";

export class BugDto{
  id!: string;
  title!: string;
  description!: string;
  priority!: number;
  reporter!: string;
  status!: string;
  created!: string;
  comments!: CommentDTO[];
}
