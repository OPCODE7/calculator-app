const d = document;

export default function changeThemes(buttons) {
    const $buttonsThemes = d.querySelectorAll(buttons);

    $buttonsThemes.forEach(btn => {
        btn.addEventListener("click", e => {
            const $theme= d.querySelector(`link[data-theme= "theme-style"]`);
            const pathStylesheet= {
                "btn-dark-theme": "css/dark_theme.css",
                "btn-light-theme": "css/light_theme.css",
                "btn-purple-theme": "css/purple_theme.css"
            }
            
            $theme.href= pathStylesheet[btn.id];
        });
    })
}