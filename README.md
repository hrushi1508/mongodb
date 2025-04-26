# 🎓 Console-based Student Management System (MongoDB + Node.js)

This is a terminal-based Student Management System built using **Node.js**, **Mongoose**, and **MongoDB**. It allows users to manage students and courses, perform CRUD operations, and view relationships between students and the courses they are enrolled in.

---

## 📦 Features

- Add a new **Course**
- Add a new **Student** (with course selection)
- List **Students** along with their enrolled **Courses**
- Update **Student** details
- Delete a **Student** by email
- Delete a **Course** by name
- Indexed fields for performance and uniqueness

---

## 🛠️ Technologies Used

- Node.js
- MongoDB (local)
- Mongoose ODM
- readline-sync (for console input)

---


---

## 📋 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
bash```
Run the application : node index.js

🧩 Functionality Overview

=== Student Management System ===
1. Add Course
2. Add Student
3. List Students with Course Details
4. Update Student
5. Delete Student
6. Delete Course
7. Exit

✅ Indexing
Unique index on student.email

Text index on course.courseName (for potential search operations)
