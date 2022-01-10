import React, { useState, useEffect } from 'react';
import { TextField, IconButton} from 'ui-neumorphism';
import { useSnackbar } from 'notistack';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiMenuUpOutline, mdiMenuDownOutline } from '@mdi/js';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

const Item = ({ item: { id, name, quantity, created, complete } }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isItemCompleted, setIsItemCompleted] = useState(complete);
  const [quantityOfItem, setQuantityOfItem] = useState(quantity);

  const addOneItem = (e) => {
    e.preventDefault();
    setQuantityOfItem(1 + quantityOfItem);
    let xhr = new XMLHttpRequest();
    let URL = process.env.REACT_APP_URL  + '/items/' + id + '/';
    let object = JSON.stringify({
      id: id,
      name: name,
      quantity: quantityOfItem,
      created: created,
      complete: isItemCompleted,
    });
    xhr.open('PUT', URL, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(object);
    xhr.onload = function () {
      if (xhr.status == 200) {
        enqueueSnackbar('Amount of item increased.', {
          variant: 'success',
        });
      }
    };
  };

  const deleteOneItem = (e) => {
    e.preventDefault();
    setQuantityOfItem(quantityOfItem - 1);
    let xhr = new XMLHttpRequest();
    let URL = process.env.REACT_APP_URL + 'items/' + id + '/';
    let object = JSON.stringify({
      id: id,
      name: name,
      quantity: quantityOfItem,
      created: created,
      complete: isItemCompleted,
    });
    console.log(object);
    xhr.open('PUT', URL, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(object);
    xhr.onload = function () {
      if (xhr.status == 200) {
        enqueueSnackbar('Amount of item decreased.', {
          variant: 'warning',
        });
      }
    };
  };

  const deleteWholeItem = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let URL = process.env.REACT_APP_URL + 'items/' + id;
    xhr.open('DELETE', URL, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    xhr.onload = function () {
      if (xhr.status == 200) {
        enqueueSnackbar('Item is deleted.', {
          variant: 'error',
        });
      }
    };
  };

/*const handleCheckBox = (e) => {
    e.preventDefault();
    setIsItemCompleted(!isItemCompleted);
    enqueueSnackbar(isItemCompleted.toString(), {
      variant: 'error',
    });
  };*/

  return (
    <div
      style={{
        marginLeft: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    ><FormControlLabel control={<Checkbox/>}
     label={name}
     className="my-3"
     readOnly
      />
       {/*<Checkbox
        color="none"
        checked={false}
        onClick={handleCheckBox}
        label={name}
        className="my-3"
        readonly
       />*/}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <IconButton 
        text={false} 
        size='small' 
        color="var(--primary)" 
        onClick={deleteOneItem}>
        <Icon path={mdiMenuDownOutline} size={0.8} /></IconButton>
        <TextField
          label={quantityOfItem}
          width="50"
          className="my-3"
          dense
        ></TextField>
         <IconButton 
        text={false} 
        size='small' 
        color="var(--primary)" 
        onClick={addOneItem}>
        <Icon path={mdiMenuUpOutline} size={0.8} /></IconButton>
        <IconButton 
        style={{
         marginLeft: '10px',
        }}
        text={false} 
        size='small' 
        color='var(--error)'
        onClick={deleteWholeItem}>
        <Icon path={mdiTrashCanOutline} size={0.8} />
        </IconButton>
      </div>
      
      
    </div>
  );
};

export default Item;
