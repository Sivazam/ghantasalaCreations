
export const gallery = (function () { 
    let arr = []
    for(let i = 1 ; i <= 20 ; i++ ){
            let tmpImg = require(`../src/images/gallery/${i}.webp`)
            arr.push(tmpImg)
        
    }
    console.log("arr",arr)
    return arr
})()

console.log(gallery)

// const gallery = [
//     {
//         img:'../src/images/gallery/1.jpg'
//     }
// ]