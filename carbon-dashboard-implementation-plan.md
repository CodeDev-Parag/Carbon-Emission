# 🌿 CampusCarbon Dashboard
## Complete Implementation Plan
> Pages · Visualizations · Data Flow · Interactions · Tech Stack

| Field | Value |
|---|---|
| **Project** | College Campus GHG Footprint Dashboard |
| **Version** | v1.0 · Full Specification |
| **Scope** | Energy · Transport · Waste · Scenarios |
| **Framework** | React + Recharts + Tailwind |
| **Status** | Ready for Development |

---

# 1. Project Overview

The CampusCarbon Dashboard is a web-based analytics platform that computes and visualizes a college campus total greenhouse-gas (GHG) footprint in CO₂e. It converts raw activity data (kWh, litres, km, kg waste) into standardized CO₂ equivalent values and presents them through an interactive, multi-page dashboard for stakeholders, sustainability officers, and facilities teams.

## 1.1 Core Formula

> **Emissions (kg CO₂e) = Activity Data × Emission Factor**

## 1.2 Emission Scope Classification

| Scope | Type | Campus Sources |
|---|---|---|
| **Scope 1** | Direct combustion | Diesel generators, campus vehicles, LPG canteen, refrigerant leaks |
| **Scope 2** | Purchased electricity | Grid electricity for all buildings (kWh × EF) |
| **Scope 3** | Indirect / value chain | Student/staff commuting, food procurement, waste disposal |

## 1.3 Emission Factors Reference Table

| Source | Factor | Unit | Scope | Confidence |
|---|---|---|---|---|
| Grid Electricity | `0.70` | kg CO₂ / kWh | Scope 2 | High |
| Diesel (DG Set) | `2.68` | kg CO₂ / litre | Scope 1 | High |
| Petrol (cars) | `2.31` | kg CO₂ / litre | Scope 1 | High |
| LPG (canteen) | `1.50` | kg CO₂ / kg | Scope 1 | High |
| Natural Gas | `2.75` | kg CO₂ / m³ | Scope 1 | High |
| Car commute | `0.18–0.20` | kg CO₂ / km | Scope 3 | Medium |
| Bus commute | `0.089` | kg CO₂ / km | Scope 3 | Medium |
| Bike | `0.05–0.08` | kg CO₂ / km | Scope 3 | Medium |
| Landfill waste | `0.50` | kg CO₂e / kg | Scope 3 | Medium |
| CH₄ (GWP) | `28× mass` | kg CO₂e | Any | High |
| N₂O (GWP) | `265× mass` | kg CO₂e | Any | High |

> ⚠️ Replace all factors above with institution-specific or national authority values before formal reporting.

---

# 2. Information Architecture & Site Map

The dashboard is organized into six primary pages accessible via a persistent left sidebar. Every page shares the same top bar with global controls (period selector, scope toggle, unit toggle).

## 2.1 Global Navigation Structure

| Page | Icon | Primary Audience | Key Purpose |
|---|---|---|---|
| **Overview** | ◈ | All stakeholders | Campus-level summary: KPIs, total trend, category split |
| **Energy** | ⚡ | Facilities / Sustainability | Building-wise electricity, diesel, LPG — drilldown to meter level |
| **Transport** | 🚗 | Sustainability officers | Commute modal split, per-mode CO₂, student vs staff cohorts |
| **Waste** | ♻️ | Sustainability / Ops | Landfill vs recycling vs composting; what-if composting scenarios |
| **Scenario Planner** | 🔮 | Leadership / Policy | Model intervention impacts: solar, EV adoption, fuel reduction |
| **Settings** | ⚙️ | Admin / Data team | Emission factors, confidence levels, missing-data policy |

## 2.2 Global Top Bar Controls

| Control | Options | Effect on Dashboard |
|---|---|---|
| **Period Selector** | Month / Quarter / Year / Custom range | All charts re-aggregate; KPIs animate to new values; MoM badge updates |
| **Scope Toggle** | Category View ↔ Scope 1/2/3 View | Recolors all charts and relabels legends by scope classification |
| **Unit Toggle** | kg CO₂e ↔ Tonnes CO₂e | Divides all displayed values by 1,000 and updates axis labels |
| **Export Button** | PNG / CSV / PDF | Exports currently visible chart or full page report |

---

# 3. Page-by-Page Specification

## Page 1 — Overview

The landing page every stakeholder sees first. Provides the single-screen story: how much CO₂e is the campus emitting, in which direction is it trending, and what are the three main drivers?

---

### 3.1.A KPI Tiles Row — 5 Cards
**VIZ A** · Numeric tiles / KPI cards — immediate top-level summary for all stakeholders

| KPI Card | Formula | Data Source Tag | Confidence |
|---|---|---|---|
| Total CO₂e | `Σ energy + transport + waste + other` | meter / bill | High |
| Energy CO₂e | `electricity×EF + diesel×EF + LPG×EF` | bill / meter | High |
| Transport CO₂e | `Σ all modes (distance×EF or fuel×EF)` | survey / log | Medium |
| Waste CO₂e | `landfill×EF − recycling credit` | bill / log | Medium |
| Per Capita CO₂e | `total_co2e ÷ (students + staff)` | estimate | Medium |

**Each KPI card includes:** colored top accent bar per category, MoM % delta badge (green if down, red if up), data provenance badge (meter/bill/survey/estimate), confidence dot (green/amber/red), hover tooltip with period and source details.

**Click interaction:** Clicking any KPI card navigates to the corresponding category page (Energy, Transport, Waste), with that metric pre-highlighted.

---

### 3.1.B Campus Total CO₂e Trend — Line / Area Chart
**VIZ B** · Time-series line chart showing monthly total CO₂e — primary trend indicator

| Attribute | Detail |
|---|---|
| Chart type | Area chart with gradient fill (area emphasizes magnitude) |
| X-axis | Month labels (Jul, Aug, Sep …) — driven by period selector |
| Y-axis | CO₂e in kg or tonnes (unit toggle) |
| Data required | `total_co2e` aggregated per month across all categories |
| Aggregation | SUM of energy_co2 + transport_co2 + waste_co2 per time bucket |
| Hover tooltip | Shows breakdown: Energy X kg \| Transport Y kg \| Waste Z kg |
| Optional overlay | Forecast line (dashed) using linear regression on last 6 months |
| Interactions | Zoom on range by dragging; hover for stacked breakdown tooltip |

---

### 3.1.C Emissions by Category — Stacked Area Chart
**VIZ C** · Stacked area (or stacked bar) showing Energy / Transport / Waste contribution over time

| Attribute | Detail |
|---|---|
| Chart type | Stacked area chart (switchable to stacked bar via toggle) |
| Layers | Energy (blue) \| Transport (amber) \| Waste (purple) |
| Data required | `energy_co2e`, `transport_co2e`, `waste_co2e` per period |
| Toggle | Legend click shows/hides individual layers |
| Normalize button | Switches between absolute (kg) and 100% stacked (% share) views |
| Color coding | Category view: blue/amber/purple \| Scope view: red/blue/purple by scope |

---

## Page 2 — Energy

Deep-dive into energy consumption by building. Contains the most granular data in the dashboard — enabling the facilities team to identify problem buildings and track meter-level changes month over month.

### 3.2.D Building-Wise CO₂ — Horizontal Bar Chart
**VIZ D** · Sorted horizontal bar chart — identifies highest energy-consuming buildings for intervention priority

| Attribute | Detail |
|---|---|
| Chart type | Horizontal bar chart, sorted descending by CO₂e |
| Primary metric | kg CO₂ per building (bar length) |
| Secondary axis | kWh displayed as annotation label on bar |
| Bar color | Green gradient for metered data; soft pink for estimated (*) |
| Data required | `building_name`, `electricity_kwh`, `electricity_co2`, `diesel_co2`, `lpg_co2` |
| KPI overlays | CO₂ per m² and CO₂ per occupant shown as secondary KPI chips |
| Click behavior | Opens right-side drilldown panel for that building (see 3.2.J) |
| Estimation flag | Asterisk (*) on bar label if building data is estimated, not metered |

---

### 3.2.E Energy Intensity Heatmap — Building × Month Matrix
**VIZ E** · Color-coded matrix (building rows × month columns) to reveal seasonality and hotspot buildings

| Attribute | Detail |
|---|---|
| Chart type | Custom HTML/CSS heatmap table (not Recharts) |
| Rows | One row per building |
| Columns | One column per month (last 9–12 months) |
| Cell value | kWh (displayed) with color intensity mapped to value range |
| Color scale | White (low) → deep green (high), normalized per row |
| Hover | Tooltip shows exact kWh, CO₂ value, and MoM change % |
| Sort control | Sort rows by: total kWh \| peak month \| building name |

---

### 3.2.J Building Drilldown Panel — Right Drawer
**VIZ J** · Opened by clicking a building bar — shows full building-level operational detail

| Section | Content |
|---|---|
| KPI mini-cards (4) | Total CO₂ \| CO₂ per m² \| CO₂ per occupant \| Area m² |
| Source stacked bar | Monthly bars split by: Electricity (blue) / Diesel (amber) / LPG (green) |
| Monthly trend line | 12-month CO₂ trend for this building with MoM delta annotation |
| Data provenance table | Each month row: kWh value, source tag, confidence rating, last updated |
| Close | X button or click outside closes drawer; chart re-enables |

---

## Page 3 — Transport

Commute is often the second-largest campus emissions source. This page breaks down modal split, targets for intervention, and compares student vs staff commute patterns.

### 3.3.F Transport Emissions Breakdown — Multi-chart View
**VIZ F** · Donut chart + bar chart + grouped comparison — full modal-split analysis

| Sub-chart | Type | Purpose |
|---|---|---|
| Modal CO₂ share | Donut / Pie chart | Instant visual of which mode dominates emissions (car = largest slice) |
| CO₂ by mode (absolute) | Vertical bar chart | Exact kg CO₂ per mode, sorted descending, with EF annotation |
| Distance vs Emissions | Grouped bar chart (dual Y-axis) | Shows km travelled vs CO₂ — reveals high-distance/low-emission modes |
| Per-person average | KPI chip per mode | Average CO₂ per commuter per month for each mode |

**Cohort filter:** Buttons to switch between All / Students / Staff. Recalculates all transport charts for the selected cohort.

**Data inputs:** `mode`, `total_distance_km_by_mode`, `fuel_liters_by_mode`, `passenger_count`, `fuel_type`, `mileage_km_per_L`, `EF_mode`

---

### 3.3.G Commute Flow Map — Optional (if geo data available)
**VIZ G** · Choropleth map / Sankey flow showing commuter origin regions and their modal split

| Attribute | Detail |
|---|---|
| Chart type | Choropleth (region → campus emissions density) or Sankey (region → mode → CO₂) |
| Data required | `origin_pincode` or lat/lon, `mode`, `count`, `co2_per_commuter` |
| Click interaction | Click a region → popup showing: # commuters, modal split, total CO₂ from that region |
| Fallback | If geo data not available, replace with a simple bar chart of top-5 origin zones |

---

## Page 4 — Waste

Waste is Scope 3 and often underestimated. This page shows the composition of the waste stream, its CO₂e consequence, and the impact of increasing diversion from landfill through composting and recycling.

### 3.4.H Waste Stream Visualizations — Three Charts
**VIZ H** · Stacked area trend + composition donut + what-if slider — full waste emissions picture

| Sub-chart | Type | Data inputs |
|---|---|---|
| Waste stream trend | Stacked area chart (monthly) | `landfill_kg`, `recycled_kg`, `composted_kg`, `organic_kg` per month |
| Waste composition | Donut chart | Proportions of each stream for selected month |
| Stream-to-CO₂ bar | Grouped bar | kg waste per stream → CO₂e per stream (shows EF applied) |
| What-if composting slider | Line + shaded area | Adjustable % composting increase → CO₂e saved displayed live |

**What-If Interaction Logic:** Slider input = `compost_boost_pct` (0–80%). Calculation:
```
new_composted = composted + composted × (boost/100)
new_landfill  = landfill − composted × (boost/100)
saved_co2e    = (original_landfill − new_landfill) × EF_landfill
```
Saved CO₂e displayed as a green KPI callout box.

---

## Page 5 — Scenario Planner

A forward-looking tool for leadership to model the CO₂e impact of planned sustainability interventions before committing resources.

### 3.5.L Scenario Visualizer — Intervention Projection
**VIZ L** · Baseline vs projected line chart with shaded savings area — shows ROI of sustainability interventions

| Intervention Slider | Affects | Calculation Applied |
|---|---|---|
| Solar Offset (%) | Energy CO₂e (Scope 2) | `energy_co2e × (1 − solar_pct/100)` from month 3 onward |
| Fuel Reduction (%) | Diesel + Petrol (Scope 1/3) | `fuel_co2e × (1 − fuel_pct/100)` applied to transport + generators |
| EV Adoption (%) | Transport CO₂e (Scope 3) | `car_co2e × (1 − ev_pct/100 × EF_ev/EF_petrol ratio)` |
| Composting Boost (%) | Waste CO₂e (Scope 3) | `landfill_co2e × (1 − compost_pct/100)` from next month |

| Output Metric | Display |
|---|---|
| Monthly CO₂e saving | KPI box — kg or t CO₂e saved vs baseline in final month |
| % reduction | KPI percentage — saving / baseline × 100 |
| Projected line chart | Baseline (dashed red) vs custom intervention (solid green) over 9 months |
| Shaded area between lines | Visual representation of cumulative saving — fills green |
| Comparison bar (multi-scenario) | Side-by-side vertical bars for up to 3 saved scenarios |

---

## Page 6 — Settings & Assumptions

Transparency and auditability are essential for stakeholder trust. This page exposes every assumption the dashboard makes so reviewers and auditors can validate all numbers.

| Section | Contents |
|---|---|
| **Emission Factors Table** | Full table: source, factor value, unit, scope, authority/source reference — all editable by admin |
| **Data Confidence Legend** | 🟢 High (metered/billed) \| 🟡 Medium (survey) \| 🔴 Low (estimated) |
| **Data Source Tags** | `meter` \| `bill` \| `survey` \| `log` \| `estimate` — definitions and when each is applied |
| **Missing Data Policy** | 1 month gap → interpolate from prev 3 avg. No meter → area × intensity estimate (marked *) |
| **Scope Inclusion** | Checklist of what is included/excluded in Scope 1, 2, 3 for this campus |
| **GWP Values** | CH₄ = 28, N₂O = 265 (100-year, AR6) — editable for regional authority compliance |
| **Campus Constants** | Total students, staff headcount, total built area m² — used for per-capita KPIs |
| **Audit Log** | Table of last 20 data edits: field, old value, new value, changed by, timestamp |

---

# 4. Complete Interaction Flow Map

Every interactive element across the dashboard, what triggers it, and what happens as a result. All interactions are wired in the React state layer with no page reload.

## 4.1 Global Controls

| User Action | Trigger | System Response |
|---|---|---|
| Select period (e.g. Feb 2026) | Dropdown select | All charts re-fetch filtered data; KPI tiles animate numbers; MoM badges recalculate |
| Toggle kg ↔ tonnes | Button click | All numeric displays divide by 1,000; axis labels update; no chart re-render needed |
| Toggle Category ↔ Scope view | Button click | Chart colors remap to scope palette; legend labels change to Scope 1/2/3; annotations update |
| Click Export | Button click | Modal opens with options: PNG chart, CSV data, PDF page report |
| Click page in sidebar nav | Button click | Smooth page transition; breadcrumb updates; URL path changes for shareable links |

## 4.2 Overview Page Interactions

| Element | Action | Result |
|---|---|---|
| KPI tile (any) | Click | Navigate to corresponding category page; metric pre-highlighted in green |
| KPI tile | Hover | Tooltip: data source, confidence level, period, last updated timestamp |
| Trend area chart | Hover data point | Vertical crosshair; tooltip shows all 3 category values for that month |
| Category stacked area | Click legend item | Toggle that category layer on/off; other layers auto-rescale |
| Normalize button | Click | Stacked area switches between absolute kg ↔ 100% share view with smooth animation |

## 4.3 Energy Page Interactions

| Element | Action | Result |
|---|---|---|
| Building bar | Click | Right-side drilldown drawer opens with: 4 mini KPIs + monthly stacked bar + source table |
| Building bar | Hover | Tooltip: kWh, CO₂, CO₂/m², CO₂/occupant, data source badge |
| Drilldown drawer | Click X or outside | Drawer closes; chart returns to full view |
| Heatmap cell | Hover | Tooltip: exact kWh value, month, MoM change %, source tag |
| Sort control (heatmap) | Click header | Rows re-sort by: total / peak month / building name |
| Estimated bar (*) | Hover asterisk | Tooltip explains interpolation method used for this building |

## 4.4 Transport Page Interactions

| Element | Action | Result |
|---|---|---|
| Cohort filter (All/Students/Staff) | Click button | All transport charts recalculate for selected cohort; totals update |
| Donut pie slice | Click | Highlights that mode in bar chart; filters distance chart; shows per-person KPI |
| Mode bar | Hover | Shows: total CO₂, km traveled, avg CO₂/person, EF used |
| Dual-axis bar (distance vs CO₂) | Hover | Crosshair tooltip for both Y-axes simultaneously |
| Map region (if geo enabled) | Click | Popup: commuter count, modal split %, and total CO₂ from that region |

## 4.5 Waste Page Interactions

| Element | Action | Result |
|---|---|---|
| Composting boost slider | Drag | Stacked area updates in real-time; CO₂e saved KPI box recalculates instantly |
| Donut segment | Click | Filters stream-to-CO₂ bar to show only that stream; other streams fade |
| Stacked area layer | Click legend | Toggle waste stream on/off; chart rescales |
| What-if reset button | Click | Returns slider to 0; charts animate back to baseline |

## 4.6 Scenario Planner Interactions

| Element | Action | Result |
|---|---|---|
| Any intervention slider | Drag | Projected line updates in real-time; shaded savings area redraws; KPIs recalculate |
| Save Scenario button | Click | Current slider values saved as named scenario; added to comparison bar chart below |
| Comparison bar (multi-scenario) | Hover bar | Tooltip: scenario name, slider values used, total saving vs baseline |
| Reset all sliders | Click button | All sliders to 0; projected line collapses to baseline; savings KPI shows 0 |

---

# 5. Data Input Schema

Every field required to power the dashboard, grouped by category.

## 5.A Energy Inputs — Per Building Per Month

| Field Name | Type | Unit | Source | Validation |
|---|---|---|---|---|
| `building_name` | string | — | fixed | Non-empty, unique ID |
| `period_start` | date | ISO 8601 | fixed | Format: YYYY-MM-DD |
| `period_end` | date | ISO 8601 | fixed | Must be > period_start |
| `electricity_kwh` | number | kWh | bill/meter | ≥0, flag if >30,000 single month |
| `diesel_liters` | number | litres | log/receipt | ≥0 |
| `lpg_kg` | number | kg | log | ≥0 |
| `area_m2` | number | m² | fixed constant | >0, rarely changes |
| `occupants` | integer | count | HR/timetable | >0 |

## 5.B Transport Inputs — Per Cohort Per Month

| Field Name | Type | Unit | Source | Notes |
|---|---|---|---|---|
| `cohort` | enum | — | survey | `student \| staff \| visitor` |
| `mode` | enum | — | survey | `car\|bike\|bus\|walk\|e-vehicle\|train\|auto\|carpool` |
| `distance_km` | number | km/day | survey | Average daily one-way distance |
| `trips_per_period` | integer | days/month | survey | Working days commuted |
| `mileage_km_per_l` | number | km/L | survey | Only if fuel-based method used |
| `fuel_type` | enum | — | survey | `petrol\|diesel\|CNG\|electric` |
| `vehicle_fuel_liters` | number | litres | log | Alternative to distance method |
| `passenger_count` | integer | people | log | For buses only — divide total by this |

## 5.C Waste Inputs — Campus-wide Monthly

| Field Name | Type | Unit | Source | Notes |
|---|---|---|---|---|
| `total_waste_kg` | number | kg | waste log | Sum of all streams |
| `organic_waste_kg` | number | kg | waste log | Food + garden waste |
| `recycled_kg` | number | kg | waste log | Paper, plastic, metal, glass |
| `composted_kg` | number | kg | waste log | Diverted from landfill |
| `incinerated_kg` | number | kg | waste log | If applicable; separate EF applies |
| `sent_to_landfill_kg` | number | kg | waste log | Primary CO₂e source in waste |

## 5.E Campus Constants

| Field | Type | Example Value | Used In |
|---|---|---|---|
| `total_students` | integer | 2,800 | Per-capita KPI, transport cohort split |
| `total_staff` | integer | 420 | Per-capita KPI, transport cohort split |
| `total_built_area_m2` | number | 18,200 | CO₂ per m² intensity KPI |
| `reporting_year` | year | 2025–2026 | Year-over-year comparisons |
| `target_co2e_kg` | number | 450,000 | Benchmark line on trend chart |

---

# 6. Key KPI Formulas — Precise Definitions

All values in kg CO₂e unless unit toggle switches to tonnes.

| KPI Name | Formula | Display Location |
|---|---|---|
| Total CO₂e (period) | `Σ energy_co2 + transport_co2 + waste_co2 + other_co2` | Overview KPI tile #1 |
| Energy CO₂e | `electricity_kwh×EF_elec + diesel_l×EF_diesel + lpg_kg×EF_lpg` | Overview KPI tile #2 |
| Transport CO₂e | `Σ (distance_km × EF_mode) across all modes and commuters` | Overview KPI tile #3 |
| Waste CO₂e | `landfill_kg×EF_landfill − recycled_kg×EF_credit` | Overview KPI tile #4 |
| Per Capita CO₂e | `total_co2e ÷ (total_students + total_staff)` | Overview KPI tile #5 |
| CO₂ per m² | `total_energy_co2 ÷ total_built_area_m2` | Energy page KPI |
| Energy % of total | `(energy_co2 ÷ total_co2e) × 100` | Category donut chart |
| Transport % of total | `(transport_co2 ÷ total_co2e) × 100` | Category donut chart |
| Month-over-Month % | `((current − previous) ÷ previous) × 100` | KPI tile delta badge |
| Year-over-Year % | `((this_year − last_year) ÷ last_year) × 100` | Annual trend comparison |
| Building CO₂/m² | `building_total_co2 ÷ building_area_m2` | Energy drilldown KPI |
| Building CO₂/person | `building_total_co2 ÷ building_occupants` | Energy drilldown KPI |
| Waste CO₂e saved (what-if) | `(orig_landfill − new_landfill) × EF_landfill` | Waste what-if KPI box |

---

# 7. Recommended Technology Stack

## 7.1 Core Stack

| Layer | Technology | Reason / Role |
|---|---|---|
| Frontend framework | React 18 + Vite | Component-based UI; fast HMR; large ecosystem |
| Charting | Recharts | React-native charts; composable; all required chart types included |
| Styling | Tailwind CSS | Utility-first; consistent design tokens; rapid iteration |
| State management | Zustand or React Context | Lightweight global state for period, unit, scope toggles |
| Data fetching | React Query (TanStack) | Caching, background refetch, loading states for API calls |
| Routing | React Router v6 | 6 pages + drilldown routes; URL state for shareable links |
| Map (optional) | Leaflet.js + react-leaflet | Open-source; choropleth support via GeoJSON layers |
| Heatmap | Custom CSS grid table | Recharts has no native heatmap; custom HTML table with computed bg-color |
| Export | html2canvas + jsPDF | Screenshot charts to PNG; wrap in PDF for report export |
| Backend API | Node.js + Express or FastAPI | REST endpoints for emissions data per category/period |
| Database | PostgreSQL | Relational; handles building × month × source grain well |
| Auth (optional) | Clerk or Auth0 | Role-based: Admin (edit EF) vs Viewer (read only) |

## 7.2 Component Architecture

| Component | Props / State | Child Components |
|---|---|---|
| `<App />` | Global state: period, unit, scope, page | `<Sidebar/>` `<TopBar/>` `<PageRouter/>` |
| `<TopBar />` | period, unit, scope, onExport | `<PeriodSelect/>` `<ScopeToggle/>` `<UnitToggle/>` |
| `<OverviewPage />` | period, unit, scope | `<KPIRow/>` `<TrendChart/>` `<CategoryStackedArea/>` |
| `<KPIRow />` | data[], unit | 5× `<KPICard/>` with delta, badge, conf props |
| `<EnergyPage />` | period, selectedBuilding | `<BuildingBar/>` `<HeatmapTable/>` `<DrilldownDrawer/>` |
| `<DrilldownDrawer />` | building, isOpen, onClose | `<MiniKPIs/>` `<SourceStackedBar/>` `<ProvenanceTable/>` |
| `<TransportPage />` | cohort, period | `<ModeDonut/>` `<ModeBar/>` `<DistanceVsCO2Bar/>` |
| `<WastePage />` | period, compostBoost | `<WasteAreaChart/>` `<WasteDonut/>` `<WhatIfSlider/>` |
| `<ScenarioPage />` | interventions{}, savedScenarios[] | `<InterventionControls/>` `<ProjectionChart/>` `<CompareBar/>` |
| `<SettingsPage />` | emissionFactors[], campus{} | `<EFTable/>` `<ConfidenceLegend/>` `<AuditLog/>` |

---

# 8. Complete Visualization Catalog

All 12 visualizations from the spec (A through L) mapped to pages, chart types, and priority level.

| Ref | Visualization | Chart Type | Page | Priority | Scope Label |
|---|---|---|---|---|---|
| A | KPI Cards Row | Numeric tiles | Overview | 🔴 P0 Must-have | All scopes |
| B | Campus CO₂e Trend | Area chart (line) | Overview | 🔴 P0 Must-have | All |
| C | Category Split Over Time | Stacked area | Overview | 🔴 P0 Must-have | All |
| D | Building Energy & CO₂ | Horizontal bar | Energy | 🔴 P0 Must-have | Scope 1+2 |
| E | Energy Intensity Heatmap | Matrix heatmap | Energy | 🟡 P1 Should-have | Scope 2 |
| F | Transport Modal Split | Donut + bar + grouped | Transport | 🔴 P0 Must-have | Scope 3 |
| G | Commute Flow Map | Choropleth / Sankey | Transport | 🟢 P2 Nice-to-have | Scope 3 |
| H | Waste Stream Charts | Stacked area + donut | Waste | 🔴 P0 Must-have | Scope 3 |
| I | Per-capita & Intensity | KPI + small bars | Overview | 🟡 P1 Should-have | All |
| J | Building Drilldown | KPI + bar + table | Energy (drawer) | 🟡 P1 Should-have | Scope 1+2 |
| K | Benchmark vs Target | Radar / Index bar | Overview (optional) | 🟢 P2 Nice-to-have | All |
| L | What-if Scenario Visualizer | Line + shaded area | Scenario | 🟡 P1 Should-have | All |

> **Priority guide:** P0 = Must have (build first) · P1 = Should have (Phase 2) · P2 = Nice to have (if data allows)

## 8.1 Data Collection Priority Order

1. Building electricity monthly bills or submeter readings → unlocks VIZ D, E, J, KPI A/B/C
2. Campus population headcount + total built area → unlocks per-capita and CO₂/m² KPIs
3. Diesel generator fuel logs → completes energy Scope 1 picture
4. Transport survey (modal split + avg distances) → unlocks VIZ F, I
5. Waste tonnage by stream monthly → unlocks VIZ H and what-if slider
6. Canteen food procurement + refrigerant log → unlocks full Scope 3

## 8.2 Data Quality Rules

| Rule | Condition | Action |
|---|---|---|
| Range check | `electricity_kwh < 0` | Reject; flag as data error; notify data owner |
| Range check | Single-day kWh > reasonable threshold | Flag as suspect; label with amber confidence dot |
| Completeness | `period_start` or `period_end` missing | Reject record; require fix before import |
| Missing month (≤1 month) | No reading for a month | Interpolate: average of previous 3 months; mark as estimate (*) |
| No meter for building | Meter data unavailable | Estimate: `area_m2 × kWh/m2/month` intensity; mark as estimate (*) |
| Unit mismatch | LPG entered in litres not kg | Apply conversion factor; flag in provenance |

---

# 9. Phased Development Plan

| Phase | Deliverables | Visualizations Built | Duration |
|---|---|---|---|
| **Phase 1 · Foundation** | Project setup, routing, global state, TopBar, Sidebar, mock data layer, KPI card component, Overview page skeleton | VIZ A, B, C | ~2 weeks |
| **Phase 2 · Energy** | Energy page with building bar + heatmap + drilldown drawer; all energy calculations wired to real/mock data | VIZ D, E, J | ~1.5 weeks |
| **Phase 3 · Transport** | Transport page with donut + bar + cohort filter + distance chart; transport EF calculations | VIZ F, I | ~1.5 weeks |
| **Phase 4 · Waste** | Waste page with stacked area + donut + what-if composting slider; waste CO₂e calculations | VIZ H | ~1 week |
| **Phase 5 · Scenario + Settings** | Scenario planner with all 4 intervention sliders + projection chart; Settings page with EF table + confidence legend | VIZ L, K (partial) | ~1.5 weeks |
| **Phase 6 · Polish + Export** | Animations, export (PNG/PDF/CSV), scope toggle wiring, responsive layout, accessibility audit, API integration | All VIZ refined | ~1.5 weeks |

> 💡 **Tip:** Build each page with mock JSON data first. Only integrate real API calls in Phase 6 once all visualizations are validated. This de-risks data issues from blocking frontend progress.

---

# 10. Display Conventions & Best Practices

| Convention | Rule |
|---|---|
| **Units** | Always kg CO₂e by default. Toggle to tonnes (÷1000). Always label unit on chart axis. |
| **Period labeling** | Every chart must show month/year on X-axis or as subtitle. Never omit period. |
| **Estimated data marker** | Asterisk (*) on any KPI or bar derived from estimated (not metered) data. |
| **Provenance badge** | Small colored tag: `meter` (green) · `bill` (blue) · `survey` (amber) · `estimate` (gray). |
| **Confidence dot** | Small circle on KPI tiles: 🟢 High · 🟡 Medium · 🔴 Low. |
| **Decimal precision** | CO₂ values: 0 decimal places for kg; 2 decimal places for tonnes. |
| **Color consistency** | Energy = `#0284C7` (blue) · Transport = `#D97706` (amber) · Waste = `#7C3AED` (purple) · Reduction = `#16A34A` (green) · Alert = `#DC2626` (red). |
| **Chart tooltips** | All charts must have hover tooltips. Tooltip must include: value with unit, period, data source. |
| **Empty states** | If no data for a period: show placeholder with collection guidance, not a blank chart. |
| **Annotation on estimates** | Settings page must list all EFs with source reference. Formal reports must use authoritative national factors. |

---

*End of Implementation Plan. All visualizations, interactions, data inputs, formulas, and development phases are defined above. This document should be reviewed alongside the project spec PDF. Questions or deviations from these specifications should be documented in the audit log on the Settings page.*
