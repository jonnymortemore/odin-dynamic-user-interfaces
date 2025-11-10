export class Carousel {
    constructor(
        container = document.querySelector(".carousel-container"),
        leftButton = document.querySelector(".carousel-button.left"),
        rightButton = document.querySelector(".carousel-button.right"),
        viewWindow = document.querySelector(".carousel-view-window"),
        itemContainer = document.querySelector(".carousel-item-container"),
        carouselItems = document.querySelectorAll(".carousel-item"),
    ) {
        this.container = container;
        this.leftButton = leftButton;
        this.rightButton = rightButton;
        this.viewWindow = viewWindow;
        this.itemContainer = itemContainer;
        this.carouselItems = carouselItems;
        this.fitItemsToRightSize();
        this.setupButtons();
    }

    fitItemsToRightSize() {
        this.carouselItems.forEach((item) => {
            item.width = this.viewWindow.clientWidth;
        })
    }

    setupButtons() {
        const width = this.viewWindow.clientWidth;
        this.leftButton.addEventListener("click", () => {
            this.moveCarousel(width, "left");
            console.log("move left");
        });

        this.rightButton.addEventListener("click", () => {
            this.moveCarousel(-width, "right");
            console.log("move right");
        });
    }

    moveCarousel(width, direction) {
        // gets the final style for the element
        let left = parseInt(window.getComputedStyle(this.itemContainer).left, 10);
        const maxTravel = -(Math.abs(width) * (this.carouselItems.length - 1));
        left += width;
        if (left > 0 && direction === "left") {
            left = 0;
        } 
        if (left < maxTravel && direction === "right") {
            left = maxTravel;
        }
        this.itemContainer.style.left = `${left}px`;
    }
}
