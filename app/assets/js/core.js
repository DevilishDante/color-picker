
function printColor(color) {
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const result_rgb = document.getElementById("result-rgb")
    result_rgb.textContent = `R: ${r}, G: ${g}, B: ${b}`;
}
document.getElementById('pick-color').addEventListener('input',e => printColor(e.target.value))