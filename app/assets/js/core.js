
function printColor(ev) {
    const color = ev.target.value
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    console.log(`red: ${r}, green: ${g}, blue: ${b}`)
    console.log([r, g, b])
    alert(`R: ${r}, G: ${g}, B: ${b}`)
}
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('pick-color');
    // onClick's logic below:
    link.addEventListener('click', function() {
        hellYeah('xxx');
    });
});