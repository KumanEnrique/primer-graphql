const express = require("express")
const app = express();
const expressGraphql = require("express-graphql")
const {buildSchema} = require("graphql")

const {users} = require("./nd.json")

const schema = buildSchema(`
    type Query{
        user(id:Int!): User
    }
    type User{
        id:Int
        name:String
        username:String
        email:String
        phone:String
        website:String
    }
`)
let getUser = args => {
    let id = args.id;
    return users.filter((user)=>{
        return user.id == id
    })[0]
}
const root = {
    user: getUser,
  };

app.use("/",expressGraphql({
    schema:schema,
    rootValue:root,
    graphiql:true
}))
app.listen(2000,()=>console.log("server en port 2000"))