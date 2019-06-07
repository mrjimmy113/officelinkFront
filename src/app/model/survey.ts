import { Question } from './question';

export class Survey {
  id:Number;
  name:String;
  workplaceId : Number;
	isShared : boolean;
	isActive : boolean;
  questions: Array<Question>;
}
