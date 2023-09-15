export default function controlsFuncionality(inputSelector) {
    const d = document;
    const $inputControl = d.querySelector(inputSelector);
    const $inputControls = d.querySelectorAll(".container__calculator__controls__buttons");
    const $containerFuncs = d.querySelector(".container__calculator__controls__buttons__func");
    const cssClasses = {
        animateFuncsContainer: "container__calculator__controls__buttons__func__animate",
        dNone: "d-none",
        op60: "opacity-70",
        clickBtn: "click__btn"

    }

    function deleteCharacter(input) {
        if (input.textContent.length === 1) {
            input.textContent = "0";
        } else {
            const ARRAY_VALUE = input.textContent.split('');
            ARRAY_VALUE.pop();
            input.textContent = ARRAY_VALUE.join('');
        }
    }

    const GET_LAST_CHARACTER_INPUT = (inputControl) => {
        return inputControl.textContent.at(inputControl.textContent.length - 1);
    }

    function inputDataController(ascciCode, key) {
        if (ascciCode >= 42 && ascciCode <= 47 || ascciCode === 120 || key === "mod") {
            if ($inputControl.textContent.length > 0) {
                if (key === "*") {
                    key = "x";
                }
                if (key === ",") {
                    key = ".";
                }
                if (key === "mod") {
                    key = "%";
                }
                let lastCharacter = GET_LAST_CHARACTER_INPUT($inputControl);
                if (lastCharacter.charCodeAt(0) <= 47 && lastCharacter.charCodeAt(0) !== 41 || lastCharacter.charCodeAt(0) === 120) {
                    changeLastValueOfInput($inputControl, key);

                } else {
                    $inputControl.textContent += key;
                }
            } else {
                $inputControl.textContent = "0" + key;
            }
        } else if (ascciCode >= 48 && ascciCode <= 57) {
            if ($inputControl.textContent.length > 0) {
                if (key !== "0") {
                    let lastCharacter = GET_LAST_CHARACTER_INPUT($inputControl);
                    if (lastCharacter === "0") {
                        changeLastValueOfInput($inputControl, key);
                    } else {
                        $inputControl.textContent += key;
                    }
                } else {
                    if ($inputControl.textContent.length === 1 && $inputControl.textContent === "0") {
                        $inputControl.textContent = "0";
                    } else {
                        $inputControl.textContent += key;
                    }
                }
            }
        } else if (key === "!n") {
            let arrayTextInput = $inputControl.textContent.split(/\D/);
            let lastValue = [...arrayTextInput].pop();

            if (/\d/.test(lastValue) && lastValue <= 170) {
                let factorialResult = factorial(parseFloat(lastValue));
                changeLastValueOfInput($inputControl, factorialResult);
            }
        } else if (/[sincostan]/.test(key)) {
            let arrayTextInput = $inputControl.textContent.split(/\D/);
            let lastValue = [...arrayTextInput].pop();
            const $inverseActivator = d.querySelector("#inverse");
            let flag = !$inverseActivator.classList.contains(cssClasses.op60) ? false : true;

            if (!isNaN(lastValue)) {
                let result = trigonemtryFuncs(key, lastValue, flag);
                changeLastValueOfInput($inputControl, result);
            }
        }


    }

    d.addEventListener("click", e => {
        if (e.target.matches("#btn-get-value > span")) {
            inputDataController(e.target.textContent.charCodeAt(0), e.target.textContent);
        }
        if (e.target.matches(".reset__button > span")) {
            $inputControl.textContent = "0";
        }
        if (e.target.matches(".delete__button > span")) {
            deleteCharacter($inputControl);
        }
        if (e.target.matches("#btn-trigonometry-func > span")) {

            $containerFuncs.classList.toggle(cssClasses.animateFuncsContainer);
        } else if (!e.target.matches("#inverse")) {
            if ($containerFuncs.classList.contains(cssClasses.animateFuncsContainer)) {
                $containerFuncs.classList.remove(cssClasses.animateFuncsContainer);
            }
        }

        if (e.target.matches("#inverse")) {
            const $inverseItems = d.querySelectorAll(".container__calculator__controls__buttons__func> span > b");
            $inverseItems.forEach(item => item.classList.toggle(cssClasses.dNone));
            e.target.classList.toggle(cssClasses.op60);

        }

    });

    d.addEventListener("keyup", e => {
        e.preventDefault();
        let key = e.key;
        let ascciCode = key.charCodeAt(0);
        $inputControls.forEach(control => {
            if (key === control.firstElementChild.textContent) {
                control.classList.add(cssClasses.clickBtn);
                setTimeout(() => {
                    control.classList.remove(cssClasses.clickBtn);
                }, 1000);
            }
        });

        if (key === "Backspace") {
            deleteCharacter($inputControl);
        }

        inputDataController(ascciCode, key);
    });
}

function factorial(n) {
    return n === 0 || n === 1 ? n : n * factorial(n - 1);
}

const calculateSin = (value, flag) => flag === true ? Math.asin(value) : Math.sin(value);
const calculateCos = (value, flag) => flag === true ? Math.acos(value) : Math.cos(value);
const calculateTan = (value, flag) => flag === true ? Math.atan(value) : Math.tan(value);

function trigonemtryFuncs(func, value, flag) {
    const options = {
        "sen-1": calculateSin(value, flag),
        "cos-1": calculateCos(value, flag),
        "tan-1": calculateTan(value, flag),
        "default": "0"
    }
    return options[func] || options['default'];
}



function changeLastValueOfInput(inputControl, newLastValue) {
    let sliceValue = inputControl.textContent.slice(0, inputControl.textContent.length - 1);
    inputControl.textContent = sliceValue + newLastValue;
}