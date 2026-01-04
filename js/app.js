const SUPABASE_URL = "https://eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bW9kcmZybGVzenh4cXJpaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0OTk1MzYsImV4cCI6MjA4MzA3NTUzNn0.8Ur6BOWS-3w-J-d-mGKTE85PbiZKMyk40JqOAQ6PIcQ.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bW9kcmZybGVzenh4cXJpaGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzQ5OTUzNiwiZXhwIjoyMDgzMDc1NTM2fQ.C3hoJ3l0q3nKSmGPPizoovw8CbQdKaJ-EzxpEdNY8Hk";

fetch(`${https://eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bW9kcmZybGVzenh4cXJpaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0OTk1MzYsImV4cCI6MjA4MzA3NTUzNn0.8Ur6BOWS-3w-J-d-mGKTE85PbiZKMyk40JqOAQ6PIcQ.supabase.co}/rest/v1/products`, {
  headers: {
    apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bW9kcmZybGVzenh4cXJpaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0OTk1MzYsImV4cCI6MjA4MzA3NTUzNn0.8Ur6BOWS-3w-J-d-mGKTE85PbiZKMyk40JqOAQ6PIcQ,
    Authorization: `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bW9kcmZybGVzenh4cXJpaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0OTk1MzYsImV4cCI6MjA4MzA3NTUzNn0.8Ur6BOWS-3w-J-d-mGKTE85PbiZKMyk40JqOAQ6PIcQ}`
  }
})
.then(res => res.json())
.then(data => {
  document.getElementById("products").innerHTML =
    data.map(p => `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <button onclick="buy('${p.id}')">ซื้อ ${p.price} บาท</button>
      </div>
    `).join("");
});

function buy(productId) {
  fetch("/api/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId })
  })
  .then(res => res.json())
  .then(data => {
    window.location = data.url;
  });
      }
