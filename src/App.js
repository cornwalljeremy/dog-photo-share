import "./App.css";
import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

export default function App() {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetchImages()
  }, []);
  async function fetchImages() {
    let imageKeys = await Storage.list('')
    console.log('imageKeys 2: ', imageKeys)
    imageKeys = await Promise.all(imageKeys.map(async k => {
        const signedUrl = await Storage.get(k.key)
        return signedUrl
    }))
    console.log('imageKeys 2: ', imageKeys)
    setImages(imageKeys)


  }

  async function onChange(e) {
    const file = e.target.files[0];
    const result = await Storage.put(file.name, file)
    console.log("result: ", result)
    fetchImages();
  }
  return (
    <div>
      <h1>Storage Example</h1>
      <input type='file' onChange={onChange} />
      {images.map((image) => (
        <img
          src={image}
          key={image}
          style={{ width: 300, height: 200, marginBottom: 10 }}
        />
      ))}
    </div>
  );
}
