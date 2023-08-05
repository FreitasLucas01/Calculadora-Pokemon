const display = document.querySelector(".display");
const pokemon = document.querySelector(".pokemon-resultado");
const pokemonImg = document.querySelector(".pokemon-img");
const pokemonNumero = document.querySelector(".pokemon-numero");

function handleButtons(e) {
    const el = e.target;
    el.classList.contains("btn-display") ? addNumDisplay(el) : false;
    el.classList.contains("btn-zerar") ? clear() : false;
    el.classList.contains("btn-apagar") ? del() : false;
    el.classList.contains("btn-resultado") ? realizaConta() : false;
}

async function pokemonNome(conta) {
  if (Number.isInteger(conta)) {
    const pokeFetch = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${conta}/`
    );
    const pokeAPI = await pokeFetch.json();
    const pokemonName = pokeAPI.forms[0].name;

    const capitalize = (s) =>
      typeof s !== "string" ? "" : s.charAt(0).toUpperCase() + s.slice(1);

    pokemon.classList.add("ativo");
    pokemonImg.src = pokeAPI.sprites.front_default;
    pokemonNumero.innerText = `Nº ${conta} - ${capitalize(pokemonName)}`;
  } else {
    return false;
  }
}

const removeAtivo = () => {
  pokemon.classList.remove("ativo");
};

const clear = () => {
  display.value = "";
  removeAtivo();
};

const del = () => {
  display.value = display.value.slice(0, -1);
  removeAtivo();
};

const addNumDisplay = (el) => {
  display.value += el.innerText;
  display.focus();
};

const realizaConta = () => {
  try {
    const conta = eval(display.value);

    if (!conta) {
      alert("Conta inválida");
      return;
    } else {
      display.value = conta;
      pokemonNome(conta);
    }
  } catch {
    alert("Conta inválida");
    return;
  }
};

document.addEventListener("click", handleButtons);

if (window.matchMedia("(max-width: 600px)").matches) {
  document.removeEventListener("click", handleButtons);
  document.addEventListener("touchstart", handleButtons);
}
