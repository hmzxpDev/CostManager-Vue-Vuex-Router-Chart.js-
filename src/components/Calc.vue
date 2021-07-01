<template>
    <div>
        <div class="inputs">
            <input value="0" min="0" type="number" placeholder="numb" v-model.number="operand1"/>
            {{action}}
            <input value="0" min="0" type="number" placeholder="numb" v-model.number="operand2"/>
            ={{result}}
        </div>
        <div class="buttons">
            <button @click="sum">+</button>
            <button @click="diff">-</button>
            <button @click="mult">*</button>
            <button @click="div">/</button>
            <button @click="degree">x²</button>
            <button @click="int">целочисленное <br> деление</button>

        </div>
    </div>
</template>

<script>
export default{
    name: 'Calc',
    data:()=>({
        operand1:0,
        operand2:0,
        result: 'result',
        action: '+'
    }),
    methods:{
        sum(){
            this.result = this.operand1 + this.operand2;
            this.action = '+'
        },
        diff(){
            this.result = this.operand1 - this.operand2;
            this.action = '-';
        },        
        mult(){
            this.result = this.operand1 * this.operand2
            this.action = 'x'
        },
        div(){
            this.result = this.operand1 / this.operand2
            this.action = '/'
        },
        degree(){ 
            this.result = Math.pow(this.operand1, this.operand2)
            this.action = 'n'
        },
        int(){
            this.result = Math.floor(this.operand1 / this.operand2)
            this.action = '%'
        }        
    }
}
</script>

<style>
    .buttons{
        display: flex;
        justify-content: center;
        margin-top:30px;
    }

    button{
    width: 105px;
    }
    .inputs{
        width: 300px;
        margin:auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top:30px;
    }
    input{
        padding-left:40px;
        width:50px;
        height:50px;
    }
</style>