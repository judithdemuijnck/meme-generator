import './App.css';
import Header from '../components/Header/Header';
import Meme from '../components/Meme/Meme';
import axios from "axios";
import { useState } from 'react';

function App() {
  const [generatedMeme, setGeneratedMeme] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [topText, setTopText] = useState({ value: "" })
  const [bottomText, setBottomText] = useState({ value: "" })

  const memeGenerator = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const memesData = await getMemesData()
    const randomMeme = getRandomMeme(memesData);
    await generateMeme(randomMeme);
    setIsLoading(false);
  }

  const getMemesData = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes")
      return response.data.data.memes;
    } catch (e) {
      console.log(e)
    }
  }

  const getRandomMeme = (memesData) => {
    const randomNum = Math.floor(Math.random() * memesData.length) + 1;
    return memesData[randomNum]
  }

  const generateMeme = async (meme) => {
    try {
      const response = await axios.post("https://whispering-garden-15850.herokuapp.com/https://api.imgflip.com/caption_image", {}, {
        params: {
          template_id: meme.id,
          username: window.username || process.env.REACT_APP_IMGFLIP_USERNAME,
          password: window.password || process.env.REACT_APP_IMGFLIP_PASSWORD,
          text0: topText.value,
          text1: bottomText.value
        }
      })
      setGeneratedMeme(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  function handleChange(event) {
    if (event.target.id === "topText") {
      setTopText({ value: event.target.value })
    } else if (event.target.id === "bottomText") {
      setBottomText({ value: event.target.value })
    }
  }

  return (
    <div className="App">
      <Header />
      <Meme
        handleClick={memeGenerator}
        generatedMeme={generatedMeme}
        handleChange={handleChange}
        topText={topText}
        bottomText={bottomText}
        isLoading={isLoading} />
    </div>
  );
}

export default App;
