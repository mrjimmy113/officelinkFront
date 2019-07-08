import { QuestionReport } from './questionReport';
export class SurveyReport {
  name : String;
	startDate : Date;
	endDate : Date;
	received : number;
	sendOut : number;
	questions : QuestionReport[];
}
