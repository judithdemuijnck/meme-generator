import './App.css';
import Header from '../components/Header/Header';
import Meme from '../components/Meme/Meme';
import axios from "axios";
import { useState, useRef } from 'react';

function App() {
  const [generatedMeme, setGeneratedMeme] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const topText = useRef("");
  const bottomText = useRef("");

  const memeGenerator = async (event) => {
    event.preventDefault();
    // 2. Set loading is now true
    setIsLoading(true);
    const memesData = await getMemesData()
    const randomMeme = getRandomMeme(memesData);
    await generateMeme(randomMeme);
    // 3. We don't set loading here now - thats now triggered by image load!
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
          text0: topText.current.value,
          text1: bottomText.current.value
        }
      })
      // 4. generatedMeme is now set...
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
        // 6. Generated meme is sent through to the component
        generatedMeme={generatedMeme}
        topText={topText}
        bottomText={bottomText}
        // 10. Isloading is now false...
        isLoading={isLoading}
        // 9. Callback from the child - set loading false!
        onLoadedMeme={() => setIsLoading(false)} 
        onMemeError={() => setIsLoading(false)}
        />
    </div>
  );
}

export default App;
