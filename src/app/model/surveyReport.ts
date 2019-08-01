import { SendOutInfor } from './sendOutInfor';
import { QuestionReport } from './questionReport';
export class SurveyReport {
  id:Number;
  name : String;
	dateSendOut : Date;
	dateStop : Date;
	receivedAnswer : number;
	sentOut : number;
  questions : QuestionReport[];
  sendTargets: SendOutInfor[];
}
