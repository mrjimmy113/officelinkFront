import { TypeQuestion } from './typeQuestion';
import { AnswerOption } from './answerOption';
export class Question {
  id:Number;
  question:String;
  type:TypeQuestion;
  options: Array<AnswerOption>;
  questionIdentity:Number;
  questionIndex: number;
}
