const display = document.querySelector(".display");
const btn = document.querySelectorAll(".buttons");
const chars = ["%", "/", "*", "-", "+", "="];
let output = "";

const cal = (btnval) => {
    display.focus();
    if (btnval === "=" && output !== "") {
        output = eval(output.replace("%", "/100"));
        output = output.toFixed(2);
    }
    else if (btnval === "AC") {
        output = "";
    }
    else if (btnval === "DEL") {
        output = output.toString().slice(0, -1);
    }
    else {
        if (output === "" && chars.includes(btnval))
            return;
        output += btnval;
    }
    display.value = output;
};


btn.forEach((btn) => {
    btn.addEventListener("click", (e) => cal(e.target.dataset.value));
});
