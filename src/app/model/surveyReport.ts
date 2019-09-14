import { CategoryReport } from './categoryReport';
import { SendOutInfor } from './sendOutInfor';
export class SurveyReport {
  id:Number;
  name : String;
	dateSendOut : Date;
	dateStop : Date;
	receivedAnswer : number;
	sentOut : number;
  categories : CategoryReport[];
  sendTargets: SendOutInfor[];
  point: number;
  goodCate: CategoryReport[];
  badCate:CategoryReport[];
}
