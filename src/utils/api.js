export const baseUrl = "http://localhost:3001";

export const check = (res) => {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

// herkes için açık
export function getItems() {
  return fetch(`${baseUrl}/items`).then(check);
}

// yeni kart ekle (protected)
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

// kart sil (protected)
export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(check);
}

// karta like ekle (protected)
export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  }).then(check);
}

// karttan like kaldır (protected)
export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(check);
}

// ✅ profil güncelle (protected) — Sprint 14
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
