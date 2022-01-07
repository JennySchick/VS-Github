import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, TextField, Fab, Card, IconButton, CardContent,CardHeader, H5, H6, CardMedia } from 'ui-neumorphism';
import Icon from '@mdi/react';
import { mdiPlus, mdiCartVariant  } from '@mdi/js';

import 'ui-neumorphism/dist/index.css';
import { useSnackbar } from 'notistack';
import Item from './item.js';

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  var [nameOfNewItem, setNameOfNewItem] = useState('ErrorItem');
  var [items,setItems] = useState([
   { id: '1', name: 'Banane', quantity: 4, created: 'TK', complete: false },
    { id: '2', name: 'Apfel', quantity: 3, created: 'TK', complete: false },
    { id: '3', name: 'Toast', quantity: 1, created: 'TK', complete: false },
 ]);

  useEffect(() => {
    let xhr = new XMLHttpRequest();
    let URL = 'http://localhost:8000' + '/items';
    xhr.open('GET', URL, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    xhr.onload = function () {
      if (xhr.status == 200) {
        setItems(xhr.response);
        console.log(items);
       // enqueueSnackbar('Fetched Items from Database.', {
       // variant: 'success',
       //  });
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
            background: '#edf2f4',
          }}
          >
            <img
          style={{
            width: 150 + 'px',
            height: 150 + 'px',
            borderRadius: 75 + 'px',
            top: 90 + 'px',
          }}
          src={require('./cart.png')}
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
              display: 'flex',
              background: '#edf2f4',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
        <TextField
            width={300}
             style={{ 
              background: '#edf2f4',
              justifyContent: 'center',
              marginBottom: '-20px'}}
             label="Add Item ..."
             className="my-3"
             onChange={({ target: { value } }) => setNameOfNewItem(value)}
        ></TextField>
        <IconButton rounded 
        text={false} 
        size='small'
        style={{ 
            background: '#edf2f4',
            }}>
            <Icon path={mdiPlus} size={1} />
            </IconButton>
            </CardContent>
           <CardContent  
              style={{
              width: '90%',
              height: '80%',
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'left',
              flexDirection: 'column',
              background: '#edf2f4',
            
            }}>
              {items.map((item, i) => (
              <Item item={item}></Item>
            ))}
            </CardContent>
        </Card>
        <Card style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 5 + 'px',
            width: 50 + 'vw',
            justifyContent: 'center',
            background: '#edf2f4',
          }}
        >
         <CardHeader
         title={<H6> TOTAL: {items.length}</H6>}
          style={{
             background: '#edf2f4'}}
            />
        </Card>
      </div>
    </>
  );
}

export default App;
