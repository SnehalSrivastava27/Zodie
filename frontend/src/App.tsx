import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HeroSection } from './components/blocks/hero-section-2'
import { LandingPage } from './Page/LandingPage'
import { PrimeHrPage } from './Page/PrimeHrAgent'
import { OptimusPage } from './Page/OptimusAgent'
import { NovaPage } from './Page/NovaAgent'
import { MaxiPage } from './Page/MaxiAgent'
import { ArchiePage } from './Page/ArchieAgent'
import { OnixPage } from './Page/OnixAgent'
import {Login,Signup} from './Page/Login'
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/prime' element={<PrimeHrPage/>}/>
        <Route path='/optimus' element={<OptimusPage/>}/>
        <Route path='/nova' element={<NovaPage/>}></Route>
        <Route path='/maxi' element={<MaxiPage/>}></Route>
        <Route path='/archie' element={<ArchiePage/>}/>
        <Route path='/onix' element={<OnixPage/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App