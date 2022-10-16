
import React, { useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emailjs from 'emailjs-com';
import { Button } from 'react-bootstrap'

function WriteAsk() {

  const submitForm = document.querySelector("#subscribe");

  //email 보내기
  const onSubmit = useCallback((e) => {
    e.preventDefault();

    emailjs.init("QWLdVWHIWIdwz4wqd");

    //email-js 템플릿 파라미터
    var params = { 
      to_email: "lcu1027@naver.com",
      to_user_name: "임채윤",
      from_user_name: "헤이카카오",
      survey_link: "http://localhost:3000/survey",
    }
    emailjs.send(
      'service_qdtvd3j', 
        'template_1ruh25n', 
        params
        
    ).then((result) => {
        console.log('result.text', result.text);

    }, (error) => {
        console.log(error.text);
    });
    
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