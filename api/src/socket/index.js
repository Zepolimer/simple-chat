const db = require("../models");

const Socket = (io) => {  
  io.on('connection', (socket) => {
    console.log('a user connected : ' +  socket.id);

    const users = [];

    // GET ALL CONNECTED USERS AND RETURN SOCKET / USER IDS
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        socketID: id,
        userID: socket.handshake.auth.user
      });
    }
    socket.emit("users", users);

    socket.on('create-channel', (id) => {
      socket.emit("get-user-channel", id);
    })

    /**
     * GET PUBLIC CHANNEL LIST FOR USERS
     */
    socket.on('get-public-channel', async () => {
      const channels = await db.channel.findAll({
        order: [
          ['created_at', 'DESC'],
        ],
        attributes: [
          'id', 
          'name',
          'creator',
          'private',
          'created_at',
        ],
        where: {
          private: 0,
        },
      })

      socket.emit("publicChannelList", channels);
      socket.broadcast.emit("publicChannelList", channels);
    })

    socket.on('create-user-channel', (id) => {
      socket.emit("get-user-channel", id);
    })

    /**
     * CREATE A NEW CHANNEL ROOM
     * @param {*} roomName : contains user_id_from and user_id_to
     */
    socket.on('join-channel', (roomName) => {
      socket.join(roomName);
    })

    /**
     * GET CHANNEL LIST FOR USER
     * @param {*} id : user_id
     */
    socket.on('get-user-channel', async (id) => {
      const userChannel = await db.userChannel.findAll({
        attributes: [
          'id', 
          'user_id',
          'channel_id',
        ],
        include: [
          { 
            model: Channel,
            attributes: ['id', 'name', 'private']
          },
        ],
        where: { user_id: id }
      })

      users.filter(user => user.userID == id)
      .forEach(u => {
        socket.to(u.socketID).emit('userChannelList', userChannel);
      });
    })

    /**
     * GET CHANNEL MESSAGES FOR USERS IN IT (N)
     * @param {*} id : channel_id
     */
    socket.on('get-channel-msg', async (id) => {
      const channelMessage = await db.channelMessage.findAll({
        order: [
          ['created_at', 'ASC'],
        ],
        attributes: [
          'id', 
          'user_id', 
          'message', 
          'created_at', 
          'updated_at'
        ],
        include: [
          { 
            model: db.user,
            attributes: ['firstname', 'lastname']
          },
        ],
        where: { channel_id: id }
      })

      Array.from(socket.rooms)
      .filter(it => it !== socket.id)
      .forEach(id => {
        socket.to(id).emit('channelMsg', channelMessage);
      });
    })


    /**
     * CREATE A NEW CONVERSATION & REFRESH USERS CONVERSATION
     * @param {*} roomName : contains user_id_from and user_id_to
     */
    socket.on('create-conversation', (roomName) => {
      let split = roomName.split('--with--'); 
      let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); 

      let users = {
        idFrom: unique[0],
        idTo: unique[1],
      }

      socket.emit("get-conversations", users);
      socket.broadcast.emit("get-conversations", users);
    })

    /**
     * CREATE A NEW CONVERSATION ROOM
     * @param {*} roomName : contains user_id_from and user_id_to
     */
    socket.on('join-conversation', (roomName) => {
      let split = roomName.split('--with--'); 
      let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); 
    
      let updatedRoomName = `${unique[0]}--with--${unique[1]}`; 
    
      Array.from(socket.rooms)
      .filter(it => it !== socket.id)
      .forEach(id => {
        socket.leave(id);
        socket.removeAllListeners(`get-conversation-msg`);
      });
    
      socket.join(updatedRoomName);
    })

    /**
     * GET CHANNEL MESSAGES FOR USERS IN IT (N)
     * @param {*} id : conversation_id
     */
    socket.on('get-conversation-msg', async (id) => {
      const conversationMessage = await db.conversationMessage.findAll({
        order: [
          ['created_at', 'ASC'],
        ],
        attributes: [ 
          'id', 
          'user_id_from',
          'user_id_to',
          'message', 
          'created_at', 
          'updated_at'
        ],
        include: [
          { 
            model: db.user, as: 'id_from',
            attributes: ['id', 'firstname', 'lastname']
          },
          { 
            model: db.user, as: 'id_to',
            attributes: ['id', 'firstname', 'lastname']
          },
        ],
        where: { conversation_id: id }
      })

      Array.from(socket.rooms)
      .filter(it => it !== socket.id)
      .forEach(id => {
        socket.to(id).emit('conversationMsg', conversationMessage);
      });
    })

    /**
     * DELETE A CONVERSATION ROOM & REFRESH USERS CONVERSATION
     * @param {*} roomName : contains user_id_from and user_id_to
     */
    socket.on('delete-conversation', (roomName) => {
      let split = roomName.split('--with--'); 
      let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); 
    
      let updatedRoomName = `${unique[0]}--with--${unique[1]}`; 
      
      Array.from(socket.rooms)
      .filter(it => it !== socket.id)
      .forEach(id => {
        socket.leave(id);
        socket.removeAllListeners(`get-conversation-msg`);
      });
      
      socket.leave(updatedRoomName);

      let users = {
        idFrom: unique[0],
        idTo: unique[1],
      }

      socket.broadcast.emit("get-conversations", users);
    })

    socket.on('disconnect', () => {
      console.log('user disconnected : ' + socket.id);

      socket.removeAllListeners();
    });
  });
}

module.exports = {
  Socket,
}