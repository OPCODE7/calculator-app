const d= document;

export default function calculator(operation,btnEqual){
    const $btn= d.querySelector(btnEqual);
    const $input= d.getElementById(operation);
    
    $btn.addEventListener("click",e => {
        let operation= $input.textContent.replaceAll("x","*");
        let result= eval(operation).toString();
        if(result==="NaN" || result ==="Infinity"){
            $input.textContent= "Resultado indefinido";
        }else{
            $input.textContent= result;
        }
    });

    d.addEventListener("keyup",e=>{
        if(e.key==="Enter"){
            $btn.click();
        }
    });
}