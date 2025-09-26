import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

// Modaller ve korumalı rota
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnit";

// current user context
import CurrentUserContext from "../../contexts/CurrentUserContext";

// ✅ constants importları: apiKey ve defaultClothingItems eklendi
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";

// API katmanı
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api";

// Auth istekleri
import {
  login as signin,
  register as signup,
  checkToken,
} from "../../utils/auth";

function App() {
  // ---- Weather ----
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  // ---- Items / modals ----
  // ✅ 1) defaultClothingItems ile seed edildi
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ---- Auth / user ----
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ---- Auth modals state ----
  // ✅ 2) Boolean state adları isXOpen şeklinde
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // ---- UI feedback ----
  const [busyLogin, setBusyLogin] = useState(false);
  const [errLogin, setErrLogin] = useState("");
  const [busyRegister, setBusyRegister] = useState(false);
  const [errRegister, setErrRegister] = useState("");
  const [busyEdit, setBusyEdit] = useState(false);

  const navigate = useNavigate();

  // Helpers
  // ✅ 3) token() -> getToken()
  const getToken = () => localStorage.getItem("jwt");

  const handleAddClick = () => setIsAddModalOpen(true);
  const closeActiveModal = () => setIsAddModalOpen(false);

  const handleCardClick = (card) => setSelectedCard(card);
  const handleCloseCardModal = () => setSelectedCard(null);

  const openConfirm = () => {
    if (!selectedCard) return;
    setPendingDeleteId(selectedCard.id ?? selectedCard._id);
    setSelectedCard(null);
    setIsConfirmOpen(true);
  };
  const closeConfirm = () => setIsConfirmOpen(false);

  // --- Edit modal handlers (loglu)
  const handleOpenEdit = () => {
    console.log("[App] set isEditProfileOpen = true");
    setIsEditProfileOpen(true);
  };
  const handleCloseEdit = () => {
    console.log("[App] set isEditProfileOpen = false");
    setIsEditProfileOpen(false);
  };

  // ---------- Effects: initial fetch ----------
  useEffect(() => {
    // weather
    // ✅ APIkey -> apiKey
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    // items (public)
    getItems()
      .then((data) => {
        const fixed = data.map((item) => ({ ...item, link: item.imageUrl }));
        setClothingItems(fixed);
      })
      .catch(console.error);

    // token check → user
    const t = getToken();
    if (t) {
      checkToken(t)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  // ---------- Items: add/delete/like ----------
  const handleAddItem = (newItem) => {
    setIsSaving(true);
    const payload = {
      name: newItem.name,
      imageUrl: newItem.link,
      weather: newItem.weather,
    };

    addItem(payload, getToken())
      .then((saved) => {
        const clientShape = { ...saved, link: saved.imageUrl };
        setClothingItems((prev) => [clientShape, ...prev]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsSaving(false));
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);

    deleteItem(pendingDeleteId, getToken())
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((it) => (it.id ?? it._id) !== pendingDeleteId)
        );
        setPendingDeleteId(null);
        closeConfirm();
      })
      .catch(console.error)
      .finally(() => setIsDeleting(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const t = getToken();
    if (!t) return;

    const req = isLiked ? removeCardLike(id, t) : addCardLike(id, t);

    req
      .then((updated) => {
        setClothingItems((cards) =>
          cards.map((c) =>
            c._id === id ? { ...updated, link: updated.imageUrl } : c
          )
        );
      })
      .catch(console.error);
  };

  // ---------- Auth: login/register/logout ----------
  const handleLogin = ({ email, password }) => {
    setBusyLogin(true);
    setErrLogin("");
    signin({ email, password })
      .then(({ token: tk }) => {
        localStorage.setItem("jwt", tk);
        return checkToken(tk);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsLoginOpen(false); // ✅
      })
      .catch(() => setErrLogin("1"))
      .finally(() => setBusyLogin(false));
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    setBusyRegister(true);
    setErrRegister("");
    signup({ email, password, name, avatar })
      .then(() => signin({ email, password }))
      .then(({ token: tk }) => {
        localStorage.setItem("jwt", tk);
        return checkToken(tk);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsRegisterOpen(false); // ✅
      })
      .catch(() => setErrRegister("1"))
      .finally(() => setBusyRegister(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  // ---------- Profile edit ----------
  const handleUpdateProfile = ({ name, avatar }) => {
    setBusyEdit(true);
    updateUser({ name, avatar }, getToken())
      .then((usr) => {
        setCurrentUser(usr);
        setIsEditProfileOpen(false); // ✅
      })
      .catch(console.error)
      .finally(() => setBusyEdit(false));
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitProvider>
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginOpen(true)} // ✅
            onOpenRegister={() => setIsRegisterOpen(true)} // ✅
            onGoProfile={() => navigate("/profile")}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                    onEditProfile={handleOpenEdit}
                    onLogout={handleLogout}
                    currentUser={currentUser}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          {/* Add Item */}
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={closeActiveModal}
            onAddItem={handleAddItem}
            isSaving={isSaving}
          />
          {/* Preview modal */}
          {selectedCard && (
            <ItemModal
              card={selectedCard}
              onClose={handleCloseCardModal}
              activeModal="preview"
              onRequestDelete={openConfirm}
              isDeleting={isDeleting}
              currentUser={currentUser}
            />
          )}
          {/* Delete confirm */}
          <ConfirmDeleteModal
            isOpen={isConfirmOpen}
            onClose={closeConfirm}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
          />
          {/* Auth modals */}
          <LoginModal
            isOpen={isLoginOpen} // ✅
            onClose={() => setIsLoginOpen(false)} // ✅
            onSubmit={handleLogin}
            busy={busyLogin}
            error={!!errLogin}
          />
          <RegisterModal
            isOpen={isRegisterOpen} // ✅
            onClose={() => setIsRegisterOpen(false)} // ✅
            onSubmit={handleRegister}
            busy={busyRegister}
            error={!!errRegister}
          />
          {/* Edit profile */}
          <EditProfileModal
            isOpen={isEditProfileOpen} // ✅
            onClose={handleCloseEdit}
            onSubmit={handleUpdateProfile}
            initial={{
              name: currentUser?.name || "",
              avatar: currentUser?.avatar || "",
            }}
            busy={busyEdit}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitProvider>
    </div>
  );
}

export default App;
