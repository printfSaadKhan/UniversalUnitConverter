
const units = {
  length: { meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 },
  mass: { kilogram: 1, gram: 1000, milligram: 1000000, pound: 2.20462, ounce: 35.274 },
  temperature: { celsius: 'celsius', fahrenheit: 'fahrenheit', kelvin: 'kelvin' },
  time: { second: 1, minute: 1/60, hour: 1/3600, day: 1/86400 }
};

function populateUnits() {
  const quantity = document.getElementById('quantity').value;
  const fromUnit = document.getElementById('fromUnit');
  const toUnit = document.getElementById('toUnit');

  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';

  for (let unit in units[quantity]) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = unit;
    option1.text = unit;
    option2.value = unit;
    option2.text = unit;
    fromUnit.add(option1);
    toUnit.add(option2);
  }
}

function convert() {
  const quantity = document.getElementById('quantity').value;
  const inputValue = parseFloat(document.getElementById('inputValue').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  let result;

  if (quantity === 'temperature') {
    result = convertTemperature(inputValue, fromUnit, toUnit);
  } else {
    result = inputValue / units[quantity][fromUnit] * units[quantity][toUnit];
  }

  document.getElementById('result').innerText = 'Result: ' + result;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;

  let tempInCelsius;
  if (from === 'celsius') tempInCelsius = value;
  else if (from === 'fahrenheit') tempInCelsius = (value - 32) * 5/9;
  else if (from === 'kelvin') tempInCelsius = value - 273.15;

  if (to === 'celsius') return tempInCelsius;
  if (to === 'fahrenheit') return (tempInCelsius * 9/5) + 32;
  if (to === 'kelvin') return tempInCelsius + 273.15;
}
populateUnits();
