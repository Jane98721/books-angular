import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes {


  quotesArray = [
      { quote: 'Focus on the goal, not the obstacle', isReadOnly: true },
      { quote: 'A negative mind will never give you a positive life', isReadOnly: true },
      { quote: 'Believe you can, and you are halfway there', isReadOnly: true },
      { quote: 'Be so good, they can not ignore you', isReadOnly: true },
      { quote: 'All dreams are within reach. All you have to do is keep moving towards them', 
        isReadOnly: true },
    ];
    
    
    onSubmit(myQuotesForm: NgForm) {
      this.quotesArray.push({
        quote: myQuotesForm.controls['newQuote'].value,
        isReadOnly:true
      });
  }

  onSave(index: number, newQuote:string){
    this.quotesArray[index].quote = newQuote;
    this.quotesArray[index].isReadOnly= true;
  }

   onEdit(index: number){
    this.quotesArray[index].isReadOnly = false
  }

  onDelete(index: number){
    this.quotesArray.splice(index, 1)
  }
}
