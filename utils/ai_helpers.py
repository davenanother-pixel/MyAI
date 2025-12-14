import os
import openai
from typing import Dict, List, Optional

class AIManager:
    def __init__(self):
        openai.api_key = os.getenv('OPENAI_API_KEY')
        self.max_tokens = int(os.getenv('MAX_TOKENS', 1000))
        self.temperature = float(os.getenv('TEMPERATURE', 0.7))
        self.default_model = os.getenv('DEFAULT_MODEL', 'gpt-3.5-turbo')
    
    def chat_completion(self, messages: List[Dict], model: Optional[str] = None) -> str:
        """General chat completion"""
        try:
            response = openai.ChatCompletion.create(
                model=model or self.default_model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"Error: {str(e)}"
    
    def generate_code(self, prompt: str, language: str = "python") -> str:
        """Generate code in specified language"""
        system_msg = f"You are an expert {language} programmer. Generate clean, well-commented code."
        messages = [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": f"Generate {language} code for: {prompt}"}
        ]
        return self.chat_completion(messages)
    
    def explain_code(self, code: str, language: str = "python") -> str:
        """Explain code functionality"""
        messages = [
            {"role": "system", "content": f"You are a {language} code explainer. Provide clear, detailed explanations."},
            {"role": "user", "content": f"Explain this {language} code:\n\n{code}"}
        ]
        return self.chat_completion(messages)
    
    def debug_code(self, code: str, error: str, language: str = "python") -> str:
        """Debug code with error information"""
        messages = [
            {"role": "system", "content": f"You are a {language} debugging expert. Identify and fix errors."},
            {"role": "user", "content": f"Debug this {language} code:\n\nCode:\n{code}\n\nError:\n{error}"}
        ]
        return self.chat_completion(messages)
    
    def generate_content(self, topic: str, content_type: str = "article", tone: str = "professional") -> str:
        """Generate various types of content"""
        system_msg = f"You are a {tone} content writer. Create engaging {content_type} content."
        messages = [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": f"Write a {content_type} about: {topic}"}
        ]
        return self.chat_completion(messages)
    
    def translate_text(self, text: str, target_language: str, source_language: str = "auto") -> str:
        """Translate text between languages"""
        messages = [
            {"role": "system", "content": "You are a professional translator. Provide accurate translations."},
            {"role": "user", "content": f"Translate this text from {source_language} to {target_language}:\n\n{text}"}
        ]
        return self.chat_completion(messages)
    
    def summarize_text(self, text: str, max_length: int = 200) -> str:
        """Summarize long text"""
        messages = [
            {"role": "system", "content": f"You are a text summarizer. Create concise summaries under {max_length} characters."},
            {"role": "user", "content": f"Summarize this text:\n\n{text}"}
        ]
        return self.chat_completion(messages)
    
    def answer_questions(self, question: str, context: str = "") -> str:
        """Answer questions with optional context"""
        messages = [
            {"role": "system", "content": "You are a knowledgeable assistant. Provide accurate, helpful answers."}
        ]
        
        if context:
            messages.append({"role": "user", "content": f"Context: {context}\n\nQuestion: {question}"})
        else:
            messages.append({"role": "user", "content": question})
        
        return self.chat_completion(messages)
