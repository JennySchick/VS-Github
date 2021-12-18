import './App.css';
import React, { Component } from 'react';
import { Button } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Snackbar } from '@mui/material';

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const Url = process.env.REACT_APP_URL;
  const handleSend = (e) => {
    e.preventDefault();

    // -------------------------------------------
    let xhr = new XMLHttpRequest();
    let rateUrl = 'api/comments';
    let object = JSON.stringify({
      id: 1,
      id2: 2,
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
        }
      }
    };
  };

  const inputFieldsChanged = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>Hello</h1>
      <div
        style={{
          padding: '1%',
        }}
      >
        <Button onClick={handleSend} />
      </div>
      ;
    </>
  );
}

export default App;
