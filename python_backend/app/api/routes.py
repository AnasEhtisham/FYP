from fastapi import APIRouter, UploadFile, File, Request
from pydantic import BaseModel
from app.ocr.service import OCRService
from app.ai.service import generate_proposal_from_text

router = APIRouter()

class ProposalRequest(BaseModel):
    jobTitle: str
    jobDescription: str
    includePortfolio: bool = False

@router.post("/ocr/extract")
async def extract_text(file: UploadFile = File(...)):
    # Read the uploaded file
    contents = await file.read()
    
    # Process with OCR service
    result = await OCRService.extract_text(contents)
    
    return result 

@router.post("/proposal/generate")
async def generate_proposal(request: ProposalRequest):
    try:
        proposal = await generate_proposal_from_text(
            job_title=request.jobTitle,
            job_description=request.jobDescription,
            include_portfolio=request.includePortfolio,
        )
        return {"success": True, "proposal": proposal}
    except Exception as e:
        return {"success": False, "error": str(e)} 