const darkTheme = function () {
  document.body.style.setProperty(
    "background",
    "url(/images/background_dark.jpg)"
  );
};
const lightTheme = function () {
  document.body.style.setProperty(
    "background",
    "url(/images/background_light.jpg)"
  );
};
const selectTheme = function (scheme) {
  switch (scheme) {
    case "light":
      darkTheme();
      break;
    case "dark":
      lightTheme();
      break;
  }
};

export default function themeStyles() {
  let savedScheme = localStorage.getItem("StackColorScheme");
  selectTheme(savedScheme == "dark" ? "light" : "dark");
  document
    .getElementById("dark-mode-toggle")
    .addEventListener("click", function () {
      let savedScheme = localStorage.getItem("StackColorScheme");
      // alert(savedScheme);
      selectTheme(savedScheme);
    });
}
