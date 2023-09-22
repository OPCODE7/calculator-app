export default class Calculator {
    constructor(inputSelector, btnGetResultSelector) {
        this.d = document;
        this.$input = this.d.getElementById(inputSelector);
        this.$btnEqual = this.d.querySelector(btnGetResultSelector);
    }

    makeOperation() {
        this.$btnEqual.addEventListener("click", e => {
            let operation = this.$input.textContent.replaceAll("x", "*");
            let result = eval(operation).toString();
            if (result === "NaN" || result === "Infinity") {
                this.$input.textContent = "Resultado indefinido";
            } else {
                this.$input.textContent = result;
            }
        });

        this.d.addEventListener("keyup", e => {
            if (e.key === "Enter"){
                this.$btnEqual.click();
            } 
        });
    }

    factorial= (n) => n === 0 || n === 1 ? n : n * factorial(n - 1);
    
    
    calculateSin = (value, flag) => flag === true ? Math.asin(value) : Math.sin(value);
    calculateCos = (value, flag) => flag === true ? Math.acos(value) : Math.cos(value);
    calculateTan = (value, flag) => flag === true ? Math.atan(value) : Math.tan(value);
    
    trigonemtryFuncs(func, value, flag) {
        const options = {
            "sen-1": this.calculateSin(value, flag),
            "cos-1": this.calculateCos(value, flag),
            "tan-1": this.calculateTan(value, flag),
            "default": "0"
        }
        return options[func] || options['default'];
    }

}
