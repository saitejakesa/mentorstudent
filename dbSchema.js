const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    studentName:{type:"String"},
    mentorName:{type:"String"},
    studentStream:{type:"String"},
    JoinedDate:{type:"Date"}
})

const mentorSchema=new mongoose.Schema({
    mentorName:{type:"String"},
    studentsName:[{type:"String"}],
    mentorSubject:{type:"String"}
})

let studentModel=mongoose.model('students',studentSchema)
let mentorModel=mongoose.model('mentors',mentorSchema)

module.exports={mongoose,studentModel,mentorModel}