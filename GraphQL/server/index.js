const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [{id: 1, username: "Vasya", age: 25}]

const admins = [
    {id: 11, class: 9, secret_code: '333333'},
    {id: 12, class: 10, secret_code: '444444'},
]
const parents = [
    {id: 5, short_name: "Ivan", number: "+7977777777", full_name: "Ivanov Ivan Ivanovich", student:1},
    {id: 6, short_name: "Oleg", number: "+7988888888", full_name: "Olegov Oleg Olegovich", student:2},
    {id: 7, short_name: "Vasya", number: "+7000000000", full_name: "Vasilev Vasiliy Vasilivich", student:3},
    {id: 8, short_name: "Kolya", number: "+7999999999", full_name: "Kolev Nikolay Nikolaevich", student:4},
]

const students = [
    {id: 1, short_name: "Ivan Ivanov", age: 25, full_name: "Ivanov Ivan Ivanovich", parent:5, student_secret:"aaaaa"},
    {id: 2, short_name: "Oleg Olegov", age: 25, full_name: "Olegov Oleg Olegovich", parent:6, student_secret:"bbbbb"},
    {id: 3, short_name: "Vasya Vasichkin", age: 25, full_name: "Vasilev Vasiliy Vasilivich", parent:7, student_secret:"cccccc"},
    {id: 4, short_name: "Kolya Kolev", age: 25, full_name: "Kolev Nikolay Nikolaevich", parent:8, student_secret:"dddd"},

]

const classes = [
    {id: 9, name: "1A", count: 2, students: [students[0],students[1]], inviteCode: "11111"},
    {id: 10, name: "2B", count: 2, students: [students[2],students[3]], inviteCode: "22222"}
]

const teachers = [
    {id: 13, short_name: "Teacher1", full_name: 'Teacher1 Teacher1', classes: [classes[0]]},
    {id: 14, short_name: "Teacher2", full_name: 'Teacher2 Teacher2', classes: [classes[1]]},
]


paret_token = 'parent'
teacher_token = 'teacher'
admin_token = 'admin'
parent_token1 = 'parent1'
parent_token2 = 'parent2'
student_token = 'stunent'

const app = express()
app.use(cors())
app.use(express.json())


  
const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}


const createTeacher = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}
const createAdmin = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}
const createStudent = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const createParent = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const createClass = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return user
    },


    getAllTeachers: () => {
        return teachers
    },
    getTeacher: ({id}) => {
        return teachers.find(teacher => teacher.id == id)
    },
    createTeacher: ({input}) => {
        const teacher = createTeacher(input)
        teachers.push(teacher)
        return teacher
    },


    getAllStudents: () => {
        return students
    },
    getStudent: ({id}) => {
        return students.find(student => student.id == id)
    },
    createStudent: ({input}) => {
        const student = createStudent(input)
        students.push(student)
        return student
    },



    getAllAdmins: () => {
        return admins
    },
    getUser: ({id}) => {
        return admins.find(admin => admin.id == id)
    },
    createUser: ({input}) => {
        const admin = createAdmin(input)
        admins.push(admin)
        return admin
    },


    getAllParents: () => {
        return parents
    },
    getParent: ({id}) => {
        return parents.find(parent => parent.id == id)
    },
    createParent: ({input}) => {
        const parent = createParent(input)
        parents.push(parent)
        return parent
    },


    getAllClasses: () => {
        return classes
    },
    getClass: ({id}) => {
        return classes.find(classs=> classs.id == id)
    },
    createClass: ({input}) => {
        const clas = createClass(input)
        classes.push(clas)
        return clas
    },

}

const authenticatePrivateField = (req, res, next) => {
    const token = req.get('Authorization', undefined);
    console.log("TOKEN is")
    console.log(token)
    // if ( !token ) {
    //     return res.status(401).send('Требуется аутентификация для доступа к защищенному маршруту');
    // }
    str =  JSON.stringify(req.body)
    
    if (((str.includes('inviteCode') || str.includes("ClassInput"))
    && !(token == admin_token || token == teacher_token))) {
        return res.status(401).send('Требуется права учителя или Админа');
    }
    console.log(str.includes('Admin') && !(token == admin_token))
    if (((str.includes('Admin'))
    && !(token == admin_token))) {
        return res.status(401).send('Требуется права aдмина');
    }

    if (((str.includes('student_secret'))
    && !(token == student_token))) {
        return res.status(401).send('Требуется права ученика');
    }

    next();
  };


app.use('/graphql', (req, res, next) => {
    console.log(111);
    console.log(req.body)
    if (req.body) {
      authenticatePrivateField(req, res, next);
    } else {
      next();
    }
  });
  
app.use(
    '/graphql',
    graphqlHTTP((req) => ({
      schema: schema,
      rootValue: root,
      context: req,
      graphiql: true,
    }))
  );

app.listen(5555, () => console.log('server started on port 5555'))