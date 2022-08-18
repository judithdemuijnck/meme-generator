import './App.css';
import Header from '../components/Header/Header';
import Meme from '../components/Meme/Meme';
import axios from "axios";
import { useEffect, useState, useRef } from 'react';


function App() {
  // 1. What hook could we put here to hold whether the state is loading?
  const [loadingData, setLoadingData] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState([false]);
  const topText = useRef("");
  const bottomText = useRef("");


  // useEffect(() => {

  // }, [memesData])

  // 2. We know we're going to be making a network request here - so the function will need to WAIT for a result. What keyword do we need to give this function to reflect this?
  const memeGenerator = async (event) => {
    event.preventDefault();
    // 3. So we've clicked the button, what do here we want to do if the page is loading? Do we want to make another request if theres one in progress?
    if (loadingData) {
      return
    }
    // 4. So we know now we're about to make a network request - the app is about to enter our LOADING state. How do we change the state to reflect this? (see step 1)
    setLoadingData(true)
    // 5. getMemesData returns a promise - what keyword should we add to make it wait for the promise to resolve?
    // 10.You sometimes get an issue where 'memedata' isn't defined. Does it need to be in state or could we just return the data from the function
    const memesData = await getMemesData()
    const randomNum = Math.floor(Math.random() * memesData.length) + 1;
    // 11. Does this need to be in state? Could it just be a constant?
    // setRandomMeme(memesData[randomNum]);
    const randomMeme = memesData[randomNum];
    // 5. getMemesData returns a promise - what keyword should we add to make it wait for the promise to resolve?
    await generateMeme(randomMeme)
    // 6. Our network requests have finished! Should our app still be in a loading state?
    setLoadingData(false)
  }

  const getMemesData = async () => {
    const response = await axios.get("https://api.imgflip.com/get_memes")

    // 10 continued - so instead of setting state here (which triggers a re-render) - you can just return the data!
    // setMemesData(response.data.data.memes);
    return response.data.data.memes
  }

  const generateMeme = async (meme) => {
    const response = await axios.post("https://whispering-garden-15850.herokuapp.com/https://api.imgflip.com/caption_image", {}, {
      params: {
        template_id: meme.id,
        username: window.username || 'XXX',
        password: window.password || 'XXX',
        text0: topText.current.value,
        text1: bottomText.current.value
      }
    })
    setGeneratedMeme(response.data.data)
  }

  return (
    <div className="App">
      <Header />
      {/* 7. How could we indicate the button should be disabled when the page is loading? */}
      {/* 12. Do you really need to pass memesData? Is it being used? */}
      <Meme
        handleClick={memeGenerator}
        generatedMeme={generatedMeme}
        topText={topText}
        bottomText={bottomText} 
        isLoading={loadingData}
        />

    </div>
  );
}

export default App;
