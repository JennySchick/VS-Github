import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

import { Button } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';
import { useSnackbar } from 'notistack';

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleSend = (e) => {
    e.preventDefault();

    // -------------------------------------------
    let xhr = new XMLHttpRequest();
    let rateUrl = Url + 'api/comments';
    let object = JSON.stringify({
      product_id: productId,
      username: username,
      comment: rating,
    });
    xhr.open('POST', rateUrl, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(object);
    xhr.onload = function () {
      if (xhr.status == 200) {
        if (xhr.response.message == 'valid') {
          enqueueSnackbar('Danke für die Bewertung', {
            variant: 'success',
          });
          handleClose();
        }
      }
    };
  };

  const inputFieldsChanged = (e) => {
    e.preventDefault();
    setRating(e.target.value);
  };
  return (
    <div
      style={{
        padding: '1%',
        height: 350 + 'px',
        width: 550 + 'px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Button onClick={handleSend} />
    </div>
  );
}

export default App;
