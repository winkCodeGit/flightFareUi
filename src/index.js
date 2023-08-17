import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import { RecoilRoot } from "recoil";
import PageRout from './pages';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      
 
      <PageRout />
     
    </RecoilRoot>
  </React.StrictMode> 
  
);
reportWebVitals();