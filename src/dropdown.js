export class Dropdown {
    constructor(
        selectedEl = document.querySelector(".dropdown-selected"),
        containerEl = document.querySelector(".dropdown-container"),
        dropdownEl = document.querySelector(".dropdown"),
        buttonEl = document.querySelector(".show-dropdown-button"),
    ) {
        this.container = containerEl;
        this.selectedDiv = selectedEl;
        this.dropdown = dropdownEl;
        this.dropdown.style.display = "none";
        this.dropdown.hidden = true;
        this.button = buttonEl;

        this.assignButtonEventListener();
    }

    assignButtonEventListener() {
        this.button.addEventListener("click", () => {
            console.log("click");
            if (this.dropdown.hidden === true) {
                this.showDropdown();
            } else {
                this.hideDropdown();
            }
        });
    }

    hideDropdown() {
        this.dropdown.hidden = true;
        this.dropdown.style.display = "none";
    }

    showDropdown() {
        this.dropdown.hidden = false;
        this.dropdown.style.display = "flex";
    }
}
