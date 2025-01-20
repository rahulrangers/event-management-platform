import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { EventDashboard } from "./Components/Eventdashboard";
import Layout from "./Components/Layout";
import { ContextProvider } from "./context/UserProvider";
import Login from "./Components/Login";
import NotFound from "./Components/Notfound";
import CreateEvent from "./Components/AddEvent";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";

export const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
        <Route path="/" element={<Signup />} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/eventdashboard" element={<EventDashboard />} />
                  <Route path="/notfound" element={<NotFound />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/addevent" element={<CreateEvent />} />
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default App;
