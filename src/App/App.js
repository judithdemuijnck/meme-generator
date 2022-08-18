import './App.css';
import Header from '../components/Header/Header';
import Meme from '../components/Meme/Meme';
import axios from "axios";
import { useEffect, useState, useRef } from 'react';


function App() {
  // 1. What hook could we put here to hold whether the state is loading?
  const [memesData, setMemesData] = useState([]);
  const [randomMeme, setRandomMeme] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState([false]);
  const topText = useRef("");
  const bottomText = useRef("");


  // useEffect(() => {

  // }, [memesData])

  // 2. We know we're going to be making a network request here - so the function will need to WAIT for a result. What keyword do we need to give this function to reflect this?
  const memeGenerator = (event) => {
    event.preventDefault();
    // 3. So we've clicked the button, what do here we want to do if the page is loading? Do we want to make another request if theres one in progress?
    // 4. So we know now we're about to make a network request - the app is about to enter our LOADING state. How do we change the state to reflect this? (see step 1)
    // 5. getMemesData returns a promise - what keyword should we add to make it wait for the promise to resolve?
    // 10.You sometimes get an issue where 'memedata' isn't defined. Does it need to be in state or could we just return the data from the function
    getMemesData()
    const randomNum = Math.floor(Math.random() * memesData.length) + 1;
    // 11. Does this need to be in state? Could it just be a constant?
    setRandomMeme(memesData[randomNum]);
    // 5. getMemesData returns a promise - what keyword should we add to make it wait for the promise to resolve?
    generateMeme()
    // 6. Our network requests have finished! Should our app still be in a loading state?
  }

  const getMemesData = async () => {
    const response = await axios.get("https://api.imgflip.com/get_memes")

    // 10 continued - so instead of setting state here (which triggers a re-render) - you can just return the data!
    setMemesData(response.data.data.memes);
  }

  const generateMeme = async () => {
    const response = await axios.post("https://whispering-garden-15850.herokuapp.com/https://api.imgflip.com/caption_image", {}, {
      params: {
        template_id: randomMeme.id,
        // you can now put window.username='blah' into the Chrome console and it will set it for you
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
      {/* 7. How could we pass a prop indicate the button should be disabled when the page is loading? */}
      {/* 12. Do you really need to pass memesData? Is it being used? */}
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
