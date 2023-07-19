// Get references to the chatbot elements
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbot=document.getElementById('chatbot-iframe')

// Add click event listener to the toggle button
chatbotToggle.addEventListener("click", toggleChatbot);

// Toggle the chatbot visibility
function toggleChatbot() {
  chatbotContainer.classList.toggle("closed"); 
  if (chatbotContainer.classList.contains("closed")) {
    chatbot.style.display = "none";
    chatbotToggle.style.bottom='20px';
    chatbotToggle.style.top='650px'

    chatbotToggle.style.right='20px';
  } else {
    chatbot.style.display = "inline-block";
    chatbotToggle.style.top='150px'
    chatbotToggle.style.right='365px'
  }
}



function toggleChatbotImage() {
  if (window.scrollY > 100) {
    chatbotToggle.classList.add('show');
  } else {
    chatbotToggle.classList.add('show');
  }
}

window.addEventListener('scroll', toggleChatbotImage);
