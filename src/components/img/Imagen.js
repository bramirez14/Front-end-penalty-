import React from 'react'

export const Imagen = ({setData,setState,state,ancho}) => {
  const handleFileChange = (e) => {
    let file = e.target.files[0];
    console.log(file);
    handFiles(file);
  };
  const handFiles = (file) => {
    if(file===undefined){
      setState({
        ...state,
        imagen: '',
      });

    }else{ 
    let imageArr = [];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileObj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      imageArr.push(fileObj);
      setData(imageArr);
      setState({
        ...state,
        imagen: file,
      });
    });
  }
  };
    return (
        <div class="button-wrapper" style={{width:ancho}}>
              <span class="label">Upload File</span>
              <input
                type="file"
                name="upload"
                id="upload"
                class="upload-box"
                placeholder="Upload File"
                onChange={handleFileChange}
              />
            </div>
    )
}
