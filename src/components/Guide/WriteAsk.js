
import React, { useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emailjs from 'emailjs-com';
import { Button } from 'react-bootstrap'

function WriteAsk() {

  const submitForm = document.querySelector("#subscribe");

  //email 보내기
  const onSubmit = useCallback((e) => {

    alert("소중한 의견 감사합니다.😍")
    
}, []);

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
              }}
            />
          </div>
          <form onSubmit={onSubmit}>
            <Button style= {{margin:"3%"}} type="submit">
                발송
            </Button>
        </form>
        </div>
    )
}

export { WriteAsk }