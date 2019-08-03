import { Question } from './question';

export class Survey {
  id:Number;
  name:String;
  workplaceId : Number;
	shared : boolean;
	active : boolean;
  questions: Array<Question>;
  sent : boolean;
}
