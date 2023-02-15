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
    svg(invertColor(color,false))
    result_hex.appendChild(hex)
}
// inverse la couleur du picker
export function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {hex = hex.slice(1);}
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];}
    if (hex.length !== 6) {throw new Error('Invalid HEX color.');}
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
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
export function svg (color) {
    const svg = document.getElementById('pick-svg')
    svg.innerHTML = `<svg id="pick-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill=" ${color}" height="3rem" width="3.5rem" version="1.1" id="Icons" viewBox="0 0 32 32" xml:space="preserve"><path d="M27.7,3.3c-1.5-1.5-3.9-1.5-5.4,0L17,8.6l-1.3-1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.3,1.3L5,20.6  c-0.6,0.6-1,1.4-1.1,2.3C3.3,23.4,3,24.2,3,25c0,1.7,1.3,3,3,3c0.8,0,1.6-0.3,2.2-0.9C9,27,9.8,26.6,10.4,26L21,15.4l1.3,1.3  c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L22.4,14l5.3-5.3C29.2,7.2,29.2,4.8,27.7,3.3z M9,24.6  c-0.4,0.4-0.8,0.6-1.3,0.5c-0.4,0-0.7,0.2-0.9,0.5C6.7,25.8,6.3,26,6,26c-0.6,0-1-0.4-1-1c0-0.3,0.2-0.7,0.5-0.8  c0.3-0.2,0.5-0.5,0.5-0.9c0-0.5,0.2-1,0.5-1.3L17,11.4l2.6,2.6L9,24.6z"/></svg>`
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