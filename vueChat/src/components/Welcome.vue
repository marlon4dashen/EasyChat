<template>
  <div class="welcomecontainer">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <form @submit.prevent="enterChat">
          <label for="name">Enter your name:</label>
          <input type="text" name="name" v-model="name">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn teal">Enter Chat</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      name: null,
      feedback: null
    }
  },

  methods:{
    enterChat(){
      if(this.name){
        this.$router.push({ path:'chatrooms', query: { name: this.name } })
      }else {
        this.feedback = 'You must enter a name to join'
      }
    }
  }
}
</script>

<style>

.welcomecontainer{
  max-width: 400px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;

}

.welcomecontainer h2{
  font-size: 3em;
}

.welcomecontainer button{
  margin: 30px auto;
}
</style>
