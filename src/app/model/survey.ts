import { Question } from './question';
import { Configuration } from './configuration';

export class Survey {
  id:Number;
  name:String;
  workplaceId : Number;
	shared : boolean;
	active : boolean;
  questions: Array<Question>;
  sent : boolean;
  configuration: Configuration;
  dateTaken: Date;
  dateStop : Date;
}
