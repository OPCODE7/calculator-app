import controlsFuncionality from "./controls_funcionality.js";
import calculator from "./operation_script.js";
import changeThemes from "./theme.js"

const d = document

d.addEventListener("DOMContentLoaded",e=> {
    changeThemes(".container__calculator__header__theme__keypad__buttons > div");
    controlsFuncionality("#operation");
    calculator("operation",".equal__button > span");
})