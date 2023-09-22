export default class Themes{
    constructor(btnSelector){
        this.$buttonsThemes= document.querySelectorAll(btnSelector);
        this.$linkStylesheet= document.querySelector(`link[data-theme= "theme-style"]`);
        this.pathStylesheet = {
            "btn-dark-theme": "css/dark_theme.css",
            "btn-light-theme": "css/light_theme.css",
            "btn-purple-theme": "css/purple_theme.css"
        }
    }

    changeThemes(){
        this.$buttonsThemes.forEach(btn => {
            btn.addEventListener("click", e => {
                if (e.target.classList.contains("opacity-none")) e.target.classList.remove("opacity-none");
    
                this.$buttonsThemes.forEach(button => {
                    if (e.target.id !== button.id) button.classList.add("opacity-none");
                });
                this.$linkStylesheet.href = this.pathStylesheet[btn.id];
            });
        })
    }
}