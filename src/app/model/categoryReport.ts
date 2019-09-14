import { QuestionReport } from './questionReport';
export class CategoryReport {
  id:Number;
  name : String;
  description: String;
  questions: QuestionReport[];
  point:number;
}
