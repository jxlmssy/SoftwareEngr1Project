# Wireframes login, register, set/reset password
![alt text](<Screenshot 2026-10-24 155426.png>)

# Description
This document outlines the core wireframes and structural user interface specifications for task [S1-UIX-02]. It establishes the visual layout, input component structures, and user flow patterns for the application's authentication screens.

**File & Assets**

- **UI Blueprint & Repository:** https://www.figma.com/design/O1EsT9in4dEaMgsvskkPuj/SOFT-ENGR-GRP?node-id=0-1&t=2N9ne13x5pPuFGfe-1

- **Main View Panels:** Authentication Modals (Login, Register, Password Reset, Verify Code, Resend Code, and Create New Password)

# Developer Handoff Specifications

- **Screen Components & User Flow**
	
	**1. Login Screen**
	
	- **Header:** Title "Log in", helper text "To log in your account, enter your credentials.", and an x close button.   
	- **Input Fields:** 
		- Email or Username (Placeholder: "Enter email or username")
		- Password with a "Show" toggle button (Placeholder: "Enter password")  	
	- **Options:** Remember me checkbox and Forgot password? link.
	- **Primary Action:** Log in button.   
	- **Third-Party Auth:** Continue with Google button.   
	- **Footer:** "Don't have an account? Create an account" link.

	**2. Register Screen (Sign up)**
	- **Header:** Title "Sign up", helper text "Fill out the fields to create your account.", and an x close button.   
	- **Input Fields:** 
		- Username (Placeholder: "Choose username")   
		- Email Address (Placeholder: "Enter email")   
		- Password with "Show" toggle (Placeholder: "Create password")   
		- Confirm Password with "Show" toggle (Placeholder: "Re-enter password")   	
	- **Primary Action:** Create Account button.   
	- **Third-Party Auth:** Continue with Google button.   
	- **Footer:** "Already have an account? Log in" link.

	**3. Password Reset (Step 1 - Request Code)**
	- **Header:** Title "Reset your password", helper text "Enter your email address or username to receive a code.", and an x close button.   
	- **Input Field:** Email or Username (Placeholder: "Enter registered email").   	
	- **Primary Action:** Send Code button.   
	- **Footer:** Back to Login link.   

	**4. Verify Code (Step 2 - Verification)**
	- **Header:** Title "Reset your password", helper text "Enter the 6-digit code sent to your email.", and an x close button.   
	- **Input Fields:** Email Address (Pre-filled with user's email, e.g., you@gmail.com) 
	- **Verification Code** (Placeholder: "6-digit code")   
	- **Secondary Link:** "Didn't get code? Resend" link.   
	- **Primary Action:** Verify Code button.   
	- **Footer:** Back to Login link.   

	**5. New Code (Step 2 - Resend State)**
	- **Behavior:** Feedback view showing "New code sent!" subtext under the resend prompt after requesting a new code.   

	**6. Create New Password (Step 3 - Finalize)**
	- **Header:** Title "Create new password", helper text "Enter and confirm your new password.", and an x close button.   
	- **Input Fields:** 
		- Email Address (Disabled/read-only field showing you@gmail.com)   
		- New Password with "Show" toggle (Placeholder: "New password")   
		- Confirm Password with "Show" toggle (Placeholder: "Confirm password")   	
	- **Primary Action:** Continue Logging In button.   
	- **Footer:** Back to Login link.