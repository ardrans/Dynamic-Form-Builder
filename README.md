# Dynamic Form Builder

A visual form builder that lets users create forms without writing code. Built with React, Material UI, and modern web technologies.

![Dynamic Form Builder](https://img.shields.io/badge/React-18-blue) ![Material UI](https://img.shields.io/badge/MUI-5-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- **7 Field Types**: Text, Email, Number, Date, Checkbox, Radio, Dropdown
- **Field Configuration**: Labels, placeholders, required validation
- **Validation Rules**: Min/max values, regex patterns, custom error messages
- **Drag & Drop**: Reorder fields with smooth animations
- **Conditional Logic**: Show/hide/enable/disable fields based on conditions
- **Live Preview**: Real-time form preview that updates instantly

### Bonus Features
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 💾 **Autosave**: Automatically saves every 30 seconds
- 🔗 **Shareable URL**: Generate Base64-encoded URLs to share forms
- ✨ **Premium UI**: Glassmorphism effects, gradients, micro-animations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

No `.env` required — life's already hard enough.

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + Create React App |
| Styling | Material UI v5 |
| State Management | React Context + useReducer |
| Drag & Drop | @dnd-kit |
| Storage | localStorage |

## 📁 Project Structure

```
src/
├── components/
│   ├── builder/          # Form builder components
│   │   ├── BuilderPanel.js
│   │   ├── FieldPalette.js
│   │   ├── FieldList.js
│   │   ├── FieldItem.js
│   │   ├── FieldConfigDialog.js
│   │   ├── OptionsEditor.js
│   │   └── ConditionalLogicEditor.js
│   ├── preview/          # Form preview components
│   │   ├── PreviewPanel.js
│   │   ├── FormPreview.js
│   │   ├── PreviewField.js
│   │   └── fields/       # Individual field types
│   └── ui/               # Reusable UI components
├── context/              # React Context providers
│   ├── FormContext.js    # Form state management
│   └── ThemeContext.js   # Theme management
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
└── theme/                # MUI theme configuration
```

## 💡 How to Use

1. **Add Fields**: Click field types in the palette to add them
2. **Configure**: Click the edit icon on any field to configure:
   - Basic settings (label, placeholder, required)
   - Validation rules (min/max, regex, custom errors)
   - Options (for radio/dropdown)
   - Conditional logic
3. **Reorder**: Drag fields to reorder them
4. **Preview**: See live updates in the preview panel
5. **Save/Export**: Use toolbar buttons to save, load, or export

## 🔀 Conditional Logic

Create dynamic forms with rules like:
- "Show Field B only if Field A equals 'Yes'"
- "Hide email field if checkbox is unchecked"
- "Disable field when another field is empty"

Supports AND/OR logic for multiple conditions.

## 📝 Assumptions & Tradeoffs

1. **No Backend**: All data stored in localStorage (single device)
2. **Single Form**: One form at a time (not a multi-form manager)
3. **Modern Browsers**: Requires ES6+ and CSS backdrop-filter support
4. **Desktop Optimized**: Responsive but best on desktop screens

## 🎨 UI Design

- **Typography**: Inter font family
- **Colors**: Indigo primary with teal accents
- **Effects**: Glassmorphism cards, gradient backgrounds
- **Animations**: Smooth transitions, hover effects, fade animations

---

Built with ❤️ for the Ashline International Assignment
