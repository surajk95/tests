let xLimit = window.innerWidth-0, yLimit = 400, animationSpeed = 500, jumpFactor = 50
const head = [[0, yLimit], [jumpFactor, yLimit]], tail = [[xLimit-jumpFactor, yLimit], [xLimit, yLimit]]
let beats = [...head, ...tail]
let target = null

window.onload = () => {
    console.log('init...')
    init()
};

function init() {
    target = document.querySelector('#pulse')
    //xLimit = window.innerWidth-300
    pulse2()
}

function pulse() {
    const target = document.querySelector('#pulse')
    target.innerHTML = `<svg id="svg" height="${yLimit}" width="${xLimit}">
    <path d="M0 0" />
</svg>`
    //draw_web(0)
    draw_heartbeat(0)
}

function pulse2() {
    //render()
    const numValues = Math.floor(xLimit/jumpFactor)-3
    insert_rand(numValues)
    render()
    next_iter()
    setInterval(animate_pulse, animationSpeed)
    // target.innerHTML = get_path()
}

function render() {
    target.innerHTML = get_path()
}

function animate_pulse() {
    render()
    next_iter()
    // setTimeout(animate_pulse, 1000)
    // setTimeout(animate_pulse(), 1000)
}

function get_path() {
    let path = `<svg id="svg" height="${yLimit}" width="${xLimit}">
    <path d="M ${beats[0][0]} ${beats[0][1]}`
    for(let i=1; i<beats.length; i++) {
        path += ` L ${beats[i][0]} ${beats[i][1]}`
    }
    path += `"</svg>`
    return path
}

function insert_rand(val) {
    beats.pop()
    beats.pop()
    for(let i=0; i<=val; i++) {
        const prev = beats[beats.length-1]
        beats.push([prev[0]+jumpFactor, gen(yLimit)])
    }
    beats[beats.length-1][1] = yLimit
    beats.push(...tail)
    // console.log(`rand`, beats)
}

function next_iter() {
    let body = [...beats].slice(3, beats.length-2)
    // console.log(body)
    for(let i of body) {
        i[0] -= jumpFactor
    }
    body.push([body[body.length-1][0]+jumpFactor, gen(yLimit)])
    beats = [...head, ...body, ...tail]
    // console.log(`iter`, beats)
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
        setTimeout(() =>draw_web(x+jumpFactor, count), animationSpeed)
    }
}

function gen(limit) {
    return Math.floor(Math.random()*limit)
}
