const buttonConvert = document.querySelector(".button-convert"); //BOTÃO PARA CONVERSÃO
const currencySelectFrom = document.getElementById("convertFrom"); //Converter valor DE
const currencySelectTo = document.getElementById("convertTo"); //Converter valor PARA

function checkSelectValues() {
  const valueFrom = currencySelectFrom.value;
  const valueTo = currencySelectTo.value;

  if (valueFrom === valueTo) {
    currencySelectTo.value = ""; // Ou você pode definir um valor padrão, como "Dolar"
    alert("Você não pode selecionar a mesma moeda em ambos os campos.");
  }

  disableDuplicateOptions();
}

function disableDuplicateOptions() {
  const valueFrom = currencySelectFrom.value;

  for (let option of currencySelectTo.options) {
    option.disabled = false;
  }

  for (let option of currencySelectTo.options) {
    if (option.value === valueFrom) {
      option.disabled = true;
    }
  }
}

// Função para converter os valores
async function convertValues() {
  const inputCurrency = parseFloat(document.querySelector("#valueInput").value); // Moeda de DE (FROM)
  const currencyValueToConvert  = document.querySelector(".currency-value-to-convert"); // Moeda de PARA (TO)
  const currencyValueToConverted  = document.querySelector(".currency-value"); // Valor a ser convertido

  const data = await fetch ("https://economia.awesomeapi.com.br/last/USD-BRL,GBP-BRL,BTC-BRL").then( response => response.json());

  const dolarToday = data.USDBRL.high;
  const libraToday = data.GBPBRL.high;
  const btcToday = data.BTCBRL.high;

  if (currencySelectTo.value == "Dolar") {
    currencyValueToConverted .innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(inputCurrency / dolarToday);
  }

  if (currencySelectTo.value == "Libra") {
    currencyValueToConverted .innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(inputCurrency / libraToday);
  }

  if (currencySelectTo.value == "Btc") {
    currencyValueToConverted .innerHTML = new Intl.NumberFormat("btc", {
      style: "currency",
      currency: "BTC",
      minimumFractionDigits: 8, // mínimo de 8 casas decimais
      maximumFractionDigits: 8, // máximo de 8 casas decimais
    }).format(inputCurrency / btcToday);
  }

  currencyValueToConvert .innerHTML = new Intl.NumberFormat("pt-BR", {
    //formatação da moeda
    style: "currency", //currency=moeda
    currency: "BRL",
  }).format(inputCurrency);
}

function changeCurrency() {
  const currencyNameFrom = document.querySelector("label.convertFrom");
  const currencyImgFrom = document.querySelector("img.coin-convert");
  const currencyNameTo = document.querySelector(".convertTo");
  const currencyImgTo = document.querySelector(".coin-converted");

  if (currencySelectFrom.value == "Dolar") {
    currencyNameFrom.innerHTML = "Dólar Americano";
    currencyImgFrom.src = "assets/img/dolar.png";
  }

  if (currencySelectFrom.value == "Btc") {
    currencyNameFrom.innerHTML = "Bitcoin";
    currencyImgFrom.src = "assets/img/bitcoin.png";
  }

  if (currencySelectFrom.value == "Libra") {
    currencyNameFrom.innerHTML = "Líbra";
    currencyImgFrom.src = "assets/img/libra.png";
  }

  if (currencySelectFrom.value == "Real") {
    currencyNameFrom.innerHTML = "Real";
    currencyImgFrom.src = "assets/img/real.png";
  }

  if (currencySelectTo.value == "Dolar") {
    currencyNameTo.innerHTML = "Dólar Americano";
    currencyImgTo.src = "assets/img/dolar.png";
  }

  if (currencySelectTo.value == "Btc") {
    currencyNameTo.innerHTML = "Bitcoin";
    currencyImgTo.src = "assets/img/bitcoin.png";
  }

  if (currencySelectTo.value == "Libra") {
    currencyNameTo.innerHTML = "Líbra";
    currencyImgTo.src = "assets/img/libra.png";
  }

  if (currencySelectTo.value == "Real") {
    currencyNameTo.innerHTML = "Real";
    currencyImgTo.src = "assets/img/real.png";
  }

  convertValues(); // Chama a função para converter
}

// Adicionando eventos para atualizar as moedas e converter os valores

currencySelectFrom.addEventListener("change", changeCurrency);
currencySelectTo.addEventListener("change", changeCurrency);
buttonConvert.addEventListener("click", convertValues);
