<template>
    <div class="chat">
        <h2 class="center red-text text-lighten-3"> {{ roomname }} </h2>
        <div class="card">
            <div class="card-content" v-chat-scroll="{always: false, smooth: true}" >
                <ul class="messages" >
                    <li v-for="message in messages" :key="message.key">
                        <span class="teal-text">{{ message.name }}: </span>
                        <span class="grey-text text-darken-3">{{ message.message }}</span>
                        <span class="grey-text time">{{ (new Date(message.timestamp)).toLocaleString() }}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="username" :roomid="roomid" />
            </div>
        </div>
    </div>
</template>


<script>
import NewMessage from '@/components/NewMessage'
import firebaseApp from '../firebase/init'
import { emojis } from 'vue-chat-emoji'
require("vue-chat-emoji/dist/vue-chat-emoji.css");

export default {
    
    name: 'Chat',
    roomname: null,
    roomid: null,
    username:  null,
    
   
    components: {
        NewMessage
    },
    data(){
        return {
            messages: []
        }
    },

    created(){
        
        console.log(this.$route);
        this.roomname = this.$route.params.id;
        this.roomid = this.$route.query.roomid;
        this.username = this.$route.query.username;

        const itemsRef = firebaseApp.database().ref('rooms/' + this.roomid + '/messages');
        itemsRef.on('value', snapshot => {
            
            let data = snapshot.val();
            let msgs = [];
            
            Object.keys(data).forEach(key => {
                data[key].message = this.stringToEmoji(data[key].message);
                msgs.push(data[key])
            })
            this.messages = msgs;
            
        })

    },

    methods: {
        scrollToEnd(){
            var container = this.$el.querySelector('.card-content');
            var scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;
        },

        stringToEmoji(str){
            return emojis.decodeEmoji(str);
        }
    }
}

</script>

<style>

.chat {
    max-width: 600px;
    margin: 20px auto;
}

.chat h2{
    font-size: 2.6em;
    margin-bottom: 40px;
}

.chat span{
    font-size: 1.4em;
}

.chat .time{
    display: block;
    font-size: 1.2em;
}

.card-content{
    max-height: 480px;
    overflow-y: auto;
}

</style>