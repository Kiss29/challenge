import { Injectable } from "@angular/core";
import { CalculatorServerResponse } from "../models/calculator-server-response";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CalculatorService {

    constructor(private http: HttpClient) {}

    getCombinationByAmount(amount:number, shopId:number): Observable<CalculatorServerResponse>{
        return this.http.get<CalculatorServerResponse>(`http://localhost:3000/shop/${shopId}/search-combination?amount=${amount}`)
                        .pipe(retry(1), catchError(this.handleError));
                    }
        handleError(error:any) {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            console.log(errorMessage);
            return throwError(() => {
                return errorMessage;
            });
        }
};
