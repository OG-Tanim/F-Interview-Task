const axios = require("axios");


const checkDomainAvailability = async (domain) => {
    const apiurl = "https://interview-task-green.vercel.app/task/domains/check/${domain}";
    try{
        const response = await axios.get(apiurl)
        console.log("Api Response:", response.data);
    } catch (error) {
        console.error("Error checking Domain", error.message)
    }
}

checkDomainAvailability("uniquedomain.expressitbd.com");