
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
    const hex = document.createElement('div')
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
    for (let i = 0; i < 10; i++) {
        const color = document.createElement('span')
        color.classList.add('clr')
        history.appendChild(color)
    }
    if (!localStorage.getItem('colors')) return
    let i = 9
    colors.forEach(e => {
        colored = history.querySelectorAll('span')[i]
        colored.style.backgroundColor = e
        colored.style.cursor = 'pointer'
        tooltip(colored,'top','Choose me  !',true,'3rem','3.5rem')
        colored.addEventListener('click', () => {
            document.getElementById('pick-color').value=e
            printColor(e)
        });
        --i
    })
}
function tooltip(element,position,text,empty,h,w){
    const tooltip = document.createElement('tooltip')
    const tcontent = document.createElement('content')
    if (empty){
        tooltip.style.width = w
        tooltip.style.height = h
    }
    element.appendChild(tooltip)
    tcontent.classList.add(`t-content`)
    tcontent.classList.add(`t-${position}`)
    tcontent.textContent = text
    tooltip.appendChild(tcontent)
}
function clearHistory() {
    if (localStorage.getItem('colors')) localStorage.removeItem('colors')
    history()
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
document.getElementById('save-color').addEventListener('click',() => saveColor(document.getElementById('pick-color').value))
document.getElementById('clear-history').addEventListener('click',()  => clearHistory())