<template>
    <div class="new-message">

        <form @submit.prevent="addMessage">
            <label for="new-message">New Message (enter to add)</label>
            <input type="text" name="new-message" v-model="newMessage">
            
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
        </form>

        <div class=emojis>
            <Emoji @click="selectedEmoji" title="Click to select emojis" />
        </div>
        
    </div>

</template>
    
<script>
import firebaseApp from '../firebase/init'
import { VueChatEmoji, emojis } from 'vue-chat-emoji'
require("vue-chat-emoji/dist/vue-chat-emoji.css");
export default {
    components: {
        Emoji: VueChatEmoji
    },
    name: "newMessage",
    props: ['name', 'roomid'],
    data(){
        return {
            newMessage: null,
            feedback: null
        }
    },

    methods: {

        selectedEmoji(args){
            if(this.newMessage) 
                this.newMessage += args.emoji;
            else
                this.newMessage = args.emoji;
        },
        
        emojiToString(str){
            var encoded_str = emojis.encodeEmoji(str);
            
            return encoded_str;
        },

        addMessage(){
            if(this.newMessage){
                
                firebaseApp.database().ref('rooms/' + this.roomid + '/messages').push({
                    name: this.name,
                    message: this.emojiToString(this.newMessage),
                    timestamp: Date.now()
                })
                this.newMessage = null;
                this.feedback = null;
            }else{
                this.feedback = "Please at least enter something."
            }
            
    
        },


    },


}


</script>

<style>


.emojis{
    margin-bottom: 30px;

}

</style>