const display = document.querySelector(".display");
const pokemon = document.querySelector(".pokemon-resultado");
const pokemonImg = document.querySelector(".pokemon-img");
const pokemonNumero = document.querySelector(".pokemon-numero");

function pokemonDisplay(e) {
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
    const pokeImagem = pokeAPI.sprites.front_default;

    const capitalize = (s) =>
      typeof s !== "string" ? "" : s.charAt(0).toUpperCase() + s.slice(1);

    pokemonImg.src = pokeImagem;
    pokemonNumero.innerText = `Nº ${conta} - ${capitalize(pokemonName)}`;

    function addClass() {
      pokemon.classList.add("ativo");
    }

    setTimeout(addClass, 200);
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

    if (conta === 0) {
      display.value = conta;
      return;
    } else if (!conta) {
      alert("Conta inválida");
    } else {
      display.value = conta;
      pokemonNome(conta);
    }
  } catch {
    alert("Conta inválida");
    return;
  }
};

document.addEventListener("click", pokemonDisplay);

if (window.matchMedia("(max-width: 510px)").matches) {
  document.removeEventListener("click", pokemonDisplay);
  document.addEventListener("touchstart", pokemonDisplay);
}
