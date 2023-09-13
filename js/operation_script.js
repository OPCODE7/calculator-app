const d= document;

export default function calculator(operation,btnEqual){
    const $btnEqual= d.querySelector(btnEqual);
    const $input= d.getElementById(operation);
    
    d.addEventListener("click",e => {
        if(e.target===$btnEqual){
            let operation= $input.textContent.replaceAll("x","*");
            
            let result= eval(operation).toString();
            if(result==="NaN" || result ==="Infinity"){
                $input.textContent= "Resultado indefinido";
            }else{
                $input.textContent= result;
            }
        }
        
    });

    d.addEventListener("keyup",e=>{
        if(e.key==="Enter"){
            $btnEqual.click();
        }
    });
}

