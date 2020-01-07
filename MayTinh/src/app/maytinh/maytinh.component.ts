import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-maytinh",
  templateUrl: "./maytinh.component.html",
  styleUrls: ["./maytinh.component.css"]
})
export class MaytinhComponent implements OnInit {
  result: number;
  result1: string[];

  subText = "";
  mainText = "";
  operand1: number;
  operand2: number;
  operator = "";
  calculationString = "";
  answered = false;
  operatorSet = false;

  constructor() {}

  ngOnInit() {}

  onFirstChange(value) {
    this.result = Number(value);
    console.log(this.result);
  }
  allClear() {
    this.mainText = "";
    this.subText = "";
    this.operatorSet = false;
  }

  pressKey(key: string) {
    if (key === "/" || key === "x" || key === "-" || key === "+") {
      this.mainText += key;
      var test = this.mainText.split(/(?<=[-+x/()])|(?=[-+x/()])/);
      console.log(test);
      if (
        key === test[1] ||
        test[1] === "+" ||
        key === test[1] ||
        test[1] === "-" ||
        key === test[1] ||
        test[1] === "x" ||
        key === test[1] ||
        test[1] === "/"
      ) {
        this.mainText = this.mainText.substr(0, test.length - 1);
        console.log(this.mainText);
        this.operatorSet = false;
      }
      if (test.length > 2) {
        var lastKey1 = test[1];
        console.log("dau: " + lastKey1);

        if (key === "+" || key === "-" || key === "x" || key === "/") {
          if (lastKey1 === "+") {
            this.result = parseFloat(test[0]) + parseFloat(test[2]);
            console.log(this.result);
            this.mainText = this.result.toString();
          }
          if (lastKey1 === "-") {
            console.log("dau: " + key);
            this.result = parseFloat(test[0]) - parseFloat(test[2]);
            // console.log(parseFloat(test[0]));
            // console.log(parseFloat(test[2]));
            console.log(this.result);
            this.mainText = this.result.toString();
          }
          if (lastKey1 === "/") {
            if (parseFloat(test[2]) === 0) {
              this.result = parseFloat(test[2]);
            } else {
              this.result = parseFloat(test[0]) / parseFloat(test[2]);
              console.log(this.result);
            }

            this.mainText = this.result.toString();
          }
          if (lastKey1 === "x") {
            this.result = parseFloat(test[0]) * parseFloat(test[2]);
            console.log(this.result);
            this.mainText = this.result.toString();
          }
        }
      }

      if (this.operatorSet || this.mainText === "") {
        return;
      }
      this.operand1 = parseFloat(this.mainText);
      this.operator = key;
      this.operatorSet = false;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
  }

  getAnswer() {
    // this.result1 = this.mainText.split(/(?<=[-+x/()])|(?=[-+x/()])/);
    // console.log(this.result1);
    // const LENGHT = this.result1.length;
    // for (let i = 0; i < LENGHT; i++) {
    //  const KQ =  this.result[0]
    //   switch (this.result1[i]) {
    //     case "+":
    //       this.result += parseFloat(this.result1[i + 1]);
    //       i ++;
    //       break;

    //     default:
    //       break;
    //   }
    // }

    this.calculationString = this.mainText;
    var result = this.mainText;
    console.log(result);
    this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
    console.log(this.mainText);
    this.subText = this.mainText;
    this.mainText = (this.operand1 / this.operand2).toString();
    this.subText = this.calculationString;
    if (this.mainText.length > 9) {
      this.mainText = this.mainText.substr(0, 9);
    }

    if (this.operator === "/") {
      this.subText = this.mainText;
      if (this.operand2 === 0) {
        this.mainText = this.operand2.toString();
      } else {
        this.mainText = (this.operand1 / this.operand2).toString();
      }

      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = this.mainText.substr(0, 9);
      }
    } else if (this.operator === "x") {
      this.subText = this.mainText;
      this.mainText = (this.operand1 * this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = "ERROR";
        this.subText = "Range Exceeded";
      }
    } else if (this.operator === "-") {
      this.subText = this.mainText;
      this.mainText = (this.operand1 - this.operand2).toString();
      this.subText = this.calculationString;
    } else if (this.operator === "+") {
      this.subText = this.mainText;
      this.mainText = (this.operand1 + this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = "ERROR";
        this.subText = "Range Exceeded";
      }
    } else {
      this.subText = "ERROR: Invalid Operation";
    }
    this.answered = true;
  }
}
