//import { useState, useEffect } from 'react';
import React, { useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import ReactHtmlParser from 'react-html-parser';
// import Modal from 'react-modal';

function WriteAsk() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className="WriteAsk">
        
          <div className='form-wrapper'>
            <input className="title-input"
              type='text'
              placeholder='제목'
              //onChange={getValue}
              name='title'
            />
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                // setMovieContent({
                //   ...movieContent,
                //   content: data
                // })
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </div>
          <button
            className="submit-button"
            data-toggle="modal"
            data-target="#myModal"
            //onClick={() => setModalIsOpen(true)}
            >보내기</button>

            {/* <Modal 
              isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      	      This is Modal content
            </Modal> */}
        </div>
    )
}

export { WriteAsk }