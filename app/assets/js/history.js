// affiche l'historique des couleurs
import {tooltip,printColor} from './print-color.js'
import {context} from './context-history.js'
export function history() {
    const history = document.getElementById("history")
    while (history.firstChild) history.removeChild(history.firstChild)
    const colors = getColors()
    for (let i = 0; i < 10; i++) {
        const color = document.createElement('span')
        color.classList.add('clr')
        history.appendChild(color)
    }
    if (!localStorage.getItem('colors')) return
    let i = 0
    colors.slice().reverse().forEach(function(e) {
        const colored = history.querySelectorAll('span')[i]
        colored.style.backgroundColor = e
        colored.style.cursor = 'pointer'
        colored.addEventListener("contextmenu",function() {return context(this)})
        tooltip(colored,'top','Choose me  !',true,'3rem','3.5rem')
        colored.addEventListener('click', () => {
            document.getElementById('pick-color').value=e
            printColor(e)
        });
        ++i    
    });
}
// suprime l'historique
export function clearHistory() {
    if (localStorage.getItem('colors')) localStorage.removeItem('colors')
    history()
}
// suprime une couleur dans l'historique
export function clearColor() {
    if (localStorage.getItem('colors')) {
        const removeProduct = productId => {
            let products = localStorage.getItem('colors')
            const index = products.findIndex(product => product.product_id === productId)
            if (index > -1) {
                products.slice(index, 1)
            }
            localStorage.setItem('colors')
        }
    history()
    }
}
// sauvegarde la couleur dans l'historique
export function saveColor(color) {
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
// parse les couleurs en string
export function getColors(){ return JSON.parse(localStorage.getItem('colors'))}