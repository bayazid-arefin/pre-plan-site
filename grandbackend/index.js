const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3180;
require('dotenv').config()
app.use(express.json())
app.use(cors())
const nodemailer = require("nodemailer");
const XlsxPopulate = require("xlsx-populate")

// import model
const User = require('./models/user.model');
const Task = require('./models/task.model');
const Chapter = require('./models/chapter.model');
const Question = require('./models/question.model');
const Problem = require('./models/problem.model');
const Expense = require('./models/expense.model');
const { populate } = require('dotenv');

                                                                // ================
                                                                 // Email Handel
                                                                // ================
// nodemailer email add
const transporterTask = nodemailer.createTransport({
    host: "arefins-classroom.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "task@arefins-classroom.com",
      pass: "@Ref!N1634@TASK",
    },
});
async function taskEmail(htmlBody, userEmail) {
    const task = await transporterTask.sendMail({
      from: '"Arefins TEAM" <task@arefins-classroom.com>',
      to: userEmail,
      subject:"New Task", 
      text: "Task", 
      html: htmlBody
    });
}



// nodemailer email add
const transporterInfo = nodemailer.createTransport({
    host: "arefins-classroom.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "info@arefins-classroom.com",
      pass: "@Ref!N1634@INFO",
    },
});
async function infoEmailPayment(htmlBody, userEmail, typeOfMail) {
    const info = await transporterInfo.sendMail({
      from: '"Arefins INFO" <info@arefins-classroom.com>',
      to: userEmail,
      subject: `${typeOfMail == "task" ? "Task Payment" : "User Information"}`, 
      text: "Task", 
      html: htmlBody
    });
}

app.post('/task/add/send-email', async(req, res) =>{
    const htmlTemp = `
    <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem; box-sizing: border-box;">
        <div style="width: 100%; border-radius: 1rem; border: 1px solid #e5e5e5; padding: 1.5rem;background: rgb(154,58,180); background: linear-gradient(90deg, rgba(154,58,180,1) 0%, rgba(17,67,106,1) 50%, rgba(212,172,115,1) 100%);">
            <h1 style="text-align: center; font-weight: 500; color: white; font-family: Arial, Helvetica, sans-serif;">Your New Task</h1>
            <div style="background-color: white; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; padding: 2rem;border-radius: 1rem; margin-top: 3rem;">
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Task Titile : ${req.body.taskTitle}</p>
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Task Id : ${req.body._id}</p>
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Created For : ${req.body.employeeName}</p>                                                               
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Start From : ${req.body.startingDate}</p>
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Duration : ${req.body.duration} Days</p>
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Price : ${req.body.price}</p>
                <p style="text-align: center; margin: 3rem 0; font-family: Arial, Helvetica, sans-serif;"><a href="https://arefins-classroom.com/task" target="_blank" style="background-color: rgb(3, 142, 255); padding: 1rem 1.5rem; border-radius: 0.25rem; text-decoration: none; color: white; ">View Task</a></p>
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Please contact with us by this email <a href="mailto:support@arefins-classroom.com" style="text-decoration: none;">support@arefins-classroom.com</a> if you need support.</a></p>
            </div>
            <div style="text-align: center; margin-top: 4rem;">
                <h3 style="margin-bottom: 0.5rem; font-weight: 500; letter-spacing: 5px; color: rgb(221, 221, 221);">AREFINS CLASSROOM</h3>
                <p style="margin-top: 0; color: rgb(173, 173, 173);">A product of Ehsan Family</p>
            </div>
        </div>
    </div>
    `
    taskEmail(htmlTemp, req.body.userEmail).catch();
})
app.post('/task/complted/payment/send-email', async(req, res) =>{
    if(req.body.price != 0){
        const htmlTemp = `
        <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem; box-sizing: border-box;">
            <div style="width: 100%; border-radius: 1rem; border: 1px solid #e5e5e5; padding: 1.5rem;background: rgb(238,174,202);
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);">
                <h1 style="text-align: center; font-weight: 500; color: black; font-family: Arial, Helvetica, sans-serif;">Task Completed</h1>
                <div style="background-color: white; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; padding: 2rem;border-radius: 1rem; margin-top: 3rem;">
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Task Titile : ${req.body.taskTitle}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Task ID : <span style="color: red;">${req.body._id}</span></p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Created For : ${req.body.employeeName}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Start From : ${req.body.createdAt}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Completed At : ${req.body.updatedAt}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Price : ${req.body.price}</p>
                    <div style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; padding: 1rem; border: 1px solid #e5e5e5; margin-top: 1.5rem;">
                        <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Receiver Name : ${req.body.employeeName}</p>
                        <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Paid By : <span style="color: blue;">Bank AC to ${req.body.paymentMethod}</span></p>
                        <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Ammount : <span style="color: red;">${req.body.price}</span></p>
                        <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Account No : <span style="color: red;">${req.body.paymentAc}</span></p>
                    </div>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;text-align: center; margin-top: 2rem; color: black;">Please contact with us by this email <a href="mailto:support@arefins-classroom.com" style="text-decoration: none;">support@arefins-classroom.com</a> if you need support.</a></p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; margin-top: 1.5rem;">Thanks, <br>arefins-classroom Team</p>
                </div>
                <div style="text-align: center; margin-top: 4rem;">
                    <h3 style="margin-bottom: 0.5rem; font-weight: 500; letter-spacing: 5px; color: rgb(48, 48, 48);">AREFINS CLASSROOM</h3>
                    <p style="margin-top: 0; color: rgb(63, 63, 63);">A product of Ehsan Family</p>
                </div>
            </div>
        </div>
    `
    infoEmailPayment(htmlTemp, req.body.userEmail, "task").catch();
    }

    else{
        const htmlTemp = `
        <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem; box-sizing: border-box;">
            <div style="width: 100%; border-radius: 1rem; border: 1px solid #e5e5e5; padding: 1.5rem;background: rgb(238,174,202);
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);">
                <h1 style="text-align: center; font-weight: 500; color: black; font-family: Arial, Helvetica, sans-serif;">Task Completed</h1>
                <div style="background-color: white; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; padding: 2rem;border-radius: 1rem; margin-top: 3rem;">
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Task Titile : ${req.body.taskTitle}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Task ID : <span style="color: red;">${req.body._id}</span></p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Created For : ${req.body.employeeName}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Start From : ${req.body.createdAt}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Completed At : ${req.body.updatedAt}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; color: black;">Price : Not Applicable</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;text-align: center; margin-top: 2rem; color: black;">Please contact with us by this email <a href="mailto:support@arefins-classroom.com" style="text-decoration: none;">support@arefins-classroom.com</a> if you need support.</a></p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; margin-top: 1.5rem;">Thanks, <br>arefins-classroom Team</p>
                </div>
                <div style="text-align: center; margin-top: 4rem;">
                    <h3 style="margin-bottom: 0.5rem; font-weight: 500; letter-spacing: 5px; color: rgb(48, 48, 48);">AREFINS CLASSROOM</h3>
                    <p style="margin-top: 0; color: rgb(63, 63, 63);">A product of Ehsan Family</p>
                </div>
            </div>
        </div>
        `
        infoEmailPayment(htmlTemp, req.body.userEmail, "task").catch();
    }
  
    
})
app.post('/profile/user/add/send-email', async(req, res) =>{
    const htmlTemp = `
    <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem; box-sizing: border-box;">
        <div style="width: 100%; border-radius: 1rem; border: 1px solid #e5e5e5; padding: 1.5rem;background: rgb(0,36,24);
background: radial-gradient(circle, rgba(0,36,24,1) 0%, rgba(121,88,9,1) 0%, rgba(136,0,203,1) 100%);">
            <h1 style="text-align: center; font-weight: 500; color: white; font-family: Arial, Helvetica, sans-serif;">Welcome to Ehsan Family</h1>
            <div style="background-color: white; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; padding: 2rem;border-radius: 1rem; margin-top: 3rem; color: black;">
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Assalamu alaykum. Congratulations on signing up for Arefins Classroom! To begin, log in to your account and discover the exciting features waiting for you. We’re excited to guide you through this journey. Please reset your password as soon as possible for your own security. To get started, click below.</p>

                <div style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; padding: 1rem; border: 1px solid #e5e5e5; margin-top: 2.25rem;">
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Name : ${req.body.employeeName}</p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Email : <span style="color: blue;">${req.body.userEmail}</span></p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;">Temporary Password : <span style="color: blue;">ehsan123</span></p>
                    <p style="text-align: center; margin: 2rem 0; font-family: Arial, Helvetica, sans-serif;"><a href="https://arefins-classroom.com/login" target="_blank" style="background-color: rgb(3, 142, 255); padding: 1rem 1.5rem; border-radius: 0.25rem; text-decoration: none; color: white; ">Login</a></p>
                    <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;text-align: center;">If you want to reset your password, please log in, then go to the profile menu, click the reset password button, and follow the instructions.</p>
                </div>
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif;text-align: center; margin-top: 2rem;">Please contact us at this email: <a href="mailto:support@arefins-classroom.com" style="text-decoration: none;">support@arefins-classroom.com</a> if you need support.</a></p>
                <p style="font-size: large; font-family: Arial, Helvetica, sans-serif; margin-top: 1.5rem;">Thanks, <br>arefins-classroom Team</p>
            </div>
            <div style="text-align: center; margin-top: 3rem;">
                <h3 style="margin-bottom: 0.5rem; font-weight: 500; letter-spacing: 5px; color: rgb(219, 219, 219); font-family: Arial, Helvetica, sans-serif;">AREFINS CLASSROOM</h3>
                <p style="margin-top: 0; color: rgb(168, 168, 168); font-family: Arial, Helvetica, sans-serif;">A product of Ehsan Family</p>
            </div>
        </div>
    </div>
    `

    infoEmailPayment(htmlTemp, req.body.userEmail).catch();
})
















app.get('/', (req, res)=>{
    res.send("hello backend")
})



// user profile information create and view
app.get('/user/profile/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const userProfile = await User.findById(id);
        res.status(200).json(userProfile)
    } catch(error){
        // res.status(500).json({message : error.message})
        res.send(error)
    }
})
app.get('/user/info/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const userData = await User.find({edugrandId: id});
        res.status(200).json(userData)
    } catch(error){
        res.send(error)
    }
})
app.put('/user/profile/modify/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user) return res.status(400).json({message : "User is not found"});
        const updateUser = await User.findById(id)
        res.status(200).json(updateUser)
        
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

app.post('/users/add', async(req, res) =>{
    try{
        const user = await User.create (req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message :error.message})
    }
})
app.get('/users/view', async(req, res) =>{
    const user = await User.find ({});
    res.send(user)
})




// add question
app.post('/question/add', async(req, res) =>{
    try{
        const question = await Question.create (req.body);
        res.status(200).json(question);
    }catch(error){
        res.status(500).json({message :error.message})
    }
})
app.post('/questions-json/add', async(req, res) =>{
    try{
        const question = await Question.create(req.body);
        res.status(200).json(question);
    }catch(error){
        res.status(500).json({message :error.message})
    }
})
app.get('/questions/all/admin-panel', async(req, res) =>{
    const questions = await Question.find ({});
    res.send(questions)
})

app.get('/question/chapter/:id', async(req, res) =>{
    const {id} = req.params;
    const question = await Question.find ({chapterId: id});
    res.send(question)
})
app.get('/question/employee-profile/:id', async(req, res) =>{
    const {id} = req.params;
    const question = await Question.find ({employeeId: id});
    res.send(question)
})
app.get("/question/data/update/xlsx/:id", async(req, res)=>{
    const {id} = req.params;
    const questionData = await Question.find({chapterId: id});   

    XlsxPopulate.fromBlankAsync()
        .then(workbook => {
            workbook.sheet("Sheet1").cell("A1").value([
                ["subjectName", "chapterName", "chapterId", "createdBy", "employeeId", "questionTitle", "optionA", "optionB", "optionC", "optionD", "correctAns", "refarence"]
            ])
            let count =2;
            for(const item of questionData){
                const {subjectName, chapterName, chapterId, createdBy, employeeId, questionTitle, optionA, optionB, optionC, optionD, correctAns, refarence} = item || ""
                
                workbook.sheet("Sheet1").cell(`A${count}`).value([
                    [subjectName, chapterName, chapterId, createdBy, employeeId, questionTitle, optionA, optionB, optionC, optionD, correctAns, refarence]
                ])
                count++;
            }
            return workbook.toFileAsync(`./Files/questions-${id}.xlsx`)
        })   

    res.send(`data ${id} successfully`)
})
app.get("/question/data/download/updated/:id", async(req, res)=>{
    const {id} = req.params;
    res.download(`./Files/questions-${id}.xlsx`)
})

app.get('/quesiton/single/:id', async(req, res) =>{
    const {id} = req.params;
    try{
        const question = await Question.find ({_id: id});
        res.send(question)
    }
    catch (error){
        res.status(500).json({message :error.message})
    }
    
})
app.delete('/question/single/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if(!deletedQuestion){
            res.status(404).json({message : 'Question not Found'})
        }
        res.status(200).json(deletedQuestion)
    }catch(error){
        res.status(500).json({message : error.message})
    }
})


// add chapter
app.post('/chapter/add', async(req, res) =>{
    try{
        const chapter = await Chapter.create (req.body);
        res.status(200).json(chapter);
    }catch(error){
        res.status(500).json({message :error.message})
    }
})
app.get('/chapters/view', async(req, res) =>{
    const chapters = await Chapter.find ({});
    res.send(chapters)
})
app.get('/chapter/get/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const chapter = await Chapter.find ({normalSerial:id});
        res.status(200).json(chapter)
    }catch(error){
        res.send(error)
    }
})
app.get('/chapter/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const currentChapter = await Chapter.findById(id);
        res.status(200).json(currentChapter)
    } catch(error){
        res.send(error)
    }
})
app.put('/chapter/modify/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const chapterFind = await Chapter.findByIdAndUpdate(id, req.body);
        if(!chapterFind) return res.status(400).json({message : "Chapter is not found"});
        const updatedChapter = await Chapter.findById(id)
        res.status(200).json(updatedChapter)
        
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

// add expense
app.get("/expense/view", async(req, res) =>{
    const expenseData = await Expense.find({});
    res.send(expenseData);
})
app.post('/expense/add', async(req, res) =>{
    try{
        const expense = await Expense.create (req.body);
        res.status(200).json(expense);
    }catch(error){
        res.status(500).json({message :error.message})
    }
})
app.get("/expense/data/modify", async(req, res)=>{
    const expenseData = await Expense.find({});   
    XlsxPopulate.fromBlankAsync()
        .then(workbook => {
            workbook.sheet("Sheet1").cell("A1").value([
                ["Serial", "ID", "Date", "Added By", "Titile", "Paid To", "Amount"]
            ])
            let count = 2;
            let sum = 0
            for(const item of expenseData){
                const {_id, addedBy, expenseTitile, paidTo, date, ammount, serial} = item || ""
                sum += parseInt(ammount);
                workbook.sheet("Sheet1").cell(`A${count}`).value([
                    [serial, _id.toHexString(), date, addedBy, expenseTitile, paidTo, ammount]
                ])
                count++;
            }
            workbook.sheet("Sheet1").cell(`F${count}`).value("Total");
            workbook.sheet("Sheet1").cell(`G${count}`).value(sum);
            
            
            return workbook.toFileAsync("./Files/expense.xlsx")
        })
        res.send("updated")
        
})
app.get("/expense/data/modified/download", async(req, res)=>{
    res.download("./Files/expense.xlsx")
})


// task view and create
app.get('/task', async(req, res) =>{
    const tasks = await Task.find ({});
    // res.status(200).json(tasks);
    res.send(tasks)
})
app.get('/task/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const singleTask = await Task.findById(id);
        res.status(200).json(singleTask)
    } catch(error){
    }
})
app.get('/task/employee-task/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const singleTask = await Task.find({employeeId:id});
        res.status(200).json(singleTask)
    } catch(error){
    }
})

app.post('/task/add', async(req, res) =>{
    try{
        const task = await Task.create (req.body);
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({message :error.message})
    }
})



app.put('/task/modify/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const user = await Task.findByIdAndUpdate(id, req.body);
        if(!user) return res.status(400).json({message : "User is not found"});
        const updateTask = await Task.findById(id)
        res.status(200).json(updateTask)
        
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

app.delete('/task/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask){
            res.status(404).json({message : 'Task not Found'})
        }
        res.status(200).json(deletedTask)
    }catch(error){
        res.status(500).json({message : error.message})
    }
})



// add problem
app.post('/problem/add', async(req, res) =>{
    try{
        const problem = await Problem.create (req.body);
        res.status(200).json(problem)
    }catch(error){
        res.status(500).json({message :error.message})
    }
})
app.get('/problem/view', async(req, res) =>{
    
    try{
        const problems = await Problem.find ({});
        res.status(200).json(problems)
    }
    catch(error){
        res.status(500).json({message :error.message})
    }
})
app.get('/problem/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const singleProblem = await Problem.findById(id);
        res.status(200).json(singleProblem)
    } catch(error){
        res.status(500).json({message :error.message})
    }
})
app.put('/problem/modify/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const problem = await Problem.findByIdAndUpdate(id, req.body);
        if(!problem) return res.status(400).json({message : "User is not found"});
        const updateProblem = await Problem.findById(id)
        res.status(200).json(updateProblem)
        
    }catch(error){
        res.status(500).json({message : error.message})
    }
})
app.delete('/problem/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const deletedProblem = await Problem.findByIdAndDelete(id);
        if(!deletedProblem){
            res.status(404).json({message : 'Problem not Found'})
        }
        res.status(200).json(deletedProblem)
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@arefins-classroom.uq5mi6i.mongodb.net/?retryWrites=true&w=majority&appName=arefins-classroom`)
// .then(()=> {
//     console.log('connent successfully in mongoDB');
//     app.listen(port, () =>{
//         console.log(`server run prot in : ${port}`)
//     })
    
// })
// .catch((err)=>{console.log(err)})
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@edugrand.kkoa8.mongodb.net/?retryWrites=true&w=majority&appName=Edugrand`)
.then(()=> {
    console.log('connent successfully in mongoDB');
    app.listen(port, () =>{
        console.log(`server run prot in : ${port}`)
    })
    
})
.catch((err)=>{console.log(err)})