import './App.css';
// import { useState } from 'react'

import Landing from './pages/Landing';
// import useDebounce from './hooks/useDebounce';

function App() {
  // const [text, setText] = useState('')
  // const debounceText = useDebounce(text, 500)

  return (
    <>
      <Landing />
      {/* <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='type....' />
      <div>Default Text: {text}</div>
      <div>Debounce: {debounceText}</div> */}
    </>
  );
}

export default App;
