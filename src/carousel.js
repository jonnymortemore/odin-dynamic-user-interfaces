export class Carousel {

    #carouselRotate = 5000;
    #standardTransition = 'left 0.8s ease';

    constructor(
        container = document.querySelector(".carousel-container"),
        leftButton = document.querySelector(".carousel-button.left"),
        rightButton = document.querySelector(".carousel-button.right"),
        viewWindow = document.querySelector(".carousel-view-window"),
        itemContainer = document.querySelector(".carousel-item-container"),
    ) {
        this.container = container;
        this.leftButton = leftButton;
        this.rightButton = rightButton;
        this.viewWindow = viewWindow;
        this.itemContainer = itemContainer;
        this.width = this.viewWindow.clientWidth;
        this.setupItemContainer();
        this.setupCarouselItems();

        this.maxTravel = -(Math.abs(this.width) * (this.carouselItems.length - 1));

        this.fitItemsToRightSize();
        this.setupButtons();

        //setTimeout(this.timeoutMove.bind(this), this.#carouselRotate);
    }

    setupItemContainer() {
        // on end of transition, if at the front or back of the carouselItems, disable transition and move back to start / end
        this.itemContainer.addEventListener('transitionend', () => {
            let left = parseInt(window.getComputedStyle(this.itemContainer).left, 10);
            if (left === this.maxTravel) {
                this.itemContainer.style.transition = "none"
                this.itemContainer.style.left = `-${this.width}px`
            } else if (left === 0) {
                this.itemContainer.style.transition = "none"
                this.itemContainer.style.left = `${this.maxTravel + this.width}px`
            }
        });
        this.itemContainer.style.left = `-${this.width}px`

    }

    setupCarouselItems() {
        //add a copy of first and last children to hide loop
        const copiedFirstChild = this.itemContainer.firstElementChild.cloneNode();
        const copiedLastChild = this.itemContainer.lastElementChild.cloneNode();
        this.itemContainer.appendChild(copiedFirstChild);
        this.itemContainer.prepend(copiedLastChild);
        this.carouselItems = this.itemContainer.querySelectorAll("*");
    }

    fitItemsToRightSize() {
        this.carouselItems.forEach((item) => {
            item.width = this.viewWindow.clientWidth;
        })
    }

    timeoutMove() {
        this.moveCarousel(-this.width, "right");
        setTimeout(this.timeoutMove.bind(this), this.#carouselRotate);
    }

    setupButtons() {
        this.leftButton.addEventListener("click", () => {
            this.moveCarousel(this.width);
            console.log("move left");
        });

        this.rightButton.addEventListener("click", () => {
            this.moveCarousel(-this.width);
            console.log("move right");
        });
    }

    moveCarousel(width) {
        this.itemContainer.style.transition = this.#standardTransition;
        // gets the final style for the element
        let left = parseInt(window.getComputedStyle(this.itemContainer).left, 10);
        left += width;
        this.itemContainer.style.left = `${left}px`;
    }
}
