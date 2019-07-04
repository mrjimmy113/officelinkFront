import {Account} from './account'
export class Role {
    id : Number;
    role : String;

    accounts : Set<Account>;
}