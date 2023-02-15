// printcolor
import {printColor,svg} from './print-color.js'
// history
import {saveColor,clearHistory,history} from './history.js'
// event
history()
svg('#00000');
document.getElementById('pick-color').addEventListener('input',e  => printColor(e.target.value))
document.getElementById('pick-color').addEventListener('change',e  => printColor(e.target.value))
document.getElementById('save-color').addEventListener('click',() => saveColor(document.getElementById('pick-color').value))
document.getElementById('clear-history').addEventListener('click',()  => clearHistory())