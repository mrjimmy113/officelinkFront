import { Word } from './word';
export class WordCloudFilter {
  id:Number;
  name:String;
  language:String;
  exclude: boolean = true;
  wordList:Array<Word>
}
