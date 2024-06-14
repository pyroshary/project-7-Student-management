#! /usr/bin/env/node
import inquirer from "inquirer";
//define a student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(Sname) {
        this.id = Student.counter++;
        this.name = Sname;
        this.courses = [];
        this.balance = 100;
    }
    // method to enroll the student in a course
    enroll_course(cName) {
        this.courses.push(cName);
    }
    //method to view student remaining balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining balance  : $${this.balance}`);
    }
    //method to display student status
    show_status() {
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
;
//making a class to manage students
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new student
    addStudent(studentName) {
        let stdent = new Student(studentName);
        this.students.push(stdent);
        console.log(`Student : ${studentName} Student added successfully . Student ID ${stdent.id}`);
    }
    //method to enrol student in a course
    enroll_Student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    //method to view student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found please enter a correct student id");
        }
    }
    //method to pay student fees
    payStudent_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found please enter a correct student id");
        }
    }
    //method to display studentStatus
    showStudent_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //to find student easily by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//main function to run the program
async function main() {
    console.log("Welcome to Shary Student management system");
    console.log("_".repeat(50));
    let Studentmanager = new StudentManager();
    //using while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        //using switch case for user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name"
                    }
                ]);
                Studentmanager.addStudent(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }, {
                        name: "Course",
                        type: "input",
                        message: "Enter a Course name",
                    }
                ]);
                Studentmanager.enroll_Student(course_input.student_id, course_input.Course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }]);
                Studentmanager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }]);
                Studentmanager.payStudent_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }]);
                Studentmanager.showStudent_status(status_input.student_id);
                break;
            case "Exit":
                console.log("You have successfully Exited");
                process.exit();
        }
    }
}
//Calling a main function
main();
