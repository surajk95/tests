const xLimit = 500, yLimit = 500, animationSpeed = 50, jumpFactor = 10

window.onload = () => {
    console.log('init...')
    init()
};

function init() {
    pulse()
}

function pulse() {
    const target = document.querySelector('#pulse')
    target.innerHTML = `<svg id="svg" height="${yLimit}" width="${xLimit}">
    <path d="M0 0" />
</svg>`
    //draw_web(0)
    draw_heartbeat(0)
}

function draw_heartbeat(x, count=0) {
    // if(x>xLimit) x = 0
    const target = document.querySelector('#svg')
    const html = target.innerHTML
    //console.log(target)
    const randY = gen(yLimit)
    let pathString = html.replace(`"></path>`, ` L${x} ${randY}"></path>`)
    // if(count>1) {
    //     `L${x} ${randY} L${x+10} ${Math.floor(yLimit/2)} L${xLimit} ${Math.floor(yLimit/2)}"></path>`
    // }
    if(x>xLimit-10) pathString = replaceOld(pathString)
    target.innerHTML = pathString
    target.style.transform = `translateX(-${x}px)`
    // if(x>xLimit-100) {
    //     target.style.transform = `translateX(-${x}px)`
    // }
    if(count<500) {
        count++
        setTimeout(() =>draw_heartbeat(x+jumpFactor, count), animationSpeed)
    }
}

function replaceOld(s) {
    return s.replace(/\<path d=\"\w+\s\w+\s\w/, '<path d="M')
}

function draw_web(x, count=0) {
    const target = document.querySelector('#svg')
    //console.log(target.innerHTML)
    const randX = gen(xLimit), randY = gen(yLimit)
    const pathString = target.innerHTML.replace(`"></path>`, ` L${randX} ${randY}"></path>`)
    target.innerHTML = pathString
    if(count<500) {
        count++
        setTimeout(() =>draw_web(x+10, count), animationSpeed)
    }
}

function gen(limit) {
    return Math.floor(Math.random()*limit)
}
