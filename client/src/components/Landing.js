import React from 'react';
import { Link, useNavigate} from 'react-router-dom'

import styles from '../styles/Username.module.css';


export default function Landing() {
    const navigate = useNavigate();
  return (
    
        
<div className={styles.landingPage}>
      <div className='flex justify-center items-center h-screen'>
        
        <div className={styles.glassLanding}>
            

          <div className="title flex flex-col items-center">
          <span className='pb-2 text-xl w-2/3 text-center text-gray-500'>
              Welcome to
            </span>
            <h4 className='text-5xl font-bold'>Cric-frick!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Predict winners and get points.
            </span>
          </div>

              

              <div className="textbox flex flex-col items-center gap-6">
              
                  <button className={styles.btn} type='submit' onClick={()=>navigate('/')}><Link className='' to="/">Let's Go</Link></button>
                  
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>
        </div>
      </div>
      </div>
  )
}
