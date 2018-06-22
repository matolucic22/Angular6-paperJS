import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable(
  {
  providedIn: 'root'
}
)
export class DataService {

  url='http://localhost:3000';

  constructor(private http:HttpClient) { }//dependecy injection with constructor

  getAllSegments(){ 
    return this.http.get(this.url+'/segments').pipe(catchError(this.handleError));
  }

  getstrokeColor(){ 
    return this.http.get(this.url+'/strokeColor').pipe(catchError(this.handleError));
  }
//Segment and stroke color are main parts of polygon in canvas element
  
postPolygon(polygon:any){
    return this.http.post(this.url, polygon).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {  
    if (error.error instanceof ErrorEvent) {  
        // A client-side or network error occurred. Handle it accordingly.    
        console.error('An error occurred:', error.error.message);  
    } else {  
        // the backend returned an unsuccessful response code.    
        // the response body may contain clues as to what went wrong,    
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);  
    }  
    // return an observable with a user-facing error message    
    return throwError('Something bad happened; please try again later.');  
 }
}