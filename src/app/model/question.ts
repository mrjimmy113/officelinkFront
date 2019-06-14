import { AnswerOption } from './answerOption';
export class Question {
  id:Number;
  question:String;
  typeId:Number;
  options: Array<AnswerOption>;
}
