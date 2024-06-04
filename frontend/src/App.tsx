import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'

function App() { 

  return <BrowserRouter>
    <Routes>
       <Route path='/signup' element={<SignUp></SignUp>}/>
       <Route path='/signin' element={<SignIn></SignIn>}/>
       <Route path='/blog/:id' element={<Blog></Blog>}/>
       <Route path='/blogs' element={<Blogs></Blogs>}></Route>
       <Route path='/publish' element={<Publish></Publish>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App
