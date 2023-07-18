export default function controlsFuncionality(inputSelector) {
    const d = document;
    const $inputControl = d.querySelector(inputSelector)
    const $inputControls = d.querySelectorAll(".container__calculator__controls__buttons");
    d.addEventListener("click", e => {
        if (e.target.matches("#btn-get-value > span")) {
            validateSign(e.target.textContent.charCodeAt(0), e.target.textContent);
        }
        if (e.target.matches(".reset__button > span")) {
            $inputControl.value = "";
        }
        if (e.target.matches(".delete__button > span")) {
            const arrayValue = $inputControl.value.split('');
            arrayValue.pop();
            $inputControl.value = arrayValue.join('');
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
            const arrayValue = $inputControl.value.split('');
            arrayValue.pop();
            $inputControl.value = arrayValue.join('');
        }

        validateSign(ascciCode, key);
    });

    function validateSign(ascciCode, key) {
        if (ascciCode >= 42 && ascciCode <= 47 || ascciCode===120) {
            if ($inputControl.value.length > 0) {
                if (key === "*") {
                    key = "x";
                }
                if (key === ",") {
                    key = ".";
                }
                let lastValue = $inputControl.value.at($inputControl.value.length - 1);
                if (lastValue.charCodeAt(0) <= 47 || lastValue.charCodeAt(0) === 120) {
                    let sliceValue = $inputControl.value.slice(0, $inputControl.value.length - 1);
                    $inputControl.value = sliceValue + key;

                } else {
                    $inputControl.value += key;
                }
            } else{
                $inputControl.value = "0" + key;
            }
        } else if (ascciCode >= 48 && ascciCode <= 57) {
            $inputControl.value += key;
        }
    }
}