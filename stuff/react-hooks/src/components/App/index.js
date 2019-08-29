import React from 'react'
import UseState from '../UseState'
import UseEffect from '../UseEffect'
import UseContext from '../UseContext'
import UseReducer from '../UseReducer';

function App() {
  return (
    <main className="container">
      <header className="main-title">
      ⚛️ REACT HOOKS DEMO ⚛️
      </header>
      <div class="columns" >
        <section class="column">
          <UseState />
          <UseReducer />
        </section>
        <section class="column">
          <UseEffect />
        </section>
        <section class="column">
          <UseContext />
        </section>
      </div>
    </main>
  );
}

export default App;
