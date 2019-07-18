import { Survey } from "./survey";
import { SendSurvey } from './sendSurvey';

export class Configuration {
    id:Number;
    scheduleTime:String;
    isActive:Boolean;
    workplaceId:Number;
    survey:Survey;
    duration:number;
    sendSurvey:SendSurvey;
}
