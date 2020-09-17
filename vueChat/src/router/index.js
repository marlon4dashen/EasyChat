import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'
import ChatRoom from '@/components/ChatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    
    {
      path: '/chatrooms',
      name: 'Chatrooms',
      component: ChatRoom,
      beforeEnter: (to, from, next) => {

        if(to.query.name){
          next();
        }else{
          next({ name: 'Welcome'});
        }
        
      }
    },

    {
      path: '/chatrooms/:id',
      name: 'Chat',
      component: Chat,
      beforeEnter: (to, from, next) => {
     
        if(to.query.username){
          next();
        }else{
          next({ name: 'Welcome'});
        }
        
      }

    }
  ]
})
