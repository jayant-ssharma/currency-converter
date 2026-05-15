const countryC = document.querySelectorAll(".drop select");
const btn = document.querySelector(".btn button");
const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const from = document.querySelector('select[name="From"]');
const to = document.querySelector('select[name="To"]');

for (const select of countryC) {

    for (const code in countryCode) {
        const newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
    }

    if (select.name === "From") {
        select.value = "INR";
    } else if (select.name === "To") {
        select.value = "USD";
    }

    select.addEventListener("change", (evt) => {
        flagCall(evt.target);
    });
}

function flagCall(element) {
    const currencyCode = element.value;
    const country = countryCode[currencyCode];
    const img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${country}/flat/64.png`;
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const amount = document.querySelector(".entery input");
    const amtV = amount.value;
    const outInput = document.querySelector(".output input");
    const msg = document.querySelector('.mesg p');

    if (!from || !to) {
        msg.innerText = 'Select currencies first';
        return;
    }

    if (!amtV || isNaN(Number(amtV))) {
        msg.innerText = 'Enter a valid amount';
        return;
    }

    const base = from.value.toLowerCase();
    const target = to.value.toLowerCase();
    const Url = `${BASE_URL}/${base}.json`;

    try {
        const response = await fetch(Url);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        console.log(data[base][target])
        let rate = data[base][target];

        msg.innerText = `1 ${from.value} = ${rate.toFixed(4)} ${to.value}`;
  outInput.value=(amtV*rate).toFixed(2)
    } catch (err) {
        msg.innerText = "Failed to fetch exchange rate";
        console.error(err);
    }


})

document.querySelector(".fa-arrow-right-arrow-left")
  .parentElement.addEventListener("click", () => {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    flagCall(from);
    flagCall(to);
  });
  const switchSymbol=document.querySelector(".fa-arrow-right-arrow-left")
  let rotated = false;

switchSymbol.addEventListener("click", () => {
    rotated = !rotated;
    switchSymbol.style.transform = rotated ? "rotate(360deg)" : "rotate(0deg)";
    switchSymbol.style.transition = "transform 0.6s ease-in";
});
 windo
 w.addEventListener("load", () => {
    document.querySelector(".output input").value = "";
    document.querySelector(".entery input").value = "";
});