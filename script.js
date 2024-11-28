const buttonConvert = document.querySelector(".button-convert"); //BOTÃO PARA CONVERSÃO
const currencySelectFrom = document.getElementById("convertFrom"); //Converter valor DE
const currencySelectTo = document.getElementById("convertTo"); //Converter valor PARA


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
      minimumFractionDigits: 8, // mín 8 casas decimais
      maximumFractionDigits: 8, // máx 8 casas decimais
    }).format(inputCurrency / btcToday);
  }

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    //formatação da moeda
    style: "currency", 
    currency: "BRL",
  }).format(inputCurrency); //O valor aqui está correto
}


function changeCurrency() {
  const currencyNameFrom = document.querySelector("label.convertFrom");
  const currencyImgFrom = document.querySelector("img.coin-convert");
  const currencyNameTo = document.querySelector(".convertTo");
  const currencyImgTo = document.querySelector(".coin-converted");

  if (currencySelectFrom.value == "dolar") {
    currencyNameFrom.innerHTML = "Dólar Americano";
    currencyImgFrom.src = "assets/img/dolar.png";
  }

  if (currencySelectFrom.value == "btc") {
    currencyNameFrom.innerHTML = "Bitcoin";
    currencyImgFrom.src = "assets/img/bitcoin.png";
  }

  if (currencySelectFrom.value == "libra") {
    currencyNameFrom.innerHTML = "Líbra";
    currencyImgFrom.src = "assets/img/libra.png";
  }

  if (currencySelectFrom.value == "real") {
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
