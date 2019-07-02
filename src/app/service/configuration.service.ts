import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageSearch } from '../model/page-search';
import { Configuration } from '../model/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private api = environment.apiEndPoint + "/configuration";

  constructor(private http:HttpClient) { }

  getConfig(configId):Observable<Configuration> {
    return this.http.get<Configuration>(this.api + `/getConfig` + `?id=${configId}`);
  }

  getAllByWorkplace(page):Observable<PageSearch<Configuration>> {
    return this.http.get<PageSearch<Configuration>>(this.api + `/workplaceConfigs` + `?page=${page}`);
  }

  create(obj):Observable<Number> {
    return this.http.post<Number>(this.api, obj);
  }

  update(obj):Observable<Number> {
    return this.http.put<Number>(this.api, obj);
  }

  delete(id):Observable<Number> {
    return this.http.delete<Number>(this.api + `?id=${id}`);
  }
}
