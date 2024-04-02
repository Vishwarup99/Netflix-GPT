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

export const checkValidSignUp = (fullName, email, password) => {
    if (!fullName || !email || !password || !reTypePassword) {
        return "All Fields are Mandatory for SignUp";
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if (!isEmailValid || !isPasswordValid) {
        let errorMessage = "";

        if (!isEmailValid) {
            errorMessage += "Email Id is invalid. ";
        }
        if (!isPasswordValid) {
            errorMessage += "Password is invalid. ";
        }

        return errorMessage.trim();
    }

    return null;
};
