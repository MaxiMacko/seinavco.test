import styled from 'styled-components'
import {useState} from "react";

const API_KEY = '23962028-94da809230bc7a40269e8ad2a'
const IMAGES_ENDPOINT = 'https://pixabay.com/api'

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: dodgerblue;
  &.fullScreen {
    min-height: calc(100vh - 35px);
  }
`
const SearchBarWrapper = styled.div`
  padding: 1rem;
  height: 35px;
  background-color: #353335;
  transition: 2s all;
  display: flex;
  justify-content: center;
  &.fullScreen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const SearchButton = styled.button`
  width: 75px;
  height: 35px;
  background-color: dodgerblue;
  color: white;
`
const StyledBigImage = styled.img`
  z-index: 1000;
`

const StyledImage = styled.img`
  width: 100%;
  max-width: 300px;
`

const StyledInput = styled.input`
  width: 25rem;
  height: 28px;
  margin-right: 0.1rem;
`

const ImageWrapper = styled.div`
  padding: 5px;
`

const BigPictureWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.8;
`

const Message = styled.div`
  color: white;
  font-size: 2rem;
`

function App() {
  const [searchText, setSearchText] = useState('')
  const [imageItems, setImageItems] = useState([])
  const [imagesLoading, setImagesLoading] = useState(false);
  const [isInitialFlag, setIsInitialFlag] = useState(true);
  const [imageToShowFullScreen, setImageToShowFullScreen] = useState(null)


  const searchButtonClickHandler = async () => {
    setImagesLoading(true)
    setIsInitialFlag(false)
    const data = await fetch(`${IMAGES_ENDPOINT}/?` + new URLSearchParams({
      key: API_KEY,
      q: searchText,
      orientation: 'horizontal',
    }))
    const parsedData = await data.json();
    setImageItems(parsedData.hits);
    setImagesLoading(false);
  }

  console.log('images', imageItems)

  return (
    <div className="App">
      <SearchBarWrapper className={isInitialFlag ? 'fullScreen' : ''}>
        <div>
          <StyledInput onChange={e => setSearchText(e.target.value)} value={searchText}/>
          <SearchButton onClick={searchButtonClickHandler}>{imagesLoading ? 'Searching' : 'Search'}</SearchButton>
        </div>
      </SearchBarWrapper>
      <ImagesWrapper className={!isInitialFlag ? 'fullScreen' : ''}>
        {
          !imageItems.length &&
            <Message>Oops! No photos.</Message>
        }
        {
          imageItems.length > 0 && imageItems.map(image => (
            <ImageWrapper key={image.id}>
              <StyledImage src={image.webformatURL} key={image.id} onClick={() => setImageToShowFullScreen(image)}/>
            </ImageWrapper>

          ))
        }
      </ImagesWrapper>
      {
        imageToShowFullScreen &&
        <BigPictureWrapper onClick={() => setImageToShowFullScreen(null)}>
          <ImageBackground />
            <StyledBigImage src={imageToShowFullScreen.largeImageURL}/>
        </BigPictureWrapper>
      }

    </div>
  );
}

export default App;
