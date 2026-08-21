// src/components/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  
  return (
    <div dangerouslySetInnerHTML={{ 
      __html: `
        <iframe 
          src="/index1.html" 
          style="border:none; width:100%; height:100vh;"
          title="FunLearn Homepage"
        ></iframe>
      `
    }} />
  );
}