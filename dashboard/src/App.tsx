import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Energy from './pages/Energy';
import Transport from './pages/Transport';
import Waste from './pages/Waste';
import Buildings from './pages/Buildings';
import Scenarios from './pages/Scenarios';
import Settings from './pages/Settings';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="energy" element={<Energy />} />
                    <Route path="transport" element={<Transport />} />
                    <Route path="waste" element={<Waste />} />
                    <Route path="buildings" element={<Buildings />} />
                    <Route path="scenarios" element={<Scenarios />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
