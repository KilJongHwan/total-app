import "./App.css";
import GlobalStyle from "./style/GlobalStyle";
import Login from "./pages/signup/Login";
import Home from "./pages/Home";
import Signup from "./pages/signup/Signup";
import News from "./pages/News";
import Members from "./pages/member/Members";
import MemberInfo from "./pages/member/MemberInfo";
import ThemeSetting from "./pages/setting/ThemeSetting";
import Profile from "./pages/member/Profile";
import Layout from "./pages/Layout";
import BoardList from "./pages/board/BoardList";
import BoardWriteForm from "./pages/board/BoardWriteForm";
import Category from "./pages/board/Category";
import Movies from "./pages/Movies";
import MyCalendar from "./pages/etc/Calendar";
import BoardDetail from "./pages/board/BoardDetail";
import FruitRadioBtn from "./pages/etc/RadiBtn";
import ParentComponent from "./pages/etc/PositionMove";
import Wheather from "./pages/etc/Wheather";
import Setting from "./pages/setting/Setting";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserStore from "./context/UserStore";
import ChatList from "./pages/chatting/ChatList";
import ChatRoomCreate from "./pages/chatting/ChatRoomCreate";
import Chatting from "./pages/chatting/Chatting";

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route element={<Layout />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/News" element={<News />} />
              <Route path="/Members" element={<Members />} />
              <Route path="/Profile/:username" element={<Profile />} />
              <Route path="/MemberInfo/:email" element={<MemberInfo />} />x
              <Route path="/ThemeSetting" element={<ThemeSetting />} />
              <Route path="/Boards" element={<BoardList />} />
              <Route path="/BoardDetail/:id" element={<BoardDetail />} />
              <Route path="/boardWrite" element={<BoardWriteForm />} />
              <Route path="/Category" element={<Category />} />
              <Route path="/Movies" element={<Movies />} />
              <Route path="/Calendar" element={<MyCalendar />} />
              <Route path="/FruitRadioBtn" element={<FruitRadioBtn />} />
              <Route path="/PositionMove" element={<ParentComponent />} />
              <Route path="/Wheather" element={<Wheather />} />
              <Route path="/Setting" element={<Setting />} />
              <Route path="/Chat" element={<ChatList />} />
              <Route path="/Chat-create" element={<ChatRoomCreate />} />
              <Route path="/Chatting/:roomId" element={<Chatting />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
