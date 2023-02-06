
function printColor(color) {
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const result_rgb = document.getElementById("result-rgb")
    const result_hex = document.getElementById("result-hex")
    while(result_rgb.firstChild)result_rgb.removeChild(result_rgb.firstChild)
    const red = document.createElement('span')
    red.classList.add('red')
    red.textContent = `R: ${r}`
    result_rgb.appendChild(red)

    const green = document.createElement('span')
    green.classList.add('green')
    green.textContent = `G: ${g}`
    result_rgb.appendChild(green)

    const blue = document.createElement('span')
    blue.classList.add('blue')
    blue.textContent = `B: ${b}`
    result_rgb.appendChild(blue)

    // partie hexa
    while(result_hex.firstChild)result_hex.removeChild(result_hex.firstChild)

    const hex = document.createElement('span')
    hex.classList.add('hex')
    hex.textContent = color
    result_hex.appendChild(hex)
}
function copy_password(text) {
    navigator.clipboard.writeText(text.value);
    
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copied: " + text.value;
}
function outFunc() {
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copy to clipboard";
}
// document.getElementById('result-hex').addEventListener('click' ,e => copy_password(document.getElementById('result-hex').innerText))
// document.getElementById('tooltip').addEventListener('mouseout',e => outFunc())
document.getElementById('pick-color').addEventListener('input',e => printColor(e.target.value))
// get rgb a faire