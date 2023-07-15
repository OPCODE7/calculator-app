export default function controlsFuncionality(inputSelector){
    const d= document;
    const $inputControl= d.querySelector(inputSelector)
    const $inputControls= d.querySelectorAll(".container__calculator__controls__buttons");
    d.addEventListener("click",e => {
        if(e.target.matches("#btn-get-value > span")){
            $inputControl.value+= e.target.textContent;
        }
        if(e.target.matches(".reset__button > span")){
            $inputControl.value= "";
        }
        if(e.target.matches(".delete__button > span")){
            const arrayValue= $inputControl.value.split('');
            arrayValue.pop();
            $inputControl.value= arrayValue.join('');
        }
    }); 

    d.addEventListener("keypress", e => {
        let ascciCode= e.key.charCodeAt(0); 
        $inputControls.forEach(control => {
            if(e.key===control.firstElementChild.textContent){
                control.classList.add("click__btn");
                setTimeout(() => {
                    control.classList.remove("click__btn");
                }, 1000);
            }
        });
        

        if(ascciCode>=43 && ascciCode<=57){
            $inputControl.value+= e.key;
        }

        if(ascciCode===42) $inputControl.value+= "x";

        if(e.key==="Backspace"){
            const arrayValue= $inputControl.value.split('');
            arrayValue.pop();
            $inputControl.value= arrayValue.join('');
        }
    });
}