import { FormEvent, useMemo, useRef, useState } from "react";

type Portal = "home" | "auth" | "customer" | "artisan";
type AuthKind = "login" | "signup";
type Role = "customer" | "artisan";

const IMG = {
  hero: "https://images.unsplash.com/photo-1712210332599-0cb76e647e43?auto=format&fit=crop&w=1800&q=88",
  potter:
    "https://images.unsplash.com/photo-1633112046092-a161d99563d1?auto=format&fit=crop&w=900&q=85",
  pottery:
    "https://images.unsplash.com/photo-1715845779797-ee1e42374925?auto=format&fit=crop&w=900&q=85",
  jewelry:
    "https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=900&q=85",
  market:
    "https://images.unsplash.com/photo-1768728584707-a33906ea1119?auto=format&fit=crop&w=900&q=85",
  brass:
    "https://images.unsplash.com/photo-1640882343528-623160edbbae?auto=format&fit=crop&w=900&q=85",
  lamps:
    "https://images.unsplash.com/photo-1663596682162-86d40fc740b2?auto=format&fit=crop&w=900&q=85",
  figurines:
    "https://images.unsplash.com/photo-1633412644980-ee03f82fb511?auto=format&fit=crop&w=900&q=85",
  wood: "https://images.unsplash.com/photo-1621165265045-043bd106c693?auto=format&fit=crop&w=900&q=85",
};

const products = [
  {
    id: 1,
    name: "Kalamkari Hand-painted Saree",
    price: 4250,
    artisan: "Lakshmi Devi",
    category: "Textiles",
    location: "Andhra Pradesh",
    image: IMG.market,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Blue Pottery Vase",
    price: 1450,
    artisan: "Mohan Kumhar",
    category: "Pottery",
    location: "Rajasthan",
    image: IMG.pottery,
    tag: "New",
  },
  {
    id: 3,
    name: "Dhokra Brass Diya Set",
    price: 2150,
    artisan: "Anita Sahu",
    category: "Metal Craft",
    location: "Chhattisgarh",
    image: IMG.brass,
    tag: "Festive",
  },
  {
    id: 4,
    name: "Madhubani Tree of Life",
    price: 3200,
    artisan: "Meera Jha",
    category: "Painting",
    location: "Bihar",
    image: IMG.figurines,
    tag: "One of a kind",
  },
  {
    id: 5,
    name: "Lac Statement Necklace",
    price: 1850,
    artisan: "Farida Bano",
    category: "Jewellery",
    location: "Rajasthan",
    image: IMG.jewelry,
    tag: "Trending",
  },
  {
    id: 6,
    name: "Carved Sheesham Keepsake Box",
    price: 2750,
    artisan: "Arif Khan",
    category: "Wood Craft",
    location: "Uttar Pradesh",
    image: IMG.wood,
    tag: "Hand carved",
  },
];

const artisans = [
  {
    name: "Lakshmi Devi",
    craft: "Kalamkari Artist",
    place: "Srikalahasti, Andhra Pradesh",
    exp: "18 years",
    image: IMG.market,
    match: "96%",
  },
  {
    name: "Mohan Kumhar",
    craft: "Blue Pottery Master",
    place: "Jaipur, Rajasthan",
    exp: "22 years",
    image: IMG.potter,
    match: "92%",
  },
  {
    name: "Meera Jha",
    craft: "Madhubani Painter",
    place: "Madhubani, Bihar",
    exp: "14 years",
    image: IMG.figurines,
    match: "89%",
  },
];

const customerNav = [
  "Dashboard",
  "Explore Products",
  "AI Recommendations",
  "ReCraft AI",
  "Find Artisans",
  "Customization Requests",
  "My Cart",
  "My Orders",
  "Messages",
  "My Profile",
];
const artisanNav = [
  "Dashboard",
  "My Products",
  "Add New Product",
  "Voice Product Entry",
  "Product Catalog",
  "Incoming Orders",
  "Pre-Orders",
  "Messages",
  "Customer Feedback",
  "Availability Management",
  "My Profile",
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`} aria-label="KarigarConnect">
      <span className="logo-mark">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        <b>Karigar</b>Connect<small>CRAFTED WITH PURPOSE</small>
      </span>
    </div>
  );
}

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    search: "M21 21l-4.3-4.3m2.3-5.2A7.5 7.5 0 113.9 11.5a7.5 7.5 0 0115.1 0z",
    arrow: "M5 12h14m-5-5 5 5-5 5",
    cart: "M3 4h2l2.2 9.2a2 2 0 002 1.5h7.7a2 2 0 001.9-1.4L21 7H6m4 11h.01M17 18h.01",
    user: "M20 21a8 8 0 00-16 0m8-9a4 4 0 100-8 4 4 0 000 8z",
    home: "M3 11l9-8 9 8v10h-6v-7H9v7H3V11z",
    menu: "M4 7h16M4 12h16M4 17h16",
    close: "M6 6l12 12M18 6L6 18",
    upload: "M12 16V4m-5 5 5-5 5 5M4 18v2h16v-2",
    mic: "M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zm-7 9a7 7 0 0014 0m-7 7v3",
    bell: "M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    spark: "M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z",
    back: "M19 12H5m5-5-5 5 5 5",
    plus: "M12 5v14M5 12h14",
    heart:
      "M20.8 5.8a5.5 5.5 0 00-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 00-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 000-7.8z",
    message: "M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4v8z",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.spark} />
    </svg>
  );
}

function Home({ choose }: { choose: (kind: AuthKind) => void }) {
  return (
    <div className="home-page">
      <header className="home-nav">
        <Logo />
        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={() => choose("login")}>
            Log in
          </button>
          <button className="btn btn-primary" onClick={() => choose("signup")}>
            Sign up <Icon name="arrow" />
          </button>
        </div>
      </header>
      <main>
        <section className="hero" style={{ backgroundImage: `url(${IMG.hero})` }}>
          <div className="hero-overlay" />
          <div className="hero-pattern" />
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> India’s living craft heritage
            </p>
            <h1>
              Discover the Beauty of <em>Indian Handicrafts</em>
            </h1>
            <p>
              Explore unique handmade creations, celebrate traditional craftsmanship and support
              talented Indian artisans.
            </p>
            <div className="hero-proof">
              <div className="avatar-stack">
                <img src={IMG.potter} />
                <img src={IMG.market} />
                <img src={IMG.figurines} />
              </div>
              <span>
                <b>2,400+ verified artisans</b>
                <br />
                from craft communities across India
              </span>
            </div>
          </div>
          <div className="scroll-cue">
            SCROLL TO DISCOVER <span>↓</span>
          </div>
        </section>
        <section className="home-story">
          <div>
            <p className="eyebrow dark">
              <span /> Made by hand. Kept alive by you.
            </p>
            <h2>
              Every craft carries
              <br />
              <em>a story.</em>
            </h2>
          </div>
          <p>
            KarigarConnect brings the soul of India's artisan communities closer to you—through
            thoughtful technology, fair opportunity, and a shared love for things made slowly.
          </p>
          <div className="story-stat">
            <b>28</b>
            <span>
              Indian states
              <br />
              represented
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

function RolePicker({
  kind,
  close,
  select,
}: {
  kind: AuthKind;
  close: () => void;
  select: (role: Role) => void;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="role-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="icon-btn modal-close" onClick={close}>
          <Icon name="close" />
        </button>
        <div className="ornament">✦</div>
        <p className="eyebrow dark center">Welcome to KarigarConnect</p>
        <h2>How would you like to {kind === "login" ? "continue" : "join"}?</h2>
        <p className="muted">Choose your path. You can always return to the main homepage.</p>
        <div className="role-grid">
          <button onClick={() => select("customer")}>
            <span className="role-icon">
              <Icon name="cart" size={25} />
            </span>
            <b>I'm a Customer</b>
            <small>Discover crafts, connect with makers and shop with purpose.</small>
            <i>
              Continue as customer <Icon name="arrow" size={16} />
            </i>
          </button>
          <button onClick={() => select("artisan")}>
            <span className="role-icon artisan-icon">
              <Icon name="spark" size={25} />
            </span>
            <b>I'm an Artisan</b>
            <small>Showcase your craft, manage orders and grow your reach.</small>
            <i>
              Continue as artisan <Icon name="arrow" size={16} />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}

function AuthPage({
  role,
  kind,
  back,
  success,
  switchKind,
}: {
  role: Role;
  kind: AuthKind;
  back: () => void;
  success: () => void;
  switchKind: () => void;
}) {
  const [errors, setErrors] = useState(false);
  const isArtisan = role === "artisan";
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const required = [
      ...e.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[required]"),
    ];
    const invalid = required.some((el) => !String(fd.get(el.name) || "").trim());
    if (invalid) return setErrors(true);
    success();
  }
  return (
    <div className={`auth-page ${isArtisan ? "auth-artisan" : ""}`}>
      <aside
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(45,20,12,.15),rgba(45,20,12,.82)),url(${isArtisan ? IMG.potter : IMG.market})`,
        }}
      >
        <button className="auth-back" onClick={back}>
          <Icon name="back" /> Back to home
        </button>
        <Logo light />
        <div>
          <p className="eyebrow">
            <span /> {isArtisan ? "The maker’s studio" : "Crafted for the curious"}
          </p>
          <h2>
            {isArtisan
              ? "Your craft deserves a wider world."
              : "Find pieces with a story worth keeping."}
          </h2>
          <p>
            {isArtisan
              ? "Build your digital catalogue, reach new customers and manage your craft business with confidence."
              : "Meet master makers, discover regional traditions and bring home something truly meaningful."}
          </p>
        </div>
      </aside>
      <main className="auth-form-wrap">
        <button className="mobile-back" onClick={back}>
          <Icon name="back" /> Home
        </button>
        <div className="auth-form">
          <p className="eyebrow dark">
            <span /> {isArtisan ? "Artisan portal" : "Customer portal"}
          </p>
          <h1>
            {kind === "login"
              ? `Welcome back${isArtisan ? ", Karigar" : ""}`
              : `Create your ${isArtisan ? "artisan" : "customer"} account`}
          </h1>
          <p className="muted">
            {kind === "login"
              ? "Enter any demo credentials to explore the prototype."
              : "Join a community that values craft, culture and connection."}
          </p>
          <form onSubmit={submit}>
            {kind === "signup" && (
              <>
                <Field
                  label="Full name"
                  name="name"
                  placeholder={isArtisan ? "e.g. Kavita Sharma" : "e.g. Aditi Rao"}
                />
                <div className="form-row">
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <Field label="Phone number" name="phone" placeholder="+91 98765 43210" />
                </div>
              </>
            )}
            {kind === "login" && (
              <Field
                label="Email or phone number"
                name="identity"
                placeholder="Enter email or phone"
              />
            )}
            <div className={kind === "signup" ? "form-row" : ""}>
              <Field
                label="Password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
              />
              {kind === "signup" && (
                <Field
                  label="Confirm password"
                  name="confirm"
                  type="password"
                  placeholder="Re-enter password"
                />
              )}
            </div>
            {kind === "signup" && (
              <>
                <div className="form-row">
                  <Field label="Location" name="location" placeholder="City, district" />
                  <Select
                    label={isArtisan ? "State" : "Preferred language"}
                    name="regional"
                    options={
                      isArtisan
                        ? [
                            "Rajasthan",
                            "Andhra Pradesh",
                            "Telangana",
                            "Gujarat",
                            "Bihar",
                            "Tamil Nadu",
                            "Karnataka",
                            "Uttar Pradesh",
                          ]
                        : ["English", "हिन्दी", "తెలుగు", "தமிழ்", "ગુજરાતી"]
                    }
                  />
                </div>
                {isArtisan && (
                  <>
                    <div className="form-row">
                      <Select
                        label="Craft specialization"
                        name="craft"
                        options={[
                          "Pottery",
                          "Textiles & Weaving",
                          "Painting",
                          "Wood Craft",
                          "Metal Craft",
                          "Jewellery",
                        ]}
                      />
                      <Field
                        label="Years of experience"
                        name="experience"
                        type="number"
                        placeholder="e.g. 8"
                      />
                    </div>
                    <label>
                      Short introduction
                      <textarea
                        name="intro"
                        required
                        placeholder="Tell customers about your craft journey…"
                      />
                    </label>
                  </>
                )}
              </>
            )}
            {kind === "login" && (
              <button type="button" className="forgot">
                Forgot password?
              </button>
            )}
            {errors && (
              <p className="form-error">Please complete all required fields to continue.</p>
            )}
            <button className="btn btn-primary submit-btn">
              {kind === "login" ? "Log in to portal" : "Create account"} <Icon name="arrow" />
            </button>
          </form>
          <p className="auth-switch">
            {kind === "login" ? "New to KarigarConnect?" : "Already have an account?"}{" "}
            <button onClick={switchKind}>
              {kind === "login" ? "Create an account" : "Log in"}
            </button>
          </p>
          <div className="demo-note">
            <Icon name="spark" />
            <span>
              <b>Demo prototype</b> — no real authentication or personal data is stored.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label>
      {label}
      <input name={name} type={type} required placeholder={placeholder} />
    </label>
  );
}
function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label>
      {label}
      <select name={name} required defaultValue="">
        <option value="" disabled>
          Select
        </option>
        {options.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </label>
  );
}

function Shell({
  role,
  page,
  setPage,
  logout,
  children,
  cartCount = 0,
}: {
  role: Role;
  page: string;
  setPage: (x: string) => void;
  logout: () => void;
  children: React.ReactNode;
  cartCount?: number;
}) {
  const [mobile, setMobile] = useState(false);
  const nav = role === "customer" ? customerNav : artisanNav;
  return (
    <div className={`portal ${role}-portal`}>
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <div className="sidebar-brand">
          <Logo light />
          <button className="icon-btn mobile-close" onClick={() => setMobile(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="portal-label">
          {role === "customer" ? "CUSTOMER PORTAL" : "ARTISAN STUDIO"}
        </div>
        <nav>
          {nav.map((n, i) => (
            <button
              key={n}
              className={page === n ? "active" : ""}
              onClick={() => {
                setPage(n);
                setMobile(false);
              }}
            >
              <span className="nav-number">{String(i + 1).padStart(2, "0")}</span>
              {n}
              {n === "My Cart" && cartCount > 0 && <b className="count">{cartCount}</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <button onClick={logout}>
            <Icon name="home" /> Main homepage
          </button>
          <button onClick={logout}>
            <Icon name="back" /> Log out
          </button>
        </div>
      </aside>
      <div className="portal-main">
        <header className="portal-topbar">
          <button className="icon-btn menu-btn" onClick={() => setMobile(true)}>
            <Icon name="menu" />
          </button>
          <div>
            <span>{role === "customer" ? "Namaste, Aditi" : "Namaste, Lakshmi"}</span>
            <small>
              {role === "customer"
                ? "What will you discover today?"
                : "Your studio is open for business"}
            </small>
          </div>
          <div className="top-actions">
            <button className="icon-btn">
              <Icon name="bell" />
              <i />
            </button>
            {role === "customer" && (
              <button className="icon-btn" onClick={() => setPage("My Cart")}>
                <Icon name="cart" />
                {cartCount > 0 && <b>{cartCount}</b>}
              </button>
            )}
            <button className="profile-chip">
              <img src={role === "customer" ? IMG.jewelry : IMG.potter} />
              <span>
                {role === "customer" ? "Aditi Rao" : "Lakshmi Devi"}
                <small>{role === "customer" ? "Customer" : "Kalamkari Artist"}</small>
              </span>
            </button>
          </div>
        </header>
        <main className="portal-content">{children}</main>
      </div>
    </div>
  );
}

function PageHead({
  eyebrow,
  title,
  desc,
  action,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <p className="eyebrow dark">
          <span /> {eyebrow}
        </p>
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
      {action}
    </div>
  );
}

function ProductCard({
  product,
  open,
  add,
}: {
  product: (typeof products)[0];
  open: () => void;
  add: () => void;
}) {
  return (
    <article className="product-card">
      <button className="product-image" onClick={open}>
        <img src={product.image} alt={product.name} />
        <span>{product.tag}</span>
        <i>
          <Icon name="heart" />
        </i>
      </button>
      <div className="product-info">
        <small>
          {product.category} · {product.location}
        </small>
        <button className="product-name" onClick={open}>
          {product.name}
        </button>
        <p>
          by <b>{product.artisan}</b>
        </p>
        <div>
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <button onClick={add} aria-label={`Add ${product.name} to cart`}>
            <Icon name="plus" />
          </button>
        </div>
      </div>
    </article>
  );
}

function CustomerPortal({ logout }: { logout: () => void }) {
  const [page, setPage] = useState("Dashboard");
  const [cart, setCart] = useState<number[]>([]);
  const [selected, setSelected] = useState<(typeof products)[0] | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const add = (id: number) => setCart((c) => [...c, id]);
  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.artisan} ${p.location}`.toLowerCase().includes(search.toLowerCase()),
  );
  const content = selected ? (
    <ProductDetail product={selected} back={() => setSelected(null)} add={() => add(selected.id)} />
  ) : page === "Dashboard" ? (
    <CustomerDashboard go={setPage} open={setSelected} add={add} />
  ) : page === "Explore Products" ? (
    <Explore
      search={search}
      setSearch={setSearch}
      category={category}
      setCategory={setCategory}
      products={filtered}
      open={setSelected}
      add={add}
    />
  ) : page === "AI Recommendations" ? (
    <Recommendations open={setSelected} add={add} />
  ) : page === "ReCraft AI" ? (
    <ReCraft />
  ) : page === "Find Artisans" || page === "Customization Requests" ? (
    <ArtisanMatching customization={page === "Customization Requests"} />
  ) : page === "My Cart" ? (
    <Cart
      items={cart.map((id) => products.find((p) => p.id === id)!)}
      remove={(i) => setCart((c) => c.filter((_, x) => x !== i))}
      order={() => setPage("My Orders")}
    />
  ) : page === "My Orders" ? (
    <Orders />
  ) : page === "Messages" ? (
    <Messages artisan={false} />
  ) : (
    <Profile artisan={false} />
  );
  return (
    <Shell
      role="customer"
      page={page}
      setPage={(p) => {
        setSelected(null);
        setPage(p);
      }}
      logout={logout}
      cartCount={cart.length}
    >
      {content}
    </Shell>
  );
}

function CustomerDashboard({
  go,
  open,
  add,
}: {
  go: (x: string) => void;
  open: (p: (typeof products)[0]) => void;
  add: (n: number) => void;
}) {
  return (
    <>
      <section className="welcome-banner">
        <div>
          <p className="eyebrow">
            <span /> Curated for your taste
          </p>
          <h1>
            Craft that feels
            <br />
            <em>made for you.</em>
          </h1>
          <p>Discover meaningful pieces shaped by master hands and centuries of tradition.</p>
          <button onClick={() => go("Explore Products")}>
            Explore the collection <Icon name="arrow" />
          </button>
        </div>
        <img src={IMG.market} alt="Indian handicrafts" />
      </section>
      <div className="dashboard-search">
        <Icon name="search" />
        <input placeholder="Search by craft, product, artisan or place…" />
        <button onClick={() => go("AI Recommendations")}>
          <Icon name="spark" /> Ask Craft AI
        </button>
      </div>
      <SectionTitle
        title="Recommended for you"
        subtitle="Based on your love for textiles and handmade décor"
        action={() => go("AI Recommendations")}
      />
      <div className="product-grid four">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} open={() => open(p)} add={() => add(p.id)} />
        ))}
      </div>
      <SectionTitle
        title="Recently added & popular now"
        subtitle="Fresh from artisan studios, alongside community favourites"
        action={() => go("Explore Products")}
      />
      <div className="product-grid four">
        {[...products.slice(4), ...products.slice(0, 2)].map((p) => (
          <ProductCard
            key={`popular-${p.id}`}
            product={p}
            open={() => open(p)}
            add={() => add(p.id)}
          />
        ))}
      </div>
      <div className="feature-row">
        <button className="ai-promo" onClick={() => go("ReCraft AI")}>
          <span className="ai-icon">
            <Icon name="spark" size={28} />
          </span>
          <div>
            <small>RECRAFT AI</small>
            <h3>
              Old things.
              <br />
              New possibilities.
            </h3>
            <p>Upload a photo of unused material and discover what it could become.</p>
            <b>
              Try ReCraft AI <Icon name="arrow" />
            </b>
          </div>
        </button>
        <div className="festival-card">
          <div>
            <small>FESTIVAL EDIT</small>
            <h3>Celebrate a handmade Diwali</h3>
            <p>Thoughtful décor, diyas and gifts from artisan communities.</p>
            <button onClick={() => go("AI Recommendations")}>View collection</button>
          </div>
          <img src={IMG.lamps} />
        </div>
      </div>
      <SectionTitle
        title="Meet the makers"
        subtitle="The hands and stories behind every piece"
        action={() => go("Find Artisans")}
      />
      <div className="artisan-strip">
        {artisans.map((a) => (
          <div key={a.name}>
            <img src={a.image} />
            <span>
              <b>{a.name}</b>
              <small>
                {a.craft} · {a.place}
              </small>
            </span>
            <button onClick={() => go("Find Artisans")}>
              <Icon name="arrow" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action: () => void;
}) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button onClick={action}>
        View all <Icon name="arrow" />
      </button>
    </div>
  );
}

function Explore({ search, setSearch, category, setCategory, products: list, open, add }: any) {
  return (
    <>
      <PageHead
        eyebrow="The craft marketplace"
        title="Explore handmade treasures"
        desc="Every piece is made by a verified independent artisan."
      />
      <div className="filter-bar">
        <div className="search-field">
          <Icon name="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, artisans or locations"
          />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          {["Textiles", "Pottery", "Metal Craft", "Painting", "Jewellery", "Wood Craft"].map(
            (x) => (
              <option key={x}>{x}</option>
            ),
          )}
        </select>
        <select>
          <option>All locations</option>
          <option>Rajasthan</option>
          <option>Andhra Pradesh</option>
          <option>Bihar</option>
        </select>
        <select>
          <option>Any price</option>
          <option>Under ₹2,000</option>
          <option>₹2,000–₹5,000</option>
        </select>
      </div>
      <p className="result-count">
        <b>{list.length} unique pieces</b> found for you
      </p>
      <div className="product-grid three">
        {list.map((p: any) => (
          <ProductCard key={p.id} product={p} open={() => open(p)} add={() => add(p.id)} />
        ))}
      </div>
      {!list.length && (
        <div className="empty">No pieces match those filters. Try a different search.</div>
      )}
    </>
  );
}

function ProductDetail({
  product,
  back,
  add,
}: {
  product: (typeof products)[0];
  back: () => void;
  add: () => void;
}) {
  return (
    <div className="detail-page">
      <button className="text-back" onClick={back}>
        <Icon name="back" /> Back to products
      </button>
      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          <span>Authentic · Handmade</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow dark">
            <span /> {product.category} · {product.location}
          </p>
          <h1>{product.name}</h1>
          <p className="rating">
            ★★★★★ <span>4.9 · 38 artisan-verified reviews</span>
          </p>
          <h2>₹{product.price.toLocaleString("en-IN")}</h2>
          <p>
            Made slowly and thoughtfully using time-honoured techniques. Natural variations in
            colour and texture make every piece beautifully unique.
          </p>
          <dl>
            <div>
              <dt>Materials</dt>
              <dd>Natural dyes, locally sourced materials</dd>
            </div>
            <div>
              <dt>Crafted by</dt>
              <dd>{product.artisan}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd className="green">In stock · Dispatches in 3–5 days</dd>
            </div>
          </dl>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={add}>
              <Icon name="cart" /> Add to cart
            </button>
            <button className="btn btn-ghost">
              <Icon name="message" /> Ask artisan
            </button>
          </div>
          <div className="translation">
            <Icon name="spark" />
            <span>
              <b>Translated artisan story</b>
              <br />
              This product description is shown in your preferred language: English.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Recommendations({
  open,
  add,
}: {
  open: (p: (typeof products)[0]) => void;
  add: (n: number) => void;
}) {
  const [festival, setFestival] = useState("Diwali");
  return (
    <>
      <PageHead
        eyebrow="Karigar intelligence"
        title="Your craft discovery"
        desc="Sample recommendations shaped by your browsing, interests and the moments you celebrate."
        action={
          <span className="ai-badge">
            <Icon name="spark" /> Simulated AI insights
          </span>
        }
      />
      <div className="interest-card">
        <div>
          <span className="ai-icon">
            <Icon name="spark" />
          </span>
          <div>
            <h3>Your taste profile</h3>
            <p>Earthy palettes · Heritage textiles · Functional décor · Artisan stories</p>
          </div>
        </div>
        <button>Refine interests</button>
      </div>
      <SectionTitle
        title="Because you explored Kalamkari"
        subtitle="Traditional textile crafts with a contemporary spirit"
        action={() => {}}
      />
      <div className="product-grid three">
        {products.slice(0, 3).map((p) => (
          <ProductCard key={p.id} product={p} open={() => open(p)} add={() => add(p.id)} />
        ))}
      </div>
      <div className="festival-head">
        <div>
          <p className="eyebrow dark">
            <span /> Celebrations, made meaningful
          </p>
          <h2>Festival collections</h2>
        </div>
        <div className="festival-tabs">
          {["Diwali", "Sankranti", "Ugadi", "Holi", "Dussehra", "Navratri"].map((f) => (
            <button
              className={festival === f ? "active" : ""}
              onClick={() => setFestival(f)}
              key={f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="festival-hero">
        <img src={IMG.lamps} />
        <div>
          <small>{festival.toUpperCase()} COLLECTION</small>
          <h2>
            Light, colour and
            <br />
            craft traditions
          </h2>
          <p>A sample AI-curated edit of heirloom-worthy gifts and festive accents.</p>
          <button>
            Explore {festival} edit <Icon name="arrow" />
          </button>
        </div>
      </div>
    </>
  );
}

function ReCraft() {
  const [preview, setPreview] = useState<string | null>(null),
    [analyzed, setAnalyzed] = useState(false),
    input = useRef<HTMLInputElement>(null);
  function upload(file?: File) {
    if (file) setPreview(URL.createObjectURL(file));
  }
  return (
    <>
      <PageHead
        eyebrow="Creative reuse studio"
        title="Give old materials a new story"
        desc="Upload an image and explore sample AI-inspired ways to turn forgotten material into useful craft."
        action={
          <span className="ai-badge">
            <Icon name="spark" /> Prototype analysis
          </span>
        }
      />
      <div className="recraft-layout">
        <section className="upload-panel">
          <div className="step">01</div>
          <h3>Show us what you have</h3>
          <button
            className={`drop-zone ${preview ? "has-image" : ""}`}
            onClick={() => input.current?.click()}
          >
            {preview ? (
              <img src={preview} />
            ) : (
              <>
                <span>
                  <Icon name="upload" size={28} />
                </span>
                <b>Drop an image here</b>
                <small>or click to browse · JPG, PNG up to 10 MB</small>
              </>
            )}
            <input
              ref={input}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => upload(e.target.files?.[0])}
            />
          </button>
          <label>
            What is the primary material?
            <select defaultValue="Old fabric">
              <option>Old fabric</option>
              <option>Glass</option>
              <option>Wood</option>
              <option>Paper</option>
              <option>Metal</option>
            </select>
          </label>
          <button className="btn btn-primary analyze" onClick={() => setAnalyzed(true)}>
            <Icon name="spark" /> Analyze material
          </button>
        </section>
        <section className={`analysis-panel ${analyzed ? "ready" : ""}`}>
          {!analyzed ? (
            <div className="waiting">
              <span className="mandala">✦</span>
              <h3>Your ideas will appear here</h3>
              <p>Upload a clear image, choose a material and run the sample analysis.</p>
            </div>
          ) : (
            <>
              <div className="analysis-title">
                <span className="ai-icon">
                  <Icon name="spark" />
                </span>
                <div>
                  <small>SAMPLE ANALYSIS COMPLETE</small>
                  <h3>We found creative potential</h3>
                </div>
              </div>
              <div className="material-read">
                <b>Detected material</b>
                <span>Printed cotton fabric · Good reusable condition</span>
              </div>
              <h4>Suggested craft ideas</h4>
              <div className="ideas">
                {[
                  "Patchwork tote bag",
                  "Cushion covers",
                  "Decorative wall hanging",
                  "Fabric accessories",
                ].map((x, i) => (
                  <button key={x}>
                    <span>0{i + 1}</span>
                    {x}
                    <Icon name="arrow" />
                  </button>
                ))}
              </div>
              <div className="prototype-note">
                This is a simulated response for demonstration. No image or AI service is connected.
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

function ArtisanMatching({ customization }: { customization: boolean }) {
  const [matched, setMatched] = useState(!customization),
    [sent, setSent] = useState("");
  return (
    <>
      <PageHead
        eyebrow="Made to your vision"
        title={customization ? "Create a customization request" : "Find the right artisan"}
        desc="Describe what you need and discover sample artisan matches by craft, location and experience."
      />
      {customization && (
        <div className="request-form">
          <label>
            What would you like made?
            <textarea placeholder="e.g. A hand-painted Kalamkari wall panel in earthy red and indigo…" />
          </label>
          <div className="form-row three">
            <Select
              label="Craft type"
              name="craftmatch"
              options={["Textiles", "Painting", "Pottery", "Wood Craft", "Jewellery"]}
            />
            <Field label="Preferred budget" name="budget" placeholder="₹3,000 – ₹5,000" />
            <Select
              label="Preferred location"
              name="place"
              options={["Any location", "Andhra Pradesh", "Rajasthan", "Bihar"]}
            />
          </div>
          <label>
            Customization requirements
            <textarea placeholder="Size, colours, materials, date needed…" />
          </label>
          <button className="btn btn-primary" onClick={() => setMatched(true)}>
            <Icon name="spark" /> Find matching artisans
          </button>
        </div>
      )}
      {matched && (
        <>
          <div className="match-heading">
            <h2>{customization ? "Your best matches" : "Artisans you may love"}</h2>
            <span>Matched using sample craft and location data</span>
          </div>
          <div className="artisan-cards">
            {artisans.map((a) => (
              <article key={a.name}>
                <img src={a.image} />
                <div className="match-score">{a.match} match</div>
                <div>
                  <small>{a.craft}</small>
                  <h3>{a.name}</h3>
                  <p>{a.place}</p>
                  <dl>
                    <span>
                      <b>{a.exp}</b> Experience
                    </span>
                    <span>
                      <b>4.9</b> Rating
                    </span>
                  </dl>
                  <button onClick={() => setSent(a.name)}>
                    {sent === a.name ? "Request sent" : "Request customization"}{" "}
                    <Icon name="arrow" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function Cart({
  items,
  remove,
  order,
}: {
  items: typeof products;
  remove: (i: number) => void;
  order: () => void;
}) {
  const total = items.reduce((a, p) => a + p.price, 0);
  return (
    <>
      <PageHead
        eyebrow="Your selection"
        title="My cart"
        desc={`${items.length} handmade ${items.length === 1 ? "piece" : "pieces"} saved for checkout`}
      />
      {items.length ? (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((p, i) => (
              <div key={`${p.id}-${i}`}>
                <img src={p.image} />
                <div>
                  <small>{p.category}</small>
                  <h3>{p.name}</h3>
                  <p>by {p.artisan}</p>
                </div>
                <b>₹{p.price.toLocaleString("en-IN")}</b>
                <button onClick={() => remove(i)}>Remove</button>
              </div>
            ))}
          </div>
          <aside className="order-summary">
            <h3>Order summary</h3>
            <p>
              <span>Subtotal</span>
              <b>₹{total.toLocaleString("en-IN")}</b>
            </p>
            <p>
              <span>Artisan-safe delivery</span>
              <b>₹120</b>
            </p>
            <hr />
            <p className="total">
              <span>Total</span>
              <b>₹{(total + 120).toLocaleString("en-IN")}</b>
            </p>
            <button className="btn btn-primary" onClick={order}>
              Place demo order <Icon name="arrow" />
            </button>
            <small>No payment is processed in this prototype.</small>
          </aside>
        </div>
      ) : (
        <div className="empty">
          <span className="ai-icon">
            <Icon name="cart" />
          </span>
          <h2>Your cart is waiting for a story</h2>
          <p>Explore handmade pieces and add something meaningful.</p>
        </div>
      )}
    </>
  );
}

function Orders() {
  const [status, setStatus] = useState("In Progress");
  const [reviewed, setReviewed] = useState(false);
  return (
    <>
      <PageHead
        eyebrow="From workshop to doorstep"
        title="My orders"
        desc="Follow the journey of every handmade order."
      />
      <div className="order-tabs">
        <button className="active">Active orders</button>
        <button>Order history</button>
        <button>Pre-orders</button>
      </div>
      <article className="order-card">
        <div className="order-meta">
          <span>
            <small>ORDER</small>#KC-2025-1842
          </span>
          <span>
            <small>PLACED</small>18 Feb 2025
          </span>
          <span className="status">{status}</span>
        </div>
        <div className="order-product">
          <img src={products[0].image} />
          <div>
            <h3>{products[0].name}</h3>
            <p>by {products[0].artisan} · ₹4,250</p>
          </div>
          <button onClick={() => setStatus(status === "In Progress" ? "Shipped" : "Delivered")}>
            Advance demo status
          </button>
          {status !== "Delivered" && (
            <button onClick={() => setStatus("Cancelled")}>Cancel eligible order</button>
          )}
        </div>
        {status === "Cancelled" ? (
          <div className="prototype-note wide">
            This demo order has been cancelled and the artisan has been notified.
          </div>
        ) : (
          <div className="tracker">
            {["Pending", "Accepted", "In Progress", "Shipped", "Delivered"].map((x, i) => (
              <div
                className={
                  i <=
                  ["Pending", "Accepted", "In Progress", "Shipped", "Delivered"].indexOf(status)
                    ? "done"
                    : ""
                }
                key={x}
              >
                <i /> <span>{x}</span>
              </div>
            ))}
          </div>
        )}
        {status === "Delivered" && (
          <div className="review-submit">
            <span>★★★★★</span>
            <input placeholder="Share feedback with the artisan…" />
            <button onClick={() => setReviewed(true)}>
              {reviewed ? "Feedback submitted" : "Submit review"}
            </button>
          </div>
        )}
      </article>
    </>
  );
}

function Messages({ artisan }: { artisan: boolean }) {
  const [messages, setMessages] = useState([
      "Namaste! I wanted to confirm the colour for this piece.",
      artisan
        ? "Of course. Would you prefer natural indigo or a lighter blue?"
        : "Natural indigo would be lovely. Thank you!",
    ]),
    [text, setText] = useState("");
  return (
    <>
      <PageHead
        eyebrow="Craft conversations"
        title="Messages"
        desc="Connect directly, clarify details and keep every conversation in one place."
      />
      <div className="messages">
        <aside>
          {artisans.map((a, i) => (
            <button className={i === 0 ? "active" : ""} key={a.name}>
              <img src={a.image} />
              <span>
                <b>{artisan ? ["Aditi Rao", "Rohan Mehta", "Nisha Iyer"][i] : a.name}</b>
                <small>{i ? "Thank you for the update…" : "Active now"}</small>
              </span>
            </button>
          ))}
        </aside>
        <section>
          <header>
            <img src={artisan ? IMG.jewelry : artisans[0].image} />
            <div>
              <b>{artisan ? "Aditi Rao" : artisans[0].name}</b>
              <small>{artisan ? "Customer · Custom order" : artisans[0].craft}</small>
            </div>
          </header>
          <div className="chat">
            {messages.map((m, i) => (
              <p className={i % 2 ? "theirs" : "mine"} key={i}>
                {m}
                <small>10:{32 + i} AM</small>
              </p>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim()) {
                setMessages((x) => [...x, text]);
                setText("");
              }
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message…"
            />
            <button>
              <Icon name="arrow" />
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

function Profile({ artisan }: { artisan: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <PageHead
        eyebrow={artisan ? "Your public craft story" : "Your KarigarConnect account"}
        title="My profile"
        desc="Keep your details and preferences up to date."
        action={
          <button className="btn btn-primary" onClick={() => setSaved(true)}>
            {saved ? "Changes saved" : "Save changes"}
          </button>
        }
      />
      <div className="profile-layout">
        <aside>
          <img src={artisan ? IMG.potter : IMG.jewelry} />
          <button>Change photograph</button>
          <p>{artisan ? "Verified artisan profile" : "Customer since February 2025"}</p>
        </aside>
        <section>
          <h3>Personal information</h3>
          <div className="form-row">
            <Field
              label="Full name"
              name="profileName"
              placeholder={artisan ? "Lakshmi Devi" : "Aditi Rao"}
            />
            <Field label="Phone number" name="profilePhone" placeholder="+91 98765 43210" />
          </div>
          <div className="form-row">
            <Field
              label="Email address"
              name="profileMail"
              type="email"
              placeholder="aditi@example.com"
            />
            <Field
              label="Location"
              name="profilePlace"
              placeholder={artisan ? "Srikalahasti, Andhra Pradesh" : "Hyderabad, Telangana"}
            />
          </div>
          {artisan ? (
            <>
              <div className="form-row">
                <Field
                  label="Craft specialization"
                  name="profileCraft"
                  placeholder="Kalamkari textiles"
                />
                <Field label="Years of experience" name="profileExp" placeholder="18 years" />
              </div>
              <label>
                Artisan biography
                <textarea defaultValue="I learned the traditional Kalamkari technique from my mother and grandmother. Each piece in my studio is drawn and dyed by hand." />
              </label>
              <h3>Portfolio photographs</h3>
              <div className="portfolio">
                {products.slice(0, 3).map((p) => (
                  <img src={p.image} key={p.id} />
                ))}
                <button>
                  <Icon name="plus" /> Add photo
                </button>
              </div>
            </>
          ) : (
            <div className="form-row">
              <Select
                label="Preferred language"
                name="profileLang"
                options={["English", "हिन्दी", "తెలుగు", "தமிழ்"]}
              />
              <Field label="Saved products" name="saved" placeholder="6 handmade pieces" />
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function ArtisanPortal({ logout }: { logout: () => void }) {
  const [page, setPage] = useState("Dashboard"),
    [stock, setStock] = useState(products.slice(0, 4)),
    [orders, setOrders] = useState([
      {
        id: "KC-1842",
        customer: "Aditi Rao",
        item: "Kalamkari Saree",
        total: "₹4,250",
        status: "New",
      },
      {
        id: "KC-1829",
        customer: "Rohan Mehta",
        item: "Hand-painted Dupatta",
        total: "₹2,800",
        status: "Accepted",
      },
      {
        id: "PO-204",
        customer: "Nisha Iyer",
        item: "Custom festive table linen",
        total: "₹6,200",
        status: "Requested",
      },
    ]);
  const addProduct = (p: (typeof products)[0]) => {
    setStock((s) => [p, ...s]);
    setPage("My Products");
  };
  const content =
    page === "Dashboard" ? (
      <ArtisanDashboard setPage={setPage} />
    ) : page === "My Products" || page === "Product Catalog" ? (
      <Catalog stock={stock} setStock={setStock} />
    ) : page === "Add New Product" ? (
      <AddProduct save={addProduct} />
    ) : page === "Voice Product Entry" ? (
      <VoiceEntry save={addProduct} />
    ) : page === "Incoming Orders" || page === "Pre-Orders" ? (
      <ArtisanOrders orders={orders} setOrders={setOrders} preorder={page === "Pre-Orders"} />
    ) : page === "Messages" ? (
      <Messages artisan />
    ) : page === "Customer Feedback" ? (
      <Feedback />
    ) : page === "Availability Management" ? (
      <Availability stock={stock} setStock={setStock} />
    ) : (
      <Profile artisan />
    );
  return (
    <Shell role="artisan" page={page} setPage={setPage} logout={logout}>
      {content}
    </Shell>
  );
}

function ArtisanDashboard({ setPage }: { setPage: (x: string) => void }) {
  return (
    <>
      <PageHead
        eyebrow="Studio overview"
        title="Good morning, Lakshmi"
        desc="Here’s what’s happening with your craft business today."
        action={
          <button className="btn btn-primary" onClick={() => setPage("Add New Product")}>
            <Icon name="plus" /> Add new product
          </button>
        }
      />
      <div className="metrics">
        {[
          ["Total products", "24", "+3 this month"],
          ["New orders", "08", "Needs attention"],
          ["Pending orders", "05", "In production"],
          ["Completed", "126", "All time"],
        ].map((x, i) => (
          <article key={x[0]}>
            <span>0{i + 1}</span>
            <small>{x[0]}</small>
            <b>{x[1]}</b>
            <p>{x[2]}</p>
          </article>
        ))}
      </div>
      <div className="artisan-dashboard-grid">
        <section className="sales-chart">
          <div className="card-head">
            <div>
              <small>SALES SUMMARY</small>
              <h3>
                ₹68,420 <span>+12.4%</span>
              </h3>
            </div>
            <select>
              <option>Last 6 months</option>
            </select>
          </div>
          <div className="bars">
            {[38, 52, 45, 70, 62, 88].map((x, i) => (
              <div key={i}>
                <i style={{ height: `${x}%` }} />
                <span>{["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"][i]}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="capacity-card">
          <div className="card-head">
            <div>
              <small>WORKSHOP CAPACITY</small>
              <h3>This month</h3>
            </div>
            <b>72%</b>
          </div>
          <div className="capacity-ring">
            <span>
              <b>18</b>/ 25 orders
            </span>
          </div>
          <p>
            You can comfortably accept <b>7 more orders</b> this month.
          </p>
          <button onClick={() => setPage("Availability Management")}>
            Manage availability <Icon name="arrow" />
          </button>
        </section>
      </div>
      <div className="bottom-grid">
        <section>
          <div className="card-head">
            <div>
              <small>LATEST</small>
              <h3>Recent orders</h3>
            </div>
            <button onClick={() => setPage("Incoming Orders")}>View all</button>
          </div>
          {[
            ["#KC-1842", "Aditi Rao", "Kalamkari Saree", "New"],
            ["#KC-1829", "Rohan Mehta", "Printed Dupatta", "In progress"],
            ["#KC-1815", "Nisha Iyer", "Table Runner", "Shipped"],
          ].map((x) => (
            <div className="activity-row" key={x[0]}>
              <span className="mini-art">{x[1][0]}</span>
              <div>
                <b>{x[2]}</b>
                <small>
                  {x[0]} · {x[1]}
                </small>
              </div>
              <i>{x[3]}</i>
            </div>
          ))}
        </section>
        <section>
          <div className="card-head">
            <div>
              <small>CUSTOMER VOICES</small>
              <h3>Recent feedback</h3>
            </div>
            <button onClick={() => setPage("Customer Feedback")}>View all</button>
          </div>
          <div className="review">
            <span>★★★★★</span>
            <p>
              “The colours are even more beautiful in person. You can feel the care in every
              detail.”
            </p>
            <div>
              <img src={IMG.jewelry} />
              <b>
                Aditi Rao<small>on Kalamkari Saree</small>
              </b>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Catalog({
  stock,
  setStock,
}: {
  stock: typeof products;
  setStock: React.Dispatch<React.SetStateAction<typeof products>>;
}) {
  const [editing, setEditing] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  return (
    <>
      <PageHead
        eyebrow="Catalogue management"
        title="My products"
        desc={`${stock.length} products in your digital craft catalogue.`}
        action={
          <span className="ai-badge">
            {stock.length} listed · {Math.max(0, stock.length - 1)} available
          </span>
        }
      />
      <div className="catalog-table">
        <div className="table-head">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Availability</span>
          <span>Actions</span>
        </div>
        {stock.map((p, i) => (
          <div className="table-row" key={`${p.id}-${i}`}>
            <span className="table-product">
              <img src={p.image} />
              <b>
                {p.name}
                <small>Updated recently</small>
              </b>
            </span>
            <span>{p.category}</span>
            <span>
              <b>₹{p.price.toLocaleString("en-IN")}</b>
            </span>
            <span>{i + 2}</span>
            <span>
              <i className="available-dot" /> Available
            </span>
            <span className="table-actions">
              <button
                onClick={() => {
                  setEditing(i);
                  setEditName(p.name);
                }}
              >
                Edit
              </button>
              <button onClick={() => setStock((s) => s.filter((_, x) => x !== i))}>Delete</button>
            </span>
          </div>
        ))}
      </div>
      {editing !== null && (
        <div className="edit-toast">
          <b>Edit product name</b>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
          <button
            onClick={() => {
              setStock((items) =>
                items.map((item, index) =>
                  index === editing ? { ...item, name: editName } : item,
                ),
              );
              setEditing(null);
            }}
          >
            Save changes
          </button>
          <button onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
    </>
  );
}

function AddProduct({ save }: { save: (p: (typeof products)[0]) => void }) {
  const [preview, setPreview] = useState(IMG.market),
    [done, setDone] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    save({
      id: Date.now(),
      name: String(f.get("productName")),
      price: Number(f.get("price")),
      artisan: "Lakshmi Devi",
      category: String(f.get("category")),
      location: "Andhra Pradesh",
      image: preview,
      tag: "New",
    });
  }
  return (
    <>
      <PageHead
        eyebrow="Catalogue management"
        title="Add a new handmade product"
        desc="Share the details customers need to understand and value your work."
      />
      <form className="product-form" onSubmit={submit}>
        <section>
          <h3>Product photographs</h3>
          <label className="photo-upload">
            <img src={preview} />
            <span>
              <Icon name="upload" /> Change photograph
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setPreview(URL.createObjectURL(f));
                }}
              />
            </span>
          </label>
        </section>
        <section>
          <h3>Product details</h3>
          <Field
            label="Product name"
            name="productName"
            placeholder="e.g. Hand-painted Kalamkari Dupatta"
          />
          <label>
            Description
            <textarea
              required
              name="description"
              placeholder="Describe the story, making process and distinctive details…"
            />
          </label>
          <div className="form-row">
            <Field label="Price (₹)" name="price" type="number" placeholder="2500" />
            <Select
              label="Craft category"
              name="category"
              options={[
                "Textiles",
                "Painting",
                "Pottery",
                "Wood Craft",
                "Metal Craft",
                "Jewellery",
              ]}
            />
          </div>
          <div className="form-row">
            <Field label="Materials used" name="materials" placeholder="Cotton, natural dyes" />
            <Field label="Quantity" name="quantity" type="number" placeholder="5" />
          </div>
          <label>
            Availability
            <select name="availability">
              <option>Available now</option>
              <option>Made to order</option>
              <option>Pre-order only</option>
              <option>Unavailable</option>
            </select>
          </label>
          <button className="btn btn-primary" onClick={() => setDone(true)}>
            {done ? "Saving…" : "Publish product"} <Icon name="arrow" />
          </button>
        </section>
      </form>
    </>
  );
}

function VoiceEntry({ save }: { save: (p: (typeof products)[0]) => void }) {
  const [stage, setStage] = useState(0),
    [language, setLanguage] = useState("తెలుగు (Telugu)");
  const next = () => {
    if (stage < 2) {
      setStage((s) => s + 1);
      setTimeout(() => setStage((s) => Math.min(2, s + 1)), 1200);
    }
  };
  return (
    <>
      <PageHead
        eyebrow="Voice-assisted cataloguing"
        title="Speak. We’ll shape the listing."
        desc="A simulated workflow showing how spoken product stories could become complete, translated listings."
        action={
          <span className="ai-badge">
            <Icon name="mic" /> Demo simulation
          </span>
        }
      />
      <div className="voice-flow">
        <section className="voice-recorder">
          <span className="step">01</span>
          <label>
            Choose your speaking language
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>తెలుగు (Telugu)</option>
              <option>हिन्दी (Hindi)</option>
              <option>தமிழ் (Tamil)</option>
              <option>ગુજરાતી (Gujarati)</option>
              <option>English</option>
            </select>
          </label>
          <button className={`mic-button ${stage === 1 ? "listening" : ""}`} onClick={next}>
            <Icon name={stage === 0 ? "mic" : stage === 1 ? "mic" : "spark"} size={32} />
          </button>
          <h3>
            {stage === 0
              ? "Tap to start speaking"
              : stage === 1
                ? "Listening to your story…"
                : "Speech captured"}
          </h3>
          <p>
            {stage < 2
              ? `Speak naturally in ${language}.`
              : "“Idi chetito chesina Kalamkari cotton dupatta…”"}
          </p>
          <div className="sound-wave">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <i key={i} />
            ))}
          </div>
        </section>
        <section className={`extraction ${stage === 2 ? "visible" : ""}`}>
          <span className="step">02</span>
          <h3>Extracted product information</h3>
          <p className="muted">Sample NLP output — review every field before saving.</p>
          <dl>
            <div>
              <dt>Product name</dt>
              <dd>Hand-painted Kalamkari Cotton Dupatta</dd>
            </div>
            <div>
              <dt>Materials</dt>
              <dd>Pure cotton, natural vegetable dyes</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>Textiles & Hand painting</dd>
            </div>
            <div>
              <dt>Original description · Telugu</dt>
              <dd>సహజ రంగులతో చేతితో చిత్రించిన కలంకారీ దుపట్టా.</dd>
            </div>
            <div>
              <dt>Translation preview · English</dt>
              <dd>
                Hand-painted Kalamkari dupatta crafted on pure cotton using natural vegetable dyes.
              </dd>
            </div>
          </dl>
          <button
            className="btn btn-primary"
            onClick={() =>
              save({
                ...products[0],
                id: Date.now(),
                name: "Hand-painted Kalamkari Cotton Dupatta",
                price: 2800,
                tag: "Voice added",
              })
            }
          >
            Save to catalogue <Icon name="arrow" />
          </button>
        </section>
      </div>
      <div className="prototype-note wide">
        Voice recognition, NLP and translation are simulated for this academic prototype. No
        external service is connected.
      </div>
    </>
  );
}

function ArtisanOrders({
  orders,
  setOrders,
  preorder,
}: {
  orders: any[];
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
  preorder: boolean;
}) {
  const update = (id: string, status: string) =>
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
  const visibleOrders = orders.filter((order) =>
    preorder ? order.id.startsWith("PO-") : !order.id.startsWith("PO-"),
  );
  return (
    <>
      <PageHead
        eyebrow="Order workshop"
        title={preorder ? "Pre-orders" : "Incoming orders"}
        desc={
          preorder
            ? "Plan production for upcoming customer requests."
            : "Review, accept and move orders through production."
        }
      />
      <div className="artisan-orders">
        {visibleOrders.map((o) => (
          <article key={o.id}>
            <div>
              <small>{o.id}</small>
              <h3>{o.item}</h3>
              <p>
                Customer: <b>{o.customer}</b> · {o.total}
              </p>
            </div>
            <span className="status">{o.status}</span>
            <div className="order-actions">
              {o.status === "New" || o.status === "Requested" ? (
                <>
                  <button onClick={() => update(o.id, "Accepted")}>Accept</button>
                  <button className="reject" onClick={() => update(o.id, "Rejected")}>
                    Reject
                  </button>
                </>
              ) : (
                <select value={o.status} onChange={(e) => update(o.id, e.target.value)}>
                  <option>Accepted</option>
                  <option>In Progress</option>
                  <option>Shipped</option>
                  <option>Completed</option>
                </select>
              )}
              <button>
                <Icon name="message" /> Message
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Feedback() {
  const [reply, setReply] = useState("");
  return (
    <>
      <PageHead
        eyebrow="Customer voices"
        title="Feedback & reviews"
        desc="Learn what customers value and respond with care."
      />
      <div className="rating-summary">
        <div>
          <b>4.9</b>
          <span>
            ★★★★★<small>126 verified reviews</small>
          </span>
        </div>
        {[5, 4, 3, 2, 1].map((x, i) => (
          <p key={x}>
            <span>{x} star</span>
            <i>
              <b style={{ width: `${[91, 7, 2, 0, 0][i]}%` }} />
            </i>
            <small>{[115, 8, 3, 0, 0][i]}</small>
          </p>
        ))}
      </div>
      <div className="reviews-list">
        {[
          "The natural dyes and fine detail are outstanding. A true heirloom piece.",
          "Beautiful work and thoughtfully packed. Lakshmi also answered all my questions.",
        ].map((x, i) => (
          <article key={x}>
            <header>
              <img src={i ? IMG.figurines : IMG.jewelry} />
              <div>
                <b>{i ? "Nisha Iyer" : "Aditi Rao"}</b>
                <span>★★★★★</span>
              </div>
              <small>Verified purchase</small>
            </header>
            <p>{x}</p>
            <small>{i ? "Hand-painted Table Runner" : "Kalamkari Saree"} · February 2025</small>
            {reply === String(i) ? (
              <div className="reply-sent">Your response has been posted.</div>
            ) : (
              <button onClick={() => setReply(String(i))}>Respond to review</button>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

function Availability({
  stock,
  setStock,
}: {
  stock: typeof products;
  setStock: React.Dispatch<React.SetStateAction<typeof products>>;
}) {
  const [capacity, setCapacity] = useState(25),
    [working, setWorking] = useState(true);
  return (
    <>
      <PageHead
        eyebrow="Workshop planning"
        title="Availability management"
        desc="Keep customer expectations accurate and protect your making time."
      />
      <div className="availability-grid">
        <section>
          <h3>Working availability</h3>
          <div className="toggle-row">
            <div>
              <b>Accepting new orders</b>
              <p>Customers can send orders and customization requests.</p>
            </div>
            <button
              className={`toggle ${working ? "on" : ""}`}
              onClick={() => setWorking(!working)}
            >
              <i />
            </button>
          </div>
          <label>
            Monthly order capacity
            <input
              type="range"
              min="5"
              max="50"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
            <b>{capacity} orders</b>
          </label>
          <label>
            Typical lead time
            <select>
              <option>7–10 working days</option>
              <option>10–15 working days</option>
              <option>3–4 weeks</option>
            </select>
          </label>
        </section>
        <section>
          <h3>Product availability</h3>
          {stock.map((p, i) => (
            <div className="stock-row" key={`${p.id}-${i}`}>
              <img src={p.image} />
              <div>
                <b>{p.name}</b>
                <small>{i + 2} in stock</small>
              </div>
              <input aria-label={`${p.name} quantity`} type="number" defaultValue={i + 2} min="0" />
              <button className="toggle on" onClick={(e) => e.currentTarget.classList.toggle("on")}>
                <i />
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default function App() {
  const [portal, setPortal] = useState<Portal>("home"),
    [picker, setPicker] = useState<AuthKind | null>(null),
    [role, setRole] = useState<Role>("customer"),
    [authKind, setAuthKind] = useState<AuthKind>("login");
  const select = (r: Role) => {
    setRole(r);
    setAuthKind(picker || "login");
    setPicker(null);
    setPortal("auth");
  };
  if (portal === "auth")
    return (
      <AuthPage
        role={role}
        kind={authKind}
        back={() => setPortal("home")}
        success={() => setPortal(role)}
        switchKind={() => setAuthKind((x) => (x === "login" ? "signup" : "login"))}
      />
    );
  if (portal === "customer") return <CustomerPortal logout={() => setPortal("home")} />;
  if (portal === "artisan") return <ArtisanPortal logout={() => setPortal("home")} />;
  return (
    <>
      <Home choose={setPicker} />
      {picker && <RolePicker kind={picker} close={() => setPicker(null)} select={select} />}
    </>
  );
}
