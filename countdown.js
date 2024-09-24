// CountdownTimer constructor function
function CountdownTimer() {
    this.number = 0;
    this.timeoutId = null;
    this.isPaused = false;
    this.isRunning = false;
  
    // DOM Elements
    this.displayElement = document.getElementById('countdown-display');
    this.startBtn = document.getElementById('start-btn');
    this.pauseBtn = document.getElementById('pause-btn');
    this.resumeBtn = document.getElementById('resume-btn');
    this.stopBtn = document.getElementById('stop-btn');
    this.startNumberInput = document.getElementById('start-number');
  
    // Bind methods to ensure correct 'this' context
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
  
    // Event listeners
    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause);
    this.resumeBtn.addEventListener('click', this.resume);
    this.stopBtn.addEventListener('click', this.stop);
  }
  
  CountdownTimer.prototype.start = function() {
    if (this.isRunning) return;
  
    const userInput = parseInt(this.startNumberInput.value, 10);
    if (isNaN(userInput) || userInput <= 0) {
      alert('Please enter a valid starting number greater than 0.');
      return;
    }
  
    this.number = userInput;
    this.isPaused = false;
    this.isRunning = true;
    this.updateDisplay(this.number);
  
    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;
    this.stopBtn.disabled = false;
    this.startCountdown();
  };
  
  CountdownTimer.prototype.startCountdown = function() {
    if (!this.isPaused && this.number >= 0) {
      this.timeoutId = setTimeout(() => {
        if (!this.isPaused) {
          this.updateDisplay(this.number);
          this.number--;
  
          if (this.number >= 0) {
            this.startCountdown();
          } else {
            this.finishCountdown();
          }
        }
      }, 1000);
    }
  };
  
  CountdownTimer.prototype.pause = function() {
    if (!this.isRunning || this.isPaused) return;
  
    this.isPaused = true;
    clearTimeout(this.timeoutId);
    this.pauseBtn.disabled = true;
    this.resumeBtn.disabled = false;
    this.updateDisplay('Paused');
  };
  
  CountdownTimer.prototype.resume = function() {
    if (!this.isRunning || !this.isPaused) return;
  
    this.isPaused = false;
    this.pauseBtn.disabled = false;
    this.resumeBtn.disabled = true;
    this.startCountdown();
  };
  
  CountdownTimer.prototype.stop = function() {
    if (!this.isRunning) return;
  
    clearTimeout(this.timeoutId);
    this.isRunning = false;
    this.isPaused = false;
    this.number = 0;
    this.updateDisplay('Stopped');
  
    // Reset buttons
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.resumeBtn.disabled = true;
    this.stopBtn.disabled = true;
  };
  
  CountdownTimer.prototype.finishCountdown = function() {
    this.isRunning = false;
    this.updateDisplay("Time's up!");
  
    // Reset buttons
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.resumeBtn.disabled = true;
    this.stopBtn.disabled = true;
  };
  
  CountdownTimer.prototype.updateDisplay = function(message) {
    this.displayElement.textContent = message;
  };
  
  // Initialize the countdown timer when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
  });
  