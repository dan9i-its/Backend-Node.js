const {buildSchema} = require('graphql')

const schema = buildSchema(`
    
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }

    type Class {
        id: ID
        name: String
        count: Int
        students: [Student]
        inviteCode: String
    }

    type Student {
        id: ID
        age: Int
        short_name: String
        full_name: String
        parent: Parent
        student_secret: String
    }

    type Parent {
        id: ID
        short_name: String
        full_name: String
        number: String
        student: Int
        sssss: Int
        aaaaaaa: Int
        ddddd: Int
        ffff: Int
    }

    type Admin {
        id: ID
        class: Int
        secret_code: Int
    }

    type Teacher {
        id: ID
        short_name: String
        full_name: String
        classes: [Class]
    }

    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }

    input AdminInput {
        id:ID 
        class: Int
        secret_code: Int
    }

    input TeacherInput {
        id: ID
        short_name: String
        full_name: String
        classes: [ClassInput]
    }

    input ClassInput {
        id: ID
        name: String
        count: Int
        students: [StudentInput]
        inviteCode: String
    }

    input StudentInput {
        id: ID
        age: Int
        short_name: String
        full_name: String
        number: String
        parent: Int
    }

    input PostInput {
        id: ID
        title: String!
        content: String!
    }

    input ParentInput {
        id: ID
        short_name: String
        full_name: String
        number: String
        student: Int
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        getAllTeachers: [Teacher]
        getTeacher(id: ID): Teacher
        getAllAdmins: [Admin]
        getAdmin(id: ID): Admin
        getAllClasses: [Class]
        getClass(id: ID): Class
        getAllParents: [Parent]
        getParent(id: ID): Parent
        getAllStudents: [Student]
        getStudent(id: ID): Student
    }

    type Mutation {
        createUser(input: UserInput): User
        createTeacher(input: TeacherInput): Teacher
        createAdmin(input: AdminInput): Admin
        createClass(input: ClassInput): Class
        createParent(input: ParentInput): Parent
        createStudent(input: StudentInput): Student
    }

`)

module.exports = schema