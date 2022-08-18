import './App.css';
import Header from '../components/Header/Header';
import Meme from '../components/Meme/Meme';
import axios from "axios";
import { useEffect, useState, useRef } from 'react';


function App() {
  const [memesData, setMemesData] = useState([]);
  const [randomMeme, setRandomMeme] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState([false]);
  const topText = useRef("");
  const bottomText = useRef("");


  // useEffect(() => {

  // }, [memesData])


  const memeGenerator = (event) => {
    event.preventDefault();
    getMemesData()
    const randomNum = Math.floor(Math.random() * memesData.length) + 1;
    setRandomMeme(memesData[randomNum]);
    generateMeme()
  }

  const getMemesData = async () => {
    const response = await axios.get("https://api.imgflip.com/get_memes")
    setMemesData(response.data.data.memes);
  }

  const generateMeme = async () => {
    const response = await axios.post("https://whispering-garden-15850.herokuapp.com/https://api.imgflip.com/caption_image", {}, {
      params: {
        template_id: randomMeme.id,
        username: XXX,
        password: XXX,
        text0: topText.current.value,
        text1: bottomText.current.value
      }
    })
    setGeneratedMeme(response.data.data)
  }

  return (
    <div className="App">
      <Header />
      <Meme
        memesData={memesData}
        handleClick={memeGenerator}
        generatedMeme={generatedMeme}
        topText={topText}
        bottomText={bottomText} />

    </div>
  );
}

export default App;
