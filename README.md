# PropertyFinder - React Property Search Application

A PropX-inspired property search web application built with React, demonstrating modern frontend development practices.

## 🏠 Features

### Search Functionality
- **5 Search Criteria**: Type, Price, Bedrooms, Date Added, Postcode
- **React Widgets**: Enhanced form elements using react-select and react-datepicker
- **Real-time Filtering**: Results update based on any combination of criteria

### Property Display
- **Professional Cards**: Image, price, location, bedrooms, property type
- **Hover Effects**: Lift animation, image zoom, shadow enhancement
- **Responsive Grid**: Adapts to screen size

### Property Details Page
- **Image Gallery**: 6-8 images per property with lightbox viewer
- **Thumbnail Navigation**: Click to view any image
- **React Tabs**: Description, Floor Plan, Google Map

### Favourites System
- **Add via Drag & Drop**: Drag property cards to favourites sidebar
- **Add via Button**: Click favourite button on property page
- **Duplicate Prevention**: Cannot add same property twice
- **Remove Options**: Delete button, drag out, or clear all
- **Persistent Storage**: Saved to localStorage

### Responsive Design
- **Desktop Layout**: Side-by-side search and favourites
- **Mobile Layout**: Stacked layout with toggle button
- **Breakpoints**: 900px (tablet), 768px (mobile)

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| React Router | Navigation |
| react-select | Enhanced dropdowns |
| react-datepicker | Date selection |
| react-tabs | Tabbed content |
| @hello-pangea/dnd | Drag and drop |
| Vite | Build tool |
| Jest | Testing framework |

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FavouritesList.jsx
│   ├── PropertyCard.jsx
│   ├── PropertyGallery.jsx
│   ├── PropertyGrid.jsx
│   ├── PropertyTabs.jsx
│   ├── SearchForm.jsx
│   └── Footer.jsx
├── context/            # React Context for state
│   └── FavouritesContext.jsx
├── data/               # JSON data
│   └── properties.json
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── PropertyPage.jsx
│   └── SearchPage.jsx
├── utils/              # Utility functions
│   └── searchUtils.js
├── __tests__/          # Jest test files
│   ├── FavouritesContext.test.jsx
│   ├── PropertyCard.test.js
│   └── searchUtils.test.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

---

## 🧪 Testing

Run tests with Jest:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Test Coverage
- **searchUtils.test.js**: Filter functions, helper utilities
- **FavouritesContext.test.jsx**: Add, remove, duplicate prevention
- **PropertyCard.test.js**: Component rendering, data validation

---

## 🔒 Security

See [SECURITY.md](./SECURITY.md) for details on:
- Content Security Policy (CSP)
- JSX encoding for XSS prevention
- Input validation

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 900px | Desktop: Full navigation, side-by-side layout |
| 768px - 900px | Tablet: Hamburger menu, adjusted spacing |
| < 768px | Mobile: Stacked layout, toggle favourites |

---

## 📝 Assignment Criteria Met

- ✅ 7 Properties with diverse data
- ✅ React Widgets on all form elements
- ✅ Search with 1-5 criteria combinations
- ✅ Professional results display
- ✅ Image gallery with lightbox
- ✅ React tabs for content organization
- ✅ Favourites with drag & button (duplicate prevention)
- ✅ Remove favourites (drag, button, clear)
- ✅ Favourites displayed on search page
- ✅ Responsive design with media queries
- ✅ PropX-style aesthetics
- ✅ CSP and JSX security measures
- ✅ 30+ Jest tests

---

## 👤 Author

Tharusha CW

## 📄 License

This project is for educational purposes.
