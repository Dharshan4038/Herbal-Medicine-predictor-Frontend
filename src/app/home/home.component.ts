import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  symptoms = ['Immunity','Weight loss','Weight Gain','Teeth and bone Strength','Knee pain/arthritis','Blood detoxification','Infection and wounds','Body Pain','Skin disease','Inactiveness','Gastric&Intestine troubles','Hyperthermia or Fever','Diabetes','Cold,cough,throat infections','Vision concerns','Nerve disorder','PCOS','Headache','Respiratory concerns','Kidney & urinary problems','Heart problems','Constipation','Diarrhoea','Liver','Male Reproductive concerns'];
  sym: any = [];
  filterSym: any = [];
  herbs: any = [];
  acc: any = [];

  herbForm = new FormGroup({
    symptom1: new FormControl(''),
    symptom2: new FormControl(''),
    symptom3: new FormControl(''),
    symptom4: new FormControl(''),
    symptom5: new FormControl(''),
  })

  getSymptoms() {
    this.sym[0] = this.herbForm.value.symptom1;
    this.sym[1] = this.herbForm.value.symptom2;
    this.sym[2] = this.herbForm.value.symptom3;
    this.sym[3] = this.herbForm.value.symptom4;
    this.sym[4] = this.herbForm.value.symptom5;

    for(let i=0;i<5;i++){
      if(this.sym[i] != '') {
        this.filterSym.push(this.sym[i]);
      }
    }
    if(this.filterSym.length < 2) {
      alert("Please Select Minimum of two values");
      window.location.reload();
    }
    let k = 0;
    let j;
    while(k<this.filterSym.length) {
      j = k+1;
      if(this.filterSym[k] == this.filterSym[j]) {
        alert("Please Select Different Symptoms");
        window.location.reload();
        break;
      }
      k++;
    }

    this.api.sendSymptoms(this.filterSym).subscribe(res=>{
      console.log(res);
      this.herbs[0] = res[0][0];
      this.herbs[1] = res[1][0];

      for(let i=0;i<res.length;i++) {
        this.herbs[i] = res[i][0];
        this.acc[i] = res[i][1];
      }

      console.log(this.herbs);
    })

  }

  reset() {
    window.location.reload();
  }

}
