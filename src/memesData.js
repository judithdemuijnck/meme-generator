import axios from "axios";

const getMemesData = async () => {
    const memesData = await axios.get("https://api.imgflip.com/get_memes")
    return memesData.data
}



const memesData = getMemesData();
export default memesData;