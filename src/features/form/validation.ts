import { FormData, FormErrors } from "./types";


export function validate(data: FormData): FormErrors{
    const errors: FormErrors = {};

    const trimmedName = data.name.trim();
    if(!trimmedName){
        errors.name = "Name is required";
    }else if(trimmedName.length<2){
        errors.name = "Name must be at least 2 characters"
    }


    const trimmedEmail = data.email.trim();
    if(!trimmedEmail){
        errors.email = "Email is required"
    }

    const trimmedExp = data.experience.trim();
    if(!trimmedExp){
        errors.experience = "Years of experience is required"
    }else{
        const years = Number(trimmedExp);
        if(Number.isNaN(years) || years<0 || years>50){
            errors.experience = "Enter an number between 0 and 50";
        }
    }

    const trimmedBio = data.bio.trim();
    if(trimmedBio.length>0 && trimmedBio.length<10){
        errors.bio = "If you add a bio, it must be greater than 10 characters"
    }

    return errors;
}


export function isValid(errors: FormErrors):boolean{
    return Object.keys(errors).length===0;
}