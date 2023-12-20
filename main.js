import Slider from './Slider.js'

const options = {
    btnNext: [document.querySelector('.js-next'), document.querySelector('.js-next-2')],
    btnPrev: [document.querySelector('.js-prev')],    
    steps: [document.querySelector('.js-steps'), document.querySelector('.js-steps-2')],
    gap: 10,
    data: [
        './midia/OIG.d3e1HBCsU.jpg',
        './midia/OIG.o.2H.jpg',
        './midia/OIG.It.jpg',
        './midia/OIG.jpg',
        './midia/OIG(1).jpg',
        './midia/OIG(2).jpg',
        './midia/OIG(3).jpg',
        './midia/OIG(4).jpg',
        './midia/OIG(5).jpg',
        './midia/OIG(6).jpg',
        './midia/OIG(7).jpg',
        './midia/OIG(8).jpg',

        './midia/OIG.d3e1HBCsU.jpg',
        './midia/OIG.o.2H.jpg',
        './midia/OIG.It.jpg',
        './midia/OIG.jpg',
        './midia/OIG(1).jpg',
        './midia/OIG(2).jpg',
        './midia/OIG(3).jpg',
        './midia/OIG(4).jpg',
        './midia/OIG(5).jpg',
        './midia/OIG(6).jpg',
        './midia/OIG(7).jpg',
        './midia/OIG(8).jpg',

        './midia/OIG.d3e1HBCsU.jpg',
        './midia/OIG.o.2H.jpg',
        './midia/OIG.It.jpg',
        './midia/OIG.jpg',
        './midia/OIG(1).jpg',
        './midia/OIG(2).jpg',
        './midia/OIG(3).jpg',
        './midia/OIG(4).jpg',
        './midia/OIG(5).jpg',
        './midia/OIG(6).jpg',
    ],
    item: uri => `<img src='${uri}'>`,
    breakPoints: {
        0: 1,
        420: 2,
        768: 3,
        1200: 4
    }
    ,
    autoPlay: false,
    delay: 1000
}
const $slider = document.querySelector('.js-slides')

const sl = new Slider($slider, options)
