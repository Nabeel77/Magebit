
import Layout from './components/layout';
import {Helmet} from "react-helmet";
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/home';
import DisplyEmailsData from './components/pages/displayData';

function App() {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
        <title>Magebit</title>
      </Helmet>
      <Layout>
          <Routes>
            <Route path='/' exact  element={<Home/>} />
            <Route path='/about'element={<Home/>} />
            <Route path='/how-it-works' element={<Home/>} />
            <Route path='/contact' element={<Home/>} />
            <Route path='/display-data' element={<DisplyEmailsData/>} />
          </Routes>
      </Layout>
    </>
  );
}

export default App;
