<template>
  <div>
    <div class="inputs">
      <input
        value="0"
        min="0"
        type="number"
        placeholder="numb"
        v-model.number="operand1"
      />
      {{ action }}
      <input
        value="0"
        min="0"
        type="number"
        placeholder="numb"
        v-model.number="operand2"
      />
      = {{ result }}
    </div>
    <div v-if="error">Ошибка: {{ error }}</div>
    <div class="buttons-v-for">
      <button
        v-for="(item, idx) in buttons"
        :key="idx"
        @click="calculate(item)"
      >
        {{ item }}
      </button>
    </div>
    <div class="checkbox">
      <input v-model="checked" type="checkbox" /> Отобразить экранную
      клавиатуру<br /><br />
    </div>
    <div></div>
    <div class="buttons-numb" v-if="checked">
      <button v-for="numb of buttonsNumb" :key="numb" @click="add(numb)">
        {{ numb }}
      </button>
      <button @click="rm">⌫</button>
      <div>
        <input
          type="radio"
          name="operand"
          value="operand1"
          v-model="picked"
          checked
        />
        Первый оператор
        <input type="radio" name="operand" value="operand2" v-model="picked" />
        Второй оператор
      </div>
    </div>
    <div>
      <template v-if="result < 0">результат меньше 0</template>
      <template v-else-if="result === 0">резльутат = 0</template>
      <template v-else>результат больше 0</template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calc",
  data: () => ({
    picked: "operand1",
    checked: false,
    operand1: 0,
    operand2: 0,
    result: "0",
    action: "+",
    error: "",
    buttons: ["+", "-", "*", "/", "x²", "int"],
    buttonsNumb: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    logs: {},
    fibResutl: 0,
  }),
  methods: {
    // метод удаляет последний символ
    rm() {
      if (this.picked === "operand1") {
        // превращаем в строку
        this.operand1 = this.operand1 + "";
        // отнимаем последний симвлов и превращаем в число
        this.operand1 = +this.operand1.slice(0, -1);
      } else {
        // превращаем в строку
        this.operand2 = this.operand2 + "";
        // отнимаем последний симвлов и превращаем в число
        this.operand2 = +this.operand2.slice(0, -1);
      }
    },
    // метод добавляет в символ
    add(numb) {
      if (this.picked === "operand1") {
        this.operand1 = +("" + this.operand1 + numb);
      } else {
        this.operand2 = +("" + this.operand2 + numb);
      }
    },
    // feb(n) {
    //   return n <= 1 ? n : this.feb(n - 1) + this.feb(n - 2);
    // },
    calculate(operation) {
      // this.fibResutl = this.feb1 + this.feb2;
      this.error = "";
      switch (operation) {
        case "+":
          this.sum();
          break;
        case "-":
          this.diff();
          break;
        case "*":
          this.mult();
          break;
        case "/":
          this.div();
          break;
        case "x²":
          this.degree();
          break;
        case "int":
          this.int();
          break;
      }
      let key = Date.now();
      let value = `${this.operand1} ${operation} ${this.operand2} =${this.result}`;
      this.$set(this.logs, key, value);
    },
    // calculate(op) {
    //   const calcOperation = {
    //     "+": () => this.operand1 + this.operand2,
    //     "-": () => this.operand1 - this.operand2,
    //     "*": () => this.operand1 * this.operand2,
    //     "/": () => this.operand1 / this.operand2,
    //     "x²": () => Math.pow(this.operand1, this.operand2),
    //     int: () => Math.floor(this.operand1 / this.operand2),
    //   };
    //   this.result = calcOperation[op]();
    // },
    sum() {
      this.result = this.operand1 + this.operand2;
      this.action = "+";
    },
    diff() {
      this.result = this.operand1 - this.operand2;
      this.action = "-";
    },
    mult() {
      this.result = this.operand1 * this.operand2;
      this.action = "x";
    },
    div() {
      if (this.operand2 === 0) {
        this.error = "На ноль делить нельзя";
      } else {
        this.result = this.operand1 / this.operand2;
      }

      this.action = "/";
    },
    degree() {
      this.result = Math.pow(this.operand1, this.operand2);
      this.action = "n";
    },
    int() {
      this.result = Math.floor(this.operand1 / this.operand2);
      this.action = "%";
    },
  },
  // computed: {
  //   feb1() {
  //     return this.feb(this.operand1);
  //   },
  //   feb2() {
  //     return this.feb(this.operand2);
  //   },
  // },
};
</script>

<style>
.buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.buttons-v-for {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
button {
  margin-left: 30px;
  border: 0px;
  background: #ff5722;
  width: 105px;
}
.inputs {
  width: 400px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
.inputs input {
  display: flex;
  justify-content: center;
  width: 100px;
  height: 50px;
}
.checkbox {
  margin-top: 30px;
}
.checkbox input {
  width: 20px;
  height: 20px;
}
.buttons-numb {
  margin-top: 20px;
  margin-bottom: 30px;
}
.buttons-numb input {
  margin-top: 20px;
  width: 30px;
  height: 30px;
}
.buttons-numb button {
  width: 40px;
  margin-left: 5px;
}
</style>