import React from 'react';

import './_style.scss';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function index() {
   return (
      <>
         <Header></Header>
         <div>About</div>
         <div className="sdad">Chứa thêm contact</div>
         <Footer></Footer>
      </>
   );
}
export default index;
