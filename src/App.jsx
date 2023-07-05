import { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import "./index.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image_file', selectedImage);
    formData.append('size', 'auto');

    const result = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        'X-Api-Key': 'T8MwezJsLWrPbpZuKEpvU22s'
      },
      responseType: 'blob', // This is important
    });

    setImageSrc(URL.createObjectURL(result.data));
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className='text-3xl text-green-700 mb-10'>
        Hello and welcome to the code clause image background remover!!!!
      </p>
      <div className="flex flex-row items-center justify-center space-y-4">
        <input type='file' accept='image/*' onChange={handleImageChange} />
        <button className="rounded-full mt-4 bg-blue-500 text-white px-4 py-2" onClick={handleImageUpload} disabled={loading}>
          {loading ? 'Loading...' : 'Upload and Remove Background'}
        </button>
      </div>
      {imageSrc && (
        <div className='mt-5'>
          <img src={imageSrc} alt="Uploaded Preview" className="max-w-md"/>
        </div>
      )}
    </div>

    

  );
}

export default App;