// Windventure - Contact Form Handling

document.addEventListener('DOMContentLoaded', function() {
  // Get the contact form element
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add submit event listener
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  /**
   * Handle form submission
   * @param {Event} event - Form submit event
   */
  function handleFormSubmit(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formDataObj = {};
    
    // Convert FormData to object
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    
    // Validate form data
    if (!validateForm(formDataObj)) {
      return;
    }
    
    // Show loading indicator
    showLoadingState();
    
    // In a real implementation, you would send this data to your server
    // For this example, we'll simulate a server response after a delay
    setTimeout(() => {
      // Simulate successful form submission
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        showSuccessMessage();
        contactForm.reset();
      } else {
        showErrorMessage('There was an error submitting your form. Please try again.');
      }
      
      // Hide loading indicator
      hideLoadingState();
    }, 1500);
    
    // Log form data (for demonstration purposes only)
    console.log('Form submission data:', formDataObj);
    console.log('Form would be sent to: contact@windventure.fr');
  }

  /**
   * Validate form data
   * @param {Object} data - Form data object
   * @returns {boolean} - Whether the form is valid
   */
  function validateForm(data) {
    let isValid = true;
    const errorMessages = [];
    
    // Name validation
    if (!data.name || data.name.trim() === '') {
      errorMessages.push('Please enter your name');
      isValid = false;
    }
    
    // Email validation
    if (!data.email || !isValidEmail(data.email)) {
      errorMessages.push('Please enter a valid email address');
      isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim() === '') {
      errorMessages.push('Please enter a message');
      isValid = false;
    } else if (data.message.length < 10) {
      errorMessages.push('Your message is too short (minimum 10 characters)');
      isValid = false;
    }
    
    // Display validation errors if any
    if (!isValid) {
      showValidationErrors(errorMessages);
    }
    
    return isValid;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether the email is valid
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Show validation errors
   * @param {string[]} errors - Array of error messages
   */
  function showValidationErrors(errors) {
    // Remove any existing error messages
    removeValidationErrors();
    
    // Create error message container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'alert alert-danger mt-3';
    errorContainer.id = 'formErrors';
    
    // Create error list
    const errorList = document.createElement('ul');
    errorList.className = 'mb-0';
    
    // Add each error to the list
    errors.forEach(error => {
      const errorItem = document.createElement('li');
      errorItem.textContent = error;
      errorList.appendChild(errorItem);
    });
    
    // Append the list to the container
    errorContainer.appendChild(errorList);
    
    // Insert error container before the form
    contactForm.parentNode.insertBefore(errorContainer, contactForm);
    
    // Scroll to errors
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Remove validation error messages
   */
  function removeValidationErrors() {
    const existingErrors = document.getElementById('formErrors');
    if (existingErrors) {
      existingErrors.remove();
    }
  }

  /**
   * Show loading state
   */
  function showLoadingState() {
    // Disable submit button and show loading indicator
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
  }

  /**
   * Hide loading state
   */
  function hideLoadingState() {
    // Re-enable submit button and restore text
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message';
  }

  /**
   * Show success message
   */
  function showSuccessMessage() {
    // Remove any existing messages
    removeValidationErrors();
    removeSuccessMessage();
    
    // Create success message
    const successContainer = document.createElement('div');
    successContainer.className = 'alert alert-success mt-3';
    successContainer.id = 'formSuccess';
    successContainer.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. We will get back to you soon.';
    
    // Insert success message before the form
    contactForm.parentNode.insertBefore(successContainer, contactForm);
    
    // Scroll to success message
    successContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Remove success message
   */
  function removeSuccessMessage() {
    const existingSuccess = document.getElementById('formSuccess');
    if (existingSuccess) {
      existingSuccess.remove();
    }
  }

  /**
   * Show error message
   * @param {string} message - Error message to display
   */
  function showErrorMessage(message) {
    // Remove any existing messages
    removeValidationErrors();
    removeSuccessMessage();
    
    // Create error message
    const errorContainer = document.createElement('div');
    errorContainer.className = 'alert alert-danger mt-3';
    errorContainer.id = 'formErrors';
    errorContainer.innerHTML = `<strong>Error!</strong> ${message}`;
    
    // Insert error message before the form
    contactForm.parentNode.insertBefore(errorContainer, contactForm);
    
    // Scroll to error message
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});