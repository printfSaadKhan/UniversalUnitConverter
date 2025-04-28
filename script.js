const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  mass: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000
  },
  temperature: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K"
  },
  time: {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800
  },
  area: {
    'square meter': 1,
    'square kilometer': 1000000,
    'square mile': 2589988,
    acre: 4046.86,
    hectare: 10000,
    'square foot': 0.092903
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    gallon: 3.78541,
    quart: 0.946353,
    pint: 0.473176,
    'cubic meter': 1000,
    'cubic centimeter': 0.001
  },
  speed: {
    'meter/second': 1,
    'kilometer/hour': 0.277778,
    'mile/hour': 0.44704
  }
};

function populateUnits() {
  const category = document.getElementById('category').value;
  const fromUnit = document.getElementById('fromUnit');
  const toUnit = document.getElementById('toUnit');

  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';

  if (units[category]) {
    Object.keys(units[category]).forEach(unit => {
      const option1 = new Option(unit, unit);
      const option2 = new Option(unit, unit);
      fromUnit.add(option1);
      toUnit.add(option2);
    });
  }
}

function convert() {
  const category = document.getElementById('category').value;
  const inputValue = parseFloat(document.getElementById('inputValue').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  let result = 0;

  if (category === 'temperature') {
    result = convertTemperature(inputValue, fromUnit, toUnit);
  } else {
    result = inputValue * (units[category][fromUnit] / units[category][toUnit]);
  }

  document.getElementById('result').innerText = `${inputValue} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  if (from === 'Celsius' && to === 'Fahrenheit') return (value * 9/5) + 32;
  if (from === 'Fahrenheit' && to === 'Celsius') return (value - 32) * 5/9;
  if (from === 'Celsius' && to === 'Kelvin') return value + 273.15;
  if (from === 'Kelvin' && to === 'Celsius') return value - 273.15;
  if (from === 'Fahrenheit' && to === 'Kelvin') return ((value - 32) * 5/9) + 273.15;
  if (from === 'Kelvin' && to === 'Fahrenheit') return ((value - 273.15) * 9/5) + 32;
}
