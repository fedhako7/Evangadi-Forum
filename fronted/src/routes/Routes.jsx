import { Route, Routes } from 'react-router-dom';
import Register from '../pages/register/Register';
import Login from '../pages/signIn/Login';
import Home from '../pages/home/Home';
import QuestionDetail from '../pages/questionsDetail/QuestionDetail';
import AskQuestion from '../pages/askQuestions/AskQuestion';
import Header from '../pages/header/Header';
import NotFound from '../pages/notFound/NotFound';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import HowItWorks from '../pages/howItWorks/HowItWorks';

function RouterComponent() {
  return (
    <section>
      <Header />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/questionDetail/:questionId" element={
          <ProtectedRoute>
            <QuestionDetail />
          </ProtectedRoute>
        } />

        <Route path="/askquestion" element={
          <ProtectedRoute>
            <AskQuestion />
          </ProtectedRoute>
        } />

        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default RouterComponent;
