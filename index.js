const SAFE_LIMIT = 23

const sumDigitOfAbs = (num) => {
    // const target = Math.abs(num)
    // let currentDigit = 10
    // let currentNum = target % currentDigit
    // let result = currentNum
    // while (currentNum !== 0) {
    //     result += currentNum
    //     currentDigit = currentDigit * 10
    //     currentNum = Math.floor(target / currentDigit)
    // }

    const target = Math.abs(num).toString()
    let result = 0
    for (let i = 0; i < target.length ; i++) {
        result += parseInt(target[i])
    }

    return result
}

// pos = { x, y }
const isCurrentPositionSafe = (pos) => {
    const sumDigits = sumDigitOfAbs(pos.x) + sumDigitOfAbs(pos.y)
    if (sumDigits > SAFE_LIMIT) {
        return false
    }
    return true
}

const changePos = (pos, changePos) => {
    return {
        x: pos.x + changePos.x,
        y: pos.y + changePos.y,
    }
}
const hasBeenThisArea = (pos, safeArea) => {
    if (safeArea[pos.y] && safeArea[pos.y][pos.x] === true) {
        return true
    }
    return false
}
const addSafeArea = (pos, safeArea) => {
    if (!safeArea[pos.y]) {
        safeArea[pos.y] = {}
    }
    safeArea[pos.y][pos.x] = true
}

const findSafeArea = (currentPos, safeArea, stack, yRange, xRange, result) => {
    return new Promise((resolve) => {
        if (hasBeenThisArea(currentPos, safeArea)) {
            return
        }
        if (!isCurrentPositionSafe(currentPos)) {
            return
        }
        addSafeArea(currentPos, safeArea)
        result.area += 1
        yRange.max = Math.max(yRange.max, currentPos.y)
        yRange.min = Math.min(yRange.min, currentPos.y)
        xRange.max = Math.max(xRange.max, currentPos.x)
        xRange.min = Math.min(xRange.min, currentPos.x)
        stack.push(() => {
            findSafeArea(changePos(currentPos, { x: -1, y: 0 }), safeArea, stack, yRange, xRange, result)
            findSafeArea(changePos(currentPos, { x: 1, y: 0 }), safeArea, stack, yRange, xRange, result)
            findSafeArea(changePos(currentPos, { x: 0, y: -1 }), safeArea, stack, yRange, xRange, result)
            findSafeArea(changePos(currentPos, { x: 0, y: 1 }), safeArea, stack, yRange, xRange, result)
        })
        resolve()
    })
}

// return will be number of accessible area
const solution = async () => {
    const startPos = { x: 0, y: 0 }
    const safeArea = {}
    const xRange = { max: 0, min: 0 }
    const yRange = { max: 0, min: 0 }
    const result = { area: 0 } 
    const stack = [() => {
        return new Promise((resolve) => {
            findSafeArea(startPos, safeArea, stack, yRange, xRange, result)
            resolve()
        })
    }]
    while (stack.length > 0) {
        const nextTick = stack.pop()
        await nextTick()
    }
    return {
        yRange,
        xRange,
        area: result.area,
    }

}

(async function () {
    const start = new Date()
    const result = await solution()
    const end = new Date()
    console.log('result', result)
    console.log('time: ', end - start)
})()