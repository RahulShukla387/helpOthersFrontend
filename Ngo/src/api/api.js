import axios from "axios";
export let api = axios.create({
    // baseURL: "http://localhost:8080/api/",
    // baseURL: "https://myprojectadiyuvanbackend-production.up.railway.app/api/",
    //Url of aws backend
    baseURL: "https://api.helpothers.space/api/",
})