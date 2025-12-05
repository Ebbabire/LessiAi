# LassiAI - Clinical Case Management

A professional veterinary clinical case management interface built with React and Tailwind CSS. This project demonstrates a clean, master-detail architecture for managing patient intake, clinical history, and AI-driven recommendations.

## 🚀 Features

- **Split View Architecture**: A responsive Master-Detail interface that handles case lists and detailed clinical views side-by-side.
- **Clinical UI Primitives**: Modular, reusable UI components including Status Badges, Clinical Flags, and Skeletons located in `components/ui`.
- **Recommendation Engine UI**: dedicated components for displaying AI-driven clinical recommendations and loading states.
- **Smart Sorting & Filtering**: Built-in sorting functionality for case history.
- **Type Safety**: Centralized TypeScript definitions for robust data handling.
- **Responsive Design**: Adapts seamlessly from mobile stack views to desktop split views.

## 📂 Project Structure

The project follows a **Feature-Based Architecture**. Shared UI components live in the global `components/ui` directory, while feature-specific logic (like the Recommendation Panel) is co-located within its specific page module.

```text
src/
├── assets/
├── components/
│   └── ui/                     # Shared "dumb" UI components
│       ├── Layout.tsx
│       ├── Navbar.tsx
│       ├── SectionHeader.tsx
│       ├── Skeleton.tsx
│       ├── SortIcon.tsx
│       └── StatusBadge.tsx
├── data/                       # Mock data or static constants
├── hooks/                      # Global custom hooks
├── pages/
│   └── case/                   # "Case" Feature Module
│       ├── components/         # Components specific only to Cases
│       │   ├── RecommendationPanel/
│       │   │   ├── ClinicalFlag.tsx
│       │   │   ├── RecommendationCard.tsx
│       │   │   ├── RecommendationPanel.tsx
│       │   │   └── RecommendationPanel_loading.tsx
│       │   ├── CaseDetail.tsx
│       │   ├── CaseItem.tsx
│       │   └── CaseList.tsx
│       └── Cases.tsx           # Main Page/Route entry point
├── type/                       # TypeScript definitions
├── App.tsx
├── main.tsx
└── router.tsx                  # Application routing configuration (React Router v7)
```

## 📦 Setup & Usage

1. **Install Dependencies**
   Ensure you have a React environment set up with Tailwind CSS configured.

2. **Run the App**
   The application entry point is `main.tsx`, which mounts the `Cases` page via `App.tsx`.

## 🎨 Design System

### Visual Language

- **Palette**: Uses a `slate` (gray-blue) foundation for a sterile, clinical feel, accented by semantic colors (Blue, Amber, Emerald) for status indicators.
- **Typography**: `Inter` font family for high legibility in data-dense views.

### Component Organization

- **Pages**: Top-level views (e.g., `Cases.tsx`) act as controllers, managing state and layout.
- **UI Components**: Dumb, presentational components (buttons, badges) are isolated in `src/components/ui` for reuse.
- **Feature Components**: Complex, domain-specific logic (e.g., `RecommendationPanel`) lives within the feature directory `src/pages/case/components`.

### Design Justification: The Hybrid Approach

I analyzed two distinct design proposals to determine the optimal interface for clinical decision support: **Mine (Ebba's)** (Functional Grid Layout) and **Abdul's** (Modern UI Style).

**Abdul's** UI is much cleaner and modern, but it is likely too simple for a complex human medical workflow.

- **Visual Appeal**: The blue header, rounded corners, and generous whitespace make it very approachable and easy to read. It feels like a modern SaaS app.
- **Linear Workflow**: This design works well for a specific, single-issue protocol.
- **The Flaw for General Practice**: It hides the context. If a patient has multiple comorbidities, this linear vertical stack would become incredibly long and require too much scrolling to see the relevant data.

**Recommendation: The Hybrid Approach**
I chose to adopt the layout of **Mine (Ebba's)**, but apply the UI styling of **Abdul's**.

1.  **Keep the 2-Column Layout (from Mine (Ebba's))**: Doctors need to see alerts (Drug Interactions/Vitals) side-by-side with their prescribing actions. Do not hide alerts at the bottom of a scrollable page.
2.  **Adopt the Visual Language (from Abdul's)**:
    - Use the softer shadows and card-based design from **Abdul's** to make **Mine (Ebba's)** feel less "boxy."
    - Use the "Checkmark" icons from **Abdul's** for the recommendations. It psychologically suggests "Review and Approve," which is a faster workflow than reading a paragraph.
    - **Refine the Header**: Use the bold, blue branding from **Abdul's** for the header in **Mine (Ebba's)** to clearly delineate where the AI/System ends and the user interface begins.

I used **Mine (Ebba's)** as our wireframe because it is safer and more functional for medical professionals, but utilized the design language of **Abdul's** to style it.

### Architecture Decision: Folder Structure

Here is a breakdown of why **Mine (Ebba's)** structure is better for modern React applications.

#### (Mine (Ebba's)): "Feature-Based Architecture"

**1. Co-location of Related Logic**
In **Mine (Ebba's)** structure, we have a folder called `pages/case`. Inside that, we have components that are only used for cases (`CaseList`, `CaseDetail`, `RecommendationPanel`).

- **The Benefit**: If you need to fix a bug in the "Case" workflow, you go to that one folder. You don't have to hunt through a massive global components folder to find the pieces.

**2. Clean Global Namespace**
In **Mine (Ebba's)** structure, `src/components/ui` contains things strictly used everywhere (Buttons, Skeletons, Navbar).
In **Abdul's** structure, specific sub-components like `FlagsSection` and `SummarySection` are floating in the global components folder.

- **The Issue with Abdul's**: If your app grows and you have a "Patient Summary" and a "Billing Summary," having a global component named `SummarySection` becomes confusing.

**3. Reduced "Boilerplate" Noise**
**Abdul's** structure uses the "Component Folder Pattern" (a folder with `index.ts` and `Component.tsx` for every single component).

- **The Problem**: This triples the number of files you have to manage. You end up with 50 files named `index.ts` in your editor tabs, making it impossible to know which one you are editing.
- **The Fix**: Modern React development prefers single-file components (like in **Mine (Ebba's)**) until a component actually needs sub-files (like specific CSS or tests).

**Abdul's** structure broke the `RecommendationPanel` down into smaller pieces (`FlagsSection`, `RecommendationItem`) which is a better approach than **Mine (Ebba's)**.

**Decision**: I keept the Folder Structure of **Mine (Ebba's)**, but adopt the internal modularity of **Abdul's** by breaking complex components down.

```

```
