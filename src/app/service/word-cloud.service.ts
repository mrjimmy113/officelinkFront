import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordCloudService {

  private api = environment.apiEndPoint + "/wordCloud";

  constructor() { }
}
