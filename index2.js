const express = require("express")
const app = express();
const expressGraphql = require("express-graphql")
const {buildSchema} = require("graphql")

const {courses} = require("./d.json")

const schema = buildSchema(`
    type Query{
        course(id:Int!): Course
        courses(topic:String): [Course]
    }
    type Mutation{
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course{
        id:Int
        author:String
        title:String
        description:String
        topic:String
        url:String
    }
`)
let getCourse = args => {
    let id = args.id;
    return courses.filter((course)=>{
        return course.id == id
    })[0]
}
let getCourses = (args)=>{
    if(args.topic){
        let topic = args.topic
        return courses.filter((course)=>course.topic === topic)
    }else{
        return courses
    }
}
let updateCourseTopic = ({id, topic}) => {
    courses.map(course => {
      if (course.id === id) {
        course.topic = topic;
        return course;
      }
    });
  
    return courses.filter(course => course.id === id)[0];
  }

const root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
  };

app.use("/",expressGraphql({
    schema:schema,
    rootValue:root,
    graphiql:true
}))
app.listen(2000,()=>console.log("server en port 3000"))