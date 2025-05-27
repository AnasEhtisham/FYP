import os
import google.generativeai as genai
from dotenv import load_dotenv
import re

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

async def generate_proposal_from_text(job_title, job_description, include_portfolio):
    prompt = f"Write a professional proposal for the following job:\n\nTitle: {job_title}\nDescription: {job_description}\n"
    if include_portfolio:
        prompt += "Include a brief mention of the applicant's portfolio.\n"
    prompt += "\nProposal:\n"

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    proposal = response.text.strip()
    proposal = proposal.replace("*", "")
    proposal = re.sub(r"\*\*", "", proposal)
    return proposal
