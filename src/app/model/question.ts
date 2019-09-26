import { Category } from './category';
import { TypeQuestion } from './typeQuestion';
import { AnswerOption } from './answerOption';
import { Answer } from './answer';
export class Question {
  id:Number;
  question:String;
  type:TypeQuestion;
  options: Array<AnswerOption>;
  questionIdentity:Number;
  questionIndex: number;
  required: boolean = true;
  dateCreated:Date;
  category: Category;
  answer: Answer;
}
