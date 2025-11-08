export class Dropdown {
    constructor(
        selectedValue,
        contents,
        selectedEl = document.querySelector(".dropdown-selected"),
        containerEl = document.querySelector(".dropdown-container"),
        dropdownEl = document.querySelector(".dropdown"),
        buttonEl = document.querySelector(".show-dropdown-button"),
    ) {
        this.container = containerEl;

        this.selectedValue = selectedValue;
        this.selectedDiv = selectedEl;

        this.selectedDiv.innerText = this.selectedValue;

        this.dropdown = dropdownEl;
        this.dropdown.style.display = "none";
        this.dropdown.hidden = true;
        this.dropdown.innerHTML = "";

        this.button = buttonEl;

        this.populateDropdown(contents);
        this.assignButtonEventListener();
    }

    populateDropdown(contents) {
        contents.forEach((content) => {
            this.createDropdownElement(content);
        });
    }

    createDropdownElement(content) {
        const dropdownEl = document.createElement("a");
        dropdownEl.className = "dropdown-element";
        dropdownEl.innerText = content.name;
        dropdownEl.href = content.target;
        this.dropdown.appendChild(dropdownEl);
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
