from flask import Flask, render_template, request, jsonify
import os
from utils.ai_helpers import AIManager
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
ai_manager = AIManager()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    messages = [{"role": "user", "content": message}]
    response = ai_manager.chat_completion(messages)
    return jsonify({"response": response})

@app.route('/api/generate-code', methods=['POST'])
def generate_code():
    data = request.json
    prompt = data.get('prompt', '')
    language = data.get('language', 'python')
    response = ai_manager.generate_code(prompt, language)
    return jsonify({"response": response})

@app.route('/api/explain-code', methods=['POST'])
def explain_code():
    data = request.json
    code = data.get('code', '')
    language = data.get('language', 'python')
    response = ai_manager.explain_code(code, language)
    return jsonify({"response": response})

@app.route('/api/debug-code', methods=['POST'])
def debug_code():
    data = request.json
    code = data.get('code', '')
    error = data.get('error', '')
    language = data.get('language', 'python')
    response = ai_manager.debug_code(code, error, language)
    return jsonify({"response": response})

@app.route('/api/generate-content', methods=['POST'])
def generate_content():
    data = request.json
    topic = data.get('topic', '')
    content_type = data.get('type', 'article')
    tone = data.get('tone', 'professional')
    response = ai_manager.generate_content(topic, content_type, tone)
    return jsonify({"response": response})

@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text', '')
    target_language = data.get('target_language', 'english')
    source_language = data.get('source_language', 'auto')
    response = ai_manager.translate_text(text, target_language, source_language)
    return jsonify({"response": response})

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('text', '')
    max_length = data.get('max_length', 200)
    response = ai_manager.summarize_text(text, max_length)
    return jsonify({"response": response})

@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question', '')
    context = data.get('context', '')
    response = ai_manager.answer_questions(question, context)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
