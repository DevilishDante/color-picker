// affiche l'historique des couleurs
import {tooltip} from './print-color.js'
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
    let i = 9
    colors.forEach(e => {
        const colored = history.querySelectorAll('span')[i]
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
// suprime l'historique
export function clearHistory() {
    if (localStorage.getItem('colors')) localStorage.removeItem('colors')
    history()
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