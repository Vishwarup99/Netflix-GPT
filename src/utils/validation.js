export const checkValidData = (email,password) => {

    const isEmailIdValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email) ; // regex to validate if email format is correct
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ .test(password);

    if(!isEmailIdValid && !isPasswordValid){
        return "Email Id & Password are invalid";
    }

    if(!isEmailIdValid){
        return "Email Id is invalid";
    }

    if(!isPasswordValid){
        return "Password is invalid";
    }

    return null; // If email & Password are valid
}

export const checkValidSignUp = (fullName, email, password, reTypePassword, phoneNumber) => {
    if (!fullName || !email || !password || !phoneNumber) {
        return "All Fields are Mandatory for SignUp";
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isPhoneNumberValid = /^\d{10}$/.test(phoneNumber); // Regex to validate 10 digit phone number

    if (!isEmailValid || !isPasswordValid || !isPhoneNumberValid) {
        let errorMessage = "";

        if (!isEmailValid) {
            errorMessage += "Email Id is invalid. ";
        }
        if (!isPasswordValid) {
            errorMessage += "Password is invalid. ";
        }
        if (!isPhoneNumberValid) {
            errorMessage += "Phone Number is invalid. ";
        }
        if(password != reTypePassword){
            errorMessage += "Passwords do not match"
        }

        return errorMessage.trim();
    }

    return null;
};
