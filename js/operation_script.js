const d= document;

export default function calculator(operation,btnEqual){
    const $btn= d.querySelector(btnEqual);
    const $input= d.getElementById(operation);
    
    $btn.addEventListener("click",e => {
        let result= $input.value.replaceAll("x","*");

        $input.value= eval(result);
    });

    d.addEventListener("keyup",e=>{
        if(e.key==="Enter"){
            $btn.click();
        }
    });
}