import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const projectId = searchParams.get('project');

  const widgetCode = `
(function() {
  const projectId = '${projectId}';
  const apiUrl = '${process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin}';

  // Create and inject styles
  const style = document.createElement('style');
  style.textContent = \`
    #feedbackbox-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    #feedbackbox-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    #feedbackbox-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.6);
    }

    #feedbackbox-button svg {
      width: 28px;
      height: 28px;
      color: white;
    }

    #feedbackbox-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000000;
      padding: 20px;
    }

    #feedbackbox-modal.active {
      display: flex;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    #feedbackbox-modal-content {
      background: rgba(31, 41, 55, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 32px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      position: relative;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    #feedbackbox-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    #feedbackbox-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    #feedbackbox-close svg {
      width: 16px;
      height: 16px;
      color: white;
    }

    #feedbackbox-title {
      font-size: 24px;
      font-weight: 700;
      color: white;
      margin: 0 0 8px 0;
    }

    #feedbackbox-subtitle {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      margin: 0 0 24px 0;
    }

    .feedbackbox-type-selector {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .feedbackbox-type-button {
      flex: 1;
      padding: 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
    }

    .feedbackbox-type-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .feedbackbox-type-button.active {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10b981;
      color: #10b981;
    }

    #feedbackbox-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    #feedbackbox-message {
      width: 100%;
      min-height: 120px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      font-size: 14px;
      resize: vertical;
      font-family: inherit;
      outline: none;
      transition: all 0.2s;
    }

    #feedbackbox-message:focus {
      border-color: #10b981;
      background: rgba(255, 255, 255, 0.15);
    }

    #feedbackbox-message::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    #feedbackbox-email {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: all 0.2s;
    }

    #feedbackbox-email:focus {
      border-color: #10b981;
      background: rgba(255, 255, 255, 0.15);
    }

    #feedbackbox-email::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    #feedbackbox-submit {
      padding: 14px 24px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }

    #feedbackbox-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.6);
    }

    #feedbackbox-submit:active:not(:disabled) {
      transform: translateY(0);
    }

    #feedbackbox-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .feedbackbox-success {
      text-align: center;
      padding: 40px 20px;
    }

    .feedbackbox-success-icon {
      width: 60px;
      height: 60px;
      background: rgba(16, 185, 129, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .feedbackbox-success-icon svg {
      width: 32px;
      height: 32px;
      color: #10b981;
    }

    .feedbackbox-success h3 {
      color: white;
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    .feedbackbox-success p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      margin: 0;
    }

    .feedbackbox-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      margin-bottom: 16px;
    }
  \`;
  document.head.appendChild(style);

  // Create widget container
  const container = document.createElement('div');
  container.id = 'feedbackbox-widget';
  
  // Create button
  const button = document.createElement('button');
  button.id = 'feedbackbox-button';
  button.setAttribute('aria-label', 'Open feedback form');
  button.innerHTML = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>';
  
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'feedbackbox-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = \`
    <div id="feedbackbox-modal-content">
      <button id="feedbackbox-close" aria-label="Close feedback form">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div id="feedbackbox-content">
        <h2 id="feedbackbox-title">Share Your Feedback</h2>
        <p id="feedbackbox-subtitle">Help us improve by sharing your thoughts</p>
        
        <div class="feedbackbox-type-selector">
          <button type="button" class="feedbackbox-type-button active" data-type="feature">
            ✨ Feature
          </button>
          <button type="button" class="feedbackbox-type-button" data-type="bug">
            🐛 Bug
          </button>
          <button type="button" class="feedbackbox-type-button" data-type="praise">
            ❤️ Praise
          </button>
        </div>

        <form id="feedbackbox-form">
          <textarea 
            id="feedbackbox-message" 
            placeholder="Tell us what's on your mind..."
            required
          ></textarea>
          <input 
            id="feedbackbox-email" 
            type="email" 
            placeholder="Your email (optional)"
          />
          <button type="submit" id="feedbackbox-submit">
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  \`;

  container.appendChild(button);
  container.appendChild(modal);
  document.body.appendChild(container);

  // State
  let selectedType = 'feature';

  // Event listeners
  button.addEventListener('click', () => {
    modal.classList.add('active');
  });

  const closeBtn = modal.querySelector('#feedbackbox-close');
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  // Type selector
  const typeButtons = modal.querySelectorAll('.feedbackbox-type-button');
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = btn.dataset.type;
    });
  });

  // Form submission
  const form = modal.querySelector('#feedbackbox-form');
  const messageInput = modal.querySelector('#feedbackbox-message');
  const emailInput = modal.querySelector('#feedbackbox-email');
  const submitBtn = modal.querySelector('#feedbackbox-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    const email = emailInput.value.trim();

    if (!message) return;

    // Remove any existing error messages
    const existingError = form.querySelector('.feedbackbox-error');
    if (existingError) existingError.remove();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(\`\${apiUrl}/api/feedback\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectId,
          type: selectedType,
          message: message,
          email: email || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit feedback');
      }

      // Show success message
      const content = modal.querySelector('#feedbackbox-content');
      content.innerHTML = \`
        <div class="feedbackbox-success">
          <div class="feedbackbox-success-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3>Thank You!</h3>
          <p>Your feedback has been received. We appreciate your input!</p>
        </div>
      \`;

      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        closeModal();
        messageInput.value = '';
        emailInput.value = '';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Feedback';
        
        // Reset to form view
        content.innerHTML = \`
          <h2 id="feedbackbox-title">Share Your Feedback</h2>
          <p id="feedbackbox-subtitle">Help us improve by sharing your thoughts</p>
          
          <div class="feedbackbox-type-selector">
            <button type="button" class="feedbackbox-type-button active" data-type="feature">
              ✨ Feature
            </button>
            <button type="button" class="feedbackbox-type-button" data-type="bug">
              🐛 Bug
            </button>
            <button type="button" class="feedbackbox-type-button" data-type="praise">
              ❤️ Praise
            </button>
          </div>

          <form id="feedbackbox-form">
            <textarea 
              id="feedbackbox-message" 
              placeholder="Tell us what's on your mind..."
              required
            ></textarea>
            <input 
              id="feedbackbox-email" 
              type="email" 
              placeholder="Your email (optional)"
            />
            <button type="submit" id="feedbackbox-submit">
              Send Feedback
            </button>
          </form>
        \`;
      }, 2000);

    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      // Show error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'feedbackbox-error';
      errorDiv.textContent = error.message || 'Failed to send feedback. Please try again.';
      form.insertBefore(errorDiv, form.firstChild);
      
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Feedback';
    }
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();
  `;

  return new Response(widgetCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
