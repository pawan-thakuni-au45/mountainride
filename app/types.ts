
//role was not inside auth credentials so we added it here,so we can pass that as a token
declare module "next-auth"{
    interface User{

        role:string
    }
}

export{}
