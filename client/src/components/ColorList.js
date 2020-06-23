import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log('edit color', res)
      const newList = colors.filter(color => color.id !== colorToEdit.id)
      updateColors([...newList, res.data])
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log(res)
      updateColors(colors.filter(item => item.id !== color.id))
      setColorToEdit(initialColor)
    })
    .catch(err => console.log(err))
  };

  const addColor = e =>{
    e.preventDefault()
    axiosWithAuth()
    .post('http://localhost:5000/api/colors', colorToAdd)
    .then(res => {
      updateColors(res.data)
      setColorToAdd(initialColor)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {!editing &&(
        <form onSubmit={addColor}>
      <label>Color:
        <input htmlFor='color' name='color' value={colorToAdd.color} onChange={e => setColorToAdd({...colorToAdd, color: e.target.value})}/></label>
        <label>Code:
        <input htmlFor='code' name='code' value={colorToAdd.code.hex} onChange={e=> setColorToAdd({...colorToAdd, code: {hex: e.target.value}})} /></label>
        <button type='submit'>Add Color</button>
      </form>
      )}
      <div className="spacer" />
      </div>
      
  );
};

export default ColorList;
