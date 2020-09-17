<template>
    <div class="chatrooms">

        <h2 class="center teal-text">Easy Chatrooms</h2>

        <div class="card">
            
            <div class="card-content align">
            
                <div class="rooms" >

                    <div class='room'  v-for="chatroom in chatrooms" :key="chatroom.id" >
                        <span class="roomname" v-on:click="enterRoom(chatroom.id, chatroom.roomname)">{{ chatroom.roomname }} </span>
                        <span class="grey-text creator">creator: {{ chatroom.creator}} </span>
                        
                            
                    </div>

                </div>
            </div>

            <div class="card-action">
                <form @submit.prevent="newRoom">
                
                    <label for="newroom">Create a new chat room with name:</label>
                    <input type="text" name="newroom" v-model="roomname">
                    <p v-if="feedback" class="red-text">{{ feedback }}</p>
                </form>
                
            </div>

        </div>
    </div>

</template>


<script>
import firebaseApp from '../firebase/init'

export default{
    
    name: null,
    data(){
        return {
            chatrooms: [],
            roomname: null,
            feedback: null
        }
    },

    methods: {

        enterRoom(ID, roomName){
            this.$router.push({ path: 'chatrooms/' + roomName, query: {username: this.name, roomid: ID, roomname: roomName}})
        },

        newRoom(){

            if(this.roomname){

                firebaseApp.database().ref('rooms').push({
                    roomname: this.roomname,
                    creator: this.name,
                    messages: []
                });

                this.roomname = null;
                this.feedback = null;
            }else{
                this.feedback = "Please enter a party name."
            }
        }   
    },

    beforeCreate(){
        this.name = this.$route.query.name;
    },

    created() {

        const itemsRef = firebaseApp.database().ref('rooms');

        itemsRef.on('value', snapshot => {
            
            let data = snapshot.val();
            let rooms = [];
            
            Object.keys(data).forEach(key => {
                data[key].id = key
                rooms.push(data[key])
            })
            this.chatrooms = rooms;

            
        })
    }
}

</script>


<style>

.card{
    max-width: 600px;
    margin: 20px auto;
}

.chatrooms h2{
    font-size: 2.6em;
    margin-bottom: 40px;
}

.room {
    padding: 10px;
    border: 2px solid goldenrod;
    margin-bottom: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.chatrooms .roomname{
    cursor: pointer;
    font-size: 2em;
}

.chatrooms .creator{
    font-size: 1.3em;
    margin-left: 320px;

}
</style>