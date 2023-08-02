function Calculadora() {
  
  this.display = document.querySelector(".display");

  this.capturarCliques = () => {
    document.addEventListener("click", (e) => {
      const el = e.target;
      el.classList.contains("btn-display") ? this.addNumDisplay(el) : false;
      el.classList.contains("btn-zerar") ? this.clear() : false;
      el.classList.contains("btn-apagar") ? this.del() : false;
      el.classList.contains("btn-resultado") ? this.realizaConta() : false;
    });
  };

  this.clear = () => (this.display.value = "");
  this.del = () => (this.display.value = this.display.value.slice(0, -1));

  this.addNumDisplay = (el) => {
    this.display.value += el.innerText;
    this.display.focus();
  };

  this.realizaConta = () => {
    try {
      const conta = eval(this.display.value);

      if (!conta) {
        alert("Conta inválida");
        return;
      } else {
        this.display.value = conta;
      }
    } catch {
      alert("Conta inválida");
      return;
    }
  };

  this.capturarEnter = () => {
    document.addEventListener("click", (e) => {
      if (e.key === "Enter") {
        this.realizaConta();
      }
    });
  };

  this.init = () => {
    this.capturarCliques();
    this.capturarEnter();
  };
}

const calculadora = new Calculadora();
calculadora.init();
