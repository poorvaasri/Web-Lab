const tempInput = document.getElementById('tempInput');
const conversionType = document.getElementById('conversionType');
const result = document.getElementById('result');

const convertTemperature = () => {
  const temp = parseFloat(tempInput.value);
  const type = conversionType.value;

  if (isNaN(temp)) {
    result.textContent = 'Please enter a valid number.';
    return;
  }

  let converted;
  if (type === 'c2f') {
    converted = (temp * 9 / 5) + 32;
    result.textContent = `${temp}°C = ${converted.toFixed(2)}°F`;
  } else if (type === 'f2c') {
    converted = (temp - 32) * 5 / 9;
    result.textContent = `${temp}°F = ${converted.toFixed(2)}°C`;
  }
};

tempInput.addEventListener('input', convertTemperature);
conversionType.addEventListener('change', convertTemperature);
