fetchLangues();

async function fetchLangues() {
  const url = "https://microsoft-translator-text-api3.p.rapidapi.com/languages";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f29a6326cdmsh8a5915d6f082155p13baeajsn7d3d1c2a405a",
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    addLangueges(result.translation);
  } catch (error) {
    console.error(error);
  }
}

function addLangueges(languages) {
  Object.entries(languages).forEach(([code, language]) => {
    const fromLanguage = document.querySelector("#from-Language");
    const toLanguage = document.querySelector("#to-Language");

    const fromOptions = document.createElement("option");
    fromOptions.value = code;
    fromOptions.textContent = language.name;
    fromLanguage.append(fromOptions);

    const toOptions = document.createElement("option");
    toOptions.value = code;
    toOptions.textContent = language.name;
    toLanguage.append(toOptions);
  });
}

document.querySelector("#form-submit").addEventListener("submit", async (e) => {
  e.preventDefault();
  const textToTranslate = document.querySelector("#text-to-translate");
  const fromLanguage = document.querySelector("#from-Language").value;
  const toLanguage = document.querySelector("#to-Language").value;

  const userTextToTranslate = textToTranslate.value;

  const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${toLanguage}&from=${fromLanguage}`;

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "f29a6326cdmsh8a5915d6f082155p13baeajsn7d3d1c2a405a",
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        Text: userTextToTranslate,
      },
    ]),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const translated =
      result[0]?.translations[0]?.text || "No translation found.";
    document.querySelector("#output-text").innerText = translated;
  } catch (error) {
    console.error(error);
  }
});
