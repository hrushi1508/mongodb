const mongoose = require('mongoose');
const readline = require('readline-sync');

mongoose.connect('mongodb://localhost:27017/student_management',);
console.log(' Connected to MongoDB');

const courseSchema = mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    courseName:{
        type:String,
        unique:true,
        required:true
    },
    instructor:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        required:true
    }
});

const studentSchema = mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    name:{
        type :String,
        required :true
    },
    email:{
        type :String,
        required :true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});


studentSchema.index({ email: 1 }, { unique: true });
courseSchema.index({ courseName: 'text' });

const Course = mongoose.model('Course', courseSchema);
const Student = mongoose.model('Student', studentSchema);


const addCourse = async () => {
  const name = readline.question('Course Name: ');
  const instructor = readline.question('Instructor: ');
  const credits = parseInt(readline.question('Credits: '));
  const course = new Course({ courseName: name, instructor, credits });
  await course.save();
  console.log(' Course added:', course);
};

const addStudent = async () => {
  const name = readline.question('Student Name: ');
  const email = readline.questionEMail('Email: ');
  const age = parseInt(readline.question('Age: '));

  const allCourses = await Course.find();
  console.log('Available Courses:');
  allCourses.forEach((c, i) => console.log(`${i + 1}. ${c.courseName}`));
  const selected = readline.question('Enter course numbers (comma separated): ');
  const courseIds = selected.split(',').map(i => allCourses[parseInt(i) - 1]._id);

  const student = new Student({ name, email, age, enrolledCourses: courseIds });
  await student.save();
  console.log(' Student added:', student);
};

const listStudents = async () => {
  const students = await Student.find().populate('enrolledCourses');
  console.log('\n All Students:\n');
  students.forEach(s => {
    console.log(`${s.name} (${s.email}) - Age: ${s.age}`);
    console.log('  Enrolled Courses:');
    s.enrolledCourses.forEach(c => console.log(`${c.courseName}`));
  });
};

const updateStudent = async () => {
  const email = readline.questionEMail('Enter student email to update: ');
  const student = await Student.findOne({ email });
  if (!student) return console.log(' Student not found');

  const name = readline.question(`New name (current: ${student.name}): `);
  student.name = name || student.name;
  await student.save();
  console.log(' Student updated');
};

const deleteStudent = async () => {
  const email = readline.questionEMail('Enter student email to delete: ');
  const result = await Student.deleteOne({ email });
  console.log(result.deletedCount ? ' Student deleted' : ' Student not found');
};

const deleteCourse = async () => {
  const name = readline.question('Enter course name to delete: ');
  const result = await Course.deleteOne({ courseName: name });
  console.log(result.deletedCount ? ' Course deleted' : ' Course not found');
};

const menu = async () => {
  while (true) {
    console.log(`
    === Student Management System ===
    1. Add Course
    2. Add Student
    3. List Students with Course Details
    4. Update Student
    5. Delete Student
    6. Delete Course
    7. Exit
    `);
    const choice = readline.questionInt('Choose an option: ');
    switch (choice) {
      case 1: await addCourse(); break;
      case 2: await addStudent(); break;
      case 3: await listStudents(); break;
      case 4: await updateStudent(); break;
      case 5: await deleteStudent(); break;
      case 6: await deleteCourse(); break;
      case 7: process.exit(0);
      default: console.log(' Invalid choice');
    }
  }
};

menu();
