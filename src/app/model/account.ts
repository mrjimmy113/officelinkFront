import {Role} from './role'
import { Workplace } from './workplace';
import {Location} from './location';
import { from } from 'rxjs';
export class Account {
    id : Number;
    password : String;
    email : String;
    firstname : String;
    lastname : String;
    //address : String;
    isDeleted  = false;
    role_id : Number ;
    //workspacename : String;

    location : Location;
    workplace: Workplace;

   
    
}