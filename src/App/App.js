import './App.css';
import Header from '../components/Header/Header';
import Meme from '../components/Meme/Meme';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [memesData, setMemesData] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes")
      .then(response => setMemesData(response.data.data.memes))
      .catch(e => console.log(e))
    console.log(memesData)
  }, [])

  const memeGenerator = async (event, topText, bottomText) => {
    event.preventDefault();
    setIsLoading(true);
    const randomMeme = getRandomMeme(memesData);
    await generateMeme(randomMeme, topText, bottomText);
  }

  const getRandomMeme = (memesData) => {
    const randomNum = Math.floor(Math.random() * memesData.length) + 1;
    return memesData[randomNum]
  }

  const generateMeme = async (meme, text0, text1) => {
    try {
      const response = await axios.post("https://whispering-garden-15850.herokuapp.com/https://api.imgflip.com/caption_image", {}, {
        params: {
          template_id: meme.id,
          username: window.username || process.env.REACT_APP_IMGFLIP_USERNAME,
          password: window.password || process.env.REACT_APP_IMGFLIP_PASSWORD,
          text0: text0,
          text1: text1
        }
      })
      setGeneratedMeme(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      <Header />
      <Meme
        handleClick={memeGenerator}
        generatedMeme={generatedMeme}
        isLoading={isLoading}
        onLoadedMeme={() => setIsLoading(false)}
      // onMemeError={() => setIsLoading(false)} 
      />
    </div>
  );
}

export default App;
