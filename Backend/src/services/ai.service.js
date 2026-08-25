const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


/* =========================================================
   INTERVIEW REPORT SCHEMA
========================================================= */

const interviewReportSchema = z.object({

    matchScore: z
        .number()
        .describe(
            "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        ),

    technicalQuestions: z
        .array(
            z.object({
                question: z
                    .string()
                    .describe(
                        "The technical question that can be asked in the interview"
                    ),

                intention: z
                    .string()
                    .describe(
                        "The intention of the interviewer behind asking this question"
                    ),

                answer: z
                    .string()
                    .describe(
                        "How to answer this question, what points to cover and what approach to take"
                    )
            })
        )
        .describe(
            "Technical questions that can be asked in the interview along with their intention and how to answer them"
        ),

    behavioralQuestions: z
        .array(
            z.object({
                question: z
                    .string()
                    .describe(
                        "The behavioral question that can be asked in the interview"
                    ),

                intention: z
                    .string()
                    .describe(
                        "The intention of the interviewer behind asking this question"
                    ),

                answer: z
                    .string()
                    .describe(
                        "How to answer this question, what points to cover and what approach to take"
                    )
            })
        )
        .describe(
            "Behavioral questions that can be asked in the interview along with their intention and how to answer them"
        ),

    skillGaps: z
        .array(
            z.object({
                skill: z
                    .string()
                    .describe(
                        "The skill which the candidate is lacking"
                    ),

                severity: z
                    .enum([
                        "low",
                        "medium",
                        "high"
                    ])
                    .describe(
                        "The severity of this skill gap"
                    )
            })
        )
        .describe(
            "List of skill gaps in the candidate's profile along with their severity"
        ),

    preparationPlan: z
        .array(
            z.object({
                day: z
                    .number()
                    .describe(
                        "The day number in the preparation plan, starting from 1"
                    ),

                focus: z
                    .string()
                    .describe(
                        "The main focus of this day in the preparation plan"
                    ),

                tasks: z
                    .array(z.string())
                    .describe(
                        "List of tasks to be completed on this day"
                    )
            })
        )
        .describe(
            "A day-wise preparation plan for the candidate"
        ),

    title: z
        .string()
        .describe(
            "The title of the job for which the interview report is generated"
        )
})


/* =========================================================
   GENERATE INTERVIEW REPORT
========================================================= */

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        console.log("Generating interview report with Gemini...")

        const prompt = `
Generate an interview preparation report for a candidate.

Candidate Resume:
${resume || "No resume provided"}

Candidate Self Description:
${selfDescription || "No self description provided"}

Job Description:
${jobDescription || "No job description provided"}

Analyze the candidate against the job description.

Generate:
1. Match score
2. Technical interview questions
3. Behavioral interview questions
4. Skill gaps
5. Day-wise preparation plan
6. Job title

Do not invent candidate experience or skills.
`

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseSchema:
                    z.toJSONSchema(interviewReportSchema)
            }

        })

        if (!response || !response.text) {
            throw new Error(
                "Gemini returned an empty response"
            )
        }

        const parsed = JSON.parse(response.text)

        console.log(
            "Interview report generated successfully"
        )

        return parsed

    } catch (error) {

        console.error(
            "Gemini interview report error:",
            error
        )

        throw error
    }
}


/* =========================================================
   GENERATE PDF FROM HTML
========================================================= */

async function generatePdfFromHtml(htmlContent) {

    let browser

    try {

        if (!htmlContent) {
            throw new Error(
                "HTML content is empty"
            )
        }

        console.log(
            "Launching Puppeteer..."
        )

        browser = await puppeteer.launch({

            headless: true,

            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--no-zygote"
            ]

        })

        const page = await browser.newPage()

        await page.setViewport({
            width: 794,
            height: 1123
        })

        console.log(
            "Loading generated HTML..."
        )

        await page.setContent(
            htmlContent,
            {
                waitUntil: "networkidle0"
            }
        )

        await page.addStyleTag({

            content: `
                html,
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                }

                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                }
            `
        })

        const A4_HEIGHT_PX = 1123

        const contentHeight =
            await page.evaluate(() => {
                return document.body.scrollHeight
            })

        console.log(
            "Generated HTML height:",
            contentHeight
        )

        if (contentHeight > A4_HEIGHT_PX) {

            const scale =
                A4_HEIGHT_PX / contentHeight

            await page.evaluate(
                (scale) => {

                    document.body.style.transformOrigin =
                        "top left"

                    document.body.style.transform =
                        `scale(${scale})`

                    document.body.style.width =
                        `${100 / scale}%`

                },
                scale
            )

        } else if (
            contentHeight <
            A4_HEIGHT_PX * 0.9
        ) {

            const scale =
                A4_HEIGHT_PX / contentHeight

            await page.evaluate(
                (scale) => {

                    document.body.style.transformOrigin =
                        "top left"

                    document.body.style.transform =
                        `scale(${scale})`

                    document.body.style.width =
                        `${100 / scale}%`

                },
                scale
            )
        }

        console.log(
            "Generating PDF..."
        )

        const pdfBuffer = await page.pdf({

            format: "A4",

            margin: {
                top: "0mm",
                bottom: "0mm",
                left: "0mm",
                right: "0mm"
            },

            printBackground: true,

            preferCSSPageSize: false
        })

        if (!pdfBuffer || pdfBuffer.length === 0) {
            throw new Error(
                "Puppeteer generated an empty PDF"
            )
        }

        console.log(
            "PDF generated successfully:",
            pdfBuffer.length,
            "bytes"
        )

        return pdfBuffer

    } catch (error) {

        console.error(
            "Puppeteer PDF generation error:",
            error
        )

        throw error

    } finally {

        if (browser) {

            try {

                await browser.close()

                console.log(
                    "Puppeteer browser closed"
                )

            } catch (closeError) {

                console.error(
                    "Failed to close Puppeteer:",
                    closeError
                )
            }
        }
    }
}


/* =========================================================
   GENERATE RESUME PDF
========================================================= */

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        console.log(
            "Generating resume HTML with Gemini..."
        )

        const resumePdfSchema = z.object({

            html: z
                .string()
                .describe(
                    "Complete HTML content of the resume that can be converted to PDF using Puppeteer"
                )

        })

        const prompt = `
Generate a professional, ATS-friendly resume for the candidate.

Candidate Resume:
${resume || "No resume provided"}

Candidate Self Description:
${selfDescription || "No self description provided"}

Job Description:
${jobDescription || "No job description provided"}

Create a single-page A4 resume.

Requirements:

- Return ONLY the JSON structure defined by the schema.
- The JSON must contain a single "html" field.
- The HTML must be complete and valid.
- The resume must be professional and ATS friendly.
- Do not invent employers, projects, achievements or skills.
- Use only information provided by the candidate.
- Tailor the resume to the job description.
- Highlight relevant skills and experience.
- Keep the content human-written and natural.
- Use a clean professional design.
- Use standard readable fonts.
- Do not use external images.
- Do not use external CSS files.
- Put all CSS inside the HTML.
- The resume must fit on one A4 page.
- Use 210mm x 297mm dimensions.
- Use 12-15mm internal margins.
- Do not use white-space: nowrap.
- Avoid fixed-width elements that can overflow.
- Use flex-wrap where appropriate.
- Do not create a second page.
- Do not leave a large blank area at the bottom.
`

        const response =
            await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: prompt,

                config: {

                    responseMimeType:
                        "application/json",

                    responseSchema:
                        z.toJSONSchema(
                            resumePdfSchema
                        )

                }

            })

        if (!response || !response.text) {

            throw new Error(
                "Gemini returned an empty resume response"
            )
        }

        console.log(
            "Gemini resume HTML received"
        )

        const jsonContent =
            JSON.parse(response.text)

        if (!jsonContent.html) {

            throw new Error(
                "Gemini response does not contain HTML"
            )
        }

        console.log(
            "Starting PDF generation..."
        )

        const pdfBuffer =
            await generatePdfFromHtml(
                jsonContent.html
            )

        return pdfBuffer

    } catch (error) {

        console.error(
            "Error in generateResumePdf:",
            error
        )

        console.error(
            "Error message:",
            error.message
        )

        throw error
    }
}


/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
    generateInterviewReport,
    generateResumePdf
}

