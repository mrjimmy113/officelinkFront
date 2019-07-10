import {Account  } from './account';
 
export class Location {
    id: Number;
    name: String;
    address: String;
    dateCreated: Date;
    dateModified: Date;
    dateDeleted: Date;
    isDeleted: false;
    latitude: number;
    longitude: number;

    listAccounts : Array<Account>;

}