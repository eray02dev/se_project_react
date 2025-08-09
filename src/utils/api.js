const baseUrl = "http://localhost:3001";

const check = (res) => {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(check);
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(check);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("DELETE failed");
    return true;
  });
}

export { getItems, addItem, deleteItem };
