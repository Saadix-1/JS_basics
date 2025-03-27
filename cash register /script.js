// Global variables
let price = 19.5; // Example price, can be changed
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// DOM elements
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");

// Currency unit values
const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

// Function to calculate change
function calculateChange(changeDue, cid) {
    let change = [];
    let totalCID = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

    if (totalCID < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (totalCID == changeDue) {
        // Return only the denominations that are being used for the change
        let usedChange = cid.filter(coin => coin[1] > 0);
        return { status: "CLOSED", change: usedChange };
    } else {
        for (let i = cid.length - 1; i >= 0; i--) {
            const coinName = cid[i][0];
            const coinTotal = cid[i][1];
            const coinValue = currencyUnit[coinName];
            let coinAmount = (coinTotal / coinValue).toFixed(2);
            let coinsToReturn = 0;

            while (changeDue >= coinValue && coinAmount > 0) {
                changeDue -= coinValue;
                changeDue = changeDue.toFixed(2);
                coinAmount--;
                coinsToReturn++;
            }

            if (coinsToReturn > 0) {
                change.push([coinName, coinsToReturn * coinValue]);
            }
        }

        if (changeDue > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        } else {
            return { status: "OPEN", change: change };
        }
    }
}

// Event listener for purchase button
purchaseBtn.addEventListener("click", () => {
    const cash = parseFloat(cashInput.value);
    const changeDue = cash - price;

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cash === price) {
        changeDueDiv.textContent = "No change due - customer paid with exact cash";
        return;
    }

    const result = calculateChange(changeDue, cid);

    if (result.status === "INSUFFICIENT_FUNDS") {
        changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
        changeDueDiv.textContent = `Status: CLOSED ${result.change.map(coin => `${coin[0]}: $${coin[1]}`).join(" ")}`;
    } else {
        changeDueDiv.textContent = `Status: OPEN ${result.change.map(coin => `${coin[0]}: $${coin[1]}`).join(" ")}`;
    }
});