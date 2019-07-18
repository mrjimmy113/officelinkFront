import { Location } from './location';
import { Team } from 'src/app/model/team';
import { Department } from './department';
export class SurveySendTargetDetail {
  locations: Location[];
  departments: Department[];
  teams: Team[];
}
