class AIApp {
    constructor() {
        this.currentFeature = 'chat';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFeature('chat');
    }

    setupEventListeners() {
        document.querySelectorAll('[data-feature]').forEach(button => {
            button.addEventListener('click', (e) => {
                const feature = e.target.dataset.feature;
                this.switchFeature(feature);
            });
        });
    }

    switchFeature(feature) {
        this.currentFeature = feature;
        
        // Update active button
        document.querySelectorAll('[data-feature]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-feature="${feature}"]`).classList.add('active');
        
        this.loadFeature(feature);
    }

    loadFeature(feature) {
        const content = document.getElementById('feature-content');
        
        const features = {
            'chat': this.getChatHTML(),
            'code-gen': this.getCodeGenHTML(),
            'code-explain': this.getCodeExplainHTML(),
            'debug': this.getDebugHTML(),
            'content': this.getContentHTML(),
            'translate': this.getTranslateHTML(),
            'summarize': this.getSummarizeHTML(),
            'qa': this.getQAHTML()
        };
        
        content.innerHTML = features[feature];
        this.setupFeatureEventListeners(feature);
    }

    getChatHTML() {
        return `
            <div class="feature-card">
                <h3>💬 AI Chat</h3>
                <div class="mb-3">
                    <textarea class="form-control" id="chat-input" rows="3" placeholder="Ask me anything..."></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.sendChat()">Send Message</button>
                <div id="chat-response" class="response-area" style="display: none;"></div>
                <div id="chat-loading" class="loading">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        `;
    }

    getCodeGenHTML() {
        return `
            <div class="feature-card">
                <h3>🔧 Code Generator</h3>
                <div class="mb-3">
                    <label class="form-label">Programming Language</label>
                    <select class="form-select" id="code-lang">
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="html">HTML/CSS</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">What do you want to create?</label>
                    <textarea class="form-control" id="code-prompt" rows="3" placeholder="e.g., A function to sort an array"></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.generateCode()">Generate Code</button>
                <div id="code-response" class="response-area" style="display: none;"></div>
            </div>
        `;
    }

    getCodeExplainHTML() {
        return `
            <div class="feature-card">
                <h3>📖 Code Explainer</h3>
                <div class="mb-3">
                    <label class="form-label">Programming Language</label>
                    <select class="form-select" id="explain-lang">
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Paste your code here</label>
                    <textarea class="form-control" id="explain-code" rows="6" placeholder="Paste your code here..."></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.explainCode()">Explain Code</button>
                <div id="explain-response" class="response-area" style="display: none;"></div>
            </div>
        `;
    }

    getDebugHTML() {
        return `
            <div class="feature-card">
                <h3>🐛 Code Debugger</h3>
                <div class="mb-3">
                    <label class="form-label">Programming Language</label>
                    <select class="form-select" id="debug-lang">
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Your code</label>
                    <textarea class="form-control" id="debug-code" rows="4" placeholder="Paste your code here..."></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Error message</label>
                    <textarea class="form-control" id="debug-error" rows="2" placeholder="Paste the error message here..."></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.debugCode()">Debug Code</button>
                <div id="debug-response" class="response-area" style="display: none;"></div>
            </div>
        `;
    }

    getContentHTML() {
        return `
            <div class="feature-card">
                <h3>✍️ Content Creator</h3>
                <div class="mb-3">
                    <label class="form-label">Content Type</label>
                    <select class="form-select" id="content-type">
                        <option value="article">Article</option>
                        <option value="blog post">Blog Post</option>
                        <option value="social media post">Social Media Post</option>
                        <option value="email">Email</option>
                        <option value="product description">Product Description</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tone</label>
                    <select class="form-select" id="content-tone">
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="funny">Funny</option>
                        <option value="serious">Serious</option>
                        <option value="friendly">Friendly</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Topic</label>
                    <textarea class="form-control" id="content-topic" rows="2" placeholder="What should I write about?"></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.generateContent()">Generate Content</button>
                <div id="content-response" class="response-area" style="display: none;"></div>
            </div>
        `;
    }

    getTranslateHTML() {
        return `
            <div class="feature-card">
                <h3>🌍 Translator</h3>
                <div class="mb-3">
                    <label class="form-label">Source Language</label>
                    <select class="form-select" id="translate-source">
                        <option value="auto">Auto-detect</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Target Language</label>
                    <select class="form-select" id="translate-target">
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Text to translate</label>
                    <textarea class="form-control" id="translate-text" rows="3" placeholder="Enter text to translate..."></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.translateText()">Translate</button>
                <div id="translate-response" class="response-area" style="display: none;"></div>
            </div>
        `;
    }

    getSummarizeHTML() {
        return `
            <div class="feature-card">
                <h3>📋 Summarizer</h3>
                <div class="mb-3">
                    <label class="form-label">Max Length (characters)</label>
                    <input type="number" class="form-control" id="summarize-length" value="200" min="50" max="1000">
                </div>
                <div class="mb-3">
                    <label class="form-label">Text to summarize</label>
                    <textarea class="form-control" id="summarize-text" rows="6" placeholder="Paste the text you want summarized..."></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.summarizeText()">Summarize</button>
                <div id="summarize-response" class="response-area" style="display: none;"></div>
            </div>
        `;
    }

    getQAHTML() {
        return `
            <div class="feature-card">
                <h3>❓ Q&A Assistant</h3>
                <div class="mb-3">
                    <label class="form-label">Context (optional)</label>
                    <textarea class="form-control" id="qa-context" rows="2" placeholder="Provide context if needed..."></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Your question</label>
                    <textarea class="form-control" id="qa-question" rows="3" placeholder="Ask your question..."></textarea>
                </div>
                <button class="btn btn-primary" onclick="app.askQuestion()">Ask Question</button>
                <div id="qa-response" class="response-area" style="display: none;"></div>
            </div>
        `;
    }

    setupFeatureEventListeners(feature) {
        // Feature-specific event listeners can be added here
    }

    async makeRequest(endpoint, data) {
        try {
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            return result.response;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    async sendChat() {
        const input = document.getElementById('chat-input');
        const responseDiv = document.getElementById('chat-response');
        const loading = document.getElementById('chat-loading');
        
        if (!input.value.trim()) return;
        
        responseDiv.style.display = 'none';
        loading.style.display = 'block';
        
        const response = await this.makeRequest('chat', { message: input.value });
        
        loading.style.display = 'none';
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }

    async generateCode() {
        const prompt = document.getElementById('code-prompt').value;
        const language = document.getElementById('code-lang').value;
        const responseDiv = document.getElementById('code-response');
        
        if (!prompt.trim()) return;
        
        const response = await this.makeRequest('generate-code', {
            prompt: prompt,
            language: language
        });
        
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }

    async explainCode() {
        const code = document.getElementById('explain-code').value;
        const language = document.getElementById('explain-lang').value;
        const responseDiv = document.getElementById('explain-response');
        
        if (!code.trim()) return;
        
        const response = await this.makeRequest('explain-code', {
            code: code,
            language: language
        });
        
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }

    async debugCode() {
        const code = document.getElementById('debug-code').value;
        const error = document.getElementById('debug-error').value;
        const language = document.getElementById('debug-lang').value;
        const responseDiv = document.getElementById('debug-response');
        
        if (!code.trim() || !error.trim()) return;
        
        const response = await this.makeRequest('debug-code', {
            code: code,
            error: error,
            language: language
        });
        
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }

    async generateContent() {
        const topic = document.getElementById('content-topic').value;
        const type = document.getElementById('content-type').value;
        const tone = document.getElementById('content-tone').value;
        const responseDiv = document.getElementById('content-response');
        
        if (!topic.trim()) return;
        
        const response = await this.makeRequest('generate-content', {
            topic: topic,
            type: type,
            tone: tone
        });
        
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }

    async translateText() {
        const text = document.getElementById('translate-text').value;
        const source = document.getElementById('translate-source').value;
        const target = document.getElementById('translate-target').value;
        const responseDiv = document.getElementById('translate-response');
        
        if (!text.trim()) return;
        
        const response = await this.makeRequest('translate', {
            text: text,
            source_language: source,
            target_language: target
        });
        
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }

    async summarizeText() {
        const text = document.getElementById('summarize-text').value;
        const length = document.getElementById('summarize-length').value;
        const responseDiv = document.getElementById('summarize-response');
        
        if (!text.trim()) return;
        
        const response = await this.makeRequest('summarize', {
            text: text,
            max_length: parseInt(length)
        });
        
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }

    async askQuestion() {
        const question = document.getElementById('qa-question').value;
        const context = document.getElementById('qa-context').value;
        const responseDiv = document.getElementById('qa-response');
        
        if (!question.trim()) return;
        
        const response = await this.makeRequest('ask', {
            question: question,
            context: context
        });
        
        responseDiv.style.display = 'block';
        responseDiv.textContent = response;
    }
}

// Initialize the app
const app = new AIApp();
