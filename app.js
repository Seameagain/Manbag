// ===============================
// Supabase Config
// ===============================
const SUPABASE_URL = "https://azmodrfrleszxxqrihfu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6bW9kcmZybGVzenh4cXJpaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0OTk1MzYsImV4cCI6MjA4MzA3NTUzNn0.8Ur6BOWS-3w-J-d-mGKTE85PbiZKMyk40JqOAQ6PIcQ";

const supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// โหลด user + แสดงชื่อ
// ===============================
async function loadUser() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    document.getElementById("welcome").innerText =
      "กรุณาเข้าสู่ระบบก่อน";
    return null;
  }

  // ดึงชื่อจริงจาก metadata
  const fullName =
    data.user.user_metadata?.full_name ||
    data.user.email;

  document.getElementById("welcome").innerText =
    `สวัสดีคุณ ${fullName} ซื้อไรดี`;

  return data.user;
}

// ===============================
// โหลดสินค้า
// ===============================
async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("products").innerHTML =
    data.map(p => `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <strong>${p.price} บาท</strong>
        <button onclick="buy('${p.id}')">
          ซื้อสินค้า
        </button>
      </div>
    `).join("");
}

// ===============================
// ซื้อสินค้า (Stripe)
// ===============================
function buy(productId) {
  fetch("/api/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ productId })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.url) {
      alert("ไม่สามารถชำระเงินได้");
      return;
    }
    window.location.href = data.url;
  });
}

// ===============================
// Start
// ===============================
(async () => {
  const user = await loadUser();
  if (user) {
    loadProducts();
  }
})();
