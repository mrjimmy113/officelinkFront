import { SurveyReport } from './surveyReport';
import { News } from './news';
export class DashBoard {
  account : number;
  team: number;
  department : number;
  location : Location[];
  news : News;
  reports : SurveyReport[];
}
