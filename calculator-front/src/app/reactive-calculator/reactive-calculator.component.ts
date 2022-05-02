import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from "../services/calculator-service"
import {CalculatorServerResponse} from "../models/calculator-server-response"
import {CalculatorValue} from "../models/calculator-value"
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { first, merge, map, Observable, Subject } from "rxjs";

@Component({
  selector: 'app-reactive-calculator',
  templateUrl: './reactive-calculator.component.html',
  styleUrls: ['./reactive-calculator.component.scss']
})
export class ReactiveCalculatorComponent implements OnInit, OnDestroy {

  calculatorForm!:FormGroup
  serverResponse!:CalculatorServerResponse
  private destroy$!:Subject<boolean>
  canValid:boolean=false
  calculatorValues!:CalculatorValue
  upperDisabled!:boolean;
  floorExist!:boolean;
  constructor(private formBuilder: FormBuilder, private calculatorService: CalculatorService) { }
  

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>()
    let integerRegex=/^[0-9]*$/;    
    this.calculatorForm = this.formBuilder.group({
      shopId:[5 ,[Validators.required, Validators.pattern(integerRegex), Validators.max(10), Validators.min(0)]],
      amount:[0, [Validators.required, Validators.pattern(integerRegex), Validators.max(9007199254740991), Validators.min(0)]]      
    })

    this.calculatorForm.get('amount')?.valueChanges.subscribe((amount:number) => {
      this.onAmountChange(amount,this.calculatorForm.value.shopId)
    })
      
    this.calculatorForm.get('shopId')?.valueChanges.subscribe((shopId:number) => {
      this.onAmountChange( this.calculatorForm.value.amount,shopId)
    })
        
  }
 
  /** 
   * Get cards possibilities from server when amount changes 
   */
  onAmountChange(amount : number, shopId:number){
    if(amount != null){
      this.calculatorService.getCombinationByAmount(amount,shopId).subscribe((data:CalculatorServerResponse) => {
        this.serverResponse = {...data}
        this.canValid = this.serverResponse.equal!=undefined && this.isAmountValid(amount)
      })
    }
  }

  /**
   * User click on proposed possible amount 
   * @param newAmount 
   */
  onUpperValue() {
    if(this.serverResponse.ceil!=undefined){
      this.calculatorForm.patchValue({
        amount: this.serverResponse.ceil.value 
      });
    }
  }

    /**
   * User click on proposed possible amount 
   * @param newAmount 
   */
  onLowerValue() {
    if(this.serverResponse.floor!=undefined){
      this.calculatorForm.patchValue({
        amount: this.serverResponse.floor.value 
      });
    }
  }

  /**
   * Check if user's amount is valid and allow form submit
   * @param amount 
   */
  isAmountValid(amount:number){
    if(this.serverResponse.equal!=undefined && this.serverResponse.equal.value === amount){
      return true
    }else{
      return false
    }
  }

  /** 
   * On form submit, send values
  */
  onSubmit(){
    if(this.serverResponse.equal!=undefined)
      this.calculatorValues= {... this.serverResponse.equal}
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
