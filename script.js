
const unitCategories = {
  length: {
    meter: 1,
    kilometer: 0.001,
    mile: 0.000621371,
    inch: 39.3701,
    foot: 3.28084,
    centimeter: 100
  },
  mass: {
    gram: 1,
    kilogram: 0.001,
    pound: 0.00220462,
    ounce: 0.035274,
    tonne: 0.000001
  },
  temperature: {
    celsius: 'celsius',
    fahrenheit: 'fahrenheit',
    kelvin: 'kelvin'
  },
  time: {
    second: 1,
    minute: 1/60,
    hour: 1/3600,
    day: 1/86400
  },
  speed: {
    "m/s": 1,
    "km/h": 3.6,
    "mph": 2.23694,
    "knot": 1.94384
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    cup: 4.22675
  }
};

function updateUnitOptions() {
  const category = document.getElementById("category").value;
  const fromSelect = document.getElementById("fromUnit");
  const toSelect = document.getElementById("toUnit");

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  const units = Object.keys(unitCategories[category]);
  units.forEach(unit => {
    const opt1 = new Option(unit, unit);
    const opt2 = new Option(unit, unit);
    fromSelect.add(opt1);
    toSelect.add(opt2);
  });
}

function convert() {
  const category = document.getElementById("category").value;
  const input = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const resultEl = document.getElementById("result");
  const visualEl = document.getElementById("visual");

  if (isNaN(input)) {
    resultEl.textContent = "Please enter a valid number.";
    visualEl.innerHTML = "";
    return;
  }

  let result;

  if (category === "temperature") {
    result = convertTemperature(input, from, to);
  } else {
    result = input * (unitCategories[category][to] / unitCategories[category][from]);
  }

  resultEl.textContent = `${input} ${from} = ${result.toFixed(4)} ${to}`;

  const maxWidth = 300;
  const base = Math.min(input * 5, maxWidth);
  const converted = Math.min(result * 5, maxWidth);

  visualEl.innerHTML = `
    <div class="bar" style="width:${base}px; background:#6c757d;">${input} ${from}</div>
    <div class="bar" style="width:${converted}px;">${result.toFixed(2)} ${to}</div>
  `;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  if (from === "celsius") {
    if (to === "fahrenheit") return value * 9/5 + 32;
    if (to === "kelvin") return value + 273.15;
  }
  if (from === "fahrenheit") {
    if (to === "celsius") return (value - 32) * 5/9;
    if (to === "kelvin") return (value - 32) * 5/9 + 273.15;
  }
  if (from === "kelvin") {
    if (to === "celsius") return value - 273.15;
    if (to === "fahrenheit") return (value - 273.15) * 9/5 + 32;
  }
}
updateUnitOptions();
