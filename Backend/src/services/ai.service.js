const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema)
        }
    })

    const parsed = JSON.parse(response.text)
    console.log(JSON.stringify(parsed, null, 2))

    return parsed


}


async function generatePdfFromHtml(htmlContent){
    // Render (and most hosted Linux containers) can't use Chrome's default
    // sandbox, and have no GPU â€” launch without either, or Puppeteer fails
    // to start the browser process at all.
    const browser = await puppeteer.launch({
        // Use Render's system Chromium directly instead of relying on
        // Puppeteer's own bundled-Chrome download, which requires a build
        // step that hasn't been reliably running. If PUPPETEER_EXECUTABLE_PATH
        // isn't set (e.g. running locally on Windows/Mac), fall back to
        // Puppeteer's own default behavior.
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    })
    const page = await browser.newPage()

    // Force the page to A4 pixel dimensions at 96dpi so measurements are consistent
    await page.setViewport({ width: 794, height: 1123 })

    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    // Inject a hard reset to eliminate default browser margins that could cause overflow
    await page.addStyleTag({
        content: `
            html, body {
                margin: 0;
                padding: 0;
            }
        `
    })

    const A4_HEIGHT_PX = 1123
    const contentHeight = await page.evaluate(() => document.body.scrollHeight)

    if (contentHeight > A4_HEIGHT_PX) {
        // Content overflows, scale it down to fit exactly one page
        const scaleFactor = A4_HEIGHT_PX / contentHeight
        await page.evaluate((scale) => {
            document.body.style.transformOrigin = "top left"
            document.body.style.transform = `scale(${scale})`
            document.body.style.width = `${100 / scale}%`
        }, contentHeight > A4_HEIGHT_PX ? A4_HEIGHT_PX / contentHeight : 1)
    } else if (contentHeight < A4_HEIGHT_PX * 0.9) {
        // Content is noticeably short of one page, stretch it to fill the page
        const scaleFactor = A4_HEIGHT_PX / contentHeight
        await page.evaluate((scale) => {
            document.body.style.transformOrigin = "top left"
            document.body.style.transform = `scale(${scale})`
            document.body.style.width = `${100 / scale}%`
        }, scaleFactor)
    }

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "0mm",
            bottom: "0mm",
            left: "0mm",
            right: "0mm"
        },
        printBackground: true
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}

                    the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                    The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience.
                    The content of resume should not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                    You can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                    The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.

                    ABSOLUTE REQUIREMENT: the resume must completely fill one A4 page (210mm x 297mm), edge to edge in usable content area, with no visible empty space at the bottom and no overflow onto a second page.

                    To guarantee this:
                    - Set html, body to height: 297mm and width: 210mm explicitly, with box-sizing: border-box and margin: 0.
                    - Use a flex or grid layout on the outer container so content sections distribute and fill the full height naturally (e.g. display: flex; flex-direction: column; height: 100%; and let sections like Work Experience grow using flex-grow if there's extra space).
                    - Include enough real detail (multiple bullet points per role, a complete skills section, a full summary) to naturally occupy the page, do not leave large blank areas.
                    - If there isn't enough content to naturally fill the page, expand truthfully on what's provided (more detail per bullet, slightly larger font-size, more generous section spacing/padding) rather than leaving empty space. Never invent achievements, employers, or skills not present in the source material.
                    - If content risks overflowing, use a smaller font-size (down to 9-9.5px if needed), tighter line-height (1.3-1.4), and trim the least relevant/oldest bullet points first.
                    - Use standard margins of 12-15mm on all sides within the 210x297mm page, with all content contained inside that boundary.
                    - Never use "white-space: nowrap" or fixed-width elements that could overflow the page width.
                    - For rows using "justify-content: space-between" (e.g. job title next to a date range), use flex-wrap: wrap so nothing overflows horizontally.
`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: z.toJSONSchema(resumePdfSchema),
            }
        })

        const jsonContent = JSON.parse(response.text)
        const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

        return pdfBuffer
    } catch (err) {
        console.error("Gemini API error in generateResumePdf:", err.message)
        throw err
    }
}

module.exports = { generateInterviewReport, generateResumePdf }
