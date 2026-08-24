import {getInterviewById, getAllInterviewReports, generateInterviewReport, generateResumePdf} from "../services/interview.api"
import { useContext, useEffect, useState } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"

export const useInterview = () => {

    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        )
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context
    const [reportsLoading, setReportsLoading] = useState(false)

    const { interviewId } = useParams()


    const generateReport = async ({jobDescription,selfDescription,resumeFile}) => {
    setLoading(true)
    try {
        const response = await generateInterviewReport({
            jobDescription,
            selfDescription,
            resumeFile
        })

        setReport(response.interviewReport)

        return response.interviewReport

    } catch (error) {

        console.log(error)

    } finally {

        setLoading(false)

    }
}


    const getReportById = async (interviewId) => {

        setLoading(true)

        try {

            const response = await getInterviewById(interviewId)

            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)

        }
    }


    const getReports = async () => {

        setReportsLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setReportsLoading(false)
        }
    }


    const getResumePdf = async (interviewReportId) => {
    setLoading(true)
    let response = null
    try {
        response = await generateResumePdf(interviewReportId)
        const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `resume_${interviewReportId}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
    } catch (err) {
        console.error("Failed to download resume PDF:", err)
    } finally {
        setLoading(false)
    }
}

    useEffect(() => {

        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId])


    return {loading,report,reports,generateReport,getReportById,getReports,getResumePdf,reportsLoading}
}