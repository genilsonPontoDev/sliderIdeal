export default class Slider {

    options = {}
    stage = null
    strip = null
    chunks = 1
    slideWidth = 1
    slideWidthIten = 1
    gap = 0
    step = 0
    total = 0
    autoplay = false
    timeout = false
    delay = null
    pauseautoplay = false

    constructor($slider, options) {
        this.stage = $slider
        this.options = options
        this.autoplay = options.autoPlay
        this.delay = options.delay
        this.gap = options.gap

        this.creatElementsHTML()
    }

    setStyleSlider() {
        this.stage.style.width = "100%"
        this.stage.style.display = "block"
        this.stage.style.overflow = "hidden"
        this.stage.style.position = "relative"
    }

    createStrip() {
        this.strip = document.createElement('div')
        this.getBreakPoint()
        this.getDimentions()
        this.strip.style.display = 'flex'
        this.strip.style.gap = this.gap + 'px'
        this.strip.style.position = 'relative'
        this.strip.style.right = 'var(--move, 0px)'
        this.strip.style.transition = 'right .3s ease-in-out'
        this.strip.style.width = Math.floor(this.slideWidthIten * this.options.data.length) + 'px'
    }

    getDimentions() {
        this.slideWidthIten = Math.floor(this.stage.offsetWidth / this.chunks) + Math.floor(this.gap / this.chunks)   
        this.slideWidth = this.slideWidthIten * this.chunks
        console.log(this.slideWidth)     
    }

    getBreakPoint() {
        Object.keys(this.options.breakPoints).forEach(w => {
            if (window.innerWidth > w) {
                this.chunks = Math.floor(this.options.breakPoints[w])
            }
        });
        this.calcTotal()
    }

    addItens() {
        this.strip.innerHTML = this.options.data.map(this.options.item).map(e => `<div class="js-itens" style="width:${this.slideWidthIten}px;">${e}</div>`).join('')
        this.stage.innerHTML = ''
        this.stage.append(this.strip)
    }

    creatElementsHTML() {
        this.setStyleSlider()
        this.createStrip()
        this.addItens()
        this.setAutoPlay()
        this.createStepBar()
        this.activateStepButton()
        this.setEvents()
    }

    calcTotal() {
        this.total = Math.ceil(this.options.data.length / this.chunks)
    }

    setEvents() {

        console.log(this.options.btnNext)
        
        this.options.btnNext.forEach(e => e?.addEventListener("click", () => this.iSliderNext()))
        this.options.btnPrev.forEach(e => e?.addEventListener("click", () => this.iSlidePrev()))
        this.stage.addEventListener('mouseover', () => this.pauseAutoPlay())
        this.stage.addEventListener('mouseout', () => this.continueAutoPlay())
        this.createStepsButtons()
        window.addEventListener('resize', () => this.autoResize())
    }

    iSliderNext() {
        if (this.step < (this.total - 1)) {
            this.step++
        }
        this.strip.style.setProperty('--move', 'calc(' + this.step + ' * ' + this.slideWidth + 'px)')
        this.jsAutoPlay()
        this.activateStepButton()
    }

    iSlidePrev() {        
        if (this.step > 0) {
            this.step--
        }
        this.strip.style.setProperty('--move', 'calc(' + this.step + ' * ' + this.slideWidth + 'px)')
        this.jsAutoPlay()
        this.activateStepButton()
    }

    iSlideJump(jumpStep) {
        this.step = jumpStep
        this.strip.style.setProperty('--move', 'calc(' + this.step + ' * ' + this.slideWidth + 'px)')
        this.jsAutoPlay()
        this.activateStepButton()
    }

    setAutoPlay() {
        window.onload = () => { this.jsAutoPlay() }
    }

    jsAutoPlay() {
        this.clearAutoPlay()
        if (this.autoplay) {
            this.timeout = setTimeout(() => {
                this.iSliderNext()
                this.jsAutoPlay()
            }, this.delay);
        }
    }

    clearAutoPlay() {
        clearTimeout(this.timeout)
        this.timeout = null
    }

    pauseAutoPlay() {
        this.clearAutoPlay()
        if (this.autoplay) {
            this.autoplay = false
            this.pauseautoplay = true
        }

    }

    continueAutoPlay() {
        this.clearAutoPlay()
        if (this.pauseautoplay) {
            this.autoplay = true
            this.jsAutoPlay()
        }
    }

    createStepBar() {
        this.options.steps.forEach(stepsBar => {
            for (var i = 0; i < this.total; i++) {
                if (stepsBar) {
                    stepsBar.innerHTML += `<span class="step-button-bar" jumpto="${i}">${i}</span>`
                }
            }
        });
    }

    resetStepBar() {
        this.options.steps.forEach(stepsBar => {
            stepsBar.innerHTML = ''
        });
    }

    createStepsButtons() {
        this.options.steps.forEach(buttosItens => {
            if (buttosItens) {
                var stepsButtons = Array.from(buttosItens.querySelectorAll('span'))
                stepsButtons.forEach(button => {
                    button.addEventListener("click", () => this.iSlideJump(button.getAttribute('jumpto')))
                });
            }
        });
    }

    activateStepButton() {
        this.options.steps.forEach(stepsBar => {
            if (stepsBar) {
                Array.from(stepsBar.querySelectorAll('.js-active')).map(e => e.classList.remove('js-active'))
                stepsBar['children'][this.step].classList.add('js-active')
            }
        })
    }

    autoResize() {
        this.setStyleSlider()
        this.createStrip()
        this.addItens()
        this.setAutoPlay()
        this.resetStepBar()
        this.createStepBar()
        this.activateStepButton()
        this.createStepsButtons()
    }
}