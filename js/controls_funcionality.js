import Calculator from "./operation_script.js";

export default class ControlsFuncionality extends Calculator {
    
    constructor(inputSelector,...args) {
        super(...args);
        this.d= document;
        this.$inputControl = this.d.querySelector(inputSelector);
        this.$inputControls = this.d.querySelectorAll(".container__calculator__controls__buttons");
        this.$containerFuncs = this.d.querySelector(".container__calculator__controls__buttons__func");
        
        this.cssClasses = {
            animateFuncsContainer: "container__calculator__controls__buttons__func__animate",
            dNone: "d-none",
            op60: "opacity-70",
            clickBtn: "click__btn"
            
        }
    }

    deleteCharacter(input) {
        if (input.textContent.length === 1) {
            input.textContent = "0";
        } else {
            const ARRAY_VALUE = input.textContent.split('');
            ARRAY_VALUE.pop();
            input.textContent = ARRAY_VALUE.join('');
        }
    }

    GET_LAST_CHARACTER_INPUT = (inputControl) => {
        return inputControl.textContent.at(inputControl.textContent.length - 1);
    }

    inputDataController(ascciCode, key) {
        if (ascciCode >= 42 && ascciCode <= 47 || ascciCode === 120 || key === "mod") {
            if (this.$inputControl.textContent.length > 0) {
                if (key === "*") {
                    key = "x";
                }
                if (key === ",") {
                    key = ".";
                }
                if (key === "mod") {
                    key = "%";
                }
                let lastCharacter = this.GET_LAST_CHARACTER_INPUT(this.$inputControl);
                if (lastCharacter.charCodeAt(0) <= 47 && lastCharacter.charCodeAt(0) !== 41 || lastCharacter.charCodeAt(0) === 120) {
                    this.changeLastValueOfInput(this.$inputControl, key);

                } else {
                    this.$inputControl.textContent += key;
                }
            } else {
                this.$inputControl.textContent = "0" + key;
            }
        } else if (ascciCode >= 48 && ascciCode <= 57) {
            if (this.$inputControl.textContent.length > 0) {
                if (key !== "0") {
                    let lastCharacter = this.GET_LAST_CHARACTER_INPUT(this.$inputControl);
                    if (lastCharacter === "0") {
                        this.changeLastValueOfInput(this.$inputControl, key);
                    } else {
                        this.$inputControl.textContent += key;
                    }
                } else {
                    if (this.$inputControl.textContent.length === 1 && this.$inputControl.textContent === "0") {
                        this.$inputControl.textContent = "0";
                    } else {
                        this.$inputControl.textContent += key;
                    }
                }
            }
        } else if (key === "!n") {
            let arrayTextInput = this.$inputControl.textContent.split(/\D/);
            let lastValue = [...arrayTextInput].pop();

            if (/\d/.test(lastValue) && lastValue <= 170) {
                let factorialResult = super.factorial(parseFloat(lastValue));
                this.changeLastValueOfInput(this.$inputControl, factorialResult);
            }
        } else if (key === "sin-1" || key === "cos-1" || key === "tan-1") {
            let arrayTextInput = this.$inputControl.textContent.split(/\D/);
            let lastValue = [...arrayTextInput].pop();
            const $inverseActivator = this.d.querySelector("#inverse");
            let flag = !$inverseActivator.classList.contains(this.cssClasses.op60) ? false : true;

            if (!isNaN(lastValue)) {
                let result = super.trigonemtryFuncs(key, lastValue, flag);
                this.changeLastValueOfInput(this.$inputControl, result);
            }
        }
    }

    changeLastValueOfInput(inputControl, newLastValue) {
        let sliceValue = inputControl.textContent.slice(0, inputControl.textContent.length - 1);
        inputControl.textContent = sliceValue + newLastValue;
    }

    printData(){
        this.d.addEventListener("click", e => {
                if (e.target.matches("#btn-get-value > span")) {
                    this.inputDataController(e.target.textContent.charCodeAt(0), e.target.textContent);
                }
                if (e.target.matches(".reset__button > span")) {
                    this.$inputControl.textContent = "0";
                }
                if (e.target.matches(".delete__button > span")) {
                    deleteCharacter($inputControl);
                }
                if (e.target.matches("#btn-trigonometry-func > span")) {
    
                    this.$containerFuncs.classList.toggle(this.cssClasses.animateFuncsContainer);
                } else if (!e.target.matches("#inverse")) {
                    if (this.$containerFuncs.classList.contains(this.cssClasses.animateFuncsContainer)) {
                        this.$containerFuncs.classList.remove(this.cssClasses.animateFuncsContainer);
                    }
                }
    
                if (e.target.matches("#inverse")) {
                    const $inverseItems = this.d.querySelectorAll(".container__calculator__controls__buttons__func> span > b");
                    $inverseItems.forEach(item => item.classList.toggle(this.cssClasses.dNone));
                    e.target.classList.toggle(this.cssClasses.op60);
    
                }
    
            });
    
        this.d.addEventListener("keyup", e => {
            e.preventDefault();
            let key = e.key;
            let ascciCode = key.charCodeAt(0);
            this.$inputControls.forEach(control => {
                if (key === control.firstElementChild.textContent) {
                    control.classList.add(this.cssClasses.clickBtn);
                    setTimeout(() => {
                        control.classList.remove(this.cssClasses.clickBtn);
                    }, 1000);
                }
            });
    
            if (key === "Backspace") {
                deleteCharacter(this.$inputControl);
            }
    
            this.inputDataController(ascciCode, key);
        });
    }


    

}