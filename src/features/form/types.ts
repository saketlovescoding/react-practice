export interface FormData{
    name: string,
    email:string,
    role:Role,
    experience:string,
    bio:string
}

export type Role= "developer" | "designer" | "product_manager";

export type FormErrors = Partial<Record<keyof FormData, string>>

export const INITIAL_FORM_DATA : FormData = {
    name:"",
    email:"",
    role:"developer",
    experience: "",
    bio:""
}

export const ROLE_OPTIONS: {value: Role, label: string}[] = [
    {value:"developer", label:"Developer"},
    {value:"designer", label:"Designer"},
    {value:"product_manager", label:"product_manager"}
]