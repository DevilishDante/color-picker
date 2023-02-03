
function printColor(ev) {
    const color = ev.target.value
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    console.log(`red: ${r}, green: ${g}, blue: ${b}`)
    console.log([r, g, b])
    alert(`R: ${r}, G: ${g}, B: ${b}`)
}
function loadSearch() {
    var inputResult = document.getElementById("input").value;
    var final = 'https://www.google.com/search?q=' + encodeURI(inputResult + 'site:v3rmillion.net');
    chrome.tabs.create({url: final});
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input').addEventListener('click', loadSearch, false);
}, false)