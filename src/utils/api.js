// src/utils/api.js
export const baseUrl = "http://localhost:3001";

// Tek yerden kullanılacak ortak response checker
export function check(res) {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

/* ---------- Item & User API ---------- */

// Public: tüm item'lar
export function getItems() {
  return fetch(`${baseUrl}/items`).then(check);
}

// Protected: item ekle
export function addItem(item, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(check);
}

// Protected: item sil
export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(check);
}

// Protected: like ekle
export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  }).then(check);
}

// Protected: like kaldır
export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(check);
}

// Protected: profil güncelle
export function updateUser({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(check);
}
