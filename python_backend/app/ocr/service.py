import easyocr
from PIL import Image
import io
import logging
import numpy as np

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

reader = easyocr.Reader(['en'], gpu=False)  # Use gpu=True only if you have a CUDA GPU

class OCRService:
    @staticmethod
    async def extract_text(image_data: bytes) -> dict:
        try:
            # Log the size of received data
            logger.info(f"Received image data of size: {len(image_data)} bytes")
            
            # Convert bytes to image
            image = Image.open(io.BytesIO(image_data))
            
            # Log image format and size
            logger.info(f"Image format: {image.format}, Size: {image.size}")
            
            # Convert image to RGB if it's not
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Convert PIL Image to numpy array for EasyOCR
            image_np = np.array(image)
            
            # Extract text using EasyOCR
            results = reader.readtext(image_np, detail=1)
            
            # Combine all detected text
            extracted_text = ' '.join([text for _, text, conf in results])
            
            # Extract confidence scores and low-confidence words
            confidences = [conf for _, text, conf in results]
            low_confidence_words = [text for _, text, conf in results if conf < 0.7]
            
            # Calculate average confidence
            avg_confidence = sum(confidences) / len(confidences) if confidences else None
            
            # Log extracted text length
            logger.info(f"Extracted text length: {len(extracted_text)}")
            
            if not extracted_text.strip():
                return {
                    "success": False,
                    "text": None,
                    "confidence": avg_confidence,
                    "lowConfidenceWords": low_confidence_words,
                    "error": "No text could be extracted from the image"
                }
            
            return {
                "success": True,
                "text": extracted_text.strip(),
                "confidence": avg_confidence,
                "lowConfidenceWords": low_confidence_words,
                "error": None
            }
        except Exception as e:
            logger.error(f"Error in OCR processing: {str(e)}")
            return {
                "success": False,
                "text": None,
                "confidence": None,
                "lowConfidenceWords": [],
                "error": f"Failed to process image: {str(e)}"
            } 