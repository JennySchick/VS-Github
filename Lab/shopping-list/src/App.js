import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, TextField, Fab, Card, IconButton, CardContent,CardHeader, H5, CardAction, CardMedia } from 'ui-neumorphism';


import 'ui-neumorphism/dist/index.css';
import { useSnackbar } from 'notistack';
import Item from './item.js';

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var [nameOfNewItem, setNameOfNewItem] = useState('ErrorItem');
  var items = [
    { id: '1', name: 'TestItem', quantity: 4, created: 'TK', complete: false },
    { id: '2', name: 'TestItem', quantity: 3, created: 'TK', complete: false },
  ];

  useEffect(() => {
    let xhr = new XMLHttpRequest();
    let URL = process.env.REACT_APP_URL + '/items';
    xhr.open('GET', URL, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    xhr.onload = function () {
      if (xhr.status == 200) {
        items = xhr.response;
        // enqueueSnackbar('Fetched Items from Database.', {
        //   variant: 'success',
        // });
      }
    };
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let URL = process.env.REACT_APP_URL + 'items';
    let timeStamp = new Date();
    let object = JSON.stringify({
      id: 1,
      name: nameOfNewItem,
      quantity: 1,
      created: timeStamp.toISOString(),
      complese: false,
    });
    xhr.open('POST', URL, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(object);
    xhr.onload = function () {
      if (xhr.status == 200) {
        enqueueSnackbar('Danke für die Bewertung', {
          variant: 'success',
        });
      }
    };
    enqueueSnackbar('Item ' + nameOfNewItem + ' added.', {
      variant: 'success',
    });
  };


  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 100 + 'vw',
          height: 100 + 'vh',
          maring: 10 + '%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#edf2f4',
        }}
      >
        <Card
        style={{
            width: 150 + 'px',
            height: 150 + 'px',
            borderRadius: 75 + 'px',
            top: 100 + 'px',
          }}
          >
            <CardMedia
            rounded={true}
            src={require('./cart.png')}
            style={{
            width: 100 + 'px',
            height: 100 + 'px',
            borderRadius: 75 + 'px',
          }}
            />
        </Card>

        <Card 
      elevation={1} 
      style={{ display: 'flex',
             width: 50 + 'vw',
             height: 60 + 'vh',
             background: '#edf2f4',
             padding: '1%',
             margin: 10 + 'px',
              flexDirection: 'column',
             alignItems: 'center',
              justifyContent: 'center'}}>
        <CardHeader
         title={<H5>SHOPPING LIST</H5>}
          style={{
             background: '#edf2f4'}}
            />
        <CardContent  
              style={{
              width: '100%',
              height: '30%',
              display: 'flex',
              background: '#edf2f4',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
        <TextField
            width={500}
             style={{ 
             background: '#edf2f4'}}
             label="Add Item ..."
             className="my-3"
             onChange={({ target: { value } }) => setNameOfNewItem(value)}
        ></TextField>
        <IconButton rounded 
        text={false} 
        style={{ 
             display: 'flex',
             height: '30%',
             background: '#edf2f4',
             size: 'medium',
             fontSize: '50px',
             fontWeight: 'bold'}}>+</IconButton>
            </CardContent>
       
        </Card>
        <div
          style={{
            display: 'flex',
            width: 50 + 'vw',
            height: 60 + 'vh',
            padding: '1%',
            margin: 10 + 'px',
            border: 2 + 'px',
            borderColor: 'white',
            borderStyle: 'solid',
            flexDirection: 'column',
            borderRadius: 5 + 'px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '20%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <TextField
              label="Add Item Name"
              className="my-3"
              onChange={({ target: { value } }) => setNameOfNewItem(value)}
            ></TextField>
            <Fab onClick={handleAddItem}>
              <span style={{ fontSize: '30px' }}>&#43;</span>
            </Fab>
          </div>
          <div
            style={{
              width: '100%',
              height: '80%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {items.map((item, i) => (
              <Item item={item}></Item>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1%',
            margin: 10 + 'px',
            border: 2 + 'px',
            width: 50 + 'vw',
            borderColor: 'white',
            borderStyle: 'solid',
            borderRadius: 5 + 'px',
            justifyContent: 'flex-end',
          }}
        >
          <h3
            style={{
              paddingRight: 5 + 'px',
            }}
          >
            Amount: {items.length}
          </h3>
        </div>
      </div>
    </>
  );
}

export default App;
