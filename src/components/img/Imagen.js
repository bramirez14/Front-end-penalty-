import React from 'react'

export const Imagen = ({handleFileChange}) => {
    return (
        <div class="button-wrapper">
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
