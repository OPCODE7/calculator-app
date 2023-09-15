const d = document;

export default function changeThemes(buttons) {
    const $buttonsThemes = d.querySelectorAll(buttons);

    $buttonsThemes.forEach(btn => {
        btn.addEventListener("click", e => {
            const $theme = d.querySelector(`link[data-theme= "theme-style"]`);
            const pathStylesheet = {
                "btn-dark-theme": "css/dark_theme.css",
                "btn-light-theme": "css/light_theme.css",
                "btn-purple-theme": "css/purple_theme.css"
            }
            if (e.target.classList.contains("opacity-none")) e.target.classList.remove("opacity-none");

            $buttonsThemes.forEach(button => {
                if (e.target.id !== button.id) button.classList.add("opacity-none");
            });
            $theme.href = pathStylesheet[btn.id];
        });
    })
}