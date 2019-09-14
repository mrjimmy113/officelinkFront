import { AnswerReport } from './answerReport';
import { Question } from './question';
export class QuestionReport {
  question : Question;
  avgPoint:number;
  identity:number;
  answers : AnswerReport[];
  reportData: any;
}
