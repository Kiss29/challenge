import { Injectable } from "@angular/core";
import { CalculatorServerResponse } from "../models/calculator-server-response";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CalculatorService {

    constructor(private http: HttpClient) {}

    getCombinationByAmount(amount:number, shopId:number): Observable<CalculatorServerResponse>{
        console.log("GET server called")
        return this.http.get<CalculatorServerResponse>(`http://localhost:3000/shop/${shopId}/search-combination?amount=${amount}`);
    }    
};
