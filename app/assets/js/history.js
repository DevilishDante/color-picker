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
        colored.style.backgroundColor = e.color
        colored.id = e.id
        colored.style.cursor = 'pointer'
        colored.addEventListener("contextmenu",function() {return context(this)})
        tooltip(colored,'top','Choose me  !',true,'3rem','3.5rem')
        colored.addEventListener('click', () => {
            document.getElementById('pick-color').value=e.color
            printColor(e.color)
        });
        ++i    
    });
}
// suprime l'historique
export function clearHistory() {
    if (localStorage.getItem('colors')) localStorage.removeItem('colors')
    history()
}
// suprime une couleur précise dans l'historique
export function clearColor(ColorsId) {
    if (localStorage.getItem('colors')) {
        const colors = JSON.parse(localStorage.getItem('colors'))
        const clrs = []
        colors.forEach(color => {
            if (color.id !== ColorsId){
                clrs.push(color)
            }
        })
        localStorage.setItem('colors', JSON.stringify(clrs))
        history()
    }
}
// sauvegarde la couleur dans l'historique
export function saveColor(color) {
    const old = localStorage.getItem('colors')
    if (!old) {
        const colors = []
        let id = crypto.randomUUID();
        colors.push({color:color,id:id})
        localStorage.setItem('colors', JSON.stringify(colors))
    } else {
        let id = crypto.randomUUID()
        const colors = []
        JSON.parse(old).forEach(color => colors.push(color))
        var exists = false
        colors.forEach(clr => {
            if (clr.id === id) return exists = true
            if (clr.color === color) return exists = true
        })
        if (exists) return 
        if (colors.length >= 10) colors.shift()
        colors.push({color:color,id:id})
        localStorage.setItem('colors', JSON.stringify(colors))
    }
    history()
}
// parse les couleurs en string
export function getColors(){ return JSON.parse(localStorage.getItem('colors'))}