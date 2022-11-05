import React from 'react';
import { Footer } from '../components/Footer';
import notfound from '../notfound.png';
import notfoundment from '../notfoundment.png';

function NotFound() {

    return (
        <>
            <div className="wraper">
                <div className="content">
                <img style={{ width: "50%"}} src={notfound} />
                <br/>
                <img style={{ width: "70%"}} src={notfoundment} />
                        
                </div>
                <Footer />
            </div>
        </>
    )
}

export { NotFound }