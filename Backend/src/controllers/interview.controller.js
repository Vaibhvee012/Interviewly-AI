const { PDFParse } = require("pdf-parse")
const interviewReportModel = require("../models/interviewReport.model")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")

/**
 * @description Controller to generate interview report based on
 * user self description, resume and job description.
 */
async function generateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file

        let resumeContent = ""

        if (resumeFile) {
            const parser = new PDFParse({ data: resumeFile.buffer })
            const parsedResult = await parser.getText()
            resumeContent = parsedResult.text
            await parser.destroy()
        }

        const { selfDescription, jobDescription } = req.body

        if (!resumeContent && !selfDescription) {
            return res.status(400).json({
                message: "Either a resume or a self description is required"
            })
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })

    } catch (error) {
        console.error("Generate interview report error:", error)

        res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        })
    }
}

/**
 * @description Controller to get interview report by interviewId
 */
const getInterviewReportByIdController = async (req, res) => {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findById(interviewId)

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        return res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        })

    } catch (error) {
        console.error("Get interview report error:", error)

        return res.status(500).json({
            message: "Failed to get interview report",
            error: error.message
        })
    }
}

/**
 * @description Controller to get interview reports of logged in user
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })

    } catch (error) {
        console.error("Get all interview reports error:", error)

        res.status(500).json({
            message: "Failed to fetch interview reports",
            error: error.message
        })
    }
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */

async function generateResumePdfController(req,res){
    try {
        const {interviewReportId} = req.params
        const interviewReport = await interviewReportModel.findById(interviewReportId)

        if(!interviewReport){
            return res.status(404).json({ message:"Interview report not found" })
        }

        const{resume, jobDescription, selfDescription} = interviewReport
        const pdfBuffer = await generateResumePdf({resume, jobDescription, selfDescription})

        res.set({
            "Content-Type":"application/pdf",
            "Content-Disposition":`attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)
    } catch (err) {
        if (err?.status === 429) {
            return res.status(429).json({ message: "AI service quota exceeded. Please try again later." })
        }
        console.error("Failed to generate resume PDF:", err.message)
        res.status(500).json({ message: "Failed to generate resume PDF" })
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}