
export const gallery = (function () { 

    const images = require.context('../src/images/gallery', false, /\.(webp)$/);
    const gallery = images.keys().map(images);

    console.log('Number of items in the gallery folder:', gallery.length);

    let arr = []
    for(let i = 1 ; i <= gallery.length - 1 ; i++ ){
            let tmpImg = require(`../src/images/gallery/${i}.webp`)
            arr.push(tmpImg)
        
    }
    console.log("arr",arr)
    return arr
})()

console.log(gallery)




// export default gallery;



