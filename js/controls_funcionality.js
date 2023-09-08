export default function controlsFuncionality(inputSelector) {
    const d = document;
    const $inputControl = d.querySelector(inputSelector)
    const $inputControls = d.querySelectorAll(".container__calculator__controls__buttons");
    d.addEventListener("click", e => {
        if (e.target.matches("#btn-get-value > span")) {
            validateSign(e.target.textContent.charCodeAt(0), e.target.textContent);
        }
        if (e.target.matches(".reset__button > span")) {
            $inputControl.textContent = "0";
        }
        if (e.target.matches(".delete__button > span")) {
            deleteCharacter($inputControl);
        }
        if(e.target.matches("#btn-trigonometry-func > span")){
            const $containerFuncs= d.querySelector(".container__calculator__controls__buttons__func");
            $containerFuncs.classList.toggle("container__calculator__controls__buttons__func__animate");
        }
    });

    d.addEventListener("keyup", e => {
        e.preventDefault();
        let key = e.key;
        let ascciCode = key.charCodeAt(0);
        $inputControls.forEach(control => {
            if (key === control.firstElementChild.textContent) {
                control.classList.add("click__btn");
                setTimeout(() => {
                    control.classList.remove("click__btn");
                }, 1000);
            }
        });

        if (key === "Backspace") {
            deleteCharacter($inputControl);
        }

        validateSign(ascciCode, key);
    });

    function validateSign(ascciCode, key) {
        if (ascciCode >= 42 && ascciCode <= 47 || ascciCode === 120 || key==="mod") {
            if ($inputControl.textContent.length > 0) {
                if (key === "*") {
                    key = "x";
                }
                if (key === ",") {
                    key = ".";
                }
                if(key==="mod"){
                    key= "%";
                }
                let lastValue = $inputControl.textContent.at($inputControl.textContent.length - 1);
                if (lastValue.charCodeAt(0) <= 47 || lastValue.charCodeAt(0) === 120) {
                    let sliceValue = $inputControl.textContent.slice(0, $inputControl.textContent.length - 1);
                    $inputControl.textContent = sliceValue + key;

                } else {
                    $inputControl.textContent += key;
                }
            } else {
                $inputControl.textContent = "0" + key;
            }
        } else if (ascciCode >= 48 && ascciCode <= 57) {
            if ($inputControl.textContent.length > 0) {
                if (key !== "0") {
                    let lastValue = $inputControl.textContent.at($inputControl.textContent.length - 1);
                    if (lastValue === "0") {
                        let sliceValue = $inputControl.textContent.slice(0, $inputControl.textContent.length - 1);
                        $inputControl.textContent = sliceValue + key;
                    } else {
                        $inputControl.textContent += key;
                    }
                } else {
                    if ($inputControl.textContent.length === 1) {
                        $inputControl.textContent = "0";
                    } else {
                        $inputControl.textContent += key;
                    }
                }
            }

        }
    }

    function deleteCharacter(input) {
        if (input.textContent.length === 1) {
            input.textContent = "0";
        } else {
            const arrayValue = input.textContent.split('');
            arrayValue.pop();
            input.textContent = arrayValue.join('');
        }
    }
}