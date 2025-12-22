# Lassi - Clinical Case Management

A professional veterinary clinical case management interface built with React and Tailwind CSS. This project demonstrates a clean, master-detail architecture for managing patient intake, clinical history, and AI-driven recommendations.

## 🔗 Live Demo

**View the deployed application here:** [https://lassi-ai.netlify.app/cases](https://lassi-ai.netlify.app/cases)

## 🚀 Features

- **Split View Architecture**: A responsive Master-Detail interface that handles case lists and detailed clinical views side-by-side.
- **Clinical UI Primitives**: Modular, reusable UI components including Status Badges, Clinical Flags, and Skeletons located in `components/ui`.
- **Recommendation Engine UI**: dedicated components for displaying AI-driven clinical recommendations and loading states.
- **Smart Sorting & Filtering**: Built-in sorting functionality for case history.
- **Type Safety**: Centralized TypeScript definitions for robust data handling.
- **Responsive Design**: Adapts seamlessly from mobile stack views to desktop split views.

## 🛠 Project Structure

The project follows a **Feature-Based Architecture**, co-locating domain-specific logic while sharing global primitives.

```
src/
├── components/
│   ├── intel/          # Intelligence features
│   │   └── VoiceOverlay.tsx       # Voice command interface
│   └── ui/             # Shared primitive components
│       └── Accordion.tsx           # Collapsible sections
├── context/                        # Global state management
│   ├── caseContext.tsx             # Case-specific state (panels, tracing)
│   ├── caseContextProvider.tsx             # Provider for Case-specific state (panels, tracing)
│   ├── clinicContext.tsx           # Clinic-wide state (voice, alerts)
│   └── clinicContextProvider.tsx             # Provider for Clinic-wide state (voice, alerts)
├── data/                # Mock data and static content
├── hooks/                # Mock data and static content
|   ├── useCaseContext.tsx             # Hook to access Case-specific state (panels, tracing)
|   ├── useClinicContext.tsx             # Hook to access Clinic-wide state (voice, alerts)
|   └── useDebounce.tsx             # Utility hook to debouce data fetch on search input change
├── lib/                 # Utilities (QueryClient)
├── pages/
│   └── case/                      # Case Management Feature Module
│       ├── components/            # Domain-specific components
|       |   ├── RecommendationPanel/
│       │   │   ├── RecommendationPanel_loading.tsx   # Loading skeleton for the panels
│       │   │   ├── GlobalIntelPanel/                 # Top-level alerts
│       │   │   ├── OpsIntelPanel/                    # Operational flags
│       │   │   ├── ProfileIntelPanel/                # AI settings
│       │   │   ├── ReasoningPanel/                   # Differential diagnosis
│       │   │   ├── TreatmentPanel/                   # Protocol management
│       │   ├── CaseList.tsx              # Sidebar list view
│       │   └── CaseDetail.tsx            # Main detail panel
│       └── Cases.tsx            # Main page controller
├── types.ts             # Shared TypeScript definitions
├── App.tsx              # Main application layout
└── main.tsx            # Entry point
```

## 📦 Setup & Usage

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies

- **React**: UI Library
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Iconography

### Component Organization

- **Pages**: Top-level views (e.g., `Cases.tsx`) act as controllers, managing state and layout.
- **UI Components**: Dumb, presentational components (buttons, badges) are isolated in `src/components/ui` for reuse.
- **Feature Components**: Complex, domain-specific logic (e.g., `ReasoningPanel`) lives within the feature directory `src/pages/case/components`.
