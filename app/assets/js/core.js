
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
    hex.onclick = () => {
        hex.textContent = 'Copied !'
        navigator.clipboard.writeText(color)
        setTimeout(() => hex.textContent = color, 1500)
    }

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
function history(){
    const array1 = ['a', 'b', 'c'];
    array1.forEach(element => console.log(element));
}
function saveColor(color) {
    const old = localStorage.getItem('colors')
    if (!old) {
        const colors = []
        colors.push(color)
        localStorage.setItem('colors', JSON.stringify(colors))
    } else {
        const colors = []
        JSON.parse(old).forEach(color => colors.push(color))
        if (colors.length >= 10) colors.shift()
        colors.push(color)
        localStorage.setItem('colors', JSON.stringify(colors))
    }
}
function getColors() {
    return JSON.parse(localStorage.getItem('colors'))
}

// document.getElementById('result-hex').addEventListener('click' ,e => copy_password(document.getElementById('result-hex').innerText))
// document.getElementById('tooltip').addEventListener('mouseout',e => outFunc())
document.getElementById('pick-color').addEventListener('input',e => printColor(e.target.value))
document.getElementById('save-color').addEventListener('click',() => saveColor(document.getElementById('pick-color').value))
document.getElementById('')
// document.getElementById('history').addEventListener('4*')
// get rgb a faireold