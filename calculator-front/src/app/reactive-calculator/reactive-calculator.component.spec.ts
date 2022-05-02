import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { ReactiveCalculatorComponent } from './reactive-calculator.component';
import {ReactiveFormsModule } from '@angular/forms'
import {HttpClientModule,} from '@angular/common/http';
import {CalculatorService} from '../services/calculator-service'
import { of } from 'rxjs';

export class CalculatorServiceStub {
  getCombinationByAmount(amount:number,shopId:number) {
    if(amount === 20 && shopId === 5){
      return of(
        { "equal": { "value": 20, "cards": [ 20 ] }, "floor": { "value": 20, "cards": [ 20 ] }, "ceil": { "value": 20, "cards": [ 20 ] } }
      );
    }else if(amount === 5 && shopId === 5){
      return of(
        { "ceil": { "value": 20, "cards": [ 20 ] } }
      );
    }
    else if(amount === 37 && shopId === 5){
      return of(
        { "floor": { "value": 35, "cards": [ 35 ] }, "ceil": { "value": 40, "cards": [ 20, 20 ] } }
      );
    }
    else if(amount === 40 && shopId === 5){
      return of(
        { "equal": { "value": 40, "cards": [ 20, 20 ] }, "floor": { "value": 40, "cards": [ 20, 20 ] }, "ceil": { "value": 40, "cards": [ 20, 20 ] } }
      );
    }
    else if(amount === 35 && shopId === 5){
      return of(
        { "equal": { "value": 35, "cards": [ 35 ] }, "floor": { "value": 35, "cards": [ 35 ] }, "ceil": { "value": 35, "cards": [ 35 ] } }
      );
    }
    else{
      return null
    }
  }
}

describe('ReactiveCalculatorComponent', () => {
  let component: ReactiveCalculatorComponent;
  let fixture: ComponentFixture<ReactiveCalculatorComponent>;
  let workingSubmit = { "equal": { "value": 20, "cards": [ 20 ] }, "floor": { "value": 20, "cards": [ 20 ] }, "ceil": { "value": 20, "cards": [ 20 ] } }
  let tooLowSubmit = { "ceil": { "value": 20, "cards": [ 20 ] } }
  let betweenSubmit = { "floor": { "value": 35, "cards": [ 35 ] }, "ceil": { "value": 40, "cards": [ 20, 20 ] } }
  let chooseLower = { "equal": { "value": 35, "cards": [ 35 ] }, "floor": { "value": 35, "cards": [ 35 ] }, "ceil": { "value": 35, "cards": [ 35 ] } }
  let chooseHigher = { "equal": { "value": 40, "cards": [ 20, 20 ] }, "floor": { "value": 40, "cards": [ 20, 20 ] }, "ceil": { "value": 40, "cards": [ 20, 20 ] } }
  let submitedValues = { "value": 20, "cards": [ 20 ] }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveCalculatorComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule],
      providers: [{provide: CalculatorService, useClass:CalculatorServiceStub}],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get working values', () => {
    component.onAmountChange(20,5)
    expect(component.serverResponse).toEqual(workingSubmit);
  });

  it('should purpose only a bigger value', () => {
    component.onAmountChange(5,5)
    expect(component.serverResponse).toEqual(tooLowSubmit);
  });

  it('should purpose a bigger and a smaller value', () => {
    component.onAmountChange(37,5)
    expect(component.serverResponse).toEqual(betweenSubmit);
  });

  it('should purpose a bigger and a smaller value', () => {
    component.onAmountChange(37,5)
    expect(component.serverResponse).toEqual(betweenSubmit);
  });

  it('should purpose a bigger and a smaller value, on bigger selected should return chooseHigher', () => {
    component.onAmountChange(37,5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = fixture.debugElement.nativeElement.querySelector('.higher')!;    
    button.click()    
    expect(component.serverResponse).toEqual(chooseHigher);
  });

  it('should purpose a bigger and a smaller value, on bigger selected should return chooseLower', () => {
    component.onAmountChange(37,5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = fixture.debugElement.nativeElement.querySelector('.lower')!;    
    button.click()    
    expect(component.serverResponse).toEqual(chooseLower);
  });

  it('should submit valid calculator-value', () => {
    component.onAmountChange(20,5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = fixture.debugElement.nativeElement.querySelector('.submit')!;    
    button.click()    
    expect(component.calculatorValues).toEqual(submitedValues);
  });

  
});
