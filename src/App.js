import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthContextProvider } from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup"; 
import Row from './Row';
import requests from './requests';
import Main from "./Main";
import "./App.css";

function App() {

  return(
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/netflix" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <div className="empty"></div>
          <Row rowID='1' title="인기 콘텐츠" fetchUrl={requests.fetchPopular} isLargeRow/>
          <Row rowID='2' title="지금 뜨는 콘텐츠" fetchUrl={requests.fetchTrending} />
          <Row rowID='3' title="공개 예정" fetchUrl={requests.fetchUpcoming} />
          <Row rowID='4' title="호평받은 영화" fetchUrl={requests.fetchTopRated} />
          <div className="empty"></div>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App;