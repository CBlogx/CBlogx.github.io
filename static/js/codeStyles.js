export default function codeStyles() {
  let codeTmp = document.querySelectorAll(".highlight");
  codeTmp.forEach((code) => {
    code.style.background = "red";
  });
}
