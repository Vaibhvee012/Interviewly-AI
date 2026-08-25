
const { PDFParse } = require("pdf-parse")

const interviewReportModel = require("../models/interviewReport.model")

const {
    generateInterviewReport,
    generateResumePdf
} = require("../services/ai.service")

/**
 * @description Controller to generate interview report based on
 * user self description, resume and job description.
 */
async function generateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file
        let resumeContent = ""

        if (resumeFile) {
            const parser = new PDFParse({
                data: resumeFile.buffer
            })

            const parsedResult = await parser.getText()

            resumeContent = parsedResult.text

            await parser.destroy()
        }

        const {
            selfDescription,
            jobDescription
        } = req.body

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

        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })

    } catch (error) {
        console.error(
            "Generate interview report error:",
            error
        )

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        })
    }
}


/**
 * @description Controller to get interview report by interviewId
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport =
            await interviewReportModel.findById(interviewId)

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
        console.error(
            "Get interview report error:",
            error
        )

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
        const interviewReports =
            await interviewReportModel
                .find({
                    user: req.user.id
                })
                .sort({
                    createdAt: -1
                })
                .select(
                    "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
                )

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })

    } catch (error) {
        console.error(
            "Get all interview reports error:",
            error
        )

        return res.status(500).json({
            message: "Failed to fetch interview reports",
            error: error.message
        })
    }
}


/**
 * @description Controller to generate resume PDF based on
 * user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        console.log(
            "Generating resume PDF for interview:",
            interviewReportId
        )

        const interviewReport =
            await interviewReportModel.findById(interviewReportId)

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        const {
            resume,
            jobDescription,
            selfDescription
        } = interviewReport

        console.log("Interview report found")
        console.log("Resume content available:", !!resume)
        console.log("Job description available:", !!jobDescription)
        console.log("Self description available:", !!selfDescription)

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        })

        if (!pdfBuffer) {
            throw new Error("PDF generation returned an empty buffer")
        }

        console.log(
            "PDF generated successfully. Size:",
            pdfBuffer.length,
            "bytes"
        )

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
            "Content-Length": pdfBuffer.length
        })

        return res.send(pdfBuffer)

    } catch (error) {
        console.error(
            "Failed to generate resume PDF:",
            error
        )

        console.error(
            "Error message:",
            error.message
        )

        console.error(
            "Error stack:",
            error.stack
        )

        if (error?.status === 429) {
            return res.status(429).json({
                message:
                    "AI service quota exceeded. Please try again later."
            })
        }

        return res.status(500).json({
            message: "Failed to generate resume PDF",
            error: error.message
        })
    }
}


module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}

