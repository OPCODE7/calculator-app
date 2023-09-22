import ControlsFuncionality from "./controls_funcionality.js";
import Calculator from "./operation_script.js";
import Themes from "./theme.js";

const d = document;
const themes= new Themes(".container__calculator__header__theme__keypad__buttons > div");
const calc= new Calculator("operation",".equal__button > span");
const ctlrsFunc= new ControlsFuncionality("#operation");

d.addEventListener("DOMContentLoaded",e=> {
    themes.changeThemes();
    ctlrsFunc.printData();
    calc.makeOperation();
})