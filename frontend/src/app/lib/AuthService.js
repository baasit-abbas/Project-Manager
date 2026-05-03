import { jwtDecode } from "jwt-decode"
import { API } from "./AuthClient"
import { toast } from "react-toastify"


export function IsLoggedIn(){
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem('token')
}

export function getToken(){
    return localStorage.getItem('token')
}

export function getUser(){
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : undefined
}

export function logOut(router){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
}

export async function login(data,router){
    const res = await API.post('http://localhost:3000/auth/login',data)
    if (res.message){
        toast.error('Wrong Email or Password')
        return
    }
    const token = res.access_token
    localStorage.setItem('token',token)
    const user = jwtDecode(token)
    localStorage.setItem('user',JSON.stringify(user))
    if (user.role === 'user'){
        router.push(`users/${user.id}`)
    }
    else{
        router.push('/')
    }
}

export function formatDate(date) {
    const formatDate = new Date(date)
  return formatDate.toISOString().split("T")[0];
}

