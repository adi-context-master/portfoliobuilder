import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a resume parser. Extract structured data from the resume text provided.
Return ONLY valid JSON matching this exact schema (no markdown, no explanation):

{
  "name": "Full Name",
  "title": "Professional Title/Headline",
  "email": "email@example.com",
  "phone": "phone number",
  "location": "City, State/Country",
  "website": "personal website URL",
  "linkedin": "LinkedIn URL or username",
  "github": "GitHub URL or username",
  "summary": "Professional summary paragraph",
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "startDate": "Start Date",
      "endDate": "End Date or Present",
      "description": "Key responsibilities and achievements"
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Type (e.g., Bachelor of Science)",
      "field": "Field of Study",
      "startDate": "Start Date",
      "endDate": "End Date"
    }
  ],
  "skills": ["Skill 1", "Skill 2"],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description",
      "url": "Project URL if available",
      "technologies": ["Tech 1", "Tech 2"]
    }
  ]
}

Rules:
- Extract all available information from the resume
- Use empty strings for missing fields, empty arrays for missing lists
- Keep descriptions concise but informative
- For dates, preserve the format as written in the resume
- Return ONLY the JSON object, nothing else`;

export async function parseResumeWithAI(resumeText: string) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: resumeText },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI model");
  }

  return JSON.parse(content);
}
