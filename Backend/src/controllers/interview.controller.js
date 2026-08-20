const { PDFParse } = require("pdf-parse")
const interviewReportModel = require("../models/interviewReport.model")
const { generateInterviewReport } = require("../services/ai.service")

async function generateInterviewReportController(req,res){
    const resumeFile = req.file
    
    const parser = new PDFParse({ data: req.file.buffer })
    const parsedResult = await parser.getText()
    const resumeContent = parsedResult.text
    await parser.destroy()

    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}


module.exports = {generateInterviewReportController}