import changeThemes from "./theme.js"

const d = document

d.addEventListener("DOMContentLoaded",e=> {
    changeThemes(".container__calculator__header__theme__keypad__buttons > div");
})