/**
 * Componente que contiene el script de ejecución temprana.
 * Este código JavaScript se ejecuta ANTES de que React haga su primer render,
 * previniendo el parpadeo del tema.
 */
export const ThemeScript = ({ lightTheme = "light", darkTheme = "dark" }) => {
	// NOTA: El script se inyecta como una cadena de texto.
	const scriptContent = `
      (function() {
        // Lista de temas oscuros y claros para validación
        const themesDark = ["dark", "slate"];
        const themesLight = ["light", "retro"];
        const defaultLightTheme = "${lightTheme}";
        const defaultDarkTheme = "${darkTheme}";
  
        // 1. Obtener el tema almacenado.
        let storedTheme = localStorage.getItem("theme");
        let themeToApply;
  
        if (storedTheme) {
          if (themesDark.includes(storedTheme) || themesLight.includes(storedTheme)) {
              themeToApply = storedTheme;
          }
        }
  
        // 2. Si no hay tema almacenado o es inválido, usar la preferencia del sistema
        if (!themeToApply) {
          const isDarkPreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          themeToApply = isDarkPreferred ? defaultDarkTheme : defaultLightTheme;
        }
        
        // 3. Aplicar el tema inmediatamente al elemento raíz.
        const root = document.documentElement;
        root.setAttribute('data-theme', themeToApply);
        // Opcional: añade la clase si la usas para algo más
        root.classList.add(themeToApply);
      })();
    `;

	return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
};
