import React from "react";
import styles from "./App.css";
import { Routes, Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoginPage from "./pages/LoginPage";
import AuthCallback from "./components/AuthCallback";
import ProfilePage from "./pages/ProfilePage";
import BookDetailPage from "./pages/BookDetailPage";
import GoogleBookDetails from "./pages/GoogleBookDetails";
import BookDetails from "./components/BookDetails";
import TradeProposalPage from "./pages/TradeProposalPage";
import TradePage from "./pages/TradePage";
import BookClubPage from "./pages/BookClubPage";
import BookClubDetailPage from "./pages/BookClubDetailPage";
import CreateBookClub from "./pages/CreateBookClub";
import ExplorePage from "./pages/ExplorePage";
import EventPage from "./pages/EventPage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEvent from "./pages/CreateEventPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/404Page";

const ProtectedProfilePage = withAuthenticationRequired(ProfilePage, {
  onRedirecting: () => <div>Loading...</div>,
});

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/profile" element={<ProtectedProfilePage />} />
        <Route path="/book/:bookId" element={<BookDetailPage />} />
        <Route path="/google/:bookId" element={<GoogleBookDetails />} />
        <Route path="/books" element={<BookDetails />} />
        <Route path="/trade-form/:bookId" element={<TradeProposalPage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="/book-clubs" element={<BookClubPage />} />
        <Route path="/clubs/:clubId" element={<BookClubDetailPage />} />
        <Route path="/clubs/create" element={<CreateBookClub />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/404-error" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
