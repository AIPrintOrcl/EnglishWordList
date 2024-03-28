import './App.css';
import Day from './component/Day';
import DayList from './component/DayList';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';
import DeleteDay from './component/DeleteDay';
import EmptyPage from './component/EmptyPage';
import Header from './component/Header';
import { BrowserRouter, Route, Routes} from 'react-router-dom' //Router : 집 주소

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes> {/* Routes 내부는 url에 따라 각각 다른 페이지로 보여줌. Routes 외부는 모든 페이지 공통으로 보여줌 */}
          <Route path="/" element={<DayList />}> </Route>{/* 날짜 버튼 
                                                            Route 본 주소(naver.com)에서 부가 주소(/Day) */}
          <Route path="/day/:day" element={<Day />}> </Route> {/* 날짜별 단어 호출 
                                                                /:day == "day": url에 포함된 값 */}
          <Route path="/create_word" element={<CreateWord />}> </Route> {/* 단어 등록 호출 */}
          <Route path="/create_day" element={<CreateDay />}> </Route> {/* 날짜 추가 호출 */}
          <Route path="/delete_day" element={<DeleteDay />}> </Route> {/* 날짜 삭제 호출 */}
          <Route path="/*"  element={<EmptyPage />}> </Route> {/* 잘못된 주소일 경우 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
