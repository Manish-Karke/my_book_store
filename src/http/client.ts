import axios from "axios";
const baseURL ="https://my-book-store-b63l.vercel.app/api"
export const api = axios.create({ baseURL, withCredentials: true, 
                                 headers: { "Content-Type": "application/json",
                                           Accept: "application/json", 
                                          }, 
                                
                                });
