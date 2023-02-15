// get et affiche la couleur
export function printColor(color) {
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    const result_rgb = document.getElementById("result-rgb")
    const result_hex = document.getElementById("result-hex")
    const pickicon = document.getElementById('pick-icon')
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
// inverse la couleur du picker
export function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
// Gêre les infobulles
export function tooltip(element,position,text,empty,h,w){
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