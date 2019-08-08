import { Department } from "./department";
import { Account } from './account';

export class Team {
    id:Number;
    name:String;
    department:Department;
    accounts:Array<Account>;
}