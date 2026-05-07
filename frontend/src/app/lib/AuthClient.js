import { getToken } from "./AuthService";

export class API{
    static async fetchUrl(url,options={}){
        const token = getToken()
        const {method='GET',data} = options
        const res = await fetch(url,{
            method,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        if (!res.ok){
            return {message:'Something went wrong'}
        }
        if (res){
            return res.json()
        }
        return null
    }

    static async get(url){
        return this.fetchUrl(url)
    }
    static async post(url,data){
        return this.fetchUrl(url,{
            method:'POST',
            data
        })
    }
    static async patch(url,data){
        return this.fetchUrl(url,{
            method:'PATCH',
            data
        })
    }
    static async put(url,data){
        return this.fetchUrl(url,{
            method:'PUT',
            data
        })
    }
    static async delete(url){
        return this.fetchUrl(url,{
            method:'DELETE'
        })
    }

}