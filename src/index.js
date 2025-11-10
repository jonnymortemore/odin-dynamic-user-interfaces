import "./styles.css" // all css files need to be imported into js
import "./dropdown.css"
import { Dropdown } from "./dropdown"

//To import images using JS, import as any file: import odinImage from "./odin.png";

console.log(new Dropdown(
    "selectedValue",
    [
        {
            name: "dropdown-1",
            target: "#target1"
        },
        {
            name: "dropdown-2",
            target: "#target2"
        },
    ]
));