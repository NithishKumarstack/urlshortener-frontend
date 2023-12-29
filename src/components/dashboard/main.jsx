import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';

function Main() {
  const [data, setData] = useState({
    url: '',
    shortenedUrl: '',
  });

  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    fetchUrlList();
  }, []);

  const fetchUrlList = async () => {
    try {
      const response = await axios.get('https://urlshortener-backend-7eex.onrender.com/url/list');
      setUrlList(response.data.data);
    } catch (error) {
      console.error('Error fetching URL list:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://urlshortener-backend-7eex.onrender.com/url/shorturl', {
        originalUrl: data.url,
      });
      fetchUrlList();

      const shortenedUrl = response.data.data.shortId;
      setData({
        ...data,
        shortenedUrl,
      });
      toast.success('URL shortened successfully!');
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`https://urlshortener-backend-7eex.onrender.com/${data.shortenedUrl}`)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error.message);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-white p-3 mt-5 rounded">
        <form onSubmit={handleSubmit}>
          <h1>Url Shortener</h1>
          <input
            className="input mb-3 ms-2 me-2"
            type="text"
            placeholder="Enter A URL"
            name="url"
            value={data.url}
            onChange={handleChange}
            required
          />
          <button className="ms-2 p-1 mt-3" type="submit">
            Shorten URL
          </button>
        </form>
        {data.shortenedUrl && (
          <div className="mt-3">
            <h3>Shortened URL:</h3>
            <div className="d-flex">
              <input
                className="input mb-2"
                type="text"
                value={`localhost:5000/${data.shortenedUrl}`}
                readOnly
              />
              <button className="ms-2 p-1" onClick={handleCopyToClipboard}>
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
        {urlList.length > 0 && (
          <div className="mt-3">
            <h3>URL List:</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Shortened URL</th>
                  <th>Visited Count</th>
                </tr>
              </thead>
              <tbody>
                {urlList.map((url, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{url.shortId}</td>
                    <td>{url.visitedHistory.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Main;
