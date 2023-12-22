const result = document.getElementById("resultMenu");
const sound = document.getElementById("voice");
const searchBtn = document.getElementById("searchBtn");

const Url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
searchBtn.addEventListener("click", () => {
  let wordInp = document.getElementById("wordInp").value;
  fetch(`${Url}${wordInp}`)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
            <div class="inpWord">
                      <h2>${wordInp}</h2>
                      <button style="cursor: pointer;" onclick = "playSound()"><i class="ri-volume-up-line"></i></button>
                  </div>
                  <div class="infos">
                      <p>${data[0].meanings[0].partOfSpeech}</p>
                      <p>/${data[0].phonetics[1].text}/</p>
                  </div>
                  <p class="wordMeaning">
                      ${data[0].meanings[0].definitions[0].definition}
                  </p>
                  <p class="wordExample">
                      ${data[0].meanings[0].definitions[0].example || ""}
                  </p>
            `;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
      console.log(data);
    })
    .catch(() => {
        result.innerHTML = `<h2 class="wordError">There is no such word</h2>`;
    });
});

function playSound() {
  sound.play();
}
