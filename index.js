require('./lib/connectdb');
const {UserModel} = require('./models/User');
const {PostModel} = require('./models/Post');
const {CommentModel} = require('./models/Comment');
const {hash} = require('./lib/bcrypt');

// câu 4.1
// hash('admin')
// .then(passwordHash => {
//     return UserModel.create({
//         email: 'admin@gmail.com',
//         password: passwordHash,
//         name: 'Admin'
//     })    
// })
// .then(user=>{
//     console.log(user)
// })
// .catch(err=>console.log(err.msg))

// hash('demo1')
// .then(passwordHash => {
//     return UserModel.create({
//         email: 'demo1@gmail.com',
//         password: passwordHash,
//         name: 'Demo1'
//     })    
// })
// .then(user=>{
//     console.log(user)
// })
// .catch(err=>console.log(err.msg))

// hash('demo2')
// .then(passwordHash => {
//     return UserModel.create({
//         email: 'demo2@gmail.com',
//         password: passwordHash,
//         name: 'Demo2'
//     })    
// })
// .then(user=>{
//     console.log(user)
// })
// .catch(err=>console.log(err.msg))

//Câu 4.2
//admin : 5cd0220318cdc759c81d8280
// PostModel.create({
//     author: '5cd0220318cdc759c81d8280',
//     content: 'Bài Post 3 của Admin'
// })
// .then(post=>{
//     return UserModel.findOneAndUpdate(
//         {_id: '5cd0220318cdc759c81d8280'},
//         {
//             $addToSet:{
//                 posts: post._id
//             }
//         },{new:true}
//     )
// })
// .then(user=>console.log(user))
// .catch(err=>console.log(err.msg))

//Câu 4.3
// CommentModel.create({
//     author: '5cd0220318cdc759c81d8280',
//     post: '5cd2be87fbeeb31094911ae2',
//     content: 'Comment 1 cho bài post số 3'
// })
// .then(cmt=>{
//     return PostModel.findOneAndUpdate({
//         _id: '5cd2be87fbeeb31094911ae2'
//     },{
//         $addToSet: {
//             comments: cmt._id
//         }
//     },{new: true})
// })
// .then(post=>console.log(post))
// .catch(err=>console.log(err.msg))

// Câu 4.4
// UserModel.findOne({email: 'demo1@gmail.com'})
// .then(user=>{
//     if(!user){
//         return new Error('Can not find User')
//     }else{
//         return PostModel.findOneAndUpdate({
//             _id: '5cd2be2b4a5a791594dd254a',
//         },{
//             $addToSet:{ // add vào
//                 likes: user._id
//             }
//         },{new: true})
//     }
// })
// .then(result=>console.log(result))
// .catch(err=>console.log(err.msg))

// Câu 4.5
// UserModel.findOne({email: 'demo1@gmail.com'})
// .then(user=>{
//     if(!user){
//         return new Error('Can not find User')
//     }else{
//         return PostModel.findOneAndUpdate({
//             _id: '5cd2be2b4a5a791594dd254a',
//         },{
//             $pull:{ // xóa
//                 likes: user._id
//             }
//         },{new: true})
//     }
// })
// .then(result=>console.log(result))
// .catch(err=>console.log(err.msg))

// Câu 4.6
// UserModel.findOne({
//     email: 'demo2@gmail.com',
// })
// .then(receiver=>{
//     if(!receiver) return new Error('Cannot find receiver!')
//     // update sender
//     return UserModel.findOneAndUpdate({
//         email: 'demo1@gmail.com'
//     },{
//         $addToSet:{
//             sendRequests: receiver._id
//         }
//     }, {new: true})
// })
// .then(sender=>{
//     if(!sender) return new Error('Cannot find sender!')
//     return UserModel.findOneAndUpdate({email: 'demo2@gmail.com'},{
//         $addToSet: {
//             receiveRequests: sender._id
//         }
//     },{ new: true})
// })
// .then(receiver=>console.log(receiver))
// .catch(err=>console.log({Error: err.message}))

// Câu 4.7
// UserModel.findOne({email:'manager@gmail.com'})
// .then(sender=>{
//     if(!sender) return new Error('Cannot find sender!')
//     return UserModel.findOneAndUpdate({
//         email: 'guest@gmail.com',
//     },{
//         $pull: {
//             receiveRequests: sender._id
//         },
//         $addToSet:{
//             friends: sender._id
//         }
//     })
// })
// .then(receiver=>{
//     if(!receiver) return new Error('Cannot find receiver!')
//     return UserModel.findOneAndUpdate({
//         email: 'manager@gmail.com'
//     },{
//         $pull: {
//             sendRequests: receiver._id
//         },
//         $addToSet: {
//             friends: receiver._id
//         }
//     },{new:true})
// })
// .then(friend=>console.log(friend))
// .catch(err=>console.log({Error: err.message}))

// Câu 4.8

// Câu 4.9
//c2
//https://mongoosejs.com/docs/populate.html
// UserModel.findOne({
//     email: 'admin@gmail.com'
// })
// .populate('posts',{ content: 1, _id: 0})
// .then(user=>console.log(user))
// .catch(err=>console.log({Error: err.message}))


// c1
// UserModel.findOne({
//     email: 'admin@gmail.com'
// })
// .then(user=>{
//     if(!user) return Error('Cannot find user')
//     return PostModel.find({
//         author: user._id
//     })
// })
// .then(posts=>console.log(posts))
// .catch(err=>console.log({Error: err.message}))
// Câu 4.10

// Câu 4.11
// UserModel.findOne({
//     email: 'demo2@gmail.com'
// })
// .populate({
//     path: 'receiveRequests',
//     select: 'name email password'
// })
// .then(user=>console.log(user))
// .catch(err=>console.log(err))

// 4.12
//5cd2be79dc814102e42f6d97
PostModel.findOne({_id: '5cd2be79dc814102e42f6d97'})
.populate({
    path:'likes',
    select: {name: 0, _id:0}
})
.populate({
    path: 'author',
    select: {email:1}
})
.populate({
    path:'comments',
    select:{ content: 1, _id:0},
    populate: {
        path: 'author',
        select: {name: 1, _id:0, }
    }
})
.then(post=>{
    console.log(post);
    return false;
    console.log("Post: "+post.content)
    console.log("Author: "+post.author.name)
    console.log("Total likes: "+post.likes.length)
    console.log("Comments: ")
    post.comments.forEach(comment=>{
        console.log('- Author:'+comment.author.name)
        console.log('  Content:'+comment.content)
    })
    
})
.catch(err=>console.log(err))

//4.13
// PostModel.findOne({
//     _id: '5cd2be2b4a5a791594dd254a'
// })
// .populate({
//     path: 'author',
//     select: {name: 1, _id: 0},
//     match:{
//         email: 'admin@gmail.com'
//     }
// })
// .populate({
//     path:'comment'
// })
