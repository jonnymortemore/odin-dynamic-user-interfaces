export class Carousel {
    #carouselRotate = 5000;
    #standardTransition = "left 0.8s ease";
    #transitioning = false;

    constructor(
        container = document.querySelector(".carousel-container"),
        leftButton = document.querySelector(".carousel-button.left"),
        rightButton = document.querySelector(".carousel-button.right"),
        viewWindow = document.querySelector(".carousel-view-window"),
        itemContainer = document.querySelector(".carousel-item-container"),
        navigator = document.querySelector(".carousel-navigator"),
    ) {
        this.container = container;
        this.leftButton = leftButton;
        this.rightButton = rightButton;
        this.viewWindow = viewWindow;
        this.itemContainer = itemContainer;
        this.navigator = navigator;

        this.width = this.viewWindow.clientWidth;
        this.setupItemContainer();
        this.setupCarouselItems();
        this.setupNavigator();
        this.slideCountCurr = 1;
        this.slideCountMax = this.carouselItems.length - 2
        this.maxTravel = -(
            Math.abs(this.width) *
            (this.carouselItems.length - 1)
        );

        this.fitItemsToRightSize();
        this.setupButtons();

        setTimeout(this.timeoutMove.bind(this), this.#carouselRotate);
    }

    setupNavigator() {
        for (let i = 0; i < this.carouselItems.length; i++) {
            if (i < 1 || i >= this.carouselItems.length - 1) {
                continue
            }
            const navPoint = document.createElement("div");
            navPoint.classList.add("nav-point");
            navPoint.id = `slide_nav_${i}`;
            navPoint.dataset.slide = i;
            if (i === 1) {
                navPoint.classList.add("selected");
            } else {
                navPoint.classList.add("not-selected");
            }
            this.navigator.appendChild(navPoint);
            navPoint.addEventListener("click", (evt) => {
                const slide = parseInt(evt.target.dataset.slide);
                this.moveCarousel(slide, true);
            })
        }
    }

    changeNavPoint() {
        this.navigator.querySelectorAll(".nav-point").forEach((nav) => {
        nav.className = "nav-point";
        if (nav.id === `slide_nav_${this.slideCountCurr}`) {
            nav.classList.add("selected");
        }
       });
    }

    setupItemContainer() {
        // on end of transition, if at the front or back of the carouselItems, disable transition and move back to start / end
        this.itemContainer.addEventListener("transitionend", () => {
            this.#transitioning = false;
            let left = parseInt(
                window.getComputedStyle(this.itemContainer).left,
                10,
            );
            if (left === this.maxTravel) {
                this.itemContainer.style.transition = "none";
                this.itemContainer.style.left = `-${this.width}px`;
                this.slideCountCurr = 1
            } else if (left === 0) {
                this.itemContainer.style.transition = "none";
                this.itemContainer.style.left = `${this.maxTravel + this.width}px`;
                this.slideCountCurr = this.slideCountMax
            }
        
            this.changeNavPoint();
        });
        this.itemContainer.style.left = `-${this.width}px`;
    }

    setupCarouselItems() {
        //add a copy of first and last children to hide loop
        const copiedFirstChild =
            this.itemContainer.firstElementChild.cloneNode();
        const copiedLastChild = this.itemContainer.lastElementChild.cloneNode();
        this.itemContainer.appendChild(copiedFirstChild);
        this.itemContainer.prepend(copiedLastChild);
        this.carouselItems = this.itemContainer.querySelectorAll("*");
    }

    fitItemsToRightSize() {
        this.carouselItems.forEach((item) => {
            item.width = this.viewWindow.clientWidth;
        });
    }

    timeoutMove() {
        if (!this.#transitioning) {
            this.moveCarousel(1, false);
        }
        setTimeout(this.timeoutMove.bind(this), this.#carouselRotate);
    }

    setupButtons() {
        this.leftButton.addEventListener("click", () => {
            this.moveCarousel(-1, false);
            console.log("move left");
        });

        this.rightButton.addEventListener("click", () => {
            this.moveCarousel(1, false);
            console.log("move right");
        });
    }


    moveCarousel(currentSlide, set) {
        this.itemContainer.style.transition = this.#standardTransition;
        // gets the final style for the element
        if (set) {
            this.slideCountCurr = currentSlide;
        } else {
            this.slideCountCurr += currentSlide;
        }

        if (this.slideCountCurr > this.carouselItems.length - 1) {
            this.slideCountCurr = this.carouselItems.length - 1
        }

        if (this.slideCountCurr < 0) {
            this.slideCountCurr = 0
        }
        this.itemContainer.style.left = `${this.slideCountCurr * -this.width}px`;
        this.#transitioning = true;
    }
}
