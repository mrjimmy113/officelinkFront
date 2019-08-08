import { Word } from './word';
export class WordCloudFilter {
  id:Number;
  name:String;
  exclude: boolean = true;
  wordList:Array<Word>;
  dateCreated:Date;
  template:boolean
}
