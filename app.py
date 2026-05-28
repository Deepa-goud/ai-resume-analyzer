from flask_cors import CORS
from flask import Flask, request
import PyPDF2
from openai import OpenAI
import os
from dotenv import load_dotenv
import traceback

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(
    api_key=os.environ.get("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

@app.route('/')
def home():
    return "AI Resume Analyzer Running Successfully!"

@app.route('/upload', methods=['POST'])
def upload_resume():
    try:
        file = request.files['resume']
        job_description = request.form.get('job_description', '').strip()

        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted

        if job_description:
            jd_section = f"""
Job Description:
{job_description}

Instructions:
- ATS Score should reflect how well the resume matches THIS specific job description (0-100).
- Missing Skills must be skills explicitly or implicitly required by the job description that are absent from the resume.
- Best Roles must be based on the job description provided.
- Be precise and consistent.
"""
        else:
            jd_section = """
Instructions:
- ATS Score should reflect general resume quality and ATS-friendliness (0-100).
- Missing Skills are common industry skills absent from the resume.
- Be precise and consistent.
"""

        prompt = f"""
You are a strict, professional ATS resume expert.
Analyze the resume below and return ONLY this structured output. No extra commentary.

{jd_section}

Format EXACTLY like this:

ATS Score:
78

Missing Skills:
- Skill 1
- Skill 2

Improvements:
- Point 1
- Point 2

Strengths:
- Point 1
- Point 2

Weaknesses:
- Point 1
- Point 2

Best Roles:
- Role 1
- Role 2

Resume:
{text}
"""

        response = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3-0324:free",
            temperature=0.2,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        error_details = traceback.format_exc()
        print(f"FULL ERROR: {error_details}")
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)