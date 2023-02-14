
function printColor(color) {
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const result_rgb = document.getElementById("result-rgb")
    const result_hex = document.getElementById("result-hex")
    while (result_rgb.firstChild) result_rgb.removeChild(result_rgb.firstChild)
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

    result_rgb.onclick = () => {
        result_rgb.textContent = 'Copied !'
        navigator.clipboard.writeText(`rgb(${r},${g},${b})`)
        setTimeout(() => printColor(color), 1500)
    }

    // partie hexa
    while (result_hex.firstChild) result_hex.removeChild(result_hex.firstChild)
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
function history() {
    const history = document.getElementById("history")
    while (history.firstChild) history.removeChild(history.firstChild)
    const colors = getColors()
    history.style.padding = "1rem"
    history.style.height = "130px"
    for (let index = 0; index < 10; index++) {
        const color = document.createElement('span')
        color.style.backgroundColor = "whitesmoke"
        color.style.borderRadius = "5px"
        color.style.height = "3rem"
        color.style.width = "3.5rem"
        color.style.float = "Left"
        color.style.position = "relative"
        color.style.marginLeft = "5px"
        color.style.marginTop = "5px"
        color.style.cursor = "pointer"
        history.appendChild(color)
        tooltip(color,'top','Choose the color !')
    }
    let i = 9
    colors.forEach(e => {
        history.querySelectorAll('span')[i].style.backgroundColor = e
        history.querySelectorAll('span')[i].addEventListener('click', () => {
            document.getElementById('pick-color').value=e
            printColor(e)
        });
        i--
    })
}
function tooltip(element,position,text){
    const tooltip = document.createElement('span')
    // element.style.position = "relative"
    element.classList.add('tooltip')
    element.appendChild(tooltip)
    tooltip.classList.add(`tooltiptext-${position}`)
    tooltip.textContent = text
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
    history()
}
function getColors(){ return JSON.parse(localStorage.getItem('colors'))} 
history()
document.getElementById('pick-color').addEventListener('input',e  => printColor(e.target.value))
document.getElementById('pick-color').addEventListener('change',e  => printColor(e.target.value))
document.getElementById('save-color').addEventListener('click',( ) => saveColor(document.getElementById('pick-color').value))