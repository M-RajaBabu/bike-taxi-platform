# Bike Taxi Platform - ER Diagram (Mermaid)

```mermaid
erDiagram
  USERS ||--o{ EMERGENCY_CONTACTS : has
  USERS ||--o{ LOCATIONS : saves
  USERS ||--o{ RIDE_REQUESTS : books
  USERS ||--o{ PAYMENT_METHODS : owns
  USERS ||--o{ PAYMENTS : makes
  USERS ||--o{ RATINGS : receives
  USERS ||--o{ SOS_CONTACTS : has
  USERS ||--o{ SOS_ALERTS : triggers
  USERS ||--o{ PROMO_CODE_USAGE : uses
  USERS ||--o{ DOCUMENTS : verifies

  RIDERS ||--o{ DOCUMENTS : provides
  RIDERS ||--o{ RIDE_REQUESTS : accepts
  RIDERS ||--o{ RIDES : drives
  RIDERS ||--o{ PAYMENTS : receives
  RIDERS ||--o{ RATINGS : receives
  RIDERS ||--o{ RIDER_EARNINGS : earns

  RIDE_REQUESTS ||--|{ RIDES : creates
  RIDE_REQUESTS ||--o{ PROMO_CODE_USAGE : applies

  RIDES ||--o{ PAYMENTS : has
  RIDES ||--o{ RATINGS : gets
  RIDES ||--o{ RIDER_EARNINGS : generates
  RIDES ||--o{ PROMO_CODE_USAGE : applies
  RIDES ||--o{ SOS_ALERTS : may_have

  PAYMENT_METHODS ||--o{ PAYMENTS : used_for

  PROMO_CODES ||--o{ PROMO_CODE_USAGE : is_used

  ADMIN_USERS ||--o{ DOCUMENTS : verifies
```

---

## How to Render as PNG

- **VS Code:** Install the "Markdown Preview Mermaid Support" or "Markdown Preview Enhanced" extension. Open this file and preview the diagram, then export as PNG.
- **Online:** Copy the diagram code block to [Mermaid Live Editor](https://mermaid.live/) and export as PNG.
- **CLI:** Use [Mermaid CLI](https://github.com/mermaid-js/mermaid-cli) to generate a PNG:
  ```bash
  mmdc -i ER_Diagram_Mermaid.md -o er_diagram.png
  ```

**This file contains only the ER diagram for easy rendering and sharing.** 